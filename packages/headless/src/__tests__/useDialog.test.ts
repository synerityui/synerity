import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useDialog } from "../hooks/useDialog";

describe("useDialog", () => {
  it("starts closed by default", () => {
    const { result } = renderHook(() => useDialog());
    expect(result.current.isOpen).toBe(false);
  });

  it("respects defaultOpen=true", () => {
    const { result } = renderHook(() => useDialog({ defaultOpen: true }));
    expect(result.current.isOpen).toBe(true);
  });

  it("open() sets isOpen=true", () => {
    const { result } = renderHook(() => useDialog());
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
  });

  it("close() sets isOpen=false", () => {
    const { result } = renderHook(() => useDialog({ defaultOpen: true }));
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });

  it("calls onOpenChange when state changes", () => {
    const onOpenChange = vi.fn();
    const { result } = renderHook(() => useDialog({ onOpenChange }));
    act(() => result.current.open());
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("dialogProps has role=dialog and aria-modal=true", () => {
    const { result } = renderHook(() => useDialog());
    expect(result.current.dialogProps.role).toBe("dialog");
    expect(result.current.dialogProps["aria-modal"]).toBe(true);
  });

  it("triggerProps has aria-haspopup=dialog", () => {
    const { result } = renderHook(() => useDialog());
    expect(result.current.triggerProps["aria-haspopup"]).toBe("dialog");
  });

  it("triggerProps.onClick opens the dialog", () => {
    const { result } = renderHook(() => useDialog());
    act(() => {
      result.current.triggerProps.onClick?.({} as React.MouseEvent<HTMLButtonElement>);
    });
    expect(result.current.isOpen).toBe(true);
  });
});

import type React from "react";
