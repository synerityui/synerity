import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Combobox } from "../components/Combobox";

const OPTIONS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];

describe("Combobox", () => {
  it("renders a text input with combobox role", () => {
    render(<Combobox options={OPTIONS} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders placeholder when provided", () => {
    render(<Combobox options={OPTIONS} placeholder="Search frameworks…" />);
    expect(screen.getByPlaceholderText("Search frameworks…")).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(<Combobox options={OPTIONS} label="Framework" />);
    expect(screen.getByText("Framework")).toBeInTheDocument();
  });

  it("opens dropdown on input focus", async () => {
    render(<Combobox options={OPTIONS} />);
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("calls onChange when an option is selected", async () => {
    const onChange = vi.fn();
    render(<Combobox options={OPTIONS} onChange={onChange} />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByText("Vue"));
    expect(onChange).toHaveBeenCalledWith("vue");
  });

  it("shows error when provided", () => {
    render(<Combobox options={OPTIONS} error="Required" />);
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is set", () => {
    render(<Combobox options={OPTIONS} disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });
});
