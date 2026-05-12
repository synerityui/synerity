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
  // ── Inputs & Controls (7 new) ────────────────────────────────────────────
  {
    slug: "radio",
    name: "Radio",
    category: "Inputs & Controls",
    description: "Single-selection button within a RadioGroup. Always place Radio components inside a RadioGroup — never standalone.",
    props: [
      { name: "value", type: "string", required: true, description: "The value this radio represents." },
      { name: "disabled", type: "boolean", default: "false", description: "Prevents selection." },
      { name: "children", type: "ReactNode", description: "Label content." },
    ],
    examples: [
      {
        title: "RadioGroup",
        code: `<RadioGroup defaultValue="b">
  <Radio value="a">Option A</Radio>
  <Radio value="b">Option B</Radio>
  <Radio value="c" disabled>Disabled</Radio>
</RadioGroup>`,
      },
    ],
    aria: ['role="radio"', "aria-checked", 'role="radiogroup" on container'],
    keyboard: [
      { key: "Arrow Up/Down", action: "Move selection between options" },
      { key: "Space", action: "Select focused option" },
    ],
  },
  {
    slug: "select",
    name: "Select",
    category: "Inputs & Controls",
    description: "Custom single-select dropdown following the ARIA combobox pattern. Keyboard navigable; does not use a native <select> element.",
    props: [
      { name: "options", type: "{ value: string; label: string; disabled?: boolean }[]", required: true, description: "List of options." },
      { name: "value", type: "string", description: "Controlled selected value." },
      { name: "defaultValue", type: "string", description: "Uncontrolled initial value." },
      { name: "onChange", type: "(value: string) => void", description: "Called when selection changes." },
      { name: "placeholder", type: "string", default: '"Select an option"', description: "Placeholder text." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the select." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Trigger size." },
      { name: "label", type: "string", description: "Optional label above the select." },
      { name: "error", type: "string", description: "Error message below the select." },
    ],
    examples: [
      {
        title: "Basic",
        code: `<Select
  options={[
    { value: "react",   label: "React" },
    { value: "vue",     label: "Vue" },
    { value: "svelte",  label: "Svelte" },
  ]}
  placeholder="Choose a framework"
  onChange={(v) => console.log(v)}
/>`,
      },
      { title: "With label & error", code: `<Select label="Framework" error="Required" options={[...]} />` },
    ],
    aria: ['role="combobox" on trigger', "aria-expanded", 'role="listbox"', 'role="option"', "aria-selected"],
    keyboard: [
      { key: "Enter / Space / ↓", action: "Open listbox" },
      { key: "↑ / ↓", action: "Navigate options" },
      { key: "Enter", action: "Select focused option" },
      { key: "Escape", action: "Close listbox" },
    ],
  },
  {
    slug: "combobox",
    name: "Combobox",
    category: "Inputs & Controls",
    description: 'Text input that filters a list of options as you type. Follows the ARIA combobox pattern with aria-autocomplete="list".',
    props: [
      { name: "options", type: "{ value: string; label: string; disabled?: boolean }[]", required: true, description: "Full option list — filtered client-side." },
      { name: "value", type: "string", description: "Controlled selected value." },
      { name: "onChange", type: "(value: string) => void", description: "Called when an option is selected." },
      { name: "inputValue", type: "string", description: "Controlled input text." },
      { name: "onInputChange", type: "(value: string) => void", description: "Called on every keystroke." },
      { name: "placeholder", type: "string", description: "Input placeholder." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the combobox." },
      { name: "label", type: "string", description: "Label above the input." },
      { name: "error", type: "string", description: "Error message." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Input size." },
    ],
    examples: [
      {
        title: "Basic",
        code: `<Combobox
  options={[
    { value: "react",   label: "React" },
    { value: "vue",     label: "Vue" },
    { value: "angular", label: "Angular" },
  ]}
  label="Framework"
  placeholder="Search frameworks…"
/>`,
      },
    ],
    aria: [
      'role="combobox"',
      'aria-autocomplete="list"',
      "aria-expanded",
      "aria-controls links to listbox",
      'role="listbox" on dropdown',
      'role="option" on items',
    ],
    keyboard: [
      { key: "↑ / ↓", action: "Navigate filtered options" },
      { key: "Enter", action: "Select highlighted option" },
      { key: "Escape", action: "Close dropdown" },
    ],
  },
  {
    slug: "number-input",
    name: "NumberInput",
    category: "Inputs & Controls",
    description: "A number spinbutton with increment/decrement buttons and keyboard arrow key support. Enforces min, max, and step constraints.",
    props: [
      { name: "value", type: "number", description: "Controlled value." },
      { name: "defaultValue", type: "number", description: "Uncontrolled initial value." },
      { name: "onChange", type: "(value: number) => void", description: "Called when value changes." },
      { name: "min", type: "number", description: "Minimum allowed value." },
      { name: "max", type: "number", description: "Maximum allowed value." },
      { name: "step", type: "number", default: "1", description: "Increment/decrement amount." },
      { name: "precision", type: "number", default: "0", description: "Decimal places to round to." },
      { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction." },
      { name: "label", type: "string", description: "Label above the input." },
      { name: "error", type: "string", description: "Error message." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Input size." },
    ],
    examples: [
      { title: "Basic", code: `<NumberInput label="Quantity" defaultValue={1} min={1} max={99} />` },
      { title: "With step & precision", code: `<NumberInput label="Price" defaultValue={9.99} step={0.01} precision={2} min={0} />` },
    ],
    aria: ["role=\"spinbutton\"", "aria-valuenow", "aria-valuemin", "aria-valuemax"],
    keyboard: [
      { key: "↑ / ↓", action: "Increment / decrement by step" },
      { key: "Home / End", action: "Jump to min / max" },
    ],
  },
  {
    slug: "slider",
    name: "Slider",
    category: "Inputs & Controls",
    description: 'A range input for selecting a numeric value between min and max. Styled native <input type="range"> with full keyboard and a11y support.',
    props: [
      { name: "value", type: "number", description: "Controlled value." },
      { name: "defaultValue", type: "number", description: "Uncontrolled initial value." },
      { name: "onChange", type: "(value: number) => void", description: "Called when value changes." },
      { name: "min", type: "number", default: "0", description: "Minimum value." },
      { name: "max", type: "number", default: "100", description: "Maximum value." },
      { name: "step", type: "number", default: "1", description: "Increment amount." },
      { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction." },
      { name: "label", type: "string", description: "Label shown above the track." },
      { name: "showValue", type: "boolean", default: "false", description: "Shows current value next to the label." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Track size." },
    ],
    examples: [
      { title: "Basic", code: `<Slider label="Volume" defaultValue={60} />` },
      { title: "With value display", code: `<Slider label="Threshold" defaultValue={40} showValue />` },
      { title: "Step", code: `<Slider label="Rating" min={1} max={5} step={1} defaultValue={3} showValue />` },
    ],
    aria: ["aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-label via label prop"],
    keyboard: [
      { key: "← / →", action: "Decrease / increase by step" },
      { key: "Home / End", action: "Jump to min / max" },
    ],
  },
  {
    slug: "pin-input",
    name: "PinInput",
    category: "Inputs & Controls",
    description: "N individual character cells for OTP and PIN entry. Auto-advances focus and supports paste.",
    props: [
      { name: "length", type: "number", default: "6", description: "Number of input cells." },
      { name: "value", type: "string", description: "Controlled value (string of digits/chars)." },
      { name: "onChange", type: "(value: string) => void", description: "Called when value changes." },
      { name: "onComplete", type: "(value: string) => void", description: "Fired when all cells are filled." },
      { name: "type", type: '"numeric" | "alphanumeric"', default: '"numeric"', description: "Allowed characters." },
      { name: "masked", type: "boolean", default: "false", description: "Masks input like a password field." },
      { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction." },
      { name: "invalid", type: "boolean", default: "false", description: "Applies error styling to all cells." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Cell size." },
    ],
    examples: [
      { title: "Basic OTP", code: `<PinInput length={6} onComplete={(v) => console.log("OTP:", v)} />` },
      { title: "Masked", code: `<PinInput length={4} masked />` },
    ],
    keyboard: [
      { key: "Backspace", action: "Clear cell and move focus back" },
      { key: "← / →", action: "Move between cells" },
      { key: "Paste", action: "Distribute characters across cells" },
    ],
  },
  // ── Feedback & Display (3 new) ────────────────────────────────────────────
  {
    slug: "chip",
    name: "Chip",
    category: "Feedback & Display",
    description: "A small removable pill for tags, filters, and selections. Renders a dismiss button when onRemove is provided.",
    props: [
      { name: "label", type: "string", required: true, description: "Chip text." },
      { name: "onRemove", type: "() => void", description: "Renders a × button when provided." },
      { name: "variant", type: '"default" | "primary" | "success" | "warning" | "danger"', default: '"default"', description: "Color scheme." },
      { name: "size", type: '"sm" | "md"', default: '"md"', description: "Chip size." },
      { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction." },
    ],
    examples: [
      { title: "Static", code: `<Chip label="TypeScript" variant="primary" />` },
      { title: "Removable", code: `<Chip label="React" onRemove={() => removeTag("React")} />` },
      {
        title: "All variants",
        code: `<Chip label="Default" />\n<Chip label="Primary" variant="primary" />\n<Chip label="Success" variant="success" />\n<Chip label="Warning" variant="warning" />\n<Chip label="Danger" variant="danger" />`,
      },
    ],
  },
  {
    slug: "callout",
    name: "Callout",
    category: "Feedback & Display",
    description: "An aside block for inline notices — similar to Alert but embedded in content flow rather than as a system notification.",
    props: [
      { name: "variant", type: '"info" | "success" | "warning" | "danger" | "neutral"', default: '"info"', description: "Semantic color and icon." },
      { name: "title", type: "string", description: "Bold heading inside the callout." },
      { name: "icon", type: "ReactNode", description: "Custom icon. Each variant has a default icon." },
      { name: "children", type: "ReactNode", required: true, description: "Callout body." },
    ],
    examples: [
      {
        title: "Variants",
        code: `<Callout variant="info" title="Note">Check the API docs for rate limits.</Callout>\n<Callout variant="warning" title="Caution">This action cannot be undone.</Callout>\n<Callout variant="danger" title="Breaking change">The old API was removed in v2.</Callout>`,
      },
    ],
    aria: ['role="note"'],
  },
  {
    slug: "stat",
    name: "Stat",
    category: "Feedback & Display",
    description: "A metric display block with label, value, and optional trend indicator. Use inside a Grid for dashboards.",
    props: [
      { name: "label", type: "string", required: true, description: "Metric name." },
      { name: "value", type: "ReactNode", required: true, description: "The metric value (number, string, or JSX)." },
      { name: "trend", type: '"up" | "down" | "neutral"', description: "Direction of change." },
      { name: "trendValue", type: "string", description: 'Change label e.g. "+12.5%".' },
      { name: "helpText", type: "string", description: "Secondary muted text below the value." },
    ],
    examples: [
      { title: "Basic", code: `<Stat label="Monthly Revenue" value="$48,291" trend="up" trendValue="+12.5%" />` },
      {
        title: "Dashboard grid",
        code: `<Grid cols={3} gap={4}>
  <Stat label="Users" value="1,204" trend="up" trendValue="+8%" />
  <Stat label="Churn" value="2.1%" trend="down" trendValue="-0.3%" />
  <Stat label="MRR" value="$9,840" trend="neutral" />
</Grid>`,
      },
    ],
  },
  // ── Layout (5 new) ────────────────────────────────────────────────────────
  {
    slug: "grid",
    name: "Grid",
    category: "Layout",
    description: "A CSS Grid layout primitive. Pass cols as a number for a fixed column count or as a responsive object.",
    props: [
      { name: "cols", type: "number | { sm?: number; md?: number; lg?: number }", default: "1", description: "Number of columns." },
      { name: "gap", type: "number", default: "4", description: "Gap size (maps to space tokens 1–24)." },
      { name: "align", type: '"start" | "center" | "end" | "stretch"', default: '"stretch"', description: "align-items value." },
      { name: "children", type: "ReactNode", required: true, description: "Grid children." },
    ],
    examples: [
      {
        title: "Fixed columns",
        code: `<Grid cols={3} gap={4}>\n  <Card>One</Card>\n  <Card>Two</Card>\n  <Card>Three</Card>\n</Grid>`,
      },
      {
        title: "Responsive",
        code: `<Grid cols={{ sm: 1, md: 2, lg: 3 }} gap={6}>\n  {items.map(i => <Card key={i.id}>{i.title}</Card>)}\n</Grid>`,
      },
    ],
  },
  {
    slug: "divider",
    name: "Divider",
    category: "Layout",
    description: "A thin separator line. Optionally renders a centred text label. Supports horizontal and vertical orientations.",
    props: [
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direction of the line." },
      { name: "label", type: "string", description: "Optional centred text between two lines." },
    ],
    examples: [
      { title: "Plain", code: `<Divider />` },
      { title: "With label", code: `<Divider label="or continue with" />` },
      {
        title: "Vertical (in flex row)",
        code: `<Group>\n  <Button>Cancel</Button>\n  <Divider orientation="vertical" />\n  <Button>Save</Button>\n</Group>`,
      },
    ],
  },
  {
    slug: "container",
    name: "Container",
    category: "Layout",
    description: "A max-width centred wrapper with consistent horizontal padding. Use as the root layout wrapper for page content.",
    props: [
      { name: "size", type: '"sm" | "md" | "lg" | "xl" | "full"', default: '"lg"', description: "Max-widths: sm=640px, md=768px, lg=1024px, xl=1280px, full=100%." },
      { name: "children", type: "ReactNode", required: true, description: "Page content." },
    ],
    examples: [
      {
        title: "Page layout",
        code: `<Container size="lg">\n  <Heading level={1}>My Page</Heading>\n  <Text>Content here…</Text>\n</Container>`,
      },
    ],
  },
  {
    slug: "aspect-ratio",
    name: "AspectRatio",
    category: "Layout",
    description: "Enforces a specific aspect ratio on its child. Common ratios: 16/9 (video), 1 (square), 4/3.",
    props: [
      { name: "ratio", type: "number", default: "1.7778 (16/9)", description: "Width ÷ height. 1 = square, 16/9 ≈ 1.78." },
      { name: "children", type: "ReactNode", required: true, description: "Content stretched to fill the box." },
    ],
    examples: [
      {
        title: "Video embed",
        code: `<AspectRatio ratio={16/9}>\n  <iframe src="..." style={{ width: "100%", height: "100%", border: 0 }} />\n</AspectRatio>`,
      },
      {
        title: "Square image",
        code: `<AspectRatio ratio={1}>\n  <img src="/photo.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} />\n</AspectRatio>`,
      },
    ],
  },
  {
    slug: "scroll-area",
    name: "ScrollArea",
    category: "Layout",
    description: "A scrollable container with a custom thin scrollbar — consistent cross-browser without layout jank.",
    props: [
      { name: "maxHeight", type: "string | number", description: 'CSS max-height e.g. "400px" or 400.' },
      { name: "maxWidth", type: "string | number", description: "CSS max-width." },
      { name: "children", type: "ReactNode", required: true, description: "Scrollable content." },
    ],
    examples: [
      {
        title: "Constrained list",
        code: `<ScrollArea maxHeight="300px">\n  {longList.map(item => <div key={item.id}>{item.label}</div>)}\n</ScrollArea>`,
      },
    ],
  },
  // ── Typography (3 new) ────────────────────────────────────────────────────
  {
    slug: "link",
    name: "Link",
    category: "Typography",
    description: 'A styled anchor element. Use variant="inline" inside text and variant="standalone" for navigation links.',
    props: [
      { name: "variant", type: '"inline" | "standalone"', default: '"inline"', description: "Visual style." },
      { name: "external", type: "boolean", default: "false", description: 'Adds target="_blank" and a ↗ icon.' },
      { name: "href", type: "string", description: "URL (passed through to <a>)." },
      { name: "children", type: "ReactNode", required: true, description: "Link label." },
    ],
    examples: [
      { title: "Inline", code: `<Text>Read the <Link href="/docs">documentation</Link> for details.</Text>` },
      { title: "External", code: `<Link href="https://github.com" external>GitHub</Link>` },
      { title: "Standalone nav", code: `<Link href="/settings" variant="standalone">Account settings</Link>` },
    ],
  },
  {
    slug: "mark",
    name: "Mark",
    category: "Typography",
    description: "Highlighted text using a semantic <mark> element. Four color options map to semantic meanings.",
    props: [
      { name: "color", type: '"yellow" | "green" | "blue" | "pink"', default: '"yellow"', description: "Highlight color." },
      { name: "children", type: "ReactNode", required: true, description: "Highlighted text." },
    ],
    examples: [
      { title: "Search highlight", code: `<Text>The word <Mark>component</Mark> appears 12 times.</Text>` },
      {
        title: "Colors",
        code: `<Mark color="yellow">Warning</Mark>\n<Mark color="green">Added</Mark>\n<Mark color="blue">Info</Mark>\n<Mark color="pink">Removed</Mark>`,
      },
    ],
  },
  {
    slug: "truncate",
    name: "Truncate",
    category: "Typography",
    description: "Clips overflowing text with an ellipsis. Use lines={1} for single-line truncation or lines={N} for multi-line clamping.",
    props: [
      { name: "lines", type: "number", default: "1", description: "Number of lines before truncation. >1 uses -webkit-line-clamp." },
      { name: "children", type: "ReactNode", required: true, description: "Text content to truncate." },
    ],
    examples: [
      {
        title: "Single line",
        code: `<Truncate>This is a very long title that will be cut off at one line no matter how wide the container is.</Truncate>`,
      },
      {
        title: "Two lines",
        code: `<Truncate lines={2}>This description will wrap to a second line but no further, with an ellipsis on the last visible line.</Truncate>`,
      },
    ],
  },
  // ── Overlays (2 new) ──────────────────────────────────────────────────────
  {
    slug: "drawer",
    name: "Drawer",
    category: "Overlays",
    description: "A panel that slides in from any edge of the screen. Uses the same focus trap and scroll lock as Modal.",
    props: [
      { name: "open", type: "boolean", required: true, description: "Controls visibility." },
      { name: "onOpenChange", type: "(open: boolean) => void", required: true, description: "Called when the drawer requests to close." },
      { name: "placement", type: '"left" | "right" | "top" | "bottom"', default: '"right"', description: "Edge to slide in from." },
      { name: "size", type: '"sm" | "md" | "lg" | "xl" | "full"', default: '"md"', description: "Panel width (or height for top/bottom)." },
      { name: "title", type: "string", description: "Panel heading." },
      { name: "description", type: "string", description: "Subheading below the title." },
      { name: "footer", type: "ReactNode", description: "Action buttons at the bottom." },
      { name: "children", type: "ReactNode", description: "Scrollable body content." },
    ],
    examples: [
      {
        title: "Right drawer",
        code: `const [open, setOpen] = useState(false)\n\n<Button onClick={() => setOpen(true)}>Open drawer</Button>\n\n<Drawer\n  open={open}\n  onOpenChange={setOpen}\n  title="Settings"\n  footer={<Button onClick={() => setOpen(false)}>Save</Button>}\n>\n  <Stack gap="16px">\n    <Input label="Name" />\n    <Switch>Notifications</Switch>\n  </Stack>\n</Drawer>`,
      },
    ],
    aria: ['role="dialog"', "aria-modal", "Focus trapped while open"],
    keyboard: [
      { key: "Escape", action: "Close the drawer" },
      { key: "Tab / Shift+Tab", action: "Cycle focus within the panel" },
    ],
  },
  {
    slug: "menu",
    name: "Menu",
    category: "Overlays",
    description: "A floating dropdown menu following the ARIA menu pattern. Compose with MenuItem, MenuDivider, and MenuGroup.",
    props: [
      { name: "trigger", type: "ReactNode", required: true, description: "The element that opens the menu (must accept a ref)." },
      { name: "open", type: "boolean", description: "Controlled open state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when open state changes." },
      { name: "onSelect", type: "(value: string) => void", description: "Called when a MenuItem is selected." },
      { name: "placement", type: '"bottom-start" | "bottom-end" | "top-start" | "top-end"', default: '"bottom-start"', description: "Preferred position relative to trigger." },
      { name: "children", type: "ReactNode", description: "MenuItem / MenuDivider / MenuGroup elements." },
    ],
    examples: [
      {
        title: "Basic",
        code: `<Menu trigger={<Button variant="outline">Options ▾</Button>} onSelect={(v) => console.log(v)}>\n  <MenuItem value="edit">Edit</MenuItem>\n  <MenuItem value="duplicate">Duplicate</MenuItem>\n  <MenuDivider />\n  <MenuItem value="delete">Delete</MenuItem>\n</Menu>`,
      },
      {
        title: "With groups",
        code: `<Menu trigger={<Button>Actions ▾</Button>}>\n  <MenuGroup label="File">\n    <MenuItem value="new">New</MenuItem>\n    <MenuItem value="open">Open</MenuItem>\n  </MenuGroup>\n  <MenuDivider />\n  <MenuItem value="quit">Quit</MenuItem>\n</Menu>`,
      },
    ],
    aria: ['role="menu"', 'aria-haspopup="menu"', 'role="menuitem"', "aria-disabled on disabled items"],
    keyboard: [
      { key: "↑ / ↓", action: "Navigate items" },
      { key: "Enter / Space", action: "Select item" },
      { key: "Escape", action: "Close menu" },
      { key: "Tab", action: "Close and move focus" },
    ],
  },
  // ── Navigation (2 new) ────────────────────────────────────────────────────
  {
    slug: "breadcrumb",
    name: "Breadcrumb",
    category: "Navigation",
    description: 'Hierarchical navigation trail. The last item is always rendered as plain text with aria-current="page".',
    props: [
      { name: "items", type: "{ label: string; href?: string }[]", required: true, description: 'Breadcrumb steps. Last item should omit href.' },
      { name: "separator", type: "ReactNode", description: 'Custom separator (default: "/").' },
    ],
    examples: [
      {
        title: "Basic",
        code: `<Breadcrumb\n  items={[\n    { label: "Home",       href: "/" },\n    { label: "Components", href: "/docs/components" },\n    { label: "Breadcrumb" },\n  ]}\n/>`,
      },
      { title: "Custom separator", code: `<Breadcrumb separator="›" items={[...]} />` },
    ],
    aria: ['<nav aria-label="Breadcrumb">', "<ol> with <li> items", 'aria-current="page" on the current item'],
  },
  {
    slug: "stepper",
    name: "Stepper",
    category: "Navigation",
    description: "A visual multi-step progress indicator. Marks steps as complete, current, or upcoming.",
    props: [
      { name: "steps", type: "{ label: string; description?: string }[]", required: true, description: "Step definitions." },
      { name: "currentStep", type: "number", required: true, description: "0-indexed index of the active step." },
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Layout direction." },
    ],
    examples: [
      {
        title: "Horizontal",
        code: `<Stepper\n  currentStep={1}\n  steps={[\n    { label: "Account", description: "Personal info" },\n    { label: "Plan",    description: "Choose tier" },\n    { label: "Payment", description: "Billing details" },\n  ]}\n/>`,
      },
      {
        title: "Vertical",
        code: `<Stepper orientation="vertical" currentStep={2} steps={[\n  { label: "Create project" },\n  { label: "Invite team" },\n  { label: "Deploy" },\n]} />`,
      },
    ],
  },
  // ── Data Display (2 new) ──────────────────────────────────────────────────
  {
    slug: "table",
    name: "Table",
    category: "Data Display",
    description: "Semantic HTML table with striped, hoverable, bordered, and sticky-header modifiers. Compose using Table, Thead, Tbody, Tr, Th, Td, and TableContainer.",
    props: [
      { name: "striped", type: "boolean", default: "false", description: "Alternate row background." },
      { name: "hoverable", type: "boolean", default: "false", description: "Highlight rows on hover." },
      { name: "bordered", type: "boolean", default: "false", description: "Border on all cells." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Cell padding." },
      { name: "stickyHeader", type: "boolean", default: "false", description: "Thead sticks to top on scroll." },
    ],
    examples: [
      {
        title: "Basic",
        code: `<TableContainer>\n  <Table striped hoverable>\n    <Thead>\n      <Tr>\n        <Th>Name</Th>\n        <Th>Role</Th>\n        <Th align="right">Status</Th>\n      </Tr>\n    </Thead>\n    <Tbody>\n      <Tr>\n        <Td>Alice</Td>\n        <Td>Engineer</Td>\n        <Td align="right"><Badge variant="success">Active</Badge></Td>\n      </Tr>\n    </Tbody>\n  </Table>\n</TableContainer>`,
      },
    ],
  },
  {
    slug: "timeline",
    name: "Timeline",
    category: "Data Display",
    description: "A vertical list of chronological events with a dot connector. Each item supports a variant for semantic coloring.",
    props: [
      {
        name: "items",
        type: "{ id: string; title: ReactNode; description?: ReactNode; time?: string; icon?: ReactNode; variant?: 'default'|'success'|'warning'|'danger'|'info' }[]",
        required: true,
        description: "Timeline event definitions.",
      },
    ],
    examples: [
      {
        title: "Activity feed",
        code: `<Timeline items={[\n  { id: "1", title: "Deployed v1.2.0", time: "2 min ago", variant: "success" },\n  { id: "2", title: "Tests failed", description: "3 suites failed on CI", time: "15 min ago", variant: "danger" },\n  { id: "3", title: "PR #42 merged", time: "1 hour ago" },\n]} />`,
      },
    ],
  },
];

export const componentBySlug = Object.fromEntries(components.map((c) => [c.slug, c]));
