import { useCallback, useId as useReactId } from "react";

import { useControllable } from "../utils/useControllable";
import { Key } from "../utils/keyboard";

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
  const groupName = name ?? useReactId();

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>, itemValue: string, allValues: string[]) => {
      const isVertical = orientation === "vertical";
      const prevKey = isVertical ? Key.ArrowUp : Key.ArrowLeft;
      const nextKey = isVertical ? Key.ArrowDown : Key.ArrowRight;

      const currentIndex = allValues.indexOf(itemValue);
      let nextIndex: number | null = null;

      if (event.key === prevKey) {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : allValues.length - 1;
      } else if (event.key === nextKey) {
        nextIndex = currentIndex < allValues.length - 1 ? currentIndex + 1 : 0;
      } else if (event.key === Key.Home) {
        nextIndex = 0;
      } else if (event.key === Key.End) {
        nextIndex = allValues.length - 1;
      }

      if (nextIndex !== null) {
        event.preventDefault();
        const nextValue = allValues[nextIndex];
        if (nextValue !== undefined) {
          setSelectedValue(nextValue);
          // Move focus to the newly selected radio
          const group = event.currentTarget.closest('[role="radiogroup"]');
          const nextRadio = group?.querySelector<HTMLInputElement>(`input[value="${nextValue}"]`);
          nextRadio?.focus();
        }
      }
    },
    [orientation, setSelectedValue],
  );

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
