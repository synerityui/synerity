import { Heading } from "@synerity/ui";
import { DemoSection, Col } from "./shared";

export function HeadingDemo() {
  return (
    <>
      <DemoSection
        title="Levels"
        col
        code={`<Heading level={1}>Heading 1</Heading>\n<Heading level={2}>Heading 2</Heading>\n<Heading level={3}>Heading 3</Heading>\n<Heading level={4}>Heading 4</Heading>\n<Heading level={5}>Heading 5</Heading>\n<Heading level={6}>Heading 6</Heading>`}
      >
        <Col>
          <Heading level={1}>Heading 1 — Display</Heading>
          <Heading level={2}>Heading 2 — Page title</Heading>
          <Heading level={3}>Heading 3 — Section</Heading>
          <Heading level={4}>Heading 4 — Subsection</Heading>
          <Heading level={5}>Heading 5 — Label</Heading>
          <Heading level={6}>Heading 6 — Caption</Heading>
        </Col>
      </DemoSection>

      <DemoSection
        title="Custom weight"
        col
        code={`<Heading level={2} weight="normal">Light heading</Heading>\n<Heading level={2} weight="bold">Bold heading</Heading>`}
      >
        <Heading level={2} weight="normal">Light heading weight</Heading>
        <Heading level={2} weight="bold">Bold heading weight</Heading>
      </DemoSection>
    </>
  );
}
