import { forwardRef } from "react";
import clsx from "clsx";
import { useCheckbox } from "@synerity/headless";

import styles from "./Checkbox.module.css";

export type CheckboxProps = {
  label?: React.ReactNode;
  indeterminate?: boolean;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

/**
 * Checkbox with optional indeterminate state and label.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      defaultChecked,
      indeterminate = false,
      onChange,
      disabled,
      required,
      name,
      value,
      label,
      className,
      ...rest
    },
    _ref,
  ) => {
    const { checkboxProps, ref, state } = useCheckbox({
      checked: checked as boolean | undefined,
      defaultChecked: defaultChecked as boolean | undefined,
      indeterminate,
      onChange: (v) => onChange?.({ target: { checked: v } } as React.ChangeEvent<HTMLInputElement>),
      disabled,
      required,
      name,
      value: value as string | undefined,
    });

    return (
      <label
        className={clsx(
          styles.root,
          state.isChecked && styles.checked,
          state.isIndeterminate && styles.indeterminate,
          state.isDisabled && styles.disabled,
          className,
        )}
      >
        <span className={styles.control}>
          <input ref={ref as React.Ref<HTMLInputElement>} className={styles.input} {...checkboxProps} {...rest} />
          {state.isIndeterminate ? (
            <IndeterminateIcon />
          ) : state.isChecked ? (
            <CheckIcon />
          ) : null}
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

function CheckIcon() {
  return (
    <svg className={styles.checkIcon} width={11} height={9} viewBox="0 0 11 9" fill="none" aria-hidden>
      <path d="M1 4.5L4 7.5L10 1" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IndeterminateIcon() {
  return (
    <svg className={styles.checkIcon} width={10} height={2} viewBox="0 0 10 2" fill="none" aria-hidden>
      <path d="M1 1H9" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}
