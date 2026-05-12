import { forwardRef } from "react";
import clsx from "clsx";
import { useDialog } from "@synerity/headless";

import styles from "./Drawer.module.css";

export type DrawerPlacement = "left" | "right" | "top" | "bottom";
export type DrawerSize = "sm" | "md" | "lg" | "xl" | "full";

export type DrawerProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: DrawerPlacement;
  size?: DrawerSize;
  title?: string;
  description?: string;
  closeOnOverlayClick?: boolean;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

/**
 * Slide-in drawer panel anchored to any viewport edge.
 * Manages focus trap, scroll lock, and ARIA dialog wiring via useDialog.
 */
export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      open,
      defaultOpen = false,
      onOpenChange,
      placement = "right",
      size = "md",
      title,
      description,
      closeOnOverlayClick = true,
      children,
      footer,
      className,
    },
    _ref,
  ) => {
    const { isOpen, close, dialogProps, dialogRef, overlayProps, titleProps, descriptionProps } =
      useDialog({ open, defaultOpen, onOpenChange, closeOnOverlayClick });

    if (!isOpen) return null;

    return (
      <div className={styles.overlay} {...overlayProps}>
        <div
          ref={dialogRef as React.RefObject<HTMLDivElement>}
          className={clsx(
            styles.panel,
            styles[placement],
            styles[`size-${size}`],
            className,
          )}
          {...dialogProps}
        >
          {(title ?? description) && (
            <div className={styles.header}>
              <div className={styles.headerText}>
                {title && (
                  <h2 className={styles.title} {...titleProps}>
                    {title}
                  </h2>
                )}
                {description && (
                  <p className={styles.description} {...descriptionProps}>
                    {description}
                  </p>
                )}
              </div>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={close}
                aria-label="Close drawer"
              >
                ✕
              </button>
            </div>
          )}
          <div className={styles.body}>{children}</div>
          {footer && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>
    );
  },
);

Drawer.displayName = "Drawer";

// Re-export useDialog as useDrawer for consumer convenience.
export { useDialog as useDrawer } from "@synerity/headless";
