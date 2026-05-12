import { forwardRef } from "react";
import clsx from "clsx";

import styles from "./Progress.module.css";

export type ProgressSize = "xs" | "sm" | "md" | "lg";

export type ProgressProps = {
  /** Current value. */
  value: number;
  /** Maximum value. Default: 100 */
  max?: number;
  size?: ProgressSize;
  /** Accessible label for screen readers. */
  label?: string;
  /** Show the numeric percentage beside the track. */
  showValue?: boolean;
  className?: string;
};

/**
 * Linear progress bar with `role="progressbar"` and full ARIA value wiring.
 * Pass `value={null}` (or omit value) for an indeterminate state (not yet supported — tracked).
 */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, max = 100, size = "md", label, showValue = false, className }, ref) => {
    const percent = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div ref={ref} className={clsx(styles.root, className)}>
        {(label || showValue) && (
          <div className={styles.header}>
            {label && <span className={styles.label}>{label}</span>}
            {showValue && (
              <span className={styles.value} aria-hidden>
                {Math.round(percent)}%
              </span>
            )}
          </div>
        )}
        <div
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
          className={clsx(styles.track, styles[size])}
        >
          <div
            className={styles.bar}
            /* inline style is unavoidable for dynamic percentage */
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    );
  },
);

Progress.displayName = "Progress";
