import clsx from "clsx";

import * as styles from "./Alert.module.css";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export type AlertProps = {
  variant?: AlertVariant;
  title?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Contextual feedback message. Use `onClose` to make it dismissible.
 */
export function Alert({
  variant = "info",
  title,
  icon,
  onClose,
  children,
  className,
  ...rest
}: AlertProps) {
  return (
    <div role="alert" className={clsx(styles.root, styles[variant], className)} {...rest}>
      {icon && <span className={styles.icon} aria-hidden>{icon}</span>}
      <div className={styles.body}>
        {title && <p className={styles.title}>{title}</p>}
        {children && <p className={styles.description}>{children}</p>}
      </div>
      {onClose && (
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Dismiss alert"
        >
          ✕
        </button>
      )}
    </div>
  );
}
