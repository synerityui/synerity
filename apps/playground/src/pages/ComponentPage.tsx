import { useParams } from "react-router-dom";
import { registry } from "../demos/registry";

export default function ComponentPage() {
  const { slug } = useParams<{ slug: string }>();
  const entry = registry.find((d) => d.slug === slug);

  if (!entry) {
    return (
      <div className="pg-component-page">
        <p style={{ color: "var(--synerity-color-text-secondary)" }}>
          Component <strong>{slug}</strong> not found.
        </p>
      </div>
    );
  }

  return (
    <div className="pg-component-page">
      <div className="pg-component-header">
        <h1 className="pg-component-name">{entry.name}</h1>
        <p className="pg-component-desc">{entry.description}</p>
      </div>
      <entry.Demo />
    </div>
  );
}
