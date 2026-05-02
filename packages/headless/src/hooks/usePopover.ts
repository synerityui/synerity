import { useCallback, useRef } from "react";

import { useControllable } from "../utils/useControllable";
import { useId } from "../utils/useId";
import { useOutsideClick } from "../utils/useOutsideClick";
import { Key } from "../utils/keyboard";

type UsePopoverProps = {
  open?: boolean | undefined;
  defaultOpen?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
  placement?: "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | undefined;
};

type UsePopoverReturn = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  triggerProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
  popoverProps: React.HTMLAttributes<HTMLElement>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  popoverRef: React.RefObject<HTMLElement | null>;
};

/**
 * Non-modal floating panel (no focus trap, no scroll lock).
 * Positioning is left to @floating-ui/react in the consuming component.
 */
export function usePopover({
  open,
  defaultOpen = false,
  onOpenChange,
  placement = "bottom",
}: UsePopoverProps = {}): UsePopoverReturn {
  const [isOpen = false, setIsOpen] = useControllable({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const popoverId = useId("popover");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLElement>(null);

  useOutsideClick([triggerRef, popoverRef], () => setIsOpen(false), isOpen);

  const openFn = useCallback(() => setIsOpen(true), [setIsOpen]);
  const closeFn = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, [setIsOpen]);
  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);

  const triggerProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    type: "button",
    "aria-expanded": isOpen,
    "aria-controls": popoverId,
    onClick: toggle,
    onKeyDown: (e) => { if (e.key === Key.Escape) closeFn(); },
  };

  const popoverProps: React.HTMLAttributes<HTMLElement> & { "data-placement": string } = {
    id: popoverId,
    role: "region",
    "data-placement": placement,
    onKeyDown: (e) => { if (e.key === Key.Escape) { e.stopPropagation(); closeFn(); } },
  };

  return { isOpen, open: openFn, close: closeFn, triggerProps, popoverProps, triggerRef, popoverRef };
}

import type React from "react";
