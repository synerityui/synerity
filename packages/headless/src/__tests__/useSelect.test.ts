import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useSelect } from "../hooks/useSelect";

const OPTIONS = [
  { value: "a", label: "Apple" },
  { value: "b", label: "Banana" },
  { value: "c", label: "Cherry", disabled: true },
];

describe("useSelect", () => {
  it("starts closed with no selection", () => {
    const { result } = renderHook(() => useSelect({ options: OPTIONS }));
    expect(result.current.isOpen).toBe(false);
    expect(result.current.selectedOption).toBeUndefined();
  });

  it("respects defaultValue", () => {
    const { result } = renderHook(() => useSelect({ options: OPTIONS, defaultValue: "b" }));
    expect(result.current.selectedOption?.value).toBe("b");
  });

  it("triggerProps has role=combobox", () => {
    const { result } = renderHook(() => useSelect({ options: OPTIONS }));
    expect(result.current.triggerProps.role).toBe("combobox");
  });

  it("listboxProps has role=listbox", () => {
    const { result } = renderHook(() => useSelect({ options: OPTIONS }));
    expect(result.current.listboxProps.role).toBe("listbox");
  });

  it("state.isDisabled reflects disabled prop", () => {
    const { result } = renderHook(() => useSelect({ options: OPTIONS, disabled: true }));
    expect(result.current.state.isDisabled).toBe(true);
  });

  it("getOptionProps returns aria-selected=true for selected option", () => {
    const { result } = renderHook(() => useSelect({ options: OPTIONS, defaultValue: "a" }));
    const optionProps = result.current.getOptionProps(OPTIONS[0]!);
    expect(optionProps["aria-selected"]).toBe(true);
  });

  it("selecting an option calls onChange", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useSelect({ options: OPTIONS, onChange, open: true, onOpenChange: vi.fn() }));
    act(() => {
      result.current.getOptionProps(OPTIONS[1]!).onClick?.({} as React.MouseEvent<HTMLElement>);
    });
    expect(onChange).toHaveBeenCalledWith("b");
  });
});

import type React from "react";
