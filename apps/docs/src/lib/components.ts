export type PropDef = {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
};

export type ComponentDoc = {
  slug: string;
  name: string;
  description: string;
  category: string;
  props: PropDef[];
  examples: { title: string; code: string }[];
  aria?: string[];
  keyboard?: { key: string; action: string }[];
};

export const components: ComponentDoc[] = [
  {
    slug: "button",
    name: "Button",
    category: "Inputs & Controls",
    description: "Triggers an action or event. Supports solid, outline, ghost, and link variants in three sizes. Renders as an anchor when an href is provided.",
    props: [
      { name: "variant", type: '"solid" | "outline" | "ghost" | "link"', default: '"solid"', description: "Visual style of the button." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Controls padding and font size." },
      { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction and applies disabled styling." },
      { name: "loading", type: "boolean", default: "false", description: "Shows a spinner and blocks interaction." },
      { name: "leftIcon", type: "ReactNode", description: "Icon rendered before the label." },
      { name: "rightIcon", type: "ReactNode", description: "Icon rendered after the label." },
      { name: "href", type: "string", description: "Renders as an <a> tag when provided." },
      { name: "onClick", type: "(e: MouseEvent) => void", description: "Click handler." },
      { name: "className", type: "string", description: "Additional CSS class for the root element." },
    ],
    examples: [
      { title: "Variants", code: `<Button variant="solid">Solid</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="link">Link</Button>` },
      { title: "Sizes", code: `<Button size="sm">Small</Button>\n<Button size="md">Medium</Button>\n<Button size="lg">Large</Button>` },
      { title: "Loading", code: `<Button loading>Saving…</Button>` },
      { title: "With icon", code: `import { Download } from "@synerity/icons"\n\n<Button leftIcon={<Download size={16} />}>Download</Button>` },
    ],
    aria: ["role=\"button\"", "aria-disabled when disabled", "aria-busy when loading"],
    keyboard: [{ key: "Enter / Space", action: "Activate the button" }, { key: "Tab", action: "Move focus to/from the button" }],
  },
  {
    slug: "input",
    name: "Input",
    category: "Inputs & Controls",
    description: "A single-line text field with support for sizes, validation states, and left/right adornment slots.",
    props: [
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Controls height and font size." },
      { name: "invalid", type: "boolean", default: "false", description: "Applies error border and sets aria-invalid." },
      { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction." },
      { name: "readOnly", type: "boolean", default: "false", description: "Allows focus but not editing." },
      { name: "placeholder", type: "string", description: "Placeholder text." },
      { name: "value", type: "string", description: "Controlled value." },
      { name: "defaultValue", type: "string", description: "Uncontrolled initial value." },
      { name: "onChange", type: "(e: ChangeEvent<HTMLInputElement>) => void", description: "Change handler." },
    ],
    examples: [
      { title: "Basic", code: `<Input placeholder="Enter your email" />` },
      { title: "Invalid", code: `<Input invalid placeholder="invalid@example" />` },
      { title: "Sizes", code: `<Input size="sm" placeholder="Small" />\n<Input size="md" placeholder="Medium" />\n<Input size="lg" placeholder="Large" />` },
    ],
    aria: ["aria-invalid when invalid", "aria-required when required", "aria-describedby links to error/hint"],
  },
  {
    slug: "textarea",
    name: "Textarea",
    category: "Inputs & Controls",
    description: "A multi-line text input. Supports the same validation states as Input plus an autoResize option that grows the field to fit its content.",
    props: [
      { name: "invalid", type: "boolean", default: "false", description: "Applies error border." },
      { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction." },
      { name: "rows", type: "number", default: "3", description: "Initial number of visible rows." },
      { name: "placeholder", type: "string", description: "Placeholder text." },
      { name: "value", type: "string", description: "Controlled value." },
      { name: "onChange", type: "(e: ChangeEvent<HTMLTextAreaElement>) => void", description: "Change handler." },
    ],
    examples: [
      { title: "Basic", code: `<Textarea placeholder="Write a description…" rows={4} />` },
      { title: "Invalid", code: `<Textarea invalid placeholder="Invalid state" />` },
    ],
    aria: ["aria-invalid when invalid"],
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    category: "Inputs & Controls",
    description: "A binary toggle with label support and an indeterminate state for parent checkboxes in tree selections.",
    props: [
      { name: "checked", type: "boolean", description: "Controlled checked state." },
      { name: "defaultChecked", type: "boolean", default: "false", description: "Uncontrolled initial state." },
      { name: "indeterminate", type: "boolean", default: "false", description: "Shows a dash instead of a tick." },
      { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction." },
      { name: "onChange", type: "(e: ChangeEvent<HTMLInputElement>) => void", description: "Change handler." },
      { name: "children", type: "ReactNode", description: "Label content." },
    ],
    examples: [
      { title: "With label", code: `<Checkbox defaultChecked>Accept terms</Checkbox>` },
      { title: "Indeterminate", code: `<Checkbox indeterminate>Select all</Checkbox>` },
      { title: "Disabled", code: `<Checkbox disabled>Disabled</Checkbox>` },
    ],
    aria: ["role=\"checkbox\"", "aria-checked (including \"mixed\" for indeterminate)"],
    keyboard: [{ key: "Space", action: "Toggle checked state" }],
  },
  {
    slug: "switch",
    name: "Switch",
    category: "Inputs & Controls",
    description: "An on/off toggle that immediately applies a setting without requiring a form submit.",
    props: [
      { name: "checked", type: "boolean", description: "Controlled state." },
      { name: "defaultChecked", type: "boolean", default: "false", description: "Uncontrolled initial state." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Track and thumb size." },
      { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction." },
      { name: "onChange", type: "(e: ChangeEvent<HTMLInputElement>) => void", description: "Change handler." },
      { name: "children", type: "ReactNode", description: "Label content." },
    ],
    examples: [
      { title: "With label", code: `<Switch defaultChecked>Dark mode</Switch>` },
      { title: "Sizes", code: `<Switch size="sm">Small</Switch>\n<Switch size="md">Medium</Switch>\n<Switch size="lg">Large</Switch>` },
    ],
    aria: ["role=\"switch\"", "aria-checked"],
    keyboard: [{ key: "Space", action: "Toggle on/off" }],
  },
  {
    slug: "badge",
    name: "Badge",
    category: "Feedback & Display",
    description: "A small status label. Use for counts, tags, and categorical labels. Never use color alone — pair with a meaningful label.",
    props: [
      { name: "variant", type: '"default" | "primary" | "success" | "warning" | "danger" | "info"', default: '"default"', description: "Color scheme." },
      { name: "size", type: '"sm" | "md"', default: '"md"', description: "Badge size." },
      { name: "dot", type: "boolean", default: "false", description: "Shows a colored dot before the label." },
      { name: "children", type: "ReactNode", required: true, description: "Badge label." },
    ],
    examples: [
      { title: "Variants", code: `<Badge variant="primary">Primary</Badge>\n<Badge variant="success">Success</Badge>\n<Badge variant="warning">Warning</Badge>\n<Badge variant="danger">Danger</Badge>\n<Badge variant="info">Info</Badge>` },
      { title: "With dot", code: `<Badge variant="success" dot>Online</Badge>` },
    ],
  },
  {
    slug: "alert",
    name: "Alert",
    category: "Feedback & Display",
    description: "Communicates system-level feedback. Use info for neutral messages, success/warning/danger for outcome states.",
    props: [
      { name: "variant", type: '"info" | "success" | "warning" | "danger"', default: '"info"', description: "Semantic color and icon." },
      { name: "title", type: "string", description: "Bold heading above the body." },
      { name: "children", type: "ReactNode", required: true, description: "Alert body content." },
    ],
    examples: [
      { title: "Variants", code: `<Alert variant="info">Your build is queued.</Alert>\n<Alert variant="success" title="Deployed">Version 1.2.0 is live.</Alert>\n<Alert variant="warning">Token quota at 80%.</Alert>\n<Alert variant="danger" title="Error">Deployment failed.</Alert>` },
    ],
    aria: ["role=\"alert\" for live announcements"],
  },
  {
    slug: "spinner",
    name: "Spinner",
    category: "Feedback & Display",
    description: "An animated loading indicator. Always pair with an aria-label for screen reader users.",
    props: [
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Diameter of the spinner." },
      { name: "color", type: "string", description: "CSS color value. Defaults to current color." },
    ],
    examples: [
      { title: "Sizes", code: `<Spinner size="sm" />\n<Spinner size="md" />\n<Spinner size="lg" />` },
    ],
    aria: ["role=\"status\"", "aria-label=\"Loading\" (add yourself)"],
  },
  {
    slug: "avatar",
    name: "Avatar",
    category: "Feedback & Display",
    description: "Displays a user image with an initials fallback. AvatarGroup stacks multiple avatars with an overflow count.",
    props: [
      { name: "src", type: "string", description: "Image URL. Falls back to initials if omitted or fails to load." },
      { name: "name", type: "string", description: "Used to generate initials and as alt text." },
      { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: "Avatar diameter." },
    ],
    examples: [
      { title: "With image", code: `<Avatar src="/avatar.jpg" name="Bhushan Gadekar" />` },
      { title: "Initials fallback", code: `<Avatar name="Bhushan Gadekar" size="lg" />` },
      { title: "Group", code: `<AvatarGroup>\n  <Avatar name="Alice" />\n  <Avatar name="Bob" />\n  <Avatar name="Charlie" />\n</AvatarGroup>` },
    ],
  },
  {
    slug: "card",
    name: "Card",
    category: "Feedback & Display",
    description: "A surface container for grouping related content. Composed of CardHeader, CardBody, and CardFooter subcomponents.",
    props: [
      { name: "shadow", type: '"none" | "sm" | "md" | "lg"', default: '"sm"', description: "Box shadow elevation." },
      { name: "children", type: "ReactNode", required: true, description: "Card content." },
      { name: "className", type: "string", description: "Additional CSS class." },
    ],
    examples: [
      { title: "Composed", code: `<Card>\n  <CardHeader>\n    <Heading level={3}>Title</Heading>\n  </CardHeader>\n  <CardBody>\n    <Text>Card content goes here.</Text>\n  </CardBody>\n  <CardFooter>\n    <Button size="sm">Action</Button>\n  </CardFooter>\n</Card>` },
    ],
  },
  {
    slug: "modal",
    name: "Modal",
    category: "Overlays",
    description: "A dialog overlay with a focus trap and scroll lock. Closes on Escape or overlay click by default.",
    props: [
      { name: "open", type: "boolean", required: true, description: "Controls visibility." },
      { name: "onOpenChange", type: "(open: boolean) => void", required: true, description: "Called when the modal requests to close." },
      { name: "title", type: "string", description: "Dialog title, rendered as the accessible label." },
      { name: "children", type: "ReactNode", required: true, description: "Modal body content." },
      { name: "footer", type: "ReactNode", description: "Action buttons area." },
      { name: "size", type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: "Max-width of the dialog panel." },
    ],
    examples: [
      { title: "Basic", code: `const [open, setOpen] = useState(false)\n\n<Button onClick={() => setOpen(true)}>Open modal</Button>\n\n<Modal\n  open={open}\n  onOpenChange={setOpen}\n  title="Confirm action"\n  footer={<Button onClick={() => setOpen(false)}>Close</Button>}\n>\n  Are you sure you want to proceed?\n</Modal>` },
    ],
    aria: ["role=\"dialog\"", "aria-modal=\"true\"", "aria-labelledby links to title", "Focus trapped while open"],
    keyboard: [{ key: "Escape", action: "Close the modal" }, { key: "Tab / Shift+Tab", action: "Cycle focus within the dialog" }],
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    category: "Overlays",
    description: "A short label that appears on hover/focus after a delay. Never put essential information only in a tooltip.",
    props: [
      { name: "content", type: "string", required: true, description: "Tooltip text." },
      { name: "placement", type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: "Preferred side to appear on." },
      { name: "delay", type: "number", default: "300", description: "Hover delay in milliseconds." },
      { name: "children", type: "ReactElement", required: true, description: "The trigger element." },
    ],
    examples: [
      { title: "Basic", code: `<Tooltip content="Copy to clipboard">\n  <Button variant="ghost" size="sm">Copy</Button>\n</Tooltip>` },
      { title: "Placement", code: `<Tooltip content="Appears below" placement="bottom">\n  <Button>Hover me</Button>\n</Tooltip>` },
    ],
    aria: ["role=\"tooltip\"", "aria-describedby on trigger links to tooltip id"],
    keyboard: [{ key: "Escape", action: "Dismiss tooltip" }, { key: "Focus", action: "Shows tooltip (same as hover)" }],
  },
  {
    slug: "tabs",
    name: "Tabs",
    category: "Navigation",
    description: "Organises content into switchable panels. Supports line and pills variants with full keyboard roving tabindex.",
    props: [
      { name: "items", type: "{ value: string; label: string; content: ReactNode }[]", required: true, description: "Tab definitions." },
      { name: "defaultValue", type: "string", description: "Initially selected tab (uncontrolled)." },
      { name: "value", type: "string", description: "Controlled selected tab." },
      { name: "onChange", type: "(value: string) => void", description: "Called when selection changes." },
      { name: "variant", type: '"line" | "pills"', default: '"line"', description: "Visual style." },
    ],
    examples: [
      { title: "Line variant", code: `<Tabs\n  defaultValue="overview"\n  items={[\n    { value: "overview", label: "Overview", content: <p>Overview content</p> },\n    { value: "api",      label: "API",      content: <p>API content</p> },\n    { value: "examples", label: "Examples", content: <p>Examples content</p> },\n  ]}\n/>` },
      { title: "Pills variant", code: `<Tabs variant="pills" defaultValue="day"\n  items={[\n    { value: "day",   label: "Day",   content: null },\n    { value: "week",  label: "Week",  content: null },\n    { value: "month", label: "Month", content: null },\n  ]}\n/>` },
    ],
    aria: ["role=\"tablist\"", "role=\"tab\"", "role=\"tabpanel\"", "aria-selected", "aria-controls"],
    keyboard: [
      { key: "Arrow Left/Right", action: "Move between tabs" },
      { key: "Home / End", action: "Jump to first / last tab" },
      { key: "Tab", action: "Move focus into the active panel" },
    ],
  },
  {
    slug: "accordion",
    name: "Accordion",
    category: "Navigation",
    description: "Expandable sections for progressive disclosure. Supports single or multiple open items at once.",
    props: [
      { name: "items", type: "{ value: string; title: string; content: ReactNode }[]", required: true, description: "Accordion sections." },
      { name: "type", type: '"single" | "multiple"', default: '"single"', description: "Whether one or many items can be open simultaneously." },
      { name: "defaultValue", type: "string | string[]", description: "Initially open item(s)." },
    ],
    examples: [
      { title: "Single", code: `<Accordion\n  type="single"\n  defaultValue="q1"\n  items={[\n    { value: "q1", title: "What is Synerity?", content: "A headless React UI library." },\n    { value: "q2", title: "Is it RSC compatible?", content: "Yes — CSS Modules, no runtime." },\n  ]}\n/>` },
    ],
    aria: ["role=\"button\" on trigger", "aria-expanded", "aria-controls"],
    keyboard: [
      { key: "Enter / Space", action: "Toggle section" },
      { key: "Arrow Up/Down", action: "Navigate between headers" },
    ],
  },
  {
    slug: "stack",
    name: "Stack",
    category: "Layout",
    description: "A vertical flexbox layout primitive. Use gap, align, and justify to control spacing and alignment.",
    props: [
      { name: "gap", type: "string", default: '"16px"', description: "CSS gap between children (any valid CSS value)." },
      { name: "align", type: "CSSProperties[\"alignItems\"]", default: '"stretch"', description: "Cross-axis alignment." },
      { name: "justify", type: "CSSProperties[\"justifyContent\"]", default: '"flex-start"', description: "Main-axis distribution." },
      { name: "children", type: "ReactNode", required: true, description: "Stacked elements." },
    ],
    examples: [
      { title: "Basic", code: `<Stack gap="12px">\n  <Input placeholder="Name" />\n  <Input placeholder="Email" />\n  <Button>Submit</Button>\n</Stack>` },
    ],
  },
  {
    slug: "group",
    name: "Group",
    category: "Layout",
    description: "A horizontal flexbox layout primitive. Use wrap to allow children to flow onto multiple lines.",
    props: [
      { name: "gap", type: "string", default: '"8px"', description: "CSS gap between children." },
      { name: "wrap", type: "boolean", default: "false", description: "Allows children to wrap." },
      { name: "align", type: "CSSProperties[\"alignItems\"]", default: '"center"', description: "Cross-axis alignment." },
      { name: "children", type: "ReactNode", required: true, description: "Grouped elements." },
    ],
    examples: [
      { title: "Toolbar", code: `<Group gap="8px">\n  <Button variant="outline" size="sm">Bold</Button>\n  <Button variant="outline" size="sm">Italic</Button>\n  <Button variant="outline" size="sm">Underline</Button>\n</Group>` },
      { title: "Wrapping tags", code: `<Group wrap gap="8px">\n  {tags.map(t => <Badge key={t}>{t}</Badge>)}\n</Group>` },
    ],
  },
  {
    slug: "text",
    name: "Text",
    category: "Typography",
    description: "A polymorphic text primitive. Renders as <p> by default but accepts an as prop for any HTML element.",
    props: [
      { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: "Font size." },
      { name: "weight", type: '"normal" | "medium" | "semibold" | "bold"', default: '"normal"', description: "Font weight." },
      { name: "color", type: '"default" | "muted" | "subtle"', default: '"default"', description: "Text color token." },
      { name: "as", type: "ElementType", default: '"p"', description: "HTML element to render." },
      { name: "children", type: "ReactNode", required: true, description: "Text content." },
    ],
    examples: [
      { title: "Sizes", code: `<Text size="sm" color="muted">Caption text</Text>\n<Text size="md">Body text</Text>\n<Text size="lg" weight="medium">Lead paragraph</Text>` },
    ],
  },
  {
    slug: "heading",
    name: "Heading",
    category: "Typography",
    description: "Maps a semantic heading level (h1–h6) to a consistent visual scale. Use level to set semantics and size to override visuals independently.",
    props: [
      { name: "level", type: "1 | 2 | 3 | 4 | 5 | 6", default: "2", description: "HTML heading element (h1–h6) — semantic only." },
      { name: "children", type: "ReactNode", required: true, description: "Heading text." },
      { name: "className", type: "string", description: "Additional CSS class." },
    ],
    examples: [
      { title: "Scale", code: `<Heading level={1}>Page title</Heading>\n<Heading level={2}>Section heading</Heading>\n<Heading level={3}>Subsection</Heading>` },
    ],
  },
];

export const componentBySlug = Object.fromEntries(components.map((c) => [c.slug, c]));
