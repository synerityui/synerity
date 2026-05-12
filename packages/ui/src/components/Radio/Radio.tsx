import { createContext, forwardRef, useContext } from "react";
import clsx from "clsx";
import { useRadioGroup } from "@synerity/headless";

import styles from "./Radio.module.css";

// ── Context ────────────────────────────────────────────────────

type RadioGroupContextValue = {
  getRadioProps: (value: string, disabled?: boolean) => React.InputHTMLAttributes<HTMLInputElement>;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

// ── RadioGroup ─────────────────────────────────────────────────

export type RadioGroupProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  orientation?: "horizontal" | "vertical";
  children: React.ReactNode;
  className?: string;
};

/**
 * Container that manages shared state for a group of `<Radio>` buttons.
 * Provides controlled/uncontrolled value, keyboard navigation, and ARIA.
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ value, defaultValue, onChange, disabled, name, orientation = "vertical", children, className }, ref) => {
    const { groupProps, getRadioProps } = useRadioGroup({
      value,
      defaultValue,
      onChange,
      disabled,
      name,
      orientation,
    });

    return (
      <RadioGroupContext.Provider value={{ getRadioProps }}>
        <div
          ref={ref}
          {...groupProps}
          className={clsx(styles.group, styles[orientation], className)}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  },
);

RadioGroup.displayName = "RadioGroup";

// ── Radio ──────────────────────────────────────────────────────

export type RadioProps = {
  value: string;
  disabled?: boolean;
  label?: React.ReactNode;
  className?: string;
};

/**
 * Single radio button. Must be rendered inside `<RadioGroup>`.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ value, disabled, label, className }, _ref) => {
    const ctx = useContext(RadioGroupContext);
    if (!ctx) throw new Error("<Radio> must be used inside <RadioGroup>.");

    const radioProps = ctx.getRadioProps(value, disabled);

    return (
      <label className={clsx(styles.root, radioProps.disabled && styles.disabled, className)}>
        <span className={styles.control}>
          <input className={styles.input} {...radioProps} />
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  },
);

Radio.displayName = "Radio";

import type React from "react";
