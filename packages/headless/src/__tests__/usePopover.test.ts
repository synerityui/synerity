import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { usePopover } from "../hooks/usePopover";

describe("usePopover", () => {
  it("starts closed by default", () => {
    const { result } = renderHook(() => usePopover());
    expect(result.current.isOpen).toBe(false);
  });

  it("respects defaultOpen=true", () => {
    const { result } = renderHook(() => usePopover({ defaultOpen: true }));
    expect(result.current.isOpen).toBe(true);
  });

  it("open() opens the popover", () => {
    const { result } = renderHook(() => usePopover());
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
  });

  it("close() closes the popover", () => {
    const { result } = renderHook(() => usePopover({ defaultOpen: true }));
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });

  it("triggerProps.onClick toggles open state", () => {
    const { result } = renderHook(() => usePopover());
    act(() => {
      result.current.triggerProps.onClick?.({} as React.MouseEvent<HTMLButtonElement>);
    });
    expect(result.current.isOpen).toBe(true);
    act(() => {
      result.current.triggerProps.onClick?.({} as React.MouseEvent<HTMLButtonElement>);
    });
    expect(result.current.isOpen).toBe(false);
  });

  it("triggerProps has aria-expanded reflecting isOpen", () => {
    const { result } = renderHook(() => usePopover());
    expect(result.current.triggerProps["aria-expanded"]).toBe(false);
    act(() => result.current.open());
    expect(result.current.triggerProps["aria-expanded"]).toBe(true);
  });

  it("popoverProps has role=region", () => {
    const { result } = renderHook(() => usePopover());
    expect(result.current.popoverProps.role).toBe("region");
  });

  it("calls onOpenChange when state changes", () => {
    const onOpenChange = vi.fn();
    const { result } = renderHook(() => usePopover({ onOpenChange }));
    act(() => result.current.open());
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});

import type React from "react";
