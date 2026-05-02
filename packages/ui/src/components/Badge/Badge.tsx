import clsx from "clsx";

import styles from "./Badge.module.css";

export type BadgeVariant = "default" | "primary" | "success" | "warning" | "danger" | "info";
export type BadgeSize = "sm" | "md" | "lg";

export type BadgeProps = {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>;

/**
 * Inline status badge. Use `dot` for a coloured dot with no text.
 */
export function Badge({
  variant = "default",
  size = "md",
  dot = false,
  children,
  className,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={clsx(styles.root, styles[variant], styles[size], dot && styles.dot, className)}
      {...rest}
    >
      {!dot && children}
    </span>
  );
}
