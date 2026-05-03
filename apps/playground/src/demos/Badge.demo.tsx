import { Badge } from "@synerity/ui";
import { DemoSection } from "./shared";

export function BadgeDemo() {
  return (
    <>
      <DemoSection
        title="Variants (color)"
        code={`<Badge>Default</Badge>\n<Badge variant="primary">Primary</Badge>\n<Badge variant="success">Success</Badge>\n<Badge variant="warning">Warning</Badge>\n<Badge variant="danger">Danger</Badge>\n<Badge variant="info">Info</Badge>`}
      >
        <Badge>Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="info">Info</Badge>
      </DemoSection>

      <DemoSection
        title="Sizes"
        code={`<Badge size="sm">Small</Badge>\n<Badge size="md">Medium</Badge>\n<Badge size="lg">Large</Badge>`}
      >
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </DemoSection>

      <DemoSection
        title="Dot variant"
        code={`<Badge dot variant="success">Online</Badge>\n<Badge dot variant="warning">Away</Badge>\n<Badge dot variant="danger">Busy</Badge>`}
      >
        <Badge dot variant="success">Online</Badge>
        <Badge dot variant="warning">Away</Badge>
        <Badge dot variant="danger">Busy</Badge>
        <Badge dot>Offline</Badge>
      </DemoSection>
    </>
  );
}
