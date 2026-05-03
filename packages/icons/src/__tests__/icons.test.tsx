import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import {
  AlertCircle,
  ArrowLeft,
  Bell,
  Bookmark,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Code,
  Copy,
  Database,
  Download,
  Edit,
  ExternalLink,
  File,
  Filter,
  Folder,
  Globe,
  Heart,
  Home,
  Icon,
  Info,
  Key,
  Loader,
  Lock,
  LogIn,
  Mail,
  Map,
  Maximize,
  Menu,
  MessageSquare,
  Minus,
  Moon,
  MoreHorizontal,
  Pause,
  Phone,
  Play,
  Plus,
  Refresh,
  Search,
  Settings,
  Share,
  Shield,
  Sliders,
  Sort,
  Star,
  Sun,
  Tag,
  Trash,
  Upload,
  User,
  Users,
  X,
  XCircle,
} from "../index";

// ── Helpers ───────────────────────────────────────────────────────────────────

const ALL_ICONS = [
  ["ArrowLeft", ArrowLeft],
  ["ChevronDown", ChevronDown],
  ["ExternalLink", ExternalLink],
  ["Home", Home],
  ["Menu", Menu],
  ["X", X],
  ["MoreHorizontal", MoreHorizontal],
  ["Copy", Copy],
  ["Download", Download],
  ["Upload", Upload],
  ["Edit", Edit],
  ["Trash", Trash],
  ["Plus", Plus],
  ["Minus", Minus],
  ["Search", Search],
  ["Filter", Filter],
  ["Sort", Sort],
  ["Refresh", Refresh],
  ["Settings", Settings],
  ["Sliders", Sliders],
  ["Check", Check],
  ["AlertCircle", AlertCircle],
  ["Info", Info],
  ["XCircle", XCircle],
  ["Clock", Clock],
  ["Loader", Loader],
  ["Play", Play],
  ["Pause", Pause],
  ["Maximize", Maximize],
  ["File", File],
  ["Folder", Folder],
  ["Code", Code],
  ["Database", Database],
  ["Mail", Mail],
  ["Bell", Bell],
  ["MessageSquare", MessageSquare],
  ["Phone", Phone],
  ["User", User],
  ["Users", Users],
  ["LogIn", LogIn],
  ["Lock", Lock],
  ["Shield", Shield],
  ["Key", Key],
  ["Star", Star],
  ["Heart", Heart],
  ["Bookmark", Bookmark],
  ["Tag", Tag],
  ["Globe", Globe],
  ["Map", Map],
  ["Calendar", Calendar],
  ["Sun", Sun],
  ["Moon", Moon],
] as const;

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("Icon base component", () => {
  it("renders an svg element", () => {
    const { container } = render(<Icon />);
    expect(container.querySelector("svg")).toBeTruthy();
  });

  it("defaults to aria-hidden=true (decorative)", () => {
    const { container } = render(<Icon />);
    expect(container.querySelector("svg")?.getAttribute("aria-hidden")).toBe("true");
  });

  it("sets role=img and aria-label when aria-label is provided", () => {
    const { container } = render(<Icon aria-label="Close dialog" />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("role")).toBe("img");
    expect(svg.getAttribute("aria-label")).toBe("Close dialog");
    expect(svg.getAttribute("aria-hidden")).toBeNull();
  });

  it("applies size to width and height", () => {
    const { container } = render(<Icon size={32} />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("width")).toBe("32");
    expect(svg.getAttribute("height")).toBe("32");
  });

  it("defaults size to 24", () => {
    const { container } = render(<Icon />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("width")).toBe("24");
    expect(svg.getAttribute("height")).toBe("24");
  });

  it("forwards extra svg props", () => {
    const { container } = render(<Icon className="my-icon" data-testid="icon" />);
    expect(container.querySelector("svg")?.getAttribute("class")).toBe("my-icon");
  });

  it("forwards ref", () => {
    const ref = React.createRef<SVGSVGElement>();
    render(<Icon ref={ref} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });
});

describe("Individual icon components", () => {
  it.each(ALL_ICONS)("%s renders an svg without errors", (_, IconComponent) => {
    const { container } = render(<IconComponent />);
    expect(container.querySelector("svg")).toBeTruthy();
  });

  it.each(ALL_ICONS)("%s is aria-hidden by default", (_, IconComponent) => {
    const { container } = render(<IconComponent />);
    expect(container.querySelector("svg")?.getAttribute("aria-hidden")).toBe("true");
  });

  it.each(ALL_ICONS)("%s respects size prop", (_, IconComponent) => {
    const { container } = render(<IconComponent size={16} />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("width")).toBe("16");
    expect(svg.getAttribute("height")).toBe("16");
  });
});

describe("Named exports", () => {
  it("exports the correct displayName on each icon", () => {
    expect(ArrowLeft.displayName).toBe("ArrowLeft");
    expect(Check.displayName).toBe("Check");
    expect(User.displayName).toBe("User");
    expect(Star.displayName).toBe("Star");
  });
});
