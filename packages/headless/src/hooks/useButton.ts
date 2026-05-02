import { useCallback } from "react";

import { isActivationKey } from "../utils/keyboard";

type UseButtonProps = {
  disabled?: boolean | undefined;
  loading?: boolean | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  /** When provided, renders as a link (use linkProps instead of buttonProps). */
  href?: string | undefined;
};

type UseButtonReturn = {
  buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
  linkProps: React.AnchorHTMLAttributes<HTMLAnchorElement>;
  isDisabled: boolean;
  isLoading: boolean;
};

/**
 * Provides correct props for a button or link-rendered-as-button.
 * Handles disabled state, loading state, and keyboard activation.
 */
export function useButton({
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  href,
}: UseButtonProps = {}): UseButtonReturn {
  const isDisabled = disabled || loading;

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (isDisabled) return;
      if (isActivationKey(event) && href) {
        event.preventDefault();
        (event.currentTarget as HTMLAnchorElement).click();
      }
    },
    [isDisabled, href],
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    },
    [isDisabled, onClick],
  );

  const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    type,
    disabled: isDisabled,
    "aria-disabled": isDisabled || undefined,
    "aria-busy": loading || undefined,
    onClick: handleClick,
  };

  const linkProps: React.AnchorHTMLAttributes<HTMLAnchorElement> = {
    href: isDisabled ? undefined : href,
    role: "button",
    "aria-disabled": isDisabled || undefined,
    "aria-busy": loading || undefined,
    tabIndex: isDisabled ? -1 : 0,
    onKeyDown: handleKeyDown,
    onClick: isDisabled
      ? (e) => e.preventDefault()
      : (e) => onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>),
  };

  return { buttonProps, linkProps, isDisabled, isLoading: loading };
}

import type React from "react";
