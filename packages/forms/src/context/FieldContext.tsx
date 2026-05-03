import { createContext, useContext } from "react";
import type { FieldContextValue } from "../types";

export const FieldContext = createContext<FieldContextValue | null>(null);

/**
 * Returns the nearest `<Field>`'s context. Throws if called outside a `<Field>`.
 */
export function useFieldContext(): FieldContextValue {
  const ctx = useContext(FieldContext);
  if (!ctx) {
    throw new Error("`useFieldContext` must be used inside a `<Field>` component.");
  }
  return ctx;
}

/**
 * Returns the nearest `<Field>`'s context, or `null` if not inside a `<Field>`.
 * Use this when the hook should work both inside and outside a `<Field>`.
 */
export function useOptionalFieldContext(): FieldContextValue | null {
  return useContext(FieldContext);
}
