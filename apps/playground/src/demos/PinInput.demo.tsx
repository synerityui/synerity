import { PinInput } from "@synerity/ui";
import { DemoSection } from "./shared";

export function PinInputDemo() {
  return (
    <>
      <DemoSection
        title="OTP"
        col
        code={`<PinInput length={6} />`}
      >
        <PinInput length={6} />
      </DemoSection>

      <DemoSection
        title="Masked PIN"
        col
        code={`<PinInput length={4} masked />`}
      >
        <PinInput length={4} masked />
      </DemoSection>

      <DemoSection
        title="Sizes"
        col
        code={`<PinInput size="sm" length={4} />\n<PinInput size="md" length={4} />\n<PinInput size="lg" length={4} />`}
      >
        <PinInput size="sm" length={4} />
        <PinInput size="md" length={4} />
        <PinInput size="lg" length={4} />
      </DemoSection>
    </>
  );
}
