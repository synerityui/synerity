import { forwardRef } from "react";
import clsx from "clsx";

import styles from "./Container.module.css";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

export type ContainerProps = {
  size?: ContainerSize;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Centered layout wrapper that constrains content to a max-width based on
 * the chosen `size`. Adds horizontal padding for gutters.
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = "lg", className, children, ...rest }, ref) => (
    <div ref={ref} className={clsx(styles.root, styles[size], className)} {...rest}>
      {children}
    </div>
  ),
);
Container.displayName = "Container";
