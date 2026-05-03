import { Badge, Button, Stack } from "@synerity/ui";
import { DemoSection } from "./shared";

const Box = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: "10px 16px",
      background: "var(--synerity-color-primary-subtle)",
      border: "1px solid var(--synerity-color-primary)",
      borderRadius: "var(--synerity-radius-md)",
      fontSize: 13,
      color: "var(--synerity-color-primary)",
      fontWeight: 500,
    }}
  >
    {children}
  </div>
);

export function StackDemo() {
  return (
    <>
      <DemoSection
        title="Default (gap md)"
        col
        code={`<Stack gap="md">\n  <Box>Item 1</Box>\n  <Box>Item 2</Box>\n  <Box>Item 3</Box>\n</Stack>`}
      >
        <Stack gap="md" style={{ width: "100%", maxWidth: 300 }}>
          <Box>Item 1</Box>
          <Box>Item 2</Box>
          <Box>Item 3</Box>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Gap sizes"
        code={`<Stack gap="xs">…</Stack>\n<Stack gap="sm">…</Stack>\n<Stack gap="lg">…</Stack>`}
      >
        {(["xs", "sm", "md", "lg", "xl"] as const).map((gap) => (
          <div key={gap} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ fontSize: 11, fontFamily: "IBM Plex Mono, monospace", color: "var(--synerity-color-text-secondary)" }}>
              gap="{gap}"
            </div>
            <Stack gap={gap}>
              <Badge>{gap} 1</Badge>
              <Badge>{gap} 2</Badge>
              <Badge>{gap} 3</Badge>
            </Stack>
          </div>
        ))}
      </DemoSection>

      <DemoSection
        title="Practical example"
        col
        code={`<Stack gap="md">\n  <Button fullWidth>Continue</Button>\n  <Button fullWidth variant="outline">Save draft</Button>\n  <Button fullWidth variant="ghost">Cancel</Button>\n</Stack>`}
      >
        <Stack gap="md" style={{ width: "100%", maxWidth: 280 }}>
          <Button fullWidth>Continue</Button>
          <Button fullWidth variant="outline">Save draft</Button>
          <Button fullWidth variant="ghost">Cancel</Button>
        </Stack>
      </DemoSection>
    </>
  );
}
