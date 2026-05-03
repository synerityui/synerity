/**
 * Splits a dot/bracket path string into an array of keys.
 * "address.street"  → ["address", "street"]
 * "tags[0].name"    → ["tags", "0", "name"]
 */
export function parsePath(path: string): string[] {
  return path.split(/[.[\]]/).filter(Boolean);
}

/**
 * Reads a value from a nested object using a dot/bracket path.
 * Returns `undefined` if any segment along the path is missing.
 */
export function getByPath(obj: Record<string, unknown>, path: string): unknown {
  return parsePath(path).reduce<unknown>((acc, key) => {
    if (acc == null || typeof acc !== "object") return undefined;
    return (acc as Record<string, unknown>)[key];
  }, obj);
}

/**
 * Returns a new object with `value` set at the given dot/bracket path.
 * Creates missing intermediate objects/arrays as needed.
 * Never mutates the original object.
 */
export function setByPath(
  obj: Record<string, unknown>,
  path: string,
  value: unknown,
): Record<string, unknown> {
  const keys = parsePath(path);
  if (keys.length === 0) return obj;

  function setIn(current: unknown, remainingKeys: string[]): unknown {
    const [head, ...tail] = remainingKeys as [string, ...string[]];
    if (tail.length === 0) {
      if (Array.isArray(current)) {
        const arr = [...current];
        (arr as unknown[])[Number(head)] = value;
        return arr;
      }
      return { ...(current as Record<string, unknown>), [head]: value };
    }

    const nextKeyIsIndex = /^\d+$/.test(tail[0]!);
    const nested = (current as Record<string, unknown>)?.[head];
    const nextContainer: unknown =
      nested != null && typeof nested === "object"
        ? nested
        : nextKeyIsIndex
          ? []
          : {};

    const updated = setIn(nextContainer, tail);

    if (Array.isArray(current)) {
      const arr = [...current];
      (arr as unknown[])[Number(head)] = updated;
      return arr;
    }
    return { ...(current as Record<string, unknown>), [head]: updated };
  }

  return setIn(obj, keys) as Record<string, unknown>;
}
