import type React from "react";

/** Flat or nested record representing form field values. */
export type FieldValues = Record<string, unknown>;

/** Controls when validation runs. */
export type ValidationMode = "change" | "blur" | "submit";

/** Result returned by any resolver — a map of field paths to error messages. */
export type ResolverResult = {
  errors: Record<string, string>;
};

/** Custom validation resolver. Receives the full form values; returns field-level errors. */
export type Resolver<TValues extends FieldValues = FieldValues> = (
  values: TValues,
) => ResolverResult | Promise<ResolverResult>;

/** Per-field synchronous or asynchronous validator attached to a `<Field>`. */
export type FieldValidator = (
  value: unknown,
) => string | null | undefined | Promise<string | null | undefined>;

/** Snapshot of a single field's state. */
export type FieldState = {
  value: unknown;
  error: string | undefined;
  touched: boolean;
  dirty: boolean;
};

/** Internal flat representation of the form's runtime state. */
export type FormInternalState = {
  values: Record<string, unknown>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  initialValues: Record<string, unknown>;
  isSubmitting: boolean;
  submitCount: number;
};

/** Helpers passed to `onSubmit` and exposed by `useFormState`. */
export type FormHelpers<TValues extends FieldValues = FieldValues> = {
  reset: (values?: Partial<TValues>) => void;
  setValue: (name: string, value: unknown) => void;
  setError: (name: string, error: string) => void;
  clearError: (name: string) => void;
};

/** Value shape provided by `FormContext`. */
export type FormContextValue<TValues extends FieldValues = FieldValues> = {
  state: FormInternalState;
  validateOn: ValidationMode;
  setFieldValue: (name: string, value: unknown) => void;
  setFieldTouched: (name: string) => void;
  setFieldError: (name: string, error: string) => void;
  clearFieldError: (name: string) => void;
  reset: (values?: Partial<TValues>) => void;
  setError: (name: string, error: string) => void;
  runFieldValidation: (name: string, value: unknown) => Promise<void>;
  registerFieldValidator: (name: string, validate: FieldValidator) => () => void;
};

/** Value shape provided by `FieldContext`. */
export type FieldContextValue = {
  name: string;
  inputId: string;
  errorId: string;
  hintId: string;
  required: boolean;
};

/** Props accepted by `<Form>`. */
export type FormProps<TValues extends FieldValues = FieldValues> = {
  children: React.ReactNode;
  defaultValues?: Partial<TValues>;
  onSubmit: (values: TValues, helpers: FormHelpers<TValues>) => void | Promise<void>;
  /** Zod schema — auto-wrapped in `zodResolver`. Pass `resolver` instead for custom validation. */
  schema?: { safeParseAsync: (data: unknown) => Promise<ZodSafeParseResult> };
  /** Custom resolver, replaces `schema` when provided. */
  resolver?: Resolver<TValues>;
  /** When validation fires. Defaults to `"submit"`. */
  validateOn?: ValidationMode;
  className?: string;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

/** Minimal shape of a Zod safeParseAsync result used by the built-in zodResolver. */
export type ZodSafeParseResult =
  | { success: true }
  | {
      success: false;
      error: {
        issues: Array<{ path: Array<string | number>; message: string }>;
      };
    };
