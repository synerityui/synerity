import { Button, Modal } from "@synerity/ui";
import { useState } from "react";
import { DemoSection } from "./shared";

function ModalExample({ size }: { size?: "sm" | "md" | "lg" | "xl" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open {size ?? "md"} modal
      </Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title={`${(size ?? "md").toUpperCase()} Modal`}
        size={size}
        footer={
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </div>
        }
      >
        <p style={{ color: "var(--synerity-color-text-secondary)", lineHeight: 1.6 }}>
          This is the modal body. It traps focus when open and restores it to the trigger on close.
          Press Escape to dismiss.
        </p>
      </Modal>
    </>
  );
}

export function ModalDemo() {
  return (
    <>
      <DemoSection
        title="Sizes"
        code={`const [open, setOpen] = useState(false);\n\n<Button onClick={() => setOpen(true)}>Open modal</Button>\n<Modal\n  open={open}\n  onOpenChange={setOpen}\n  title="Modal"\n  size="md"\n  footer={<Button onClick={() => setOpen(false)}>Close</Button>}\n>\n  <p>Modal content here.</p>\n</Modal>`}
      >
        <ModalExample size="sm" />
        <ModalExample size="md" />
        <ModalExample size="lg" />
      </DemoSection>
    </>
  );
}
