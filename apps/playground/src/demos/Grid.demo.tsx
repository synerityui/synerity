import { Grid, Card, CardBody } from "@synerity/ui";
import { DemoSection } from "./shared";

export function GridDemo() {
  return (
    <>
      <DemoSection
        title="3 columns"
        col
        code={`<Grid cols={3}>\n  {["1","2","3","4","5","6"].map(n => (\n    <Card key={n}><CardBody>{n}</CardBody></Card>\n  ))}\n</Grid>`}
      >
        <Grid cols={3}>
          {["1", "2", "3", "4", "5", "6"].map((n) => (
            <Card key={n}>
              <CardBody>
                <span style={{ fontWeight: 600, fontSize: 18 }}>{n}</span>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </DemoSection>

      <DemoSection
        title="2 columns with gap"
        col
        code={`<Grid cols={2} gap={6}>\n  {["1","2","3","4"].map(n => (\n    <Card key={n}><CardBody>Item {n}</CardBody></Card>\n  ))}\n</Grid>`}
      >
        <Grid cols={2} gap={6}>
          {["1", "2", "3", "4"].map((n) => (
            <Card key={n}>
              <CardBody>Item {n}</CardBody>
            </Card>
          ))}
        </Grid>
      </DemoSection>
    </>
  );
}
