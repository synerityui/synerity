import { forwardRef } from "react";
import clsx from "clsx";

import styles from "./Skeleton.module.css";

export type SkeletonProps = {
  /** Explicit width. Defaults to 100% of the container. */
  width?: string | number;
  /** Explicit height. Defaults to 1em (matches surrounding text). */
  height?: string | number;
  /** Override the default pill-shaped radius. */
  radius?: string | number;
  /** Render a circle (avatar placeholder). Width must be set. */
  circle?: boolean;
  className?: string;
};

/**
 * Shimmer loading placeholder. Reads `aria-hidden` so it is invisible to assistive technology.
 * Pair multiple skeletons with a wrapping `role="status" aria-label="Loading…"` element
 * to communicate loading state to screen readers.
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ width, height, radius, circle = false, className }, ref) => {
    const style: React.CSSProperties = {};
    if (width !== undefined) style.width = typeof width === "number" ? `${width}px` : width;
    if (height !== undefined) style.height = typeof height === "number" ? `${height}px` : height;
    if (radius !== undefined) style.borderRadius = typeof radius === "number" ? `${radius}px` : radius;
    if (circle) style.borderRadius = "9999px";

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        style={style}
        aria-hidden="true"
      />
    );
  },
);

Skeleton.displayName = "Skeleton";
