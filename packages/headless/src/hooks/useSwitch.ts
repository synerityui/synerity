import { useCallback } from "react";

import { useControllable } from "../utils/useControllable";

type UseSwitchProps = {
  checked?: boolean | undefined;
  defaultChecked?: boolean | undefined;
  onChange?: ((checked: boolean) => void) | undefined;
  disabled?: boolean | undefined;
  name?: string | undefined;
  value?: string | undefined;
};

type UseSwitchReturn = {
  switchProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  state: { isChecked: boolean; isDisabled: boolean };
};

/**
 * Provides props for a switch/toggle control.
 * Uses role="switch" with aria-checked as per ARIA APG.
 */
export function useSwitch({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  name,
  value,
}: UseSwitchProps = {}): UseSwitchReturn {
  const [isChecked = false, setChecked] = useControllable({
    value: checked,
    defaultValue: defaultChecked,
    onChange,
  });

  const toggle = useCallback(() => {
    if (!disabled) setChecked(!isChecked);
  }, [disabled, isChecked, setChecked]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === " ") {
        event.preventDefault();
        toggle();
      }
    },
    [toggle],
  );

  const switchProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    role: "switch",
    type: "button",
    "aria-checked": isChecked,
    disabled,
    onClick: toggle,
    onKeyDown: handleKeyDown,
  };

  // Hidden input for form submission
  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
    type: "checkbox",
    checked: isChecked,
    onChange: () => {},
    hidden: true,
    name,
    value,
    "aria-hidden": true,
    tabIndex: -1,
  };

  return { switchProps, inputProps, state: { isChecked, isDisabled: disabled } };
}

import type React from "react";
