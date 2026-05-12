import { Combobox } from "@synerity/ui";
import { DemoSection } from "./shared";

const frameworkOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
  { value: "solid", label: "Solid" },
];

export function ComboboxDemo() {
  return (
    <>
      <DemoSection
        title="Basic filter"
        col
        code={`<Combobox\n  placeholder="Search frameworks…"\n  options={[\n    { value: "react", label: "React" },\n    { value: "vue", label: "Vue" },\n    { value: "svelte", label: "Svelte" },\n  ]}\n/>`}
      >
        <Combobox placeholder="Search frameworks…" options={frameworkOptions} />
      </DemoSection>

      <DemoSection
        title="With label & error"
        col
        code={`<Combobox\n  label="Framework"\n  hint="Start typing to filter options"\n  options={options}\n/>\n<Combobox\n  label="Framework"\n  error="Please select a valid framework"\n  options={options}\n/>`}
      >
        <Combobox
          label="Framework"
          hint="Start typing to filter options"
          options={frameworkOptions}
        />
        <Combobox
          label="Framework"
          error="Please select a valid framework"
          options={frameworkOptions}
        />
      </DemoSection>
    </>
  );
}
