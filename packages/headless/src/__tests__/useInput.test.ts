import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";

import { useInput } from "../hooks/useInput";

describe("useInput", () => {
  it("generates stable id", () => {
    const { result } = renderHook(() => useInput());
    expect(result.current.inputProps.id).toBeDefined();
    expect(typeof result.current.inputProps.id).toBe("string");
  });

  it("uses provided id", () => {
    const { result } = renderHook(() => useInput({ id: "my-email" }));
    expect(result.current.inputProps.id).toBe("my-email");
    expect(result.current.labelProps.htmlFor).toBe("my-email");
  });

  it("sets aria-invalid when invalid=true", () => {
    const { result } = renderHook(() => useInput({ invalid: true }));
    expect(result.current.inputProps["aria-invalid"]).toBe(true);
  });

  it("sets aria-required when required=true", () => {
    const { result } = renderHook(() => useInput({ required: true }));
    expect(result.current.inputProps["aria-required"]).toBe(true);
  });

  it("links error via aria-describedby when invalid", () => {
    const { result } = renderHook(() => useInput({ id: "test", invalid: true }));
    expect(result.current.inputProps["aria-describedby"]).toContain("test-error");
  });

  it("always links hint via aria-describedby", () => {
    const { result } = renderHook(() => useInput({ id: "test" }));
    expect(result.current.inputProps["aria-describedby"]).toContain("test-hint");
  });

  it("errorProps has role=alert", () => {
    const { result } = renderHook(() => useInput());
    expect(result.current.errorProps.role).toBe("alert");
  });

  it("labelProps.htmlFor matches inputProps.id", () => {
    const { result } = renderHook(() => useInput({ id: "email" }));
    expect(result.current.labelProps.htmlFor).toBe(result.current.inputProps.id);
  });

  it("state reflects disabled/invalid/readOnly/required", () => {
    const { result } = renderHook(() => useInput({ disabled: true, invalid: true, readOnly: true, required: true }));
    expect(result.current.state.isDisabled).toBe(true);
    expect(result.current.state.isInvalid).toBe(true);
    expect(result.current.state.isReadOnly).toBe(true);
    expect(result.current.state.isRequired).toBe(true);
  });
});
