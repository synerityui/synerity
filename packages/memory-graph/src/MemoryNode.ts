import { generateId } from "./id";
import type { MemoryNode, NodeMeta } from "./types";

/** Creates a new MemoryNode with sensible defaults. */
export function createNode(
  content: string,
  meta: NodeMeta = {},
  defaultImportance = 0.5,
): MemoryNode {
  const now = Date.now();
  return {
    id: generateId("node"),
    content,
    tags: meta.tags ?? [],
    importance: meta.importance ?? defaultImportance,
    source: meta.source,
    createdAt: meta.createdAt ?? now,
    expiresAt: meta.expiresAt,
    lastAccessedAt: now,
  };
}

/** Returns true when the node has a TTL that has already passed. */
export function isExpired(node: MemoryNode, now = Date.now()): boolean {
  return node.expiresAt !== undefined && node.expiresAt <= now;
}
