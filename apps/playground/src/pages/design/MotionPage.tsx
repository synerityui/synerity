import { useEffect, useState } from "react";
import { DesignCard, Eyebrow, Mono, SectionTitle, pageShell } from "./shared";

const DURATIONS = [
  { n: "fast", v: "100ms", desc: "Micro-interactions: checkboxes, switches, focus rings." },
  { n: "normal", v: "200ms", desc: "Default transitions: hover states, simple reveals." },
  { n: "slow", v: "300ms", desc: "Contextual reveals: tooltips, dropdowns, popovers." },
  { n: "slower", v: "500ms", desc: "Orchestrated entries: page transitions, modals." },
];

const EASINGS = [
  { n: "ease", v: "cubic-bezier(0.4, 0, 0.2, 1)", desc: "Default — symmetric, natural." },
  { n: "ease-in", v: "cubic-bezier(0.4, 0, 1, 1)", desc: "Exits — elements leaving the screen." },
  { n: "ease-out", v: "cubic-bezier(0, 0, 0.2, 1)", desc: "Entrances — elements entering the screen." },
  { n: "ease-spring", v: "cubic-bezier(0.34, 1.56, 0.64, 1)", desc: "Spring — toasts, popovers, drag-release." },
];

const PATTERNS = [
  { t: "Tooltip in", d: "150ms", e: "ease-out", desc: "Enter from opacity 0, slight translate." },
  { t: "Modal in", d: "200ms", e: "ease-out", desc: "Scale from 0.96 + opacity 0." },
  { t: "Toast spring", d: "300ms", e: "ease-spring", desc: "Slides in from edge, overshoots slightly." },
  { t: "Skeleton shimmer", d: "1400ms", e: "ease", desc: "Continuous gradient sweep, repeating." },
  { t: "Accordion open", d: "200ms", e: "ease-out", desc: "Height transition on panel reveal." },
  { t: "Switch toggle", d: "100ms", e: "ease", desc: "Thumb translate + background color." },
];

