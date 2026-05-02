import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Tabs, TabList, Tab, TabPanel } from "../components/Tabs";

function TestTabs({ onChange }: { onChange?: (v: string) => void }) {
  return (
    <Tabs defaultValue="a" onChange={onChange}>
      <TabList>
        <Tab value="a">Tab A</Tab>
        <Tab value="b">Tab B</Tab>
        <Tab value="c" disabled>Tab C</Tab>
      </TabList>
      <TabPanel value="a">Content A</TabPanel>
      <TabPanel value="b">Content B</TabPanel>
      <TabPanel value="c">Content C</TabPanel>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("renders the default active tab panel", () => {
    render(<TestTabs />);
    expect(screen.getByText("Content A")).toBeInTheDocument();
    expect(screen.queryByText("Content B")).not.toBeInTheDocument();
  });

  it("switches panel on tab click", async () => {
    render(<TestTabs />);
    await userEvent.click(screen.getByRole("tab", { name: "Tab B" }));
    expect(screen.getByText("Content B")).toBeInTheDocument();
    expect(screen.queryByText("Content A")).not.toBeInTheDocument();
  });

  it("calls onChange when tab is clicked", async () => {
    const onChange = vi.fn();
    render(<TestTabs onChange={onChange} />);
    await userEvent.click(screen.getByRole("tab", { name: "Tab B" }));
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("selected tab has aria-selected=true", () => {
    render(<TestTabs />);
    expect(screen.getByRole("tab", { name: "Tab A" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Tab B" })).toHaveAttribute("aria-selected", "false");
  });

  it("disabled tab is not clickable", async () => {
    const onChange = vi.fn();
    render(<TestTabs onChange={onChange} />);
    await userEvent.click(screen.getByRole("tab", { name: "Tab C" }));
    expect(onChange).not.toHaveBeenCalledWith("c");
  });
});
