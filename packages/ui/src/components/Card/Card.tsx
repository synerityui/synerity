import { forwardRef } from "react";
import clsx from "clsx";

import * as styles from "./Card.module.css";

export type CardShadow = "none" | "sm" | "md" | "lg";

export type CardProps = {
  shadow?: CardShadow;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export type CardSectionProps = {
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Container card with optional header, body, and footer sections.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ shadow = "sm", className, children, ...rest }, ref) => (
    <div ref={ref} className={clsx(styles.root, styles[shadow], className)} {...rest}>
      {children}
    </div>
  ),
);
Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={clsx(styles.header, className)} {...rest}>{children}</div>
  ),
);
CardHeader.displayName = "CardHeader";

export const CardBody = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={clsx(styles.body, className)} {...rest}>{children}</div>
  ),
);
CardBody.displayName = "CardBody";

export const CardFooter = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={clsx(styles.footer, className)} {...rest}>{children}</div>
  ),
);
CardFooter.displayName = "CardFooter";
