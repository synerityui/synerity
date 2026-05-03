import { describe, expect, it } from "vitest";
import { getByPath, parsePath, setByPath } from "../utils/path";

describe("parsePath", () => {
  it("splits a simple key", () => {
    expect(parsePath("email")).toEqual(["email"]);
  });

  it("splits dot notation", () => {
    expect(parsePath("address.street")).toEqual(["address", "street"]);
  });

  it("splits bracket notation", () => {
    expect(parsePath("tags[0]")).toEqual(["tags", "0"]);
  });

  it("splits mixed notation", () => {
    expect(parsePath("users[0].name")).toEqual(["users", "0", "name"]);
  });
});

describe("getByPath", () => {
  it("gets a top-level value", () => {
    expect(getByPath({ email: "a@b.com" }, "email")).toBe("a@b.com");
  });

  it("gets a nested value", () => {
    expect(getByPath({ address: { street: "Main St" } }, "address.street")).toBe("Main St");
  });

  it("gets an array element", () => {
    expect(getByPath({ tags: ["a", "b"] }, "tags[0]")).toBe("a");
  });

  it("returns undefined for missing key", () => {
    expect(getByPath({ a: 1 }, "b")).toBeUndefined();
  });

  it("returns undefined when traversing null", () => {
    expect(getByPath({ a: null } as Record<string, unknown>, "a.b")).toBeUndefined();
  });

  it("returns undefined for deeply missing path", () => {
    expect(getByPath({}, "a.b.c")).toBeUndefined();
  });
});

describe("setByPath", () => {
  it("sets a top-level value", () => {
    expect(setByPath({ email: "old" }, "email", "new")).toEqual({ email: "new" });
  });

  it("sets a nested value", () => {
    const result = setByPath({ address: { street: "Old" } }, "address.street", "New");
    expect(result).toEqual({ address: { street: "New" } });
  });

  it("creates missing intermediate objects", () => {
    const result = setByPath({}, "address.street", "Main St");
    expect(result).toEqual({ address: { street: "Main St" } });
  });

  it("sets an array element", () => {
    const result = setByPath({ tags: ["a", "b"] }, "tags[0]", "x");
    expect(result).toEqual({ tags: ["x", "b"] });
  });

  it("does not mutate the original object", () => {
    const original = { a: { b: 1 } };
    const result = setByPath(original, "a.b", 2);
    expect(original.a.b).toBe(1);
    expect((result.a as { b: number }).b).toBe(2);
  });

  it("sets a deeply nested value", () => {
    const result = setByPath({}, "users[0].address.city", "NYC");
    expect(getByPath(result, "users[0].address.city")).toBe("NYC");
  });
});
