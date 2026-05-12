import { forwardRef } from "react";
import clsx from "clsx";

import styles from "./AspectRatio.module.css";

export type AspectRatioProps = {
  ratio?: number;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Preserves a fixed width-to-height ratio for its child content regardless
 * of the available width. Defaults to 16:9.
 */
export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 16 / 9, className, children, style, ...rest }, ref) => (
    <div
      ref={ref}
      className={clsx(styles.root, className)}
      style={{ "--ratio": ratio, ...style } as React.CSSProperties}
      {...rest}
    >
      <div className={styles.inner}>{children}</div>
    </div>
  ),
);
AspectRatio.displayName = "AspectRatio";
