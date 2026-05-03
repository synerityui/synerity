import type { ContextOptions, MemoryNode } from "./types";

function formatMarkdown(node: MemoryNode, includeMetadata: boolean): string {
  let line = `- ${node.content}`;
  if (includeMetadata) {
    const parts: string[] = [];
    if (node.tags.length > 0) parts.push(`tags: ${node.tags.join(", ")}`);
    if (node.source) parts.push(`source: ${node.source}`);
    parts.push(`importance: ${node.importance.toFixed(2)}`);
    line += ` _(${parts.join(" | ")})_`;
  }
  return line;
}

function formatJson(node: MemoryNode, includeMetadata: boolean): string {
  return JSON.stringify({
    content: node.content,
    ...(includeMetadata
      ? {
          tags: node.tags,
          importance: node.importance,
          source: node.source,
          createdAt: node.createdAt,
        }
      : {}),
  });
}

function formatPlain(node: MemoryNode): string {
  return node.content;
}

/**
 * Packs ranked nodes into a single string within the `maxTokens` budget.
 * Stops adding nodes the moment the next one would exceed the budget.
 */
export function buildContext(
  rankedNodes: MemoryNode[],
  options: ContextOptions,
  tokenizer: (text: string) => number,
): string {
  const { maxTokens, format = "markdown", separator = "\n", includeMetadata = false } =
    options;

  const parts: string[] = [];
  let usedTokens = 0;

  for (const node of rankedNodes) {
    const formatted =
      format === "json"
        ? formatJson(node, includeMetadata)
        : format === "plain"
          ? formatPlain(node)
          : formatMarkdown(node, includeMetadata);

    const separatorCost = parts.length > 0 ? tokenizer(separator) : 0;
    const cost = tokenizer(formatted);
    if (maxTokens !== undefined && usedTokens + separatorCost + cost > maxTokens) break;

    parts.push(formatted);
    usedTokens += separatorCost + cost;
  }

  return parts.join(separator);
}
