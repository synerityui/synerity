import { forwardRef } from "react";
import clsx from "clsx";
import { useSwitch } from "@synerity/headless";

import * as styles from "./Switch.module.css";

export type SwitchSize = "sm" | "md" | "lg";

export type SwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: SwitchSize;
  name?: string;
  value?: string;
  label?: React.ReactNode;
  className?: string;
};

/**
 * Toggle switch. Uses role="switch" with aria-checked.
 */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, defaultChecked, onChange, disabled, size = "md", name, value, label, className }, ref) => {
    const { switchProps, inputProps, state } = useSwitch({ checked, defaultChecked, onChange, disabled, name, value });

    return (
      <span className={clsx(styles.root, styles[size], state.isDisabled && styles.disabled, className)}>
        <button
          ref={ref}
          className={clsx(styles.track, state.isChecked && styles.checked)}
          {...switchProps}
        >
          <span className={styles.thumb} />
        </button>
        <input {...inputProps} />
        {label && <span>{label}</span>}
      </span>
    );
  },
);

Switch.displayName = "Switch";
