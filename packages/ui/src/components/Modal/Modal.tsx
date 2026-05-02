import { forwardRef } from "react";
import clsx from "clsx";
import { useDialog } from "@synerity/headless";

import styles from "./Modal.module.css";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export type ModalProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: ModalSize;
  title?: string;
  /** Render custom footer actions. */
  footer?: React.ReactNode;
  closeOnOverlayClick?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export type ModalTriggerProps = {
  children: React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>>;
  /** The open/trigger props injected into the child. */
  openDialog: () => void;
};

/**
 * Modal dialog with overlay, focus trap, scroll lock, and ARIA wiring.
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      defaultOpen = false,
      onOpenChange,
      size = "md",
      title,
      footer,
      closeOnOverlayClick = true,
      children,
      className,
    },
    _ref,
  ) => {
    const { isOpen, close, dialogProps, dialogRef, overlayProps, titleProps, descriptionProps } = useDialog({
      open,
      defaultOpen,
      onOpenChange,
      closeOnOverlayClick,
    });

    if (!isOpen) return null;

    return (
      <div className={styles.overlay} {...overlayProps}>
        <div
          ref={dialogRef as React.Ref<HTMLDivElement>}
          className={clsx(styles.dialog, styles[size], className)}
          {...dialogProps}
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <div className={styles.header}>
              <h2 className={styles.title} {...titleProps}>
                {title}
              </h2>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={close}
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>
          )}
          <div className={styles.body} {...descriptionProps}>
            {children}
          </div>
          {footer && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>
    );
  },
);

Modal.displayName = "Modal";
