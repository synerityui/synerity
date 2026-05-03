import React, { useCallback, useMemo, useReducer, useRef } from "react";
import { FormContext } from "../context/FormContext";
import type {
  FieldValidator,
  FieldValues,
  FormContextValue,
  FormHelpers,
  FormInternalState,
  FormProps,
  Resolver,
  ValidationMode,
} from "../types";
import { getByPath, setByPath } from "../utils/path";

// ── Reducer ───────────────────────────────────────────────────────────────────

type FormAction =
  | { type: "SET_VALUE"; path: string; value: unknown }
  | { type: "SET_ERROR"; path: string; error: string }
  | { type: "CLEAR_ERROR"; path: string }
  | { type: "SET_TOUCHED"; path: string }
  | { type: "SET_ERRORS"; errors: Record<string, string> }
  | { type: "CLEAR_ERRORS" }
  | { type: "SET_SUBMITTING"; value: boolean }
  | { type: "INCREMENT_SUBMIT_COUNT" }
  | { type: "RESET"; values: Record<string, unknown> };

function formReducer(state: FormInternalState, action: FormAction): FormInternalState {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, values: setByPath(state.values, action.path, action.value) };
    case "SET_ERROR":
      return { ...state, errors: { ...state.errors, [action.path]: action.error } };
    case "CLEAR_ERROR": {
      const next = { ...state.errors };
      delete next[action.path];
      return { ...state, errors: next };
    }
    case "SET_TOUCHED":
      return { ...state, touched: { ...state.touched, [action.path]: true } };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "CLEAR_ERRORS":
      return { ...state, errors: {} };
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.value };
    case "INCREMENT_SUBMIT_COUNT":
      return { ...state, submitCount: state.submitCount + 1 };
    case "RESET":
      return {
        values: action.values,
        errors: {},
        touched: {},
        initialValues: action.values,
        isSubmitting: false,
        submitCount: 0,
      };
    default:
      return state;
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Root form container. Provides form state and validation to all descendants.
 * Wrap all `<Field>` components inside a `<Form>`.
 *
 * @example
 * ```tsx
 * <Form defaultValues={{ email: '' }} onSubmit={(values) => save(values)}>
 *   <Field name="email"><Label>Email</Label><MyInput /><FieldError /></Field>
 *   <Button type="submit">Submit</Button>
 * </Form>
 * ```
 */
