import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { NumberInput } from "../components/NumberInput";

describe("NumberInput", () => {
  it("has role=spinbutton", () => {
    render(<NumberInput />);
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });

  it("renders with defaultValue", () => {
    render(<NumberInput defaultValue={5} />);
    expect(screen.getByRole("spinbutton")).toHaveValue(5);
  });

  it("renders label when provided", () => {
    render(<NumberInput label="Quantity" />);
    expect(screen.getByText("Quantity")).toBeInTheDocument();
  });

  it("shows error when provided", () => {
    render(<NumberInput error="Too small" />);
    expect(screen.getByText("Too small")).toBeInTheDocument();
  });

  it("increments value when increment button is clicked", async () => {
    const onChange = vi.fn();
    render(<NumberInput defaultValue={0} step={1} onChange={onChange} />);
    await userEvent.click(screen.getByLabelText(/increment/i));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it("decrements value when decrement button is clicked", async () => {
    const onChange = vi.fn();
    render(<NumberInput defaultValue={5} step={1} onChange={onChange} />);
    await userEvent.click(screen.getByLabelText(/decrement/i));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("is disabled when disabled prop is set", () => {
    render(<NumberInput disabled />);
    expect(screen.getByRole("spinbutton")).toBeDisabled();
  });
});
