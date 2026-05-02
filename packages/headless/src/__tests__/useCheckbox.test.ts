import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useCheckbox } from "../hooks/useCheckbox";

describe("useCheckbox", () => {
  it("is unchecked by default", () => {
    const { result } = renderHook(() => useCheckbox());
    expect(result.current.state.isChecked).toBe(false);
  });

  it("respects defaultChecked", () => {
    const { result } = renderHook(() => useCheckbox({ defaultChecked: true }));
    expect(result.current.state.isChecked).toBe(true);
  });

  it("type is checkbox", () => {
    const { result } = renderHook(() => useCheckbox());
    expect(result.current.checkboxProps.type).toBe("checkbox");
  });

  it("calls onChange on change", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useCheckbox({ onChange }));
    act(() => {
      result.current.checkboxProps.onChange?.({
        target: { checked: true },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("does not call onChange when disabled", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useCheckbox({ disabled: true, onChange }));
    act(() => {
      result.current.checkboxProps.onChange?.({
        target: { checked: true },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("sets aria-checked=mixed when indeterminate", () => {
    const { result } = renderHook(() => useCheckbox({ indeterminate: true }));
    expect(result.current.checkboxProps["aria-checked"]).toBe("mixed");
    expect(result.current.state.isIndeterminate).toBe(true);
  });

  it("sets aria-checked correctly for checked/unchecked", () => {
    const { result: checked } = renderHook(() => useCheckbox({ defaultChecked: true }));
    expect(checked.current.checkboxProps["aria-checked"]).toBe(true);

    const { result: unchecked } = renderHook(() => useCheckbox({ defaultChecked: false }));
    expect(unchecked.current.checkboxProps["aria-checked"]).toBe(false);
  });
});

import type React from "react";
