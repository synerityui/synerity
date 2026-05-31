"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import { DemoSection, Row, Col } from "./shared";

import {
  Accordion,
  Alert,
  AspectRatio,
  Avatar,
  AvatarGroup,
  Badge,
  Breadcrumb,
  Button,
  Callout,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Chip,
  Combobox,
  Container,
  Divider,
  Drawer,
  Grid,
  Group,
  Heading,
  Input,
  Link,
  Mark,
  Menu,
  MenuDivider,
  MenuGroup,
  MenuItem,
  Modal,
  NumberInput,
  Pagination,
  PinInput,
  Popover,
  Progress,
  Radio,
  RadioGroup,
  ScrollArea,
  Select,
  Skeleton,
  Slider,
  Spinner,
  Stack,
  Stat,
  Stepper,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Timeline,
  Tooltip,
  Tr,
  Truncate,
} from "@synerity/ui";
import type { DrawerPlacement, TimelineItem } from "@synerity/ui";
import { Search, Trash } from "@synerity/icons";

// ── Button ────────────────────────────────────────────────────────────────────

function ButtonDemo() {
  return (
    <>
      <DemoSection title="Variants">
        <Button variant="solid">Solid</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </DemoSection>

      <DemoSection title="Sizes">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </DemoSection>

      <DemoSection title="Color schemes">
        <Button colorScheme="primary">Primary</Button>
        <Button colorScheme="danger">Danger</Button>
        <Button variant="outline" colorScheme="danger">Danger outline</Button>
      </DemoSection>

      <DemoSection title="With icons">
        <Button leftIcon={<Search size={14} />}>Search</Button>
        <Button variant="outline" rightIcon={<Trash size={14} />} colorScheme="danger">Delete</Button>
      </DemoSection>

      <DemoSection title="States">
        <Button loading>Saving…</Button>
        <Button disabled>Disabled</Button>
        <Button variant="outline" disabled>Disabled outline</Button>
      </DemoSection>

      <DemoSection title="Full width" col>
        <Button fullWidth>Full width button</Button>
      </DemoSection>
    </>
  );
}

// ── Input ─────────────────────────────────────────────────────────────────────

function InputDemo() {
  return (
    <>
      <DemoSection title="Default" col>
        <Input label="Email address" placeholder="you@example.com" />
      </DemoSection>

      <DemoSection title="With hint" col>
        <Input label="Username" hint="Letters, numbers, and underscores only." placeholder="john_doe" />
      </DemoSection>

      <DemoSection title="Invalid state" col>
        <Input label="Password" invalid error="Must be at least 8 characters." type="password" defaultValue="abc" />
      </DemoSection>

      <DemoSection title="Sizes" col>
        <Input size="sm" placeholder="Small" />
        <Input size="md" placeholder="Medium" />
        <Input size="lg" placeholder="Large" />
      </DemoSection>

      <DemoSection title="Disabled / read-only" col>
        <Input disabled placeholder="Disabled input" />
        <Input readOnly defaultValue="Read-only value" />
      </DemoSection>
    </>
  );
}

// ── Textarea ──────────────────────────────────────────────────────────────────

function TextareaDemo() {
  return (
    <>
      <DemoSection title="Default" col>
        <Textarea label="Message" placeholder="Write something…" />
      </DemoSection>

      <DemoSection title="Auto-resize" col>
        <Textarea label="Notes" autoResize placeholder="Grows as you type…" />
      </DemoSection>

      <DemoSection title="Invalid state" col>
        <Textarea label="Bio" invalid error="Bio cannot exceed 200 characters." />
      </DemoSection>

      <DemoSection title="Disabled" col>
        <Textarea label="Notes" disabled defaultValue="Cannot edit this." />
      </DemoSection>
    </>
  );
}

// ── Checkbox ──────────────────────────────────────────────────────────────────

function CheckboxDemo() {
  return (
    <>
      <DemoSection title="States" col>
        <Checkbox label="Unchecked" />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Indeterminate" indeterminate />
      </DemoSection>

      <DemoSection title="Disabled" col>
        <Checkbox label="Disabled unchecked" disabled />
        <Checkbox label="Disabled checked" disabled defaultChecked />
      </DemoSection>

      <DemoSection title="In a group" col>
        <Checkbox label="Email notifications" defaultChecked />
        <Checkbox label="Push notifications" />
        <Checkbox label="SMS notifications" />
      </DemoSection>
    </>
  );
}

// ── Switch ────────────────────────────────────────────────────────────────────

function SwitchDemo() {
  return (
    <>
      <DemoSection title="States" col>
        <Switch label="Off" />
        <Switch label="On" defaultChecked />
      </DemoSection>

      <DemoSection title="Sizes" col>
        <Switch size="sm" label="Small" defaultChecked />
        <Switch size="md" label="Medium" defaultChecked />
        <Switch size="lg" label="Large" defaultChecked />
      </DemoSection>

      <DemoSection title="Disabled" col>
        <Switch label="Disabled off" disabled />
        <Switch label="Disabled on" disabled defaultChecked />
      </DemoSection>
    </>
  );
}

// ── Radio ─────────────────────────────────────────────────────────────────────

