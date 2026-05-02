import { useCallback, useState } from "react";

import { useControllable } from "../utils/useControllable";
import { useId } from "../utils/useId";
import { Key } from "../utils/keyboard";

type ComboboxOption = {
  value: string;
  label: string;
  disabled?: boolean | undefined;
};

type UseComboboxProps = {
  options: ComboboxOption[];
  value?: string | undefined;
  defaultValue?: string | undefined;
  onChange?: ((value: string) => void) | undefined;
  inputValue?: string | undefined;
  defaultInputValue?: string | undefined;
  onInputChange?: ((value: string) => void) | undefined;
  disabled?: boolean | undefined;
  placeholder?: string | undefined;
};

type UseComboboxReturn = {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  listboxProps: React.HTMLAttributes<HTMLElement>;
  getOptionProps: (option: ComboboxOption) => React.HTMLAttributes<HTMLElement>;
  isOpen: boolean;
  filteredOptions: ComboboxOption[];
  state: { isDisabled: boolean };
};

/**
 * Combobox: text input that filters a list of options.
 * Follows the ARIA combobox pattern with aria-autocomplete="list".
 */
export function useCombobox({
  options,
  value,
  defaultValue,
  onChange,
  inputValue: inputValueProp,
  defaultInputValue = "",
  onInputChange,
  disabled = false,
  placeholder,
}: UseComboboxProps): UseComboboxReturn {
  const [selectedValue, setSelectedValue] = useControllable({ value, defaultValue, onChange });
  const [inputValue, setInputValue] = useControllable({
    value: inputValueProp,
    defaultValue: defaultInputValue,
    onChange: onInputChange,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputId = useId("combobox-input");
  const listboxId = useId("combobox-listbox");

  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes((inputValue ?? "").toLowerCase()),
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
      setIsOpen(true);
      setActiveIndex(-1);
    },
    [setInputValue],
  );

  const handleInputKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen && (event.key === Key.ArrowDown || event.key === Key.ArrowUp)) {
        setIsOpen(true);
        return;
      }
      if (event.key === Key.Escape) {
        setIsOpen(false);
        return;
      }
      if (event.key === Key.ArrowDown) {
        event.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
      } else if (event.key === Key.ArrowUp) {
        event.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (event.key === Key.Enter && activeIndex >= 0) {
        event.preventDefault();
        const option = filteredOptions[activeIndex];
        if (option && !option.disabled) {
          setSelectedValue(option.value);
          setInputValue(option.label);
          setIsOpen(false);
        }
      }
    },
    [isOpen, filteredOptions, activeIndex, setSelectedValue, setInputValue],
  );

  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
    id: inputId,
    role: "combobox",
    type: "text",
    value: inputValue ?? "",
    disabled,
    placeholder,
    "aria-autocomplete": "list",
    "aria-expanded": isOpen,
    "aria-haspopup": "listbox",
    "aria-controls": listboxId,
    "aria-activedescendant": activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined,
    onChange: handleInputChange,
    onKeyDown: handleInputKeyDown,
    onBlur: () => setTimeout(() => setIsOpen(false), 150),
    onFocus: () => setIsOpen(true),
  };

  const listboxProps: React.HTMLAttributes<HTMLElement> = {
    id: listboxId,
    role: "listbox",
  };

  const getOptionProps = useCallback(
    (option: ComboboxOption, index: number): React.HTMLAttributes<HTMLElement> => ({
      id: `${listboxId}-option-${index}`,
      role: "option",
      "aria-selected": option.value === selectedValue,
      "aria-disabled": option.disabled || undefined,
      onClick: () => {
        if (!option.disabled) {
          setSelectedValue(option.value);
          setInputValue(option.label);
          setIsOpen(false);
        }
      },
    }),
    [listboxId, selectedValue, setSelectedValue, setInputValue],
  );

  void selectedValue;

  return {
    inputProps,
    listboxProps,
    getOptionProps: (option) => getOptionProps(option, filteredOptions.indexOf(option)),
    isOpen,
    filteredOptions,
    state: { isDisabled: disabled },
  };
}

import type React from "react";
