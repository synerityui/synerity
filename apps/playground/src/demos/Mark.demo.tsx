import { Mark, Text } from "@synerity/ui";
import { DemoSection } from "./shared";

export function MarkDemo() {
  return (
    <>
      <DemoSection
        title="Colors"
        code={`<Mark color="yellow">Yellow highlight</Mark>\n<Mark color="green">Green highlight</Mark>\n<Mark color="blue">Blue highlight</Mark>\n<Mark color="pink">Pink highlight</Mark>`}
      >
        <Mark color="yellow">Yellow highlight</Mark>
        <Mark color="green">Green highlight</Mark>
        <Mark color="blue">Blue highlight</Mark>
        <Mark color="pink">Pink highlight</Mark>
      </DemoSection>

      <DemoSection
        title="In text"
        col
        code={`<Text>\n  The component library supports{" "}\n  <Mark color="yellow">highlighted text</Mark>\n  {" "}inline within paragraphs for drawing attention to key terms.\n</Text>`}
      >
        <Text>
          The component library supports{" "}
          <Mark color="yellow">highlighted text</Mark>
          {" "}inline within paragraphs for drawing attention to key terms.
        </Text>
        <Text>
          You can also use{" "}
          <Mark color="blue">blue</Mark>
          {" "}or{" "}
          <Mark color="green">green</Mark>
          {" "}marks to categorise different types of information.
        </Text>
      </DemoSection>
    </>
  );
}
