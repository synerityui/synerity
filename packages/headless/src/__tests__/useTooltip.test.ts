import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useTooltip } from "../hooks/useTooltip";

describe("useTooltip", () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it("starts invisible", () => {
    const { result } = renderHook(() => useTooltip({ delay: 0 }));
    expect(result.current.isVisible).toBe(false);
  });

  it("shows after delay when onMouseEnter is called", () => {
    const { result } = renderHook(() => useTooltip({ delay: 0 }));
    act(() => {
      result.current.triggerProps.onMouseEnter?.({} as React.MouseEvent<HTMLElement>);
      vi.runAllTimers();
    });
    expect(result.current.isVisible).toBe(true);
  });

  it("hides when onMouseLeave is called", () => {
    const { result } = renderHook(() => useTooltip({ delay: 0 }));
    act(() => {
      result.current.triggerProps.onMouseEnter?.({} as React.MouseEvent<HTMLElement>);
      vi.runAllTimers();
    });
    act(() => { result.current.triggerProps.onMouseLeave?.({} as React.MouseEvent<HTMLElement>); });
    expect(result.current.isVisible).toBe(false);
  });

  it("shows on focus", () => {
    const { result } = renderHook(() => useTooltip({ delay: 0 }));
    act(() => {
      result.current.triggerProps.onFocus?.({} as React.FocusEvent<HTMLElement>);
      vi.runAllTimers();
    });
    expect(result.current.isVisible).toBe(true);
  });

  it("hides on blur", () => {
    const { result } = renderHook(() => useTooltip({ delay: 0 }));
    act(() => {
      result.current.triggerProps.onFocus?.({} as React.FocusEvent<HTMLElement>);
      vi.runAllTimers();
    });
    act(() => { result.current.triggerProps.onBlur?.({} as React.FocusEvent<HTMLElement>); });
    expect(result.current.isVisible).toBe(false);
  });

  it("tooltipProps has role=tooltip", () => {
    const { result } = renderHook(() => useTooltip());
    expect(result.current.tooltipProps.role).toBe("tooltip");
  });

  it("triggerProps.aria-describedby is set when visible", () => {
    const { result } = renderHook(() => useTooltip({ delay: 0 }));
    act(() => {
      result.current.triggerProps.onMouseEnter?.({} as React.MouseEvent<HTMLElement>);
      vi.runAllTimers();
    });
    expect(result.current.triggerProps["aria-describedby"]).toBe(result.current.tooltipId);
  });
});

import type React from "react";
