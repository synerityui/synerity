# @synerity/forms

A headless form engine for React with field-level state, Zod schema validation, and first-class integration with `@synerity/ui` inputs. No external form library dependency.

## Installation

```bash
npm install @synerity/forms zod
```

Zod is a peer dependency — install the version your project uses.

## Usage

```tsx
import { z } from 'zod'
import { Form, Field, Label, FieldError, FieldHint, useFormState } from '@synerity/forms'
import { Input, Button, Stack } from '@synerity/ui'

const schema = z.object({
  email:    z.string().email('Enter a valid email'),
  password: z.string().min(8, 'At least 8 characters'),
})

export function LoginForm() {
  async function handleSubmit(values: z.infer<typeof schema>) {
    await api.login(values)
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
          <Input type="password" />
          <FieldHint>Must be at least 8 characters.</FieldHint>
          <FieldError />
        </Field>

        <SubmitButton />
      </Stack>
    </Form>
  )
}

function SubmitButton() {
  const { isSubmitting } = useFormState()
  return (
    <Button type="submit" loading={isSubmitting}>
      Sign in
    </Button>
  )
}
```

## API

| Export | Description |
|---|---|
| `<Form>` | Root provider. Accepts `onSubmit`, `schema`, `defaultValues`, `validateOn` |
| `<Field name>` | Groups label + control + error + hint with correct ARIA wiring |
| `<Label>` | Auto-linked to the sibling control via Field context |
| `<FieldError>` | Renders the validation error for the parent Field |
| `<FieldHint>` | Renders helper text; hidden when an error is shown |
| `useField(name)` | Access `value`, `error`, `touched`, `dirty` for any field |
| `useFormState()` | Access `isSubmitting`, `isValid`, `isDirty`, `reset()`, `setValue()`, `setError()` |

## License

MIT © [Synerity Labs](https://github.com/synerityui)
