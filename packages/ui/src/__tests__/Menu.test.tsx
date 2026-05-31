import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Menu, MenuItem, MenuDivider, MenuGroup } from "../components/Menu";
import { Button } from "../components/Button";

function TestMenu({ onSelect }: { onSelect?: (v: string) => void }) {
  return (
    <Menu trigger={<Button>Actions</Button>} {...(onSelect ? { onSelect } : {})}>
      <MenuItem value="edit">Edit</MenuItem>
      <MenuItem value="copy">Copy</MenuItem>
      <MenuDivider />
      <MenuItem value="delete" disabled>Delete</MenuItem>
    </Menu>
  );
}

describe("Menu", () => {
  it("does not show items by default", () => {
    render(<TestMenu />);
    expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();
  });

  it("shows items when trigger is clicked", async () => {
    render(<TestMenu />);
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    expect(screen.getAllByRole("menuitem").length).toBeGreaterThan(0);
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  it("renders menu separator", async () => {
    render(<TestMenu />);
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("disabled item has aria-disabled", async () => {
    render(<TestMenu />);
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    const deleteItem = screen.getByText("Delete").closest("[role='menuitem']");
    expect(deleteItem).toHaveAttribute("aria-disabled");
  });
});

describe("MenuGroup", () => {
  it("renders group label and children", async () => {
    render(
      <Menu trigger={<Button>Open</Button>}>
        <MenuGroup label="Actions">
          <MenuItem value="edit">Edit</MenuItem>
        </MenuGroup>
      </Menu>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByText("Actions")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });
});
