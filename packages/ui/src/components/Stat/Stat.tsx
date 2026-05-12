import { forwardRef } from "react";
import clsx from "clsx";

import styles from "./Stat.module.css";

export type StatTrend = "up" | "down" | "neutral";

export type StatProps = {
  label: string;
  value: React.ReactNode;
  trend?: StatTrend;
  trendValue?: string;
  helpText?: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function TrendArrowUp() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M6 9V3M6 3L3 6M6 3L9 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrendArrowDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M6 3V9M6 9L3 6M6 9L9 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Metric display card with optional trend indicator and help text.
 */
export const Stat = forwardRef<HTMLDivElement, StatProps>(
  ({ label, value, trend, trendValue, helpText, className, ...rest }, ref) => {
    return (
      <div ref={ref} className={clsx(styles.root, className)} {...rest}>
        <p className={styles.label}>{label}</p>
        <p className={styles.value}>{value}</p>
        {(trend || trendValue) && (
          <div className={clsx(styles.trend, trend && styles[trend])}>
            {trend === "up" && <TrendArrowUp />}
            {trend === "down" && <TrendArrowDown />}
            {trendValue && <span>{trendValue}</span>}
          </div>
        )}
        {helpText && <p className={styles.helpText}>{helpText}</p>}
      </div>
    );
  },
);

Stat.displayName = "Stat";
