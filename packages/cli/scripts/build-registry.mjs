#!/usr/bin/env node
/**
 * Pre-build codegen step.
 * Reads component source files from @synerity/ui and emits
 * src/registry/generated.ts with file content embedded as strings.
 * Run automatically by `pnpm build`.
 */

import { readFileSync, readdirSync, writeFileSync, existsSync } from "fs";
import { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const UI_COMPONENTS = resolve(__dirname, "../../ui/src/components");
const OUT_FILE = resolve(__dirname, "../src/registry/generated.ts");

// ── Component metadata ────────────────────────────────────────────────────────
// Defines npm deps and inter-component dependencies for each component.
// Keys must match the lowercase directory name under packages/ui/src/components/.

const COMPONENT_META = {
  accordion: {
    description: "Expandable content sections with full keyboard navigation.",
    npmDependencies: ["@synerity/headless", "@synerity/tokens", "clsx"],
    componentDependencies: [],
  },
  alert: {
    description: "Contextual feedback messages — info, success, warning, error.",
    npmDependencies: ["@synerity/tokens", "clsx"],
    componentDependencies: [],
  },
  avatar: {
    description: "User avatar with image and initials fallback.",
    npmDependencies: ["@synerity/tokens", "clsx"],
    componentDependencies: [],
  },
  badge: {
    description: "Small status label — solid, subtle, and outline variants.",
    npmDependencies: ["@synerity/tokens", "clsx"],
    componentDependencies: [],
  },
  button: {
    description: "Interactive trigger — solid, outline, ghost, and link variants.",
    npmDependencies: ["@synerity/headless", "@synerity/tokens", "clsx"],
    componentDependencies: [],
  },
  card: {
    description: "Contained surface with header, body, and footer slots.",
    npmDependencies: ["@synerity/tokens", "clsx"],
    componentDependencies: [],
  },
  checkbox: {
    description: "Accessible checkbox with indeterminate state support.",
    npmDependencies: ["@synerity/headless", "@synerity/tokens", "clsx"],
    componentDependencies: [],
  },
  group: {
    description: "Horizontal flex container for inline element grouping.",
    npmDependencies: ["@synerity/tokens", "clsx"],
    componentDependencies: [],
  },
  heading: {
    description: "Typographic heading — maps h1–h6 via a level prop.",
    npmDependencies: ["@synerity/tokens", "clsx"],
    componentDependencies: [],
  },
  input: {
    description: "Text input with label, error, and hint ARIA wiring.",
    npmDependencies: ["@synerity/headless", "@synerity/tokens", "clsx"],
    componentDependencies: [],
  },
  modal: {
    description: "Focus-trapped dialog overlay with scroll lock.",
    npmDependencies: ["@synerity/headless", "@synerity/tokens", "clsx"],
    componentDependencies: [],
  },
  spinner: {
    description: "Animated loading indicator.",
    npmDependencies: ["@synerity/tokens", "clsx"],
    componentDependencies: [],
  },
  stack: {
    description: "Vertical flex container with configurable gap.",
    npmDependencies: ["@synerity/tokens", "clsx"],
    componentDependencies: [],
  },
  switch: {
    description: "Toggle switch with accessible role=switch semantics.",
    npmDependencies: ["@synerity/headless", "@synerity/tokens", "clsx"],
    componentDependencies: [],
  },
  tabs: {
    description: "Tabbed interface with keyboard navigation and roving tabindex.",
    npmDependencies: ["@synerity/headless", "@synerity/tokens", "clsx"],
    componentDependencies: [],
  },
  text: {
    description: "Polymorphic text element with size, weight, and colour props.",
    npmDependencies: ["@synerity/tokens", "clsx"],
    componentDependencies: [],
  },
  textarea: {
    description: "Multi-line text input with optional auto-resize.",
    npmDependencies: ["@synerity/headless", "@synerity/tokens", "clsx"],
    componentDependencies: [],
  },
  tooltip: {
    description: "Hover/focus tooltip with placement and delay support.",
    npmDependencies: ["@synerity/headless", "@synerity/tokens", "clsx"],
    componentDependencies: [],
  },
};

// ── File reading ──────────────────────────────────────────────────────────────

function readComponentDir(dirName) {
  const dir = join(UI_COMPONENTS, dirName);
  if (!existsSync(dir)) return [];

  return readdirSync(dir)
    .filter((f) => f.endsWith(".tsx") || f.endsWith(".module.css") || f.endsWith(".ts"))
    .filter((f) => !f.endsWith(".test.tsx") && !f.endsWith(".test.ts"))
    .map((f) => ({
      path: `${dirName}/${f}`,
      content: readFileSync(join(dir, f), "utf8"),
    }));
}

// ── Code generation ───────────────────────────────────────────────────────────

const entries = [];

for (const [key, meta] of Object.entries(COMPONENT_META)) {
  // Find the matching directory (case-insensitive)
  const dirName = readdirSync(UI_COMPONENTS).find(
    (d) => d.toLowerCase() === key,
  );

  if (!dirName) {
    console.warn(`⚠  No component directory found for "${key}" — skipping.`);
    continue;
  }

  const files = readComponentDir(dirName);
  if (files.length === 0) {
    console.warn(`⚠  No source files found for "${key}" — skipping.`);
    continue;
  }

  entries.push({ key, meta, files });
  console.log(`✓  ${dirName} (${files.length} file${files.length === 1 ? "" : "s"})`);
}

// Build the TypeScript source.
// JSON.stringify handles all escaping cleanly.
const lines = [
  `// AUTO-GENERATED by scripts/build-registry.js — do not edit by hand.`,
  `import type { Registry } from "./types";`,
  ``,
  `export const registry: Registry = {`,
];

for (const { key, meta, files } of entries) {
  lines.push(`  ${JSON.stringify(key)}: {`);
  lines.push(`    description: ${JSON.stringify(meta.description)},`);
  lines.push(`    npmDependencies: ${JSON.stringify(meta.npmDependencies)},`);
  lines.push(`    componentDependencies: ${JSON.stringify(meta.componentDependencies)},`);
  lines.push(`    files: [`);
  for (const file of files) {
    lines.push(`      { path: ${JSON.stringify(file.path)}, content: ${JSON.stringify(file.content)} },`);
  }
  lines.push(`    ],`);
  lines.push(`  },`);
}

lines.push(`};`);
lines.push(``);

writeFileSync(OUT_FILE, lines.join("\n"), "utf8");
console.log(`\n→ Written ${OUT_FILE}`);
