import { Text } from "@synerity/ui";
import { DemoSection, Col } from "./shared";

export function TextDemo() {
  return (
    <>
      <DemoSection
        title="Sizes"
        col
        code={`<Text size="xs">Extra small</Text>\n<Text size="sm">Small</Text>\n<Text size="md">Medium (default)</Text>\n<Text size="lg">Large</Text>\n<Text size="xl">Extra large</Text>\n<Text size="2xl">2XL</Text>`}
      >
        <Col>
          <Text size="xs">Extra small — 12px</Text>
          <Text size="sm">Small — 14px</Text>
          <Text size="md">Medium — 16px (default)</Text>
          <Text size="lg">Large — 18px</Text>
          <Text size="xl">Extra large — 20px</Text>
          <Text size="2xl">2XL — 24px</Text>
        </Col>
      </DemoSection>

      <DemoSection
        title="Weights"
        col
        code={`<Text weight="normal">Normal 400</Text>\n<Text weight="medium">Medium 500</Text>\n<Text weight="semibold">Semibold 600</Text>\n<Text weight="bold">Bold 700</Text>`}
      >
        <Text weight="normal">Normal 400</Text>
        <Text weight="medium">Medium 500</Text>
        <Text weight="semibold">Semibold 600</Text>
        <Text weight="bold">Bold 700</Text>
      </DemoSection>

      <DemoSection
        title="Colors"
        col
        code={`<Text color="primary">Primary text</Text>\n<Text color="secondary">Secondary text</Text>\n<Text color="disabled">Disabled text</Text>\n<Text color="danger">Danger text</Text>\n<Text color="success">Success text</Text>`}
      >
        <Text color="primary">Primary text</Text>
        <Text color="secondary">Secondary text</Text>
        <Text color="disabled">Disabled text</Text>
        <Text color="danger">Danger text</Text>
        <Text color="success">Success text</Text>
      </DemoSection>

      <DemoSection
        title="Polymorphic (as prop)"
        col
        code={`<Text as="span">Rendered as span</Text>\n<Text as="p">Rendered as paragraph</Text>\n<Text as="label">Rendered as label</Text>`}
      >
        <Text as="p" size="sm" color="secondary">This is a &lt;p&gt; tag rendered via <code>as="p"</code></Text>
        <Text as="span" size="sm">This is a &lt;span&gt; tag</Text>
      </DemoSection>
    </>
  );
}
