import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Timeline } from "../components/Timeline";

const ITEMS = [
  { id: "1", title: "Deployed v1.0", time: "2 min ago", variant: "success" as const },
  { id: "2", title: "Tests failed", description: "3 suites broken", time: "10 min ago", variant: "danger" as const },
  { id: "3", title: "PR merged", time: "1 hour ago" },
];

describe("Timeline", () => {
  it("renders all item titles", () => {
    render(<Timeline items={ITEMS} />);
    expect(screen.getByText("Deployed v1.0")).toBeInTheDocument();
    expect(screen.getByText("Tests failed")).toBeInTheDocument();
    expect(screen.getByText("PR merged")).toBeInTheDocument();
  });

  it("renders time for each item", () => {
    render(<Timeline items={ITEMS} />);
    expect(screen.getByText("2 min ago")).toBeInTheDocument();
    expect(screen.getByText("1 hour ago")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<Timeline items={ITEMS} />);
    expect(screen.getByText("3 suites broken")).toBeInTheDocument();
  });

  it("renders custom icon when provided", () => {
    render(
      <Timeline
        items={[{ id: "x", title: "Event", icon: <span data-testid="custom-icon">●</span> }]}
      />,
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Timeline items={ITEMS} className="feed" />);
    expect(container.firstChild).toHaveClass("feed");
  });
});
