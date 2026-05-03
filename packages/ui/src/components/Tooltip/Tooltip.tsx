import clsx from "clsx";
import { useTooltip } from "@synerity/headless";

import styles from "./Tooltip.module.css";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export type TooltipProps = {
  content: React.ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
  disabled?: boolean;
  children: React.ReactElement;
  className?: string;
};

/**
 * Wraps a single child with a tooltip. Opens on hover/focus after a delay.
 */
export function Tooltip({
  content,
  placement = "top",
  delay = 300,
  disabled = false,
  children,
  className,
}: TooltipProps) {
  const { isVisible, triggerProps, tooltipProps } = useTooltip({ delay, placement });

  if (disabled) return children;

  return (
    <span className={clsx(styles.wrapper, styles[placement])}>
      {/* Clone child and inject trigger props */}
      {cloneWithProps(children, triggerProps)}
      {isVisible && (
        <span className={styles.tooltipContainer}>
          <span className={clsx(styles.tooltip, className)} {...tooltipProps}>
            {content}
          </span>
        </span>
      )}
    </span>
  );
}

function cloneWithProps(
  child: React.ReactElement,
  props: React.HTMLAttributes<HTMLElement>,
): React.ReactElement {
  return {
    ...child,
    props: { ...child.props, ...props },
  };
}
