import { forwardRef } from "react";
import clsx from "clsx";

import styles from "./Callout.module.css";

export type CalloutVariant = "info" | "success" | "warning" | "danger" | "neutral";

export type CalloutProps = {
  variant?: CalloutVariant;
  title?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function DefaultIcon({ variant }: { variant: CalloutVariant }) {
  if (variant === "neutral") return null;

  if (variant === "info") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 7v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="5" r="0.75" fill="currentColor" />
      </svg>
    );
  }

  if (variant === "success") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M5 8.5L7 10.5L11 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === "warning") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M8 2L14.5 13H1.5L8 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M8 6.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="11.5" r="0.75" fill="currentColor" />
      </svg>
    );
  }

  if (variant === "danger") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return null;
}

/**
 * Inline notice block for contextual information, warnings, or alerts.
 * Use `icon` to override the default icon per variant.
 */
export const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  ({ variant = "info", title, icon, children, className, ...rest }, ref) => {
    const renderedIcon = icon !== undefined ? icon : <DefaultIcon variant={variant} />;

    return (
      <div
        ref={ref}
        role="note"
        className={clsx(styles.root, styles[variant], className)}
        {...rest}
      >
        {renderedIcon && (
          <span className={styles.icon} aria-hidden>
            {renderedIcon}
          </span>
        )}
        <div className={styles.body}>
          {title && <p className={styles.title}>{title}</p>}
          {children && <div className={styles.content}>{children}</div>}
        </div>
      </div>
    );
  },
);

Callout.displayName = "Callout";
