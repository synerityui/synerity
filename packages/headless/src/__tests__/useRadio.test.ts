import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";

import { useRadio } from "../hooks/useRadio";

describe("useRadio", () => {
  it("radioProps has type=radio", () => {
    const { result } = renderHook(() => useRadio({ value: "option-a" }));
    expect(result.current.radioProps.type).toBe("radio");
  });

  it("radioProps.value matches the provided value", () => {
    const { result } = renderHook(() => useRadio({ value: "option-b" }));
    expect(result.current.radioProps.value).toBe("option-b");
  });

  it("radioProps.disabled is false by default", () => {
    const { result } = renderHook(() => useRadio({ value: "x" }));
    expect(result.current.radioProps.disabled).toBe(false);
  });

  it("radioProps.disabled is true when disabled=true", () => {
    const { result } = renderHook(() => useRadio({ value: "x", disabled: true }));
    expect(result.current.radioProps.disabled).toBe(true);
  });

  it("radioProps.name matches the provided name", () => {
    const { result } = renderHook(() => useRadio({ value: "x", name: "color" }));
    expect(result.current.radioProps.name).toBe("color");
  });
});
