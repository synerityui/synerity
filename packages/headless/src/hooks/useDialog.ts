import { useCallback, useRef } from "react";

import { useControllable } from "../utils/useControllable";
import { useId } from "../utils/useId";
import { useFocusTrap } from "../utils/useFocusTrap";
import { useScrollLock } from "../utils/useScrollLock";
import { useOutsideClick } from "../utils/useOutsideClick";
import { Key } from "../utils/keyboard";

type UseDialogProps = {
  open?: boolean | undefined;
  defaultOpen?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
  /** When true, clicking the backdrop closes the dialog. Default: true */
  closeOnOverlayClick?: boolean | undefined;
  /** When true, pressing Escape closes the dialog. Default: true */
  closeOnEscape?: boolean | undefined;
};

type UseDialogReturn = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  dialogProps: React.HTMLAttributes<HTMLElement>;
  /** Attach this ref to the dialog container element for focus trap and outside-click detection. */
  dialogRef: React.RefObject<HTMLElement | null>;
  overlayProps: React.HTMLAttributes<HTMLElement>;
  titleProps: React.HTMLAttributes<HTMLElement>;
  descriptionProps: React.HTMLAttributes<HTMLElement>;
  triggerProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
};

/**
 * Modal dialog with focus trap, scroll lock, and ARIA wiring.
 * Follows the ARIA dialog pattern: role="dialog", aria-modal, focus trap, Escape to close.
 */
export function useDialog({
  open,
  defaultOpen = false,
  onOpenChange,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}: UseDialogProps = {}): UseDialogReturn {
  const [isOpen = false, setIsOpen] = useControllable({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const dialogRef = useRef<HTMLElement>(null);
  const baseId = useId("dialog");
  const titleId = `${baseId}-title`;
  const descriptionId = `${baseId}-description`;

  useFocusTrap(dialogRef, isOpen);
  useScrollLock(isOpen);
  useOutsideClick([dialogRef], () => closeOnOverlayClick && setIsOpen(false), isOpen);

  const openDialog = useCallback(() => setIsOpen(true), [setIsOpen]);
  const closeDialog = useCallback(() => setIsOpen(false), [setIsOpen]);

  const dialogProps: React.HTMLAttributes<HTMLElement> = {
    role: "dialog",
    "aria-modal": true,
    "aria-labelledby": titleId,
    "aria-describedby": descriptionId,
    onKeyDown: (event) => {
      if (closeOnEscape && event.key === Key.Escape) {
        event.stopPropagation();
        closeDialog();
      }
    },
  };

  const overlayProps: React.HTMLAttributes<HTMLElement> = {
    "aria-hidden": true,
    onClick: closeOnOverlayClick ? closeDialog : undefined,
  };

  const titleProps: React.HTMLAttributes<HTMLElement> = { id: titleId };
  const descriptionProps: React.HTMLAttributes<HTMLElement> = { id: descriptionId };

  const triggerProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    type: "button",
    "aria-haspopup": "dialog",
    "aria-expanded": isOpen,
    "aria-controls": baseId,
    onClick: openDialog,
  };

  return { isOpen, open: openDialog, close: closeDialog, dialogProps, dialogRef, overlayProps, titleProps, descriptionProps, triggerProps };
}

import type React from "react";
