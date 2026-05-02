import { useId as useReactId } from "react";

/**
 * Returns a stable, SSR-safe unique ID.
 * Wraps React 18's useId with an optional prefix for readability.
 */
export function useId(prefix?: string): string {
  const id = useReactId();
  return prefix ? `${prefix}-${id}` : id;
}
