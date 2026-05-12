import type { ComponentType } from "react";

export type DemoEntry = {
  name: string;
  slug: string;
  description: string;
  category: "inputs" | "display" | "layout" | "typography" | "overlays" | "navigation";
  Demo: ComponentType;
};

import { AccordionDemo } from "./Accordion.demo";
import { AlertDemo } from "./Alert.demo";
import { AspectRatioDemo } from "./AspectRatio.demo";
import { AvatarDemo } from "./Avatar.demo";
import { BadgeDemo } from "./Badge.demo";
import { BreadcrumbDemo } from "./Breadcrumb.demo";
import { ButtonDemo } from "./Button.demo";
import { CalloutDemo } from "./Callout.demo";
import { CardDemo } from "./Card.demo";
import { CheckboxDemo } from "./Checkbox.demo";
import { ChipDemo } from "./Chip.demo";
import { ComboboxDemo } from "./Combobox.demo";
import { ContainerDemo } from "./Container.demo";
import { DividerDemo } from "./Divider.demo";
import { DrawerDemo } from "./Drawer.demo";
import { GridDemo } from "./Grid.demo";
import { GroupDemo } from "./Group.demo";
import { HeadingDemo } from "./Heading.demo";
import { InputDemo } from "./Input.demo";
import { LinkDemo } from "./Link.demo";
import { MarkDemo } from "./Mark.demo";
import { MenuDemo } from "./Menu.demo";
import { ModalDemo } from "./Modal.demo";
import { NumberInputDemo } from "./NumberInput.demo";
import { PaginationDemo } from "./Pagination.demo";
import { PinInputDemo } from "./PinInput.demo";
import { PopoverDemo } from "./Popover.demo";
import { ProgressDemo } from "./Progress.demo";
import { RadioDemo } from "./Radio.demo";
import { ScrollAreaDemo } from "./ScrollArea.demo";
import { SelectDemo } from "./Select.demo";
import { SkeletonDemo } from "./Skeleton.demo";
import { SliderDemo } from "./Slider.demo";
import { SpinnerDemo } from "./Spinner.demo";
import { StackDemo } from "./Stack.demo";
import { StatDemo } from "./Stat.demo";
import { StepperDemo } from "./Stepper.demo";
import { SwitchDemo } from "./Switch.demo";
import { TableDemo } from "./Table.demo";
import { TabsDemo } from "./Tabs.demo";
import { TextDemo } from "./Text.demo";
import { TextareaDemo } from "./Textarea.demo";
import { TimelineDemo } from "./Timeline.demo";
import { TooltipDemo } from "./Tooltip.demo";
import { TruncateDemo } from "./Truncate.demo";

