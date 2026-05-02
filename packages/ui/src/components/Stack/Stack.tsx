import { forwardRef } from "react";
import clsx from "clsx";

import styles from "./Stack.module.css";

export type StackProps = {
  gap?: React.CSSProperties["gap"];
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Vertical flex container. All spacing via the `gap` prop (accepts any CSS gap value).
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ gap = "var(--synerity-space-4)", align, justify, className, style, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={clsx(styles.root, className)}
      style={{ gap, alignItems: align, justifyContent: justify, ...style }}
      {...rest}
    >
      {children}
    </div>
  ),
);
Stack.displayName = "Stack";
