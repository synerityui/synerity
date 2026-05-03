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

export default function Sidebar() {
  return (
    <aside className="pg-sidebar">
      <NavLink to="/" className="pg-sidebar-logo" style={{ textDecoration: "none" }}>
        <div className="pg-sidebar-logo-mark">S</div>
        <div className="pg-sidebar-logo-text">
          <span className="pg-sidebar-logo-title">Synerity</span>
          <span className="pg-sidebar-logo-sub">Playground</span>
        </div>
      </NavLink>

      <nav className="pg-sidebar-nav">
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
