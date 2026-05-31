import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Radio, RadioGroup } from "../components/Radio";

function TestGroup({
  defaultValue,
  onChange,
}: {
  defaultValue?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <RadioGroup {...(defaultValue ? { defaultValue } : {})} {...(onChange ? { onChange } : {})} name="color">
      <Radio value="red" label="Red" />
      <Radio value="green" label="Green" />
      <Radio value="blue" label="Blue" disabled />
    </RadioGroup>
  );
}

describe("RadioGroup", () => {
  it("renders all radio buttons", () => {
    render(<TestGroup />);
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("pre-selects defaultValue", () => {
    render(<TestGroup defaultValue="red" />);
    expect(screen.getByLabelText("Red")).toBeChecked();
    expect(screen.getByLabelText("Green")).not.toBeChecked();
  });

  it("selects a radio on click", async () => {
    render(<TestGroup />);
    await userEvent.click(screen.getByLabelText("Green"));
    expect(screen.getByLabelText("Green")).toBeChecked();
  });

  it("fires onChange with selected value", async () => {
    const onChange = vi.fn();
    render(<TestGroup onChange={onChange} />);
    await userEvent.click(screen.getByLabelText("Red"));
    expect(onChange).toHaveBeenCalledWith("red");
  });

  it("disabled radio cannot be selected", async () => {
    render(<TestGroup />);
    expect(screen.getByLabelText("Blue")).toBeDisabled();
  });
});

describe("Radio — outside RadioGroup", () => {
  it("throws when rendered outside RadioGroup", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Radio value="x" label="X" />)).toThrow();
    spy.mockRestore();
  });
});
