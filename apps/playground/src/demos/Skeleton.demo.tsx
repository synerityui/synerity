import { Skeleton } from "@synerity/ui";
import { DemoSection } from "./shared";

export function SkeletonDemo() {
  return (
    <>
      <DemoSection
        title="Text lines"
        col
        code={`<Skeleton height="1rem" />\n<Skeleton height="1rem" width="80%" />\n<Skeleton height="1rem" width="60%" />`}
      >
        <div role="status" aria-label="Loading…" style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
          <Skeleton height="1rem" />
          <Skeleton height="1rem" width="80%" />
          <Skeleton height="1rem" width="60%" />
        </div>
      </DemoSection>

      <DemoSection
        title="Card skeleton"
        col
        code={`<div style={{ padding: 16, border: "1px solid var(--synerity-color-border)", borderRadius: "var(--synerity-radius-md)" }}>\n  <Skeleton circle width={40} height={40} />\n  <Skeleton height="1rem" />\n  <Skeleton height="1rem" width="70%" />\n  <Skeleton height="60px" />\n</div>`}
      >
        <div
          role="status"
          aria-label="Loading card…"
          style={{
            padding: 16,
            border: "1px solid var(--synerity-color-border)",
            borderRadius: "var(--synerity-radius-md)",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <Skeleton circle width={40} height={40} />
          <Skeleton height="1rem" />
          <Skeleton height="1rem" width="70%" />
          <Skeleton height="60px" />
        </div>
      </DemoSection>
    </>
  );
}
