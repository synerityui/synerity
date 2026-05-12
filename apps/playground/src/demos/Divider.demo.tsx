import { Divider, Stack, Group, Button } from "@synerity/ui";
import { DemoSection } from "./shared";

export function DividerDemo() {
  return (
    <>
      <DemoSection
        title="Horizontal"
        col
        code={`<Stack gap={4}>\n  <p>Section above</p>\n  <Divider />\n  <p>Section below</p>\n</Stack>`}
      >
        <Stack gap={4}>
          <p style={{ margin: 0 }}>Section above</p>
          <Divider />
          <p style={{ margin: 0 }}>Section below</p>
        </Stack>
      </DemoSection>

      <DemoSection
        title="With label"
        col
        code={`<Divider label="or" />`}
      >
        <Divider label="or" />
      </DemoSection>

      <DemoSection
        title="Vertical in group"
        code={`<Group>\n  <Button variant="ghost">Cut</Button>\n  <Divider orientation="vertical" />\n  <Button variant="ghost">Copy</Button>\n  <Divider orientation="vertical" />\n  <Button variant="ghost">Paste</Button>\n</Group>`}
      >
        <Group>
          <Button variant="ghost">Cut</Button>
          <Divider orientation="vertical" />
          <Button variant="ghost">Copy</Button>
          <Divider orientation="vertical" />
          <Button variant="ghost">Paste</Button>
        </Group>
      </DemoSection>
    </>
  );
}
