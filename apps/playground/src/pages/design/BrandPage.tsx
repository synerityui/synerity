import { DesignCard, Eyebrow, Mono, SectionTitle, pageShell } from "./shared";

function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="12" cy="12" r="6" fill="var(--syn-primary)" />
      <circle cx="28" cy="12" r="6" fill="none" stroke="var(--syn-text)" strokeWidth="1.5" />
      <circle cx="20" cy="28" r="6" fill="var(--syn-text)" />
      <line x1="12" y1="12" x2="28" y2="12" stroke="var(--syn-text)" strokeWidth="1.5" />
      <line x1="12" y1="12" x2="20" y2="28" stroke="var(--syn-text)" strokeWidth="1.5" />
      <line x1="28" y1="12" x2="20" y2="28" stroke="var(--syn-text)" strokeWidth="1.5" />
    </svg>
  );
}

export default function BrandPage() {
  return (
    <div style={pageShell}>
      <SectionTitle
        idx="01"
        title="Brand"
        subtitle="A two-layer component system. Headless logic underneath, token-driven skin on top. The mark reflects this: connected primitives, one composed surface."
      />

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32 }}>
        <DesignCard padding={48} style={{ minHeight: 360, display: "flex", flexDirection: "column", justifyContent: "space-between", background: "var(--syn-bg-sunken)" }}>
          <Eyebrow>Primary mark</Eyebrow>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Logo size={88} />
            <div>
              <div style={{ fontSize: 64, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>synerity</div>
              <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 13, color: "var(--syn-text-muted)", marginTop: 8, letterSpacing: "0.04em" }}>
                v1.0 — react component library
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 32, fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-text-muted)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
            <div><span style={{ color: "var(--syn-primary)" }}>●</span> headless</div>
            <div><span style={{ color: "var(--syn-text)" }}>●</span> tokens</div>
            <div><span style={{ color: "var(--syn-text)" }}>○</span> ui</div>
          </div>
        </DesignCard>

        <div style={{ display: "grid", gap: 16 }}>
          <DesignCard>
            <Eyebrow>Tagline</Eyebrow>
            <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.25 }}>
              Logic, tokens, and a skin — three layers, one library. Compose your own design system without forking.
            </div>
          </DesignCard>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[
              { v: "9", l: "packages" },
              { v: "120+", l: "components" },
              { v: "0", l: "runtime deps" },
            ].map((s) => (
              <DesignCard key={s.l} padding={16} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.03em" }}>{s.v}</div>
                <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>{s.l}</div>
              </DesignCard>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 32 }}>
        {[
          { bg: "var(--syn-primary)", fg: "var(--syn-primary-fg)", l: "On primary" },
          { bg: "var(--syn-bg)", fg: "var(--syn-text)", l: "Light", b: true },
          { bg: "var(--syn-n-11, #0f172a)", fg: "var(--syn-n-1, #f8fafc)", l: "Dark" },
          { bg: "var(--syn-bg-sunken)", fg: "var(--syn-text)", l: "Sunken", b: true },
        ].map((v) => (
          <div key={v.l} style={{
            background: v.bg, color: v.fg, padding: 24, borderRadius: "var(--syn-radius-lg)",
            border: v.b ? "1px solid var(--syn-border)" : "none",
            display: "flex", alignItems: "center", gap: 12, height: 96,
          }}>
            <Logo size={28} />
            <div>
              <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.03em" }}>synerity</div>
              <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 10, opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.1em" }}>{v.l}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 40 }}>
        <Eyebrow>Architecture layers</Eyebrow>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            {
              pkg: "@synerity/headless",
              desc: "ARIA-compliant hooks with zero DOM opinions. useButton, useToggle, useTabs — pure logic.",
              color: "var(--syn-info)",
            },
            {
              pkg: "@synerity/tokens",
              desc: "CSS custom properties for color, spacing, typography, motion. Swap themes without touching components.",
              color: "var(--syn-primary)",
            },
            {
              pkg: "@synerity/ui",
              desc: "18 polished components built on headless + tokens. Accessible, dark-mode ready, tree-shakeable.",
              color: "var(--syn-success)",
            },
          ].map((layer) => (
            <DesignCard key={layer.pkg}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: layer.color, marginBottom: 14 }} />
              <Mono style={{ fontSize: 12, display: "block", marginBottom: 10, color: "var(--syn-text)" }}>{layer.pkg}</Mono>
              <div style={{ fontSize: 13, color: "var(--syn-text-muted)", lineHeight: 1.55 }}>{layer.desc}</div>
            </DesignCard>
          ))}
        </div>
      </div>
    </div>
  );
}
