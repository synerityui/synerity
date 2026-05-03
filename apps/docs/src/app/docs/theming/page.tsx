import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = { title: "Theming" };

export default function ThemingPage() {
  return (
    <>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
          Getting started
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 12 }}>Theming</h1>
        <p style={{ fontSize: 16, color: "var(--syn-text-muted)", lineHeight: 1.65 }}>
          Re-skin the entire library by overriding CSS custom properties. No JS config, no build step, no runtime cost.
        </p>
      </div>

      {[
        {
          title: "Changing the primary color",
          desc: "Override the primary ramp to apply your brand color everywhere — buttons, focus rings, badges, links.",
          code: `:root {
  --synerity-color-primary:        oklch(0.60 0.18 250);  /* indigo */
  --synerity-color-primary-hover:  oklch(0.54 0.19 250);
  --synerity-color-primary-active: oklch(0.48 0.20 250);
  --synerity-color-primary-subtle: oklch(0.96 0.04 250);
  --synerity-color-text-on-primary: #fff;

  /* Dark mode overrides */
}
[data-theme="dark"] {
  --synerity-color-primary:       oklch(0.70 0.16 250);
  --synerity-color-primary-subtle: oklch(0.22 0.07 250);
}`,
        },
        {
          title: "Changing typography",
          desc: "Swap the font family globally. The mono stack is used for code, token labels, and metadata.",
          code: `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');

:root {
  --synerity-font-sans: 'Outfit', system-ui, sans-serif;
  --synerity-font-mono: 'JetBrains Mono', ui-monospace, monospace;
}`,
        },
        {
          title: "Adjusting border radius",
          desc: "Change the global radius scale to make components sharper or rounder.",
          code: `:root {
  /* Sharper — more utilitarian */
  --synerity-radius-sm: 2px;
  --synerity-radius-md: 4px;
  --synerity-radius-lg: 6px;
  --synerity-radius-xl: 8px;
}

/* or for a rounder look: */
:root {
  --synerity-radius-sm: 6px;
  --synerity-radius-md: 10px;
  --synerity-radius-lg: 14px;
  --synerity-radius-xl: 20px;
}`,
        },
        {
          title: "Dark mode",
          desc: "Toggle data-theme on the root element. All tokens redefine automatically.",
          code: `// React
function App() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme', dark ? 'dark' : 'light'
    )
  }, [dark])

  return <button onClick={() => setDark(d => !d)}>Toggle</button>
}

// Next.js App Router — in layout.tsx
<html data-theme={resolvedTheme}>`,
        },
        {
          title: "Scoped themes",
          desc: "Apply a different theme to a subtree by setting data-theme on any ancestor element.",
          code: `/* Apply dark theme to just one section */
<div data-theme="dark">
  <Card>This renders in dark mode regardless of the page theme.</Card>
</div>`,
          lang: "tsx",
        },
      ].map(({ title, desc, code, lang }) => (
        <div key={title} style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 8 }}>{title}</h2>
          <p style={{ color: "var(--syn-text-muted)", lineHeight: 1.7, marginBottom: 16 }}>{desc}</p>
          <CodeBlock code={code} lang={lang ?? "css"} />
        </div>
      ))}
    </>
  );
}
