import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Pagination } from "../components/Pagination";

describe("Pagination", () => {
  it("renders nav with aria-label=Pagination", () => {
    render(<Pagination total={50} page={1} onChange={vi.fn()} />);
    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();
  });

  it("renders prev and next buttons", () => {
    render(<Pagination total={50} page={2} onChange={vi.fn()} />);
    expect(screen.getByLabelText("Previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Next page")).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    render(<Pagination total={50} page={1} onChange={vi.fn()} />);
    expect(screen.getByLabelText("Previous page")).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(<Pagination total={30} pageSize={10} page={3} onChange={vi.fn()} />);
    expect(screen.getByLabelText("Next page")).toBeDisabled();
  });

  it("calls onChange when a page is clicked", async () => {
    const onChange = vi.fn();
    render(<Pagination total={50} page={1} onChange={onChange} pageSize={10} />);
    await userEvent.click(screen.getByLabelText("Page 2"));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("marks current page with aria-current=page", () => {
    render(<Pagination total={50} page={2} onChange={vi.fn()} pageSize={10} />);
    expect(screen.getByLabelText("Page 2")).toHaveAttribute("aria-current", "page");
  });
});
