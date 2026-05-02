import { useCallback, useEffect, useRef } from "react";

import { useControllable } from "../utils/useControllable";

type UseCheckboxProps = {
  checked?: boolean | undefined;
  defaultChecked?: boolean | undefined;
  indeterminate?: boolean | undefined;
  onChange?: ((checked: boolean) => void) | undefined;
  disabled?: boolean | undefined;
  required?: boolean | undefined;
  name?: string | undefined;
  value?: string | undefined;
};

type UseCheckboxReturn = {
  checkboxProps: React.InputHTMLAttributes<HTMLInputElement>;
  /** Attach this ref to the <input> element to enable indeterminate state. */
  ref: React.RefObject<HTMLInputElement | null>;
  state: { isChecked: boolean; isIndeterminate: boolean; isDisabled: boolean };
};

/**
 * Manages checkbox state including indeterminate.
 * The indeterminate visual state is set via a DOM ref since it cannot be set via HTML attributes.
 */
export function useCheckbox({
  checked,
  defaultChecked = false,
  indeterminate = false,
  onChange,
  disabled = false,
  required = false,
  name,
  value,
}: UseCheckboxProps = {}): UseCheckboxReturn {
  const [isChecked = false, setChecked] = useControllable({
    value: checked,
    defaultValue: defaultChecked,
    onChange,
  });

  const ref = useRef<HTMLInputElement>(null);

  // indeterminate can only be set via JS, not HTML
  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        setChecked(event.target.checked);
      }
    },
    [disabled, setChecked],
  );

  const checkboxProps: React.InputHTMLAttributes<HTMLInputElement> = {
    type: "checkbox",
    checked: isChecked,
    onChange: handleChange,
    disabled,
    required,
    name,
    value,
    "aria-checked": indeterminate ? "mixed" : isChecked,
  };

  return {
    checkboxProps,
    ref,
    state: { isChecked, isIndeterminate: indeterminate, isDisabled: disabled },
  };
}

import type React from "react";
