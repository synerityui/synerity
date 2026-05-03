import { describe, expect, it, vi } from "vitest";
import { MemoryGraph } from "../MemoryGraph";
import { createNode } from "../MemoryNode";
import { prune } from "../prune";

// ── prune() unit tests ────────────────────────────────────────────────────────

describe("prune — expired TTL", () => {
  it("removes nodes whose expiresAt has passed", () => {
    const expired = createNode("dead", { expiresAt: Date.now() - 1 });
    const live = createNode("alive");
    const { kept, removed } = prune([expired, live], {});
    expect(removed).toBe(1);
    expect(kept).toHaveLength(1);
    expect(kept[0]!.content).toBe("alive");
  });

  it("keeps nodes whose expiresAt is in the future", () => {
    const future = createNode("future", { expiresAt: Date.now() + 60_000 });
    const { kept, removed } = prune([future], {});
    expect(removed).toBe(0);
    expect(kept).toHaveLength(1);
  });
});

describe("prune — maxAge", () => {
  it("removes nodes older than maxAge ms", () => {
    vi.useFakeTimers();
    const old = createNode("old");
    vi.advanceTimersByTime(10_000);
    const fresh = createNode("fresh");
    const { kept, removed } = prune([old, fresh], { maxAge: 5_000 }, Date.now());
    expect(removed).toBe(1);
    expect(kept[0]!.content).toBe("fresh");
    vi.useRealTimers();
  });
});

describe("prune — minImportance", () => {
  it("removes nodes below minImportance", () => {
    const high = createNode("high", { importance: 0.8 });
    const low = createNode("low", { importance: 0.2 });
    const { kept, removed } = prune([high, low], { minImportance: 0.5 });
    expect(removed).toBe(1);
    expect(kept[0]!.content).toBe("high");
  });
});

describe("prune — strategy: lru", () => {
  it("removes least recently accessed nodes first", () => {
    vi.useFakeTimers();
    const a = createNode("a");
    vi.advanceTimersByTime(10);
    const b = createNode("b");
    // Access 'b' to make 'a' the LRU
    b.lastAccessedAt = Date.now();
    const { kept, removed } = prune([a, b], { maxNodes: 1, strategy: "lru" });
    expect(removed).toBe(1);
    expect(kept[0]!.content).toBe("b");
    vi.useRealTimers();
  });
});

describe("prune — strategy: fifo", () => {
  it("removes oldest-created nodes first", () => {
    vi.useFakeTimers();
    const first = createNode("first");
    vi.advanceTimersByTime(10);
    const second = createNode("second");
    const { kept } = prune([first, second], { maxNodes: 1, strategy: "fifo" });
    expect(kept[0]!.content).toBe("second");
    vi.useRealTimers();
  });
});

describe("prune — strategy: importance", () => {
  it("removes lowest importance nodes first", () => {
    const low = createNode("low", { importance: 0.1 });
    const high = createNode("high", { importance: 0.9 });
    const mid = createNode("mid", { importance: 0.5 });
    const { kept } = prune([low, high, mid], { maxNodes: 2, strategy: "importance" });
    expect(kept.map((n) => n.content).sort()).toEqual(["high", "mid"]);
  });
});

describe("prune — no-op when already within limits", () => {
  it("removes nothing when node count <= maxNodes", () => {
    const n = createNode("x");
    const { removed } = prune([n], { maxNodes: 5, strategy: "lru" });
    expect(removed).toBe(0);
  });
});

// ── MemoryGraph.prune() integration ──────────────────────────────────────────

describe("MemoryGraph.prune()", () => {
  it("returns the correct removed count", () => {
    const g = new MemoryGraph();
    g.add("a", { importance: 0.1 });
    g.add("b", { importance: 0.9 });
    const result = g.prune({ minImportance: 0.5 });
    expect(result.removed).toBe(1);
    expect(g.nodes()).toHaveLength(1);
    expect(g.nodes()[0]!.content).toBe("b");
  });

  it("prune with maxNodes respects the strategy", () => {
    const g = new MemoryGraph();
    for (let i = 0; i < 5; i++) g.add(`node ${i}`);
    g.prune({ maxNodes: 3, strategy: "fifo" });
    expect(g.nodes()).toHaveLength(3);
  });

  it("prune removes associated edges", () => {
    const g = new MemoryGraph();
    const a = g.add("a", { importance: 0.1 });
    const b = g.add("b", { importance: 0.9 });
    g.relate(a.id, b.id, "relates_to");
    g.prune({ minImportance: 0.5 });
    expect(g.edges()).toHaveLength(0);
  });

  it("TTL expiry via prune removes expired node", () => {
    const g = new MemoryGraph();
    g.add("expired", { expiresAt: Date.now() - 1 });
    g.add("live");
    const result = g.prune({});
    expect(result.removed).toBe(1);
    expect(g.nodes()).toHaveLength(1);
  });
});
