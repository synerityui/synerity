let _counter = 0;

/**
 * Generates a collision-resistant ID without crypto dependency.
 * Safe in both Node.js 18+ and browsers.
 */
export function generateId(prefix = "node"): string {
  _counter = (_counter + 1) % Number.MAX_SAFE_INTEGER;
  return `${prefix}_${Date.now().toString(36)}_${_counter.toString(36)}`;
}
