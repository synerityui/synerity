import type { FieldValues, Resolver, ZodSafeParseResult } from "../types";

type ZodSchema<TValues> = {
  safeParseAsync: (data: unknown) => Promise<ZodSafeParseResult>;
  /** Also support sync `.safeParse` for convenience — we always call the async variant. */
  safeParse?: (data: unknown) => ZodSafeParseResult;
};

/**
 * Adapts a Zod schema into a `@synerity/forms` resolver.
 * Zod is a peer dependency — pass the schema created with `z.object(...)`.
 *
 * @example
 * ```ts
 * import { z } from 'zod';
 * import { zodResolver } from '@synerity/forms';
 *
 * const schema = z.object({ email: z.string().email() });
 *
 * <Form resolver={zodResolver(schema)} onSubmit={...}>
 * ```
 */
export function zodResolver<TValues extends FieldValues = FieldValues>(
  schema: ZodSchema<TValues>,
): Resolver<TValues> {
  return async (values): Promise<{ errors: Record<string, string> }> => {
    const result = await schema.safeParseAsync(values);

    if (result.success) return { errors: {} };

    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      // Zod path segments can be strings (object keys) or numbers (array indices)
      const path = issue.path
        .map((segment, i) =>
          typeof segment === "number"
            ? `[${segment}]`
            : i === 0
              ? segment
              : `.${segment}`,
        )
        .join("");

      if (!errors[path]) {
        errors[path] = issue.message;
      }
    }

    return { errors };
  };
}
