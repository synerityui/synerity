import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useAccordion } from "../hooks/useAccordion";

describe("useAccordion — single", () => {
  it("all items start collapsed", () => {
    const { result } = renderHook(() => useAccordion({ type: "single" }));
    expect(result.current.getItemProps("a").isExpanded).toBe(false);
  });

  it("respects defaultValue", () => {
    const { result } = renderHook(() => useAccordion({ type: "single", defaultValue: "a" }));
    expect(result.current.getItemProps("a").isExpanded).toBe(true);
    expect(result.current.getItemProps("b").isExpanded).toBe(false);
  });

  it("clicking trigger expands item and collapses others", () => {
    const { result } = renderHook(() => useAccordion({ type: "single" }));
    act(() => result.current.getItemProps("a").triggerProps.onClick?.({} as React.MouseEvent<HTMLButtonElement>));
    expect(result.current.getItemProps("a").isExpanded).toBe(true);
    act(() => result.current.getItemProps("b").triggerProps.onClick?.({} as React.MouseEvent<HTMLButtonElement>));
    expect(result.current.getItemProps("b").isExpanded).toBe(true);
    expect(result.current.getItemProps("a").isExpanded).toBe(false);
  });

  it("clicking expanded item collapses it", () => {
    const { result } = renderHook(() => useAccordion({ type: "single", defaultValue: "a" }));
    act(() => result.current.getItemProps("a").triggerProps.onClick?.({} as React.MouseEvent<HTMLButtonElement>));
    expect(result.current.getItemProps("a").isExpanded).toBe(false);
  });

  it("triggerProps has aria-expanded and aria-controls", () => {
    const { result } = renderHook(() => useAccordion({ type: "single" }));
    const { triggerProps } = result.current.getItemProps("a");
    expect(triggerProps["aria-expanded"]).toBe(false);
    expect(triggerProps["aria-controls"]).toBeDefined();
  });

  it("panelProps has role=region and aria-labelledby", () => {
    const { result } = renderHook(() => useAccordion({ type: "single" }));
    const { panelProps, triggerProps } = result.current.getItemProps("a");
    expect(panelProps.role).toBe("region");
    expect(panelProps["aria-labelledby"]).toBe(triggerProps.id);
  });

  it("calls onChange", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useAccordion({ type: "single", onChange }));
    act(() => result.current.getItemProps("a").triggerProps.onClick?.({} as React.MouseEvent<HTMLButtonElement>));
    expect(onChange).toHaveBeenCalledWith("a");
  });
});

describe("useAccordion — multiple", () => {
  it("can expand multiple items simultaneously", () => {
    const { result } = renderHook(() => useAccordion({ type: "multiple" }));
    act(() => result.current.getItemProps("a").triggerProps.onClick?.({} as React.MouseEvent<HTMLButtonElement>));
    act(() => result.current.getItemProps("b").triggerProps.onClick?.({} as React.MouseEvent<HTMLButtonElement>));
    expect(result.current.getItemProps("a").isExpanded).toBe(true);
    expect(result.current.getItemProps("b").isExpanded).toBe(true);
  });
});

import type React from "react";
