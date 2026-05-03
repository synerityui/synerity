import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = { title: "Getting started" };

function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", margin: "40px 0 12px" }}>{children}</h2>;
}
function H3({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontSize: 16, fontWeight: 600, margin: "28px 0 8px" }}>{children}</h3>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p style={{ color: "var(--syn-text-muted)", lineHeight: 1.7, marginBottom: 16 }}>{children}</p>;
}

export default function GettingStartedPage() {
  return (
    <>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
          Getting started
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 12 }}>Installation</h1>
        <p style={{ fontSize: 16, color: "var(--syn-text-muted)", lineHeight: 1.65 }}>
          Get up and running in under two minutes. Pick the installation path that suits your project.
        </p>
      </div>

      <H2>Option 1 — npm package</H2>
      <P>The fastest way to start. Install the UI package and import the token stylesheet.</P>
      <CodeBlock lang="bash" code="npm install @synerity/ui" />
      <div style={{ marginTop: 16 }} />
      <CodeBlock code={`// In your root layout or entry point
import '@synerity/tokens/css'

// Then use components anywhere
import { Button, Input, Modal } from '@synerity/ui'

export default function App() {
  return <Button variant="solid">Get started</Button>
}`} />

      <H2>Option 2 — Headless only</H2>
      <P>Bring your own styles. Install only the logic and accessibility primitives.</P>
      <CodeBlock lang="bash" code="npm install @synerity/headless" />
      <div style={{ marginTop: 16 }} />
      <CodeBlock code={`import { useButton } from '@synerity/headless'

function MyButton({ children, ...props }) {
  const { buttonProps } = useButton(props)
  return (
    <button {...buttonProps} className="your-custom-class">
      {children}
    </button>
  )
}`} />

      <H2>Option 3 — Copy-paste (shadcn-style)</H2>
      <P>Own the source. No npm update required — files are copied directly into your project.</P>
      <CodeBlock lang="bash" code={`# Initialise config (run once)
npx synerity init

# Add individual components
npx synerity add button
npx synerity add button modal input table

# Add everything
npx synerity add --all`} />

      <H2>Dark mode</H2>
      <P>Dark mode is driven entirely by CSS. Set data-theme="dark" on the root element to switch.</P>
      <CodeBlock code={`// Toggle on the document root
document.documentElement.setAttribute('data-theme', 'dark')

// Or in React
<html data-theme={theme}>
  ...
</html>`} />

      <H2>TypeScript</H2>
      <P>All packages ship full TypeScript definitions. No @types/* packages needed. Strict mode compatible.</P>
      <CodeBlock code={`import type { ButtonProps } from '@synerity/ui'

// All props are fully typed with generics and overloads
const MyButton = (props: ButtonProps) => <Button {...props} />`} />

      <H2>Requirements</H2>
      <div style={{
        display: "grid", gap: 8, marginTop: 4,
        fontFamily: "var(--syn-font-mono)", fontSize: 13,
      }}>
        {[
          { label: "React", value: "18.0+" },
          { label: "Node.js", value: "18.0+ (CLI and SSR)" },
          { label: "TypeScript", value: "5.0+" },
          { label: "Browsers", value: "Chrome, Firefox, Safari, Edge (last 2 versions)" },
        ].map(({ label, value }) => (
          <div key={label} style={{
            display: "flex", justifyContent: "space-between",
            padding: "10px 16px", background: "var(--syn-bg-raised)",
            border: "1px solid var(--syn-border)", borderRadius: "var(--syn-radius-md)",
          }}>
            <span style={{ color: "var(--syn-text-muted)" }}>{label}</span>
            <span style={{ color: "var(--syn-text)" }}>{value}</span>
          </div>
        ))}
      </div>

      <H2>Next steps</H2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 8 }}>
        {[
          { href: "/docs/tokens", title: "Design tokens", desc: "Learn how to theme with CSS custom properties." },
          { href: "/docs/components", title: "Components", desc: "Browse all 18 ready-to-use UI components." },
          { href: "/docs/theming", title: "Theming", desc: "Customize colors, radius, and fonts globally." },
          { href: "/docs/accessibility", title: "Accessibility", desc: "WCAG 2.1 AA patterns and keyboard nav guide." },
        ].map(({ href, title, desc }) => (
          <a key={href} href={href} style={{
            padding: 20, borderRadius: "var(--syn-radius-lg)",
            background: "var(--syn-bg-raised)", border: "1px solid var(--syn-border)",
            textDecoration: "none", display: "block",
          }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>{title}</div>
            <div style={{ fontSize: 13, color: "var(--syn-text-muted)" }}>{desc}</div>
          </a>
        ))}
      </div>
    </>
  );
}
