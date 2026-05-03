import { describe, expect, it, vi } from "vitest";
import { MemoryGraph } from "../MemoryGraph";

// ── Node CRUD ──────────────────────────────────────────────────────────────────

describe("MemoryGraph — node CRUD", () => {
  it("add() returns the new node with auto-generated id", () => {
    const g = new MemoryGraph();
    const n = g.add("Hello world");
    expect(n.id).toBeTruthy();
    expect(n.content).toBe("Hello world");
  });

  it("add() respects tags and importance from meta", () => {
    const g = new MemoryGraph();
    const n = g.add("fact", { tags: ["billing"], importance: 0.9 });
    expect(n.tags).toEqual(["billing"]);
    expect(n.importance).toBe(0.9);
  });

  it("add() uses defaultImportance option when importance is not in meta", () => {
    const g = new MemoryGraph({ defaultImportance: 0.7 });
    const n = g.add("fact");
    expect(n.importance).toBe(0.7);
  });

  it("get() returns the node and updates lastAccessedAt", () => {
    const g = new MemoryGraph();
    const n = g.add("test");
    const before = n.lastAccessedAt;
    vi.useFakeTimers();
    vi.advanceTimersByTime(10);
    g.get(n.id);
    expect(g.get(n.id)!.lastAccessedAt).toBeGreaterThan(before);
    vi.useRealTimers();
  });

  it("get() returns undefined for unknown id", () => {
    expect(new MemoryGraph().get("nonexistent")).toBeUndefined();
  });

  it("nodes() returns all live nodes", () => {
    const g = new MemoryGraph();
    g.add("a");
    g.add("b");
    expect(g.nodes()).toHaveLength(2);
  });

  it("nodes() excludes expired nodes", () => {
    const g = new MemoryGraph();
    g.add("expired", { expiresAt: Date.now() - 1 });
    g.add("live");
    expect(g.nodes()).toHaveLength(1);
    expect(g.nodes()[0]!.content).toBe("live");
  });

  it("update() patches mutable fields", () => {
    const g = new MemoryGraph();
    const n = g.add("old", { tags: ["a"], importance: 0.3 });
    g.update(n.id, { tags: ["b", "c"], importance: 0.8, source: "user" });
    const updated = g.get(n.id)!;
    expect(updated.tags).toEqual(["b", "c"]);
    expect(updated.importance).toBe(0.8);
    expect(updated.source).toBe("user");
  });

  it("update() throws for unknown id", () => {
    expect(() => new MemoryGraph().update("bad", {})).toThrow('Node "bad" not found.');
  });

  it("remove() deletes the node", () => {
    const g = new MemoryGraph();
    const n = g.add("bye");
    g.remove(n.id);
    expect(g.get(n.id)).toBeUndefined();
    expect(g.nodes()).toHaveLength(0);
  });

  it("remove() cascades to edges", () => {
    const g = new MemoryGraph();
    const a = g.add("a");
    const b = g.add("b");
    g.relate(a.id, b.id, "relates_to");
    g.remove(a.id);
    expect(g.edges()).toHaveLength(0);
  });
});

// ── Auto-prune ──────────────────────────────────────────────────────────────

describe("MemoryGraph — maxNodes auto-prune", () => {
  it("evicts the LRU node when maxNodes is exceeded", () => {
    vi.useFakeTimers();
    const g = new MemoryGraph({ maxNodes: 2 });
    const a = g.add("first");
    vi.advanceTimersByTime(10);
    const b = g.add("second");
    vi.advanceTimersByTime(10);
    // Re-access 'a' — its lastAccessedAt is now newer than 'b'
    g.get(a.id);
    vi.advanceTimersByTime(10);
    // Adding a third node auto-prunes the LRU, which is 'b'
    g.add("third");
    expect(g.nodes()).toHaveLength(2);
    expect(g.get(b.id)).toBeUndefined();
    expect(g.get(a.id)).toBeDefined();
    vi.useRealTimers();
  });
});

// ── Edge operations ─────────────────────────────────────────────────────────

