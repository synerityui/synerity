import { Textarea } from "@synerity/ui";
import { DemoSection } from "./shared";

export function TextareaDemo() {
  return (
    <>
      <DemoSection
        title="Default"
        col
        code={`<Textarea label="Message" placeholder="Write something…" />`}
      >
        <Textarea label="Message" placeholder="Write something…" />
      </DemoSection>

      <DemoSection
        title="Auto-resize"
        col
        code={`<Textarea label="Notes" autoResize placeholder="Grows as you type…" />`}
      >
        <Textarea label="Notes" autoResize placeholder="Grows as you type…" />
      </DemoSection>

      <DemoSection
        title="Invalid state"
        col
        code={`<Textarea label="Bio" invalid error="Bio cannot exceed 200 characters." />`}
      >
        <Textarea label="Bio" invalid error="Bio cannot exceed 200 characters." />
      </DemoSection>

      <DemoSection
        title="Disabled"
        col
        code={`<Textarea label="Notes" disabled defaultValue="Cannot edit this." />`}
      >
        <Textarea label="Notes" disabled defaultValue="Cannot edit this." />
      </DemoSection>
    </>
  );
}
