import { forwardRef } from "react";
import clsx from "clsx";
import { useTextarea } from "@synerity/headless";

import * as styles from "./Textarea.module.css";

export type TextareaProps = {
  label?: string;
  hint?: string;
  error?: string;
  invalid?: boolean;
  autoResize?: boolean;
  wrapperClassName?: string;
  className?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * Multi-line text input with label, hint, error, and optional auto-resize.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      label,
      hint,
      error,
      invalid: invalidProp,
      disabled,
      readOnly,
      required,
      autoResize = false,
      wrapperClassName,
      className,
      name,
      value,
      defaultValue,
      onChange,
      ...rest
    },
    _ref,
  ) => {
    const isInvalid = invalidProp ?? !!error;
    const { textareaProps, ref: internalRef, labelProps, errorProps, hintProps, state } = useTextarea({
      id,
      value: value as string | undefined,
      defaultValue: defaultValue as string | undefined,
      onChange: onChange as React.ChangeEventHandler<HTMLTextAreaElement> | undefined,
      disabled,
      readOnly,
      invalid: isInvalid,
      required,
      name,
      autoResize,
    });

    return (
      <div
        className={clsx(
          styles.wrapper,
          state.isInvalid && styles.invalid,
          state.isDisabled && styles.disabled,
          wrapperClassName,
        )}
      >
        {label && (
          <label className={styles.label} {...labelProps}>
            {label}
            {required && <span aria-hidden> *</span>}
          </label>
        )}
        <textarea
          ref={internalRef as React.Ref<HTMLTextAreaElement>}
          className={clsx(styles.textarea, className)}
          {...textareaProps}
          {...rest}
        />
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

Textarea.displayName = "Textarea";
