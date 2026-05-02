import { useEffect, useRef } from "react";

import { getFirstAndLastFocusable } from "./dom";
import { Key } from "./keyboard";

/**
 * Traps focus within a container element while active.
 * Returns focus to the previously focused element when deactivated.
 */
export function useFocusTrap(containerRef: React.RefObject<HTMLElement | null>, active: boolean) {
  const previouslyFocusedRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    if (!container) return;

    // Remember what had focus before the trap activated
    previouslyFocusedRef.current = document.activeElement;

    // Move focus into the container
    const [first] = getFirstAndLastFocusable(container);
    first?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== Key.Tab || !containerRef.current) return;

      const [first, last] = getFirstAndLastFocusable(containerRef.current);
      if (!first || !last) return;

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      // Restore focus on cleanup
      if (previouslyFocusedRef.current && "focus" in previouslyFocusedRef.current) {
        (previouslyFocusedRef.current as HTMLElement).focus();
      }
    };
  }, [active, containerRef]);
}

import type React from "react";
