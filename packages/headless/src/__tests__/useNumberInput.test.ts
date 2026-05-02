import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useNumberInput } from "../hooks/useNumberInput";

describe("useNumberInput", () => {
  it("returns spinbutton role", () => {
    const { result } = renderHook(() => useNumberInput());
    expect(result.current.inputProps.role).toBe("spinbutton");
  });

  it("increment increases value by step", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useNumberInput({ defaultValue: 5, step: 2, onChange }));
    act(() => result.current.incrementProps.onClick?.({} as React.MouseEvent<HTMLButtonElement>));
    expect(onChange).toHaveBeenCalledWith(7);
  });

  it("decrement decreases value by step", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useNumberInput({ defaultValue: 5, step: 2, onChange }));
    act(() => result.current.decrementProps.onClick?.({} as React.MouseEvent<HTMLButtonElement>));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("clamps to max on increment past max", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useNumberInput({ defaultValue: 9, max: 10, step: 5, onChange }));
    act(() => result.current.incrementProps.onClick?.({} as React.MouseEvent<HTMLButtonElement>));
    expect(onChange).toHaveBeenCalledWith(10);
  });

  it("clamps to min on decrement past min", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useNumberInput({ defaultValue: 2, min: 0, step: 5, onChange }));
    act(() => result.current.decrementProps.onClick?.({} as React.MouseEvent<HTMLButtonElement>));
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it("sets aria-valuemin and aria-valuemax", () => {
    const { result } = renderHook(() => useNumberInput({ min: 0, max: 100 }));
    expect(result.current.inputProps["aria-valuemin"]).toBe(0);
    expect(result.current.inputProps["aria-valuemax"]).toBe(100);
  });

  it("isAtMin is true when at minimum", () => {
    const { result } = renderHook(() => useNumberInput({ defaultValue: 0, min: 0 }));
    expect(result.current.state.isAtMin).toBe(true);
  });

  it("isAtMax is true when at maximum", () => {
    const { result } = renderHook(() => useNumberInput({ defaultValue: 10, max: 10 }));
    expect(result.current.state.isAtMax).toBe(true);
  });

  it("does not change when disabled", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useNumberInput({ defaultValue: 5, disabled: true, onChange }));
    act(() => result.current.incrementProps.onClick?.({} as React.MouseEvent<HTMLButtonElement>));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("labelProps.htmlFor matches inputProps.id", () => {
    const { result } = renderHook(() => useNumberInput());
    expect(result.current.labelProps.htmlFor).toBe(result.current.inputProps.id);
  });
});

import type React from "react";
