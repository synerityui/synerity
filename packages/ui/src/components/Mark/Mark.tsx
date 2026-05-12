import { forwardRef } from "react";
import clsx from "clsx";

import styles from "./Mark.module.css";

export type MarkColor = "yellow" | "green" | "blue" | "pink";

export type MarkProps = {
  color?: MarkColor;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

/**
 * Inline text highlight using a semi-transparent tinted background.
 * Renders as a semantic `<mark>` element.
 */
export const Mark = forwardRef<HTMLElement, MarkProps>(
  ({ color = "yellow", className, children, ...rest }, ref) => (
    <mark
      ref={ref}
      className={clsx(styles.root, styles[color], className)}
      {...rest}
    >
      {children}
    </mark>
  ),
);
Mark.displayName = "Mark";
