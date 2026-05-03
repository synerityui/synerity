import { Tab, TabList, TabPanel, Tabs } from "@synerity/ui";
import { DemoSection } from "./shared";

export function TabsDemo() {
  return (
    <>
      <DemoSection
        title="Variants"
        col
        code={`<Tabs defaultValue="overview" variant="line">\n  <TabList>\n    <Tab value="overview">Overview</Tab>\n    <Tab value="analytics">Analytics</Tab>\n    <Tab value="settings">Settings</Tab>\n  </TabList>\n  <TabPanel value="overview">Overview content</TabPanel>\n  …\n</Tabs>`}
      >
        {(["line", "solid", "pills"] as const).map((variant) => (
          <div key={variant} style={{ width: "100%" }}>
            <div style={{ fontSize: 11, fontFamily: "IBM Plex Mono, monospace", color: "var(--synerity-color-text-secondary)", marginBottom: 8 }}>
              variant="{variant}"
            </div>
            <Tabs defaultValue="overview" variant={variant}>
              <TabList>
                <Tab value="overview">Overview</Tab>
                <Tab value="analytics">Analytics</Tab>
                <Tab value="settings">Settings</Tab>
              </TabList>
              <TabPanel value="overview">
                <p style={{ padding: "16px 0", color: "var(--synerity-color-text-secondary)", fontSize: 13 }}>
                  Overview tab content.
                </p>
              </TabPanel>
              <TabPanel value="analytics">
                <p style={{ padding: "16px 0", color: "var(--synerity-color-text-secondary)", fontSize: 13 }}>
                  Analytics tab content.
                </p>
              </TabPanel>
              <TabPanel value="settings">
                <p style={{ padding: "16px 0", color: "var(--synerity-color-text-secondary)", fontSize: 13 }}>
                  Settings tab content.
                </p>
              </TabPanel>
            </Tabs>
          </div>
        ))}
      </DemoSection>
    </>
  );
}
