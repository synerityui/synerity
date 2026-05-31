import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Spinner } from "../components/Spinner";

describe("Spinner", () => {
  it("has role=status", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("uses default aria-label Loading…", () => {
    render(<Spinner />);
    expect(screen.getByLabelText("Loading…")).toBeInTheDocument();
  });

  it("accepts custom label", () => {
    render(<Spinner label="Fetching data" />);
    expect(screen.getByLabelText("Fetching data")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Spinner className="my-spinner" />);
    expect(container.firstChild).toHaveClass("my-spinner");
  });
});
