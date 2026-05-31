import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";

import { useTextarea } from "../hooks/useTextarea";

describe("useTextarea", () => {
  it("textareaProps has correct id", () => {
    const { result } = renderHook(() => useTextarea({ id: "my-textarea" }));
    expect(result.current.textareaProps.id).toBe("my-textarea");
  });

  it("labelProps.htmlFor matches textarea id", () => {
    const { result } = renderHook(() => useTextarea({ id: "ta" }));
    expect(result.current.labelProps.htmlFor).toBe("ta");
  });

  it("state.isDisabled reflects disabled=true", () => {
    const { result } = renderHook(() => useTextarea({ disabled: true }));
    expect(result.current.state.isDisabled).toBe(true);
  });

  it("state.isReadOnly reflects readOnly=true", () => {
    const { result } = renderHook(() => useTextarea({ readOnly: true }));
    expect(result.current.state.isReadOnly).toBe(true);
  });

  it("state.isInvalid reflects invalid=true", () => {
    const { result } = renderHook(() => useTextarea({ invalid: true }));
    expect(result.current.state.isInvalid).toBe(true);
  });

  it("state.isRequired reflects required=true", () => {
    const { result } = renderHook(() => useTextarea({ required: true }));
    expect(result.current.state.isRequired).toBe(true);
  });

  it("textareaProps.aria-invalid is set when invalid=true", () => {
    const { result } = renderHook(() => useTextarea({ invalid: true }));
    expect(result.current.textareaProps["aria-invalid"]).toBe(true);
  });

  it("errorProps has role=alert", () => {
    const { result } = renderHook(() => useTextarea());
    expect(result.current.errorProps.role).toBe("alert");
  });

  it("returns a ref object", () => {
    const { result } = renderHook(() => useTextarea());
    expect(result.current.ref).toBeDefined();
    expect(typeof result.current.ref).toBe("object");
  });
});
