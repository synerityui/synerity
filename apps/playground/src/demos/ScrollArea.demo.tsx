import { ScrollArea } from "@synerity/ui";
import { DemoSection } from "./shared";

export function ScrollAreaDemo() {
  return (
    <>
      <DemoSection
        title="Vertical scroll"
        col
        code={`<ScrollArea maxHeight="200px">\n  {Array.from({ length: 20 }, (_, i) => (\n    <div key={i} style={{ padding: "8px 12px" }}>Item {i + 1}</div>\n  ))}\n</ScrollArea>`}
      >
        <ScrollArea maxHeight="200px" style={{ border: "1px solid var(--synerity-color-border)", borderRadius: "var(--synerity-radius-md)" }}>
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              style={{
                padding: "8px 12px",
                borderBottom: i < 19 ? "1px solid var(--synerity-color-border)" : undefined,
                fontSize: 14,
              }}
            >
              Item {i + 1}
            </div>
          ))}
        </ScrollArea>
      </DemoSection>

      <DemoSection
        title="Horizontal scroll"
        col
        code={`<ScrollArea maxWidth="300px">\n  <div style={{ whiteSpace: "nowrap", padding: 12 }}>\n    A very long line of content that overflows horizontally…\n  </div>\n</ScrollArea>`}
      >
        <ScrollArea maxWidth="300px" style={{ border: "1px solid var(--synerity-color-border)", borderRadius: "var(--synerity-radius-md)" }}>
          <div style={{ whiteSpace: "nowrap", padding: 12, fontSize: 14 }}>
            A very long line of content that overflows horizontally and requires scrolling to read in full.
          </div>
        </ScrollArea>
      </DemoSection>
    </>
  );
}
