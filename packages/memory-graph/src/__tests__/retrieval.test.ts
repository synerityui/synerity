import { describe, expect, it, vi } from "vitest";
import { createNode } from "../MemoryNode";
import { combinedScore, keywordScore, rankNodes, recencyScore } from "../retrieval";

function node(content: string, importance = 0.5, tags: string[] = []) {
  return createNode(content, { importance, tags });
}

describe("keywordScore", () => {
  it("returns 0 when promptTokens is empty", () => {
    expect(keywordScore(node("hello world"), new Set())).toBe(0);
  });

  it("returns > 0 for overlapping tokens", () => {
    const score = keywordScore(node("invoice billing"), new Set(["billing", "plan"]));
    expect(score).toBeGreaterThan(0);
  });

  it("returns higher score for more overlap", () => {
    const high = keywordScore(node("billing invoice payment"), new Set(["billing", "invoice"]));
    const low = keywordScore(node("unrelated text here"), new Set(["billing", "invoice"]));
    expect(high).toBeGreaterThan(low);
  });

  it("considers tags in scoring", () => {
    const tagged = node("some content", 0.5, ["billing"]);
    const score = keywordScore(tagged, new Set(["billing"]));
    expect(score).toBeGreaterThan(0);
  });
});

describe("recencyScore", () => {
  it("returns 1 for brand-new node", () => {
    const n = node("fresh");
    expect(recencyScore(n, n.createdAt)).toBe(1);
  });

  it("returns lower score for older nodes", () => {
    const old = node("old");
    const now = Date.now();
    const fresh = createNode("fresh");
    expect(recencyScore(old, now + 24 * 60 * 60 * 1000)).toBeLessThan(recencyScore(fresh, now));
  });
});

describe("combinedScore", () => {
  it("equals importance × recency when promptTokens is empty", () => {
    const n = createNode("x", { importance: 0.8 });
    const now = n.createdAt;
    const score = combinedScore(n, new Set(), now);
    expect(score).toBeCloseTo(0.8 * 1); // recency ≈ 1 at creation time
  });

  it("is 0 when relevance is 0 (no prompt overlap)", () => {
    const n = createNode("completely unrelated", { importance: 1 });
    const score = combinedScore(n, new Set(["zzz"]), n.createdAt);
    expect(score).toBe(0);
  });
});

describe("rankNodes", () => {
  it("filters out expired nodes", () => {
    const live = node("live");
    const dead = createNode("dead", { expiresAt: Date.now() - 1 });
    const result = rankNodes([live, dead], undefined, {});
    expect(result).toHaveLength(1);
    expect(result[0]!.content).toBe("live");
  });

  it("filters by minImportance", () => {
    const high = node("high", 0.9);
    const low = node("low", 0.1);
    const result = rankNodes([high, low], undefined, { minImportance: 0.5 });
    expect(result).toHaveLength(1);
    expect(result[0]!.content).toBe("high");
  });

  it("filters by tags", () => {
    const billing = createNode("billing info", { tags: ["billing"] });
    const other = createNode("unrelated", { tags: ["other"] });
    const result = rankNodes([billing, other], undefined, { tags: ["billing"] });
    expect(result).toHaveLength(1);
    expect(result[0]!.content).toBe("billing info");
  });

  it("respects limit", () => {
    const nodes = Array.from({ length: 20 }, (_, i) => node(`item ${i}`));
    const result = rankNodes(nodes, undefined, { limit: 5 });
    expect(result).toHaveLength(5);
  });

  it("default limit is 10", () => {
    const nodes = Array.from({ length: 15 }, (_, i) => node(`item ${i}`));
    expect(rankNodes(nodes, undefined, {})).toHaveLength(10);
  });

  it("sorts by combined score descending — newer node ranks higher", () => {
    vi.useFakeTimers();
    const stale = createNode("billing invoice", { importance: 0.9 });
    vi.advanceTimersByTime(24 * 60 * 60 * 1000); // advance 1 day
    const fresh = createNode("billing invoice", { importance: 0.9 });
    const evaluationTime = Date.now(); // 1 day after stale was created
    // fresh was just created — its recency score is ~1; stale is 24 h old — ~0.5
    const result = rankNodes([stale, fresh], "billing", {}, evaluationTime);
    expect(result[0]!.id).toBe(fresh.id);
    vi.useRealTimers();
  });
});
