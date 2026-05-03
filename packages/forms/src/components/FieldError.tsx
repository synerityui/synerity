import React from "react";
import { useFieldContext } from "../context/FieldContext";
import { useFormContext } from "../context/FormContext";

type FieldErrorProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "id">;

/**
 * Renders the validation error for the nearest `<Field>`.
 * Returns `null` when there is no error for the field.
 * Must be used inside a `<Field>`.
 */
export function FieldError({ className, ...rest }: FieldErrorProps) {
  const { name, errorId } = useFieldContext();
  const { state } = useFormContext();
  const error = state.errors[name];

  if (!error) return null;

  return (
    <span
      id={errorId}
      role="alert"
      aria-live="polite"
      className={className}
      data-testid={`${name}-error`}
      {...rest}
    >
      {error}
    </span>
  );
}
