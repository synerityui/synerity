import { forwardRef } from "react";
import clsx from "clsx";

import styles from "./Timeline.module.css";

export type TimelineVariant = "default" | "success" | "warning" | "danger" | "info";

export type TimelineItem = {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  time?: string;
  icon?: React.ReactNode;
  variant?: TimelineVariant;
};

export type TimelineProps = {
  items: TimelineItem[];
  className?: string;
};

function DefaultDot() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <circle cx="6" cy="6" r="5" fill="currentColor" />
    </svg>
  );
}

/**
 * Vertical ordered event list with labeled dots and connecting lines.
 */
export const Timeline = forwardRef<HTMLOListElement, TimelineProps>(
  ({ items, className }, ref) => {
    return (
      <ol ref={ref} className={clsx(styles.root, className)}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const variant = item.variant ?? "default";
          return (
            <li key={item.id} className={clsx(styles.item, !isLast && styles.itemWithLine)}>
              {/* Left column: dot + line */}
              <div className={styles.aside}>
                <span className={clsx(styles.dot, styles[variant])}>
                  {item.icon ?? <DefaultDot />}
                </span>
                {!isLast && <span className={styles.line} aria-hidden />}
              </div>
              {/* Right column: content */}
              <div className={styles.content}>
                <div className={styles.header}>
                  <span className={styles.title}>{item.title}</span>
                  {item.time && <span className={styles.time}>{item.time}</span>}
                </div>
                {item.description && (
                  <div className={styles.description}>{item.description}</div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    );
  },
);

Timeline.displayName = "Timeline";
