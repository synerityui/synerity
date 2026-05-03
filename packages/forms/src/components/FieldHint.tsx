import React from "react";
import { useFieldContext } from "../context/FieldContext";
import { useFormContext } from "../context/FormContext";

type FieldHintProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "id">;

/**
 * Renders hint/helper text for the nearest `<Field>`.
 * Automatically hidden when the field has an active error (the error takes precedence
 * in the `aria-describedby` chain).
 * Must be used inside a `<Field>`.
 */
export function FieldHint({ children, className, ...rest }: FieldHintProps) {
  const { name, hintId } = useFieldContext();
  const { state } = useFormContext();
  const hasError = Boolean(state.errors[name]);

  // Keep the element in the DOM so the ID remains stable in aria-describedby,
  // but hide it visually and from AT when an error is showing.
  return (
    <span
      id={hintId}
      className={className}
      aria-hidden={hasError || undefined}
      data-testid={`${name}-hint`}
      {...rest}
    >
      {children}
    </span>
  );
}
