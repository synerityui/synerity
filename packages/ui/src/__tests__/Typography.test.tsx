import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Link } from "../components/Link";
import { Mark } from "../components/Mark";
import { Truncate } from "../components/Truncate";

// ── Link ─────────────────────────────────────────────────────────────────────

describe("Link", () => {
  it("renders children", () => {
    render(<Link href="/docs">Docs</Link>);
    expect(screen.getByText("Docs")).toBeInTheDocument();
  });

  it("renders as an anchor element", () => {
    render(<Link href="/about">About</Link>);
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
  });

  it("does not add target=_blank for internal links", () => {
    render(<Link href="/about">About</Link>);
    expect(screen.getByRole("link")).not.toHaveAttribute("target", "_blank");
  });

  it("adds target=_blank and rel=noopener noreferrer for external links", () => {
    render(<Link href="https://example.com" external>External</Link>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("applies custom className", () => {
    render(<Link href="#" className="nav-link">Nav</Link>);
    expect(screen.getByRole("link")).toHaveClass("nav-link");
  });

  it("forwards ref", () => {
    const ref = { current: null };
    render(<Link href="#" ref={ref}>Ref link</Link>);
    expect(ref.current).not.toBeNull();
  });
});

// ── Mark ─────────────────────────────────────────────────────────────────────

describe("Mark", () => {
  it("renders a <mark> element", () => {
    const { container } = render(<Mark>highlighted</Mark>);
    expect(container.querySelector("mark")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(<Mark>Important</Mark>);
    expect(screen.getByText("Important")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Mark className="my-mark">text</Mark>);
    expect(container.querySelector("mark")).toHaveClass("my-mark");
  });
});

// ── Truncate ─────────────────────────────────────────────────────────────────

describe("Truncate", () => {
  it("renders children", () => {
    render(<Truncate>Long text here</Truncate>);
    expect(screen.getByText("Long text here")).toBeInTheDocument();
  });

  it("renders as span for single-line (lines=1)", () => {
    const { container } = render(<Truncate lines={1}>text</Truncate>);
    expect(container.firstChild?.nodeName).toBe("SPAN");
  });

  it("renders as div for multi-line (lines>1)", () => {
    const { container } = render(<Truncate lines={3}>text</Truncate>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("applies WebkitLineClamp style for multi-line", () => {
    const { container } = render(<Truncate lines={2}>text</Truncate>);
    expect(container.firstChild).toHaveStyle({ WebkitLineClamp: 2 });
  });

  it("applies custom className", () => {
    const { container } = render(<Truncate className="clip">text</Truncate>);
    expect(container.firstChild).toHaveClass("clip");
  });
});
