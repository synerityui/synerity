import { Popover, Button } from "@synerity/ui";
import { DemoSection } from "./shared";

export function PopoverDemo() {
  return (
    <>
      <DemoSection
        title="Basic"
        code={`<Popover\n  trigger={<Button variant="outline">Open popover</Button>}\n  placement="bottom"\n>\n  <div style={{ padding: "12px 16px" }}>\n    <strong>Popover content</strong>\n    <p>Click outside or press Escape to close.</p>\n  </div>\n</Popover>`}
      >
        <Popover
          trigger={<Button variant="outline">Open popover</Button>}
          placement="bottom"
        >
          <div style={{ padding: "12px 16px" }}>
            <strong>Popover content</strong>
            <p style={{ marginTop: 4, fontSize: 14, color: "var(--synerity-color-text-subtle)" }}>
              Click outside or press Escape to close.
            </p>
          </div>
        </Popover>
      </DemoSection>

      <DemoSection
        title="Placements"
        code={`<Popover trigger={<Button size="sm">Top</Button>} placement="top">…</Popover>\n<Popover trigger={<Button size="sm">Bottom</Button>} placement="bottom">…</Popover>\n<Popover trigger={<Button size="sm">Left</Button>} placement="left">…</Popover>\n<Popover trigger={<Button size="sm">Right</Button>} placement="right">…</Popover>`}
      >
        <Popover trigger={<Button size="sm" variant="outline">Top</Button>} placement="top">
          <div style={{ padding: "8px 12px", fontSize: 13 }}>Placed on top</div>
        </Popover>
        <Popover trigger={<Button size="sm" variant="outline">Bottom</Button>} placement="bottom">
          <div style={{ padding: "8px 12px", fontSize: 13 }}>Placed on bottom</div>
        </Popover>
        <Popover trigger={<Button size="sm" variant="outline">Left</Button>} placement="left">
          <div style={{ padding: "8px 12px", fontSize: 13 }}>Placed on left</div>
        </Popover>
        <Popover trigger={<Button size="sm" variant="outline">Right</Button>} placement="right">
          <div style={{ padding: "8px 12px", fontSize: 13 }}>Placed on right</div>
        </Popover>
      </DemoSection>
    </>
  );
}
