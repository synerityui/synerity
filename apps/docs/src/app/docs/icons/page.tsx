import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = { title: "Icons" };

const CATEGORIES = [
  { label: "Navigation", icons: ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "ChevronLeft", "ChevronRight", "ChevronUp", "ChevronDown", "ExternalLink", "Home", "Menu", "X", "MoreHorizontal", "MoreVertical"] },
  { label: "Actions", icons: ["Copy", "Cut", "Paste", "Download", "Upload", "Share", "Edit", "Trash", "Plus", "Minus", "Search", "Filter", "Sort", "Refresh", "Settings", "Sliders"] },
  { label: "Status", icons: ["Check", "CheckCircle", "AlertCircle", "AlertTriangle", "Info", "XCircle", "Clock", "Loader"] },
  { label: "Media", icons: ["Play", "Pause", "Stop", "VolumeX", "Volume2", "Maximize", "Minimize"] },
  { label: "Files & Data", icons: ["File", "FileText", "Folder", "FolderOpen", "Image", "Code", "Database", "Table"] },
  { label: "Communication", icons: ["Mail", "Bell", "BellOff", "MessageSquare", "Phone"] },
  { label: "User", icons: ["User", "Users", "LogIn", "LogOut", "Lock", "Unlock", "Shield", "Key"] },
  { label: "Misc", icons: ["Star", "Heart", "Bookmark", "Tag", "Globe", "Map", "Calendar", "Sun", "Moon"] },
];

const TOTAL = CATEGORIES.reduce((sum, c) => sum + c.icons.length, 0);

export default function IconsPage() {
  return (
    <>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
          Foundation
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 12 }}>Icons</h1>
        <p style={{ fontSize: 16, color: "var(--syn-text-muted)", lineHeight: 1.65 }}>
          {TOTAL} outline icons at 1.6 stroke weight, 24×24 viewbox. All use <code style={{ fontFamily: "var(--syn-font-mono)", fontSize: 14 }}>currentColor</code> — they inherit the text color of their container. Fully tree-shakeable.
        </p>
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 12 }}>Installation</h2>
      <CodeBlock lang="bash" code="npm install @synerity/icons" />

      <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: "32px 0 12px" }}>Usage</h2>
      <CodeBlock code={`import { Download, Check, AlertCircle } from '@synerity/icons'

// Basic — inherits text color
<Download size={20} />

// Accessible — add aria-label for meaningful icons
<AlertCircle size={20} aria-label="Error" aria-hidden={false} />

// With a button
<button>
  <Download size={16} />
  Download
</button>`} />

      <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: "32px 0 12px" }}>Size prop</h2>
      <CodeBlock code={`// size maps to both width and height
<Star size={12} />   // small — inline text
<Star size={16} />   // default for UI controls
<Star size={20} />   // default when used alone
<Star size={24} />   // large display icons`} />

      <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: "40px 0 16px" }}>All icons</h2>
      {CATEGORIES.map((cat) => (
        <div key={cat.label} style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 12, fontWeight: 600, fontFamily: "var(--syn-font-mono)", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--syn-text-muted)", marginBottom: 12 }}>
            {cat.label} — {cat.icons.length} icons
          </h3>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
            gap: 4, padding: 4, background: "var(--syn-bg-sunken)",
            border: "1px solid var(--syn-border)", borderRadius: "var(--syn-radius-lg)",
          }}>
            {cat.icons.map((name) => (
              <div key={name} style={{
                padding: "14px 8px",
                background: "var(--syn-bg-raised)", borderRadius: "var(--syn-radius-md)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" strokeDasharray="2 2" />
                </svg>
                <span style={{ fontFamily: "var(--syn-font-mono)", fontSize: 10, color: "var(--syn-text-muted)", textAlign: "center", wordBreak: "break-all" }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ padding: 20, background: "var(--syn-info-subtle)", border: "1px solid var(--syn-border)", borderRadius: "var(--syn-radius-lg)", marginTop: 8 }}>
        <div style={{ fontWeight: 600, marginBottom: 4, color: "var(--syn-info)" }}>Live icon browser</div>
        <div style={{ fontSize: 13, color: "var(--syn-text-muted)" }}>
          Visit the playground for a searchable, click-to-copy icon browser at{" "}
          <code style={{ fontFamily: "var(--syn-font-mono)", fontSize: 12 }}>/design/icons</code>.
        </div>
      </div>
    </>
  );
}
