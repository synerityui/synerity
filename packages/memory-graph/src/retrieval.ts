import { isExpired } from "./MemoryNode";
import type { MemoryNode, QueryOptions } from "./types";

/** Splits text into lowercase word tokens. */
function tokenize(text: string): Set<string> {
  return new Set(text.toLowerCase().match(/\b\w+\b/g) ?? []);
}

/**
 * Jaccard similarity between the prompt tokens and the node's content + tags.
 * Returns 0–1; 0 when the prompt is empty.
 */
export function keywordScore(node: MemoryNode, promptTokens: Set<string>): number {
  if (promptTokens.size === 0) return 0;
  const contentTokens = tokenize(`${node.content} ${node.tags.join(" ")}`);
  let overlap = 0;
  for (const t of promptTokens) {
    if (contentTokens.has(t)) overlap++;
  }
  const union = new Set([...promptTokens, ...contentTokens]).size;
  return union === 0 ? 0 : overlap / union;
}

/**
 * Recency decay: 1.0 for a brand-new node, ~0.5 after 24 h, approaches 0.
 */
export function recencyScore(node: MemoryNode, now = Date.now()): number {
  const ageHours = (now - node.createdAt) / (1000 * 3600);
  return 1 / (1 + ageHours / 24);
}

/**
 * Combined ranking score = importance × recency × relevance.
 * When no prompt is given, relevance is treated as 1.
 */
export function combinedScore(
  node: MemoryNode,
  promptTokens: Set<string>,
  now = Date.now(),
): number {
  const relevance = promptTokens.size > 0 ? keywordScore(node, promptTokens) : 1;
  return node.importance * recencyScore(node, now) * relevance;
}

/**
 * Filters, scores, and returns the top-ranked non-expired nodes.
 * Applies `minImportance`, `tags`, and `limit` from `options`.
 */
export function rankNodes(
  nodes: MemoryNode[],
  prompt: string | undefined,
  options: QueryOptions,
  now = Date.now(),
): MemoryNode[] {
  const promptTokens = prompt ? tokenize(prompt) : new Set<string>();

  let filtered = nodes.filter((n) => !isExpired(n, now));

  if (options.minImportance !== undefined) {
    filtered = filtered.filter((n) => n.importance >= options.minImportance!);
  }

  if (options.tags && options.tags.length > 0) {
    const tagSet = new Set(options.tags);
    filtered = filtered.filter((n) => n.tags.some((t) => tagSet.has(t)));
  }

  filtered.sort(
    (a, b) => combinedScore(b, promptTokens, now) - combinedScore(a, promptTokens, now),
  );

  const limit = options.limit ?? 10;
  return filtered.slice(0, limit);
}
