import { NumberInput } from "@synerity/ui";
import { DemoSection } from "./shared";

export function NumberInputDemo() {
  return (
    <>
      <DemoSection
        title="Basic"
        col
        code={`<NumberInput defaultValue={1} min={1} max={99} label="Quantity" />`}
      >
        <NumberInput defaultValue={1} min={1} max={99} label="Quantity" />
      </DemoSection>

      <DemoSection
        title="With step & precision"
        col
        code={`<NumberInput\n  defaultValue={9.99}\n  min={0}\n  step={0.01}\n  precision={2}\n  label="Price (USD)"\n  hint="Enter a price in dollars"\n/>`}
      >
        <NumberInput
          defaultValue={9.99}
          min={0}
          step={0.01}
          precision={2}
          label="Price (USD)"
          hint="Enter a price in dollars"
        />
      </DemoSection>

      <DemoSection
        title="Sizes"
        col
        code={`<NumberInput size="sm" defaultValue={1} label="Small" />\n<NumberInput size="md" defaultValue={1} label="Medium" />\n<NumberInput size="lg" defaultValue={1} label="Large" />`}
      >
        <NumberInput size="sm" defaultValue={1} label="Small" />
        <NumberInput size="md" defaultValue={1} label="Medium" />
        <NumberInput size="lg" defaultValue={1} label="Large" />
      </DemoSection>
    </>
  );
}
