import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useToggleGroup } from "../hooks/useToggleGroup";

describe("useToggleGroup — single", () => {
  it("starts with no selection", () => {
    const { result } = renderHook(() => useToggleGroup({ type: "single" }));
    expect(result.current.isSelected("a")).toBe(false);
  });

  it("respects defaultValue", () => {
    const { result } = renderHook(() => useToggleGroup({ type: "single", defaultValue: "b" }));
    expect(result.current.isSelected("b")).toBe(true);
    expect(result.current.isSelected("a")).toBe(false);
  });

  it("selects item on click", () => {
    const { result } = renderHook(() => useToggleGroup({ type: "single" }));
    act(() => { result.current.getItemProps("a").onClick?.({} as React.MouseEvent<HTMLButtonElement>); });
    expect(result.current.isSelected("a")).toBe(true);
  });

  it("deselects same item on second click", () => {
    const { result } = renderHook(() => useToggleGroup({ type: "single", defaultValue: "a" }));
    act(() => { result.current.getItemProps("a").onClick?.({} as React.MouseEvent<HTMLButtonElement>); });
    expect(result.current.isSelected("a")).toBe(false);
  });

  it("calls onChange when selection changes", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useToggleGroup({ type: "single", onChange }));
    act(() => { result.current.getItemProps("x").onClick?.({} as React.MouseEvent<HTMLButtonElement>); });
    expect(onChange).toHaveBeenCalledWith("x");
  });

  it("groupProps has role=group", () => {
    const { result } = renderHook(() => useToggleGroup({ type: "single" }));
    expect(result.current.groupProps.role).toBe("group");
  });
});

describe("useToggleGroup — multiple", () => {
  it("can select multiple items", () => {
    const { result } = renderHook(() => useToggleGroup({ type: "multiple" }));
    act(() => { result.current.getItemProps("a").onClick?.({} as React.MouseEvent<HTMLButtonElement>); });
    act(() => { result.current.getItemProps("b").onClick?.({} as React.MouseEvent<HTMLButtonElement>); });
    expect(result.current.isSelected("a")).toBe(true);
    expect(result.current.isSelected("b")).toBe(true);
  });

  it("deselects an already-selected item", () => {
    const { result } = renderHook(() => useToggleGroup({ type: "multiple", defaultValue: ["a", "b"] }));
    act(() => { result.current.getItemProps("a").onClick?.({} as React.MouseEvent<HTMLButtonElement>); });
    expect(result.current.isSelected("a")).toBe(false);
    expect(result.current.isSelected("b")).toBe(true);
  });

  it("disabled group prevents any selection", () => {
    const { result } = renderHook(() => useToggleGroup({ type: "multiple", disabled: true }));
    act(() => { result.current.getItemProps("a").onClick?.({} as React.MouseEvent<HTMLButtonElement>); });
    expect(result.current.isSelected("a")).toBe(false);
  });
});

import type React from "react";
