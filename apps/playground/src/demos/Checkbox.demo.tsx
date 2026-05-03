import { Checkbox } from "@synerity/ui";
import { DemoSection } from "./shared";

export function CheckboxDemo() {
  return (
    <>
      <DemoSection
        title="States"
        col
        code={`<Checkbox label="Unchecked" />\n<Checkbox label="Checked" defaultChecked />\n<Checkbox label="Indeterminate" indeterminate />`}
      >
        <Checkbox label="Unchecked" />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Indeterminate" indeterminate />
      </DemoSection>

      <DemoSection
        title="Disabled"
        col
        code={`<Checkbox label="Disabled unchecked" disabled />\n<Checkbox label="Disabled checked" disabled defaultChecked />`}
      >
        <Checkbox label="Disabled unchecked" disabled />
        <Checkbox label="Disabled checked" disabled defaultChecked />
      </DemoSection>

      <DemoSection
        title="In a group"
        col
        code={`<Checkbox label="Email notifications" defaultChecked />\n<Checkbox label="Push notifications" />\n<Checkbox label="SMS notifications" />`}
      >
        <Checkbox label="Email notifications" defaultChecked />
        <Checkbox label="Push notifications" />
        <Checkbox label="SMS notifications" />
      </DemoSection>
    </>
  );
}