function RadioDemo() {
  const [selected, setSelected] = useState("react");

  return (
    <>
      <DemoSection title="Basic group" col>
        <RadioGroup defaultValue="react" orientation="vertical">
          <Radio value="react" label="React" />
          <Radio value="vue" label="Vue" />
          <Radio value="svelte" label="Svelte" />
        </RadioGroup>
      </DemoSection>

      <DemoSection title="Controlled" col>
        <RadioGroup value={selected} onChange={setSelected} orientation="vertical">
          <Radio value="react" label="React" />
          <Radio value="vue" label="Vue" />
          <Radio value="svelte" label="Svelte" />
        </RadioGroup>
        <p style={{ marginTop: 8, fontSize: 14, color: "var(--syn-text-muted)" }}>
          Selected: <strong>{selected}</strong>
        </p>
      </DemoSection>

      <DemoSection title="Disabled option" col>
        <RadioGroup defaultValue="react" orientation="vertical">
          <Radio value="react" label="React" />
          <Radio value="vue" label="Vue" disabled />
          <Radio value="svelte" label="Svelte" />
        </RadioGroup>
      </DemoSection>
    </>
  );
}

// ── Select ────────────────────────────────────────────────────────────────────

const SELECT_OPTIONS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];

function SelectDemo() {
  const [value, setValue] = useState("");

  return (
    <>
      <DemoSection title="Basic" col>
        <Select placeholder="Choose a framework" options={SELECT_OPTIONS} />
      </DemoSection>

      <DemoSection title="Sizes" col>
        <Select size="sm" placeholder="Small" options={SELECT_OPTIONS} />
        <Select size="md" placeholder="Medium" options={SELECT_OPTIONS} />
        <Select size="lg" placeholder="Large" options={SELECT_OPTIONS} />
      </DemoSection>

      <DemoSection title="With label & error" col>
        <Select
          label="Framework"
          {...(!value ? { error: "Please select a framework" } : {})}
          value={value}
          onChange={setValue}
          options={SELECT_OPTIONS}
        />
      </DemoSection>
    </>
  );
}

// ── Combobox ──────────────────────────────────────────────────────────────────

const COMBOBOX_OPTIONS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
  { value: "solid", label: "Solid" },
];

function ComboboxDemo() {
  return (
    <>
      <DemoSection title="Basic filter" col>
        <Combobox placeholder="Search frameworks…" options={COMBOBOX_OPTIONS} />
      </DemoSection>

      <DemoSection title="With label & error" col>
        <Combobox label="Framework" hint="Start typing to filter options" options={COMBOBOX_OPTIONS} />
        <Combobox label="Framework" error="Please select a valid framework" options={COMBOBOX_OPTIONS} />
      </DemoSection>
    </>
  );
}

// ── NumberInput ───────────────────────────────────────────────────────────────

function NumberInputDemo() {
  return (
    <>
      <DemoSection title="Basic" col>
        <NumberInput defaultValue={1} min={1} max={99} label="Quantity" />
      </DemoSection>

      <DemoSection title="With step & precision" col>
        <NumberInput defaultValue={9.99} min={0} step={0.01} precision={2} label="Price (USD)" hint="Enter a price in dollars" />
      </DemoSection>

      <DemoSection title="Sizes" col>
        <NumberInput size="sm" defaultValue={1} label="Small" />
        <NumberInput size="md" defaultValue={1} label="Medium" />
        <NumberInput size="lg" defaultValue={1} label="Large" />
      </DemoSection>
    </>
  );
}

// ── Slider ────────────────────────────────────────────────────────────────────

function SliderDemo() {
  const [volume, setVolume] = useState(50);
  const [stars, setStars] = useState(3);

  return (
    <>
      <DemoSection title="Basic" col>
        <Slider label="Volume" showValue value={volume} onChange={setVolume} min={0} max={100} />
      </DemoSection>

      <DemoSection title="Step — star rating" col>
        <Slider label="Rating" showValue value={stars} onChange={setStars} min={1} max={5} step={1} />
      </DemoSection>

      <DemoSection title="Sizes" col>
        <Slider size="sm" label="Small" defaultValue={40} />
        <Slider size="md" label="Medium" defaultValue={60} />
        <Slider size="lg" label="Large" defaultValue={80} />
      </DemoSection>
    </>
  );
}

// ── PinInput ──────────────────────────────────────────────────────────────────

function PinInputDemo() {
  return (
    <>
      <DemoSection title="OTP" col>
        <PinInput length={6} />
      </DemoSection>

      <DemoSection title="Masked PIN" col>
        <PinInput length={4} masked />
      </DemoSection>

      <DemoSection title="Sizes" col>
        <PinInput size="sm" length={4} />
        <PinInput size="md" length={4} />
        <PinInput size="lg" length={4} />
      </DemoSection>
    </>
  );
}

// ── Alert ─────────────────────────────────────────────────────────────────────

function AlertDemo() {
  return (
    <>
      <DemoSection title="Variants" col>
        <Alert variant="info" title="Info">Your account has been updated.</Alert>
        <Alert variant="success" title="Success">Changes saved successfully.</Alert>
        <Alert variant="warning" title="Warning">Your plan expires in 3 days.</Alert>
        <Alert variant="danger" title="Error">Failed to save. Please try again.</Alert>
      </DemoSection>

      <DemoSection title="Without title" col>
        <Alert variant="info">A new version is available. Refresh to update.</Alert>
      </DemoSection>
    </>
  );
}

