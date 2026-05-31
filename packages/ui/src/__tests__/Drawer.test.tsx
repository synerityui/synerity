import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Drawer } from "../components/Drawer";

describe("Drawer", () => {
  it("renders nothing when closed", () => {
    render(<Drawer open={false}>Body</Drawer>);
    expect(screen.queryByRole("dialog", { hidden: true })).not.toBeInTheDocument();
  });

  it("renders dialog when open=true", () => {
    render(<Drawer open>Drawer body</Drawer>);
    expect(screen.getByRole("dialog", { hidden: true })).toBeInTheDocument();
  });

  it("renders children", () => {
    render(<Drawer open>Drawer content</Drawer>);
    expect(screen.getByText("Drawer content")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(<Drawer open title="Settings">Body</Drawer>);
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders close button when title is present", () => {
    render(<Drawer open title="Settings">Body</Drawer>);
    expect(screen.getByRole("button", { name: "Close drawer", hidden: true })).toBeInTheDocument();
  });

  it("calls onOpenChange(false) on close", async () => {
    const onOpenChange = vi.fn();
    render(
      <Drawer open title="Drawer" onOpenChange={onOpenChange}>
        Body
      </Drawer>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Close drawer", hidden: true }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("renders footer when provided", () => {
    render(
      <Drawer open footer={<button>Apply</button>}>
        Body
      </Drawer>,
    );
    expect(screen.getByRole("button", { name: "Apply", hidden: true })).toBeInTheDocument();
  });
});
