import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Select } from "../components/Select";

const OPTIONS = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry", disabled: true },
];

describe("Select", () => {
  it("renders placeholder by default", () => {
    render(<Select options={OPTIONS} placeholder="Pick a fruit" />);
    expect(screen.getByText("Pick a fruit")).toBeInTheDocument();
  });

  it("opens listbox on trigger click", async () => {
    render(<Select options={OPTIONS} />);
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });

  it("selects an option on click", async () => {
    const onChange = vi.fn();
    render(<Select options={OPTIONS} onChange={onChange} />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByText("Apple"));
    expect(onChange).toHaveBeenCalledWith("apple");
  });

  it("renders label when provided", () => {
    render(<Select options={OPTIONS} label="Fruit" />);
    expect(screen.getByText("Fruit")).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(<Select options={OPTIONS} error="Required" />);
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is set", () => {
    render(<Select options={OPTIONS} disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("pre-selects defaultValue", () => {
    render(<Select options={OPTIONS} defaultValue="banana" />);
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });
});
