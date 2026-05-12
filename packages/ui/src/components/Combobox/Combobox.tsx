import { forwardRef } from "react";
import clsx from "clsx";
import { useCombobox } from "@synerity/headless";

import styles from "./Combobox.module.css";

export type ComboboxOption = { value: string; label: string; disabled?: boolean };

export type ComboboxProps = {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  inputValue?: string;
  onInputChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  hint?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

/**
 * Combobox — text input that filters a list of options.
 * Follows the ARIA combobox pattern with listbox dropdown.
 */
export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      inputValue,
      onInputChange,
      disabled,
      placeholder,
      label,
      hint,
      error,
      size = "md",
      className,
    },
    ref,
  ) => {
    const { inputProps, listboxProps, getOptionProps, isOpen, filteredOptions, state } =
      useCombobox({
        options,
        value,
        defaultValue,
        onChange,
        inputValue,
        onInputChange,
        disabled,
        placeholder,
      });

    return (
      <div
        ref={ref}
        className={clsx(
          styles.wrapper,
          error && styles.invalid,
          state.isDisabled && styles.disabled,
          className,
        )}
      >
        {label && (
          <label
            className={styles.label}
            htmlFor={(inputProps as { id?: string }).id}
          >
            {label}
          </label>
        )}
        <div className={styles.inputWrapper}>
          <input
            className={clsx(styles.input, styles[size])}
            {...inputProps}
          />
          <span className={styles.caret} aria-hidden>
            <ChevronIcon />
          </span>
          {isOpen && (
            <ul
              className={styles.listbox}
              {...listboxProps}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    className={clsx(
                      styles.option,
                      option.disabled && styles.optionDisabled,
                    )}
                    {...getOptionProps(option)}
                  >
                    {option.label}
                  </li>
                ))
              ) : (
                <li className={styles.empty} aria-live="polite">
                  No options
                </li>
              )}
            </ul>
          )}
        </div>
        {error && <span className={styles.error} role="alert">{error}</span>}
        {hint && !error && <span className={styles.hint}>{hint}</span>}
      </div>
    );
  },
);

Combobox.displayName = "Combobox";

function ChevronIcon() {
  return (
    <svg
      width={14}
      height={14}
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
