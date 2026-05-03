import { DesignCard, Eyebrow, Mono, SectionTitle, pageShell } from "./shared";

const SPACE_STEPS = [0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24];

const RADII = [
  { n: "none", v: "0" },
  { n: "sm", v: "4px" },
  { n: "md", v: "6px" },
  { n: "lg", v: "8px" },
  { n: "xl", v: "12px" },
  { n: "2xl", v: "16px" },
  { n: "full", v: "9999px" },
];

const SHADOWS = ["xs", "sm", "md", "lg", "xl"];

export default function SpacingPage() {
  return (
    <div style={pageShell}>
      <SectionTitle
        idx="04"
        title="Spacing · Radius · Shadow"
        subtitle="A 4px base grid. Radius scales with the global radius token. Five elevation steps from subtle hairline to modal lift."
        count={27}
      />

      <Eyebrow>Spacing scale — 4px base</Eyebrow>
      <DesignCard padding={24} style={{ marginBottom: 40 }}>
        <div style={{ display: "grid", gap: 8 }}>
          {SPACE_STEPS.map((n) => (
            <div key={n} style={{ display: "grid", gridTemplateColumns: "80px 60px 1fr", alignItems: "center", gap: 16 }}>
              <Mono style={{ color: "var(--syn-text-muted)", fontSize: 11 }}>
                space-{String(n).replace(".", "-")}
              </Mono>
              <Mono style={{ color: "var(--syn-text-muted)", fontSize: 11 }}>{n * 4}px</Mono>
              <div style={{ height: 16, width: `${n * 4}px`, background: "var(--syn-primary)", borderRadius: 2, minWidth: 2 }} />
            </div>
          ))}
        </div>
      </DesignCard>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <div>
          <Eyebrow>Radius</Eyebrow>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {RADII.map((r) => (
              <div key={r.n} style={{ textAlign: "center" }}>
                <div style={{
                  height: 80, width: "100%",
                  background: "var(--syn-primary-subtle)",
                  border: "1px solid var(--syn-primary)",
                  borderRadius: `var(--syn-radius-${r.n})`,
                  marginBottom: 8,
                }} />
                <Mono style={{ color: "var(--syn-text)", fontSize: 11, display: "block" }}>{r.n}</Mono>
                <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 10, color: "var(--syn-text-muted)" }}>{r.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Eyebrow>Shadow / elevation</Eyebrow>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, padding: 24, background: "var(--syn-bg-sunken)", borderRadius: "var(--syn-radius-lg)" }}>
            {SHADOWS.map((s) => (
              <div key={s} style={{ textAlign: "center" }}>
                <div style={{
                  height: 80,
                  background: "var(--syn-bg-raised)",
                  border: "1px solid var(--syn-border)",
                  borderRadius: "var(--syn-radius-md)",
                  boxShadow: `var(--syn-shadow-${s})`,
                  marginBottom: 8,
                }} />
                <Mono style={{ fontSize: 11 }}>shadow-{s}</Mono>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 40 }}>
        <Eyebrow>Token reference</Eyebrow>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { label: "4px base", desc: "All spacing is a multiple of 4. Use --syn-space-N or multiples directly.", token: "--syn-space-4 → 16px" },
            { label: "Semantic radius", desc: "Components use semantic names. The scale shifts globally via --syn-radius-scale.", token: "--syn-radius-lg → 8px" },
            { label: "Five elevations", desc: "xs is a hairline separator. xl is modal overlay. Match shadow to component depth.", token: "--syn-shadow-md → default card" },
          ].map((item) => (
            <DesignCard key={item.label}>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>{item.label}</div>
              <div style={{ fontSize: 13, color: "var(--syn-text-muted)", lineHeight: 1.55, marginBottom: 12 }}>{item.desc}</div>
              <Mono style={{ fontSize: 11, color: "var(--syn-primary)", display: "block", padding: "6px 8px", background: "var(--syn-primary-subtle)", borderRadius: "var(--syn-radius-sm)" }}>
                {item.token}
              </Mono>
            </DesignCard>
          ))}
        </div>
      </div>
    </div>
  );
}
