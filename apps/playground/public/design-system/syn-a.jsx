/* global React */
const { useState, useEffect, useRef, useMemo } = React;

// ════════════════════════════════════════════════════════════
// SHARED PRIMITIVES
// ════════════════════════════════════════════════════════════

const Mono = ({ children, style }) => (
  <span style={{ fontFamily: "var(--syn-font-mono)", fontSize: "0.92em", letterSpacing: "var(--syn-tracking-mono)", ...style }}>{children}</span>
);

const Eyebrow = ({ children, accent }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 10, marginBottom: 14,
    fontFamily: "var(--syn-font-mono)", fontSize: 11,
    textTransform: "uppercase", letterSpacing: "0.12em",
    color: "var(--syn-text-muted)",
  }}>
    <span style={{ width: 8, height: 8, borderRadius: 2, background: accent || "var(--syn-primary)" }}/>
    {children}
  </div>
);

const SectionTitle = ({ idx, title, subtitle, count }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "end", marginBottom: 32, paddingBottom: 24, borderBottom: "1px solid var(--syn-border)" }}>
    <div>
      <Eyebrow>{idx} / Synerity Design System</Eyebrow>
      <h1 style={{ margin: 0, fontSize: 48, fontWeight: 600, letterSpacing: "var(--syn-tracking-tight)", lineHeight: 1.05 }}>{title}</h1>
      {subtitle && <p style={{ marginTop: 12, marginBottom: 0, color: "var(--syn-text-muted)", fontSize: 16, maxWidth: 640, lineHeight: 1.55 }}>{subtitle}</p>}
    </div>
    {count != null && (
      <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 12, color: "var(--syn-text-subtle)", textAlign: "right" }}>
        <div style={{ fontSize: 32, color: "var(--syn-text)", fontWeight: 500 }}>{String(count).padStart(2, "0")}</div>
        <div>tokens</div>
      </div>
    )}
  </div>
);

const Card = ({ children, padding = 20, style, ...rest }) => (
  <div {...rest} style={{
    background: "var(--syn-bg-raised)",
    border: "1px solid var(--syn-border)",
    borderRadius: "var(--syn-radius-lg)",
    padding,
    ...style,
  }}>{children}</div>
);

const TokenRow = ({ name, value, swatch }) => (
  <div style={{
    display: "grid", gridTemplateColumns: "32px 1fr auto", alignItems: "center", gap: 16,
    padding: "12px 16px", borderBottom: "1px solid var(--syn-border)",
    fontFamily: "var(--syn-font-mono)", fontSize: 12,
  }}>
    {swatch || <span/>}
    <span style={{ color: "var(--syn-text)" }}>{name}</span>
    <span style={{ color: "var(--syn-text-muted)" }}>{value}</span>
  </div>
);

// ════════════════════════════════════════════════════════════
// 01 — BRAND
// ════════════════════════════════════════════════════════════

const Logo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <circle cx="12" cy="12" r="6" fill="var(--syn-primary)"/>
    <circle cx="28" cy="12" r="6" fill="none" stroke="var(--syn-text)" strokeWidth="1.5"/>
    <circle cx="20" cy="28" r="6" fill="var(--syn-text)"/>
    <line x1="12" y1="12" x2="28" y2="12" stroke="var(--syn-text)" strokeWidth="1.5"/>
    <line x1="12" y1="12" x2="20" y2="28" stroke="var(--syn-text)" strokeWidth="1.5"/>
    <line x1="28" y1="12" x2="20" y2="28" stroke="var(--syn-text)" strokeWidth="1.5"/>
  </svg>
);

