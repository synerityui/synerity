import { forwardRef } from "react";
import clsx from "clsx";

import styles from "./Stepper.module.css";

export type StepStatus = "complete" | "current" | "upcoming";

export type StepItem = {
  label: string;
  description?: string;
};

export type StepperProps = {
  steps: StepItem[];
  currentStep: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
};

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M2 7.5L5.5 11L12 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getStatus(index: number, currentStep: number): StepStatus {
  if (index < currentStep) return "complete";
  if (index === currentStep) return "current";
  return "upcoming";
}

/**
 * Linear multi-step progress indicator. Use `currentStep` (0-indexed) to
 * indicate the active step.
 */
export const Stepper = forwardRef<HTMLOListElement, StepperProps>(
  ({ steps, currentStep, orientation = "horizontal", className }, ref) => {
    return (
      <ol
        ref={ref}
        className={clsx(
          styles.root,
          orientation === "vertical" ? styles.vertical : styles.horizontal,
          className,
        )}
      >
        {steps.map((step, index) => {
          const status = getStatus(index, currentStep);
          const isLast = index === steps.length - 1;

          return (
            <li
              key={index}
              className={clsx(styles.step, styles[status], !isLast && styles.stepWithConnector)}
            >
              {/* Circle indicator */}
              <div className={styles.indicator}>
                <span
                  className={clsx(styles.circle, styles[`circle-${status}`])}
                  aria-label={`Step ${index + 1}: ${step.label} — ${status}`}
                >
                  {status === "complete" ? <CheckIcon /> : <span>{index + 1}</span>}
                </span>
                {!isLast && <span className={clsx(styles.connector, styles[`connector-${status}`])} aria-hidden />}
              </div>
              {/* Label + description */}
              <div className={styles.labelGroup}>
                <span className={clsx(styles.label, styles[`label-${status}`])}>{step.label}</span>
                {step.description && (
                  <span className={styles.description}>{step.description}</span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    );
  },
);

Stepper.displayName = "Stepper";
