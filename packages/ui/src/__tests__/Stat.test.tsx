import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Stat } from "../components/Stat";

describe("Stat", () => {
  it("renders label and value", () => {
    render(<Stat label="Users" value="1,234" />);
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("1,234")).toBeInTheDocument();
  });

  it("renders trend value when provided", () => {
    render(<Stat label="Revenue" value="$5k" trendValue="+12%" />);
    expect(screen.getByText("+12%")).toBeInTheDocument();
  });

  it("renders help text when provided", () => {
    render(<Stat label="Revenue" value="$5k" helpText="vs last month" />);
    expect(screen.getByText("vs last month")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Stat label="X" value="0" className="card" />);
    expect(container.firstChild).toHaveClass("card");
  });

  it("forwards additional HTML attributes", () => {
    render(<Stat label="X" value="0" data-testid="stat-box" />);
    expect(screen.getByTestId("stat-box")).toBeInTheDocument();
  });
});
