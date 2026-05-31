import { useCallback, useId as useReactId } from "react";

import { useControllable } from "../utils/useControllable";

type UseRadioGroupProps = {
  value?: string | undefined;
  defaultValue?: string | undefined;
  onChange?: ((value: string) => void) | undefined;
  disabled?: boolean | undefined;
  name?: string | undefined;
  orientation?: "horizontal" | "vertical" | undefined;
};

type UseRadioGroupReturn = {
  groupProps: React.HTMLAttributes<HTMLElement>;
  getRadioProps: (value: string, disabled?: boolean) => React.InputHTMLAttributes<HTMLInputElement>;
  state: { value: string | undefined };
};

/**
 * Manages a group of radio buttons with roving tabindex and keyboard navigation.
 * Arrow keys move between options; the selected option alone is in the tab sequence.
 */
export function useRadioGroup({
  value,
  defaultValue,
  onChange,
  disabled = false,
  name,
  orientation = "vertical",
}: UseRadioGroupProps = {}): UseRadioGroupReturn {
  const [selectedValue, setSelectedValue] = useControllable({ value, defaultValue, onChange });
  const autoId = useReactId();
  const groupName = name ?? autoId;

  const groupProps: React.HTMLAttributes<HTMLElement> = {
    role: "radiogroup",
    "aria-orientation": orientation,
  };

  const getRadioProps = useCallback(
    (itemValue: string, itemDisabled = false): React.InputHTMLAttributes<HTMLInputElement> => ({
      type: "radio",
      name: groupName,
      value: itemValue,
      checked: selectedValue === itemValue,
      disabled: disabled || itemDisabled,
      onChange: () => setSelectedValue(itemValue),
      // Roving tabindex: only the selected (or first) item is reachable via Tab
      tabIndex: selectedValue === itemValue || (!selectedValue && itemValue === itemValue) ? 0 : -1,
    }),
    [groupName, selectedValue, disabled, setSelectedValue],
  );

  return {
    groupProps,
    getRadioProps,
    state: { value: selectedValue },
  };
}

import type React from "react";
