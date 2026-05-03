import { NavLink } from "react-router-dom";
import { registry } from "../demos/registry";

const CATEGORIES: Array<{ key: string; label: string }> = [
  { key: "inputs", label: "Inputs & Controls" },
  { key: "display", label: "Feedback & Display" },
  { key: "layout", label: "Layout" },
  { key: "typography", label: "Typography" },
  { key: "overlays", label: "Overlays" },
  { key: "navigation", label: "Navigation" },
];

const FOUNDATION_PAGES = [
  { slug: "brand", label: "Brand" },
  { slug: "colors", label: "Colors" },
  { slug: "typography", label: "Typography" },
  { slug: "spacing", label: "Spacing & Radius" },
  { slug: "icons", label: "Iconography" },
  { slug: "motion", label: "Motion" },
];

const LIBRARY_PAGES = [
  { slug: "memory-graph", label: "Memory Graph" },
];

/** The Synerity logo mark — three circles connected by lines, from the design system. */
function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 40 40" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="6" fill="var(--syn-primary)" />
      <circle cx="28" cy="12" r="6" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <circle cx="20" cy="28" r="6" fill="rgba(255,255,255,0.85)" />
      <line x1="12" y1="12" x2="28" y2="12" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <line x1="12" y1="12" x2="20" y2="28" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <line x1="28" y1="12" x2="20" y2="28" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
    </svg>
  );
}

export default function Sidebar() {
  return (
    <aside className="pg-sidebar">
      <NavLink to="/" className="pg-sidebar-logo" style={{ textDecoration: "none" }}>
        <LogoMark />
        <div className="pg-sidebar-logo-text">
          <span className="pg-sidebar-logo-title">Synerity</span>
          <span className="pg-sidebar-logo-sub">Playground</span>
        </div>
      </NavLink>

      <nav className="pg-sidebar-nav">
        <div>
          <div className="pg-sidebar-category">Foundation</div>
          {FOUNDATION_PAGES.map((p) => (
            <NavLink
              key={p.slug}
              to={`/design/${p.slug}`}
              className={({ isActive }) =>
                `pg-sidebar-item${isActive ? " active" : ""}`
              }
            >
              {p.label}
            </NavLink>
          ))}
        </div>

        <div>
          <div className="pg-sidebar-category">Library</div>
          {LIBRARY_PAGES.map((p) => (
            <NavLink
              key={p.slug}
              to={`/design/${p.slug}`}
              className={({ isActive }) =>
                `pg-sidebar-item${isActive ? " active" : ""}`
              }
            >
              {p.label}
            </NavLink>
          ))}
        </div>

        <div className="pg-sidebar-divider" />

        {CATEGORIES.map(({ key, label }) => {
          const items = registry.filter((d) => d.category === key);
          if (items.length === 0) return null;
          return (
            <div key={key}>
              <div className="pg-sidebar-category">{label}</div>
              {items.map((demo) => (
                <NavLink
                  key={demo.slug}
                  to={`/components/${demo.slug}`}
                  className={({ isActive }) =>
                    `pg-sidebar-item${isActive ? " active" : ""}`
                  }
                >
                  {demo.name}
                </NavLink>
              ))}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
