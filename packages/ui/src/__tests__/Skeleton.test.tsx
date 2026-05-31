import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";

import { Skeleton } from "../components/Skeleton";

describe("Skeleton", () => {
  it("renders with aria-hidden=true", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("applies explicit width", () => {
    const { container } = render(<Skeleton width={120} />);
    expect(container.firstChild).toHaveStyle({ width: "120px" });
  });

  it("applies explicit height", () => {
    const { container } = render(<Skeleton height={32} />);
    expect(container.firstChild).toHaveStyle({ height: "32px" });
  });

  it("applies full border-radius when circle=true", () => {
    const { container } = render(<Skeleton circle width={48} height={48} />);
    expect(container.firstChild).toHaveStyle({ borderRadius: "9999px" });
  });

  it("applies custom string width", () => {
    const { container } = render(<Skeleton width="70%" />);
    expect(container.firstChild).toHaveStyle({ width: "70%" });
  });

  it("applies custom className", () => {
    const { container } = render(<Skeleton className="shimmer" />);
    expect(container.firstChild).toHaveClass("shimmer");
  });
});
