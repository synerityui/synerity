import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useCombobox } from "../hooks/useCombobox";

const OPTIONS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte", disabled: true },
];

describe("useCombobox", () => {
  it("starts closed with all options available", () => {
    const { result } = renderHook(() => useCombobox({ options: OPTIONS }));
    expect(result.current.isOpen).toBe(false);
    expect(result.current.filteredOptions).toHaveLength(3);
  });

  it("inputProps has role=combobox", () => {
    const { result } = renderHook(() => useCombobox({ options: OPTIONS }));
    expect(result.current.inputProps.role).toBe("combobox");
  });

  it("listboxProps has role=listbox", () => {
    const { result } = renderHook(() => useCombobox({ options: OPTIONS }));
    expect(result.current.listboxProps.role).toBe("listbox");
  });

  it("opens on focus", () => {
    const { result } = renderHook(() => useCombobox({ options: OPTIONS }));
    act(() => {
      result.current.inputProps.onFocus?.({} as React.FocusEvent<HTMLInputElement>);
    });
    expect(result.current.isOpen).toBe(true);
  });

  it("filters options when input value changes", () => {
    const { result } = renderHook(() => useCombobox({ options: OPTIONS }));
    act(() => {
      result.current.inputProps.onChange?.({
        target: { value: "vue" },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.filteredOptions).toHaveLength(1);
    expect(result.current.filteredOptions[0].value).toBe("vue");
  });

  it("clicking an option calls onChange with the value", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useCombobox({ options: OPTIONS, onChange }));
    act(() => {
      result.current.inputProps.onFocus?.({} as React.FocusEvent<HTMLInputElement>);
    });
    act(() => {
      result.current.getOptionProps(OPTIONS[0]).onClick?.({} as React.MouseEvent<HTMLElement>);
    });
    expect(onChange).toHaveBeenCalledWith("react");
  });

  it("state.isDisabled reflects disabled=true", () => {
    const { result } = renderHook(() => useCombobox({ options: OPTIONS, disabled: true }));
    expect(result.current.state.isDisabled).toBe(true);
  });

  it("inputProps.disabled is true when disabled=true", () => {
    const { result } = renderHook(() => useCombobox({ options: OPTIONS, disabled: true }));
    expect(result.current.inputProps.disabled).toBe(true);
  });
});

import type React from "react";
