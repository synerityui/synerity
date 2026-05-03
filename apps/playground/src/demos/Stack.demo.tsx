import React from "react";
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
        title="Default (16px gap)"
        col
        code={`<Stack gap="16px">\n  <Box>Item 1</Box>\n  <Box>Item 2</Box>\n  <Box>Item 3</Box>\n</Stack>`}
      >
        <Stack gap="16px" style={{ width: "100%", maxWidth: 300 }}>
          <Box>Item 1</Box>
          <Box>Item 2</Box>
          <Box>Item 3</Box>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Gap values (accepts any CSS gap)"
        code={`<Stack gap="4px">…</Stack>\n<Stack gap="16px">…</Stack>\n<Stack gap="32px">…</Stack>`}
      >
        {(["4px", "8px", "16px", "24px", "32px"] as const).map((gap) => (
          <div key={gap} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ fontSize: 11, fontFamily: "IBM Plex Mono, monospace", color: "var(--synerity-color-text-secondary)" }}>
              {gap}
            </div>
            <Stack gap={gap}>
              <Badge>1</Badge>
              <Badge>2</Badge>
              <Badge>3</Badge>
            </Stack>
          </div>
        ))}
      </DemoSection>

      <DemoSection
        title="Practical example"
        col
        code={`<Stack gap="12px">\n  <Button fullWidth>Continue</Button>\n  <Button fullWidth variant="outline">Save draft</Button>\n  <Button fullWidth variant="ghost">Cancel</Button>\n</Stack>`}
      >
        <Stack gap="12px" style={{ width: "100%", maxWidth: 280 }}>
          <Button fullWidth>Continue</Button>
          <Button fullWidth variant="outline">Save draft</Button>
          <Button fullWidth variant="ghost">Cancel</Button>
        </Stack>
      </DemoSection>
    </>
  );
}
