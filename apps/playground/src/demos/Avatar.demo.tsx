import { Avatar, AvatarGroup } from "@synerity/ui";
import { DemoSection } from "./shared";

export function AvatarDemo() {
  return (
    <>
      <DemoSection
        title="With initials"
        code={`<Avatar name="Alice Chen" size="md" />`}
      >
        <Avatar name="Alice Chen" size="xs" />
        <Avatar name="Bob Smith" size="sm" />
        <Avatar name="Carol White" size="md" />
        <Avatar name="David Lee" size="lg" />
        <Avatar name="Eva Green" size="xl" />
      </DemoSection>

      <DemoSection
        title="With image"
        code={`<Avatar\n  src="https://i.pravatar.cc/150?img=1"\n  name="Alice Chen"\n  size="md"\n/>`}
      >
        <Avatar src="https://i.pravatar.cc/150?img=1" name="Alice Chen" size="sm" />
        <Avatar src="https://i.pravatar.cc/150?img=5" name="Bob Smith" size="md" />
        <Avatar src="https://i.pravatar.cc/150?img=9" name="Carol White" size="lg" />
      </DemoSection>

      <DemoSection
        title="Avatar group"
        code={`<AvatarGroup max={3}>\n  <Avatar name="Alice Chen" />\n  <Avatar name="Bob Smith" />\n  <Avatar name="Carol White" />\n  <Avatar name="David Lee" />\n</AvatarGroup>`}
      >
        <AvatarGroup max={3}>
          <Avatar name="Alice Chen" />
          <Avatar name="Bob Smith" />
          <Avatar name="Carol White" />
          <Avatar name="David Lee" />
          <Avatar name="Eva Green" />
        </AvatarGroup>
      </DemoSection>
    </>
  );
}
