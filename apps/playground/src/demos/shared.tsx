import React, { useState } from "react";

// ── DemoSection ───────────────────────────────────────────────────────────────

type DemoSectionProps = {
  title: string;
  code?: string;
  children: React.ReactNode;
  /** Stack children in a column instead of a row. */
  col?: boolean;
  /** Use a grid layout. */
  grid?: boolean;
};

export function DemoSection({ title, code, children, col, grid }: DemoSectionProps) {
  const previewClass = [
    "pg-demo-preview",
    col ? "pg-demo-preview--col" : "",
    grid ? "pg-demo-preview--grid" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="pg-demo-section">
      <div className="pg-demo-section-title">{title}</div>
      <div className={previewClass}>{children}</div>
      {code && <CodeBlock code={code} />}
    </div>
  );
}

// ── CodeBlock ─────────────────────────────────────────────────────────────────

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="pg-code-block">
      <div className="pg-code-block-header">
        <span className="pg-code-block-lang">tsx</span>
        <button className="pg-code-copy-btn" onClick={copy}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ── Row / Col ────────────────────────────────────────────────────────────────

export function Row({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div className="pg-row" style={style}>
      {children}
    </div>
  );
}

export function Col({ children }: { children: React.ReactNode }) {
  return <div className="pg-col">{children}</div>;
}

// ── Label ─────────────────────────────────────────────────────────────────────

export function Label({ children }: { children: React.ReactNode }) {
  return <div className="pg-label">{children}</div>;
}
