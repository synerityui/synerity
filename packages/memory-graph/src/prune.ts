import { isExpired } from "./MemoryNode";
import type { MemoryNode, PruneOptions, PruneResult } from "./types";

type PruneStep = { kept: MemoryNode[]; removed: number };

function removeExpired(nodes: MemoryNode[], now: number): PruneStep {
  const kept = nodes.filter((n) => !isExpired(n, now));
  return { kept, removed: nodes.length - kept.length };
}

function removeByMaxAge(nodes: MemoryNode[], maxAge: number, now: number): PruneStep {
  const cutoff = now - maxAge;
  const kept = nodes.filter((n) => n.createdAt >= cutoff);
  return { kept, removed: nodes.length - kept.length };
}

function removeByMinImportance(nodes: MemoryNode[], minImportance: number): PruneStep {
  const kept = nodes.filter((n) => n.importance >= minImportance);
  return { kept, removed: nodes.length - kept.length };
}

function removeByStrategy(
  nodes: MemoryNode[],
  maxNodes: number,
  strategy: NonNullable<PruneOptions["strategy"]>,
): PruneStep {
  if (nodes.length <= maxNodes) return { kept: nodes, removed: 0 };
  const toRemove = nodes.length - maxNodes;

  const sorted = [...nodes].sort((a, b) => {
    switch (strategy) {
      case "lru":
        return a.lastAccessedAt - b.lastAccessedAt;
      case "fifo":
        return a.createdAt - b.createdAt;
      case "importance":
        return a.importance - b.importance;
    }
  });

  const removedIds = new Set(sorted.slice(0, toRemove).map((n) => n.id));
  return { kept: nodes.filter((n) => !removedIds.has(n.id)), removed: toRemove };
}

/**
 * Applies up to four eviction passes in order:
 * 1. Expired TTL nodes
 * 2. Nodes older than `maxAge`
 * 3. Nodes below `minImportance`
 * 4. Strategy-based eviction down to `maxNodes`
 */
export function prune(
  nodes: MemoryNode[],
  options: PruneOptions,
  now = Date.now(),
): { kept: MemoryNode[] } & PruneResult {
  let current = nodes;
  let totalRemoved = 0;

  const step1 = removeExpired(current, now);
  current = step1.kept;
  totalRemoved += step1.removed;

  if (options.maxAge !== undefined) {
    const step2 = removeByMaxAge(current, options.maxAge, now);
    current = step2.kept;
    totalRemoved += step2.removed;
  }

  if (options.minImportance !== undefined) {
    const step3 = removeByMinImportance(current, options.minImportance);
    current = step3.kept;
    totalRemoved += step3.removed;
  }

  if (options.maxNodes !== undefined) {
    const step4 = removeByStrategy(current, options.maxNodes, options.strategy ?? "lru");
    current = step4.kept;
    totalRemoved += step4.removed;
  }

  return { kept: current, removed: totalRemoved };
}
