import { Accordion } from "@synerity/ui";
import { DemoSection } from "./shared";

const items = [
  {
    value: "a11y",
    trigger: "How does Synerity handle accessibility?",
    panel:
      "Every component ships with full ARIA wiring, keyboard navigation per the W3C APG, and focus management. WCAG 2.1 AA compliance is a hard requirement, not an afterthought.",
  },
  {
    value: "rsc",
    trigger: "Are components compatible with React Server Components?",
    panel:
      "Yes. CSS Modules are zero-runtime and RSC-safe. Interactive components use the 'use client' directive only where necessary.",
  },
  {
    value: "tokens",
    trigger: "How do I customise the design tokens?",
    panel:
      "Override any CSS custom property on :root or a scoped selector. The token names follow the --synerity-* convention and are fully documented in the tokens package.",
  },
];

export function AccordionDemo() {
  return (
    <>
      <DemoSection
        title="Single (default)"
        col
        code={`<Accordion type="single" defaultValue="a11y">\n  {items.map(item => (\n    <Accordion.Item key={item.value} value={item.value} trigger={item.trigger}>\n      {item.panel}\n    </Accordion.Item>\n  ))}\n</Accordion>`}
      >
        <Accordion type="single" defaultValue="a11y" style={{ width: "100%" }}>
          {items.map((item) => (
            <Accordion.Item key={item.value} value={item.value} trigger={item.trigger}>
              {item.panel}
            </Accordion.Item>
          ))}
        </Accordion>
      </DemoSection>

      <DemoSection
        title="Multiple (expand many)"
        col
        code={`<Accordion type="multiple" defaultValue={["a11y", "rsc"]}>\n  …\n</Accordion>`}
      >
        <Accordion type="multiple" defaultValue={["a11y", "rsc"]} style={{ width: "100%" }}>
          {items.map((item) => (
            <Accordion.Item key={item.value} value={item.value} trigger={item.trigger}>
              {item.panel}
            </Accordion.Item>
          ))}
        </Accordion>
      </DemoSection>
    </>
  );
}
