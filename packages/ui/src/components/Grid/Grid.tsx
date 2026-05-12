import { forwardRef } from "react";
import clsx from "clsx";

import styles from "./Grid.module.css";

export type GridCols =
  | number
  | { sm?: number; md?: number; lg?: number };

export type GridAlign = "start" | "center" | "end" | "stretch";

export type GridProps = {
  cols?: GridCols;
  gap?: number;
  align?: GridAlign;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

function buildGridStyle(
  cols: GridCols,
  gap: number,
  style: React.CSSProperties | undefined,
): React.CSSProperties {
  const gapToken = `var(--synerity-space-${gap})`;

  if (typeof cols === "number") {
    return {
      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      gap: gapToken,
      ...style,
    };
  }

  return { gap: gapToken, ...style };
}

function buildResponsiveClasses(cols: GridCols): string[] {
  if (typeof cols === "number") return [];
  return [
    cols.sm != null ? styles[`cols-sm-${cols.sm}`] : undefined,
    cols.md != null ? styles[`cols-md-${cols.md}`] : undefined,
    cols.lg != null ? styles[`cols-lg-${cols.lg}`] : undefined,
  ].filter((c): c is string => c !== undefined);
}

/**
 * CSS Grid layout container. Accepts a fixed column count or a responsive
 * breakpoint map. Gap accepts any space token index (1–24).
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ cols = 1, gap = 4, align = "stretch", className, children, style, ...rest }, ref) => (
    <div
      ref={ref}
      className={clsx(
        styles.root,
        styles[`align-${align}`],
        ...buildResponsiveClasses(cols),
        className,
      )}
      style={buildGridStyle(cols, gap, style)}
      {...rest}
    >
      {children}
    </div>
  ),
);
Grid.displayName = "Grid";
