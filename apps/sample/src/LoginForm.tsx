import { z } from "zod";
import { Form, Field, Label, FieldError, FieldHint, useFormState } from "@synerity/forms";
import { Button, Input, Stack, Alert } from "@synerity/ui";
import { useState } from "react";

const schema = z.object({
  email:    z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type Values = z.infer<typeof schema>;

function SubmitButton() {
  const { isSubmitting } = useFormState();
  return (
    <Button type="submit" loading={isSubmitting} style={{ width: "100%" }}>
      Sign in
    </Button>
  );
}

export function LoginForm() {
  const [submitted, setSubmitted] = useState<Values | null>(null);

  async function handleSubmit(values: Values) {
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(values);
  }

  if (submitted) {
    return (
      <Alert variant="success" title="Form submitted ✓">
        Email: {submitted.email}
      </Alert>
    );
  }

  return (
    <Form onSubmit={handleSubmit} schema={schema}>
      <Stack gap="16px">
        <Field name="email">
          <Label>Email</Label>
          <Input type="email" placeholder="you@example.com" />
          <FieldError />
        </Field>

        <Field name="password">
          <Label>Password</Label>
          <Input type="password" placeholder="Min 8 characters" />
          <FieldHint>Must be at least 8 characters.</FieldHint>
          <FieldError />
        </Field>

        <SubmitButton />
      </Stack>
    </Form>
  );
}
