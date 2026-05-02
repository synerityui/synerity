import { forwardRef } from "react";
import clsx from "clsx";

import styles from "./Group.module.css";

export type GroupProps = {
  gap?: React.CSSProperties["gap"];
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  wrap?: boolean;
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Horizontal flex container. All spacing via the `gap` prop.
 */
export const Group = forwardRef<HTMLDivElement, GroupProps>(
  ({ gap = "var(--synerity-space-3)", align = "center", justify, wrap = true, className, style, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={clsx(styles.root, className)}
      style={{ gap, alignItems: align, justifyContent: justify, flexWrap: wrap ? "wrap" : "nowrap", ...style }}
      {...rest}
    >
      {children}
    </div>
  ),
);
Group.displayName = "Group";
