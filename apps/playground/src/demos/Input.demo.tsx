import { Input } from "@synerity/ui";
import { DemoSection } from "./shared";

export function InputDemo() {
  return (
    <>
      <DemoSection
        title="Default"
        col
        code={`<Input label="Email address" placeholder="you@example.com" />`}
      >
        <Input label="Email address" placeholder="you@example.com" />
      </DemoSection>

      <DemoSection
        title="With hint"
        col
        code={`<Input label="Username" hint="Letters, numbers, and underscores only." placeholder="john_doe" />`}
      >
        <Input
          label="Username"
          hint="Letters, numbers, and underscores only."
          placeholder="john_doe"
        />
      </DemoSection>

      <DemoSection
        title="Invalid state"
        col
        code={`<Input label="Password" invalid error="Must be at least 8 characters." type="password" />`}
      >
        <Input
          label="Password"
          invalid
          error="Must be at least 8 characters."
          type="password"
          defaultValue="abc"
        />
      </DemoSection>

      <DemoSection
        title="Sizes"
        col
        code={`<Input size="sm" placeholder="Small" />\n<Input size="md" placeholder="Medium" />\n<Input size="lg" placeholder="Large" />`}
      >
        <Input size="sm" placeholder="Small" />
        <Input size="md" placeholder="Medium" />
        <Input size="lg" placeholder="Large" />
      </DemoSection>

      <DemoSection
        title="Disabled / read-only"
        col
        code={`<Input disabled placeholder="Disabled input" />\n<Input readOnly value="Read-only value" />`}
      >
        <Input disabled placeholder="Disabled input" />
        <Input readOnly defaultValue="Read-only value" />
      </DemoSection>
    </>
  );
}
