import { forwardRef, createElement } from "react";
import clsx from "clsx";

import * as styles from "./Heading.module.css";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingProps = {
  level?: HeadingLevel;
  /** Render as a different element while keeping the same visual level. */
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;

/**
 * Semantic heading h1–h6 with level-appropriate size and weight.
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 2, as, className, children, ...rest }, ref) => {
    const Tag = as ?? (`h${level}` as React.ElementType);
    const levelClass = styles[String(level) as keyof typeof styles] ?? styles["2"];
    return createElement(
      Tag,
      { ref, className: clsx(styles.root, levelClass, className), ...rest },
      children,
    );
  },
);
Heading.displayName = "Heading";
