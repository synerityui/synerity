import { Link, Text } from "@synerity/ui";
import { DemoSection } from "./shared";

export function LinkDemo() {
  return (
    <>
      <DemoSection
        title="Inline"
        col
        code={`<Text>\n  Read the{" "}\n  <Link href="#">documentation</Link>\n  {" "}to learn more about the design system.\n</Text>`}
      >
        <Text>
          Read the{" "}
          <Link href="#">documentation</Link>
          {" "}to learn more about the design system.
        </Text>
      </DemoSection>

      <DemoSection
        title="Standalone"
        code={`<Link variant="standalone" href="#">View all components</Link>\n<Link variant="standalone" href="#">Browse the changelog</Link>`}
      >
        <Link variant="standalone" href="#">View all components</Link>
        <Link variant="standalone" href="#">Browse the changelog</Link>
      </DemoSection>

      <DemoSection
        title="External"
        code={`<Link href="https://example.com" external>Open in new tab</Link>`}
      >
        <Link href="https://example.com" external>Open in new tab</Link>
      </DemoSection>
    </>
  );
}
