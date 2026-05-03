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
        title="Gap values (accepts any CSS gap)"
        col
        code={`<Group gap="8px">…</Group>\n<Group gap="16px">…</Group>\n<Group gap="24px">…</Group>`}
      >
        {(["4px", "8px", "16px", "24px", "32px"] as const).map((gap) => (
          <div key={gap} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 11, fontFamily: "IBM Plex Mono, monospace", color: "var(--synerity-color-text-secondary)", minWidth: 40 }}>
              {gap}
            </div>
            <Group gap={gap}>
              <Badge variant="primary">Alpha</Badge>
              <Badge variant="success">Beta</Badge>
              <Badge variant="warning">Gamma</Badge>
            </Group>
          </div>
        ))}
      </DemoSection>

      <DemoSection
        title="Wrap"
        col
        code={`<Group wrap gap="8px">\n  {tags.map(t => <Badge key={t}>{t}</Badge>)}\n</Group>`}
      >
        <Group wrap gap="8px" style={{ maxWidth: 340 }}>
          {["React", "TypeScript", "CSS Modules", "Vite", "Turborepo", "Vitest", "pnpm", "Changesets"].map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </Group>
      </DemoSection>
    </>
  );
}
