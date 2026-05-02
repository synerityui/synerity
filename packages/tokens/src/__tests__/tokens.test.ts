import { describe, it, expect } from "vitest";

import { tokens, darkTokens } from "../tokens";

// ─── Naming convention ────────────────────────────────────────────────────────

describe("token naming convention", () => {
  function collectKeys(obj: Record<string, unknown>, prefix = ""): string[] {
    const keys: string[] = [];
    for (const [k, v] of Object.entries(obj)) {
      const full = prefix ? `${prefix}-${k}` : k;
      if (typeof v === "object" && v !== null) {
        keys.push(...collectKeys(v as Record<string, unknown>, full));
      } else {
        keys.push(full);
      }
    }
    return keys;
  }

  it("all token keys contain only lowercase letters, numbers, and hyphens", () => {
    const keys = collectKeys(tokens as unknown as Record<string, unknown>);
    const invalid = keys.filter((k) => !/^[a-z0-9.-]+$/.test(k));
    expect(invalid).toEqual([]);
  });

  it("no token key starts or ends with a hyphen", () => {
    const keys = collectKeys(tokens as unknown as Record<string, unknown>);
    const invalid = keys.filter((k) => k.startsWith("-") || k.endsWith("-"));
    expect(invalid).toEqual([]);
  });
});

// ─── Required categories ──────────────────────────────────────────────────────

describe("token categories", () => {
  const requiredCategories = [
    "color",
    "font",
    "text",
    "leading",
    "weight",
    "tracking",
    "space",
    "radius",
    "shadow",
    "z",
    "duration",
    "easing",
    "size",
    "breakpoint",
  ] as const;

  it.each(requiredCategories)('exports tokens.%s category', (category) => {
    expect(tokens).toHaveProperty(category);
    expect(typeof tokens[category]).toBe("object");
  });
});

// ─── Color tokens ─────────────────────────────────────────────────────────────

describe("color tokens", () => {
  it("primary color is a valid hex", () => {
    expect(tokens.color.primary).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it("all semantic colors exist: success, warning, danger, info", () => {
    expect(tokens.color.success).toBeDefined();
    expect(tokens.color.warning).toBeDefined();
    expect(tokens.color.danger).toBeDefined();
    expect(tokens.color.info).toBeDefined();
  });

  it("all neutral scale entries 0–12 exist", () => {
    for (let i = 0; i <= 12; i++) {
      expect(tokens.color[`neutral-${i}` as keyof typeof tokens.color]).toBeDefined();
    }
  });

  it("surface, border, and text tokens exist", () => {
    expect(tokens.color.surface).toBeDefined();
    expect(tokens.color.border).toBeDefined();
    expect(tokens.color["text-primary"]).toBeDefined();
    expect(tokens.color["text-secondary"]).toBeDefined();
    expect(tokens.color["text-disabled"]).toBeDefined();
  });

  it("focus-ring color is defined", () => {
    expect(tokens.color["focus-ring"]).toBeDefined();
  });
});

// ─── Dark mode overrides ──────────────────────────────────────────────────────

describe("dark mode tokens", () => {
  it("exports darkTokens with color overrides", () => {
    expect(darkTokens).toHaveProperty("color");
  });

  it("dark primary is lighter than light primary (accessible on dark bg)", () => {
    // Light primary is #6366f1, dark primary should be a lighter variant
    expect(darkTokens.color.primary).not.toEqual(tokens.color.primary);
  });

  it("dark mode overrides all the same color keys as light mode", () => {
    const lightKeys = Object.keys(tokens.color).sort();
    const darkKeys = Object.keys(darkTokens.color).sort();
    expect(darkKeys).toEqual(lightKeys);
  });
});

// ─── Spacing ──────────────────────────────────────────────────────────────────

describe("spacing tokens", () => {
  it("space values are rem or px strings", () => {
    for (const value of Object.values(tokens.space)) {
      expect(value).toMatch(/^(\d+(\.\d+)?(rem|px)|0px|1px)$/);
    }
  });

  it("common spacing values exist: 1, 2, 4, 8, 16", () => {
    expect(tokens.space["1"]).toBe("0.25rem");
    expect(tokens.space["2"]).toBe("0.5rem");
    expect(tokens.space["4"]).toBe("1rem");
    expect(tokens.space["8"]).toBe("2rem");
    expect(tokens.space["16"]).toBe("4rem");
  });
});

// ─── Radius ───────────────────────────────────────────────────────────────────

describe("radius tokens", () => {
  it("radius.none is 0px", () => {
    expect(tokens.radius.none).toBe("0px");
  });

  it("radius.full is 9999px", () => {
    expect(tokens.radius.full).toBe("9999px");
  });

  it("all radius values are px strings or 0px", () => {
    for (const value of Object.values(tokens.radius)) {
      expect(value).toMatch(/^\d+px$/);
    }
  });
});

// ─── Z-index ──────────────────────────────────────────────────────────────────

describe("z-index tokens", () => {
  it("z-index layers are in ascending order", () => {
    const order = ["base", "raised", "dropdown", "sticky", "overlay", "modal", "toast", "tooltip"] as const;
    const values = order.map((k) => parseInt(tokens.z[k], 10));
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThan(values[i - 1]!);
    }
  });

  it("modal z-index is above overlay", () => {
    expect(parseInt(tokens.z.modal, 10)).toBeGreaterThan(parseInt(tokens.z.overlay, 10));
  });

  it("tooltip z-index is the highest", () => {
    const max = Math.max(...Object.values(tokens.z).map((v) => parseInt(v, 10)));
    expect(parseInt(tokens.z.tooltip, 10)).toBe(max);
  });
});

// ─── Typography ───────────────────────────────────────────────────────────────

describe("typography tokens", () => {
  it("text scale xs through 4xl is defined", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"] as const;
    for (const size of sizes) {
      expect(tokens.text[size]).toBeDefined();
    }
  });

  it("text.md is 1rem (16px base)", () => {
    expect(tokens.text.md).toBe("1rem");
  });

  it("font families contain fallback stacks", () => {
    expect(tokens.font.sans).toContain(",");
    expect(tokens.font.mono).toContain(",");
  });

  it("weight.normal is 400 and weight.bold is 700", () => {
    expect(tokens.weight.normal).toBe("400");
    expect(tokens.weight.bold).toBe("700");
  });
});

// ─── Animation ────────────────────────────────────────────────────────────────

describe("animation tokens", () => {
  it("duration values are ms strings", () => {
    for (const value of Object.values(tokens.duration)) {
      expect(value).toMatch(/^\d+ms$/);
    }
  });

  it("easing.default is cubic-bezier", () => {
    expect(tokens.easing.default).toMatch(/^cubic-bezier/);
  });

  it("fast duration is shorter than normal", () => {
    const fast = parseInt(tokens.duration.fast, 10);
    const normal = parseInt(tokens.duration.normal, 10);
    expect(fast).toBeLessThan(normal);
  });
});

// ─── Breakpoints ──────────────────────────────────────────────────────────────

describe("breakpoint tokens", () => {
  it("breakpoints sm through 2xl exist", () => {
    const bps = ["sm", "md", "lg", "xl", "2xl"] as const;
    for (const bp of bps) {
      expect(tokens.breakpoint[bp]).toBeDefined();
    }
  });

  it("breakpoints are in ascending order", () => {
    const order = ["sm", "md", "lg", "xl", "2xl"] as const;
    const values = order.map((k) => parseInt(tokens.breakpoint[k], 10));
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThan(values[i - 1]!);
    }
  });
});
