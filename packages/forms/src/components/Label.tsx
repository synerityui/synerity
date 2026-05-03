import React from "react";
import { useFieldContext } from "../context/FieldContext";

type LabelProps = Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "htmlFor">;

/**
 * Renders a `<label>` that is automatically linked to the nearest `<Field>`'s
 * input via `htmlFor`. Must be used inside a `<Field>`.
 */
export function Label({ children, className, ...rest }: LabelProps) {
  const { inputId, required } = useFieldContext();

  return (
    <label htmlFor={inputId} className={className} data-required={required || undefined} {...rest}>
      {children}
    </label>
  );
}