export const registry: DemoEntry[] = [
  // Inputs & Controls
  {
    name: "Button",
    slug: "button",
    description: "Interactive trigger with solid, outline, ghost, and link variants.",
    category: "inputs",
    Demo: ButtonDemo,
  },
  {
    name: "Input",
    slug: "input",
    description: "Text input with label, error, and hint ARIA wiring.",
    category: "inputs",
    Demo: InputDemo,
  },
  {
    name: "Textarea",
    slug: "textarea",
    description: "Multi-line text input with optional auto-resize.",
    category: "inputs",
    Demo: TextareaDemo,
  },
  {
    name: "Checkbox",
    slug: "checkbox",
    description: "Accessible checkbox with indeterminate state support.",
    category: "inputs",
    Demo: CheckboxDemo,
  },
  {
    name: "Switch",
    slug: "switch",
    description: "Toggle switch with role=switch semantics.",
    category: "inputs",
    Demo: SwitchDemo,
  },
  {
    name: "Radio",
    slug: "radio",
    description: "Radio button group with controlled and uncontrolled modes.",
    category: "inputs",
    Demo: RadioDemo,
  },
  {
    name: "Select",
    slug: "select",
    description: "Custom single-select with keyboard navigation and ARIA combobox pattern.",
    category: "inputs",
    Demo: SelectDemo,
  },
  {
    name: "Combobox",
    slug: "combobox",
    description: "Filterable text input with a listbox dropdown.",
    category: "inputs",
    Demo: ComboboxDemo,
  },
  {
    name: "NumberInput",
    slug: "number-input",
    description: "Numeric spinbutton with increment/decrement controls.",
    category: "inputs",
    Demo: NumberInputDemo,
  },
  {
    name: "Slider",
    slug: "slider",
    description: "Range slider with optional label and value display.",
    category: "inputs",
    Demo: SliderDemo,
  },
  {
    name: "PinInput",
    slug: "pin-input",
    description: "OTP / PIN input with auto-advance and paste support.",
    category: "inputs",
    Demo: PinInputDemo,
  },
  // Feedback & Display
  {
    name: "Alert",
    slug: "alert",
    description: "Contextual feedback messages — info, success, warning, error.",
    category: "display",
    Demo: AlertDemo,
  },
  {
    name: "Badge",
    slug: "badge",
    description: "Small status label with solid, subtle, and outline variants.",
    category: "display",
    Demo: BadgeDemo,
  },
  {
    name: "Spinner",
    slug: "spinner",
    description: "Animated loading indicator.",
    category: "display",
    Demo: SpinnerDemo,
  },
  {
    name: "Avatar",
    slug: "avatar",
    description: "User avatar with image and initials fallback.",
    category: "display",
    Demo: AvatarDemo,
  },
  {
    name: "Progress",
    slug: "progress",
    description: "Linear progress bar with ARIA progressbar semantics.",
    category: "display",
    Demo: ProgressDemo,
  },
  {
    name: "Skeleton",
    slug: "skeleton",
    description: "Shimmer loading placeholder for content areas.",
    category: "display",
    Demo: SkeletonDemo,
  },
  {
    name: "Chip",
    slug: "chip",
    description: "Small removable pill tag for filters or labels.",
    category: "display",
    Demo: ChipDemo,
  },
  {
    name: "Callout",
    slug: "callout",
    description: "Inline notice block for contextual information or warnings.",
    category: "display",
    Demo: CalloutDemo,
  },
  {
    name: "Stat",
    slug: "stat",
    description: "Metric display card with optional trend indicator.",
    category: "display",
    Demo: StatDemo,
  },
  {
    name: "Popover",
    slug: "popover",
    description: "Non-modal floating panel anchored to a trigger element.",
    category: "display",
    Demo: PopoverDemo,
  },
  {
    name: "Table",
    slug: "table",
    description: "Semantic HTML table with striped, hover, and size variants.",
    category: "display",
    Demo: TableDemo,
  },
  {
    name: "Timeline",
    slug: "timeline",
    description: "Vertical ordered event list with labelled dots and connecting lines.",
    category: "display",
    Demo: TimelineDemo,
  },
  // Layout
  {
    name: "Card",
    slug: "card",
    description: "Contained surface with header, body, and footer slots.",
    category: "layout",
    Demo: CardDemo,
  },
  {
    name: "Stack",
    slug: "stack",
    description: "Vertical flex container with configurable gap.",
    category: "layout",
    Demo: StackDemo,
  },
  {
    name: "Group",
    slug: "group",
    description: "Horizontal flex container for inline element grouping.",
    category: "layout",
    Demo: GroupDemo,
  },
  {
    name: "Grid",
    slug: "grid",
    description: "CSS Grid container with fixed or responsive column counts.",
    category: "layout",
    Demo: GridDemo,
  },
  {
    name: "Divider",
    slug: "divider",
    description: "Visual separator for horizontal and vertical orientations.",
    category: "layout",
    Demo: DividerDemo,
  },
  {
    name: "Container",
    slug: "container",
    description: "Centred layout wrapper that constrains content to a max-width.",
    category: "layout",
    Demo: ContainerDemo,
  },
  {
    name: "AspectRatio",
    slug: "aspect-ratio",
    description: "Preserves a fixed width-to-height ratio for child content.",
    category: "layout",
    Demo: AspectRatioDemo,
  },
  {
    name: "ScrollArea",
    slug: "scroll-area",
    description: "Scrollable container with a styled thin scrollbar.",
    category: "layout",
    Demo: ScrollAreaDemo,
  },
  // Typography
  {
    name: "Text",
    slug: "text",
    description: "Polymorphic text element with size, weight, and colour variants.",
    category: "typography",
    Demo: TextDemo,
  },
  {
    name: "Heading",
    slug: "heading",
    description: "Typographic heading — maps h1–h6 via a level prop.",
    category: "typography",
    Demo: HeadingDemo,
  },
  {
    name: "Link",
    slug: "link",
    description: "Anchor element styled with design-system link tokens.",
    category: "typography",
    Demo: LinkDemo,
  },
  {
    name: "Mark",
    slug: "mark",
    description: "Inline text highlight using a semi-transparent tinted background.",
    category: "typography",
    Demo: MarkDemo,
  },
  {
    name: "Truncate",
    slug: "truncate",
    description: "Clamps text to a fixed number of lines with an ellipsis.",
    category: "typography",
    Demo: TruncateDemo,
  },
  // Overlays
  {
    name: "Modal",
    slug: "modal",
    description: "Focus-trapped dialog overlay with scroll lock.",
    category: "overlays",
    Demo: ModalDemo,
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    description: "Hover/focus tooltip with placement and delay support.",
    category: "overlays",
    Demo: TooltipDemo,
  },
  {
    name: "Drawer",
    slug: "drawer",
    description: "Slide-in panel anchored to any viewport edge.",
    category: "overlays",
    Demo: DrawerDemo,
  },
  {
    name: "Menu",
    slug: "menu",
    description: "Dropdown menu following the ARIA menu pattern.",
    category: "overlays",
    Demo: MenuDemo,
  },
  // Navigation
  {
    name: "Tabs",
    slug: "tabs",
    description: "Tabbed interface with full keyboard navigation.",
    category: "navigation",
    Demo: TabsDemo,
  },
  {
    name: "Accordion",
    slug: "accordion",
    description: "Expandable content sections with animated transitions.",
    category: "navigation",
    Demo: AccordionDemo,
  },
  {
    name: "Breadcrumb",
    slug: "breadcrumb",
    description: "Navigation breadcrumb trail with configurable separator.",
    category: "navigation",
    Demo: BreadcrumbDemo,
  },
  {
    name: "Stepper",
    slug: "stepper",
    description: "Linear multi-step progress indicator with horizontal and vertical orientations.",
    category: "navigation",
    Demo: StepperDemo,
  },
  {
    name: "Pagination",
    slug: "pagination",
    description: "Page navigation with ellipsis for large page counts.",
    category: "navigation",
    Demo: PaginationDemo,
  },
];
