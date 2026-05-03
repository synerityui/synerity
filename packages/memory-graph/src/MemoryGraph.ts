import { buildContext } from "./context";
import { generateId } from "./id";
import { createEdge } from "./MemoryEdge";
import { createNode, isExpired } from "./MemoryNode";
import { prune as runPrune } from "./prune";
import { rankNodes } from "./retrieval";
import { defaultTokenizer } from "./tokenizer";
import type {
  ContextOptions,
  EdgeType,
  MemoryEdge,
  MemoryGraphOptions,
  MemoryNode,
  NodeMeta,
  PruneOptions,
  PruneResult,
  QueryOptions,
} from "./types";

/** Shape stored by `serialize()`. The version field guards against schema drift. */
type SerializedGraph = {
  version: 1;
  options: { maxNodes: number | null; defaultImportance: number };
  nodes: MemoryNode[];
  edges: MemoryEdge[];
};

/**
 * In-memory knowledge graph for LLM context management.
 *
 * Stores facts as `MemoryNode` objects, connects them with typed `MemoryEdge`
 * relationships, and surfaces the most relevant subset via `toContext()`.
 *
 * @example
 * ```ts
 * const graph = new MemoryGraph({ maxNodes: 200 });
 *
 * graph.add("User prefers dark mode", { tags: ["preference"], importance: 0.9 });
 * graph.add("Subscription plan: Pro", { tags: ["billing"], importance: 1.0 });
 *
 * const context = graph.toContext({ prompt: "invoice", maxTokens: 400 });
 * ```
 */
export class MemoryGraph {
  private readonly _nodes = new Map<string, MemoryNode>();
  private readonly _edges = new Map<string, MemoryEdge>();
  /** Edge IDs grouped by their `fromId`. */
  private readonly _edgesByFrom = new Map<string, Set<string>>();
  /** Edge IDs grouped by their `toId`. */
  private readonly _edgesByTo = new Map<string, Set<string>>();

  private _tokenizer: (text: string) => number;
  private readonly _maxNodes: number;
  private readonly _defaultImportance: number;

  constructor(options: MemoryGraphOptions = {}) {
    this._maxNodes = options.maxNodes ?? Infinity;
    this._defaultImportance = options.defaultImportance ?? 0.5;
    this._tokenizer = options.tokenizer ?? defaultTokenizer;
  }

  // ── Node CRUD ──────────────────────────────────────────────────────────────

  /**
   * Adds a node to the graph. When `maxNodes` is configured and the count
   * exceeds it, the least-recently-accessed node is evicted automatically.
   */
  add(content: string, meta: NodeMeta = {}): MemoryNode {
    const node = createNode(content, meta, this._defaultImportance);
    this._nodes.set(node.id, node);
    if (this._nodes.size > this._maxNodes) this._evictLru();
    return node;
  }

  /** Updates mutable fields of an existing node. Throws if the node is not found. */
  update(id: string, patch: Partial<NodeMeta>): MemoryNode {
    const node = this._requireNode(id);
    if (patch.tags !== undefined) node.tags = patch.tags;
    if (patch.importance !== undefined) node.importance = patch.importance;
    if (patch.source !== undefined) node.source = patch.source;
    if (patch.expiresAt !== undefined) node.expiresAt = patch.expiresAt;
    return node;
  }

  /** Removes a node and all edges that reference it. */
  remove(id: string): void {
    this._nodes.delete(id);
    for (const [edgeId, edge] of this._edges) {
      if (edge.fromId === id || edge.toId === id) this._deleteEdge(edgeId, edge);
    }
  }

  /** Returns the node and updates its `lastAccessedAt` (used by LRU). */
  get(id: string): MemoryNode | undefined {
    const node = this._nodes.get(id);
    if (node) node.lastAccessedAt = Date.now();
    return node;
  }

  /** Returns all non-expired nodes. */
  nodes(): MemoryNode[] {
    const now = Date.now();
    return [...this._nodes.values()].filter((n) => !isExpired(n, now));
  }

