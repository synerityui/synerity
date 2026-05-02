import { useCallback } from "react";

import { useControllable } from "../utils/useControllable";

type UseDisclosureProps = {
  open?: boolean | undefined;
  defaultOpen?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
};

type UseDisclosureReturn = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  getButtonProps: (props?: React.ButtonHTMLAttributes<HTMLButtonElement>) => React.ButtonHTMLAttributes<HTMLButtonElement>;
  getPanelProps: (props?: React.HTMLAttributes<HTMLElement>) => React.HTMLAttributes<HTMLElement>;
};

/**
 * Manages a simple open/close boolean state.
 * Supports controlled and uncontrolled usage.
 */
export function useDisclosure({
  open,
  defaultOpen = false,
  onOpenChange,
}: UseDisclosureProps = {}): UseDisclosureReturn {
  const [isOpen = false, setIsOpen] = useControllable({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const openFn = useCallback(() => setIsOpen(true), [setIsOpen]);
  const closeFn = useCallback(() => setIsOpen(false), [setIsOpen]);
  const toggle = useCallback(() => setIsOpen(!isOpen), [setIsOpen, isOpen]);

  const getButtonProps = useCallback(
    (props: React.ButtonHTMLAttributes<HTMLButtonElement> = {}) => ({
      ...props,
      "aria-expanded": isOpen,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        toggle();
        props.onClick?.(e);
      },
    }),
    [isOpen, toggle],
  );

  const getPanelProps = useCallback(
    (props: React.HTMLAttributes<HTMLElement> = {}) => ({
      ...props,
      hidden: !isOpen,
    }),
    [isOpen],
  );

  return { isOpen, open: openFn, close: closeFn, toggle, getButtonProps, getPanelProps };
}

import type React from "react";
