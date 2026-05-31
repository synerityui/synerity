import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useToggle } from "../hooks/useToggle";

describe("useToggle", () => {
  it("starts unpressed by default", () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current.isPressed).toBe(false);
  });

  it("respects defaultPressed=true", () => {
    const { result } = renderHook(() => useToggle({ defaultPressed: true }));
    expect(result.current.isPressed).toBe(true);
  });

  it("toggleProps has aria-pressed=false initially", () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current.toggleProps["aria-pressed"]).toBe(false);
  });

  it("toggles on click via toggleProps.onClick", () => {
    const { result } = renderHook(() => useToggle());
    act(() => { result.current.toggleProps.onClick?.({} as React.MouseEvent<HTMLButtonElement>); });
    expect(result.current.isPressed).toBe(true);
    act(() => { result.current.toggleProps.onClick?.({} as React.MouseEvent<HTMLButtonElement>); });
    expect(result.current.isPressed).toBe(false);
  });

  it("calls onChange when state changes", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useToggle({ onChange }));
    act(() => { result.current.toggleProps.onClick?.({} as React.MouseEvent<HTMLButtonElement>); });
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("does not toggle when disabled=true", () => {
    const { result } = renderHook(() => useToggle({ disabled: true }));
    act(() => { result.current.toggleProps.onClick?.({} as React.MouseEvent<HTMLButtonElement>); });
    expect(result.current.isPressed).toBe(false);
  });

  it("toggleProps.disabled is true when disabled=true", () => {
    const { result } = renderHook(() => useToggle({ disabled: true }));
    expect(result.current.toggleProps.disabled).toBe(true);
  });

  it("controlled: isPressed reflects pressed prop", () => {
    const { result } = renderHook(() => useToggle({ pressed: true }));
    expect(result.current.isPressed).toBe(true);
  });
});

import type React from "react";
