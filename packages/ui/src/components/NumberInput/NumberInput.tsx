import { forwardRef } from "react";
import clsx from "clsx";
import { useNumberInput } from "@synerity/headless";

import styles from "./NumberInput.module.css";

export type NumberInputSize = "sm" | "md" | "lg";

export type NumberInputProps = {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  label?: string;
  hint?: string;
  error?: string;
  size?: NumberInputSize;
  className?: string;
};

/**
 * Numeric spinbutton with increment/decrement controls and keyboard support.
 * Follows the ARIA spinbutton pattern.
 */
export const NumberInput = forwardRef<HTMLDivElement, NumberInputProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      min,
      max,
      step,
      precision,
      disabled,
      readOnly,
      required,
      name,
      label,
      hint,
      error,
      size = "md",
      className,
    },
    ref,
  ) => {
    const { inputProps, incrementProps, decrementProps, labelProps, state } =
      useNumberInput({
        value,
        defaultValue,
        onChange,
        min,
        max,
        step,
        precision,
        disabled,
        readOnly,
        required,
        name,
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
          <label className={styles.label} {...labelProps}>
            {label}
            {required && <span aria-hidden> *</span>}
          </label>
        )}
        <div className={clsx(styles.control, styles[size])}>
          <button
            className={clsx(styles.stepper, styles.stepperLeft)}
            {...decrementProps}
            data-testid="number-input-decrement"
          >
            <MinusIcon />
          </button>
          <input
            className={styles.input}
            {...inputProps}
            data-testid="number-input"
          />
          <button
            className={clsx(styles.stepper, styles.stepperRight)}
            {...incrementProps}
            data-testid="number-input-increment"
          >
            <PlusIcon />
          </button>
        </div>
        {error && <span className={styles.error} role="alert">{error}</span>}
        {hint && !error && <span className={styles.hint}>{hint}</span>}
      </div>
    );
  },
);

NumberInput.displayName = "NumberInput";

function PlusIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden>
      <path d="M5 12h14" />
    </svg>
  );
}
