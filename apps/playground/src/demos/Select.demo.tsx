import { useState } from "react";
import { Select } from "@synerity/ui";
import { DemoSection } from "./shared";

const frameworkOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];

export function SelectDemo() {
  const [value, setValue] = useState("");

  return (
    <>
      <DemoSection
        title="Basic"
        col
        code={`<Select\n  placeholder="Choose a framework"\n  options={[{value:"react",label:"React"},{value:"vue",label:"Vue"},{value:"svelte",label:"Svelte"}]}\n/>`}
      >
        <Select placeholder="Choose a framework" options={frameworkOptions} />
      </DemoSection>

      <DemoSection
        title="Sizes"
        col
        code={`<Select size="sm" placeholder="Small" options={options} />\n<Select size="md" placeholder="Medium" options={options} />\n<Select size="lg" placeholder="Large" options={options} />`}
      >
        <Select size="sm" placeholder="Small" options={frameworkOptions} />
        <Select size="md" placeholder="Medium" options={frameworkOptions} />
        <Select size="lg" placeholder="Large" options={frameworkOptions} />
      </DemoSection>

      <DemoSection
        title="With label & error"
        col
        code={`<Select\n  label="Framework"\n  error={!value ? "Please select a framework" : undefined}\n  value={value}\n  onChange={setValue}\n  options={options}\n/>`}
      >
        <Select
          label="Framework"
          error={!value ? "Please select a framework" : undefined}
          value={value}
          onChange={setValue}
          options={frameworkOptions}
        />
      </DemoSection>
    </>
  );
}
