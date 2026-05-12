import { AspectRatio } from "@synerity/ui";
import { DemoSection } from "./shared";

function Placeholder({ label }: { label: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "var(--synerity-color-primary-subtle)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--synerity-radius-md)",
        color: "var(--synerity-color-primary)",
        fontWeight: 600,
      }}
    >
      {label}
    </div>
  );
}

export function AspectRatioDemo() {
  return (
    <>
      <DemoSection
        title="16:9 video placeholder"
        col
        code={`<AspectRatio ratio={16 / 9}>\n  <div style={{ width: "100%", height: "100%", background: "var(--synerity-color-primary-subtle)" }}>\n    16:9\n  </div>\n</AspectRatio>`}
      >
        <div style={{ width: "100%", maxWidth: 480 }}>
          <AspectRatio ratio={16 / 9}>
            <Placeholder label="16:9" />
          </AspectRatio>
        </div>
      </DemoSection>

      <DemoSection
        title="Square"
        col
        code={`<AspectRatio ratio={1}>\n  <div>1:1</div>\n</AspectRatio>`}
      >
        <div style={{ width: 200 }}>
          <AspectRatio ratio={1}>
            <Placeholder label="1:1" />
          </AspectRatio>
        </div>
      </DemoSection>

      <DemoSection
        title="4:3"
        col
        code={`<AspectRatio ratio={4 / 3}>\n  <div>4:3</div>\n</AspectRatio>`}
      >
        <div style={{ width: "100%", maxWidth: 400 }}>
          <AspectRatio ratio={4 / 3}>
            <Placeholder label="4:3" />
          </AspectRatio>
        </div>
      </DemoSection>
    </>
  );
}
