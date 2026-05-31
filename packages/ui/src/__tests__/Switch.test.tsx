import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Switch } from "../components/Switch";

describe("Switch", () => {
  it("renders with role=switch", () => {
    render(<Switch />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("is off (aria-checked=false) by default", () => {
    render(<Switch />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("is on when defaultChecked=true", () => {
    render(<Switch defaultChecked />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("toggles on click", async () => {
    render(<Switch />);
    const btn = screen.getByRole("switch");
    await userEvent.click(btn);
    expect(btn).toHaveAttribute("aria-checked", "true");
  });

  it("fires onChange with new value", async () => {
    const onChange = vi.fn();
    render(<Switch onChange={onChange} />);
    await userEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("renders label when provided", () => {
    render(<Switch label="Dark mode" />);
    expect(screen.getByText("Dark mode")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is set", () => {
    render(<Switch disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });
});
