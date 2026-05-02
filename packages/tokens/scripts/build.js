#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const { tokens, darkTokens } = require("../dist/tokens.js");

const distDir = path.resolve(__dirname, "../dist");

/**
 * Recursively flattens a nested token object into --synerity-{category}-{key}: value lines.
 * e.g. { color: { primary: "#6366f1" } } → "--synerity-color-primary: #6366f1;"
 */
function flattenTokens(obj, prefix = "") {
  const lines = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}-${key}` : key;
    if (typeof value === "object" && value !== null) {
      lines.push(...flattenTokens(value, fullKey));
    } else {
      lines.push(`  --synerity-${fullKey}: ${value};`);
    }
  }
  return lines;
}

// Light mode (all tokens under :root)
const lightLines = flattenTokens(tokens);

// Dark mode (only the overrides — currently just color)
const darkLines = flattenTokens(darkTokens);

let css = `:root {\n${lightLines.join("\n")}\n}\n`;

if (darkLines.length > 0) {
  css += `\n[data-theme="dark"] {\n${darkLines.join("\n")}\n}\n`;
  // Also support prefers-color-scheme for users who haven't set data-theme
  css += `\n@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n${darkLines.map((l) => "  " + l).join("\n")}\n  }\n}\n`;
}

fs.writeFileSync(path.join(distDir, "tokens.css"), css);

// Main index re-exports the compiled token objects
const indexJs = `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _tokens = require("./tokens.js");
exports.tokens = _tokens.tokens;
exports.darkTokens = _tokens.darkTokens;
`;
fs.writeFileSync(path.join(distDir, "index.js"), indexJs);

// Type declaration for the index entry
const indexDts = `export { tokens, darkTokens, Tokens, DarkTokens } from "./tokens.js";\n`;
const tokensDts = `export { tokens, darkTokens } from "./tokens.d.ts";\n`;
fs.writeFileSync(path.join(distDir, "index.d.ts"), indexDts);

const tokenCount = lightLines.length;
const darkCount = darkLines.length;
console.log(`@synerity/tokens built — ${tokenCount} light tokens, ${darkCount} dark overrides`);
