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
import { AvatarDemo } from "./Avatar.demo";
import { BadgeDemo } from "./Badge.demo";
import { ButtonDemo } from "./Button.demo";
import { CardDemo } from "./Card.demo";
import { CheckboxDemo } from "./Checkbox.demo";
import { GroupDemo } from "./Group.demo";
import { HeadingDemo } from "./Heading.demo";
import { InputDemo } from "./Input.demo";
import { ModalDemo } from "./Modal.demo";
import { SpinnerDemo } from "./Spinner.demo";
import { StackDemo } from "./Stack.demo";
import { SwitchDemo } from "./Switch.demo";
import { TabsDemo } from "./Tabs.demo";
import { TextDemo } from "./Text.demo";
import { TextareaDemo } from "./Textarea.demo";
import { TooltipDemo } from "./Tooltip.demo";

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
];
