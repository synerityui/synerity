import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Stepper } from "../components/Stepper";

const STEPS = [
  { label: "Account" },
  { label: "Plan" },
  { label: "Payment" },
];

describe("Stepper", () => {
  it("renders all steps", () => {
    render(<Stepper steps={STEPS} currentStep={0} />);
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Plan")).toBeInTheDocument();
    expect(screen.getByText("Payment")).toBeInTheDocument();
  });

  it("marks current step with aria-label containing 'current'", () => {
    render(<Stepper steps={STEPS} currentStep={1} />);
    expect(screen.getByLabelText(/Step 2: Plan — current/i)).toBeInTheDocument();
  });

  it("marks completed steps with aria-label containing 'complete'", () => {
    render(<Stepper steps={STEPS} currentStep={1} />);
    expect(screen.getByLabelText(/Step 1: Account — complete/i)).toBeInTheDocument();
  });

  it("marks upcoming steps with aria-label containing 'upcoming'", () => {
    render(<Stepper steps={STEPS} currentStep={0} />);
    expect(screen.getByLabelText(/Step 3: Payment — upcoming/i)).toBeInTheDocument();
  });

  it("renders step descriptions when provided", () => {
    render(
      <Stepper
        steps={[{ label: "Account", description: "Personal info" }, { label: "Plan" }]}
        currentStep={0}
      />,
    );
    expect(screen.getByText("Personal info")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Stepper steps={STEPS} currentStep={0} className="wizard" />);
    expect(container.firstChild).toHaveClass("wizard");
  });
});
