import { useEffect } from "react";

/**
 * Fires a callback when a click event occurs outside all provided refs.
 */
export function useOutsideClick(
  refs: React.RefObject<HTMLElement | null>[],
  handler: (event: MouseEvent | TouchEvent) => void,
  active = true,
) {
  useEffect(() => {
    if (!active) return;

    function listener(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;
      const isInside = refs.some((ref) => ref.current?.contains(target));
      if (!isInside) {
        handler(event);
      }
    }

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [refs, handler, active]);
}

import type React from "react";
