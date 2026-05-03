/** Semantic label for an edge between two nodes. */
export type EdgeType =
  | "relates_to"
  | "contradicts"
  | "depends_on"
  | "follows"
  | "part_of"
  | "causes"
  | (string & Record<never, never>); // allows arbitrary strings while keeping autocomplete

/** Optional metadata attached when adding or updating a node. */
export type NodeMeta = {
  tags?: string[] | undefined;
  /** Relevance weight 0–1. Defaults to `MemoryGraphOptions.defaultImportance` (0.5). */
  importance?: number | undefined;
  /** Free-form provenance label (e.g. "user", "assistant", "tool"). */
  source?: string | undefined;
  /** Unix-ms timestamp; auto-set to `Date.now()` if omitted. */
  createdAt?: number | undefined;
  /** When set, the node is treated as expired after this unix-ms timestamp. */
  expiresAt?: number | undefined;
};

/** A single piece of information stored in the graph. */
export type MemoryNode = {
  readonly id: string;
  content: string;
  tags: string[];
  importance: number;
  source: string | undefined;
  readonly createdAt: number;
  expiresAt: number | undefined;
  /** Updated by `MemoryGraph.get()` — used by the LRU prune strategy. */
  lastAccessedAt: number;
};

/** A typed, weighted directional relationship between two nodes. */
export type MemoryEdge = {
  readonly id: string;
  readonly fromId: string;
  readonly toId: string;
  type: EdgeType;
  /** 0–1 weight; defaults to 1.0. */
  weight: number;
  readonly createdAt: number;
};

/** Options for `MemoryGraph.query()`. */
export type QueryOptions = {
  /** Maximum results to return. @default 10 */
  limit?: number | undefined;
  minImportance?: number | undefined;
  tags?: string[] | undefined;
  /** Also include graph neighbors of top results. @default false */
  includeNeighbors?: boolean | undefined;
  /** BFS depth when `includeNeighbors` is true. @default 1 */
  neighborDepth?: number | undefined;
};

/** Options for `MemoryGraph.toContext()`. */
export type ContextOptions = {
  /** Token budget — output is truncated before this limit. */
  maxTokens?: number | undefined;
  /** Focuses retrieval ranking around this query string. */
  prompt?: string | undefined;
  /** @default "markdown" */
  format?: "markdown" | "json" | "plain" | undefined;
  separator?: string | undefined;
  /** Include tags, source, importance in the formatted output. @default false */
  includeMetadata?: boolean | undefined;
};

/** Options for `MemoryGraph.prune()`. */
export type PruneOptions = {
  /** Target maximum node count after pruning. */
  maxNodes?: number | undefined;
  /** Remove nodes older than this many milliseconds. */
  maxAge?: number | undefined;
  /** Remove nodes with importance below this threshold. */
  minImportance?: number | undefined;
  /** Eviction strategy applied when `maxNodes` is set. @default "lru" */
  strategy?: "lru" | "fifo" | "importance" | undefined;
};

/** Returned by `MemoryGraph.prune()`. */
export type PruneResult = {
  removed: number;
};

/** Construction options for `MemoryGraph`. */
export type MemoryGraphOptions = {
  /** Auto-prune (LRU) when node count exceeds this value. */
  maxNodes?: number | undefined;
  /** Default importance for new nodes. @default 0.5 */
  defaultImportance?: number | undefined;
  /** Custom tokenizer. Defaults to `Math.ceil(text.length / 4)`. */
  tokenizer?: ((text: string) => number) | undefined;
};
