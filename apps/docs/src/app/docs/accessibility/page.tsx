import type { Metadata } from "next";

export const metadata: Metadata = { title: "Accessibility" };

const KEYBOARD_PATTERNS = [
  { component: "Button", keys: "Enter, Space", action: "Activate" },
  { component: "Checkbox", keys: "Space", action: "Toggle checked state" },
  { component: "Switch", keys: "Space", action: "Toggle on/off" },
  { component: "Tabs", keys: "← → Arrow", action: "Move between tabs" },
  { component: "Tabs", keys: "Home / End", action: "Jump to first / last tab" },
  { component: "Accordion", keys: "Enter, Space", action: "Expand / collapse" },
  { component: "Accordion", keys: "↑ ↓ Arrow", action: "Navigate between headers" },
  { component: "Modal", keys: "Escape", action: "Close dialog" },
  { component: "Modal", keys: "Tab / Shift+Tab", action: "Cycle focus inside dialog" },
  { component: "Tooltip", keys: "Escape", action: "Dismiss tooltip" },
  { component: "Select", keys: "Enter, Space", action: "Open dropdown" },
  { component: "Select", keys: "↑ ↓ Arrow", action: "Navigate options" },
  { component: "Select", keys: "Escape", action: "Close without selecting" },
];

const WCAG_CRITERIA = [
  { id: "1.3.1", title: "Info and Relationships", level: "A", status: "pass", note: "ARIA roles and labels communicate structure to screen readers." },
  { id: "1.4.1", title: "Use of Color", level: "A", status: "pass", note: "Status variants always pair color with a text label or icon." },
  { id: "1.4.3", title: "Contrast (Minimum)", level: "AA", status: "pass", note: "All text passes 4.5:1 against its background in both themes." },
  { id: "1.4.11", title: "Non-text Contrast", level: "AA", status: "pass", note: "Interactive boundaries (input borders, focus rings) pass 3:1." },
  { id: "2.1.1", title: "Keyboard", level: "A", status: "pass", note: "All interactive components reachable and operable by keyboard alone." },
  { id: "2.4.3", title: "Focus Order", level: "A", status: "pass", note: "Focus order follows reading order. Modals trap focus correctly." },
  { id: "2.4.7", title: "Focus Visible", level: "AA", status: "pass", note: "2px primary-colored focus ring on all interactive elements." },
  { id: "4.1.2", title: "Name, Role, Value", level: "A", status: "pass", note: "All components expose correct ARIA role, state, and property." },
];

export default function AccessibilityPage() {
  return (
    <>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
          Getting started
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 12 }}>Accessibility</h1>
        <p style={{ fontSize: 16, color: "var(--syn-text-muted)", lineHeight: 1.65 }}>
          Synerity targets WCAG 2.1 AA compliance. Keyboard navigation follows the{" "}
          <a href="https://www.w3.org/WAI/ARIA/apg/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--syn-primary)" }}>
            ARIA Authoring Practices Guide
          </a>{" "}
          patterns throughout.
        </p>
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 16 }}>WCAG 2.1 coverage</h2>
      <div style={{ border: "1px solid var(--syn-border)", borderRadius: "var(--syn-radius-lg)", overflow: "hidden", marginBottom: 40 }}>
        {WCAG_CRITERIA.map((c, i) => (
          <div key={c.id} style={{
            display: "grid", gridTemplateColumns: "60px 1fr auto",
            alignItems: "start", gap: 16, padding: "14px 20px",
            borderBottom: i < WCAG_CRITERIA.length - 1 ? "1px solid var(--syn-border)" : "none",
            background: "var(--syn-bg-raised)",
          }}>
            <div>
              <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-primary)", fontWeight: 600 }}>{c.id}</div>
              <div style={{
                fontSize: 10, fontFamily: "var(--syn-font-mono)", letterSpacing: "0.06em",
                color: "var(--syn-text-muted)", marginTop: 2,
              }}>Level {c.level}</div>
            </div>
            <div>
              <div style={{ fontWeight: 500, fontSize: 13, marginBottom: 2 }}>{c.title}</div>
              <div style={{ fontSize: 12, color: "var(--syn-text-muted)", lineHeight: 1.5 }}>{c.note}</div>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 5,
              padding: "3px 10px", borderRadius: "var(--syn-radius-full)",
              background: "var(--syn-success-subtle)", color: "var(--syn-success)",
              fontFamily: "var(--syn-font-mono)", fontSize: 11, fontWeight: 600,
              whiteSpace: "nowrap",
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Pass
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 16 }}>Keyboard patterns</h2>
      <div style={{ border: "1px solid var(--syn-border)", borderRadius: "var(--syn-radius-lg)", overflow: "hidden", marginBottom: 40 }}>
        <div style={{ display: "grid", gridTemplateColumns: "140px 160px 1fr", background: "var(--syn-bg-sunken)", borderBottom: "1px solid var(--syn-border)" }}>
          {["Component", "Keys", "Action"].map((h) => (
            <div key={h} style={{ padding: "10px 16px", fontFamily: "var(--syn-font-mono)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--syn-text-muted)" }}>{h}</div>
          ))}
        </div>
        {KEYBOARD_PATTERNS.map((p, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "140px 160px 1fr",
            borderBottom: i < KEYBOARD_PATTERNS.length - 1 ? "1px solid var(--syn-border)" : "none",
            background: "var(--syn-bg-raised)",
          }}>
            <div style={{ padding: "10px 16px", fontSize: 13, fontWeight: 500 }}>{p.component}</div>
            <div style={{ padding: "10px 16px" }}>
              <code style={{ fontFamily: "var(--syn-font-mono)", fontSize: 12, background: "var(--syn-bg-sunken)", padding: "2px 6px", borderRadius: "var(--syn-radius-sm)", color: "var(--syn-text)" }}>{p.keys}</code>
            </div>
            <div style={{ padding: "10px 16px", fontSize: 13, color: "var(--syn-text-muted)" }}>{p.action}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 12 }}>Testing</h2>
      <div style={{ display: "grid", gap: 12 }}>
        {[
          { tool: "jest-axe", desc: "Automated ARIA rule audit in unit tests. Run on every component in both themes." },
          { tool: "Keyboard-only nav", desc: "Manual test — navigate the entire playground using only Tab, arrows, Enter, Space, Escape." },
          { tool: "VoiceOver (macOS)", desc: "Screen reader verification on Safari. All interactive components tested." },
          { tool: "NVDA (Windows)", desc: "Screen reader verification on Chrome and Firefox." },
        ].map(({ tool, desc }) => (
          <div key={tool} style={{
            padding: "14px 20px", borderRadius: "var(--syn-radius-lg)",
            background: "var(--syn-bg-raised)", border: "1px solid var(--syn-border)",
          }}>
            <div style={{ fontWeight: 600, marginBottom: 4, fontFamily: "var(--syn-font-mono)", fontSize: 13, color: "var(--syn-primary)" }}>{tool}</div>
            <div style={{ fontSize: 13, color: "var(--syn-text-muted)" }}>{desc}</div>
          </div>
        ))}
      </div>
    </>
  );
}
