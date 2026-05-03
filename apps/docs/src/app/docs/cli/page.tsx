import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = { title: "@synerity/cli" };

const COMMANDS = [
  { cmd: "npx synerity init", desc: "Scaffolds synerity.config.json in the project root. Run this once before adding components." },
  { cmd: "npx synerity add <component>", desc: "Copies one component's source files into your configured outputDir." },
  { cmd: "npx synerity add <c1> <c2> …", desc: "Copies multiple components in a single command." },
  { cmd: "npx synerity add --all", desc: "Copies every available component into your project." },
  { cmd: "npx synerity list", desc: "Lists all available components with their file counts and npm dependencies." },
  { cmd: "npx synerity --help", desc: "Prints full command reference." },
];

export default function CliPage() {
  return (
    <>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
          Packages
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 12 }}>@synerity/cli</h1>
        <p style={{ fontSize: 16, color: "var(--syn-text-muted)", lineHeight: 1.65 }}>
          A shadcn-style copy-paste installer. Components are copied directly into your project — you own the source, no{" "}
          <code style={{ fontFamily: "var(--syn-font-mono)", fontSize: 14 }}>npm update</code> required.
        </p>
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 12 }}>Quick start</h2>
      <CodeBlock lang="bash" code={`# 1. Initialise config
npx synerity init

# 2. Add components
npx synerity add button
npx synerity add button modal input table

# 3. Import from your outputDir
import { Button } from './components/ui/Button'`} />

      <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: "40px 0 16px" }}>Commands</h2>
      <div style={{ display: "grid", gap: 10 }}>
        {COMMANDS.map(({ cmd, desc }) => (
          <div key={cmd} style={{
            padding: "14px 20px", borderRadius: "var(--syn-radius-lg)",
            background: "var(--syn-bg-raised)", border: "1px solid var(--syn-border)",
          }}>
            <code style={{ fontFamily: "var(--syn-font-mono)", fontSize: 13, color: "var(--syn-primary)", display: "block", marginBottom: 4 }}>{cmd}</code>
            <div style={{ fontSize: 13, color: "var(--syn-text-muted)" }}>{desc}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: "40px 0 12px" }}>Configuration</h2>
      <p style={{ color: "var(--syn-text-muted)", fontSize: 14, lineHeight: 1.65, marginBottom: 16 }}>
        <code style={{ fontFamily: "var(--syn-font-mono)" }}>npx synerity init</code> creates this file. Edit it to match your project structure.
      </p>
      <CodeBlock lang="json" code={`// synerity.config.json
{
  "outputDir": "src/components/ui",
  "typescript": true,
  "cssModules": true
}`} />

      <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: "40px 0 12px" }}>How it works</h2>
      <div style={{ display: "grid", gap: 10 }}>
        {[
          { step: "1", title: "Resolve dependencies", desc: "The CLI reads the embedded component registry and resolves transitive component dependencies." },
          { step: "2", title: "Check for conflicts", desc: "If target files already exist you are prompted to overwrite or skip each one." },
          { step: "3", title: "Copy files", desc: "Component TSX and CSS Module files are written to your outputDir." },
          { step: "4", title: "Print next steps", desc: "The CLI prints the exact npm install command for any required peer dependencies." },
        ].map(({ step, title, desc }) => (
          <div key={step} style={{ display: "grid", gridTemplateColumns: "36px 1fr", gap: 16, padding: "14px 20px", background: "var(--syn-bg-raised)", border: "1px solid var(--syn-border)", borderRadius: "var(--syn-radius-lg)" }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "var(--syn-primary-subtle)", color: "var(--syn-primary)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--syn-font-mono)", fontSize: 12, fontWeight: 700, flexShrink: 0,
            }}>{step}</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{title}</div>
              <div style={{ fontSize: 13, color: "var(--syn-text-muted)" }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
