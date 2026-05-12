import { Callout } from "@synerity/ui";
import { DemoSection } from "./shared";

export function CalloutDemo() {
  return (
    <>
      <DemoSection
        title="Variants"
        col
        code={`<Callout variant="info">Info callout</Callout>\n<Callout variant="success">Success callout</Callout>\n<Callout variant="warning">Warning callout</Callout>\n<Callout variant="danger">Danger callout</Callout>\n<Callout variant="neutral">Neutral callout</Callout>`}
      >
        <Callout variant="info">Your session will expire in 10 minutes.</Callout>
        <Callout variant="success">Your changes have been saved successfully.</Callout>
        <Callout variant="warning">This action may affect other users in your organisation.</Callout>
        <Callout variant="danger">This operation is irreversible. Proceed with caution.</Callout>
        <Callout variant="neutral">Some features are unavailable in the free plan.</Callout>
      </DemoSection>

      <DemoSection
        title="With title"
        col
        code={`<Callout variant="info" title="New version available">\n  Upgrade to v2.0 to access the latest features and security patches.\n</Callout>\n<Callout variant="warning" title="Storage limit reached">\n  You have used 95% of your storage quota. Consider upgrading your plan.\n</Callout>`}
      >
        <Callout variant="info" title="New version available">
          Upgrade to v2.0 to access the latest features and security patches.
        </Callout>
        <Callout variant="warning" title="Storage limit reached">
          You have used 95% of your storage quota. Consider upgrading your plan.
        </Callout>
      </DemoSection>
    </>
  );
}
