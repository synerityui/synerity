import { forwardRef } from "react";
import clsx from "clsx";

import styles from "./Chip.module.css";

export type ChipVariant = "default" | "primary" | "success" | "warning" | "danger";
export type ChipSize = "sm" | "md";

export type ChipProps = {
  label: string;
  onRemove?: () => void;
  variant?: ChipVariant;
  size?: ChipSize;
  disabled?: boolean;
  className?: string;
};

/**
 * Small removable pill tag for displaying categorisation labels or filter chips.
 */
export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  ({ label, onRemove, variant = "default", size = "md", disabled = false, className }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(styles.root, styles[variant], styles[size], disabled && styles.disabled, className)}
      >
        <span className={styles.label}>{label}</span>
        {onRemove && (
          <button
            type="button"
            className={styles.removeBtn}
            onClick={disabled ? undefined : onRemove}
            disabled={disabled}
            aria-label="Remove"
            tabIndex={disabled ? -1 : 0}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path
                d="M1 1L9 9M9 1L1 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </span>
    );
  },
);

Chip.displayName = "Chip";
