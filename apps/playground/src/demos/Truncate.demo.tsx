import { Truncate } from "@synerity/ui";
import { DemoSection } from "./shared";

const LONG_TEXT =
  "This is a very long string of text that will be truncated because the container is too narrow to show it all in one line.";

export function TruncateDemo() {
  return (
    <>
      <DemoSection
        title="Single line"
        col
        code={`<div style={{ width: 200 }}>\n  <Truncate>This is a very long string of text…</Truncate>\n</div>`}
      >
        <div style={{ width: 200 }}>
          <Truncate>{LONG_TEXT}</Truncate>
        </div>
      </DemoSection>

      <DemoSection
        title="Two lines"
        col
        code={`<div style={{ width: 250 }}>\n  <Truncate lines={2}>This is a very long string…</Truncate>\n</div>`}
      >
        <div style={{ width: 250 }}>
          <Truncate lines={2}>{LONG_TEXT}</Truncate>
        </div>
      </DemoSection>
    </>
  );
}
