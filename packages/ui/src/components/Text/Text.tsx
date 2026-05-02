import { forwardRef, createElement } from "react";
import clsx from "clsx";

import styles from "./Text.module.css";

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type TextWeight = "normal" | "medium" | "semibold" | "bold";
export type TextColor = "primary" | "secondary" | "tertiary" | "disabled" | "danger" | "success" | "inherit";

export type TextProps = {
  as?: React.ElementType;
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  truncate?: boolean;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

/**
 * Polymorphic text primitive. Renders as `<p>` by default.
 */
export const Text = forwardRef<HTMLElement, TextProps>(
  ({ as: Tag = "p", size = "md", weight = "normal", color = "primary", truncate = false, className, children, ...rest }, ref) => {
    const sizeClass = styles[size.replace(".", "\\.")  as keyof typeof styles] ?? styles.md;
    return createElement(
      Tag,
      {
        ref,
        className: clsx(
          styles.root,
          sizeClass,
          styles[weight],
          styles[color],
          truncate && styles.truncate,
          className,
        ),
        ...rest,
      },
      children,
    );
  },
);
Text.displayName = "Text";
