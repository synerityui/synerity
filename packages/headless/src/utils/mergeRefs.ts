import type { MutableRefObject, RefCallback } from "react";

type ReactRef<T> = RefCallback<T> | MutableRefObject<T> | null | undefined;

/**
 * Merges multiple React refs into a single callback ref.
 * Accepts any mix of RefCallback and RefObject.
 */
export function mergeRefs<T>(...refs: ReactRef<T>[]): RefCallback<T> {
  return (value: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as MutableRefObject<T | null>).current = value;
      }
    }
  };
}
