import { Spinner } from "@synerity/ui";
import { DemoSection } from "./shared";

export function SpinnerDemo() {
  return (
    <>
      <DemoSection
        title="Sizes"
        code={`<Spinner size="sm" />\n<Spinner size="md" />\n<Spinner size="lg" />\n<Spinner size="xl" />`}
      >
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
        <Spinner size="xl" />
      </DemoSection>

      <DemoSection
        title="With label"
        col
        code={`<Spinner label="Loading your data…" />`}
      >
        <Spinner label="Loading your data…" />
      </DemoSection>
    </>
  );
}
