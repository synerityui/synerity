import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Accordion } from "../components/Accordion";

const items = [
  { value: "a", title: "Section A", content: "Content A" },
  { value: "b", title: "Section B", content: "Content B" },
];

describe("Accordion — single", () => {
  it("all panels start collapsed", () => {
    render(<Accordion type="single" items={items} />);
    expect(screen.queryByText("Content A")).not.toBeInTheDocument();
    expect(screen.queryByText("Content B")).not.toBeInTheDocument();
  });

  it("clicking trigger expands panel", async () => {
    render(<Accordion type="single" items={items} />);
    await userEvent.click(screen.getByRole("button", { name: /Section A/i }));
    expect(screen.getByText("Content A")).toBeInTheDocument();
  });

  it("opening one item collapses the other", async () => {
    render(<Accordion type="single" items={items} />);
    await userEvent.click(screen.getByRole("button", { name: /Section A/i }));
    await userEvent.click(screen.getByRole("button", { name: /Section B/i }));
    expect(screen.queryByText("Content A")).not.toBeInTheDocument();
    expect(screen.getByText("Content B")).toBeInTheDocument();
  });
});

describe("Accordion — multiple", () => {
  it("can open multiple panels simultaneously", async () => {
    render(<Accordion type="multiple" items={items} />);
    await userEvent.click(screen.getByRole("button", { name: /Section A/i }));
    await userEvent.click(screen.getByRole("button", { name: /Section B/i }));
    expect(screen.getByText("Content A")).toBeInTheDocument();
    expect(screen.getByText("Content B")).toBeInTheDocument();
  });
});
