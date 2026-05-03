import { Badge, Button, Group } from "@synerity/ui";
import { DemoSection } from "./shared";

export function GroupDemo() {
  return (
    <>
      <DemoSection
        title="Default"
        col
        code={`<Group>\n  <Button variant="outline" size="sm">Bold</Button>\n  <Button variant="outline" size="sm">Italic</Button>\n  <Button variant="outline" size="sm">Underline</Button>\n</Group>`}
      >
        <Group>
          <Button variant="outline" size="sm">Bold</Button>
          <Button variant="outline" size="sm">Italic</Button>
          <Button variant="outline" size="sm">Underline</Button>
        </Group>
      </DemoSection>

      <DemoSection
        title="Gap sizes"
        col
        code={`<Group gap="sm">…</Group>\n<Group gap="md">…</Group>\n<Group gap="lg">…</Group>`}
      >
        {(["xs", "sm", "md", "lg", "xl"] as const).map((gap) => (
          <div key={gap} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 11, fontFamily: "IBM Plex Mono, monospace", color: "var(--synerity-color-text-secondary)", minWidth: 60 }}>
              gap="{gap}"
            </div>
            <Group gap={gap}>
              <Badge colorScheme="primary">Alpha</Badge>
              <Badge colorScheme="success">Beta</Badge>
              <Badge colorScheme="warning">Gamma</Badge>
            </Group>
          </div>
        ))}
      </DemoSection>

      <DemoSection
        title="Wrap"
        col
        code={`<Group wrap gap="sm">\n  {tags.map(t => <Badge key={t}>{t}</Badge>)}\n</Group>`}
      >
        <Group wrap gap="sm" style={{ maxWidth: 340 }}>
          {["React", "TypeScript", "CSS Modules", "Vite", "Turborepo", "Vitest", "pnpm", "Changesets"].map((t) => (
            <Badge key={t} variant="outline">{t}</Badge>
          ))}
        </Group>
      </DemoSection>
    </>
  );
}
