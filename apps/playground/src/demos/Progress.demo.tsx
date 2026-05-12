import { Progress } from "@synerity/ui";
import { DemoSection } from "./shared";

export function ProgressDemo() {
  return (
    <>
      <DemoSection
        title="Values"
        col
        code={`<Progress value={0} label="0%" showValue />\n<Progress value={25} label="25%" showValue />\n<Progress value={50} label="50%" showValue />\n<Progress value={75} label="75%" showValue />\n<Progress value={100} label="100%" showValue />`}
      >
        <Progress value={0} label="0%" showValue />
        <Progress value={25} label="25%" showValue />
        <Progress value={50} label="50%" showValue />
        <Progress value={75} label="75%" showValue />
        <Progress value={100} label="100%" showValue />
      </DemoSection>

      <DemoSection
        title="Sizes"
        col
        code={`<Progress size="xs" value={60} label="Extra small" />\n<Progress size="sm" value={60} label="Small" />\n<Progress size="md" value={60} label="Medium" />\n<Progress size="lg" value={60} label="Large" />`}
      >
        <Progress size="xs" value={60} label="Extra small" />
        <Progress size="sm" value={60} label="Small" />
        <Progress size="md" value={60} label="Medium" />
        <Progress size="lg" value={60} label="Large" />
      </DemoSection>

      <DemoSection
        title="With label"
        col
        code={`<Progress value={60} label="Loading…" showValue />`}
      >
        <Progress value={60} label="Loading…" showValue />
      </DemoSection>
    </>
  );
}
