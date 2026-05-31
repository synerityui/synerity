import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PinInput } from "../components/PinInput";

describe("PinInput", () => {
  it("renders the correct number of cells (default 6)", () => {
    render(<PinInput />);
    expect(screen.getAllByRole("textbox")).toHaveLength(6);
  });

  it("renders custom length", () => {
    render(<PinInput length={4} />);
    expect(screen.getAllByRole("textbox")).toHaveLength(4);
  });

  it("all cells are disabled when disabled=true", () => {
    render(<PinInput disabled />);
    screen.getAllByRole("textbox").forEach((input) => {
      expect(input).toBeDisabled();
    });
  });

  it("auto-advances to next cell on digit entry", async () => {
    render(<PinInput length={4} />);
    const cells = screen.getAllByRole("textbox");
    await userEvent.type(cells[0]!, "1");
    expect(document.activeElement).toBe(cells[1]!);
  });

  it("fires onChange as cells are filled", async () => {
    const onChange = vi.fn();
    render(<PinInput length={3} onChange={onChange} />);
    const cells = screen.getAllByRole("textbox");
    await userEvent.type(cells[0]!, "4");
    expect(onChange).toHaveBeenCalled();
  });

  it("fires onComplete when all cells are filled", async () => {
    const onComplete = vi.fn();
    render(<PinInput length={3} onComplete={onComplete} />);
    const cells = screen.getAllByRole("textbox");
    await userEvent.type(cells[0]!, "1");
    await userEvent.type(cells[1]!, "2");
    await userEvent.type(cells[2]!, "3");
    expect(onComplete).toHaveBeenCalledWith("123");
  });
});
