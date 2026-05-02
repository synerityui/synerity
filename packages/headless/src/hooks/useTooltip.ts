import { useCallback, useRef, useState } from "react";

import { useId } from "../utils/useId";
import { Key } from "../utils/keyboard";

type UseTooltipProps = {
  /** Delay in ms before showing. Default: 300 */
  delay?: number | undefined;
  placement?: "top" | "bottom" | "left" | "right" | undefined;
};

type UseTooltipReturn = {
  isVisible: boolean;
  triggerProps: React.HTMLAttributes<HTMLElement>;
  tooltipProps: React.HTMLAttributes<HTMLElement>;
  tooltipId: string;
};

/**
 * Tooltip that opens on hover/focus with a configurable delay.
 * The trigger gets aria-describedby pointing to the tooltip.
 * Never opens on disabled elements — check isDisabled in the consumer.
 */
export function useTooltip({ delay = 300, placement = "top" }: UseTooltipProps = {}): UseTooltipReturn {
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = useId("tooltip");

  const show = useCallback(() => {
    timerRef.current = setTimeout(() => setIsVisible(true), delay);
  }, [delay]);

  const hide = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsVisible(false);
  }, []);

  const triggerProps: React.HTMLAttributes<HTMLElement> = {
    "aria-describedby": isVisible ? tooltipId : undefined,
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
    onKeyDown: (e) => { if (e.key === Key.Escape) hide(); },
  };

  const tooltipProps: React.HTMLAttributes<HTMLElement> & { "data-placement": string } = {
    id: tooltipId,
    role: "tooltip",
    "data-placement": placement,
    "aria-hidden": !isVisible,
  };

  return { isVisible, triggerProps, tooltipProps, tooltipId };
}
