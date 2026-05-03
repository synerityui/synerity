import type { Metadata } from "next";
import Link from "next/link";
import { components } from "@/lib/components";

export const metadata: Metadata = { title: "Components" };

const CATEGORIES = ["Inputs & Controls", "Feedback & Display", "Overlays", "Navigation", "Layout", "Typography"];

export default function ComponentsIndexPage() {
  return (
    <>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
          Components
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 12 }}>
          {components.length} components
        </h1>
        <p style={{ fontSize: 16, color: "var(--syn-text-muted)", lineHeight: 1.65 }}>
          All components are accessible, dark-mode ready, and ship with full TypeScript types.
          Import from <code style={{ fontFamily: "var(--syn-font-mono)", fontSize: 14, color: "var(--syn-primary)" }}>@synerity/ui</code>.
        </p>
      </div>

      {CATEGORIES.map((cat) => {
        const items = components.filter((c) => c.category === cat);
        if (items.length === 0) return null;
        return (
          <div key={cat} style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, fontFamily: "var(--syn-font-mono)", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--syn-text-muted)", marginBottom: 12 }}>
              {cat}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
              {items.map((c) => (
                <Link key={c.slug} href={`/docs/components/${c.slug}`} className="hover-primary-border" style={{
                  padding: "14px 18px", borderRadius: "var(--syn-radius-lg)",
                  background: "var(--syn-bg-raised)", border: "1px solid var(--syn-border)",
                  textDecoration: "none", display: "block",
                  transition: "border-color 120ms ease, box-shadow 120ms ease",
                }}
                >
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: "var(--syn-text-muted)", lineHeight: 1.45, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {c.description}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
