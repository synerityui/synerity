import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useRadioGroup } from "../hooks/useRadioGroup";

describe("useRadioGroup", () => {
  it("starts with no selection by default", () => {
    const { result } = renderHook(() => useRadioGroup());
    expect(result.current.state.value).toBeUndefined();
  });

  it("respects defaultValue", () => {
    const { result } = renderHook(() => useRadioGroup({ defaultValue: "b" }));
    expect(result.current.state.value).toBe("b");
  });

  it("groupProps has role=radiogroup", () => {
    const { result } = renderHook(() => useRadioGroup());
    expect(result.current.groupProps.role).toBe("radiogroup");
  });

  it("getRadioProps returns type=radio", () => {
    const { result } = renderHook(() => useRadioGroup());
    const props = result.current.getRadioProps("a");
    expect(props.type).toBe("radio");
  });

  it("getRadioProps marks selected item as checked", () => {
    const { result } = renderHook(() => useRadioGroup({ defaultValue: "a" }));
    const propsA = result.current.getRadioProps("a");
    const propsB = result.current.getRadioProps("b");
    expect(propsA.checked).toBe(true);
    expect(propsB.checked).toBe(false);
  });

  it("calling onChange via getRadioProps updates state", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useRadioGroup({ onChange }));
    act(() => {
      result.current.getRadioProps("c").onChange?.({
        target: { value: "c" },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(onChange).toHaveBeenCalledWith("c");
  });

  it("disabled group makes all radio props disabled", () => {
    const { result } = renderHook(() => useRadioGroup({ disabled: true }));
    const props = result.current.getRadioProps("a");
    expect(props.disabled).toBe(true);
  });
});

import type React from "react";
