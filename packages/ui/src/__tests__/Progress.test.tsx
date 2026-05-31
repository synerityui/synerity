import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Progress } from "../components/Progress";

describe("Progress", () => {
  it("has role=progressbar", () => {
    render(<Progress value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("sets aria-valuenow to the current value", () => {
    render(<Progress value={40} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "40");
  });

  it("sets aria-valuemax to max prop", () => {
    render(<Progress value={5} max={10} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuemax", "10");
  });

  it("renders label when provided", () => {
    render(<Progress value={60} label="Upload" />);
    expect(screen.getByText("Upload")).toBeInTheDocument();
  });

  it("renders percentage text when showValue=true", () => {
    render(<Progress value={75} showValue />);
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("clamps value above max to 100%", () => {
    render(<Progress value={150} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "150");
  });

  it("applies custom className", () => {
    const { container } = render(<Progress value={50} className="custom" />);
    expect(container.firstChild).toHaveClass("custom");
  });
});
