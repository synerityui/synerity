import { generateId } from "./id";
import type { EdgeType, MemoryEdge } from "./types";

/** Creates a new directed edge between two nodes. */
export function createEdge(
  fromId: string,
  toId: string,
  type: EdgeType,
  weight = 1.0,
): MemoryEdge {
  return {
    id: generateId("edge"),
    fromId,
    toId,
    type,
    weight,
    createdAt: Date.now(),
  };
}
