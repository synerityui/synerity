import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Badge } from "../components/Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders without text when dot=true", () => {
    render(<Badge dot variant="success">Hidden</Badge>);
    expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Badge className="custom">Label</Badge>);
    expect(screen.getByText("Label")).toHaveClass("custom");
  });
});
