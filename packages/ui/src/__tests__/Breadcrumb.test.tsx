import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Breadcrumb } from "../components/Breadcrumb";

const ITEMS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Widget" },
];

describe("Breadcrumb", () => {
  it("renders nav with aria-label=Breadcrumb", () => {
    render(<Breadcrumb items={ITEMS} />);
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
  });

  it("renders all item labels", () => {
    render(<Breadcrumb items={ITEMS} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Widget")).toBeInTheDocument();
  });

  it("renders links for items with href", () => {
    render(<Breadcrumb items={ITEMS} />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute("href", "/products");
  });

  it("last item has aria-current=page and no link", () => {
    render(<Breadcrumb items={ITEMS} />);
    const last = screen.getByText("Widget");
    expect(last).toHaveAttribute("aria-current", "page");
    expect(last.tagName).not.toBe("A");
  });

  it("renders custom separator", () => {
    render(<Breadcrumb items={ITEMS} separator="›" />);
    const separators = screen.getAllByText("›");
    expect(separators).toHaveLength(2);
  });
});
