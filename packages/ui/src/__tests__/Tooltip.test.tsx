import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Tooltip } from "../components/Tooltip";
import { Button } from "../components/Button";

describe("Tooltip", () => {
  it("does not show tooltip content by default", () => {
    render(
      <Tooltip content="Save file">
        <Button>Save</Button>
      </Tooltip>,
    );
    expect(screen.queryByText("Save file")).not.toBeInTheDocument();
  });

  it("shows tooltip content on hover", async () => {
    render(
      <Tooltip content="Save file" delay={0}>
        <Button>Save</Button>
      </Tooltip>,
    );
    await userEvent.hover(screen.getByRole("button", { name: "Save" }));
    expect(await screen.findByText("Save file")).toBeInTheDocument();
  });

  it("shows tooltip on focus", async () => {
    render(
      <Tooltip content="Tooltip text" delay={0}>
        <Button>Focus me</Button>
      </Tooltip>,
    );
    screen.getByRole("button", { name: "Focus me" }).focus();
    expect(await screen.findByText("Tooltip text")).toBeInTheDocument();
  });

  it("returns children directly when disabled=true", () => {
    render(
      <Tooltip content="Hidden" disabled>
        <Button>Child</Button>
      </Tooltip>,
    );
    expect(screen.getByRole("button", { name: "Child" })).toBeInTheDocument();
    expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
  });
});
