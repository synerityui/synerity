import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";

import { useButton } from "../hooks/useButton";

describe("useButton", () => {
  it("returns type=button by default", () => {
    const { result } = renderHook(() => useButton());
    expect(result.current.buttonProps.type).toBe("button");
  });

  it("sets disabled when disabled=true", () => {
    const { result } = renderHook(() => useButton({ disabled: true }));
    expect(result.current.buttonProps.disabled).toBe(true);
    expect(result.current.isDisabled).toBe(true);
  });

  it("sets aria-busy when loading=true", () => {
    const { result } = renderHook(() => useButton({ loading: true }));
    expect(result.current.buttonProps["aria-busy"]).toBe(true);
    expect(result.current.isDisabled).toBe(true);
  });

  it("calls onClick when not disabled", () => {
    const onClick = vi.fn();
    const { result } = renderHook(() => useButton({ onClick }));
    const event = { preventDefault: vi.fn() } as unknown as React.MouseEvent<HTMLButtonElement>;
    result.current.buttonProps.onClick?.(event);
    expect(onClick).toHaveBeenCalled();
  });

  it("does not call onClick when disabled", () => {
    const onClick = vi.fn();
    const { result } = renderHook(() => useButton({ disabled: true, onClick }));
    const event = { preventDefault: vi.fn() } as unknown as React.MouseEvent<HTMLButtonElement>;
    result.current.buttonProps.onClick?.(event);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("linkProps includes role=button when href provided", () => {
    const { result } = renderHook(() => useButton({ href: "https://example.com" }));
    expect(result.current.linkProps.role).toBe("button");
    expect(result.current.linkProps.href).toBe("https://example.com");
  });

  it("linkProps removes href when disabled", () => {
    const { result } = renderHook(() => useButton({ href: "https://example.com", disabled: true }));
    expect(result.current.linkProps.href).toBeUndefined();
  });
});

import type React from "react";
