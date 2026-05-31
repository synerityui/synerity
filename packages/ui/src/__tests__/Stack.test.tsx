import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Stack } from "../components/Stack";

describe("Stack", () => {
  it("renders children", () => {
    render(
      <Stack>
        <span>Item 1</span>
        <span>Item 2</span>
      </Stack>,
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("applies gap via inline style", () => {
    const { container } = render(<Stack gap="16px">child</Stack>);
    expect(container.firstChild).toHaveStyle({ gap: "16px" });
  });

  it("applies align via inline style", () => {
    const { container } = render(<Stack align="center">child</Stack>);
    expect(container.firstChild).toHaveStyle({ alignItems: "center" });
  });

  it("applies justify via inline style", () => {
    const { container } = render(<Stack justify="space-between">child</Stack>);
    expect(container.firstChild).toHaveStyle({ justifyContent: "space-between" });
  });

  it("applies custom className", () => {
    const { container } = render(<Stack className="my-stack">child</Stack>);
    expect(container.firstChild).toHaveClass("my-stack");
  });

  it("forwards ref", () => {
    const ref = { current: null };
    render(<Stack ref={ref}>child</Stack>);
    expect(ref.current).not.toBeNull();
  });
});