// ── Badge ─────────────────────────────────────────────────────────────────────

function BadgeDemo() {
  return (
    <>
      <DemoSection title="Variants">
        <Badge>Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="info">Info</Badge>
      </DemoSection>

      <DemoSection title="Sizes">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </DemoSection>
    </>
  );
}

// ── Spinner ───────────────────────────────────────────────────────────────────

function SpinnerDemo() {
  return (
    <>
      <DemoSection title="Sizes">
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
        <Spinner size="xl" />
      </DemoSection>

      <DemoSection title="With label" col>
        <Spinner label="Loading your data…" />
      </DemoSection>
    </>
  );
}

// ── Avatar ────────────────────────────────────────────────────────────────────

function AvatarDemo() {
  return (
    <>
      <DemoSection title="With initials">
        <Avatar name="Alice Chen" size="xs" />
        <Avatar name="Bob Smith" size="sm" />
        <Avatar name="Carol White" size="md" />
        <Avatar name="David Lee" size="lg" />
        <Avatar name="Eva Green" size="xl" />
      </DemoSection>

      <DemoSection title="With image">
        <Avatar src="https://i.pravatar.cc/150?img=1" name="Alice Chen" size="sm" />
        <Avatar src="https://i.pravatar.cc/150?img=5" name="Bob Smith" size="md" />
        <Avatar src="https://i.pravatar.cc/150?img=9" name="Carol White" size="lg" />
      </DemoSection>

      <DemoSection title="Avatar group">
        <AvatarGroup>
          <Avatar name="Alice Chen" />
          <Avatar name="Bob Smith" />
          <Avatar name="Carol White" />
          <Avatar name="David Lee" />
          <Avatar name="Eva Green" />
        </AvatarGroup>
      </DemoSection>
    </>
  );
}

// ── Progress ──────────────────────────────────────────────────────────────────

