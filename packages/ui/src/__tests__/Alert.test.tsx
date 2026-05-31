import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Alert } from "../components/Alert";

describe("Alert", () => {
  it("has role=alert", () => {
    render(<Alert>Something happened</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders children as description", () => {
    render(<Alert>Watch out</Alert>);
    expect(screen.getByText("Watch out")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(<Alert title="Heads up">Detail text</Alert>);
    expect(screen.getByText("Heads up")).toBeInTheDocument();
  });

  it("renders close button when onClose is provided", () => {
    render(<Alert onClose={vi.fn()}>Dismissible</Alert>);
    expect(screen.getByRole("button", { name: "Dismiss alert" })).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const onClose = vi.fn();
    render(<Alert onClose={onClose}>Dismissible</Alert>);
    await userEvent.click(screen.getByRole("button", { name: "Dismiss alert" }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("does not render close button without onClose", () => {
    render(<Alert>Static</Alert>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
