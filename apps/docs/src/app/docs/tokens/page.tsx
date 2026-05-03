import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = { title: "Design tokens" };

const TOKEN_GROUPS = [
  {
    label: "Color — Brand",
    tokens: [
      { name: "--synerity-color-primary", desc: "Brand primary action color" },
      { name: "--synerity-color-primary-hover", desc: "Hovered primary" },
      { name: "--synerity-color-primary-active", desc: "Pressed primary" },
      { name: "--synerity-color-primary-subtle", desc: "Tinted background behind primary elements" },
      { name: "--synerity-color-text-on-primary", desc: "Text on primary background" },
    ],
  },
  {
    label: "Color — Surface",
    tokens: [
      { name: "--synerity-color-surface", desc: "Page background" },
      { name: "--synerity-color-surface-raised", desc: "Cards and raised panels" },
      { name: "--synerity-color-surface-overlay", desc: "Wells, inputs, sunken areas" },
    ],
  },
  {
    label: "Color — Border",
    tokens: [
      { name: "--synerity-color-border", desc: "Default stroke" },
      { name: "--synerity-color-border-strong", desc: "Emphasis stroke" },
      { name: "--synerity-color-border-focus", desc: "Focus ring color (primary)" },
      { name: "--synerity-color-focus-ring", desc: "Focus ring shadow (with alpha)" },
    ],
  },
  {
    label: "Color — Text",
    tokens: [
      { name: "--synerity-color-text-primary", desc: "Body text" },
      { name: "--synerity-color-text-secondary", desc: "Muted labels and captions" },
      { name: "--synerity-color-text-disabled", desc: "Disabled state text" },
    ],
  },
  {
    label: "Color — Semantic",
    tokens: [
      { name: "--synerity-color-success", desc: "Positive outcomes" },
      { name: "--synerity-color-warning", desc: "Cautionary states" },
      { name: "--synerity-color-danger", desc: "Destructive or error states" },
      { name: "--synerity-color-info", desc: "Informational states" },
    ],
  },
  {
    label: "Typography",
    tokens: [
      { name: "--synerity-font-sans", desc: "Primary sans-serif stack" },
      { name: "--synerity-font-mono", desc: "Monospace stack (code, tokens, metadata)" },
    ],
  },
  {
    label: "Spacing",
    tokens: [
      { name: "--synerity-space-1", desc: "4px" },
      { name: "--synerity-space-2", desc: "8px" },
      { name: "--synerity-space-3", desc: "12px" },
      { name: "--synerity-space-4", desc: "16px" },
      { name: "--synerity-space-6", desc: "24px" },
      { name: "--synerity-space-8", desc: "32px" },
    ],
  },
  {
    label: "Radius",
    tokens: [
      { name: "--synerity-radius-sm", desc: "4px — tight inputs and badges" },
      { name: "--synerity-radius-md", desc: "6px — default controls" },
      { name: "--synerity-radius-lg", desc: "8px — cards, dropdowns" },
      { name: "--synerity-radius-xl", desc: "12px — modals, popovers" },
      { name: "--synerity-radius-full", desc: "9999px — pills, avatars" },
    ],
  },
  {
    label: "Shadow",
    tokens: [
      { name: "--synerity-shadow-sm", desc: "Subtle card lift" },
      { name: "--synerity-shadow-md", desc: "Dropdown elevation" },
      { name: "--synerity-shadow-lg", desc: "Modal / popover lift" },
      { name: "--synerity-shadow-xl", desc: "Floating panel" },
    ],
  },
];

export default function TokensPage() {
  return (
    <>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
          Foundation
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 12 }}>Design tokens</h1>
        <p style={{ fontSize: 16, color: "var(--syn-text-muted)", lineHeight: 1.65 }}>
          All visual decisions live in CSS custom properties under the{" "}
          <code style={{ fontFamily: "var(--syn-font-mono)", fontSize: 14, color: "var(--syn-primary)" }}>--synerity-*</code>{" "}
          namespace. Override any token to re-skin the entire library without touching component code.
        </p>
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 16 }}>Importing tokens</h2>
      <CodeBlock lang="ts" code={`// In your root layout or entry point:
import '@synerity/tokens/css'

// Or with a <link> tag in plain HTML:
// <link rel="stylesheet" href="node_modules/@synerity/tokens/dist/tokens.css" />`} />

      <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", margin: "40px 0 16px" }}>Overriding tokens</h2>
      <CodeBlock lang="css" code={`:root {
  /* Change the primary color to indigo */
  --synerity-color-primary:        #6366f1;
  --synerity-color-primary-hover:  #4f46e5;
  --synerity-color-primary-active: #4338ca;
  --synerity-color-primary-subtle: #eef2ff;

  /* Change the default font */
  --synerity-font-sans: 'Outfit', system-ui, sans-serif;

  /* Rounder corners everywhere */
  --synerity-radius-md: 10px;
  --synerity-radius-lg: 14px;
}`} />

      <p style={{ color: "var(--syn-text-muted)", lineHeight: 1.7, margin: "16px 0 40px" }}>
        Dark mode is handled automatically — all tokens redefine under{" "}
        <code style={{ fontFamily: "var(--syn-font-mono)", fontSize: 13 }}>[data-theme="dark"]</code>.
        Set that attribute on <code style={{ fontFamily: "var(--syn-font-mono)", fontSize: 13 }}>{"<html>"}</code> to switch modes.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 24 }}>Token reference</h2>
      {TOKEN_GROUPS.map((group) => (
        <div key={group.label} style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, fontFamily: "var(--syn-font-mono)", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--syn-text-muted)", marginBottom: 8 }}>
            {group.label}
          </h3>
          <div style={{ border: "1px solid var(--syn-border)", borderRadius: "var(--syn-radius-lg)", overflow: "hidden" }}>
            {group.tokens.map((t, i) => (
              <div key={t.name} style={{
                display: "grid", gridTemplateColumns: "1fr auto",
                alignItems: "center", gap: 24,
                padding: "10px 16px",
                borderBottom: i < group.tokens.length - 1 ? "1px solid var(--syn-border)" : "none",
                background: "var(--syn-bg-raised)",
              }}>
                <div>
                  <code style={{ fontFamily: "var(--syn-font-mono)", fontSize: 12, color: "var(--syn-primary)" }}>{t.name}</code>
                  <div style={{ fontSize: 12, color: "var(--syn-text-muted)", marginTop: 2 }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
