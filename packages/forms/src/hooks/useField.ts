import { useCallback, useId } from "react";
import { useOptionalFieldContext } from "../context/FieldContext";
import { useFormContext } from "../context/FormContext";
import type { FieldState } from "../types";
import { getByPath } from "../utils/path";

type UseFieldOptions = {
  /** Field path — required when used outside a `<Field>`, optional inside one. */
  name?: string;
};

type UseFieldReturn = FieldState & {
  /** Spread these onto your input element for full ARIA + value wiring. */
  inputProps: {
    id: string;
    name: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
    "aria-invalid": true | undefined;
    "aria-required": true | undefined;
    "aria-describedby": string | undefined;
  };
  /** Programmatically set the field value. */
  onChange: (value: unknown) => void;
  /** Mark the field as touched (triggers blur-mode validation). */
  onBlur: () => void;
};

/**
 * Connects a form control to the nearest `<Form>` state.
 *
 * When called inside a `<Field>`, `name` is inferred from that context.
 * When called outside a `<Field>`, `name` is required.
 *
 * @example
 * ```tsx
 * // Inside a <Field name="email">
 * const { inputProps } = useField();
 * return <input type="email" {...inputProps} />;
 *
 * // Outside a <Field>, anywhere inside <Form>
 * const { value, onChange } = useField({ name: 'email' });
 * ```
 */
export function useField(nameOrOptions?: string | UseFieldOptions): UseFieldReturn {
  const fieldCtx = useOptionalFieldContext();
  const { state, validateOn, setFieldValue, setFieldTouched, runFieldValidation } =
    useFormContext();

  const resolvedName: string = (() => {
    if (typeof nameOrOptions === "string") return nameOrOptions;
    if (nameOrOptions?.name) return nameOrOptions.name;
    if (fieldCtx?.name) return fieldCtx.name;
    throw new Error(
      "`useField` requires a `name` when used outside a `<Field>` component.",
    );
  })();

  const fallbackId = useId();
  const inputId = fieldCtx?.inputId ?? `synerity-input-${fallbackId}`;
  const errorId = fieldCtx?.errorId ?? `${inputId}-error`;
  const hintId = fieldCtx?.hintId ?? `${inputId}-hint`;
  const required = fieldCtx?.required ?? false;

  const rawValue = getByPath(state.values, resolvedName);
  const value = rawValue === undefined || rawValue === null ? "" : String(rawValue);
  const error = state.errors[resolvedName];
  const touched = state.touched[resolvedName] ?? false;
  const dirty =
    getByPath(state.values, resolvedName) !==
    getByPath(state.initialValues, resolvedName);

  const onChange = useCallback(
    (nextValue: unknown) => {
      setFieldValue(resolvedName, nextValue);
      if (validateOn === "change") {
        void runFieldValidation(resolvedName, nextValue);
      }
    },
    [resolvedName, setFieldValue, validateOn, runFieldValidation],
  );

  const onBlur = useCallback(() => {
    setFieldTouched(resolvedName);
    if (validateOn === "blur") {
      void runFieldValidation(resolvedName, getByPath(state.values, resolvedName));
    }
  }, [resolvedName, setFieldTouched, validateOn, runFieldValidation, state.values]);

  const handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > = useCallback(
    (e) => onChange(e.target.value),
    [onChange],
  );

  const handleInputBlur: React.FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > = useCallback(() => onBlur(), [onBlur]);

  const describedBy =
    [error ? errorId : undefined, hintId].filter(Boolean).join(" ") || undefined;

  return {
    value: rawValue,
    error,
    touched,
    dirty,
    onChange,
    onBlur,
    inputProps: {
      id: inputId,
      name: resolvedName,
      value,
      onChange: handleInputChange,
      onBlur: handleInputBlur,
      "aria-invalid": error ? true : undefined,
      "aria-required": required ? true : undefined,
      "aria-describedby": describedBy,
    },
  };
}
