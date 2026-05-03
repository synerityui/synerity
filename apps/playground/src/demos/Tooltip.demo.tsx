import { Button } from "@synerity/ui";
import { Tooltip } from "@synerity/ui";
import { DemoSection } from "./shared";

export function TooltipDemo() {
  return (
    <>
      <DemoSection
        title="Placements"
        code={`<Tooltip content="Top tooltip" placement="top">\n  <Button variant="outline">Top</Button>\n</Tooltip>`}
      >
        <Tooltip content="Tooltip on top" placement="top">
          <Button variant="outline">Top</Button>
        </Tooltip>
        <Tooltip content="Tooltip on right" placement="right">
          <Button variant="outline">Right</Button>
        </Tooltip>
        <Tooltip content="Tooltip on bottom" placement="bottom">
          <Button variant="outline">Bottom</Button>
        </Tooltip>
        <Tooltip content="Tooltip on left" placement="left">
          <Button variant="outline">Left</Button>
        </Tooltip>
      </DemoSection>

      <DemoSection
        title="With delay"
        code={`<Tooltip content="Appears after 500ms" delay={500}>\n  <Button variant="outline">Hover me (slow)</Button>\n</Tooltip>`}
      >
        <Tooltip content="Appears immediately (default)" delay={0}>
          <Button variant="outline">Instant</Button>
        </Tooltip>
        <Tooltip content="Appears after 500ms" delay={500}>
          <Button variant="outline">Delayed 500ms</Button>
        </Tooltip>
      </DemoSection>

      <DemoSection
        title="On an icon button"
        code={`<Tooltip content="Delete item">\n  <Button variant="ghost" colorScheme="danger">🗑</Button>\n</Tooltip>`}
      >
        <Tooltip content="Save changes">
          <Button>Save</Button>
        </Tooltip>
        <Tooltip content="This action cannot be undone">
          <Button variant="outline" colorScheme="danger">Delete</Button>
        </Tooltip>
      </DemoSection>
    </>
  );
}
