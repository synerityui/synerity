import { useCallback, useRef } from "react";

import { useControllable } from "../utils/useControllable";
import { useId } from "../utils/useId";
import { Key } from "../utils/keyboard";

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean | undefined;
};

type UseSelectProps = {
  options: SelectOption[];
  value?: string | undefined;
  defaultValue?: string | undefined;
  onChange?: ((value: string) => void) | undefined;
  open?: boolean | undefined;
  defaultOpen?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
  disabled?: boolean | undefined;
  placeholder?: string | undefined;
};

type UseSelectReturn = {
  triggerProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
  /** Attach this ref to the trigger <button> element. */
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  listboxProps: React.HTMLAttributes<HTMLElement>;
  getOptionProps: (option: SelectOption) => React.HTMLAttributes<HTMLElement>;
  isOpen: boolean;
  selectedOption: SelectOption | undefined;
  state: { isDisabled: boolean };
};

/**
 * Custom select with combobox ARIA pattern.
 * Keyboard: Enter/Space/ArrowDown opens, arrows navigate, Enter selects, Escape closes.
 */
export function useSelect({
  options,
  value,
  defaultValue,
  onChange,
  open,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  placeholder = "Select an option",
}: UseSelectProps): UseSelectReturn {
  const [selectedValue, setSelectedValue] = useControllable({ value, defaultValue, onChange });
  const [isOpen = false, setIsOpen] = useControllable({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const triggerId = useId("select-trigger");
  const listboxId = useId("select-listbox");
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find((o) => o.value === selectedValue);
  const activeIndex = options.findIndex((o) => o.value === selectedValue);

  const openList = useCallback(() => !disabled && setIsOpen(true), [disabled, setIsOpen]);
  const closeList = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, [setIsOpen]);

  const handleTriggerKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      const openKeys: string[] = [Key.Enter, Key.Space, Key.ArrowDown, Key.ArrowUp];
      if (openKeys.includes(event.key)) {
        event.preventDefault();
        openList();
      }
    },
    [openList],
  );

  const handleListKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const enabledOptions = options.filter((o) => !o.disabled);
      const currentIndex = enabledOptions.findIndex((o) => o.value === selectedValue);

      if (event.key === Key.Escape) {
        event.preventDefault();
        closeList();
      } else if (event.key === Key.ArrowDown) {
        event.preventDefault();
        const next = enabledOptions[(currentIndex + 1) % enabledOptions.length];
        if (next) setSelectedValue(next.value);
      } else if (event.key === Key.ArrowUp) {
        event.preventDefault();
        const prev = enabledOptions[(currentIndex - 1 + enabledOptions.length) % enabledOptions.length];
        if (prev) setSelectedValue(prev.value);
      } else if (event.key === Key.Home) {
        event.preventDefault();
        const first = enabledOptions[0];
        if (first) setSelectedValue(first.value);
      } else if (event.key === Key.End) {
        event.preventDefault();
        const last = enabledOptions[enabledOptions.length - 1];
        if (last) setSelectedValue(last.value);
      } else if (event.key === Key.Enter || event.key === Key.Space) {
        event.preventDefault();
        closeList();
      }
    },
    [options, selectedValue, setSelectedValue, closeList],
  );

  const triggerProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    id: triggerId,
    role: "combobox",
    type: "button",
    disabled,
    "aria-expanded": isOpen,
    "aria-haspopup": "listbox",
    "aria-controls": listboxId,
    "aria-labelledby": triggerId,
    onClick: isOpen ? closeList : openList,
    onKeyDown: handleTriggerKeyDown,
  };

  const listboxProps: React.HTMLAttributes<HTMLElement> = {
    id: listboxId,
    role: "listbox",
    "aria-labelledby": triggerId,
    tabIndex: -1,
    onKeyDown: handleListKeyDown,
  };

  const getOptionProps = useCallback(
    (option: SelectOption): React.HTMLAttributes<HTMLElement> => ({
      role: "option",
      "aria-selected": option.value === selectedValue,
      "aria-disabled": option.disabled || undefined,
      tabIndex: option.value === selectedValue ? 0 : -1,
      onClick: () => {
        if (!option.disabled) {
          setSelectedValue(option.value);
          closeList();
        }
      },
    }),
    [selectedValue, setSelectedValue, closeList],
  );

  void activeIndex;

  return { triggerProps, triggerRef, listboxProps, getOptionProps, isOpen, selectedOption, state: { isDisabled: disabled } };
}

import type React from "react";
