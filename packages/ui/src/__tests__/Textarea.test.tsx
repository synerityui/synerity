import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Textarea } from "../components/Textarea";

describe("Textarea", () => {
  it("renders without label", () => {
    render(<Textarea placeholder="Write here" />);
    expect(screen.getByPlaceholderText("Write here")).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(<Textarea label="Description" />);
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(<Textarea error="Required" />);
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("shows hint when no error", () => {
    render(<Textarea hint="Max 200 characters" />);
    expect(screen.getByText("Max 200 characters")).toBeInTheDocument();
  });

  it("hides hint when error is set", () => {
    render(<Textarea hint="Max 200 characters" error="Too long" />);
    expect(screen.queryByText("Max 200 characters")).not.toBeInTheDocument();
    expect(screen.getByText("Too long")).toBeInTheDocument();
  });

  it("fires onChange when user types", async () => {
    const onChange = vi.fn();
    render(<Textarea onChange={onChange} />);
    await userEvent.type(screen.getByRole("textbox"), "hello");
    expect(onChange).toHaveBeenCalled();
  });

  it("is disabled when disabled prop is set", () => {
    render(<Textarea disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});
