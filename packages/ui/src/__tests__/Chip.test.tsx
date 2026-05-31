import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Chip } from "../components/Chip";

describe("Chip", () => {
  it("renders label", () => {
    render(<Chip label="React" />);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("renders remove button when onRemove is provided", () => {
    render(<Chip label="Tag" onRemove={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Remove" })).toBeInTheDocument();
  });

  it("does not render remove button without onRemove", () => {
    render(<Chip label="Tag" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("calls onRemove when remove button is clicked", async () => {
    const onRemove = vi.fn();
    render(<Chip label="Tag" onRemove={onRemove} />);
    await userEvent.click(screen.getByRole("button", { name: "Remove" }));
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it("does not call onRemove when disabled", async () => {
    const onRemove = vi.fn();
    render(<Chip label="Tag" onRemove={onRemove} disabled />);
    await userEvent.click(screen.getByRole("button", { name: "Remove" }), {
      skipPointerEventsCheck: true,
    });
    expect(onRemove).not.toHaveBeenCalled();
  });

  it("applies custom className", () => {
    const { container } = render(<Chip label="Tag" className="custom" />);
    expect(container.firstChild).toHaveClass("custom");
  });
});
