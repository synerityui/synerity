import { createContext, useContext } from "react";
import type { FormContextValue } from "../types";

export const FormContext = createContext<FormContextValue | null>(null);

/**
 * Returns the nearest `<Form>`'s context. Throws if called outside a `<Form>`.
 */
export function useFormContext<
  TValues extends Record<string, unknown> = Record<string, unknown>,
>(): FormContextValue<TValues> {
  const ctx = useContext(FormContext);
  if (!ctx) {
    throw new Error("`useFormContext` must be used inside a `<Form>` component.");
  }
  return ctx as FormContextValue<TValues>;
}
