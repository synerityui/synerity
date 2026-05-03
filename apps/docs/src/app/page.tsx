import Link from "next/link";
import { Logo } from "@/components/Logo";

const FEATURES = [
  { icon: "◈", title: "Zero-runtime CSS", body: "CSS Modules throughout — no Emotion, no styled-components. Zero JS for styling." },
  { icon: "⬡", title: "RSC compatible", body: "No use client for styling. Every component renders server-side without wrappers." },
  { icon: "◻", title: "WCAG 2.1 AA", body: "Verified, not just claimed. ARIA Authoring Practices Guide keyboard patterns throughout." },
  { icon: "◈", title: "Strict TypeScript", body: "No any, no @ts-ignore. Full prop inference including polymorphic as prop." },
  { icon: "⬡", title: "Design tokens", body: "Override --synerity-color-primary and the entire library repaints. No JS config." },
  { icon: "◻", title: "Copy-paste CLI", body: "npx synerity add button — own the code, skip the npm update treadmill." },
];

const PACKAGES = [
  { name: "@synerity/ui", desc: "18 polished components", href: "/docs/components" },
  { name: "@synerity/headless", desc: "Logic & a11y hooks, zero CSS", href: "/docs/getting-started" },
  { name: "@synerity/tokens", desc: "CSS custom property system", href: "/docs/tokens" },
  { name: "@synerity/icons", desc: "75 tree-shakeable icons", href: "/docs/icons" },
  { name: "@synerity/forms", desc: "Form engine + Zod validation", href: "/docs/forms" },
  { name: "@synerity/memory-graph", desc: "LLM context graph, zero deps", href: "/docs/memory-graph" },
  { name: "@synerity/cli", desc: "shadcn-style installer", href: "/docs/cli" },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section style={{
        padding: "96px 24px 80px",
        maxWidth: 760, margin: "0 auto", textAlign: "center",
      }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
          <Logo size={56} />
        </div>
        <h1 style={{
          fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 700,
          letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 20,
        }}>
          Headless by design.<br />Beautiful by default.
        </h1>
        <p style={{
          fontSize: 18, color: "var(--syn-text-muted)", lineHeight: 1.65,
          maxWidth: 560, margin: "0 auto 40px",
        }}>
          A React UI library that doesn't make you choose between RSC compatibility,
          zero-runtime CSS, WCAG accessibility, strict TypeScript, and painless theming.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/docs/getting-started" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "10px 22px", borderRadius: "var(--syn-radius-md)",
            background: "var(--syn-primary)", color: "var(--syn-primary-fg)",
            fontWeight: 600, fontSize: 14, textDecoration: "none",
          }}>
            Get started
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/docs/components" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "10px 22px", borderRadius: "var(--syn-radius-md)",
            background: "transparent", border: "1px solid var(--syn-border)",
            color: "var(--syn-text)", fontWeight: 500, fontSize: 14, textDecoration: "none",
          }}>
            Browse components
          </Link>
        </div>

        {/* Install snippet */}
        <div style={{
          marginTop: 48, padding: "12px 20px",
          background: "var(--syn-bg-raised)", border: "1px solid var(--syn-border)",
          borderRadius: "var(--syn-radius-lg)", display: "inline-flex",
          alignItems: "center", gap: 12, fontSize: 13,
          fontFamily: "var(--syn-font-mono)",
        }}>
          <span style={{ color: "var(--syn-text-subtle)", userSelect: "none" }}>$</span>
          <span>npm install <span style={{ color: "var(--syn-primary)" }}>@synerity/ui</span></span>
        </div>
      </section>

      {/* Feature grid */}
      <section style={{
        padding: "0 24px 96px",
        maxWidth: 1040, margin: "0 auto",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}>
          {FEATURES.map((f) => (
            <div key={f.title} style={{
              padding: 24,
              background: "var(--syn-bg-raised)",
              border: "1px solid var(--syn-border)",
              borderRadius: "var(--syn-radius-xl)",
            }}>
              <div style={{
                width: 36, height: 36, marginBottom: 14,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "var(--syn-primary-subtle)", borderRadius: "var(--syn-radius-md)",
                color: "var(--syn-primary)", fontSize: 16,
              }}>
                {f.icon}
              </div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: "var(--syn-text-muted)", lineHeight: 1.6 }}>{f.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section style={{
        borderTop: "1px solid var(--syn-border)",
        padding: "80px 24px", maxWidth: 1040, margin: "0 auto",
      }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 8 }}>
          Seven packages, one system
        </h2>
        <p style={{ fontSize: 15, color: "var(--syn-text-muted)", marginBottom: 40, maxWidth: 540 }}>
          Use as much or as little as you need. Every package is independently installable.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
          {PACKAGES.map((p) => (
            <Link key={p.name} href={p.href} style={{
              display: "block", padding: "16px 20px",
              background: "var(--syn-bg-raised)", border: "1px solid var(--syn-border)",
              borderRadius: "var(--syn-radius-lg)", textDecoration: "none",
              transition: "border-color 150ms ease, box-shadow 150ms ease",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--syn-primary)";
                e.currentTarget.style.boxShadow = "var(--syn-shadow-md)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--syn-border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 12, color: "var(--syn-primary)", marginBottom: 4 }}>
                {p.name}
              </div>
              <div style={{ fontSize: 13, color: "var(--syn-text-muted)" }}>{p.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick start code */}
      <section style={{
        borderTop: "1px solid var(--syn-border)",
        padding: "80px 24px", background: "var(--syn-bg-sunken)",
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 8 }}>
            Three ways to use Synerity
          </h2>
          <p style={{ fontSize: 15, color: "var(--syn-text-muted)", marginBottom: 40 }}>
            Pick the distribution model that fits your project.
          </p>
          <div style={{ display: "grid", gap: 16 }}>
            {[
              {
                label: "npm package",
                code: `import { Button, Input, Modal } from '@synerity/ui'\nimport '@synerity/tokens/css'\n\n<Button variant="solid">Get started</Button>`,
              },
              {
                label: "Headless only",
                code: `import { useButton } from '@synerity/headless'\n\nfunction MyButton(props) {\n  const { buttonProps } = useButton(props)\n  return <button {...buttonProps} className="your-css" />\n}`,
              },
              {
                label: "Copy-paste (shadcn-style)",
                code: `npx synerity add button modal input\n# → copies source into src/components/ui/`,
              },
            ].map(({ label, code }) => (
              <div key={label} style={{
                borderRadius: "var(--syn-radius-lg)", overflow: "hidden",
                border: "1px solid var(--syn-border)",
              }}>
                <div style={{
                  padding: "8px 16px", background: "var(--syn-bg-raised)",
                  borderBottom: "1px solid var(--syn-border)",
                  fontFamily: "var(--syn-font-mono)", fontSize: 11,
                  color: "var(--syn-text-subtle)", textTransform: "uppercase", letterSpacing: "0.08em",
                }}>
                  {label}
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
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid var(--syn-border)",
        padding: "32px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo size={20} />
          <span style={{ fontSize: 13, color: "var(--syn-text-muted)" }}>
            MIT © 2026 Synerity Labs
          </span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { href: "/docs/getting-started", label: "Docs" },
            { href: "https://github.com/synerityui/synerity", label: "GitHub" },
          ].map(({ href, label }) => (
            <a key={label} href={href} style={{ fontSize: 13, color: "var(--syn-text-muted)", textDecoration: "none" }}>
              {label}
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}
