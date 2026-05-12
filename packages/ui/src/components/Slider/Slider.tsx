import { forwardRef } from "react";
import clsx from "clsx";
import { useControllable } from "@synerity/headless";

import styles from "./Slider.module.css";

export type SliderSize = "sm" | "md" | "lg";

export type SliderProps = {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  /** Minimum value. Default: 0 */
  min?: number;
  /** Maximum value. Default: 100 */
  max?: number;
  /** Step increment. Default: 1 */
  step?: number;
  disabled?: boolean;
  label?: string;
  /** Show the current value next to the label. */
  showValue?: boolean;
  size?: SliderSize;
  className?: string;
};

/**
 * Range slider built on the native <input type="range"> for full a11y and keyboard support.
 * Progress fill is rendered via a CSS custom property.
 */
export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value,
      defaultValue = 0,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      label,
      showValue = false,
      size = "md",
      className,
    },
    ref,
  ) => {
    const [current, setCurrent] = useControllable<number>({
      value,
      defaultValue,
      onChange,
    });

    const safeValue = current ?? defaultValue;
    const pct = max !== min ? ((safeValue - min) / (max - min)) * 100 : 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrent(parseFloat(e.target.value));
    };

    return (
      <div
        ref={ref}
        className={clsx(
          styles.wrapper,
          disabled && styles.disabled,
          styles[size],
          className,
        )}
      >
        {(label ?? showValue) && (
          <div className={styles.labelRow}>
            {label && (
              <span className={styles.label}>{label}</span>
            )}
            {showValue && (
              <span className={styles.valueDisplay} aria-live="polite">{safeValue}</span>
            )}
          </div>
        )}
        <input
          type="range"
          className={styles.range}
          min={min}
          max={max}
          step={step}
          value={safeValue}
          disabled={disabled}
          onChange={handleChange}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={safeValue}
          aria-label={label}
          style={{ "--percent": `${pct}%` } as React.CSSProperties}
          data-testid="slider"
        />
      </div>
    );
  },
);

Slider.displayName = "Slider";
