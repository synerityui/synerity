import clsx from "clsx";

import * as styles from "./Spinner.module.css";

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";

export type SpinnerProps = {
  size?: SpinnerSize;
  label?: string;
  className?: string;
} & React.HTMLAttributes<SVGSVGElement>;

/**
 * Animated loading spinner. Defaults to current text colour.
 */
export function Spinner({ size = "md", label = "Loading…", className, ...rest }: SpinnerProps) {
  return (
    <svg
      className={clsx(styles.root, styles[size], className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      aria-label={label}
      role="status"
      {...rest}
    >
      <path d="M12 2a10 10 0 0 1 10 10" opacity={0.25} />
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  );
}
