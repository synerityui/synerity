import { Link } from "react-router-dom";
import { registry } from "../demos/registry";

const CATEGORIES = [
  { key: "inputs", label: "Inputs & Controls" },
  { key: "display", label: "Feedback & Display" },
  { key: "layout", label: "Layout" },
  { key: "typography", label: "Typography" },
  { key: "overlays", label: "Overlays" },
  { key: "navigation", label: "Navigation" },
] as const;

export default function HomePage() {
  return (
    <div className="pg-home">
      <div className="pg-home-hero">
        <h1 className="pg-home-title">Component playground</h1>
        <p className="pg-home-subtitle">
          Interactive demos for every Synerity component. Select a component from the sidebar or
          grid below to explore variants, states, and code examples.
        </p>
      </div>

      {CATEGORIES.map(({ key, label }) => {
        const items = registry.filter((d) => d.category === key);
        if (items.length === 0) return null;
        return (
          <div key={key} className="pg-home-category">
            <div className="pg-home-category-title">{label}</div>
            <div className="pg-component-grid">
              {items.map((demo) => (
                <Link
                  key={demo.slug}
                  to={`/components/${demo.slug}`}
                  className="pg-component-card"
                >
                  <div className="pg-component-card-name">{demo.name}</div>
                  <div className="pg-component-card-desc">{demo.description}</div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
