import { Menu, MenuItem, MenuDivider, MenuGroup, Button } from "@synerity/ui";
import { DemoSection } from "./shared";

export function MenuDemo() {
  return (
    <>
      <DemoSection
        title="Basic"
        code={`<Menu trigger={<Button variant="outline">Actions</Button>}>\n  <MenuItem value="edit">Edit</MenuItem>\n  <MenuItem value="duplicate">Duplicate</MenuItem>\n  <MenuItem value="delete">Delete</MenuItem>\n</Menu>`}
      >
        <Menu trigger={<Button variant="outline">Actions</Button>}>
          <MenuItem value="edit">Edit</MenuItem>
          <MenuItem value="duplicate">Duplicate</MenuItem>
          <MenuItem value="delete">Delete</MenuItem>
        </Menu>
      </DemoSection>

      <DemoSection
        title="With divider & group"
        code={`<Menu trigger={<Button variant="outline">Options</Button>}>\n  <MenuGroup label="Account">\n    <MenuItem value="profile">Profile</MenuItem>\n    <MenuItem value="settings">Settings</MenuItem>\n  </MenuGroup>\n  <MenuDivider />\n  <MenuItem value="logout">Log out</MenuItem>\n</Menu>`}
      >
        <Menu trigger={<Button variant="outline">Options</Button>}>
          <MenuGroup label="Account">
            <MenuItem value="profile">Profile</MenuItem>
            <MenuItem value="settings">Settings</MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuItem value="logout">Log out</MenuItem>
        </Menu>
      </DemoSection>

      <DemoSection
        title="Placements"
        code={`<Menu trigger={<Button size="sm">Bottom start</Button>} placement="bottom-start">…</Menu>\n<Menu trigger={<Button size="sm">Bottom end</Button>} placement="bottom-end">…</Menu>`}
      >
        <Menu
          trigger={<Button size="sm" variant="outline">Bottom start</Button>}
          placement="bottom-start"
        >
          <MenuItem value="a">Item A</MenuItem>
          <MenuItem value="b">Item B</MenuItem>
        </Menu>
        <Menu
          trigger={<Button size="sm" variant="outline">Bottom end</Button>}
          placement="bottom-end"
        >
          <MenuItem value="a">Item A</MenuItem>
          <MenuItem value="b">Item B</MenuItem>
        </Menu>
      </DemoSection>
    </>
  );
}
