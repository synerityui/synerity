import { describe, expect, it } from "vitest";
import { z } from "zod";
import { zodResolver } from "../resolvers/zodResolver";

const schema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().min(2, "Too short"),
  age: z.number().min(0, "Must be non-negative"),
});

describe("zodResolver", () => {
  it("returns empty errors for valid data", async () => {
    const resolver = zodResolver(schema);
    const result = await resolver({ email: "a@b.com", name: "Alice", age: 30 });
    expect(result.errors).toEqual({});
  });

  it("maps Zod issues to field paths", async () => {
    const resolver = zodResolver(schema);
    const result = await resolver({ email: "not-an-email", name: "A", age: 30 });
    expect(result.errors["email"]).toBe("Invalid email");
    expect(result.errors["name"]).toBe("Too short");
  });

  it("keeps only the first error per field", async () => {
    const multiErrorSchema = z.object({
      password: z
        .string()
        .min(8, "Too short")
        .regex(/[A-Z]/, "Needs uppercase"),
    });
    const resolver = zodResolver(multiErrorSchema);
    const result = await resolver({ password: "abc" });
    // Only the first Zod issue for the field is kept
    expect(Object.keys(result.errors).length).toBe(1);
    expect(result.errors["password"]).toBeTruthy();
  });

  it("handles nested object paths", async () => {
    const nestedSchema = z.object({
      address: z.object({
        street: z.string().min(1, "Required"),
      }),
    });
    const resolver = zodResolver(nestedSchema);
    const result = await resolver({ address: { street: "" } });
    expect(result.errors["address.street"]).toBe("Required");
  });

  it("handles array element paths", async () => {
    const arraySchema = z.object({
      tags: z.array(z.string().min(1, "Tag cannot be empty")),
    });
    const resolver = zodResolver(arraySchema);
    const result = await resolver({ tags: ["valid", ""] });
    expect(result.errors["tags[1]"]).toBe("Tag cannot be empty");
  });
});
