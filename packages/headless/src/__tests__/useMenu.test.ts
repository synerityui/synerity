import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useMenu } from "../hooks/useMenu";

describe("useMenu", () => {
  it("starts closed by default", () => {
    const { result } = renderHook(() => useMenu());
    expect(result.current.isOpen).toBe(false);
  });

  it("respects defaultOpen=true", () => {
    const { result } = renderHook(() => useMenu({ defaultOpen: true }));
    expect(result.current.isOpen).toBe(true);
  });

  it("open() opens the menu", () => {
    const { result } = renderHook(() => useMenu());
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
  });

  it("close() closes the menu", () => {
    const { result } = renderHook(() => useMenu({ defaultOpen: true }));
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });

  it("menuProps has role=menu", () => {
    const { result } = renderHook(() => useMenu());
    expect(result.current.menuProps.role).toBe("menu");
  });

  it("triggerProps has aria-haspopup=menu", () => {
    const { result } = renderHook(() => useMenu());
    expect(result.current.triggerProps["aria-haspopup"]).toBe("menu");
  });

  it("triggerProps.aria-expanded reflects isOpen", () => {
    const { result } = renderHook(() => useMenu());
    expect(result.current.triggerProps["aria-expanded"]).toBe(false);
    act(() => result.current.open());
    expect(result.current.triggerProps["aria-expanded"]).toBe(true);
  });

  it("calls onOpenChange when state changes", () => {
    const onOpenChange = vi.fn();
    const { result } = renderHook(() => useMenu({ onOpenChange }));
    act(() => result.current.open());
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("controlled: isOpen reflects open prop", () => {
    const { result } = renderHook(() => useMenu({ open: false }));
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(false);
  });
});
