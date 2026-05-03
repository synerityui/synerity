import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { Field } from "../components/Field";
import { FieldError } from "../components/FieldError";
import { FieldHint } from "../components/FieldHint";
import { Form } from "../components/Form";
import { Label } from "../components/Label";
import { useField } from "../hooks/useField";
import { useFormState } from "../hooks/useFormState";
import { zodResolver } from "../resolvers/zodResolver";

// ── Test helpers ──────────────────────────────────────────────────────────────

function TextInput({ name }: { name: string }) {
  const { inputProps } = useField(name);
  return <input data-testid={name} {...inputProps} />;
}

function SubmitButton() {
  const { isSubmitting } = useFormState();
  return (
    <button type="submit" disabled={isSubmitting} data-testid="submit">
      {isSubmitting ? "Submitting…" : "Submit"}
    </button>
  );
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("Form — basic render", () => {
  it("renders children inside a <form> element", () => {
    render(
      <Form onSubmit={vi.fn()}>
        <button type="submit">Go</button>
      </Form>,
    );
    expect(screen.getByRole("button", { name: "Go" }).closest("form")).toBeTruthy();
  });

  it("has noValidate on the form element", () => {
    const { container } = render(<Form onSubmit={vi.fn()}>{null}</Form>);
    expect(container.querySelector("form")?.getAttribute("novalidate")).not.toBeNull();
  });
});

describe("Form — submit", () => {
  it("calls onSubmit with current values", async () => {
    const handleSubmit = vi.fn();
    render(
      <Form defaultValues={{ email: "a@b.com" }} onSubmit={handleSubmit}>
        <TextInput name="email" />
        <SubmitButton />
      </Form>,
    );

    fireEvent.click(screen.getByTestId("submit"));
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledOnce());
    expect(handleSubmit).toHaveBeenCalledWith(
      { email: "a@b.com" },
      expect.objectContaining({ reset: expect.any(Function) }),
    );
  });

  it("does not call onSubmit when schema validation fails", async () => {
    const handleSubmit = vi.fn();
    const schema = z.object({ email: z.string().email("Bad email") });

    render(
      <Form defaultValues={{ email: "not-valid" }} resolver={zodResolver(schema)} onSubmit={handleSubmit}>
        <Field name="email">
          <TextInput name="email" />
          <FieldError />
        </Field>
        <SubmitButton />
      </Form>,
    );

    fireEvent.click(screen.getByTestId("submit"));
    await waitFor(() => screen.getByText("Bad email"));
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("clears previous errors and resubmits after fixing values", async () => {
    const handleSubmit = vi.fn();
    const schema = z.object({ name: z.string().min(2, "Too short") });

    render(
      <Form defaultValues={{ name: "A" }} resolver={zodResolver(schema)} onSubmit={handleSubmit}>
        <Field name="name">
          <TextInput name="name" />
          <FieldError />
        </Field>
        <SubmitButton />
      </Form>,
    );

    fireEvent.click(screen.getByTestId("submit"));
    await waitFor(() => screen.getByText("Too short"));

    await userEvent.clear(screen.getByTestId("name"));
    await userEvent.type(screen.getByTestId("name"), "Alice");
    fireEvent.click(screen.getByTestId("submit"));

    await waitFor(() => expect(handleSubmit).toHaveBeenCalledOnce());
    expect(screen.queryByText("Too short")).toBeNull();
  });
});

describe("Form — helpers", () => {
  it("reset() clears values and errors", async () => {
    const handleSubmit = vi.fn((_values, helpers) => {
      helpers.reset();
    });
    const schema = z.object({ email: z.string().email() });

    render(
      <Form defaultValues={{ email: "" }} resolver={zodResolver(schema)} onSubmit={handleSubmit}>
        <Field name="email">
          <TextInput name="email" />
          <FieldError />
        </Field>
        <SubmitButton />
      </Form>,
    );

    // Type a valid value and submit — reset() is called inside onSubmit
    await userEvent.type(screen.getByTestId("email"), "valid@example.com");
    fireEvent.click(screen.getByTestId("submit"));
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledOnce());

    // After reset the input should be empty again
    await waitFor(() => expect((screen.getByTestId("email") as HTMLInputElement).value).toBe(""));
  });

  it("setError() surfaces a programmatic error", async () => {
    const handleSubmit = vi.fn((_values, helpers: { setError: (n: string, e: string) => void }) => {
      helpers.setError("email", "Already taken");
    });

    render(
      <Form defaultValues={{ email: "a@b.com" }} onSubmit={handleSubmit}>
        <Field name="email">
          <TextInput name="email" />
          <FieldError />
        </Field>
        <SubmitButton />
      </Form>,
    );

    fireEvent.click(screen.getByTestId("submit"));
    await waitFor(() => screen.getByText("Already taken"));
  });
});

describe("Form — Field + ARIA wiring", () => {
  it("Label htmlFor links to input id", () => {
    render(
      <Form onSubmit={vi.fn()}>
        <Field name="email">
          <Label>Email</Label>
          <TextInput name="email" />
        </Field>
      </Form>,
    );
    const label = screen.getByText("Email");
    const input = screen.getByTestId("email");
    expect(label.getAttribute("for")).toBe(input.id);
  });

  it("FieldError is hidden when there is no error", () => {
    render(
      <Form onSubmit={vi.fn()}>
        <Field name="email">
          <TextInput name="email" />
          <FieldError />
        </Field>
      </Form>,
    );
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("FieldError renders with role=alert when error present", async () => {
    const schema = z.object({ email: z.string().min(1, "Required") });
    render(
      <Form defaultValues={{ email: "" }} resolver={zodResolver(schema)} onSubmit={vi.fn()}>
        <Field name="email">
          <TextInput name="email" />
          <FieldError />
        </Field>
        <SubmitButton />
      </Form>,
    );
    fireEvent.click(screen.getByTestId("submit"));
    await waitFor(() => screen.getByRole("alert"));
    expect(screen.getByRole("alert").textContent).toBe("Required");
  });

  it("FieldHint sets aria-hidden when error is active", async () => {
    const schema = z.object({ email: z.string().min(1, "Required") });
    render(
      <Form defaultValues={{ email: "" }} resolver={zodResolver(schema)} onSubmit={vi.fn()}>
        <Field name="email">
          <TextInput name="email" />
          <FieldError />
          <FieldHint>Helper text</FieldHint>
        </Field>
        <SubmitButton />
      </Form>,
    );
    fireEvent.click(screen.getByTestId("submit"));
    await waitFor(() => screen.getByRole("alert"));
    const hint = screen.getByTestId("email-hint");
    expect(hint.getAttribute("aria-hidden")).toBe("true");
  });

  it("input gets aria-invalid when field has error", async () => {
    const schema = z.object({ email: z.string().email("Bad") });
    render(
      <Form defaultValues={{ email: "x" }} resolver={zodResolver(schema)} onSubmit={vi.fn()}>
        <Field name="email">
          <TextInput name="email" />
          <FieldError />
        </Field>
        <SubmitButton />
      </Form>,
    );
    fireEvent.click(screen.getByTestId("submit"));
    await waitFor(() => screen.getByRole("alert"));
    expect(screen.getByTestId("email")).toHaveAttribute("aria-invalid", "true");
  });
});

describe("Form — validateOn", () => {
  it("validateOn=change fires field validator on input change", async () => {
    const validate = vi.fn().mockReturnValue("Bad");
    render(
      <Form onSubmit={vi.fn()} validateOn="change">
        <Field name="name" validate={validate}>
          <TextInput name="name" />
          <FieldError />
        </Field>
      </Form>,
    );
    await userEvent.type(screen.getByTestId("name"), "x");
    await waitFor(() => expect(validate).toHaveBeenCalled());
  });
});
