import { Alert } from "@synerity/ui";
import { DemoSection } from "./shared";

export function AlertDemo() {
  return (
    <>
      <DemoSection
        title="Variants"
        col
        code={`<Alert variant="info" title="Info">Your account has been updated.</Alert>\n<Alert variant="success" title="Success">Changes saved successfully.</Alert>\n<Alert variant="warning" title="Warning">Your plan expires in 3 days.</Alert>\n<Alert variant="error" title="Error">Failed to save. Please try again.</Alert>`}
      >
        <Alert variant="info" title="Info">
          Your account has been updated.
        </Alert>
        <Alert variant="success" title="Success">
          Changes saved successfully.
        </Alert>
        <Alert variant="warning" title="Warning">
          Your plan expires in 3 days.
        </Alert>
        <Alert variant="error" title="Error">
          Failed to save. Please try again.
        </Alert>
      </DemoSection>

      <DemoSection
        title="Without title"
        col
        code={`<Alert variant="info">A new version is available. Refresh to update.</Alert>`}
      >
        <Alert variant="info">A new version is available. Refresh to update.</Alert>
      </DemoSection>
    </>
  );
}
