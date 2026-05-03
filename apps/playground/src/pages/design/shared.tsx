import type { CSSProperties, ReactNode } from "react";

export const Mono = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <span style={{ fontFamily: "var(--syn-font-mono)", fontSize: "0.92em", letterSpacing: "0.02em", ...style }}>
    {children}
  </span>
);

export const Eyebrow = ({ children, accent }: { children: ReactNode; accent?: string }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 10, marginBottom: 14,
    fontFamily: "var(--syn-font-mono)", fontSize: 11,
    textTransform: "uppercase", letterSpacing: "0.12em",
    color: "var(--syn-text-muted)",
  }}>
    <span style={{ width: 8, height: 8, borderRadius: 2, background: accent ?? "var(--syn-primary)", flexShrink: 0 }} />
    {children}
  </div>
);

export const SectionTitle = ({
  idx, title, subtitle, count,
}: {
  idx: string; title: string; subtitle?: string; count?: number;
}) => (
  <div style={{
    display: "grid", gridTemplateColumns: "1fr auto", alignItems: "end",
    marginBottom: 32, paddingBottom: 24, borderBottom: "1px solid var(--syn-border)",
  }}>
    <div>
      <Eyebrow>{idx} / Synerity Design System</Eyebrow>
      <h1 style={{ margin: 0, fontSize: 48, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--syn-text)" }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{ marginTop: 12, marginBottom: 0, color: "var(--syn-text-muted)", fontSize: 16, maxWidth: 640, lineHeight: 1.55 }}>
          {subtitle}
        </p>
      )}
    </div>
    {count != null && (
      <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 12, color: "var(--syn-text-subtle)", textAlign: "right" }}>
        <div style={{ fontSize: 32, color: "var(--syn-text)", fontWeight: 500 }}>{String(count).padStart(2, "0")}</div>
        <div>tokens</div>
      </div>
    )}
  </div>
);

export const DesignCard = ({
  children, padding = 20, style, ...rest
}: {
  children: ReactNode; padding?: number; style?: CSSProperties; [key: string]: unknown;
}) => (
  <div {...rest} style={{
    background: "var(--syn-bg-raised)",
    border: "1px solid var(--syn-border)",
    borderRadius: "var(--syn-radius-lg)",
    padding,
    ...style,
  }}>
    {children}
  </div>
);

export const TokenRow = ({
  name, value, swatch,
}: {
  name: string; value: string; swatch?: ReactNode;
}) => (
  <div style={{
    display: "grid", gridTemplateColumns: "32px 1fr auto", alignItems: "center", gap: 16,
    padding: "12px 16px", borderBottom: "1px solid var(--syn-border)",
    fontFamily: "var(--syn-font-mono)", fontSize: 12,
  }}>
    {swatch ?? <span />}
    <span style={{ color: "var(--syn-text)" }}>{name}</span>
    <span style={{ color: "var(--syn-text-muted)" }}>{value}</span>
  </div>
);

export const pageShell: CSSProperties = {
  padding: 56,
  background: "var(--syn-bg)",
  color: "var(--syn-text)",
  minHeight: "100%",
};
