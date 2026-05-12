import { forwardRef } from "react";
import clsx from "clsx";

import styles from "./Link.module.css";

export type LinkVariant = "inline" | "standalone";

export type LinkProps = {
  variant?: LinkVariant;
  external?: boolean;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * Anchor element styled with design-system link tokens. Use `external` to
 * open links in a new tab with the appropriate security attributes and an
 * external-link indicator icon.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant = "inline", external = false, className, children, ...rest }, ref) => (
    <a
      ref={ref}
      className={clsx(styles.root, styles[variant], className)}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      {...rest}
    >
      {children}
      {external && (
        <svg
          className={styles.externalIcon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 12 12"
          width="0.75em"
          height="0.75em"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="currentColor"
            d="M3.5 1A.5.5 0 0 0 3 1.5v7a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V6a.5.5 0 0 1 1 0v3a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 2 9V1.5A1.5 1.5 0 0 1 3.5 0H7a.5.5 0 0 1 0 1H3.5ZM8 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1.707L6.854 6.354a.5.5 0 1 1-.708-.708L10.293 1H8.5A.5.5 0 0 1 8 .5Z"
          />
        </svg>
      )}
    </a>
  ),
);
Link.displayName = "Link";
