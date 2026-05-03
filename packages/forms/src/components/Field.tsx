import React, { useEffect, useMemo } from "react";
import { FieldContext } from "../context/FieldContext";
import { useFormContext } from "../context/FormContext";
import type { FieldContextValue, FieldValidator } from "../types";

let fieldCounter = 0;
function nextFieldId(): string {
  return `synerity-field-${++fieldCounter}`;
}

type FieldProps = {
  /** Field path. Supports dot notation (`address.street`) and array indices (`tags[0]`). */
  name: string;
  children: React.ReactNode;
  /** Marks the field as required — propagated to `inputProps.aria-required`. */
  required?: boolean;
  /** Synchronous or asynchronous field-level validator. Runs alongside the form schema. */
  validate?: FieldValidator;
};

/**
 * Groups a label, control, error message, and hint for a single named field.
 * Provides ARIA ID wiring so `<Label>`, `<FieldError>`, and `<FieldHint>` can
 * self-connect without any explicit prop threading.
 *
 * @example
 * ```tsx
 * <Field name="email" required>
 *   <Label>Email</Label>
 *   <input {...useField('email').inputProps} type="email" />
 *   <FieldError />
 *   <FieldHint>We'll never share your email.</FieldHint>
 * </Field>
 * ```
 */
export function Field({ name, children, required = false, validate }: FieldProps) {
  const { registerFieldValidator } = useFormContext();

  // Register / deregister the field-level validator when it changes
  useEffect(() => {
    if (!validate) return;
    return registerFieldValidator(name, validate);
  }, [name, validate, registerFieldValidator]);

  const fieldId = useMemo(() => nextFieldId(), []);

  const contextValue: FieldContextValue = useMemo(
    () => ({
      name,
      inputId: fieldId,
      errorId: `${fieldId}-error`,
      hintId: `${fieldId}-hint`,
      required,
    }),
    [name, fieldId, required],
  );

  return <FieldContext.Provider value={contextValue}>{children}</FieldContext.Provider>;
}