const BrandArtboard = () => (
  <div style={{ padding: 56, background: "var(--syn-bg)", color: "var(--syn-text)", minHeight: 720 }}>
    <SectionTitle idx="01" title="Brand" subtitle="A two-layer component system. Headless logic underneath, token-driven skin on top. The mark reflects this: connected primitives, one composed surface." />

    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32 }}>
      <Card padding={48} style={{ minHeight: 360, display: "flex", flexDirection: "column", justifyContent: "space-between", background: "var(--syn-bg-sunken)" }}>
        <Eyebrow>Primary mark</Eyebrow>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Logo size={88}/>
          <div>
            <div style={{ fontSize: 64, fontWeight: 600, letterSpacing: "var(--syn-tracking-tight)", lineHeight: 1 }}>synerity</div>
            <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 13, color: "var(--syn-text-muted)", marginTop: 8, letterSpacing: "0.04em" }}>v1.0 — react component library</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 32, fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-text-muted)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
          <div><span style={{ color: "var(--syn-primary)" }}>●</span> headless</div>
          <div><span style={{ color: "var(--syn-text)" }}>●</span> tokens</div>
          <div><span style={{ color: "var(--syn-text)" }}>○</span> ui</div>
        </div>
      </Card>

      <div style={{ display: "grid", gap: 16 }}>
        <Card>
          <Eyebrow>Tagline</Eyebrow>
          <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "var(--syn-tracking-snug)", lineHeight: 1.25 }}>
            Logic, tokens, and a skin — three layers, one library. Compose your own design system without forking.
          </div>
        </Card>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {[
            { v: "9", l: "packages" },
            { v: "120+", l: "components" },
            { v: "0", l: "runtime deps" },
          ].map(s => (
            <Card key={s.l} padding={16} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: "var(--syn-tracking-tight)" }}>{s.v}</div>
              <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>{s.l}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 32 }}>
      {[
        { bg: "var(--syn-primary)", fg: "var(--syn-primary-fg)", l: "On primary" },
        { bg: "var(--syn-bg)", fg: "var(--syn-text)", l: "Light", b: true },
        { bg: "var(--syn-n-11)", fg: "var(--syn-n-1)", l: "Dark" },
        { bg: "var(--syn-bg-sunken)", fg: "var(--syn-text)", l: "Sunken", b: true },
      ].map(v => (
        <div key={v.l} style={{
          background: v.bg, color: v.fg, padding: 24, borderRadius: "var(--syn-radius-lg)",
          border: v.b ? "1px solid var(--syn-border)" : "none",
          display: "flex", alignItems: "center", gap: 12, height: 96,
        }}>
          <Logo size={28}/>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: "var(--syn-tracking-tight)" }}>synerity</div>
            <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 10, opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.1em" }}>{v.l}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ════════════════════════════════════════════════════════════
// 02 — COLORS
// ════════════════════════════════════════════════════════════

const Swatch = ({ varName, label, fg }) => {
  const ref = useRef(null);
  const [val, setVal] = useState("");
  useEffect(() => {
    if (ref.current) {
      const cs = getComputedStyle(ref.current);
      setVal(cs.getPropertyValue("background-color").trim());
    }
  }, []);
  return (
    <div ref={ref} style={{
      background: `var(${varName})`, color: fg || "inherit",
      borderRadius: "var(--syn-radius-md)", padding: 14, height: 96,
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      border: "1px solid var(--syn-border)",
      fontFamily: "var(--syn-font-mono)", fontSize: 10,
    }}>
      <div style={{ fontWeight: 500 }}>{label}</div>
      <div style={{ opacity: 0.7, fontSize: 9 }}>{varName}</div>
    </div>
  );
};

const ColorsArtboard = () => {
  const neutrals = Array.from({ length: 13 }, (_, i) => i);
  return (
    <div style={{ padding: 56, background: "var(--syn-bg)", color: "var(--syn-text)", minHeight: 1080 }}>
      <SectionTitle idx="02" title="Color" subtitle="Perceptual oklch ramps. One brand hue, twelve neutrals, four semantic states. Every value redefines under [data-theme=dark] — the same token names, different luminance." count={42}/>

      <Eyebrow>Brand</Eyebrow>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginBottom: 40 }}>
        <Swatch varName="--syn-primary" label="primary" fg="var(--syn-primary-fg)"/>
        <Swatch varName="--syn-primary-hover" label="primary-hover" fg="var(--syn-primary-fg)"/>
        <Swatch varName="--syn-primary-active" label="primary-active" fg="var(--syn-primary-fg)"/>
        <Swatch varName="--syn-primary-subtle" label="primary-subtle"/>
        <Swatch varName="--syn-primary-subtle-hover" label="subtle-hover"/>
        <Swatch varName="--syn-primary-fg" label="primary-fg"/>
      </div>

      <Eyebrow>Neutrals</Eyebrow>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(13, 1fr)", gap: 4, marginBottom: 40, border: "1px solid var(--syn-border)", borderRadius: "var(--syn-radius-md)", padding: 4, background: "var(--syn-bg-sunken)" }}>
        {neutrals.map(n => (
          <div key={n} style={{
            background: `var(--syn-n-${n})`,
            height: 88,
            borderRadius: 4,
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
        ].map(c => (
          <div key={c.l} style={{ borderRadius: "var(--syn-radius-lg)", overflow: "hidden", border: "1px solid var(--syn-border)" }}>
            <div style={{ background: `var(${c.v})`, height: 72, display: "flex", alignItems: "flex-end", padding: 12, color: "white", fontFamily: "var(--syn-font-mono)", fontSize: 11 }}>{c.l}</div>
            <div style={{ background: `var(${c.s})`, height: 48, display: "flex", alignItems: "center", padding: "0 12px", fontFamily: "var(--syn-font-mono)", fontSize: 10, color: "var(--syn-text-muted)" }}>{c.s.replace("--syn-", "")}</div>
          </div>
        ))}
      </div>

      <Eyebrow>Surface · Border · Text</Eyebrow>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        <Card padding={0}>
          <TokenRow name="--syn-bg" value="n-0" swatch={<div style={{ width: 24, height: 24, background: "var(--syn-bg)", border: "1px solid var(--syn-border)", borderRadius: 4 }}/>}/>
          <TokenRow name="--syn-bg-raised" value="n-1" swatch={<div style={{ width: 24, height: 24, background: "var(--syn-bg-raised)", border: "1px solid var(--syn-border)", borderRadius: 4 }}/>}/>
          <TokenRow name="--syn-bg-sunken" value="n-2" swatch={<div style={{ width: 24, height: 24, background: "var(--syn-bg-sunken)", border: "1px solid var(--syn-border)", borderRadius: 4 }}/>}/>
        </Card>
        <Card padding={0}>
          <TokenRow name="--syn-border" value="n-3" swatch={<div style={{ width: 24, height: 24, background: "var(--syn-border)", borderRadius: 4 }}/>}/>
          <TokenRow name="--syn-border-strong" value="n-4" swatch={<div style={{ width: 24, height: 24, background: "var(--syn-border-strong)", borderRadius: 4 }}/>}/>
        </Card>
        <Card padding={0}>
          <TokenRow name="--syn-text" value="n-11" swatch={<div style={{ width: 24, height: 24, background: "var(--syn-text)", borderRadius: 4 }}/>}/>
          <TokenRow name="--syn-text-muted" value="n-7" swatch={<div style={{ width: 24, height: 24, background: "var(--syn-text-muted)", borderRadius: 4 }}/>}/>
          <TokenRow name="--syn-text-subtle" value="n-6" swatch={<div style={{ width: 24, height: 24, background: "var(--syn-text-subtle)", borderRadius: 4 }}/>}/>
        </Card>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════
// 03 — TYPOGRAPHY
// ════════════════════════════════════════════════════════════

const TypeArtboard = () => {
  const sizes = [
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
  return (
    <div style={{ padding: 56, background: "var(--syn-bg)", color: "var(--syn-text)", minHeight: 900 }}>
      <SectionTitle idx="03" title="Type" subtitle="Geist Sans for product. Geist Mono for tokens, code, and metadata. A modular scale tuned for dense UI — short letterforms in headlines, generous leading in body." count={10}/>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 32 }}>
        <div>
          {sizes.map(s => (
            <div key={s.t} style={{
              display: "grid", gridTemplateColumns: "80px 1fr",
              alignItems: "baseline", gap: 24,
              padding: "16px 0", borderBottom: "1px solid var(--syn-border)",
            }}>
              <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-text-muted)" }}>
                <div style={{ color: "var(--syn-text)" }}>text-{s.t}</div>
                <div>{s.v}</div>
              </div>
              <div style={{ fontSize: s.v, fontWeight: s.w, lineHeight: 1.15, letterSpacing: "var(--syn-tracking-tight)" }}>{s.sample}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
          <Card>
            <Eyebrow>Family — Sans</Eyebrow>
            <div style={{ fontSize: 56, fontWeight: 500, letterSpacing: "var(--syn-tracking-tight)", lineHeight: 1 }}>Aa</div>
            <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-text-muted)", marginTop: 16 }}>Geist Sans · 400 / 500 / 600 / 700</div>
            <div style={{ marginTop: 12, fontSize: 14, color: "var(--syn-text-muted)", letterSpacing: "var(--syn-tracking-snug)" }}>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>
              abcdefghijklmnopqrstuvwxyz<br/>
              0123456789 — • → ← ↑ ↓
            </div>
          </Card>
          <Card>
            <Eyebrow accent="var(--syn-text)">Family — Mono</Eyebrow>
            <div style={{ fontSize: 56, fontFamily: "var(--syn-font-mono)", fontWeight: 500, letterSpacing: "0.04em", lineHeight: 1 }}>Aa</div>
            <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-text-muted)", marginTop: 16 }}>Geist Mono · 400 / 500 / 600</div>
            <div style={{ marginTop: 12, fontFamily: "var(--syn-font-mono)", fontSize: 12, color: "var(--syn-text-muted)" }}>
              const tokens = {`{`}<br/>
              &nbsp;&nbsp;color: 'oklch(...)',<br/>
              &nbsp;&nbsp;space: [0,4,8,12]<br/>
              {`}`}
            </div>
          </Card>
          <Card>
            <Eyebrow>Weights</Eyebrow>
            {[
              { w: 400, l: "Regular" },
              { w: 500, l: "Medium" },
              { w: 600, l: "Semibold" },
              { w: 700, l: "Bold" },
            ].map(w => (
              <div key={w.w} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "8px 0", borderBottom: "1px solid var(--syn-border)" }}>
                <span style={{ fontSize: 18, fontWeight: w.w }}>{w.l}</span>
                <Mono style={{ color: "var(--syn-text-muted)" }}>{w.w}</Mono>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════
// 04 — SPACING / RADIUS / SHADOW
// ════════════════════════════════════════════════════════════

const SpacingArtboard = () => {
  const space = [0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24];
  const radii = [
    { n: "none", v: "0" },
    { n: "sm", v: "4px" },
    { n: "md", v: "6px" },
    { n: "lg", v: "8px" },
    { n: "xl", v: "12px" },
    { n: "2xl", v: "16px" },
    { n: "full", v: "9999" },
  ];
  const shadows = ["xs", "sm", "md", "lg", "xl"];
  return (
    <div style={{ padding: 56, background: "var(--syn-bg)", color: "var(--syn-text)", minHeight: 900 }}>
      <SectionTitle idx="04" title="Spacing · Radius · Shadow" subtitle="A 4px base grid. Radius scales with the global radius-scale token (try the Tweaks panel). Five elevation steps from subtle hairline to modal lift." count={27}/>

      <Eyebrow>Spacing scale — 4px base</Eyebrow>
      <Card padding={24} style={{ marginBottom: 40 }}>
        <div style={{ display: "grid", gap: 8 }}>
          {space.map(n => (
            <div key={n} style={{ display: "grid", gridTemplateColumns: "60px 80px 1fr", alignItems: "center", gap: 16 }}>
              <Mono style={{ color: "var(--syn-text-muted)" }}>space-{String(n).replace(".", "-")}</Mono>
              <Mono style={{ color: "var(--syn-text-muted)" }}>{n * 4}px</Mono>
              <div style={{ height: 16, width: `${n * 4}px`, background: "var(--syn-primary)", borderRadius: 2 }}/>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <div>
          <Eyebrow>Radius</Eyebrow>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {radii.map(r => (
              <div key={r.n} style={{ textAlign: "center" }}>
                <div style={{
                  height: 80, width: "100%",
                  background: "var(--syn-primary-subtle)",
                  border: "1px solid var(--syn-primary)",
                  borderRadius: `var(--syn-radius-${r.n})`,
                  marginBottom: 8,
                }}/>
                <Mono style={{ color: "var(--syn-text)", fontSize: 11 }}>{r.n}</Mono>
                <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 10, color: "var(--syn-text-muted)" }}>{r.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Eyebrow>Shadow / elevation</Eyebrow>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, padding: 24, background: "var(--syn-bg-sunken)", borderRadius: "var(--syn-radius-lg)" }}>
            {shadows.map(s => (
              <div key={s} style={{ textAlign: "center" }}>
                <div style={{
                  height: 80, background: "var(--syn-bg-raised)",
                  border: "1px solid var(--syn-border)",
                  borderRadius: "var(--syn-radius-md)",
                  boxShadow: `var(--syn-shadow-${s})`,
                  marginBottom: 8,
                }}/>
                <Mono style={{ fontSize: 11 }}>shadow-{s}</Mono>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════
// 05 — ICONS
// ════════════════════════════════════════════════════════════

const Icon = ({ d, size = 20, fill, stroke = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || "none"} stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);

const ICONS = {
  ArrowRight: <path d="M5 12h14M13 5l7 7-7 7"/>,
  ArrowLeft: <path d="M19 12H5M11 5l-7 7 7 7"/>,
  ChevronDown: <polyline points="6 9 12 15 18 9"/>,
  ChevronRight: <polyline points="9 6 15 12 9 18"/>,
  Plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
  Minus: <line x1="5" y1="12" x2="19" y2="12"/>,
  X: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
  Check: <polyline points="20 6 9 17 4 12"/>,
  Search: <><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
  Settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
  User: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
  Bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
  Mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
  Heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>,
  Star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
  Trash: <><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></>,
  Edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
  Download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
  Upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>,
  Filter: <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>,
  Calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
  Lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
  Globe: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
  Code: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
  AlertCircle: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
  Info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
  Sun: <><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></>,
  Moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>,
  Folder: <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>,
  File: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>,
  Copy: <><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>,
  Refresh: <><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></>,
  Menu: <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>,
  Home: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
  Bookmark: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>,
  Tag: <><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>,
  ExternalLink: <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>,
  Zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
  Database: <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>,
};

const IconsArtboard = () => (
  <div style={{ padding: 56, background: "var(--syn-bg)", color: "var(--syn-text)", minHeight: 720 }}>
    <SectionTitle idx="05" title="Iconography" subtitle="Outline at 1.6 stroke, 24×24 viewbox, currentColor everywhere. Tree-shakeable named exports — bring in only what you render." count={Object.keys(ICONS).length}/>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 4, border: "1px solid var(--syn-border)", borderRadius: "var(--syn-radius-lg)", padding: 4, background: "var(--syn-bg-sunken)" }}>
      {Object.entries(ICONS).map(([name, d]) => (
        <div key={name} style={{
          background: "var(--syn-bg-raised)",
          padding: 18,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
          borderRadius: "var(--syn-radius-md)",
          transition: "background var(--syn-dur-fast) var(--syn-ease)",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "var(--syn-primary-subtle)"}
        onMouseLeave={e => e.currentTarget.style.background = "var(--syn-bg-raised)"}>
          <Icon d={d} size={24}/>
          <Mono style={{ fontSize: 10, color: "var(--syn-text-muted)" }}>{name}</Mono>
        </div>
      ))}
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 32 }}>
      {[12, 16, 20, 24].map(s => (
        <Card key={s} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Icon d={ICONS.Star} size={s}/>
          <Mono style={{ color: "var(--syn-text-muted)" }}>size={s}</Mono>
        </Card>
      ))}
    </div>
  </div>
);

window.SynA = { Mono, Eyebrow, SectionTitle, Card, TokenRow, Logo, Icon, ICONS, BrandArtboard, ColorsArtboard, TypeArtboard, SpacingArtboard, IconsArtboard };
