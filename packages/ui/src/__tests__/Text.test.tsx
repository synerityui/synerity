import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Text } from "../components/Text";

describe("Text", () => {
  it("renders as p by default", () => {
    const { container } = render(<Text>Hello</Text>);
    expect(container.firstChild?.nodeName).toBe("P");
  });

  it("renders children", () => {
    render(<Text>Some text</Text>);
    expect(screen.getByText("Some text")).toBeInTheDocument();
  });

  it("renders as span via as prop", () => {
    const { container } = render(<Text as="span">Inline</Text>);
    expect(container.firstChild?.nodeName).toBe("SPAN");
  });

  it("applies custom className", () => {
    render(<Text className="muted">Text</Text>);
    expect(screen.getByText("Text")).toHaveClass("muted");
  });

  it("forwards ref", () => {
    const ref = { current: null };
    render(<Text ref={ref}>Ref text</Text>);
    expect(ref.current).not.toBeNull();
  });
});
