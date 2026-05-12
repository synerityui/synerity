import { forwardRef } from "react";
import clsx from "clsx";

import styles from "./Truncate.module.css";

export type TruncateProps = {
  lines?: number;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement & HTMLDivElement>;

/**
 * Clamps text to a fixed number of lines with an ellipsis.
 * Renders as `<span>` for single-line and `<div>` for multi-line clamping.
 */
export const Truncate = forwardRef<HTMLSpanElement & HTMLDivElement, TruncateProps>(
  ({ lines = 1, className, children, style, ...rest }, ref) => {
    if (lines <= 1) {
      return (
        <span
          ref={ref}
          className={clsx(styles.singleLine, className)}
          style={style}
          {...rest}
        >
          {children}
        </span>
      );
    }

    return (
      <div
        ref={ref}
        className={clsx(styles.multiLine, className)}
        style={{ WebkitLineClamp: lines, ...style } as React.CSSProperties}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
Truncate.displayName = "Truncate";
