import { Search, Trash } from "@synerity/icons";
import { Button } from "@synerity/ui";
import { DemoSection, Row } from "./shared";

export function ButtonDemo() {
  return (
    <>
      <DemoSection
        title="Variants"
        code={`<Button variant="solid">Solid</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="link">Link</Button>`}
      >
        <Button variant="solid">Solid</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </DemoSection>

      <DemoSection
        title="Sizes"
        code={`<Button size="sm">Small</Button>\n<Button size="md">Medium</Button>\n<Button size="lg">Large</Button>`}
      >
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </DemoSection>

      <DemoSection
        title="Color schemes"
        code={`<Button colorScheme="primary">Primary</Button>\n<Button colorScheme="danger">Danger</Button>`}
      >
        <Button colorScheme="primary">Primary</Button>
        <Button colorScheme="danger">Danger</Button>
        <Button variant="outline" colorScheme="danger">Danger outline</Button>
      </DemoSection>

      <DemoSection
        title="With icons"
        code={`<Button leftIcon={<Search size={14} />}>Search</Button>\n<Button variant="outline" rightIcon={<Trash size={14} />} colorScheme="danger">Delete</Button>`}
      >
        <Button leftIcon={<Search size={14} />}>Search</Button>
        <Button variant="outline" rightIcon={<Trash size={14} />} colorScheme="danger">
          Delete
        </Button>
      </DemoSection>

      <DemoSection
        title="States"
        code={`<Button loading>Saving…</Button>\n<Button disabled>Disabled</Button>`}
      >
        <Button loading>Saving…</Button>
        <Button disabled>Disabled</Button>
        <Button variant="outline" disabled>Disabled outline</Button>
      </DemoSection>

      <DemoSection
        title="Full width"
        col
        code={`<Button fullWidth>Full width button</Button>`}
      >
        <Button fullWidth>Full width button</Button>
      </DemoSection>
    </>
  );
}
