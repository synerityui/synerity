import { useId } from "../utils/useId";

type UseInputProps = {
  id?: string | undefined;
  value?: string | undefined;
  defaultValue?: string | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  invalid?: boolean | undefined;
  required?: boolean | undefined;
  name?: string | undefined;
};

type UseInputReturn = {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  errorProps: React.HTMLAttributes<HTMLElement>;
  hintProps: React.HTMLAttributes<HTMLElement>;
  state: { isDisabled: boolean; isReadOnly: boolean; isInvalid: boolean; isRequired: boolean };
};

/**
 * Provides correctly wired ARIA props for an input field, its label, error, and hint.
 * Error and hint elements are auto-linked via aria-describedby.
 */
export function useInput({
  id: idProp,
  value,
  defaultValue,
  onChange,
  disabled = false,
  readOnly = false,
  invalid = false,
  required = false,
  name,
}: UseInputProps = {}): UseInputReturn {
  const generatedId = useId("input");
  const id = idProp ?? generatedId;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
    id,
    name,
    value,
    defaultValue,
    onChange,
    disabled,
    readOnly,
    required,
    "aria-invalid": invalid || undefined,
    "aria-required": required || undefined,
    "aria-describedby": [invalid ? errorId : undefined, hintId].filter(Boolean).join(" ") || undefined,
  };

  const labelProps: React.LabelHTMLAttributes<HTMLLabelElement> = {
    htmlFor: id,
  };

  const errorProps: React.HTMLAttributes<HTMLElement> = {
    id: errorId,
    role: "alert" as const,
    "aria-live": "polite" as const,
  };

  const hintProps: React.HTMLAttributes<HTMLElement> = {
    id: hintId,
  };

  return {
    inputProps,
    labelProps,
    errorProps,
    hintProps,
    state: { isDisabled: disabled, isReadOnly: readOnly, isInvalid: invalid, isRequired: required },
  };
}

import type React from "react";
