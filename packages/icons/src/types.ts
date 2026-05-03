import type React from "react";

/** Props accepted by every icon component. */
export type IconProps = React.SVGProps<SVGSVGElement> & {
  /**
   * Sets both `width` and `height`. Accepts any valid CSS length or a raw number (px).
   * @default 24
   */
  size?: number | string;
};