  // ── Edge operations ────────────────────────────────────────────────────────

  /** Creates a directed edge between two existing nodes. */
  relate(fromId: string, toId: string, type: EdgeType, weight = 1.0): MemoryEdge {
    this._requireNode(fromId);
    this._requireNode(toId);
    const edge = createEdge(fromId, toId, type, weight);
    this._edges.set(edge.id, edge);
    this._indexEdge(edge);
    return edge;
  }

  /** Removes edges matching `fromId → toId` (optionally filtered by `type`). */
  unrelate(fromId: string, toId: string, type?: EdgeType): void {
    for (const edgeId of [...(this._edgesByFrom.get(fromId) ?? [])]) {
      const edge = this._edges.get(edgeId);
      if (edge && edge.toId === toId && (type === undefined || edge.type === type)) {
        this._deleteEdge(edgeId, edge);
      }
    }
  }

  /** Returns all edges, or edges connected to `nodeId` when provided. */
  edges(nodeId?: string): MemoryEdge[] {
    if (nodeId === undefined) return [...this._edges.values()];
    const ids = new Set([
      ...(this._edgesByFrom.get(nodeId) ?? []),
      ...(this._edgesByTo.get(nodeId) ?? []),
    ]);
    return [...ids]
      .map((id) => this._edges.get(id))
      .filter((e): e is MemoryEdge => e !== undefined);
  }

  /**
   * BFS over undirected edges up to `depth` hops.
   * Returns neighboring nodes, excluding the starting node itself.
   */
  neighbors(nodeId: string, depth = 1): MemoryNode[] {
    const visited = new Set<string>([nodeId]);
    let frontier = new Set<string>([nodeId]);

    for (let d = 0; d < depth; d++) {
      const next = new Set<string>();
      for (const id of frontier) {
        for (const edgeId of [
          ...(this._edgesByFrom.get(id) ?? []),
          ...(this._edgesByTo.get(id) ?? []),
        ]) {
          const edge = this._edges.get(edgeId);
          if (!edge) continue;
          const neighbor = edge.fromId === id ? edge.toId : edge.fromId;
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            next.add(neighbor);
          }
        }
      }
      frontier = next;
      if (frontier.size === 0) break;
    }

