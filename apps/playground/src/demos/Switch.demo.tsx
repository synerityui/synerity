import { Switch } from "@synerity/ui";
import { DemoSection } from "./shared";

export function SwitchDemo() {
  return (
    <>
      <DemoSection
        title="States"
        col
        code={`<Switch label="Off" />\n<Switch label="On" defaultChecked />`}
      >
        <Switch label="Off" />
        <Switch label="On" defaultChecked />
      </DemoSection>

      <DemoSection
        title="Sizes"
        col
        code={`<Switch size="sm" label="Small" defaultChecked />\n<Switch size="md" label="Medium" defaultChecked />\n<Switch size="lg" label="Large" defaultChecked />`}
      >
        <Switch size="sm" label="Small" defaultChecked />
        <Switch size="md" label="Medium" defaultChecked />
        <Switch size="lg" label="Large" defaultChecked />
      </DemoSection>

      <DemoSection
        title="Disabled"
        col
        code={`<Switch label="Disabled off" disabled />\n<Switch label="Disabled on" disabled defaultChecked />`}
      >
        <Switch label="Disabled off" disabled />
        <Switch label="Disabled on" disabled defaultChecked />
      </DemoSection>
    </>
  );
}
