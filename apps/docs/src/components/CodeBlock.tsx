"use client";

import { useState } from "react";

export function CodeBlock({ code, lang = "tsx" }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    void navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div style={{ position: "relative", borderRadius: "var(--syn-radius-lg)", border: "1px solid var(--syn-border)", overflow: "hidden" }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "8px 16px", background: "var(--syn-bg-sunken)",
        borderBottom: "1px solid var(--syn-border)",
      }}>
        <span style={{ fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-text-subtle)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {lang}
        </span>
        <button
          onClick={copy}
          style={{
            display: "flex", alignItems: "center", gap: 5,
            padding: "3px 10px", fontSize: 11, fontFamily: "var(--syn-font-mono)",
            background: "transparent", border: "1px solid var(--syn-border)",
            borderRadius: "var(--syn-radius-sm)", cursor: "pointer",
            color: copied ? "var(--syn-primary)" : "var(--syn-text-muted)",
            transition: "color 120ms ease",
          }}
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre style={{
        margin: 0, padding: "16px 20px",
        fontFamily: "var(--syn-font-mono)", fontSize: 13, lineHeight: 1.65,
        background: "var(--syn-bg-raised)", overflowX: "auto",
        color: "var(--syn-text)",
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
