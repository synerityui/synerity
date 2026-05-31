import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Heading } from "../components/Heading";

describe("Heading", () => {
  it("renders as h2 by default", () => {
    render(<Heading>Title</Heading>);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("renders as h1 when level=1", () => {
    render(<Heading level={1}>Page title</Heading>);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders as h3 when level=3", () => {
    render(<Heading level={3}>Section</Heading>);
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
  });

  it("renders as a custom element via as prop", () => {
    const { container } = render(<Heading as="div" level={2}>Heading</Heading>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("applies custom className", () => {
    render(<Heading className="hero-title">Title</Heading>);
    expect(screen.getByRole("heading")).toHaveClass("hero-title");
  });

  it("renders children", () => {
    render(<Heading>My heading text</Heading>);
    expect(screen.getByText("My heading text")).toBeInTheDocument();
  });
});
