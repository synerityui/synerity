import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Group } from "../components/Group";
import { Divider } from "../components/Divider";
import { Container } from "../components/Container";
import { Grid } from "../components/Grid";
import { AspectRatio } from "../components/AspectRatio";
import { ScrollArea } from "../components/ScrollArea";

// ── Group ────────────────────────────────────────────────────────────────────

describe("Group", () => {
  it("renders children", () => {
    render(
      <Group>
        <span>A</span>
        <span>B</span>
      </Group>,
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("applies gap via inline style", () => {
    const { container } = render(<Group gap="8px">child</Group>);
    expect(container.firstChild).toHaveStyle({ gap: "8px" });
  });

  it("applies custom className", () => {
    const { container } = render(<Group className="row">child</Group>);
    expect(container.firstChild).toHaveClass("row");
  });

  it("forwards ref", () => {
    const ref = { current: null };
    render(<Group ref={ref}>child</Group>);
    expect(ref.current).not.toBeNull();
  });
});

// ── Divider ──────────────────────────────────────────────────────────────────

describe("Divider", () => {
  it("renders horizontal separator by default (hr)", () => {
    const { container } = render(<Divider />);
    expect(container.querySelector("hr")).toBeInTheDocument();
  });

  it("renders vertical separator with role=separator and aria-orientation=vertical", () => {
    render(<Divider orientation="vertical" />);
    const sep = screen.getByRole("separator");
    expect(sep).toHaveAttribute("aria-orientation", "vertical");
  });

  it("renders label when provided", () => {
    render(<Divider label="OR" />);
    expect(screen.getByText("OR")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Divider className="my-divider" />);
    expect(container.firstChild).toHaveClass("my-divider");
  });
});

// ── Container ────────────────────────────────────────────────────────────────

describe("Container", () => {
  it("renders children", () => {
    render(<Container>Page content</Container>);
    expect(screen.getByText("Page content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Container className="page-wrap">content</Container>);
    expect(container.firstChild).toHaveClass("page-wrap");
  });
});

// ── Grid ─────────────────────────────────────────────────────────────────────

describe("Grid", () => {
  it("renders children", () => {
    render(
      <Grid cols={2}>
        <div>Cell 1</div>
        <div>Cell 2</div>
      </Grid>,
    );
    expect(screen.getByText("Cell 1")).toBeInTheDocument();
    expect(screen.getByText("Cell 2")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Grid cols={3} className="my-grid">x</Grid>);
    expect(container.firstChild).toHaveClass("my-grid");
  });
});

// ── AspectRatio ──────────────────────────────────────────────────────────────

describe("AspectRatio", () => {
  it("renders children", () => {
    render(<AspectRatio ratio={16 / 9}><img alt="test" src="#" /></AspectRatio>);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<AspectRatio ratio={1} className="square">x</AspectRatio>);
    expect(container.firstChild).toHaveClass("square");
  });
});

// ── ScrollArea ───────────────────────────────────────────────────────────────

describe("ScrollArea", () => {
  it("renders children", () => {
    render(<ScrollArea><p>Scrollable</p></ScrollArea>);
    expect(screen.getByText("Scrollable")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ScrollArea className="scroll-box">x</ScrollArea>);
    expect(container.firstChild).toHaveClass("scroll-box");
  });
});
