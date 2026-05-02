import { useCallback, useRef } from "react";

import { useId } from "../utils/useId";

type UseTextareaProps = {
  id?: string | undefined;
  value?: string | undefined;
  defaultValue?: string | undefined;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  invalid?: boolean | undefined;
  required?: boolean | undefined;
  name?: string | undefined;
  /** Automatically grows the textarea to fit its content. */
  autoResize?: boolean | undefined;
};

type UseTextareaReturn = {
  textareaProps: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  /** Attach this ref to the <textarea> element when using autoResize. */
  ref: React.RefObject<HTMLTextAreaElement | null>;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  errorProps: React.HTMLAttributes<HTMLElement>;
  hintProps: React.HTMLAttributes<HTMLElement>;
  state: { isDisabled: boolean; isReadOnly: boolean; isInvalid: boolean; isRequired: boolean };
};

/**
 * Provides correctly wired ARIA props for a textarea, its label, error, and hint.
 * Supports autoResize to grow with content height.
 */
export function useTextarea({
  id: idProp,
  value,
  defaultValue,
  onChange,
  disabled = false,
  readOnly = false,
  invalid = false,
  required = false,
  name,
  autoResize = false,
}: UseTextareaProps = {}): UseTextareaReturn {
  const generatedId = useId("textarea");
  const id = idProp ?? generatedId;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const internalRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize && internalRef.current) {
        internalRef.current.style.height = "auto";
        internalRef.current.style.height = `${internalRef.current.scrollHeight}px`;
      }
      onChange?.(event);
    },
    [autoResize, onChange],
  );

  const textareaProps: React.TextareaHTMLAttributes<HTMLTextAreaElement> = {
    id,
    name,
    value,
    defaultValue,
    disabled,
    readOnly,
    required,
    "aria-invalid": invalid || undefined,
    "aria-required": required || undefined,
    "aria-describedby": [invalid ? errorId : undefined, hintId].filter(Boolean).join(" ") || undefined,
    onChange: handleChange,
    ...(autoResize ? { rows: 1, style: { overflow: "hidden", resize: "none" } as React.CSSProperties } : {}),
  };

  const labelProps: React.LabelHTMLAttributes<HTMLLabelElement> = { htmlFor: id };
  const errorProps: React.HTMLAttributes<HTMLElement> = { id: errorId, role: "alert" as const, "aria-live": "polite" as const };
  const hintProps: React.HTMLAttributes<HTMLElement> = { id: hintId };

  return {
    textareaProps,
    ref: internalRef,
    labelProps,
    errorProps,
    hintProps,
    state: { isDisabled: disabled, isReadOnly: readOnly, isInvalid: invalid, isRequired: required },
  };
}

import type React from "react";
