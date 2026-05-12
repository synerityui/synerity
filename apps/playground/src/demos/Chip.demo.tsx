import { useState } from "react";
import { Chip } from "@synerity/ui";
import { DemoSection } from "./shared";

export function ChipDemo() {
  const [tags, setTags] = useState(["React", "TypeScript", "Design System"]);

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <>
      <DemoSection
        title="Variants"
        code={`<Chip label="Default" variant="default" />\n<Chip label="Primary" variant="primary" />\n<Chip label="Success" variant="success" />\n<Chip label="Warning" variant="warning" />\n<Chip label="Danger" variant="danger" />`}
      >
        <Chip label="Default" variant="default" />
        <Chip label="Primary" variant="primary" />
        <Chip label="Success" variant="success" />
        <Chip label="Warning" variant="warning" />
        <Chip label="Danger" variant="danger" />
      </DemoSection>

      <DemoSection
        title="Removable tags"
        code={`const [tags, setTags] = useState(["React", "TypeScript", "Design System"]);\n\ntags.map(tag => (\n  <Chip key={tag} label={tag} onRemove={() => removeTag(tag)} />\n))`}
      >
        {tags.map((tag) => (
          <Chip key={tag} label={tag} onRemove={() => removeTag(tag)} />
        ))}
        {tags.length === 0 && (
          <span style={{ fontSize: 13, color: "var(--synerity-color-text-subtle)" }}>
            All tags removed
          </span>
        )}
      </DemoSection>

      <DemoSection
        title="Sizes"
        code={`<Chip label="Small" size="sm" />\n<Chip label="Medium" size="md" />`}
      >
        <Chip label="Small" size="sm" />
        <Chip label="Medium" size="md" />
      </DemoSection>
    </>
  );
}