describe("MemoryGraph — edges", () => {
  it("relate() creates a directed edge", () => {
    const g = new MemoryGraph();
    const a = g.add("a");
    const b = g.add("b");
    const edge = g.relate(a.id, b.id, "causes");
    expect(edge.fromId).toBe(a.id);
    expect(edge.toId).toBe(b.id);
    expect(edge.type).toBe("causes");
  });

  it("relate() throws when a node is missing", () => {
    const g = new MemoryGraph();
    const a = g.add("a");
    expect(() => g.relate(a.id, "ghost", "follows")).toThrow('"ghost" not found');
  });

  it("unrelate() removes matching edges", () => {
    const g = new MemoryGraph();
    const a = g.add("a");
    const b = g.add("b");
    g.relate(a.id, b.id, "relates_to");
    g.relate(a.id, b.id, "contradicts");
    g.unrelate(a.id, b.id, "relates_to");
    expect(g.edges()).toHaveLength(1);
    expect(g.edges()[0]!.type).toBe("contradicts");
  });

  it("unrelate() without type removes all matching edges", () => {
    const g = new MemoryGraph();
    const a = g.add("a");
    const b = g.add("b");
    g.relate(a.id, b.id, "relates_to");
    g.relate(a.id, b.id, "depends_on");
    g.unrelate(a.id, b.id);
    expect(g.edges()).toHaveLength(0);
  });

  it("edges(nodeId) returns edges connected to that node only", () => {
    const g = new MemoryGraph();
    const a = g.add("a");
    const b = g.add("b");
    const c = g.add("c");
    g.relate(a.id, b.id, "follows");
    g.relate(b.id, c.id, "follows");
    expect(g.edges(b.id)).toHaveLength(2);
    expect(g.edges(a.id)).toHaveLength(1);
  });

  it("neighbors() returns directly connected nodes", () => {
    const g = new MemoryGraph();
    const a = g.add("a");
    const b = g.add("b");
    const c = g.add("c");
    g.relate(a.id, b.id, "relates_to");
    g.relate(a.id, c.id, "relates_to");
    const result = g.neighbors(a.id);
    expect(result.map((n) => n.id).sort()).toEqual([b.id, c.id].sort());
  });

  it("neighbors() follows edges in both directions", () => {
    const g = new MemoryGraph();
    const a = g.add("a");
    const b = g.add("b");
    g.relate(b.id, a.id, "depends_on");
    expect(g.neighbors(a.id).map((n) => n.id)).toContain(b.id);
  });

  it("neighbors() respects depth", () => {
    const g = new MemoryGraph();
    const a = g.add("a");
    const b = g.add("b");
    const c = g.add("c");
    g.relate(a.id, b.id, "follows");
    g.relate(b.id, c.id, "follows");
    expect(g.neighbors(a.id, 1)).toHaveLength(1);
    expect(g.neighbors(a.id, 2)).toHaveLength(2);
  });
});

// ── Query helpers ────────────────────────────────────────────────────────────

describe("MemoryGraph — query helpers", () => {
  it("recent() returns newest nodes first", () => {
    vi.useFakeTimers();
    const g = new MemoryGraph();
    g.add("old");
    vi.advanceTimersByTime(1);
    g.add("new");
    const results = g.recent(2);
    expect(results[0]!.content).toBe("new");
    vi.useRealTimers();
  });

  it("recent() respects n", () => {
    const g = new MemoryGraph();
    for (let i = 0; i < 5; i++) g.add(`item ${i}`);
    expect(g.recent(3)).toHaveLength(3);
  });

  it("byTag() returns nodes with any matching tag", () => {
    const g = new MemoryGraph();
    g.add("billing node", { tags: ["billing"] });
    g.add("pref node", { tags: ["preference"] });
    g.add("untagged");
    expect(g.byTag(["billing"])).toHaveLength(1);
    expect(g.byTag(["billing", "preference"])).toHaveLength(2);
  });

  it("byTag() returns empty for empty tag list", () => {
    const g = new MemoryGraph();
    g.add("a", { tags: ["x"] });
    expect(g.byTag([])).toHaveLength(0);
  });

  it("byImportance() filters by threshold", () => {
    const g = new MemoryGraph();
    g.add("high", { importance: 0.9 });
    g.add("low", { importance: 0.2 });
    expect(g.byImportance(0.5)).toHaveLength(1);
    expect(g.byImportance(0.5)[0]!.content).toBe("high");
  });
});

// ── Persistence ──────────────────────────────────────────────────────────────

describe("MemoryGraph — serialize / deserialize", () => {
  it("round-trips nodes and edges losslessly", () => {
    const g = new MemoryGraph({ defaultImportance: 0.6 });
    const a = g.add("Node A", { tags: ["x"], importance: 0.8, source: "test" });
    const b = g.add("Node B");
    g.relate(a.id, b.id, "causes", 0.7);

    const restored = MemoryGraph.deserialize(g.serialize());
    expect(restored.nodes()).toHaveLength(2);
    expect(restored.get(a.id)!.content).toBe("Node A");
    expect(restored.get(a.id)!.tags).toEqual(["x"]);
    expect(restored.edges()).toHaveLength(1);
    expect(restored.edges()[0]!.type).toBe("causes");
    expect(restored.edges()[0]!.weight).toBe(0.7);
  });

  it("deserialize throws for unsupported version", () => {
    expect(() =>
      MemoryGraph.deserialize(JSON.stringify({ version: 99, options: {}, nodes: [], edges: [] })),
    ).toThrow("Unsupported serialization version: 99");
  });

  it("handles maxNodes: Infinity round-trip", () => {
    const g = new MemoryGraph();
    const restored = MemoryGraph.deserialize(g.serialize());
    // Should not throw and should be fully functional
    restored.add("test");
    expect(restored.nodes()).toHaveLength(1);
  });
});

// ── Token utilities ──────────────────────────────────────────────────────────

describe("MemoryGraph — token utilities", () => {
  it("estimateTokens(text) delegates to the tokenizer", () => {
    const g = new MemoryGraph();
    expect(g.estimateTokens("1234")).toBe(1); // Math.ceil(4/4)
    expect(g.estimateTokens("12345678")).toBe(2); // Math.ceil(8/4)
  });

  it("totalTokens() sums live node content", () => {
    const g = new MemoryGraph();
    g.add("aaaa"); // 1 token
    g.add("aaaaaaaa"); // 2 tokens
    expect(g.totalTokens()).toBe(3);
  });

  it("setTokenizer() replaces the tokenizer", () => {
    const g = new MemoryGraph();
    g.add("x");
    g.setTokenizer(() => 99);
    expect(g.totalTokens()).toBe(99);
  });
});
