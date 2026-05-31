import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Modal } from "../components/Modal";

describe("Modal", () => {
  it("renders nothing when open=false", () => {
    render(<Modal open={false}>Body</Modal>);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders dialog when open=true", () => {
    render(<Modal open>Body</Modal>);
    expect(screen.getByRole("dialog", { hidden: true })).toBeInTheDocument();
  });

  it("renders children inside dialog", () => {
    render(<Modal open>Modal content</Modal>);
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(<Modal open title="Confirm action">Body</Modal>);
    expect(screen.getByText("Confirm action")).toBeInTheDocument();
  });

  it("renders close button when title is provided", () => {
    render(<Modal open title="Title">Body</Modal>);
    expect(screen.getByRole("button", { name: "Close dialog", hidden: true })).toBeInTheDocument();
  });

  it("calls onOpenChange(false) when close button is clicked", async () => {
    const onOpenChange = vi.fn();
    render(<Modal open title="Title" onOpenChange={onOpenChange}>Body</Modal>);
    await userEvent.click(screen.getByRole("button", { name: "Close dialog", hidden: true }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("renders footer when provided", () => {
    render(
      <Modal open footer={<button>Save</button>}>
        Body
      </Modal>,
    );
    expect(screen.getByRole("button", { name: "Save", hidden: true })).toBeInTheDocument();
  });
});
