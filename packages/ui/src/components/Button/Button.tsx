import { forwardRef } from "react";
import clsx from "clsx";
import { useButton } from "@synerity/headless";

import * as styles from "./Button.module.css";

export type ButtonVariant = "solid" | "outline" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonColorScheme = "primary" | "danger";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  colorScheme?: ButtonColorScheme;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  children?: React.ReactNode;
  className?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">;

/**
 * Primary action component. Renders as a `<button>` or `<a>` when `href` is provided.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "solid",
      size = "md",
      colorScheme = "primary",
      loading = false,
      fullWidth = false,
      disabled,
      leftIcon,
      rightIcon,
      href,
      children,
      className,
      onClick,
      type,
      ...rest
    },
    ref,
  ) => {
    const { buttonProps, linkProps, isDisabled } = useButton({
      disabled,
      loading,
      onClick,
      type,
      href,
    });

    const rootClass = clsx(
      styles.root,
      styles[variant],
      styles[size],
      colorScheme === "danger" && styles.danger,
      isDisabled && styles.disabled,
      loading && styles.loading,
      fullWidth && styles.fullWidth,
      className,
    );

    const content = (
      <>
        {loading && (
          <span className={styles.spinner} aria-hidden>
            <LoadingSpinner size={size} />
          </span>
        )}
        <span className={styles.content}>
          {leftIcon && <span aria-hidden>{leftIcon}</span>}
          {children}
          {rightIcon && <span aria-hidden>{rightIcon}</span>}
        </span>
      </>
    );

    if (href) {
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} className={rootClass} {...linkProps}>
          {content}
        </a>
      );
    }

    return (
      <button ref={ref} className={rootClass} {...buttonProps} {...rest}>
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";

function LoadingSpinner({ size }: { size: ButtonSize }) {
  const dim = size === "sm" ? 14 : size === "lg" ? 20 : 16;
  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      style={{ animation: "syn-spin 0.75s linear infinite" }}
      aria-hidden
    >
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  );
}
