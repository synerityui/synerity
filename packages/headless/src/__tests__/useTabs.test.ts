import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useTabs } from "../hooks/useTabs";

describe("useTabs", () => {
  it("tablistProps has role=tablist", () => {
    const { result } = renderHook(() => useTabs());
    expect(result.current.tablistProps.role).toBe("tablist");
  });

  it("getTabProps returns role=tab", () => {
    const { result } = renderHook(() => useTabs({ defaultValue: "a" }));
    const props = result.current.getTabProps("a");
    expect(props.role).toBe("tab");
  });

  it("selected tab has aria-selected=true", () => {
    const { result } = renderHook(() => useTabs({ defaultValue: "a" }));
    expect(result.current.getTabProps("a")["aria-selected"]).toBe(true);
    expect(result.current.getTabProps("b")["aria-selected"]).toBe(false);
  });

  it("selected tab has tabIndex=0, others -1", () => {
    const { result } = renderHook(() => useTabs({ defaultValue: "a" }));
    expect(result.current.getTabProps("a").tabIndex).toBe(0);
    expect(result.current.getTabProps("b").tabIndex).toBe(-1);
  });

  it("clicking tab updates selected value", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useTabs({ defaultValue: "a", onChange }));
    act(() => {
      result.current.getTabProps("b").onClick?.({} as React.MouseEvent<HTMLButtonElement>);
    });
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("getTabPanelProps returns role=tabpanel", () => {
    const { result } = renderHook(() => useTabs({ defaultValue: "a" }));
    const props = result.current.getTabPanelProps("a");
    expect(props.role).toBe("tabpanel");
  });

  it("active panel is not hidden; inactive panels are hidden", () => {
    const { result } = renderHook(() => useTabs({ defaultValue: "a" }));
    expect(result.current.getTabPanelProps("a").hidden).toBe(false);
    expect(result.current.getTabPanelProps("b").hidden).toBe(true);
  });

  it("tab controls its panel via aria-controls/aria-labelledby", () => {
    const { result } = renderHook(() => useTabs({ defaultValue: "a" }));
    const tab = result.current.getTabProps("a");
    const panel = result.current.getTabPanelProps("a");
    expect(tab["aria-controls"]).toBe(panel.id);
    expect(panel["aria-labelledby"]).toBe(tab.id);
  });

  it("orientation defaults to horizontal", () => {
    const { result } = renderHook(() => useTabs());
    expect(result.current.tablistProps["aria-orientation"]).toBe("horizontal");
  });

  it("respects vertical orientation", () => {
    const { result } = renderHook(() => useTabs({ orientation: "vertical" }));
    expect(result.current.tablistProps["aria-orientation"]).toBe("vertical");
  });
});

import type React from "react";