    visited.delete(nodeId);
    const now = Date.now();
    return [...visited]
      .map((id) => this._nodes.get(id))
      .filter((n): n is MemoryNode => n !== undefined && !isExpired(n, now));
  }

  // ── Query & retrieval ──────────────────────────────────────────────────────

  /**
   * Returns ranked nodes relevant to `prompt`.
   * Optionally expands results with graph neighbors.
   */
  query(prompt: string, options: QueryOptions = {}): MemoryNode[] {
    const ranked = rankNodes(this.nodes(), prompt, options);

    if (!options.includeNeighbors) return ranked;

    const depth = options.neighborDepth ?? 1;
    const merged = new Map<string, MemoryNode>(ranked.map((n) => [n.id, n]));
    for (const node of ranked) {
      for (const neighbor of this.neighbors(node.id, depth)) {
        if (!merged.has(neighbor.id)) merged.set(neighbor.id, neighbor);
      }
    }
    return [...merged.values()];
  }

  /** Returns the `n` most recently created non-expired nodes. */
  recent(n: number): MemoryNode[] {
    return this.nodes()
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, n);
  }

  /** Returns non-expired nodes that carry any of the given tags. */
  byTag(tags: string[]): MemoryNode[] {
    if (tags.length === 0) return [];
    const set = new Set(tags);
    return this.nodes().filter((n) => n.tags.some((t) => set.has(t)));
  }

  /** Returns non-expired nodes with `importance >= minScore`. */
  byImportance(minScore: number): MemoryNode[] {
    return this.nodes().filter((n) => n.importance >= minScore);
  }

  // ── Context generation ─────────────────────────────────────────────────────

  /**
   * Scores, ranks, and packs nodes into a formatted string within the token budget.
   * The format defaults to `"markdown"`.
   */
  toContext(options: ContextOptions = {}): string {
    const ranked = rankNodes(this.nodes(), options.prompt, { limit: this._nodes.size });
    return buildContext(ranked, options, this._tokenizer);
  }

  // ── Token utilities ────────────────────────────────────────────────────────

  /**
   * Estimates tokens for `text`, or sums estimates for all nodes when omitted.
   */
  estimateTokens(text?: string): number {
    return text !== undefined ? this._tokenizer(text) : this.totalTokens();
  }

  /** Sum of token estimates for every non-expired node's content. */
  totalTokens(): number {
    return this.nodes().reduce((sum, n) => sum + this._tokenizer(n.content), 0);
  }

  /** Replaces the tokenizer used for `toContext` and `estimateTokens`. */
  setTokenizer(fn: (text: string) => number): void {
    this._tokenizer = fn;
  }

  // ── Persistence ────────────────────────────────────────────────────────────

  /**
   * Serializes the full graph state to a JSON string.
   * Note: the custom tokenizer is NOT serialized — call `setTokenizer()` after
   * `deserialize()` if a custom tokenizer is needed.
   */
  serialize(): string {
    const data: SerializedGraph = {
      version: 1,
      options: {
        maxNodes: isFinite(this._maxNodes) ? this._maxNodes : null,
        defaultImportance: this._defaultImportance,
      },
      nodes: [...this._nodes.values()],
      edges: [...this._edges.values()],
    };
    return JSON.stringify(data);
  }

  /** Reconstructs a `MemoryGraph` from a string produced by `serialize()`. */
  static deserialize(json: string): MemoryGraph {
    const data = JSON.parse(json) as SerializedGraph;
    if (data.version !== 1) {
      throw new Error(`Unsupported serialization version: ${String(data.version)}`);
    }

    const graph = new MemoryGraph({
      maxNodes: data.options.maxNodes ?? undefined,
      defaultImportance: data.options.defaultImportance,
    });

    for (const node of data.nodes) {
      graph._nodes.set(node.id, { ...node });
    }
    for (const edge of data.edges) {
      graph._edges.set(edge.id, { ...edge });
      graph._indexEdge(edge);
    }

    return graph;
  }

  // ── Pruning ────────────────────────────────────────────────────────────────

  /**
   * Evicts nodes according to `options`.
   * Passes: expired TTL → maxAge → minImportance → maxNodes (strategy).
   */
  prune(options: PruneOptions): PruneResult {
    const { kept, removed } = runPrune([...this._nodes.values()], options);
    const keptIds = new Set(kept.map((n) => n.id));
    for (const id of [...this._nodes.keys()]) {
      if (!keptIds.has(id)) this.remove(id);
    }
    return { removed };
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  private _requireNode(id: string): MemoryNode {
    const node = this._nodes.get(id);
    if (!node) throw new Error(`Node "${id}" not found.`);
    return node;
  }

  private _indexEdge(edge: MemoryEdge): void {
    if (!this._edgesByFrom.has(edge.fromId)) this._edgesByFrom.set(edge.fromId, new Set());
    this._edgesByFrom.get(edge.fromId)!.add(edge.id);
    if (!this._edgesByTo.has(edge.toId)) this._edgesByTo.set(edge.toId, new Set());
    this._edgesByTo.get(edge.toId)!.add(edge.id);
  }

  private _deleteEdge(edgeId: string, edge: MemoryEdge): void {
    this._edges.delete(edgeId);
    this._edgesByFrom.get(edge.fromId)?.delete(edgeId);
    this._edgesByTo.get(edge.toId)?.delete(edgeId);
  }

  private _evictLru(): void {
    const sorted = [...this._nodes.values()].sort(
      (a, b) => a.lastAccessedAt - b.lastAccessedAt,
    );
    this.remove(sorted[0]!.id);
  }
}
