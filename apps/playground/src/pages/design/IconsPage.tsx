import { useState } from "react";
import * as Icons from "@synerity/icons";
import { DesignCard, Eyebrow, Mono, SectionTitle, pageShell } from "./shared";

type IconName = keyof typeof Icons;

const ICON_NAMES = Object.keys(Icons).filter((k) => k !== "Icon") as IconName[];

const CATEGORIES: { label: string; keys: IconName[] }[] = [
  { label: "Navigation", keys: ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "ChevronLeft", "ChevronRight", "ChevronUp", "ChevronDown", "ExternalLink", "Home", "Menu", "X", "MoreHorizontal", "MoreVertical"] as IconName[] },
  { label: "Actions", keys: ["Copy", "Cut", "Paste", "Download", "Upload", "Share", "Edit", "Trash", "Plus", "Minus", "Search", "Filter", "Sort", "Refresh", "Settings", "Sliders"] as IconName[] },
  { label: "Status", keys: ["Check", "CheckCircle", "AlertCircle", "AlertTriangle", "Info", "XCircle", "Clock", "Loader"] as IconName[] },
  { label: "Files & Data", keys: ["File", "FileText", "Folder", "FolderOpen", "Image", "Code", "Database", "Table"] as IconName[] },
  { label: "Communication", keys: ["Mail", "Bell", "BellOff", "MessageSquare", "Phone"] as IconName[] },
  { label: "User", keys: ["User", "Users", "LogIn", "LogOut", "Lock", "Unlock", "Shield", "Key"] as IconName[] },
  { label: "Misc", keys: ["Star", "Heart", "Bookmark", "Tag", "Globe", "Map", "Calendar", "Sun", "Moon"] as IconName[] },
];

export default function IconsPage() {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = query
    ? ICON_NAMES.filter((n) => n.toLowerCase().includes(query.toLowerCase()))
    : null;

  function copyName(name: string) {
    void navigator.clipboard.writeText(`<${name} size={20} />`);
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div style={pageShell}>
      <SectionTitle
        idx="05"
        title="Iconography"
        subtitle="Outline at 1.6 stroke, 24×24 viewbox, currentColor everywhere. Tree-shakeable named exports — bring in only what you render."
        count={ICON_NAMES.length}
      />

      <div style={{ marginBottom: 32 }}>
        <div style={{ position: "relative", maxWidth: 360 }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search icons…"
            style={{
              width: "100%", height: 40, padding: "0 12px 0 38px",
              background: "var(--syn-bg-raised)", border: "1px solid var(--syn-border-strong)",
              borderRadius: "var(--syn-radius-md)", fontFamily: "var(--syn-font-sans)",
              fontSize: 14, color: "var(--syn-text)", outline: "none",
            }}
          />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--syn-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
            <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      {filtered ? (
        <div>
          <Eyebrow>Search results — {filtered.length} icons</Eyebrow>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 4, border: "1px solid var(--syn-border)", borderRadius: "var(--syn-radius-lg)", padding: 4, background: "var(--syn-bg-sunken)" }}>
            {filtered.map((name) => {
              const IconComp = Icons[name] as React.ComponentType<{ size?: number }>;
              if (!IconComp || typeof IconComp !== "function") return null;
              return (
                <IconCell key={name} name={name} IconComp={IconComp} copied={copied === name} onCopy={() => copyName(name)} />
              );
            })}
          </div>
        </div>
      ) : (
        CATEGORIES.map((cat) => (
          <div key={cat.label} style={{ marginBottom: 40 }}>
            <Eyebrow>{cat.label}</Eyebrow>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 4, border: "1px solid var(--syn-border)", borderRadius: "var(--syn-radius-lg)", padding: 4, background: "var(--syn-bg-sunken)" }}>
              {cat.keys.map((name) => {
                const IconComp = Icons[name] as React.ComponentType<{ size?: number }>;
                if (!IconComp || typeof IconComp !== "function") return null;
                return (
                  <IconCell key={name} name={name} IconComp={IconComp} copied={copied === name} onCopy={() => copyName(name)} />
                );
              })}
            </div>
          </div>
        ))
      )}

      <Eyebrow>Size variants</Eyebrow>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {([12, 16, 20, 24] as const).map((s) => (
          <DesignCard key={s} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Icons.Star size={s} />
            <Mono style={{ color: "var(--syn-text-muted)" }}>size={s}</Mono>
          </DesignCard>
        ))}
      </div>
    </div>
  );
}

function IconCell({ name, IconComp, copied, onCopy }: {
  name: string;
  IconComp: React.ComponentType<{ size?: number }>;
  copied: boolean;
  onCopy: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onCopy}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={`Copy <${name} /> usage`}
      style={{
        background: hovered ? "var(--syn-primary-subtle)" : "var(--syn-bg-raised)",
        padding: 18, border: "none", cursor: "pointer",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        borderRadius: "var(--syn-radius-md)",
        transition: "background 100ms ease",
        color: copied ? "var(--syn-primary)" : "var(--syn-text)",
      }}
    >
      {copied ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--syn-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <IconComp size={24} />
      )}
      <span style={{ fontFamily: "var(--syn-font-mono)", fontSize: 10, color: copied ? "var(--syn-primary)" : "var(--syn-text-muted)" }}>
        {copied ? "copied!" : name}
      </span>
    </button>
  );
}
