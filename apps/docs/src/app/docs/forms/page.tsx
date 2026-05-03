import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = { title: "@synerity/forms" };

export default function FormsPage() {
  return (
    <>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
          Packages
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 12 }}>@synerity/forms</h1>
        <p style={{ fontSize: 16, color: "var(--syn-text-muted)", lineHeight: 1.65 }}>
          A headless form engine with field-level state, Zod validation, and seamless integration with all{" "}
          <code style={{ fontFamily: "var(--syn-font-mono)", fontSize: 14, color: "var(--syn-primary)" }}>@synerity/ui</code> input components.
          No external form library dependency.
        </p>
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 12 }}>Installation</h2>
      <CodeBlock lang="bash" code="npm install @synerity/forms zod" />
      <p style={{ color: "var(--syn-text-muted)", fontSize: 13, marginTop: 8 }}>
        Zod is a peer dependency — it is not bundled. Install the version your project uses.
      </p>

      <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: "32px 0 12px" }}>Quick start</h2>
      <CodeBlock code={`import { z } from 'zod'
import { Form, Field, Label, FieldError, FieldHint } from '@synerity/forms'
import { Input, Button } from '@synerity/ui'

const schema = z.object({
  email:    z.string().email('Enter a valid email'),
  password: z.string().min(8, 'At least 8 characters'),
})

export function LoginForm() {
  function handleSubmit(values: z.infer<typeof schema>) {
    console.log(values)
  }

  return (
    <Form onSubmit={handleSubmit} schema={schema}>
      <Field name="email">
        <Label>Email</Label>
        <Input type="email" />
        <FieldError />
      </Field>

      <Field name="password">
        <Label>Password</Label>
        <Input type="password" />
        <FieldHint>Must be at least 8 characters.</FieldHint>
        <FieldError />
      </Field>

      <Button type="submit">Sign in</Button>
    </Form>
  )
}`} />

      <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: "40px 0 16px" }}>API reference</h2>

      {[
        {
          name: "<Form>",
          desc: "Root context provider. Manages submit, tracks form state, and provides context to all child Field/Label/FieldError components.",
          props: [
            { n: "onSubmit", t: "(values: T) => void | Promise<void>", desc: "Called with validated values on submit." },
            { n: "schema", t: "ZodSchema<T>", desc: "Zod schema for validation." },
            { n: "defaultValues", t: "Partial<T>", desc: "Initial field values." },
            { n: "validateOn", t: '"submit" | "blur" | "change"', desc: "When to trigger validation. Default: submit." },
          ],
        },
        {
          name: "<Field>",
          desc: "Groups a label, control, error, and hint. Wires ARIA for/id/aria-describedby automatically.",
          props: [
            { n: "name", t: "string", desc: "Field name — must match a key in the schema." },
          ],
        },
        {
          name: "useField(name)",
          desc: "Access field state from anywhere inside <Form>.",
          props: [
            { n: "value", t: "unknown", desc: "Current field value." },
            { n: "error", t: "string | undefined", desc: "Validation error message." },
            { n: "touched", t: "boolean", desc: "True after the field has been blurred." },
            { n: "dirty", t: "boolean", desc: "True when the value differs from defaultValues." },
          ],
        },
        {
          name: "useFormState()",
          desc: "Access form-level state and imperative methods.",
          props: [
            { n: "isSubmitting", t: "boolean", desc: "True while onSubmit is in-flight." },
            { n: "isValid", t: "boolean", desc: "True when all fields pass validation." },
            { n: "isDirty", t: "boolean", desc: "True when any field value has changed." },
            { n: "reset()", t: "() => void", desc: "Resets all fields to defaultValues." },
            { n: "setValue(name, value)", t: "function", desc: "Programmatically set a field value." },
            { n: "setError(name, message)", t: "function", desc: "Set a server-side error on a field." },
          ],
        },
      ].map(({ name, desc, props }) => (
        <div key={name} style={{ marginBottom: 32 }}>
          <h3 style={{ fontFamily: "var(--syn-font-mono)", fontSize: 15, fontWeight: 600, color: "var(--syn-primary)", marginBottom: 6 }}>{name}</h3>
          <p style={{ fontSize: 13, color: "var(--syn-text-muted)", lineHeight: 1.6, marginBottom: 12 }}>{desc}</p>
          <div style={{ border: "1px solid var(--syn-border)", borderRadius: "var(--syn-radius-lg)", overflow: "hidden" }}>
            {props.map((p, i) => (
              <div key={p.n} style={{
                display: "grid", gridTemplateColumns: "160px 1fr",
                padding: "10px 16px", background: "var(--syn-bg-raised)",
                borderBottom: i < props.length - 1 ? "1px solid var(--syn-border)" : "none",
              }}>
                <code style={{ fontFamily: "var(--syn-font-mono)", fontSize: 12, color: "var(--syn-primary)" }}>{p.n}</code>
                <div>
                  <code style={{ fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-text-muted)", background: "var(--syn-bg-sunken)", padding: "1px 5px", borderRadius: "var(--syn-radius-sm)" }}>{p.t}</code>
                  <div style={{ fontSize: 12, color: "var(--syn-text-muted)", marginTop: 4 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
