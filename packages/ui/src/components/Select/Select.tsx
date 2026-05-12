import { forwardRef, useEffect, useRef } from "react";
import clsx from "clsx";
import { useSelect, useControllable, useOutsideClick } from "@synerity/headless";

import styles from "./Select.module.css";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectSize = "sm" | "md" | "lg";

export type SelectProps = {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  placeholder?: string;
  size?: SelectSize;
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
};

/**
 * Custom single-select with keyboard navigation and ARIA combobox pattern.
 * Keyboard: Enter/Space/ArrowDown opens; arrows navigate; Enter selects; Escape closes.
 */
export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      disabled = false,
      placeholder = "Select an option",
      size = "md",
      label,
      hint,
      error,
      className,
    },
    ref,
  ) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLUListElement>(null);

    // Own the open state so we can close on outside click.
    const [open = false, setOpen] = useControllable({
      value: openProp,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });

    useOutsideClick([wrapperRef], () => setOpen(false), open);

    const { triggerProps, triggerRef, listboxProps, getOptionProps, selectedOption, state } =
      useSelect({
        options,
        value,
        defaultValue,
        onChange,
        open,
        onOpenChange: setOpen,
        disabled,
        placeholder,
      });

    // Move focus into the listbox when it opens so keyboard events are captured.
    useEffect(() => {
      if (open) listboxRef.current?.focus();
    }, [open]);

    const isInvalid = Boolean(error);

    return (
      <div ref={ref} className={clsx(styles.root, className)}>
        {label && <span className={styles.label}>{label}</span>}
        <div ref={wrapperRef} className={styles.selectWrapper}>
          <button
            ref={triggerRef}
            className={clsx(
              styles.trigger,
              styles[size],
              state.isDisabled && styles.disabled,
              isInvalid && styles.invalid,
              open && styles.open,
            )}
            {...triggerProps}
          >
            <span className={clsx(styles.value, !selectedOption && styles.placeholder)}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronIcon className={clsx(styles.chevron, open && styles.chevronOpen)} />
          </button>

          {open && (
            <ul ref={listboxRef} className={styles.listbox} {...listboxProps}>
              {options.map((option) => (
                <li
                  key={option.value}
                  className={clsx(
                    styles.option,
                    option.value === selectedOption?.value && styles.selected,
                    option.disabled && styles.optionDisabled,
                  )}
                  {...getOptionProps(option)}
                >
                  {option.label}
                  {option.value === selectedOption?.value && <CheckIcon />}
                </li>
              ))}
            </ul>
          )}
        </div>
        {hint && !error && <span className={styles.hint}>{hint}</span>}
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  },
);

Select.displayName = "Select";

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
