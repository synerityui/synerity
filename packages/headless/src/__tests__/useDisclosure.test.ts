import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useDisclosure } from "../hooks/useDisclosure";

describe("useDisclosure", () => {
  it("starts closed by default", () => {
    const { result } = renderHook(() => useDisclosure());
    expect(result.current.isOpen).toBe(false);
  });

  it("respects defaultOpen", () => {
    const { result } = renderHook(() => useDisclosure({ defaultOpen: true }));
    expect(result.current.isOpen).toBe(true);
  });

  it("open() sets isOpen to true", () => {
    const { result } = renderHook(() => useDisclosure());
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
  });

  it("close() sets isOpen to false", () => {
    const { result } = renderHook(() => useDisclosure({ defaultOpen: true }));
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });

  it("toggle() inverts state", () => {
    const { result } = renderHook(() => useDisclosure());
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(false);
  });

  it("calls onOpenChange when state changes", () => {
    const onOpenChange = vi.fn();
    const { result } = renderHook(() => useDisclosure({ onOpenChange }));
    act(() => result.current.open());
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("is controlled when open prop is provided", () => {
    const { result } = renderHook(() => useDisclosure({ open: false }));
    act(() => result.current.open());
    // Controlled — internal state doesn't change, caller must update the prop
    expect(result.current.isOpen).toBe(false);
  });

  it("getButtonProps returns aria-expanded", () => {
    const { result } = renderHook(() => useDisclosure({ defaultOpen: true }));
    const props = result.current.getButtonProps();
    expect(props["aria-expanded"]).toBe(true);
  });

  it("getPanelProps returns hidden when closed", () => {
    const { result } = renderHook(() => useDisclosure());
    const props = result.current.getPanelProps();
    expect(props.hidden).toBe(true);
  });
});