export function Form<TValues extends FieldValues = FieldValues>({
  children,
  defaultValues,
  onSubmit,
  schema,
  resolver,
  validateOn = "submit",
  className,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: FormProps<TValues>) {
  // Field-level validators registered by <Field validate={fn}> children
  const fieldValidators = useRef<Map<string, FieldValidator>>(new Map());

  // Stable initial values snapshot — never re-derived after mount
  const initialValues = useRef<Record<string, unknown>>(
    (defaultValues ?? {}) as Record<string, unknown>,
  );

  const [state, dispatch] = useReducer(formReducer, {
    values: initialValues.current,
    errors: {},
    touched: {},
    initialValues: initialValues.current,
    isSubmitting: false,
    submitCount: 0,
  });

  // Build an effective resolver: custom resolver > schema wrapper > none
  const effectiveResolver = useMemo((): Resolver<TValues> | undefined => {
    if (resolver) return resolver;
    if (schema) {
      return async (values) => {
        const result = await schema.safeParseAsync(values);
        if (result.success) return { errors: {} };
        const errors: Record<string, string> = {};
        for (const issue of result.error.issues) {
          const path = issue.path.join(".");
          if (!errors[path]) errors[path] = issue.message;
        }
        return { errors };
      };
    }
    return undefined;
  }, [resolver, schema]);

  /** Run schema resolver + all registered field-level validators in parallel. */
  const runAllValidation = useCallback(
    async (values: Record<string, unknown>): Promise<Record<string, string>> => {
      const errors: Record<string, string> = {};

      const [resolverResult, ...fieldResults] = await Promise.all([
        effectiveResolver ? effectiveResolver(values as TValues) : { errors: {} },
        ...[...fieldValidators.current.entries()].map(async ([name, validate]) => {
          const error = await validate(getByPath(values, name));
          return [name, error ?? undefined] as [string, string | undefined];
        }),
      ]);

      Object.assign(errors, resolverResult.errors);

      for (const [name, error] of fieldResults as Array<[string, string | undefined]>) {
        if (error && !errors[name]) errors[name] = error;
      }

      return errors;
    },
    [effectiveResolver],
  );

  const runFieldValidation = useCallback(
    async (name: string, value: unknown): Promise<void> => {
      const validate = fieldValidators.current.get(name);
      if (!validate) return;
      const error = await validate(value);
      if (error) {
        dispatch({ type: "SET_ERROR", path: name, error });
      } else {
        dispatch({ type: "CLEAR_ERROR", path: name });
      }
    },
    [],
  );

  const registerFieldValidator = useCallback(
    (name: string, validate: FieldValidator): (() => void) => {
      fieldValidators.current.set(name, validate);
      return () => fieldValidators.current.delete(name);
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch({ type: "INCREMENT_SUBMIT_COUNT" });
      dispatch({ type: "SET_SUBMITTING", value: true });

      try {
        // Use latest state values via a ref-like closure — dispatch is async, so
        // we read from the reducer result directly via the captured `state`.
        const errors = await runAllValidation(state.values);

        if (Object.keys(errors).length > 0) {
          dispatch({ type: "SET_ERRORS", errors });
          for (const name of Object.keys(errors)) {
            dispatch({ type: "SET_TOUCHED", path: name });
          }
          return;
        }

        dispatch({ type: "CLEAR_ERRORS" });

        const helpers: FormHelpers<TValues> = {
          reset: (resetValues) => {
            const next = (resetValues ?? defaultValues ?? {}) as Record<string, unknown>;
            dispatch({ type: "RESET", values: next });
          },
          setValue: (name, value) => dispatch({ type: "SET_VALUE", path: name, value }),
          setError: (name, error) => dispatch({ type: "SET_ERROR", path: name, error }),
          clearError: (name) => dispatch({ type: "CLEAR_ERROR", path: name }),
        };

        await onSubmit(state.values as TValues, helpers);
      } finally {
        dispatch({ type: "SET_SUBMITTING", value: false });
      }
    },
    [runAllValidation, state.values, onSubmit, defaultValues],
  );

  // setFieldValue also triggers change-mode validation if configured
  const setFieldValue = useCallback(
    (name: string, value: unknown) => {
      dispatch({ type: "SET_VALUE", path: name, value });
    },
    [],
  );

  const setFieldTouched = useCallback((name: string) => {
    dispatch({ type: "SET_TOUCHED", path: name });
  }, []);

  const setFieldError = useCallback((name: string, error: string) => {
    dispatch({ type: "SET_ERROR", path: name, error });
  }, []);

  const clearFieldError = useCallback((name: string) => {
    dispatch({ type: "CLEAR_ERROR", path: name });
  }, []);

  const reset = useCallback(
    (values?: Partial<TValues>) => {
      const next = (values ?? defaultValues ?? {}) as Record<string, unknown>;
      dispatch({ type: "RESET", values: next });
    },
    [defaultValues],
  );

  const setError = useCallback((name: string, error: string) => {
    dispatch({ type: "SET_ERROR", path: name, error });
  }, []);

  const contextValue: FormContextValue<TValues> = useMemo(
    () => ({
      state,
      validateOn: validateOn as ValidationMode,
      setFieldValue,
      setFieldTouched,
      setFieldError,
      clearFieldError,
      reset,
      setError,
      runFieldValidation,
      registerFieldValidator,
    }),
    [
      state,
      validateOn,
      setFieldValue,
      setFieldTouched,
      setFieldError,
      clearFieldError,
      reset,
      setError,
      runFieldValidation,
      registerFieldValidator,
    ],
  );

  return (
    <FormContext.Provider value={contextValue as FormContextValue}>
      <form
        id={id}
        className={className}
        onSubmit={handleSubmit}
        noValidate
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}
