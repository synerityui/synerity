import { Timeline } from "@synerity/ui";
import { DemoSection } from "./shared";
import type { TimelineItem } from "@synerity/ui";

const activityItems: TimelineItem[] = [
  { id: "1", title: "Pull request merged", variant: "success", time: "2 min ago" },
  { id: "2", title: "CI pipeline failed", variant: "danger", time: "15 min ago" },
  { id: "3", title: "Deployment started", variant: "info", time: "1 hr ago" },
  { id: "4", title: "Review requested", variant: "warning", time: "3 hr ago" },
  { id: "5", title: "Branch created", variant: "default", time: "Yesterday" },
];

const descriptionItems: TimelineItem[] = [
  {
    id: "1",
    title: "Account created",
    description: "Bhushan signed up using GitHub OAuth.",
    variant: "success",
    time: "Jan 5, 2026",
  },
  {
    id: "2",
    title: "First project added",
    description: "Created the Synerity design system monorepo.",
    variant: "info",
    time: "Jan 6, 2026",
  },
  {
    id: "3",
    title: "v0.1.0 released",
    description: "Published the first stable version of @synerity/ui.",
    variant: "success",
    time: "Jan 10, 2026",
  },
];

export function TimelineDemo() {
  return (
    <>
      <DemoSection
        title="Activity feed"
        col
        code={`<Timeline items={[\n  { id: "1", title: "Pull request merged", variant: "success", time: "2 min ago" },\n  { id: "2", title: "CI pipeline failed", variant: "danger", time: "15 min ago" },\n  …\n]} />`}
      >
        <Timeline items={activityItems} />
      </DemoSection>

      <DemoSection
        title="With descriptions"
        col
        code={`<Timeline items={[\n  { id: "1", title: "Account created", description: "…", variant: "success", time: "Jan 5" },\n  …\n]} />`}
      >
        <Timeline items={descriptionItems} />
      </DemoSection>
    </>
  );
}
