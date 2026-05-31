import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Popover } from "../components/Popover";
import { Button } from "../components/Button";

describe("Popover", () => {
  it("does not show content by default", () => {
    render(
      <Popover trigger={<Button>Open</Button>}>
        <p>Popover body</p>
      </Popover>,
    );
    expect(screen.queryByText("Popover body")).not.toBeInTheDocument();
  });

  it("shows content when trigger is clicked", async () => {
    render(
      <Popover trigger={<Button>Open</Button>}>
        <p>Popover body</p>
      </Popover>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByText("Popover body")).toBeInTheDocument();
  });

  it("hides content when trigger is clicked again", async () => {
    render(
      <Popover trigger={<Button>Toggle</Button>}>
        <p>Content</p>
      </Popover>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Toggle" }));
    await userEvent.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("renders as open when open=true", () => {
    render(
      <Popover open onOpenChange={vi.fn()} trigger={<Button>Trigger</Button>}>
        <p>Forced open</p>
      </Popover>,
    );
    expect(screen.getByText("Forced open")).toBeInTheDocument();
  });

  it("hides when open=false", () => {
    render(
      <Popover open={false} onOpenChange={vi.fn()} trigger={<Button>Trigger</Button>}>
        <p>Hidden</p>
      </Popover>,
    );
    expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
  });
});
