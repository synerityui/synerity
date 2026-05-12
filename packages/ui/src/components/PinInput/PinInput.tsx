import { forwardRef, useRef, useState } from "react";
import clsx from "clsx";

import styles from "./PinInput.module.css";

export type PinInputSize = "sm" | "md" | "lg";

export type PinInputProps = {
  /** Number of cells. Default: 6 */
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Fired when all cells are filled. */
  onComplete?: (value: string) => void;
  type?: "numeric" | "alphanumeric";
  /** Mask input as password dots. */
  masked?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  size?: PinInputSize;
  className?: string;
};

/**
 * PIN / OTP input — N individual cells that auto-advance on entry and
 * support paste, backspace, and keyboard navigation.
 */
export const PinInput = forwardRef<HTMLDivElement, PinInputProps>(
  (
    {
      length = 6,
      value: valueProp,
      defaultValue = "",
      onChange,
      onComplete,
      type = "numeric",
      masked = false,
      disabled = false,
      invalid = false,
      size = "md",
      className,
    },
    ref,
  ) => {
    const isControlled = valueProp !== undefined;

    // Derive initial cell array from defaultValue
    const toCells = (str: string): string[] => {
      const chars = str.slice(0, length).split("");
      return Array.from({ length }, (_, i) => chars[i] ?? "");
    };

    const [internalCells, setInternalCells] = useState<string[]>(() =>
      toCells(defaultValue),
    );

    const cells: string[] = isControlled ? toCells(valueProp ?? "") : internalCells;

    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const notify = (nextCells: string[]) => {
      const joined = nextCells.join("");
      onChange?.(joined);
      if (joined.length === length && nextCells.every((c) => c !== "")) {
        onComplete?.(joined);
      }
    };

    const updateCells = (nextCells: string[]) => {
      if (!isControlled) setInternalCells(nextCells);
      notify(nextCells);
    };

    const isValid = (char: string): boolean => {
      if (type === "numeric") return /^\d$/.test(char);
      return /^[a-zA-Z0-9]$/.test(char);
    };

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      // Take only the last character (handles Android soft-keyboard composing)
      const raw = e.target.value;
      const char = raw.slice(-1);

      if (char === "" || !isValid(char)) {
        // Clear cell if invalid
        const next = [...cells];
        next[index] = "";
        updateCells(next);
        return;
      }

      const next = [...cells];
      next[index] = char;
      updateCells(next);

      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        if (cells[index] !== "") {
          const next = [...cells];
          next[index] = "";
          updateCells(next);
        } else if (index > 0) {
          inputRefs.current[index - 1]?.focus();
          const next = [...cells];
          next[index - 1] = "";
          updateCells(next);
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowRight" && index < length - 1) {
        e.preventDefault();
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handlePaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").slice(0, length - index);
      const next = [...cells];
      let lastFilled = index;

      for (let i = 0; i < pasted.length; i++) {
        const char = pasted[i];
        if (char && isValid(char)) {
          next[index + i] = char;
          lastFilled = index + i;
        }
      }

      updateCells(next);
      const focusTarget = Math.min(lastFilled + 1, length - 1);
      inputRefs.current[focusTarget]?.focus();
    };

    return (
      <div
        ref={ref}
        role="group"
        aria-label="PIN input"
        className={clsx(
          styles.root,
          styles[size],
          invalid && styles.invalid,
          disabled && styles.disabled,
          className,
        )}
      >
        {Array.from({ length }, (_, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            className={styles.cell}
            type={masked ? "password" : "text"}
            inputMode={type === "numeric" ? "numeric" : "text"}
            maxLength={1}
            value={cells[i]}
            disabled={disabled}
            autoComplete="one-time-code"
            aria-label={`PIN digit ${i + 1} of ${length}`}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={(e) => handlePaste(i, e)}
            onFocus={(e) => e.target.select()}
            data-testid={`pin-input-cell-${i}`}
          />
        ))}
      </div>
    );
  },
);

PinInput.displayName = "PinInput";