export default function MotionPage() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={pageShell}>
      <style>{`
        @keyframes syn-slide-demo {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(100% - 14px)); }
        }
        @keyframes syn-shimmer {
          from { background-position: -200% 0; }
          to   { background-position: 200% 0; }
        }
      `}</style>

      <SectionTitle
        idx="13"
        title="Motion"
        subtitle="Four durations, four easings. Spring is reserved for affordances that need character — toasts, popovers, drag-release. Everything else uses ease."
        count={8}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <DesignCard>
          <Eyebrow>Duration</Eyebrow>
          <div style={{ display: "grid", gap: 20 }}>
            {DURATIONS.map((d) => (
              <div key={d.n}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontFamily: "var(--syn-font-mono)", fontSize: 12 }}>
                  <span style={{ color: "var(--syn-text)" }}>--syn-dur-{d.n}</span>
                  <span style={{ color: "var(--syn-text-muted)" }}>{d.v}</span>
                </div>
                <div style={{ height: 14, background: "var(--syn-bg-sunken)", borderRadius: "9999px", overflow: "hidden", position: "relative", marginBottom: 6 }}>
                  <div
                    key={`dur-${d.n}-${tick}`}
                    style={{
                      width: 14, height: 14, borderRadius: "50%",
                      background: "var(--syn-primary)",
                      animation: `syn-slide-demo ${d.v} cubic-bezier(0.4,0,0.2,1) forwards`,
                    }}
                  />
                </div>
                <div style={{ fontSize: 11, color: "var(--syn-text-muted)" }}>{d.desc}</div>
              </div>
            ))}
          </div>
        </DesignCard>

        <DesignCard>
          <Eyebrow>Easing</Eyebrow>
          <div style={{ display: "grid", gap: 20 }}>
            {EASINGS.map((e) => (
              <div key={e.n}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontFamily: "var(--syn-font-mono)", fontSize: 12 }}>
                  <span style={{ color: "var(--syn-text)" }}>{e.n}</span>
                  <span style={{ color: "var(--syn-text-muted)", fontSize: 10 }}>{e.v.replace("cubic-bezier", "cb")}</span>
                </div>
                <div style={{ height: 14, background: "var(--syn-bg-sunken)", borderRadius: "9999px", overflow: "hidden", position: "relative", marginBottom: 6 }}>
                  <div
                    key={`ease-${e.n}-${tick}`}
                    style={{
                      width: 14, height: 14, borderRadius: "50%",
                      background: "var(--syn-text)",
                      animation: `syn-slide-demo 600ms ${e.v} forwards`,
                    }}
                  />
                </div>
                <div style={{ fontSize: 11, color: "var(--syn-text-muted)" }}>{e.desc}</div>
              </div>
            ))}
          </div>
        </DesignCard>
      </div>

      <div style={{ marginTop: 24 }}>
        <Eyebrow>Pattern reference</Eyebrow>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {PATTERNS.map((p) => (
            <DesignCard key={p.t} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{p.t}</div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{
                  padding: "2px 8px", borderRadius: "9999px", fontSize: 11,
                  background: "var(--syn-primary-subtle)", color: "var(--syn-primary)",
                  fontFamily: "var(--syn-font-mono)",
                }}>{p.d}</span>
                <span style={{
                  padding: "2px 8px", borderRadius: "9999px", fontSize: 11,
                  background: "var(--syn-bg-sunken)", color: "var(--syn-text-muted)",
                  fontFamily: "var(--syn-font-mono)",
                }}>{p.e}</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--syn-text-muted)", lineHeight: 1.5 }}>{p.desc}</div>
            </DesignCard>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <Eyebrow>Skeleton shimmer</Eyebrow>
        <DesignCard>
          <div style={{ display: "grid", gap: 10 }}>
            {[240, 180, 140].map((w) => (
              <div key={w} style={{
                height: 16, width: `${w}px`, maxWidth: "100%", borderRadius: "var(--syn-radius-sm)",
                background: "linear-gradient(90deg, var(--syn-bg-sunken) 0%, var(--syn-border) 50%, var(--syn-bg-sunken) 100%)",
                backgroundSize: "200% 100%",
                animation: "syn-shimmer 1400ms cubic-bezier(0.4,0,0.2,1) infinite",
              }} />
            ))}
          </div>
        </DesignCard>
      </div>

      <div style={{ marginTop: 24 }}>
        <Eyebrow>Token reference</Eyebrow>
        <DesignCard padding={0}>
          {[
            { token: "--syn-dur-fast", value: "100ms", usage: "checkboxes, switches, focus rings" },
            { token: "--syn-dur-normal", value: "200ms", usage: "hover states, color transitions" },
            { token: "--syn-dur-slow", value: "300ms", usage: "popovers, dropdowns, tooltips" },
            { token: "--syn-dur-slower", value: "500ms", usage: "page transitions, modals" },
            { token: "--syn-ease", value: "cubic-bezier(0.4, 0, 0.2, 1)", usage: "default — most transitions" },
            { token: "--syn-ease-in", value: "cubic-bezier(0.4, 0, 1, 1)", usage: "exits" },
            { token: "--syn-ease-out", value: "cubic-bezier(0, 0, 0.2, 1)", usage: "entrances" },
            { token: "--syn-ease-spring", value: "cubic-bezier(0.34, 1.56, 0.64, 1)", usage: "spring affordances" },
          ].map((row, i, arr) => (
            <div key={row.token} style={{
              display: "grid", gridTemplateColumns: "1.5fr 1.5fr 1fr", gap: 16,
              padding: "12px 16px",
              borderBottom: i < arr.length - 1 ? "1px solid var(--syn-border)" : "none",
              fontFamily: "var(--syn-font-mono)", fontSize: 12,
            }}>
              <Mono style={{ color: "var(--syn-primary)" }}>{row.token}</Mono>
              <span style={{ color: "var(--syn-text-muted)" }}>{row.value}</span>
              <span style={{ color: "var(--syn-text-subtle)", fontSize: 11 }}>{row.usage}</span>
            </div>
          ))}
        </DesignCard>
      </div>
    </div>
  );
}
