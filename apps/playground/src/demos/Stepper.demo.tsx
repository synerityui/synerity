import { useState } from "react";
import { Stepper, Button, Group } from "@synerity/ui";
import { DemoSection } from "./shared";

const steps = [
  { label: "Account details" },
  { label: "Verify email" },
  { label: "Set up workspace" },
];

export function StepperDemo() {
  const [currentStep, setCurrentStep] = useState(0);

  const prev = () => setCurrentStep((s) => Math.max(0, s - 1));
  const next = () => setCurrentStep((s) => Math.min(steps.length - 1, s + 1));

  return (
    <>
      <DemoSection
        title="Horizontal (interactive)"
        col
        code={`const [currentStep, setCurrentStep] = useState(0);\n\n<Stepper steps={steps} currentStep={currentStep} />\n<Group>\n  <Button onClick={prev} disabled={currentStep === 0}>Previous</Button>\n  <Button onClick={next} disabled={currentStep === steps.length - 1}>Next</Button>\n</Group>`}
      >
        <Stepper steps={steps} currentStep={currentStep} orientation="horizontal" />
        <Group style={{ marginTop: 16 }}>
          <Button size="sm" variant="outline" onClick={prev} disabled={currentStep === 0}>
            Previous
          </Button>
          <Button size="sm" onClick={next} disabled={currentStep === steps.length - 1}>
            Next
          </Button>
        </Group>
      </DemoSection>

      <DemoSection
        title="Vertical"
        col
        code={`<Stepper\n  orientation="vertical"\n  currentStep={1}\n  steps={[\n    { label: "Account details", description: "Name and email" },\n    { label: "Verify email", description: "Check your inbox" },\n    { label: "Set up workspace", description: "Configure your team" },\n  ]}\n/>`}
      >
        <Stepper
          orientation="vertical"
          currentStep={1}
          steps={[
            { label: "Account details", description: "Name and email" },
            { label: "Verify email", description: "Check your inbox" },
            { label: "Set up workspace", description: "Configure your team" },
          ]}
        />
      </DemoSection>
    </>
  );
}