function ProgressDemo() {
  return (
    <>
      <DemoSection title="Values" col>
        <Progress value={0} label="0%" showValue />
        <Progress value={25} label="25%" showValue />
        <Progress value={50} label="50%" showValue />
        <Progress value={75} label="75%" showValue />
        <Progress value={100} label="100%" showValue />
      </DemoSection>

      <DemoSection title="Sizes" col>
        <Progress size="xs" value={60} label="Extra small" />
        <Progress size="sm" value={60} label="Small" />
        <Progress size="md" value={60} label="Medium" />
        <Progress size="lg" value={60} label="Large" />
      </DemoSection>
    </>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function SkeletonDemo() {
  return (
    <>
      <DemoSection title="Text lines" col>
        <Skeleton height="1rem" />
        <Skeleton height="1rem" width="80%" />
        <Skeleton height="1rem" width="60%" />
      </DemoSection>

      <DemoSection title="Card skeleton" col>
        <div style={{
          padding: 16, border: "1px solid var(--syn-border)",
          borderRadius: "var(--syn-radius-md)", width: "100%",
          display: "flex", flexDirection: "column", gap: 8,
        }}>
          <Skeleton circle width={40} height={40} />
          <Skeleton height="1rem" />
          <Skeleton height="1rem" width="70%" />
          <Skeleton height="60px" />
        </div>
      </DemoSection>
    </>
  );
}

// ── Chip ──────────────────────────────────────────────────────────────────────

function ChipDemo() {
  const [tags, setTags] = useState(["React", "TypeScript", "Design System"]);

  return (
    <>
      <DemoSection title="Variants">
        <Chip label="Default" variant="default" />
        <Chip label="Primary" variant="primary" />
        <Chip label="Success" variant="success" />
        <Chip label="Warning" variant="warning" />
        <Chip label="Danger" variant="danger" />
      </DemoSection>

      <DemoSection title="Removable tags">
        {tags.map((tag) => (
          <Chip key={tag} label={tag} onRemove={() => setTags((p) => p.filter((t) => t !== tag))} />
        ))}
        {tags.length === 0 && (
          <span style={{ fontSize: 13, color: "var(--syn-text-muted)" }}>All tags removed</span>
        )}
      </DemoSection>

      <DemoSection title="Sizes">
        <Chip label="Small" size="sm" />
        <Chip label="Medium" size="md" />
      </DemoSection>
    </>
  );
}

// ── Callout ───────────────────────────────────────────────────────────────────

function CalloutDemo() {
  return (
    <>
      <DemoSection title="Variants" col>
        <Callout variant="info">Your session will expire in 10 minutes.</Callout>
        <Callout variant="success">Your changes have been saved successfully.</Callout>
        <Callout variant="warning">This action may affect other users in your organisation.</Callout>
        <Callout variant="danger">This operation is irreversible. Proceed with caution.</Callout>
        <Callout variant="neutral">Some features are unavailable in the free plan.</Callout>
      </DemoSection>

      <DemoSection title="With title" col>
        <Callout variant="info" title="New version available">
          Upgrade to v2.0 to access the latest features and security patches.
        </Callout>
        <Callout variant="warning" title="Storage limit reached">
          You have used 95% of your storage quota. Consider upgrading your plan.
        </Callout>
      </DemoSection>
    </>
  );
}

// ── Stat ──────────────────────────────────────────────────────────────────────

function StatDemo() {
  return (
    <>
      <DemoSection title="Single stat" col>
        <Stat
          label="Monthly Revenue"
          value="$48,295"
          trend="up"
          trendValue="+12.5% vs last month"
          helpText="Based on confirmed transactions"
        />
      </DemoSection>

      <DemoSection title="Dashboard grid" col>
        <Grid cols={3} gap={4}>
          <Stat label="Users" value="12,840" trend="up" trendValue="+5.2%" />
          <Stat label="Churn Rate" value="2.4%" trend="down" trendValue="-0.8%" />
          <Stat label="Uptime" value="99.98%" trend="neutral" trendValue="SLA met" />
        </Grid>
      </DemoSection>
    </>
  );
}

// ── Popover ───────────────────────────────────────────────────────────────────

function PopoverDemo() {
  return (
    <>
      <DemoSection title="Basic">
        <Popover trigger={<Button variant="outline">Open popover</Button>} placement="bottom">
          <div style={{ padding: "12px 16px" }}>
            <strong>Popover content</strong>
            <p style={{ marginTop: 4, fontSize: 14, color: "var(--syn-text-muted)" }}>
              Click outside or press Escape to close.
            </p>
          </div>
        </Popover>
      </DemoSection>

      <DemoSection title="Placements">
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

// ── Table ─────────────────────────────────────────────────────────────────────

const TABLE_USERS = [
  { name: "Alice Nguyen", role: "Admin", status: "active" as const },
  { name: "Bob Smith", role: "Editor", status: "inactive" as const },
  { name: "Carol Jones", role: "Viewer", status: "active" as const },
];

function TableDemo() {
  return (
    <>
      <DemoSection title="Basic" col>
        <TableContainer>
          <Table>
            <Thead>
              <Tr><Th>Name</Th><Th>Role</Th><Th>Status</Th></Tr>
            </Thead>
            <Tbody>
              {TABLE_USERS.map((u) => (
                <Tr key={u.name}>
                  <Td>{u.name}</Td>
                  <Td>{u.role}</Td>
                  <Td>
                    <Badge variant={u.status === "active" ? "success" : "danger"}>{u.status}</Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </DemoSection>

      <DemoSection title="Striped & hoverable" col>
        <TableContainer>
          <Table striped hoverable>
            <Thead><Tr><Th>Name</Th><Th>Role</Th><Th>Status</Th></Tr></Thead>
            <Tbody>
              {TABLE_USERS.map((u) => (
                <Tr key={u.name}>
                  <Td>{u.name}</Td>
                  <Td>{u.role}</Td>
                  <Td>{u.status}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </DemoSection>
    </>
  );
}

// ── Timeline ──────────────────────────────────────────────────────────────────

const TIMELINE_ITEMS: TimelineItem[] = [
  { id: "1", title: "Pull request merged", variant: "success", time: "2 min ago" },
  { id: "2", title: "CI pipeline failed", variant: "danger", time: "15 min ago" },
  { id: "3", title: "Deployment started", variant: "info", time: "1 hr ago" },
  { id: "4", title: "Review requested", variant: "warning", time: "3 hr ago" },
  { id: "5", title: "Branch created", variant: "default", time: "Yesterday" },
];

const TIMELINE_DESC: TimelineItem[] = [
  { id: "1", title: "Account created", description: "Signed up using GitHub OAuth.", variant: "success", time: "Jan 5, 2026" },
  { id: "2", title: "First project added", description: "Created the Synerity design system monorepo.", variant: "info", time: "Jan 6, 2026" },
  { id: "3", title: "v0.1.0 released", description: "Published the first stable version of @synerity/ui.", variant: "success", time: "Jan 10, 2026" },
];

function TimelineDemo() {
  return (
    <>
      <DemoSection title="Activity feed" col>
        <Timeline items={TIMELINE_ITEMS} />
      </DemoSection>

      <DemoSection title="With descriptions" col>
        <Timeline items={TIMELINE_DESC} />
      </DemoSection>
    </>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────

function CardDemo() {
  return (
    <>
      <DemoSection title="Basic card" col>
        <Card style={{ width: "100%", maxWidth: 360 }}>
          <CardHeader>Card title</CardHeader>
          <CardBody>
            <Text>Card content goes here. You can put any content inside.</Text>
          </CardBody>
          <CardFooter>
            <Button size="sm">Action</Button>
            <Button size="sm" variant="ghost">Cancel</Button>
          </CardFooter>
        </Card>
      </DemoSection>

      <DemoSection title="Shadow variants">
        {(["none", "sm", "md", "lg"] as const).map((s) => (
          <Card key={s} shadow={s} style={{ padding: "20px 24px", minWidth: 120 }}>
            <Text size="sm" weight="medium">{s === "none" ? "No shadow" : `Shadow ${s}`}</Text>
          </Card>
        ))}
      </DemoSection>

      <DemoSection title="With badge in header" col>
        <Card style={{ width: "100%", maxWidth: 360 }}>
          <CardHeader>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Active plan</span>
              <Badge variant="success">Pro</Badge>
            </div>
          </CardHeader>
          <CardBody>
            <Text color="secondary">Your Pro plan renews on June 1, 2026.</Text>
          </CardBody>
        </Card>
      </DemoSection>
    </>
  );
}

// ── Stack ─────────────────────────────────────────────────────────────────────

function StackBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      padding: "8px 14px",
      background: "var(--synerity-color-primary-subtle)",
      border: "1px solid var(--synerity-color-primary)",
      borderRadius: "var(--synerity-radius-md)",
      fontSize: 13, color: "var(--synerity-color-primary)", fontWeight: 500,
    }}>
      {children}
    </div>
  );
}

function StackDemo() {
  return (
    <>
      <DemoSection title="Default (16px gap)" col>
        <Stack gap="16px" style={{ width: "100%", maxWidth: 300 }}>
          <StackBox>Item 1</StackBox>
          <StackBox>Item 2</StackBox>
          <StackBox>Item 3</StackBox>
        </Stack>
      </DemoSection>

      <DemoSection title="Practical example" col>
        <Stack gap="12px" style={{ width: "100%", maxWidth: 280 }}>
          <Button fullWidth>Continue</Button>
          <Button fullWidth variant="outline">Save draft</Button>
          <Button fullWidth variant="ghost">Cancel</Button>
        </Stack>
      </DemoSection>
    </>
  );
}

// ── Group ─────────────────────────────────────────────────────────────────────

function GroupDemo() {
  return (
    <>
      <DemoSection title="Default" col>
        <Group>
          <Button variant="outline" size="sm">Bold</Button>
          <Button variant="outline" size="sm">Italic</Button>
          <Button variant="outline" size="sm">Underline</Button>
        </Group>
      </DemoSection>

      <DemoSection title="Wrap" col>
        <Group wrap gap="8px" style={{ maxWidth: 340 }}>
          {["React", "TypeScript", "CSS Modules", "Vite", "Turborepo", "Vitest", "pnpm", "Changesets"].map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </Group>
      </DemoSection>
    </>
  );
}

// ── Grid ──────────────────────────────────────────────────────────────────────

function GridDemo() {
  return (
    <>
      <DemoSection title="3 columns" col>
        <Grid cols={3}>
          {["1", "2", "3", "4", "5", "6"].map((n) => (
            <Card key={n}>
              <CardBody>
                <span style={{ fontWeight: 600, fontSize: 18 }}>{n}</span>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </DemoSection>

      <DemoSection title="2 columns with gap" col>
        <Grid cols={2} gap={6}>
          {["1", "2", "3", "4"].map((n) => (
            <Card key={n}>
              <CardBody>Item {n}</CardBody>
            </Card>
          ))}
        </Grid>
      </DemoSection>
    </>
  );
}

// ── Divider ───────────────────────────────────────────────────────────────────

function DividerDemo() {
  return (
    <>
      <DemoSection title="Horizontal" col>
        <Stack gap={4}>
          <p style={{ margin: 0 }}>Section above</p>
          <Divider />
          <p style={{ margin: 0 }}>Section below</p>
        </Stack>
      </DemoSection>

      <DemoSection title="With label" col>
        <Divider label="or" />
      </DemoSection>

      <DemoSection title="Vertical in group">
        <Group>
          <Button variant="ghost">Cut</Button>
          <Divider orientation="vertical" />
          <Button variant="ghost">Copy</Button>
          <Divider orientation="vertical" />
          <Button variant="ghost">Paste</Button>
        </Group>
      </DemoSection>
    </>
  );
}

// ── Container ─────────────────────────────────────────────────────────────────

function ContainerDemo() {
  return (
    <>
      <DemoSection title="Sizes" col>
        {(["sm", "md", "lg", "xl"] as const).map((size) => (
          <Container key={size} size={size}>
            <div style={{
              padding: "8px 12px",
              border: "1px dashed var(--syn-border)",
              borderRadius: "var(--syn-radius-sm)",
              fontSize: 13, color: "var(--syn-text-muted)", textAlign: "center",
            }}>
              {size} container
            </div>
          </Container>
        ))}
        <Text size="xs" color="secondary">
          Containers are centred with horizontal padding. Resize the window to see them respond.
        </Text>
      </DemoSection>
    </>
  );
}

// ── AspectRatio ───────────────────────────────────────────────────────────────

function RatioPlaceholder({ label }: { label: string }) {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "var(--synerity-color-primary-subtle)",
      display: "flex", alignItems: "center", justifyContent: "center",
      borderRadius: "var(--synerity-radius-md)",
      color: "var(--synerity-color-primary)", fontWeight: 600,
    }}>
      {label}
    </div>
  );
}

function AspectRatioDemo() {
  return (
    <>
      <DemoSection title="16:9 video placeholder" col>
        <div style={{ width: "100%", maxWidth: 480 }}>
          <AspectRatio ratio={16 / 9}><RatioPlaceholder label="16:9" /></AspectRatio>
        </div>
      </DemoSection>

      <DemoSection title="Square" col>
        <div style={{ width: 200 }}>
          <AspectRatio ratio={1}><RatioPlaceholder label="1:1" /></AspectRatio>
        </div>
      </DemoSection>

      <DemoSection title="4:3" col>
        <div style={{ width: "100%", maxWidth: 400 }}>
          <AspectRatio ratio={4 / 3}><RatioPlaceholder label="4:3" /></AspectRatio>
        </div>
      </DemoSection>
    </>
  );
}

// ── ScrollArea ────────────────────────────────────────────────────────────────

function ScrollAreaDemo() {
  return (
    <>
      <DemoSection title="Vertical scroll" col>
        <ScrollArea maxHeight="200px" style={{ border: "1px solid var(--syn-border)", borderRadius: "var(--syn-radius-md)", width: "100%" }}>
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} style={{ padding: "8px 12px", borderBottom: i < 19 ? "1px solid var(--syn-border)" : undefined, fontSize: 14 }}>
              Item {i + 1}
            </div>
          ))}
        </ScrollArea>
      </DemoSection>

      <DemoSection title="Horizontal scroll" col>
        <ScrollArea maxWidth="300px" style={{ border: "1px solid var(--syn-border)", borderRadius: "var(--syn-radius-md)" }}>
          <div style={{ whiteSpace: "nowrap", padding: 12, fontSize: 14 }}>
            A very long line of content that overflows horizontally and requires scrolling to read in full.
          </div>
        </ScrollArea>
      </DemoSection>
    </>
  );
}

// ── Text ──────────────────────────────────────────────────────────────────────

function TextDemo() {
  return (
    <>
      <DemoSection title="Sizes" col>
        <Col>
          <Text size="xs">Extra small — 12px</Text>
          <Text size="sm">Small — 14px</Text>
          <Text size="md">Medium — 16px (default)</Text>
          <Text size="lg">Large — 18px</Text>
          <Text size="xl">Extra large — 20px</Text>
          <Text size="2xl">2XL — 24px</Text>
        </Col>
      </DemoSection>

      <DemoSection title="Weights" col>
        <Text weight="normal">Normal 400</Text>
        <Text weight="medium">Medium 500</Text>
        <Text weight="semibold">Semibold 600</Text>
        <Text weight="bold">Bold 700</Text>
      </DemoSection>

      <DemoSection title="Colors" col>
        <Text color="primary">Primary text</Text>
        <Text color="secondary">Secondary text</Text>
        <Text color="disabled">Disabled text</Text>
        <Text color="danger">Danger text</Text>
        <Text color="success">Success text</Text>
      </DemoSection>
    </>
  );
}

// ── Heading ───────────────────────────────────────────────────────────────────

function HeadingDemo() {
  return (
    <>
      <DemoSection title="Levels" col>
        <Col>
          <Heading level={1}>Heading 1 — Display</Heading>
          <Heading level={2}>Heading 2 — Page title</Heading>
          <Heading level={3}>Heading 3 — Section</Heading>
          <Heading level={4}>Heading 4 — Subsection</Heading>
          <Heading level={5}>Heading 5 — Label</Heading>
          <Heading level={6}>Heading 6 — Caption</Heading>
        </Col>
      </DemoSection>
    </>
  );
}

// ── Link ──────────────────────────────────────────────────────────────────────

function LinkDemo() {
  return (
    <>
      <DemoSection title="Inline" col>
        <Text>
          Read the{" "}
          <Link href="#">documentation</Link>
          {" "}to learn more about the design system.
        </Text>
      </DemoSection>

      <DemoSection title="Standalone">
        <Link variant="standalone" href="#">View all components</Link>
        <Link variant="standalone" href="#">Browse the changelog</Link>
      </DemoSection>

      <DemoSection title="External">
        <Link href="https://example.com" external>Open in new tab</Link>
      </DemoSection>
    </>
  );
}

// ── Mark ──────────────────────────────────────────────────────────────────────

function MarkDemo() {
  return (
    <>
      <DemoSection title="Colors">
        <Mark color="yellow">Yellow highlight</Mark>
        <Mark color="green">Green highlight</Mark>
        <Mark color="blue">Blue highlight</Mark>
        <Mark color="pink">Pink highlight</Mark>
      </DemoSection>

      <DemoSection title="In text" col>
        <Text>
          The component library supports{" "}
          <Mark color="yellow">highlighted text</Mark>
          {" "}inline within paragraphs for drawing attention to key terms.
        </Text>
        <Text>
          You can also use{" "}
          <Mark color="blue">blue</Mark>
          {" "}or{" "}
          <Mark color="green">green</Mark>
          {" "}marks to categorise different types of information.
        </Text>
      </DemoSection>
    </>
  );
}

// ── Truncate ──────────────────────────────────────────────────────────────────

const LONG = "This is a very long string of text that will be truncated because the container is too narrow to show it all.";

function TruncateDemo() {
  return (
    <>
      <DemoSection title="Single line" col>
        <div style={{ width: 200 }}><Truncate>{LONG}</Truncate></div>
      </DemoSection>

      <DemoSection title="Two lines" col>
        <div style={{ width: 250 }}><Truncate lines={2}>{LONG}</Truncate></div>
      </DemoSection>
    </>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────

function ModalSizeExample({ size }: { size?: "sm" | "md" | "lg" | "xl" }) {
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
        {...(size ? { size } : {})}
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

function ModalDemo() {
  return (
    <>
      <DemoSection title="Sizes">
        <ModalSizeExample size="sm" />
        <ModalSizeExample size="md" />
        <ModalSizeExample size="lg" />
      </DemoSection>
    </>
  );
}

// ── Tooltip ───────────────────────────────────────────────────────────────────

function TooltipDemo() {
  return (
    <>
      <DemoSection title="Placements">
        <Tooltip content="Tooltip on top" placement="top">
          <Button variant="outline">Top</Button>
        </Tooltip>
        <Tooltip content="Tooltip on right" placement="right">
          <Button variant="outline">Right</Button>
        </Tooltip>
        <Tooltip content="Tooltip on bottom" placement="bottom">
          <Button variant="outline">Bottom</Button>
        </Tooltip>
        <Tooltip content="Tooltip on left" placement="left">
          <Button variant="outline">Left</Button>
        </Tooltip>
      </DemoSection>

      <DemoSection title="With delay">
        <Tooltip content="Appears immediately" delay={0}>
          <Button variant="outline">Instant</Button>
        </Tooltip>
        <Tooltip content="Appears after 500ms" delay={500}>
          <Button variant="outline">Delayed 500ms</Button>
        </Tooltip>
      </DemoSection>

      <DemoSection title="On a button">
        <Tooltip content="Save changes">
          <Button>Save</Button>
        </Tooltip>
        <Tooltip content="This action cannot be undone">
          <Button variant="outline" colorScheme="danger">Delete</Button>
        </Tooltip>
      </DemoSection>
    </>
  );
}

// ── Drawer ────────────────────────────────────────────────────────────────────

function DrawerDemo() {
  const [rightOpen, setRightOpen] = useState(false);
  const [placementOpen, setPlacementOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerPlacement>("right");

  const openWith = (p: DrawerPlacement) => {
    setPlacement(p);
    setPlacementOpen(true);
  };

  return (
    <>
      <DemoSection title="Right drawer">
        <Button onClick={() => setRightOpen(true)}>Open drawer</Button>
        <Drawer
          open={rightOpen}
          onOpenChange={setRightOpen}
          title="Edit profile"
          footer={<Button fullWidth onClick={() => setRightOpen(false)}>Save changes</Button>}
        >
          <Stack gap={4}>
            <Input label="Display name" defaultValue="Bhushan" />
            <Switch label="Email notifications" />
          </Stack>
        </Drawer>
      </DemoSection>

      <DemoSection title="Placements">
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

// ── Menu ──────────────────────────────────────────────────────────────────────

function MenuDemo() {
  return (
    <>
      <DemoSection title="Basic">
        <Menu trigger={<Button variant="outline">Actions</Button>}>
          <MenuItem value="edit">Edit</MenuItem>
          <MenuItem value="duplicate">Duplicate</MenuItem>
          <MenuItem value="delete">Delete</MenuItem>
        </Menu>
      </DemoSection>

      <DemoSection title="With divider & group">
        <Menu trigger={<Button variant="outline">Options</Button>}>
          <MenuGroup label="Account">
            <MenuItem value="profile">Profile</MenuItem>
            <MenuItem value="settings">Settings</MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuItem value="logout">Log out</MenuItem>
        </Menu>
      </DemoSection>

      <DemoSection title="Placements">
        <Menu trigger={<Button size="sm" variant="outline">Bottom start</Button>} placement="bottom-start">
          <MenuItem value="a">Item A</MenuItem>
          <MenuItem value="b">Item B</MenuItem>
        </Menu>
        <Menu trigger={<Button size="sm" variant="outline">Bottom end</Button>} placement="bottom-end">
          <MenuItem value="a">Item A</MenuItem>
          <MenuItem value="b">Item B</MenuItem>
        </Menu>
      </DemoSection>
    </>
  );
}

// ── Tabs ──────────────────────────────────────────────────────────────────────

function TabsDemo() {
  return (
    <>
      <DemoSection title="Line variant" col>
        <Tabs defaultValue="overview" variant="line">
          <TabList>
            <Tab value="overview">Overview</Tab>
            <Tab value="analytics">Analytics</Tab>
            <Tab value="settings">Settings</Tab>
          </TabList>
          <TabPanel value="overview">
            <p style={{ padding: "16px 0", color: "var(--synerity-color-text-secondary)", fontSize: 13 }}>Overview tab content.</p>
          </TabPanel>
          <TabPanel value="analytics">
            <p style={{ padding: "16px 0", color: "var(--synerity-color-text-secondary)", fontSize: 13 }}>Analytics tab content.</p>
          </TabPanel>
          <TabPanel value="settings">
            <p style={{ padding: "16px 0", color: "var(--synerity-color-text-secondary)", fontSize: 13 }}>Settings tab content.</p>
          </TabPanel>
        </Tabs>
      </DemoSection>

      <DemoSection title="Pills variant" col>
        <Tabs defaultValue="overview" variant="pills">
          <TabList>
            <Tab value="overview">Overview</Tab>
            <Tab value="analytics">Analytics</Tab>
            <Tab value="settings">Settings</Tab>
          </TabList>
          <TabPanel value="overview">
            <p style={{ padding: "16px 0", color: "var(--synerity-color-text-secondary)", fontSize: 13 }}>Overview tab content.</p>
          </TabPanel>
          <TabPanel value="analytics">
            <p style={{ padding: "16px 0", color: "var(--synerity-color-text-secondary)", fontSize: 13 }}>Analytics tab content.</p>
          </TabPanel>
          <TabPanel value="settings">
            <p style={{ padding: "16px 0", color: "var(--synerity-color-text-secondary)", fontSize: 13 }}>Settings tab content.</p>
          </TabPanel>
        </Tabs>
      </DemoSection>
    </>
  );
}

// ── Accordion ─────────────────────────────────────────────────────────────────

const ACCORDION_ITEMS = [
  {
    value: "a11y",
    title: "How does Synerity handle accessibility?",
    content: "Every component ships with full ARIA wiring, keyboard navigation per the W3C APG, and focus management. WCAG 2.1 AA compliance is a hard requirement, not an afterthought.",
  },
  {
    value: "rsc",
    title: "Are components compatible with React Server Components?",
    content: "Yes. CSS Modules are zero-runtime and RSC-safe. Interactive components use the 'use client' directive only where necessary.",
  },
  {
    value: "tokens",
    title: "How do I customise the design tokens?",
    content: "Override any CSS custom property on :root or a scoped selector. Token names follow --synerity-* and are documented in the tokens package.",
  },
];

function AccordionDemo() {
  return (
    <>
      <DemoSection title="Single (one open at a time)" col>
        <Accordion type="single" defaultValue="a11y" items={ACCORDION_ITEMS} />
      </DemoSection>

      <DemoSection title="Multiple (many open at once)" col>
        <Accordion type="multiple" defaultValue={["a11y", "rsc"]} items={ACCORDION_ITEMS} />
      </DemoSection>
    </>
  );
}

// ── Breadcrumb ────────────────────────────────────────────────────────────────

function BreadcrumbDemo() {
  return (
    <>
      <DemoSection title="Basic 3-level" col>
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Components", href: "/components" },
          { label: "Breadcrumb" },
        ]} />
      </DemoSection>

      <DemoSection title="Custom separator" col>
        <Breadcrumb separator="›" items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings" },
          { label: "Profile" },
        ]} />
      </DemoSection>
    </>
  );
}

// ── Stepper ───────────────────────────────────────────────────────────────────

const STEPPER_STEPS = [
  { label: "Account details" },
  { label: "Verify email" },
  { label: "Set up workspace" },
];

function StepperDemo() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <>
      <DemoSection title="Horizontal (interactive)" col>
        <Stepper steps={STEPPER_STEPS} currentStep={currentStep} orientation="horizontal" />
        <Group style={{ marginTop: 16 }}>
          <Button size="sm" variant="outline" onClick={() => setCurrentStep((s) => Math.max(0, s - 1))} disabled={currentStep === 0}>
            Previous
          </Button>
          <Button size="sm" onClick={() => setCurrentStep((s) => Math.min(STEPPER_STEPS.length - 1, s + 1))} disabled={currentStep === STEPPER_STEPS.length - 1}>
            Next
          </Button>
        </Group>
      </DemoSection>

      <DemoSection title="Vertical" col>
        <Stepper
          orientation="vertical"
          currentStep={1}
          steps={[
            { label: "Account details", description: "Name and email" },
            { label: "Verify email", description: "Check your inbox" },
            { label: "Set up workspace", description: "Configure your team" },
          ]}
        />
      </DemoSection>
    </>
  );
}

// ── Pagination ────────────────────────────────────────────────────────────────

function PaginationDemo() {
  const [page, setPage] = useState(1);

  return (
    <>
      <DemoSection title="Basic" col>
        <Pagination total={100} page={page} onChange={setPage} />
        <p style={{ marginTop: 8, fontSize: 14, color: "var(--syn-text-muted)" }}>
          Current page: <strong>{page}</strong>
        </p>
      </DemoSection>

      <DemoSection title="Sizes" col>
        <Pagination size="sm" total={100} page={1} onChange={() => {}} />
        <Pagination size="md" total={100} page={1} onChange={() => {}} />
        <Pagination size="lg" total={100} page={1} onChange={() => {}} />
      </DemoSection>
    </>
  );
}

// ── Registry ──────────────────────────────────────────────────────────────────

export const demoRegistry: Record<string, ComponentType> = {
  "button": ButtonDemo,
  "input": InputDemo,
  "textarea": TextareaDemo,
  "checkbox": CheckboxDemo,
  "switch": SwitchDemo,
  "radio": RadioDemo,
  "select": SelectDemo,
  "combobox": ComboboxDemo,
  "number-input": NumberInputDemo,
  "slider": SliderDemo,
  "pin-input": PinInputDemo,
  "alert": AlertDemo,
  "badge": BadgeDemo,
  "spinner": SpinnerDemo,
  "avatar": AvatarDemo,
  "progress": ProgressDemo,
  "skeleton": SkeletonDemo,
  "chip": ChipDemo,
  "callout": CalloutDemo,
  "stat": StatDemo,
  "popover": PopoverDemo,
  "table": TableDemo,
  "timeline": TimelineDemo,
  "card": CardDemo,
  "stack": StackDemo,
  "group": GroupDemo,
  "grid": GridDemo,
  "divider": DividerDemo,
  "container": ContainerDemo,
  "aspect-ratio": AspectRatioDemo,
  "scroll-area": ScrollAreaDemo,
  "text": TextDemo,
  "heading": HeadingDemo,
  "link": LinkDemo,
  "mark": MarkDemo,
  "truncate": TruncateDemo,
  "modal": ModalDemo,
  "tooltip": TooltipDemo,
  "drawer": DrawerDemo,
  "menu": MenuDemo,
  "tabs": TabsDemo,
  "accordion": AccordionDemo,
  "breadcrumb": BreadcrumbDemo,
  "stepper": StepperDemo,
  "pagination": PaginationDemo,
};
