import { useState } from "react";
import { Radio, RadioGroup } from "@synerity/ui";
import { DemoSection } from "./shared";

export function RadioDemo() {
  const [selected, setSelected] = useState("react");

  return (
    <>
      <DemoSection
        title="Basic group"
        col
        code={`<RadioGroup defaultValue="react" orientation="vertical">\n  <Radio value="react" label="React" />\n  <Radio value="vue" label="Vue" />\n  <Radio value="svelte" label="Svelte" />\n</RadioGroup>`}
      >
        <RadioGroup defaultValue="react" orientation="vertical">
          <Radio value="react" label="React" />
          <Radio value="vue" label="Vue" />
          <Radio value="svelte" label="Svelte" />
        </RadioGroup>
      </DemoSection>

      <DemoSection
        title="Controlled"
        col
        code={`const [selected, setSelected] = useState("react");\n\n<RadioGroup value={selected} onChange={setSelected} orientation="vertical">\n  <Radio value="react" label="React" />\n  <Radio value="vue" label="Vue" />\n  <Radio value="svelte" label="Svelte" />\n</RadioGroup>\n<p>Selected: {selected}</p>`}
      >
        <RadioGroup value={selected} onChange={setSelected} orientation="vertical">
          <Radio value="react" label="React" />
          <Radio value="vue" label="Vue" />
          <Radio value="svelte" label="Svelte" />
        </RadioGroup>
        <p style={{ marginTop: 8, fontSize: 14, color: "var(--synerity-color-text-subtle)" }}>
          Selected: <strong>{selected}</strong>
        </p>
      </DemoSection>

      <DemoSection
        title="Disabled option"
        col
        code={`<RadioGroup defaultValue="react" orientation="vertical">\n  <Radio value="react" label="React" />\n  <Radio value="vue" label="Vue" disabled />\n  <Radio value="svelte" label="Svelte" />\n</RadioGroup>`}
      >
        <RadioGroup defaultValue="react" orientation="vertical">
          <Radio value="react" label="React" />
          <Radio value="vue" label="Vue" disabled />
          <Radio value="svelte" label="Svelte" />
        </RadioGroup>
      </DemoSection>
    </>
  );
}
