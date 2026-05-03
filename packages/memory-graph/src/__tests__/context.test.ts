import { describe, expect, it } from "vitest";
import { buildContext } from "../context";
import { createNode } from "../MemoryNode";
import { defaultTokenizer } from "../tokenizer";
import { MemoryGraph } from "../MemoryGraph";

function node(content: string) {
  return createNode(content);
}

describe("buildContext", () => {
  it("returns empty string when no nodes", () => {
    expect(buildContext([], {}, defaultTokenizer)).toBe("");
  });

  it("renders markdown by default", () => {
    const result = buildContext([node("Hello world")], {}, defaultTokenizer);
    expect(result).toBe("- Hello world");
  });

  it("renders plain format", () => {
    const result = buildContext([node("Hello")], { format: "plain" }, defaultTokenizer);
    expect(result).toBe("Hello");
  });

  it("renders json format", () => {
    const n = node("Hello");
    const result = buildContext([n], { format: "json" }, defaultTokenizer);
    const parsed = JSON.parse(result) as { content: string };
    expect(parsed.content).toBe("Hello");
  });

  it("respects maxTokens budget — stops before exceeding it", () => {
    const nodes = Array.from({ length: 10 }, (_, i) => node(`item number ${i} text`));
    const result = buildContext([...nodes], { maxTokens: 10 }, defaultTokenizer);
    const cost = defaultTokenizer(result);
    expect(cost).toBeLessThanOrEqual(10);
  });

  it("never exceeds maxTokens even with a single expensive node", () => {
    const big = node("a".repeat(200));
    const result = buildContext([big], { maxTokens: 5 }, defaultTokenizer);
    expect(result).toBe(""); // first node already exceeds budget
  });

  it("joins multiple nodes with newline separator by default", () => {
    const result = buildContext([node("a"), node("b")], {}, defaultTokenizer);
    expect(result).toBe("- a\n- b");
  });

  it("uses custom separator", () => {
    const result = buildContext([node("a"), node("b")], { separator: " | " }, defaultTokenizer);
    expect(result).toBe("- a | - b");
  });

  it("includeMetadata adds tags, source, importance in markdown", () => {
    const n = createNode("fact", { tags: ["billing"], importance: 0.8, source: "user" });
    const result = buildContext([n], { includeMetadata: true }, defaultTokenizer);
    expect(result).toContain("billing");
    expect(result).toContain("user");
    expect(result).toContain("0.80");
  });

  it("includeMetadata adds fields in json format", () => {
    const n = createNode("fact", { tags: ["x"], importance: 0.5 });
    const raw = buildContext([n], { format: "json", includeMetadata: true }, defaultTokenizer);
    const parsed = JSON.parse(raw) as { tags: string[] };
    expect(parsed.tags).toEqual(["x"]);
  });
});

describe("MemoryGraph.toContext()", () => {
  it("returns a non-empty string when graph has nodes", () => {
    const g = new MemoryGraph();
    g.add("Remember: user prefers concise replies");
    expect(g.toContext()).toBeTruthy();
  });

  it("respects maxTokens", () => {
    const g = new MemoryGraph();
    for (let i = 0; i < 20; i++) g.add(`fact number ${i} about something`);
    const result = g.toContext({ maxTokens: 20 });
    expect(defaultTokenizer(result)).toBeLessThanOrEqual(20);
  });

  it("uses prompt to surface relevant nodes first", () => {
    const g = new MemoryGraph();
    g.add("user likes cats");
    g.add("invoice overdue by 30 days");
    const result = g.toContext({ prompt: "invoice", maxTokens: 50 });
    expect(result).toContain("invoice");
  });

  it("returns empty string for empty graph", () => {
    expect(new MemoryGraph().toContext()).toBe("");
  });
});
