import { Stat, Grid } from "@synerity/ui";
import { DemoSection } from "./shared";

export function StatDemo() {
  return (
    <>
      <DemoSection
        title="Single stat"
        col
        code={`<Stat\n  label="Monthly Revenue"\n  value="$48,295"\n  trend="up"\n  trendValue="+12.5% vs last month"\n  helpText="Based on confirmed transactions"\n/>`}
      >
        <Stat
          label="Monthly Revenue"
          value="$48,295"
          trend="up"
          trendValue="+12.5% vs last month"
          helpText="Based on confirmed transactions"
        />
      </DemoSection>

      <DemoSection
        title="Dashboard grid"
        col
        code={`<Grid cols={3} gap={4}>\n  <Stat label="Users" value="12,840" trend="up" trendValue="+5.2%" />\n  <Stat label="Churn Rate" value="2.4%" trend="down" trendValue="-0.8%" />\n  <Stat label="Uptime" value="99.98%" trend="neutral" trendValue="SLA met" />\n</Grid>`}
      >
        <Grid cols={3} gap={4}>
          <Stat label="Users" value="12,840" trend="up" trendValue="+5.2%" />
          <Stat label="Churn Rate" value="2.4%" trend="down" trendValue="-0.8%" />
          <Stat label="Uptime" value="99.98%" trend="neutral" trendValue="SLA met" />
        </Grid>
      </DemoSection>
    </>
  );
}
