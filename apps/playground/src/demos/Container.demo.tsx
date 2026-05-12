import { Container, Text } from "@synerity/ui";
import { DemoSection } from "./shared";

const innerBox = (label: string) => (
  <div
    style={{
      padding: "8px 12px",
      border: "1px dashed var(--synerity-color-border)",
      borderRadius: "var(--synerity-radius-sm)",
      fontSize: 13,
      color: "var(--synerity-color-text-subtle)",
      textAlign: "center",
    }}
  >
    {label}
  </div>
);

export function ContainerDemo() {
  return (
    <>
      <DemoSection
        title="Sizes"
        col
        code={`<Container size="sm">{/* max-width: sm */}</Container>\n<Container size="md">{/* max-width: md */}</Container>\n<Container size="lg">{/* max-width: lg */}</Container>\n<Container size="xl">{/* max-width: xl */}</Container>`}
      >
        <Container size="sm">
          {innerBox("sm — max-width: 640px")}
        </Container>
        <Container size="md">
          {innerBox("md — max-width: 768px")}
        </Container>
        <Container size="lg">
          {innerBox("lg — max-width: 1024px")}
        </Container>
        <Container size="xl">
          {innerBox("xl — max-width: 1280px")}
        </Container>
        <Text size="xs" style={{ color: "var(--synerity-color-text-subtle)" }}>
          Containers are centred with horizontal padding. Resize the window to see them respond.
        </Text>
      </DemoSection>
    </>
  );
}
