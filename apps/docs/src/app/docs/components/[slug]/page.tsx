import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { components, componentBySlug } from "@/lib/components";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const c = componentBySlug[params.slug];
  return { title: c?.name ?? "Component" };
}

export default function ComponentPage({ params }: Props) {
  const c = componentBySlug[params.slug];
  if (!c) notFound();

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 24, fontSize: 13, color: "var(--syn-text-muted)" }}>
        <Link href="/docs/components" style={{ color: "var(--syn-text-muted)", textDecoration: "none" }}>Components</Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
        <span style={{ color: "var(--syn-text)" }}>{c.name}</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: 0 }}>{c.name}</h1>
          <span style={{
            fontFamily: "var(--syn-font-mono)", fontSize: 11,
            background: "var(--syn-bg-sunken)", border: "1px solid var(--syn-border)",
            padding: "3px 8px", borderRadius: "var(--syn-radius-full)",
            color: "var(--syn-text-muted)",
          }}>{c.category}</span>
        </div>
        <p style={{ fontSize: 16, color: "var(--syn-text-muted)", lineHeight: 1.65, maxWidth: 600 }}>{c.description}</p>
      </div>

      {/* Import */}
      <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 12 }}>Import</h2>
      <CodeBlock code={`import { ${c.name} } from '@synerity/ui'`} />

      {/* Examples */}
      <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: "40px 0 16px" }}>Examples</h2>
      <div style={{ display: "grid", gap: 24 }}>
        {c.examples.map((ex) => (
          <div key={ex.title}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: "var(--syn-text-muted)" }}>{ex.title}</div>
            <CodeBlock code={ex.code} />
          </div>
        ))}
      </div>

      {/* Props */}
      <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: "40px 0 16px" }}>Props</h2>
      <PropsTable props={c.props} />

      {/* Accessibility */}
      {(c.aria || c.keyboard) && (
        <>
          <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: "40px 0 16px" }}>Accessibility</h2>
          <div style={{ display: "grid", gap: 16 }}>
            {c.aria && (
              <div style={{ padding: 20, background: "var(--syn-bg-raised)", border: "1px solid var(--syn-border)", borderRadius: "var(--syn-radius-lg)" }}>
                <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--syn-text-muted)", marginBottom: 10, fontFamily: "var(--syn-font-mono)" }}>
                  ARIA
                </div>
                <ul style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 4 }}>
                  {c.aria.map((a) => (
                    <li key={a} style={{ fontSize: 13, color: "var(--syn-text-muted)" }}>
                      <code style={{ fontFamily: "var(--syn-font-mono)", fontSize: 12, color: "var(--syn-text)" }}>{a}</code>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {c.keyboard && (
              <div style={{ border: "1px solid var(--syn-border)", borderRadius: "var(--syn-radius-lg)", overflow: "hidden" }}>
                <div style={{ padding: "10px 16px", background: "var(--syn-bg-sunken)", borderBottom: "1px solid var(--syn-border)", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--syn-text-muted)", fontFamily: "var(--syn-font-mono)" }}>
                  Keyboard
                </div>
                {c.keyboard.map((k, i) => (
                  <div key={k.key} style={{
                    display: "grid", gridTemplateColumns: "160px 1fr",
                    padding: "10px 16px", background: "var(--syn-bg-raised)",
                    borderBottom: i < c.keyboard!.length - 1 ? "1px solid var(--syn-border)" : "none",
                  }}>
                    <code style={{ fontFamily: "var(--syn-font-mono)", fontSize: 12, color: "var(--syn-primary)" }}>{k.key}</code>
                    <span style={{ fontSize: 13, color: "var(--syn-text-muted)" }}>{k.action}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
