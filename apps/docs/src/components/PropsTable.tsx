import type { PropDef } from "@/lib/components";

export function PropsTable({ props }: { props: PropDef[] }) {
  return (
    <div style={{ overflowX: "auto", borderRadius: "var(--syn-radius-lg)", border: "1px solid var(--syn-border)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "var(--syn-bg-sunken)" }}>
            {["Prop", "Type", "Default", "Description"].map((h) => (
              <th key={h} style={{
                padding: "10px 16px", textAlign: "left",
                fontFamily: "var(--syn-font-mono)", fontSize: 11, fontWeight: 500,
                textTransform: "uppercase", letterSpacing: "0.08em",
                color: "var(--syn-text-muted)", borderBottom: "1px solid var(--syn-border)",
                whiteSpace: "nowrap",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.map((p, i) => (
            <tr key={p.name} style={{ borderBottom: i < props.length - 1 ? "1px solid var(--syn-border)" : "none" }}>
              <td style={{ padding: "10px 16px", whiteSpace: "nowrap" }}>
                <code style={{ fontFamily: "var(--syn-font-mono)", fontSize: 12, color: "var(--syn-primary)" }}>
                  {p.name}{p.required ? <span style={{ color: "var(--syn-danger)" }}>*</span> : ""}
                </code>
              </td>
              <td style={{ padding: "10px 16px" }}>
                <code style={{ fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-text-muted)", background: "var(--syn-bg-sunken)", padding: "2px 6px", borderRadius: "var(--syn-radius-sm)" }}>
                  {p.type}
                </code>
              </td>
              <td style={{ padding: "10px 16px" }}>
                {p.default ? (
                  <code style={{ fontFamily: "var(--syn-font-mono)", fontSize: 11, color: "var(--syn-text-subtle)" }}>{p.default}</code>
                ) : (
                  <span style={{ color: "var(--syn-text-subtle)", fontSize: 11 }}>—</span>
                )}
              </td>
              <td style={{ padding: "10px 16px", color: "var(--syn-text-muted)", lineHeight: 1.5 }}>{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
