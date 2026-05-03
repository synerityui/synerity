import { useFormContext } from "../context/FormContext";
import type { FieldValues, FormHelpers } from "../types";
import { deepEqual } from "../utils/deepEqual";

type FormStateReturn<TValues extends FieldValues = FieldValues> = FormHelpers<TValues> & {
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
  submitCount: number;
};

/**
 * Returns form-level state and imperative helpers from the nearest `<Form>`.
 * Must be used inside a `<Form>`.
 *
 * @example
 * ```tsx
 * const { isSubmitting, isValid, reset } = useFormState();
 * ```
 */
export function useFormState<
  TValues extends FieldValues = FieldValues,
>(): FormStateReturn<TValues> {
  const { state, reset, setFieldValue, setFieldError, clearFieldError } =
    useFormContext<TValues>();

  const isValid = Object.keys(state.errors).length === 0;
  const isDirty = !deepEqual(state.values, state.initialValues);

  return {
    isSubmitting: state.isSubmitting,
    isValid,
    isDirty,
    submitCount: state.submitCount,
    reset,
    setValue: setFieldValue,
    setError: setFieldError,
    clearError: clearFieldError,
  };
}
