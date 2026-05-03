import { Accordion } from "@synerity/ui";
import { DemoSection } from "./shared";

const items = [
  {
    value: "a11y",
    title: "How does Synerity handle accessibility?",
    content:
      "Every component ships with full ARIA wiring, keyboard navigation per the W3C APG, and focus management. WCAG 2.1 AA compliance is a hard requirement, not an afterthought.",
  },
  {
    value: "rsc",
    title: "Are components compatible with React Server Components?",
    content:
      "Yes. CSS Modules are zero-runtime and RSC-safe. Interactive components use the 'use client' directive only where necessary.",
  },
  {
    value: "tokens",
    title: "How do I customise the design tokens?",
    content:
      "Override any CSS custom property on :root or a scoped selector. Token names follow --synerity-* and are documented in the tokens package.",
  },
];

export function AccordionDemo() {
  return (
    <>
      <DemoSection
        title="Single (one open at a time)"
        col
        code={`<Accordion\n  type="single"\n  defaultValue="a11y"\n  items={[\n    { value: "a11y", title: "Accessibility", content: "…" },\n    { value: "rsc", title: "RSC support", content: "…" },\n  ]}\n/>`}
      >
        <Accordion
          type="single"
          defaultValue="a11y"
          items={items}
          style={{ width: "100%" }}
        />
      </DemoSection>

      <DemoSection
        title="Multiple (many open at once)"
        col
        code={`<Accordion\n  type="multiple"\n  defaultValue={["a11y", "rsc"]}\n  items={items}\n/>`}
      >
        <Accordion
          type="multiple"
          defaultValue={["a11y", "rsc"]}
          items={items}
          style={{ width: "100%" }}
        />
      </DemoSection>
    </>
  );
}
