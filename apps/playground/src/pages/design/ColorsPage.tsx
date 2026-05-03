import { useEffect, useRef, useState } from "react";
import { DesignCard, Eyebrow, SectionTitle, TokenRow, pageShell } from "./shared";

function Swatch({ varName, label }: { varName: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState("");
  useEffect(() => {
    if (ref.current) {
      const cs = getComputedStyle(ref.current);
      setVal(cs.getPropertyValue("background-color").trim());
    }
  }, []);
  return (
    <div ref={ref} style={{
      background: `var(${varName})`,
      borderRadius: "var(--syn-radius-md)", padding: 14, height: 96,
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      border: "1px solid var(--syn-border)",
      fontFamily: "var(--syn-font-mono)", fontSize: 10,
      color: "var(--syn-text)",
    }}>
      <div style={{ fontWeight: 500 }}>{label}</div>
      <div style={{ opacity: 0.55, fontSize: 9 }}>{varName}</div>
      {val && <div style={{ opacity: 0.45, fontSize: 9 }}>{val}</div>}
    </div>
  );
}

export default function ColorsPage() {
  const neutrals = Array.from({ length: 13 }, (_, i) => i);

  return (
    <div style={pageShell}>
      <SectionTitle
        idx="02"
        title="Color"
        subtitle="Perceptual oklch ramps. One brand hue, twelve neutrals, four semantic states. Every value redefines under [data-theme=dark] — the same token names, different luminance."
        count={42}
      />

      <Eyebrow>Brand</Eyebrow>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginBottom: 40 }}>
        <Swatch varName="--syn-primary" label="primary" />
        <Swatch varName="--syn-primary-hover" label="primary-hover" />
        <Swatch varName="--syn-primary-active" label="primary-active" />
        <Swatch varName="--syn-primary-subtle" label="primary-subtle" />
        <Swatch varName="--syn-primary-subtle-hover" label="subtle-hover" />
        <Swatch varName="--syn-primary-fg" label="primary-fg" />
      </div>

      <Eyebrow>Neutrals — n-0 through n-12</Eyebrow>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(13, 1fr)", gap: 4,
        marginBottom: 40, border: "1px solid var(--syn-border)",
        borderRadius: "var(--syn-radius-md)", padding: 4, background: "var(--syn-bg-sunken)",
      }}>
        {neutrals.map((n) => (
          <div key={n} style={{
            background: `var(--syn-n-${n})`,
            height: 88, borderRadius: 4,
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
            padding: 8,
            color: n > 6 ? "var(--syn-n-1)" : "var(--syn-n-11)",
            fontFamily: "var(--syn-font-mono)", fontSize: 10,
          }}>
            <div style={{ fontWeight: 600 }}>{n}</div>
          </div>
        ))}
      </div>

      <Eyebrow>Semantic</Eyebrow>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
        {[
          { v: "--syn-success", s: "--syn-success-subtle", l: "Success" },
          { v: "--syn-warning", s: "--syn-warning-subtle", l: "Warning" },
          { v: "--syn-danger", s: "--syn-danger-subtle", l: "Danger" },
          { v: "--syn-info", s: "--syn-info-subtle", l: "Info" },
        ].map((c) => (
          <div key={c.l} style={{ borderRadius: "var(--syn-radius-lg)", overflow: "hidden", border: "1px solid var(--syn-border)" }}>
            <div style={{
              background: `var(${c.v})`, height: 72,
              display: "flex", alignItems: "flex-end", padding: 12,
              color: "white", fontFamily: "var(--syn-font-mono)", fontSize: 11,
            }}>{c.l}</div>
            <div style={{
              background: `var(${c.s})`, height: 48,
              display: "flex", alignItems: "center", padding: "0 12px",
              fontFamily: "var(--syn-font-mono)", fontSize: 10, color: "var(--syn-text-muted)",
            }}>{c.s.replace("--syn-", "")}</div>
          </div>
        ))}
      </div>

      <Eyebrow>Surface · Border · Text</Eyebrow>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        <DesignCard padding={0}>
          <TokenRow name="--syn-bg" value="base surface" swatch={<div style={{ width: 24, height: 24, background: "var(--syn-bg)", border: "1px solid var(--syn-border)", borderRadius: 4 }} />} />
          <TokenRow name="--syn-bg-raised" value="cards / sheets" swatch={<div style={{ width: 24, height: 24, background: "var(--syn-bg-raised)", border: "1px solid var(--syn-border)", borderRadius: 4 }} />} />
          <TokenRow name="--syn-bg-sunken" value="inputs / wells" swatch={<div style={{ width: 24, height: 24, background: "var(--syn-bg-sunken)", border: "1px solid var(--syn-border)", borderRadius: 4 }} />} />
        </DesignCard>
        <DesignCard padding={0}>
          <TokenRow name="--syn-border" value="default strokes" swatch={<div style={{ width: 24, height: 24, background: "var(--syn-border)", borderRadius: 4 }} />} />
          <TokenRow name="--syn-border-strong" value="emphasis strokes" swatch={<div style={{ width: 24, height: 24, background: "var(--syn-border-strong)", borderRadius: 4 }} />} />
        </DesignCard>
        <DesignCard padding={0}>
          <TokenRow name="--syn-text" value="primary text" swatch={<div style={{ width: 24, height: 24, background: "var(--syn-text)", borderRadius: 4 }} />} />
          <TokenRow name="--syn-text-muted" value="secondary text" swatch={<div style={{ width: 24, height: 24, background: "var(--syn-text-muted)", borderRadius: 4 }} />} />
          <TokenRow name="--syn-text-subtle" value="tertiary / disabled" swatch={<div style={{ width: 24, height: 24, background: "var(--syn-text-subtle)", borderRadius: 4 }} />} />
        </DesignCard>
      </div>
    </div>
  );
}
