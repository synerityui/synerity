import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Text } from "@synerity/ui";
import { DemoSection } from "./shared";

export function CardDemo() {
  return (
    <>
      <DemoSection
        title="Basic card"
        col
        code={`<Card>\n  <CardHeader>Card title</CardHeader>\n  <CardBody>Card content goes here.</CardBody>\n  <CardFooter><Button size="sm">Action</Button></CardFooter>\n</Card>`}
      >
        <Card style={{ width: "100%", maxWidth: 360 }}>
          <CardHeader>Card title</CardHeader>
          <CardBody>
            <Text>Card content goes here. You can put any content inside.</Text>
          </CardBody>
          <CardFooter>
            <Button size="sm">Action</Button>
            <Button size="sm" variant="ghost">Cancel</Button>
          </CardFooter>
        </Card>
      </DemoSection>

      <DemoSection
        title="Shadow variants"
        code={`<Card shadow="none">No shadow</Card>\n<Card shadow="sm">Small shadow</Card>\n<Card shadow="md">Medium shadow</Card>\n<Card shadow="lg">Large shadow</Card>`}
      >
        {(["none", "sm", "md", "lg"] as const).map((s) => (
          <Card key={s} shadow={s} style={{ padding: "20px 24px", minWidth: 120 }}>
            <Text size="sm" weight="medium">{s === "none" ? "No shadow" : `Shadow ${s}`}</Text>
          </Card>
        ))}
      </DemoSection>

      <DemoSection
        title="With badge in header"
        col
        code={`<Card>\n  <CardHeader>\n    <span>Active plan</span>\n    <Badge variant="subtle" colorScheme="success">Pro</Badge>\n  </CardHeader>\n  <CardBody>…</CardBody>\n</Card>`}
      >
        <Card style={{ width: "100%", maxWidth: 360 }}>
          <CardHeader>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Active plan</span>
              <Badge variant="success">Pro</Badge>
            </div>
          </CardHeader>
          <CardBody>
            <Text color="secondary">Your Pro plan renews on June 1, 2026.</Text>
          </CardBody>
        </Card>
      </DemoSection>
    </>
  );
}
