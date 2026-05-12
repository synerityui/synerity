import { useState } from "react";
import { Drawer, Button, Stack, Input, Switch } from "@synerity/ui";
import { DemoSection } from "./shared";
import type { DrawerPlacement } from "@synerity/ui";

export function DrawerDemo() {
  const [rightOpen, setRightOpen] = useState(false);
  const [placementOpen, setPlacementOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerPlacement>("right");

  const openWith = (p: DrawerPlacement) => {
    setPlacement(p);
    setPlacementOpen(true);
  };

  return (
    <>
      <DemoSection
        title="Right drawer"
        code={`<Button onClick={() => setOpen(true)}>Open drawer</Button>\n\n<Drawer\n  open={open}\n  onOpenChange={setOpen}\n  title="Edit profile"\n  footer={<Button fullWidth>Save changes</Button>}\n>\n  <Stack gap={4}>\n    <Input label="Display name" defaultValue="Bhushan" />\n    <Switch label="Email notifications" />\n  </Stack>\n</Drawer>`}
      >
        <Button onClick={() => setRightOpen(true)}>Open drawer</Button>
        <Drawer
          open={rightOpen}
          onOpenChange={setRightOpen}
          title="Edit profile"
          footer={
            <Button fullWidth onClick={() => setRightOpen(false)}>
              Save changes
            </Button>
          }
        >
          <Stack gap={4}>
            <Input label="Display name" defaultValue="Bhushan" />
            <Switch label="Email notifications" />
          </Stack>
        </Drawer>
      </DemoSection>

      <DemoSection
        title="Placements"
        code={`<Button onClick={() => openWith("left")}>Left</Button>\n<Button onClick={() => openWith("right")}>Right</Button>\n<Button onClick={() => openWith("top")}>Top</Button>\n<Button onClick={() => openWith("bottom")}>Bottom</Button>`}
      >
        {(["left", "right", "top", "bottom"] as DrawerPlacement[]).map((p) => (
          <Button key={p} variant="outline" size="sm" onClick={() => openWith(p)}>
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </Button>
        ))}
        <Drawer
          open={placementOpen}
          onOpenChange={setPlacementOpen}
          placement={placement}
          title={`${placement.charAt(0).toUpperCase() + placement.slice(1)} drawer`}
        >
          <p style={{ padding: "4px 0", color: "var(--synerity-color-text-subtle)", fontSize: 14 }}>
            This drawer slides in from the <strong>{placement}</strong>.
          </p>
        </Drawer>
      </DemoSection>
    </>
  );
}
