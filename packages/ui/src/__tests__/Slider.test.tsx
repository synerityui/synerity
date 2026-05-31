import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { Slider } from "../components/Slider";

describe("Slider", () => {
  it("renders a range input", () => {
    render(<Slider />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("renders with defaultValue", () => {
    render(<Slider defaultValue={40} />);
    expect(screen.getByRole("slider")).toHaveValue("40");
  });

  it("respects min and max attributes", () => {
    render(<Slider min={10} max={50} />);
    const input = screen.getByRole("slider");
    expect(input).toHaveAttribute("min", "10");
    expect(input).toHaveAttribute("max", "50");
  });

  it("renders label when provided", () => {
    render(<Slider label="Volume" />);
    expect(screen.getByText("Volume")).toBeInTheDocument();
  });

  it("renders current value when showValue=true", () => {
    render(<Slider defaultValue={30} showValue label="Volume" />);
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  it("calls onChange when value changes", () => {
    const onChange = vi.fn();
    render(<Slider defaultValue={0} onChange={onChange} />);
    fireEvent.change(screen.getByRole("slider"), { target: { value: "10" } });
    expect(onChange).toHaveBeenCalledWith(10);
  });

  it("is disabled when disabled prop is set", () => {
    render(<Slider disabled />);
    expect(screen.getByRole("slider")).toBeDisabled();
  });
});
