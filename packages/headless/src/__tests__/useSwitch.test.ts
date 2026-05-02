import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useSwitch } from "../hooks/useSwitch";

describe("useSwitch", () => {
  it("is unchecked by default", () => {
    const { result } = renderHook(() => useSwitch());
    expect(result.current.state.isChecked).toBe(false);
  });

  it("respects defaultChecked", () => {
    const { result } = renderHook(() => useSwitch({ defaultChecked: true }));
    expect(result.current.state.isChecked).toBe(true);
  });

  it("switchProps has role=switch", () => {
    const { result } = renderHook(() => useSwitch());
    expect(result.current.switchProps.role).toBe("switch");
  });

  it("aria-checked reflects state", () => {
    const { result } = renderHook(() => useSwitch({ defaultChecked: true }));
    expect(result.current.switchProps["aria-checked"]).toBe(true);
  });

  it("clicking toggles state", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useSwitch({ onChange }));
    act(() => result.current.switchProps.onClick?.({} as React.MouseEvent<HTMLButtonElement>));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("does not toggle when disabled", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useSwitch({ disabled: true, onChange }));
    act(() => result.current.switchProps.onClick?.({} as React.MouseEvent<HTMLButtonElement>));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("hidden input is aria-hidden", () => {
    const { result } = renderHook(() => useSwitch());
    expect(result.current.inputProps["aria-hidden"]).toBe(true);
  });
});

import type React from "react";
