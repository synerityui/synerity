// Source of truth for all Synerity design tokens.
// The build script reads this file and generates dist/tokens.css and dist/index.js.
// All token names map 1-to-1 to CSS custom properties: --synerity-{category}-{key}.

const color = {
  // Brand
  primary: "#6366f1",
  "primary-hover": "#4f46e5",
  "primary-active": "#4338ca",
  "primary-subtle": "#eef2ff",
  "primary-subtle-hover": "#e0e7ff",
  secondary: "#8b5cf6",
  "secondary-hover": "#7c3aed",
  "secondary-subtle": "#f5f3ff",

  // Semantic
  success: "#22c55e",
  "success-hover": "#16a34a",
  "success-subtle": "#f0fdf4",
  warning: "#f59e0b",
  "warning-hover": "#d97706",
  "warning-subtle": "#fffbeb",
  danger: "#ef4444",
  "danger-hover": "#dc2626",
  "danger-subtle": "#fef2f2",
  info: "#3b82f6",
  "info-hover": "#2563eb",
  "info-subtle": "#eff6ff",

  // Neutral scale (0 = darkest, 12 = lightest / white)
  "neutral-0": "#020617",
  "neutral-1": "#0f172a",
  "neutral-2": "#1e293b",
  "neutral-3": "#334155",
  "neutral-4": "#475569",
  "neutral-5": "#64748b",
  "neutral-6": "#94a3b8",
  "neutral-7": "#cbd5e1",
  "neutral-8": "#e2e8f0",
  "neutral-9": "#f1f5f9",
  "neutral-10": "#f8fafc",
  "neutral-11": "#fafafa",
  "neutral-12": "#ffffff",

  // Surface
  surface: "#ffffff",
  "surface-raised": "#f8fafc",
  "surface-overlay": "#f1f5f9",
  "surface-sunken": "#f1f5f9",
  border: "#e2e8f0",
  "border-strong": "#cbd5e1",
  "border-focus": "#6366f1",

  // Text
  "text-primary": "#0f172a",
  "text-secondary": "#475569",
  "text-tertiary": "#94a3b8",
  "text-disabled": "#cbd5e1",
  "text-inverse": "#ffffff",
  "text-on-primary": "#ffffff",
  "text-link": "#6366f1",
  "text-link-hover": "#4f46e5",

  // Special
  "focus-ring": "rgba(99, 102, 241, 0.4)",
  overlay: "rgba(0, 0, 0, 0.5)",
  "overlay-subtle": "rgba(0, 0, 0, 0.08)",
} as const;

const colorDark = {
  // Brand
  primary: "#818cf8",
  "primary-hover": "#6366f1",
  "primary-active": "#4f46e5",
  "primary-subtle": "#1e1b4b",
  "primary-subtle-hover": "#312e81",
  secondary: "#a78bfa",
  "secondary-hover": "#8b5cf6",
  "secondary-subtle": "#2e1065",

  // Semantic
  success: "#4ade80",
  "success-hover": "#22c55e",
  "success-subtle": "#052e16",
  warning: "#fbbf24",
  "warning-hover": "#f59e0b",
  "warning-subtle": "#431407",
  danger: "#f87171",
  "danger-hover": "#ef4444",
  "danger-subtle": "#450a0a",
  info: "#60a5fa",
  "info-hover": "#3b82f6",
  "info-subtle": "#172554",

  // Neutral scale (inverted for dark)
  "neutral-0": "#ffffff",
  "neutral-1": "#f8fafc",
  "neutral-2": "#f1f5f9",
  "neutral-3": "#e2e8f0",
  "neutral-4": "#cbd5e1",
  "neutral-5": "#94a3b8",
  "neutral-6": "#64748b",
  "neutral-7": "#475569",
  "neutral-8": "#334155",
  "neutral-9": "#1e293b",
  "neutral-10": "#0f172a",
  "neutral-11": "#020617",
  "neutral-12": "#000000",

  // Surface
  surface: "#0f172a",
  "surface-raised": "#1e293b",
  "surface-overlay": "#334155",
  "surface-sunken": "#020617",
  border: "#334155",
  "border-strong": "#475569",
  "border-focus": "#818cf8",

  // Text
  "text-primary": "#f8fafc",
  "text-secondary": "#94a3b8",
  "text-tertiary": "#64748b",
  "text-disabled": "#475569",
  "text-inverse": "#0f172a",
  "text-on-primary": "#ffffff",
  "text-link": "#818cf8",
  "text-link-hover": "#6366f1",

  // Special
  "focus-ring": "rgba(129, 140, 248, 0.4)",
  overlay: "rgba(0, 0, 0, 0.7)",
  "overlay-subtle": "rgba(0, 0, 0, 0.24)",
} as const;

const font = {
  sans: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Menlo, monospace",
} as const;

const text = {
  xs: "0.75rem",     // 12px
  sm: "0.875rem",    // 14px
  md: "1rem",        // 16px
  lg: "1.125rem",    // 18px
  xl: "1.25rem",     // 20px
  "2xl": "1.5rem",   // 24px
  "3xl": "1.875rem", // 30px
  "4xl": "2.25rem",  // 36px
} as const;

const leading = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2",
} as const;

const weight = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
} as const;

const tracking = {
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
} as const;

// 4px base grid
const space = {
  px: "1px",
  "0": "0px",
  "0.5": "0.125rem",  // 2px
  "1": "0.25rem",     // 4px
  "1.5": "0.375rem",  // 6px
  "2": "0.5rem",      // 8px
  "2.5": "0.625rem",  // 10px
  "3": "0.75rem",     // 12px
  "4": "1rem",        // 16px
  "5": "1.25rem",     // 20px
  "6": "1.5rem",      // 24px
  "7": "1.75rem",     // 28px
  "8": "2rem",        // 32px
  "10": "2.5rem",     // 40px
  "12": "3rem",       // 48px
  "14": "3.5rem",     // 56px
  "16": "4rem",       // 64px
  "20": "5rem",       // 80px
  "24": "6rem",       // 96px
  "32": "8rem",       // 128px
} as const;

const radius = {
  none: "0px",
  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  "2xl": "16px",
  "3xl": "24px",
  full: "9999px",
} as const;

const shadow = {
  none: "none",
  xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)",
} as const;

const z = {
  base: "0",
  raised: "10",
  dropdown: "100",
  sticky: "200",
  overlay: "300",
  modal: "400",
  toast: "500",
  tooltip: "600",
} as const;

const duration = {
  instant: "50ms",
  fast: "100ms",
  normal: "200ms",
  slow: "300ms",
  slower: "500ms",
} as const;

const easing = {
  default: "cubic-bezier(0.4, 0, 0.2, 1)",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
  "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
  bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
} as const;

const size = {
  "0": "0px",
  px: "1px",
  "0.5": "0.125rem",
  "1": "0.25rem",
  "2": "0.5rem",
  "3": "0.75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "8": "2rem",
  "10": "2.5rem",
  "12": "3rem",
  "14": "3.5rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem",
  "32": "8rem",
  "40": "10rem",
  "48": "12rem",
  "56": "14rem",
  "64": "16rem",
  full: "100%",
  screen: "100vw",
  min: "min-content",
  max: "max-content",
  fit: "fit-content",
} as const;

const breakpoint = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export const tokens = {
  color,
  font,
  text,
  leading,
  weight,
  tracking,
  space,
  radius,
  shadow,
  z,
  duration,
  easing,
  size,
  breakpoint,
} as const;

export const darkTokens = {
  color: colorDark,
} as const;

export type Tokens = typeof tokens;
export type DarkTokens = typeof darkTokens;
