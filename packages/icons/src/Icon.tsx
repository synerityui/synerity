import React from "react";
import type { IconProps } from "./types";

/**
 * Base SVG wrapper shared by all icon components.
 * - `aria-hidden="true"` by default (decorative); pass `aria-label` to make it meaningful.
 * - Stroke-based with `currentColor` so it inherits text colour.
 * - `size` maps to both `width` and `height`.
 */
export const Icon = React.forwardRef<SVGSVGElement, IconProps>(function Icon(
  {
    size = 24,
    "aria-label": ariaLabel,
    "aria-hidden": ariaHidden,
    children,
    ...props
  },
  ref,
) {
  const isDecorative = !ariaLabel;
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden ?? (isDecorative ? true : undefined)}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
      {...props}
    >
      {children}
    </svg>
  );
});
