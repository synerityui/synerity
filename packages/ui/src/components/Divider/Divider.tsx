import { forwardRef } from "react";
import clsx from "clsx";

import styles from "./Divider.module.css";

export type DividerOrientation = "horizontal" | "vertical";

export type DividerProps = {
  orientation?: DividerOrientation;
  label?: string;
  className?: string;
} & React.HTMLAttributes<HTMLHRElement | HTMLDivElement>;

/**
 * Visual separator between content sections. Supports horizontal and vertical
 * orientations as well as an optional centered text label.
 */
export const Divider = forwardRef<HTMLHRElement & HTMLDivElement, DividerProps>(
  ({ orientation = "horizontal", label, className, ...rest }, ref) => {
    if (orientation === "vertical") {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={clsx(styles.vertical, className)}
          {...rest}
        />
      );
    }

    if (label) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="horizontal"
          className={clsx(styles.labeled, className)}
          {...rest}
        >
          <span className={styles.line} />
          <span className={styles.labelText}>{label}</span>
          <span className={styles.line} />
        </div>
      );
    }

    return (
      <hr
        ref={ref}
        className={clsx(styles.horizontal, className)}
        {...(rest as React.HTMLAttributes<HTMLHRElement>)}
      />
    );
  },
);
Divider.displayName = "Divider";
