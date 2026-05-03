import { forwardRef } from "react";
import clsx from "clsx";
import { useInput } from "@synerity/headless";

import * as styles from "./Input.module.css";

export type InputSize = "sm" | "md" | "lg";

export type InputProps = {
  label?: string;
  hint?: string;
  error?: string;
  size?: InputSize;
  invalid?: boolean;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

/**
 * Text input with label, hint, error, and adornment slots.
 * All ARIA associations are wired automatically.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      hint,
      error,
      size = "md",
      invalid: invalidProp,
      disabled,
      readOnly,
      required,
      leftAdornment,
      rightAdornment,
      className,
      wrapperClassName,
      name,
      value,
      defaultValue,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const isInvalid = invalidProp ?? !!error;
    const { inputProps, labelProps, errorProps, hintProps, state } = useInput({
      id,
      value: value as string | undefined,
      defaultValue: defaultValue as string | undefined,
      onChange: onChange as React.ChangeEventHandler<HTMLInputElement> | undefined,
      disabled,
      readOnly,
      invalid: isInvalid,
      required,
      name,
    });

    return (
      <div
        className={clsx(
          styles.wrapper,
          state.isInvalid && styles.invalid,
          state.isDisabled && styles.disabled,
          state.isReadOnly && styles.readOnly,
          wrapperClassName,
        )}
      >
        {label && (
          <label className={styles.label} {...labelProps}>
            {label}
            {required && <span aria-hidden> *</span>}
          </label>
        )}
        <div className={styles.inputWrapper}>
          {leftAdornment && (
            <span className={clsx(styles.adornment, styles.adornmentLeft)} aria-hidden>
              {leftAdornment}
            </span>
          )}
          <input
            ref={ref}
            className={clsx(
              styles.input,
              styles[size],
              leftAdornment && styles.hasLeft,
              rightAdornment && styles.hasRight,
              className,
            )}
            {...inputProps}
            {...rest}
          />
          {rightAdornment && (
            <span className={clsx(styles.adornment, styles.adornmentRight)} aria-hidden>
              {rightAdornment}
            </span>
          )}
        </div>
        {error && (
          <span className={styles.error} {...errorProps}>
            {error}
          </span>
        )}
        {hint && !error && (
          <span className={styles.hint} {...hintProps}>
            {hint}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
