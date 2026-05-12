import { forwardRef } from "react";
import clsx from "clsx";

import styles from "./ScrollArea.module.css";

export type ScrollAreaProps = {
  maxHeight?: string | number;
  maxWidth?: string | number;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Scrollable container with a styled thin scrollbar.
 * Pass `maxHeight` and/or `maxWidth` to constrain the scroll region.
 */
export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ maxHeight, maxWidth, className, children, style, ...rest }, ref) => {
    const dynamicStyle: React.CSSProperties = {
      ...style,
      ...(maxHeight !== undefined
        ? { maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight }
        : {}),
      ...(maxWidth !== undefined
        ? { maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth }
        : {}),
    };

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        style={dynamicStyle}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

ScrollArea.displayName = "ScrollArea";
