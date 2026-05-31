import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Callout } from "../components/Callout";

describe("Callout", () => {
  it("has role=note", () => {
    render(<Callout>Message</Callout>);
    expect(screen.getByRole("note")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(<Callout>Read the docs</Callout>);
    expect(screen.getByText("Read the docs")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(<Callout title="Important">Detail</Callout>);
    expect(screen.getByText("Important")).toBeInTheDocument();
  });

  it("renders custom icon when provided", () => {
    render(<Callout icon={<span data-testid="icon">★</span>}>Info</Callout>);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Callout className="custom">Text</Callout>);
    expect(container.firstChild).toHaveClass("custom");
  });
});
