import { cloneElement, forwardRef, isValidElement } from "react";
import clsx from "clsx";
import { usePopover, mergeRefs } from "@synerity/headless";

import styles from "./Popover.module.css";

export type PopoverPlacement =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end";

export type PopoverProps = {
  /** The element that triggers the popover. Must accept a ref and event handler props. */
  trigger: React.ReactElement;
  /** Content rendered inside the floating panel. */
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: PopoverPlacement;
  className?: string;
};

/**
 * Non-modal floating panel anchored to a trigger element.
 * No focus trap or scroll lock — use `<Modal>` for blocking interactions.
 * Closes on outside click or Escape.
 */
export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      trigger,
      children,
      open: openProp,
      defaultOpen,
      onOpenChange,
      placement = "bottom",
      className,
    },
    ref,
  ) => {
    const { isOpen, triggerProps, popoverProps, triggerRef, popoverRef } = usePopover({
      open: openProp,
      defaultOpen,
      onOpenChange,
      placement,
    });

    const injectedTrigger = isValidElement(trigger)
      ? cloneElement(trigger as React.ReactElement<React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }>, {
          ...triggerProps,
          ref: mergeRefs(
            triggerRef as React.RefObject<HTMLElement | null>,
            (trigger as React.ReactElement & { ref?: React.Ref<HTMLElement> }).ref ?? null,
          ),
        })
      : trigger;

    return (
      <span className={styles.anchor}>
        {injectedTrigger}
        {isOpen && (
          <div
            ref={mergeRefs(ref, popoverRef as React.RefObject<HTMLDivElement | null>)}
            className={clsx(styles.popover, styles[placement.replace("-", "_") as keyof typeof styles], className)}
            {...popoverProps}
          >
            {children}
          </div>
        )}
      </span>
    );
  },
);

Popover.displayName = "Popover";
