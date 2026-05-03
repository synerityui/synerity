import { Badge } from "@synerity/ui";
import { DemoSection } from "./shared";

export function BadgeDemo() {
  return (
    <>
      <DemoSection
        title="Variants"
        code={`<Badge variant="solid">Solid</Badge>\n<Badge variant="subtle">Subtle</Badge>\n<Badge variant="outline">Outline</Badge>`}
      >
        <Badge variant="solid">Solid</Badge>
        <Badge variant="subtle">Subtle</Badge>
        <Badge variant="outline">Outline</Badge>
      </DemoSection>

      <DemoSection
        title="Color schemes"
        code={`<Badge colorScheme="primary">Primary</Badge>\n<Badge colorScheme="success">Success</Badge>\n<Badge colorScheme="warning">Warning</Badge>\n<Badge colorScheme="danger">Danger</Badge>\n<Badge colorScheme="neutral">Neutral</Badge>`}
      >
        <Badge colorScheme="primary">Primary</Badge>
        <Badge colorScheme="success">Success</Badge>
        <Badge colorScheme="warning">Warning</Badge>
        <Badge colorScheme="danger">Danger</Badge>
        <Badge colorScheme="neutral">Neutral</Badge>
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
        title="Subtle variants — all schemes"
        code={`<Badge variant="subtle" colorScheme="success">Active</Badge>`}
      >
        <Badge variant="subtle" colorScheme="primary">Primary</Badge>
        <Badge variant="subtle" colorScheme="success">Active</Badge>
        <Badge variant="subtle" colorScheme="warning">Pending</Badge>
        <Badge variant="subtle" colorScheme="danger">Cancelled</Badge>
        <Badge variant="subtle" colorScheme="neutral">Draft</Badge>
      </DemoSection>
    </>
  );
}
