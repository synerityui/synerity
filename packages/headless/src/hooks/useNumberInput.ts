import { useCallback } from "react";

import { useControllable } from "../utils/useControllable";
import { useId } from "../utils/useId";
import { Key } from "../utils/keyboard";

type UseNumberInputProps = {
  value?: number | undefined;
  defaultValue?: number | undefined;
  onChange?: ((value: number) => void) | undefined;
  min?: number | undefined;
  max?: number | undefined;
  step?: number | undefined;
  /** Decimal places to round to. Default: 0 */
  precision?: number | undefined;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  required?: boolean | undefined;
  name?: string | undefined;
};

type UseNumberInputReturn = {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  incrementProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
  decrementProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  state: { value: number | undefined; isAtMin: boolean; isAtMax: boolean; isDisabled: boolean };
};

/**
 * Number spinbutton with increment/decrement and keyboard arrow key support.
 * Follows ARIA spinbutton pattern with aria-valuenow, aria-valuemin, aria-valuemax.
 */
export function useNumberInput({
  value,
  defaultValue,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  precision = 0,
  disabled = false,
  readOnly = false,
  required = false,
  name,
}: UseNumberInputProps = {}): UseNumberInputReturn {
  const [numValue, setNumValue] = useControllable({ value, defaultValue, onChange });
  const inputId = useId("number-input");

  const round = useCallback((n: number) => parseFloat(n.toFixed(precision)), [precision]);
  const clamp = useCallback((n: number) => Math.min(max, Math.max(min, round(n))), [min, max, round]);

  const increment = useCallback(() => {
    if (disabled || readOnly) return;
    setNumValue(clamp((numValue ?? 0) + step));
  }, [disabled, readOnly, numValue, step, clamp, setNumValue]);

  const decrement = useCallback(() => {
    if (disabled || readOnly) return;
    setNumValue(clamp((numValue ?? 0) - step));
  }, [disabled, readOnly, numValue, step, clamp, setNumValue]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === Key.ArrowUp) { event.preventDefault(); increment(); }
      else if (event.key === Key.ArrowDown) { event.preventDefault(); decrement(); }
      else if (event.key === Key.Home && min !== -Infinity) { event.preventDefault(); setNumValue(min); }
      else if (event.key === Key.End && max !== Infinity) { event.preventDefault(); setNumValue(max); }
    },
    [increment, decrement, min, max, setNumValue],
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parseFloat(event.target.value);
      if (!isNaN(parsed)) setNumValue(clamp(parsed));
    },
    [clamp, setNumValue],
  );

  const isAtMin = numValue !== undefined && numValue <= min;
  const isAtMax = numValue !== undefined && numValue >= max;

  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
    id: inputId,
    role: "spinbutton",
    type: "number",
    name,
    value: numValue ?? "",
    onChange: handleChange,
    onKeyDown: handleKeyDown,
    disabled,
    readOnly,
    required,
    "aria-valuenow": numValue,
    "aria-valuemin": min !== -Infinity ? min : undefined,
    "aria-valuemax": max !== Infinity ? max : undefined,
    min: min !== -Infinity ? min : undefined,
    max: max !== Infinity ? max : undefined,
    step,
  };

  const incrementProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    type: "button",
    "aria-label": "Increment",
    disabled: disabled || isAtMax,
    onClick: increment,
    tabIndex: -1,
  };

  const decrementProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    type: "button",
    "aria-label": "Decrement",
    disabled: disabled || isAtMin,
    onClick: decrement,
    tabIndex: -1,
  };

  const labelProps: React.LabelHTMLAttributes<HTMLLabelElement> = { htmlFor: inputId };

  return {
    inputProps,
    incrementProps,
    decrementProps,
    labelProps,
    state: { value: numValue, isAtMin, isAtMax, isDisabled: disabled },
  };
}

import type React from "react";
