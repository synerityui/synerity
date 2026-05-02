import { useCallback } from "react";

import { useControllable } from "../utils/useControllable";

type UseToggleProps = {
  pressed?: boolean | undefined;
  defaultPressed?: boolean | undefined;
  onChange?: ((pressed: boolean) => void) | undefined;
  disabled?: boolean | undefined;
};

type UseToggleReturn = {
  toggleProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
  isPressed: boolean;
};

/**
 * A single press-to-toggle button with aria-pressed.
 */
export function useToggle({
  pressed,
  defaultPressed = false,
  onChange,
  disabled = false,
}: UseToggleProps = {}): UseToggleReturn {
  const [isPressed = false, setPressed] = useControllable({
    value: pressed,
    defaultValue: defaultPressed,
    onChange,
  });

  const toggle = useCallback(() => {
    if (!disabled) setPressed(!isPressed);
  }, [disabled, isPressed, setPressed]);

  const toggleProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    type: "button",
    role: "button",
    "aria-pressed": isPressed,
    disabled,
    onClick: toggle,
  };

  return { toggleProps, isPressed };
}

import type React from "react";
