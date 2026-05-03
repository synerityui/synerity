import Link from "next/link";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      height: 60, display: "flex", alignItems: "center",
      padding: "0 24px", gap: 24,
      background: "var(--syn-bg)",
      borderBottom: "1px solid var(--syn-border)",
      backdropFilter: "blur(8px)",
    }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit" }}>
        <Logo size={26} />
        <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: "-0.02em" }}>Synerity</span>
        <span style={{
          fontSize: 10, fontFamily: "var(--syn-font-mono)", letterSpacing: "0.08em",
          textTransform: "uppercase", color: "var(--syn-primary)",
          background: "var(--syn-primary-subtle)", padding: "2px 6px",
          borderRadius: "var(--syn-radius-full)",
        }}>v1.0</span>
      </Link>

      <nav style={{ display: "flex", gap: 4, marginLeft: "auto" }}>
        {[
          { href: "/docs/getting-started", label: "Docs" },
          { href: "/docs/components", label: "Components" },
          { href: "/docs/icons", label: "Icons" },
        ].map(({ href, label }) => (
          <Link key={href} href={href} className="hover-text" style={{
            padding: "6px 12px", fontSize: 14, fontWeight: 500,
            color: "var(--syn-text-muted)", borderRadius: "var(--syn-radius-md)",
            transition: "color 120ms ease",
          }}>
            {label}
          </Link>
        ))}
      </nav>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <ThemeToggle />
        <a
          href="https://github.com/synerityui/synerity"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          style={{
            width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid var(--syn-border)", borderRadius: "var(--syn-radius-md)",
            color: "var(--syn-text-muted)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>
      </div>
    </header>
  );
}
