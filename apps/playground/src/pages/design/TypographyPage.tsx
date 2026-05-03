import { DesignCard, Eyebrow, Mono, SectionTitle, pageShell } from "./shared";

const SIZES = [
  { t: "6xl", v: "4rem", w: 600, sample: "Synerity" },
  { t: "5xl", v: "3rem", w: 600, sample: "Composable primitives" },
  { t: "4xl", v: "2.25rem", w: 600, sample: "Headless by design" },
  { t: "3xl", v: "1.75rem", w: 500, sample: "Logic and skin, separated" },
  { t: "2xl", v: "1.375rem", w: 500, sample: "A token-driven visual layer" },
  { t: "xl", v: "1.125rem", w: 500, sample: "Built on ARIA Authoring Practices" },
  { t: "lg", v: "1rem", w: 400, sample: "Body — readable at default browser size, with a ~64ch line length cap." },
  { t: "md", v: "0.875rem", w: 400, sample: "UI text — used inside cards, tables, and dense data displays." },
  { t: "sm", v: "0.8125rem", w: 400, sample: "Captions, helper text, secondary metadata." },
  { t: "xs", v: "0.75rem", w: 500, sample: "Eyebrows, status pills, table headers." },
];

export default function TypographyPage() {
  return (
    <div style={pageShell}>
      <SectionTitle
        idx="03"
        title="Type"
        subtitle="Geist Sans for product. Geist Mono for tokens, code, and metadata. A modular scale tuned for dense UI — short letterforms in headlines, generous leading in body."
        count={10}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 32 }}>
        <div>
          {SIZES.map((s) => (
            <div key={s.t} style={{
              display: "grid", gridTemplateColumns: "80px 1fr",
              alignItems: "baseline", gap: 24,
              padding: "16px 0", borderBottom: "1px solid var(--syn-border)",
            }}>
              <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-text-muted)" }}>
                <div style={{ color: "var(--syn-text)" }}>text-{s.t}</div>
                <div>{s.v}</div>
              </div>
              <div style={{ fontSize: s.v, fontWeight: s.w, lineHeight: 1.15, letterSpacing: "-0.03em" }}>{s.sample}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
          <DesignCard>
            <Eyebrow>Family — Sans</Eyebrow>
            <div style={{ fontSize: 56, fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1 }}>Aa</div>
            <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-text-muted)", marginTop: 16 }}>
              Geist Sans · 400 / 500 / 600 / 700
            </div>
            <div style={{ marginTop: 12, fontSize: 14, color: "var(--syn-text-muted)", letterSpacing: "-0.01em" }}>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
              abcdefghijklmnopqrstuvwxyz<br />
              0123456789 — • → ← ↑ ↓
            </div>
          </DesignCard>
          <DesignCard>
            <Eyebrow accent="var(--syn-text)">Family — Mono</Eyebrow>
            <div style={{ fontSize: 56, fontFamily: "var(--syn-font-mono)", fontWeight: 500, letterSpacing: "0.04em", lineHeight: 1 }}>Aa</div>
            <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-text-muted)", marginTop: 16 }}>
              Geist Mono · 400 / 500 / 600
            </div>
            <div style={{ marginTop: 12, fontFamily: "var(--syn-font-mono)", fontSize: 12, color: "var(--syn-text-muted)" }}>
              const tokens = {"{"}<br />
              &nbsp;&nbsp;color: 'oklch(...)',<br />
              &nbsp;&nbsp;space: [0,4,8,12]<br />
              {"}"}
            </div>
          </DesignCard>
          <DesignCard>
            <Eyebrow>Weights</Eyebrow>
            {[
              { w: 400, l: "Regular" },
              { w: 500, l: "Medium" },
              { w: 600, l: "Semibold" },
              { w: 700, l: "Bold" },
            ].map((w) => (
              <div key={w.w} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "8px 0", borderBottom: "1px solid var(--syn-border)" }}>
                <span style={{ fontSize: 18, fontWeight: w.w }}>{w.l}</span>
                <Mono style={{ color: "var(--syn-text-muted)" }}>{w.w}</Mono>
              </div>
            ))}
          </DesignCard>
          <DesignCard>
            <Eyebrow>Tracking</Eyebrow>
            {[
              { l: "tight", v: "-0.03em", sample: "Synerity" },
              { l: "snug", v: "-0.015em", sample: "Synerity" },
              { l: "normal", v: "0em", sample: "Synerity" },
              { l: "mono", v: "0.02em", sample: "const x = 1;" },
            ].map((t) => (
              <div key={t.l} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "8px 0", borderBottom: "1px solid var(--syn-border)" }}>
                <span style={{ fontSize: 16, letterSpacing: t.v, fontFamily: t.l === "mono" ? "var(--syn-font-mono)" : undefined }}>{t.sample}</span>
                <Mono style={{ color: "var(--syn-text-muted)", fontSize: 10 }}>{t.l} · {t.v}</Mono>
              </div>
            ))}
          </DesignCard>
        </div>
      </div>
    </div>
  );
}
