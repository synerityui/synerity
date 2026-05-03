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
        isOpen={open}
        onClose={() => setOpen(false)}
        title={`${(size ?? "md").toUpperCase()} Modal`}
        size={size}
      >
        <p style={{ color: "var(--synerity-color-text-secondary)", lineHeight: 1.6 }}>
          This is the modal body. It traps focus when open and restores it to the trigger on close.
          Press Escape to dismiss.
        </p>
        <div style={{ marginTop: 24, display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Confirm</Button>
        </div>
      </Modal>
    </>
  );
}

export function ModalDemo() {
  return (
    <>
      <DemoSection
        title="Sizes"
        code={`const [open, setOpen] = useState(false);\n\n<Button onClick={() => setOpen(true)}>Open modal</Button>\n<Modal isOpen={open} onClose={() => setOpen(false)} title="Modal" size="md">\n  <p>Modal content here.</p>\n  <Button onClick={() => setOpen(false)}>Close</Button>\n</Modal>`}
      >
        <ModalExample size="sm" />
        <ModalExample size="md" />
        <ModalExample size="lg" />
      </DemoSection>
    </>
  );
}
