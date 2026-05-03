"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { components } from "@/lib/components";

const NAV = [
  {
    label: "Getting started",
    items: [
      { href: "/docs/getting-started", label: "Installation" },
      { href: "/docs/theming", label: "Theming" },
      { href: "/docs/accessibility", label: "Accessibility" },
    ],
  },
  {
    label: "Foundation",
    items: [
      { href: "/docs/tokens", label: "Design tokens" },
      { href: "/docs/icons", label: "Icons" },
    ],
  },
  {
    label: "Packages",
    items: [
      { href: "/docs/forms", label: "@synerity/forms" },
      { href: "/docs/cli", label: "@synerity/cli" },
      { href: "/docs/memory-graph", label: "@synerity/memory-graph" },
    ],
  },
  {
    label: "Components",
    items: components.map((c) => ({ href: `/docs/components/${c.slug}`, label: c.name })),
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: 240, flexShrink: 0,
      borderRight: "1px solid var(--syn-border)",
      padding: "24px 0",
      overflowY: "auto",
      position: "sticky", top: 60, height: "calc(100vh - 60px)",
    }}>
      {NAV.map((section) => (
        <div key={section.label} style={{ marginBottom: 24 }}>
          <div style={{
            padding: "4px 20px 8px",
            fontFamily: "var(--syn-font-mono)", fontSize: 10,
            fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
            color: "var(--syn-text-subtle)",
          }}>
            {section.label}
          </div>
          {section.items.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} style={{
                display: "block", padding: "6px 20px",
                fontSize: 13, fontWeight: active ? 500 : 400,
                color: active ? "var(--syn-primary)" : "var(--syn-text-muted)",
                background: active ? "var(--syn-primary-subtle)" : "transparent",
                borderLeft: `2px solid ${active ? "var(--syn-primary)" : "transparent"}`,
                textDecoration: "none",
                transition: "color 120ms ease, background 120ms ease",
              }}>
                {label}
              </Link>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
