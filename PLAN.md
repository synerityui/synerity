# Synerity — Development Plan

**Version:** 1.1  
**Date:** May 2026  
**Status:** Phases 0–3 complete · Phases 4–10 pending

---

## Overview

Synerity is a React UI component library built as a pnpm monorepo (Turborepo). The architecture is a two-layer model: `@synerity/headless` owns all logic, state, and accessibility; `@synerity/ui` applies a token-driven visual skin on top. Supporting packages cover design tokens, icons, forms, a copy-paste CLI installer, and `@synerity/memory-graph` — a zero-dependency TypeScript utility for LLM context management via in-memory knowledge graphs.

**Current state:** All phases complete. v0.1.0 ready for release.

---

## Package dependency order

Build order is strict — each layer must be complete before the next is started.

```
@synerity/tsconfig      (shared TypeScript config, no deps)
@synerity/tokens        (standalone, CSS + JS output)
@synerity/headless      (depends on: nothing publishable)
@synerity/icons         (standalone)
@synerity/forms         (depends on: @synerity/headless)
@synerity/ui            (depends on: @synerity/headless, @synerity/tokens)
@synerity/memory-graph  (standalone, zero deps — Node.js + browser)
@synerity/cli           (standalone binary)
apps/playground         (depends on: all packages)
apps/docs               (depends on: all packages)
```

---

## Phase 0 — Monorepo Bootstrap

**Goal:** Make the repo installable, buildable, and lintable before any source code is written.

### 0.1 Shared TypeScript config (`packages/tsconfig`)

Create the missing `@synerity/tsconfig` package — referenced in `ui` and `headless` devDependencies but absent.

```
packages/tsconfig/
├── package.json         name: "@synerity/tsconfig"
├── base.json            strict TS, no emit, ESNext, bundler moduleResolution
├── react.json           extends base, adds jsx: react-jsx
└── node.json            extends base, adds node types
```

`base.json` settings:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "moduleResolution": "bundler",
    "module": "ESNext",
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "skipLibCheck": true
  }
}
```

### 0.2 ESLint shared config (`packages/eslint-config`)

Single shared ESLint config consumed by all packages and apps.

Rules to enforce:
- `react-hooks/rules-of-hooks` and `exhaustive-deps`
- `@typescript-eslint/no-explicit-any`
- `@typescript-eslint/no-non-null-assertion`
- `import/no-cycle` (prevents circular deps between packages)
- `jsx-a11y` plugin — all rules at `error` level

### 0.3 Per-package scaffolding

Add to each package (`ui`, `headless`, `forms`, `icons`):

```
src/
  index.ts             barrel export
tsconfig.json          extends @synerity/tsconfig/react.json
tsup.config.ts         dual CJS+ESM, dts: true, sourcemap: true
.eslintrc.cjs          extends @synerity/eslint-config
vitest.config.ts       jsdom environment, coverage via v8
```

`tokens` uses a custom `scripts/build.js` — scaffold that separately (Phase 1).

`cli` uses `tsup.config.ts` with a single CJS entry, `shebang` banner, no dts needed.

### 0.4 Changesets initialisation

```bash
pnpm changeset init
```

Configure `.changeset/config.json`:
- `access: public`
- `baseBranch: main`
- `updateInternalDependencies: patch`

### 0.5 Root tooling

- `prettier.config.js` — consistent formatting across the repo
- `.editorconfig` — indent, line endings
- `.gitignore` — `dist/`, `node_modules/`, `coverage/`, `.turbo/`
- `vitest.workspace.ts` at root — points to all package vitest configs

### Acceptance criteria

- [ ] `pnpm install` completes with no errors
- [ ] `pnpm build` runs (produces empty `dist/` stubs — acceptable at this stage)
- [ ] `pnpm lint` runs with zero errors on empty `src/index.ts` files
- [ ] `pnpm typecheck` runs with zero errors

---

## Phase 1 — `@synerity/tokens`

**Goal:** Ship the design token system as CSS custom properties and typed JS constants. This is the visual foundation everything else builds on.

### 1.1 Token taxonomy

Define tokens in `src/tokens.ts` — a single source of truth — then generate both CSS and JS output.

**Color scale** — use a perceptual ramp (oklch or hsl), neutral + brand:

| Token | CSS var | Example |
|---|---|---|
| Primary | `--synerity-color-primary` | `#6366f1` (indigo) |
| Primary hover | `--synerity-color-primary-hover` | `#4f46e5` |
| Primary subtle | `--synerity-color-primary-subtle` | `#eef2ff` |
| Secondary | `--synerity-color-secondary` | `#8b5cf6` |
| Neutral 0–12 | `--synerity-color-neutral-{n}` | `#000` → `#fff` |
| Success | `--synerity-color-success` | `#22c55e` |
| Warning | `--synerity-color-warning` | `#f59e0b` |
| Danger | `--synerity-color-danger` | `#ef4444` |
| Info | `--synerity-color-info` | `#3b82f6` |
| Surface | `--synerity-color-surface` | `#fff` |
| Surface raised | `--synerity-color-surface-raised` | `#f8fafc` |
| Border | `--synerity-color-border` | `#e2e8f0` |
| Text primary | `--synerity-color-text-primary` | `#0f172a` |
| Text secondary | `--synerity-color-text-secondary` | `#64748b` |
| Text disabled | `--synerity-color-text-disabled` | `#94a3b8` |

**Dark mode:** All tokens redefined under `[data-theme="dark"]` selector.

**Typography:**

| Token | CSS var |
|---|---|
| Font sans | `--synerity-font-sans` |
| Font mono | `--synerity-font-mono` |
| Text xs | `--synerity-text-xs` → 0.75rem |
| Text sm | `--synerity-text-sm` → 0.875rem |
| Text md | `--synerity-text-md` → 1rem |
| Text lg | `--synerity-text-lg` → 1.125rem |
| Text xl | `--synerity-text-xl` → 1.25rem |
| Text 2xl | `--synerity-text-2xl` → 1.5rem |
| Line height tight | `--synerity-leading-tight` → 1.25 |
| Line height normal | `--synerity-leading-normal` → 1.5 |
| Font weight normal | `--synerity-weight-normal` → 400 |
| Font weight medium | `--synerity-weight-medium` → 500 |
| Font weight semibold | `--synerity-weight-semibold` → 600 |
| Font weight bold | `--synerity-weight-bold` → 700 |

**Spacing** (4px base grid, `--synerity-space-{n}`):

`0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24` → multiples of 4px

**Radius:**

| Token | Value |
|---|---|
| `--synerity-radius-none` | 0 |
| `--synerity-radius-sm` | 4px |
| `--synerity-radius-md` | 6px |
| `--synerity-radius-lg` | 8px |
| `--synerity-radius-xl` | 12px |
| `--synerity-radius-full` | 9999px |

**Shadow:**

```
--synerity-shadow-sm   0 1px 2px rgba(0,0,0,.05)
--synerity-shadow-md   0 4px 6px rgba(0,0,0,.07), 0 2px 4px rgba(0,0,0,.06)
--synerity-shadow-lg   0 10px 15px rgba(0,0,0,.1), 0 4px 6px rgba(0,0,0,.05)
--synerity-shadow-xl   0 20px 25px rgba(0,0,0,.1), 0 10px 10px rgba(0,0,0,.04)
```

**Z-index:**

```
--synerity-z-base      0
--synerity-z-raised    10
--synerity-z-dropdown  100
--synerity-z-sticky    200
--synerity-z-overlay   300
--synerity-z-modal     400
--synerity-z-toast     500
--synerity-z-tooltip   600
```

**Animation:**

```
--synerity-duration-fast    100ms
--synerity-duration-normal  200ms
--synerity-duration-slow    300ms
--synerity-easing-default   cubic-bezier(0.4, 0, 0.2, 1)
--synerity-easing-in        cubic-bezier(0.4, 0, 1, 1)
--synerity-easing-out       cubic-bezier(0, 0, 0.2, 1)
```

### 1.2 Build script (`scripts/build.js`)

Node.js script that:
1. Reads `src/tokens.ts` (imports token map)
2. Generates `dist/tokens.css` — `:root { --synerity-*: value }` + dark mode overrides
3. Generates `dist/index.js` — CommonJS export of the token map as JS object

Package exports:
- `"."` → `dist/index.js` (JS constants)
- `"./css"` → `dist/tokens.css` (drop into any project)

### 1.3 Tests

- Snapshot test: `dist/tokens.css` matches expected output
- Verify every token name follows `--synerity-*` naming convention
- Verify dark mode overrides exist for all color tokens

### Acceptance criteria

- [ ] `import '@synerity/tokens/css'` in a browser project applies all custom properties
- [ ] `import { tokens } from '@synerity/tokens'` gives typed JS access to all values
- [ ] Dark mode works by setting `data-theme="dark"` on `:root`
- [ ] No token is hardcoded anywhere in `@synerity/ui` — all values via CSS vars

---

## Phase 2 — `@synerity/headless`

**Goal:** Ship all logic, state management, keyboard navigation, and ARIA wiring as hooks. Zero CSS. Every hook is a standalone unit — no shared internal state.

### 2.1 Architecture pattern

Each primitive follows this contract:

```ts
// Input: props + optional refs
// Output: spread-ready prop bags + state accessors
function useFoo(props: UseFooProps): UseFooReturn {
  // state, effects, event handlers
  // returns { fooProps, labelProps, state }
}
```

Rules:
- Hooks never import from each other (no hook-level coupling)
- All ARIA attributes are computed, never hard-coded by the consumer
- Keyboard handlers follow [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/)
- Focus management uses `@radix-ui/react-focus-scope` or a custom `useFocusTrap`
- All hooks accept `ref` forwarding — consumers can always attach their own ref

### 2.2 Primitives to implement

#### Button — `useButton`
- Props: `disabled`, `loading`, `onClick`, `type`, `href` (for link-as-button)
- ARIA: `role="button"`, `aria-disabled`, `aria-busy` (loading state)
- Keyboard: `Enter`, `Space` activate; no activation when `disabled`
- Returns: `buttonProps` (for `<button>`) or `linkProps` (for `<a>`)

#### Input — `useInput`
- Props: `value`, `defaultValue`, `onChange`, `disabled`, `readOnly`, `invalid`, `required`, `id`
- ARIA: `aria-invalid`, `aria-required`, `aria-describedby` (links to error/hint)
- Returns: `inputProps`, `labelProps`, `errorProps`, `hintProps`, `state`

#### Textarea — `useTextarea`
- Same as `useInput` + `autoResize` (auto-grow to content height)

#### Checkbox — `useCheckbox`
- Props: `checked`, `defaultChecked`, `indeterminate`, `onChange`, `disabled`
- ARIA: `role="checkbox"`, `aria-checked` (including `"mixed"` for indeterminate)
- Keyboard: `Space` toggles

#### Radio / RadioGroup — `useRadio`, `useRadioGroup`
- `useRadioGroup` manages a roving tabindex across children
- ARIA: `role="radiogroup"`, `role="radio"`, `aria-checked`
- Keyboard: arrow keys move between options; `Space` selects

#### Switch — `useSwitch`
- Props: `checked`, `defaultChecked`, `onChange`, `disabled`
- ARIA: `role="switch"`, `aria-checked`
- Keyboard: `Space` toggles

#### Select — `useSelect`
- Props: `value`, `defaultValue`, `onChange`, `disabled`, `open`, `onOpenChange`, options list
- ARIA: `role="combobox"`, `aria-expanded`, `role="listbox"`, `role="option"`, `aria-selected`
- Keyboard: `Enter`/`Space` opens, arrows navigate, `Escape` closes, type-ahead
- Follows APG combobox pattern (not native `<select>`)

#### Combobox — `useCombobox`
- Extends `useSelect` + text input with `role="combobox"`, `aria-autocomplete`
- Supports async option loading state

#### Tabs — `useTabs`
- Props: `value`, `defaultValue`, `onChange`, `orientation`
- ARIA: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`
- Keyboard: arrow keys (horizontal/vertical per `orientation`), `Home`, `End`
- Roving tabindex

#### Accordion — `useAccordion`, `useAccordionItem`
- Props: `value`, `defaultValue`, `onChange`, `type: "single" | "multiple"`
- ARIA: `role="button"` on trigger, `aria-expanded`, `aria-controls`
- Keyboard: `Enter`/`Space` toggles, arrows navigate between items

#### Dialog / Modal — `useDialog`
- Props: `open`, `onOpenChange`, `modal` (boolean)
- ARIA: `role="dialog"`, `aria-modal`, `aria-labelledby`, `aria-describedby`
- Focus trap when open; focus returns to trigger on close
- `Escape` closes; click outside closes (configurable)
- Scroll lock when open

#### Popover — `usePopover`
- Lighter than Dialog — no focus trap, no scroll lock
- ARIA: `aria-haspopup`, `aria-expanded`, `aria-controls`
- Positioning: accepts `placement` prop, uses `@floating-ui/react` for positioning

#### Tooltip — `useTooltip`
- Props: `content`, `delay`, `placement`
- ARIA: `role="tooltip"`, `aria-describedby` on the trigger
- Opens on hover (300ms delay) + focus; closes on Escape/blur/pointer leave
- Never opens on disabled elements (accessibility requirement)

#### Menu / DropdownMenu — `useMenu`
- ARIA: `role="menu"`, `role="menuitem"`, `aria-haspopup="menu"`
- Keyboard: arrow keys navigate, `Escape` closes, `Enter`/`Space` activate items
- Type-ahead navigation

#### Toggle / ToggleGroup — `useToggle`, `useToggleGroup`
- Single press-to-toggle button state
- ToggleGroup: `type: "single" | "multiple"`, roving tabindex

#### Pagination — `usePagination`
- Computes page range with ellipsis, handles prev/next/jump-to-page
- Returns page items array for rendering

#### NumberInput — `useNumberInput`
- Extends `useInput` + increment/decrement with keyboard arrow keys
- Props: `min`, `max`, `step`, `precision`
- ARIA: `role="spinbutton"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`

#### Disclosure — `useDisclosure`
- Simple open/close state helper used internally and exposed publicly
- Returns `{ isOpen, open, close, toggle, getButtonProps, getPanelProps }`

### 2.3 Utilities

```
src/utils/
  mergeRefs.ts          merge multiple refs onto one element
  useId.ts              stable SSR-safe unique ID (wraps React.useId)
  useControllable.ts    controlled/uncontrolled pattern abstraction
  useFocusTrap.ts       trap and restore focus
  useOutsideClick.ts    fire callback on click outside a ref
  useScrollLock.ts      lock body scroll
  keyboard.ts           key name constants + event matchers
  dom.ts                isHTMLElement, getOwnerDocument helpers
  polymorphic.ts        "as" prop TypeScript utilities
```

### 2.4 Tests

Every hook gets a test file using `renderHook` from `@testing-library/react`:
- Happy path (basic usage)
- Keyboard navigation (all documented key bindings)
- ARIA attribute correctness (query by role, check aria-* values)
- Controlled vs uncontrolled behaviour
- Disabled state
- Ref forwarding

Coverage target: 90% line coverage for all hooks.

### Acceptance criteria

- [ ] All hooks listed in 2.2 implemented and exported from `src/index.ts`
- [ ] No CSS in the package — zero styling of any kind
- [ ] All hooks pass ARIA APG keyboard interaction requirements
- [ ] `pnpm test` passes with ≥90% coverage
- [ ] `pnpm typecheck` clean — no `any`, no `@ts-ignore`

---

## Phase 3 — `@synerity/ui`

**Goal:** Ship the styled component layer. Each component wraps a headless hook, applies CSS Modules, and consumes design tokens. Zero inline styles.

### 3.1 Architecture

```
src/
  components/
    Button/
      Button.tsx
      Button.module.css
      Button.types.ts
      index.ts
    Input/
      ...
  index.ts   (re-exports all components)
```

Rules:
- Components never import from each other except through the public `index.ts` barrel
- All visual values come from CSS custom properties — no hardcoded colour or spacing
- `className` prop accepted on all components for consumer overrides
- `ref` forwarded on all components
- `as` prop on interactive elements (Button renders as `<a>` when `href` is present)
- Component variants defined as CSS Module classes, not inline style maps

### 3.2 Component list

#### Inputs & Controls
| Component | Variants / Notes |
|---|---|
| `Button` | `variant`: solid, outline, ghost, link; `size`: sm, md, lg; `loading`, `disabled`, `leftIcon`, `rightIcon` |
| `Input` | `size`: sm, md, lg; `invalid`, `disabled`, `readOnly`; left/right adornment slots |
| `Textarea` | Extends Input; `autoResize` prop |
| `Checkbox` | `indeterminate` state; label slot |
| `Radio` | Always used inside `RadioGroup` |
| `RadioGroup` | Horizontal + vertical orientation |
| `Switch` | `size`: sm, md, lg; label slot |
| `Select` | Custom trigger + listbox (uses `useSelect`); `clearable` |
| `Combobox` | Text input + options list; async + sync options |
| `NumberInput` | Increment/decrement stepper buttons; `min`, `max`, `step` |
| `PinInput` | N-digit OTP input; auto-advance focus |
| `FileInput` | Drag-drop zone + file list |
| `ColorInput` | Hex input + swatch picker |
| `Slider` | Single + range; `step`, `marks` |

#### Layout
| Component | Notes |
|---|---|
| `Stack` | Flexbox column; `gap`, `align`, `justify` props |
| `Group` | Flexbox row; `gap`, `wrap`, `align` props |
| `Grid` | CSS Grid; `cols`, `gap` |
| `Divider` | Horizontal / vertical; optional label |
| `AspectRatio` | Enforce an aspect ratio on child content |
| `ScrollArea` | Custom scrollbar with cross-browser consistency |
| `Container` | Max-width wrapper with responsive padding |

#### Feedback & Display
| Component | Notes |
|---|---|
| `Alert` | `variant`: info, success, warning, error; dismissible |
| `Badge` | `variant` + `size`; dot variant |
| `Spinner` | Size + colour via tokens |
| `Progress` | Linear bar; `value`, `max`, animated |
| `Skeleton` | Shimmer loading placeholder; `width`, `height`, `radius` |
| `Avatar` | Image + initials fallback; `size`; `AvatarGroup` |
| `Tooltip` | Wraps `useTooltip`; `placement`, `delay` |
| `Kbd` | Keyboard shortcut display |
| `Code` | Inline code + pre-formatted block |

#### Overlays
| Component | Notes |
|---|---|
| `Modal` | Wraps `useDialog`; `size` variants; `closeOnOverlayClick` |
| `Drawer` | Side panels — top, right, bottom, left; `size` |
| `Popover` | Floating panel; `placement`; uses `@floating-ui/react` |
| `Menu` | Dropdown menu; `MenuItem`, `MenuDivider`, `MenuGroup` |
| `ContextMenu` | Right-click activated `Menu` |
| `Sheet` | Mobile-friendly bottom sheet with drag-to-dismiss |

#### Navigation
| Component | Notes |
|---|---|
| `Tabs` | `variant`: line, solid, pills; horizontal + vertical |
| `Breadcrumb` | With collapse on overflow |
| `Stepper` | Linear progress through steps; horizontal + vertical |
| `Pagination` | Page number buttons + prev/next; `siblings`, `boundaries` |

#### Data Display
| Component | Notes |
|---|---|
| `Table` | `thead`, `tbody`; striped, hoverable, sticky header; `TableContainer` with horizontal scroll |
| `Card` | `CardHeader`, `CardBody`, `CardFooter`; `shadow` variants |
| `Stat` | Metric display with label, value, trend badge |
| `Timeline` | Vertical ordered events list |
| `Accordion` | Multiple or single; animated expand/collapse |
| `Chip` / `Tag` | Removable; `leftIcon`; `onClick` for toggle variant |
| `Callout` | Pull-quote / aside block |

#### Typography
| Component | Notes |
|---|---|
| `Text` | Polymorphic (`as` prop); size, weight, colour variants |
| `Heading` | `h1`–`h6` mapping via `level` prop |
| `Link` | `variant`: inline, standalone; external icon option |
| `Mark` | Highlighted text |
| `Truncate` | Single-line ellipsis with `Tooltip` showing full content |

### 3.3 CSS Module conventions

```css
/* ComponentName.module.css */
.root { /* base styles — always present */ }
.solid { /* variant */ }
.outline { /* variant */ }
.sm { /* size */ }
.md { /* size */ }
.lg { /* size */ }
.loading { /* state modifier */ }
.disabled { /* state modifier — applied via class, not :disabled, to support non-button elements */ }
```

Class composition in TSX:
```tsx
import clsx from 'clsx'
import styles from './Button.module.css'

const className = clsx(
  styles.root,
  styles[variant],
  styles[size],
  loading && styles.loading,
  disabled && styles.disabled,
  props.className,   // consumer override last
)
```

### 3.4 Tests

Each component gets a test file:
- Renders without error
- Variant prop applies expected CSS class
- ARIA attributes present (role, aria-*)
- Keyboard interaction (tab, enter, space, escape)
- `ref` forwarding works
- `className` prop is applied

Use `@testing-library/react` + `@testing-library/jest-dom`.

### Acceptance criteria

- [ ] All components in 3.2 implemented and exported
- [ ] Zero inline styles — all via CSS Modules + custom properties
- [ ] All components pass axe-core accessibility audit (`jest-axe`)
- [ ] `pnpm typecheck` clean
- [ ] Storybook or playground preview working for every component

---

## Phase 4 — `@synerity/forms`

**Goal:** A form system with validation, error display, and field-level state — built on headless primitives, not a third-party form library.

### 4.1 API design

```tsx
<Form onSubmit={handleSubmit} schema={schema}>
  <Field name="email">
    <Label>Email</Label>
    <Input />
    <FieldError />
    <FieldHint>We'll never share your email.</FieldHint>
  </Field>
  <Button type="submit">Submit</Button>
</Form>
```

### 4.2 Components and hooks

| Export | Description |
|---|---|
| `<Form>` | Context provider; handles submit, tracks form state |
| `<Field>` | Groups label + control + error + hint; wires ARIA `for`/`id`/`aria-describedby` |
| `<Label>` | Forwards to `headless` label props; auto-links to field control |
| `<FieldError>` | Renders validation error for the parent Field |
| `<FieldHint>` | Renders helper text; suppressed when error is shown |
| `useField(name)` | Access field state (value, error, touched, dirty) from anywhere inside `<Form>` |
| `useFormState()` | Access form-level state (isSubmitting, isValid, isDirty) |

### 4.3 Validation

- Schema via `zod` (peer dependency — do not bundle Zod)
- Validate on submit by default; opt-in `validateOn: "change" | "blur" | "submit"`
- `resolver` prop on `<Form>` for custom validation (compatible with `yup`, `valibot`)
- Field-level async validation supported via `validate` prop

### 4.4 Features

- Controlled and uncontrolled fields
- `defaultValues` prop on `<Form>`
- `reset()`, `setValue()`, `setError()` exposed via `useFormState()`
- Nested field paths: `name="address.street"` supported
- Array fields: `name="tags[0]"` supported
- Dirty/touched tracking per field
- Form-level and field-level error boundaries

### Acceptance criteria

- [ ] Happy path form submit works with Zod schema
- [ ] Errors display correctly on submit and on change (when configured)
- [ ] ARIA: `aria-invalid` on inputs with errors, `aria-describedby` links errors
- [ ] `reset()` clears all field state
- [ ] Works with all `@synerity/ui` input components without extra wiring

---

## Phase 5 — `@synerity/icons`

**Goal:** A tree-shakeable SVG icon set as React components. Every icon is a separate named export.

### 5.1 Icon set scope (v1.0)

~120 icons covering common UI needs:

**Navigation:** `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`, `ChevronLeft`, `ChevronRight`, `ChevronUp`, `ChevronDown`, `ExternalLink`, `Home`, `Menu`, `X`, `MoreHorizontal`, `MoreVertical`

**Actions:** `Copy`, `Cut`, `Paste`, `Download`, `Upload`, `Share`, `Edit`, `Trash`, `Plus`, `Minus`, `Search`, `Filter`, `Sort`, `Refresh`, `Settings`, `Sliders`

**Status:** `Check`, `CheckCircle`, `AlertCircle`, `AlertTriangle`, `Info`, `XCircle`, `Clock`, `Loader`

**Media:** `Play`, `Pause`, `Stop`, `VolumeX`, `Volume2`, `Maximize`, `Minimize`

**Files & Data:** `File`, `FileText`, `Folder`, `FolderOpen`, `Image`, `Code`, `Database`, `Table`

**Communication:** `Mail`, `Bell`, `BellOff`, `MessageSquare`, `Phone`

**User:** `User`, `Users`, `LogIn`, `LogOut`, `Lock`, `Unlock`, `Shield`, `Key`

**Misc:** `Star`, `Heart`, `Bookmark`, `Tag`, `Globe`, `Map`, `Calendar`, `Sun`, `Moon`

### 5.2 Implementation

- Source: SVG files in `src/svg/`
- Build: SVGR + custom template to produce typed React components
- Each icon: `(props: React.SVGProps<SVGSVGElement>) => JSX.Element`
- All icons include `aria-hidden="true"` by default (decorative); consumers add `aria-label` for meaningful icons
- `currentColor` for fill/stroke — inherits text colour

Build pipeline:
```
src/svg/*.svg
  → SVGR (template: src/template.ts)
  → src/icons/*.tsx (generated, gitignored)
  → tsup bundles into dist/index.mjs (ESM, tree-shakeable)
```

### 5.3 Usage

```tsx
import { Check, AlertCircle } from '@synerity/icons'

<Check size={16} />
<AlertCircle size={20} aria-label="Error" aria-hidden={false} />
```

`size` prop maps to both `width` and `height`.

### Acceptance criteria

- [ ] All icons render without errors
- [ ] Tree-shaking works — importing one icon doesn't include others
- [ ] `aria-hidden="true"` default; overridable via prop
- [ ] Icons scale correctly with `size` prop
- [ ] Icon list browsable in playground

---

## Phase 6 — `@synerity/cli`

**Goal:** `npx synerity add <component>` copies component source files directly into the user's project (shadcn/ui style).

### 6.1 Commands

```bash
npx synerity add button               # add a single component
npx synerity add button modal input   # add multiple
npx synerity add --all                # add all components
npx synerity list                     # list available components
npx synerity init                     # scaffold synerity.config.json
```

### 6.2 Component registry

A JSON registry (`registry.json`) maps component names to file paths and dependencies:

```json
{
  "button": {
    "files": ["components/Button/Button.tsx", "components/Button/Button.module.css"],
    "dependencies": ["@synerity/headless"],
    "devDependencies": ["clsx"]
  }
}
```

Registry is embedded in the CLI at build time — no network request needed.

### 6.3 `synerity init`

Creates `synerity.config.json` at the project root:

```json
{
  "outputDir": "src/components/ui",
  "typescript": true,
  "cssModules": true
}
```

### 6.4 `synerity add` flow

1. Read `synerity.config.json` (prompt to run `init` if absent)
2. Resolve component + transitive component dependencies
3. Check if files already exist → prompt to overwrite
4. Copy files to `outputDir`
5. Print diff of added/updated files
6. Print `npm install` command for required npm dependencies

### 6.5 Implementation

- Runtime: Node.js 18+, no external runtime dependencies (only CLI framework and fs utilities)
- Framework: `commander` for argument parsing
- Prompts: `@clack/prompts` for interactive UI
- File I/O: `fs-extra`
- Output: coloured console via `picocolors`

### Acceptance criteria

- [ ] `npx synerity --help` prints usage
- [ ] `npx synerity list` prints all available components
- [ ] `npx synerity add button` copies correct files to configured output dir
- [ ] Conflicts prompt before overwriting
- [ ] Works on macOS, Linux, and Windows

---

## Phase 7 — `@synerity/memory-graph`

**Goal:** A zero-dependency TypeScript utility for building and querying in-memory knowledge graphs optimised for LLM context management. The core problem it solves: as conversations or agent sessions grow, passing the entire history wastes tokens and often exceeds context limits. `@synerity/memory-graph` stores facts, observations, and relationships as a typed graph, then retrieves only the most relevant subset for a given query — dramatically reducing token consumption without a vector database.

No React dependency. Works in Node.js 18+ and modern browsers. Fully tree-shakeable.

### 7.1 Core concepts

| Concept | Description |
|---|---|
| `MemoryNode` | A single piece of information: text content + metadata (tags, importance score, source, timestamps) |
| `MemoryEdge` | A typed, weighted directional relationship between two nodes |
| `MemoryGraph` | The container — manages nodes, edges, queries, and context export |
| `EdgeType` | Semantic relationship label: `relates_to`, `contradicts`, `depends_on`, `follows`, `part_of`, `causes`, or any custom string |

### 7.2 Public API

```ts
// ── Construction ──────────────────────────────────────────────
const graph = new MemoryGraph(options?: MemoryGraphOptions)

// ── Node CRUD ─────────────────────────────────────────────────
graph.add(content: string, meta?: NodeMeta) → MemoryNode
graph.update(id: string, patch: Partial<NodeMeta>) → MemoryNode
graph.remove(id: string) → void
graph.get(id: string) → MemoryNode | undefined
graph.nodes() → MemoryNode[]

// ── Edge operations ───────────────────────────────────────────
graph.relate(fromId: string, toId: string, type: EdgeType, weight?: number) → MemoryEdge
graph.unrelate(fromId: string, toId: string, type?: EdgeType) → void
graph.edges(nodeId?: string) → MemoryEdge[]
graph.neighbors(nodeId: string, depth?: number) → MemoryNode[]

// ── Query & retrieval ─────────────────────────────────────────
graph.query(prompt: string, options?: QueryOptions) → MemoryNode[]
graph.recent(n: number) → MemoryNode[]
graph.byTag(tags: string[]) → MemoryNode[]
graph.byImportance(minScore: number) → MemoryNode[]

// ── Context generation (core value prop) ─────────────────────
graph.toContext(options?: ContextOptions) → string
// options: { maxTokens?, prompt?, format?: 'markdown'|'json'|'plain', separator? }

// ── Token utilities ───────────────────────────────────────────
graph.estimateTokens(text?: string) → number   // estimates for given text or whole graph
graph.totalTokens() → number
graph.setTokenizer(fn: (text: string) => number) → void  // plug in tiktoken / gpt-tokenizer

// ── Persistence ───────────────────────────────────────────────
graph.serialize() → string                     // JSON
MemoryGraph.deserialize(json: string) → MemoryGraph

// ── Pruning / eviction ────────────────────────────────────────
graph.prune(options: PruneOptions) → { removed: number }
// options: { maxNodes?, maxAge? (ms), minImportance?, strategy?: 'lru'|'fifo'|'importance' }
```

### 7.3 Type definitions

```ts
type NodeMeta = {
  tags?: string[]
  importance?: number       // 0–1, default 0.5
  source?: string           // who/what produced this node
  createdAt?: number        // unix ms, auto-set if omitted
  expiresAt?: number        // optional TTL — node auto-pruned after this timestamp
}

type EdgeType =
  | 'relates_to'
  | 'contradicts'
  | 'depends_on'
  | 'follows'
  | 'part_of'
  | 'causes'
  | string                  // custom types — any string is valid

type QueryOptions = {
  limit?: number            // max results, default 10
  minImportance?: number
  tags?: string[]
  includeNeighbors?: boolean
  neighborDepth?: number
}

type ContextOptions = {
  maxTokens?: number        // hard cap on output token estimate
  prompt?: string           // focus retrieval around this query
  format?: 'markdown' | 'json' | 'plain'
  separator?: string
  includeMetadata?: boolean
}

type MemoryGraphOptions = {
  maxNodes?: number         // auto-prune oldest when exceeded
  defaultImportance?: number
  tokenizer?: (text: string) => number
}
```

### 7.4 Token counting strategy

- **Default estimator:** `Math.ceil(text.length / 4)` — crude but zero-dependency
- **Override:** `graph.setTokenizer(gptTokenizer.encode)` — plug in any tokenizer at runtime
- The library never bundles a tokenizer itself — consumer chooses

### 7.5 Context generation algorithm

`graph.toContext(options)` runs this pipeline:

1. If `prompt` is provided, score each node by keyword overlap against the prompt
2. Apply `minImportance`, `tags`, and recency filters
3. Sort by combined score (relevance × importance × recency decay)
4. Walk edges: pull in strongly-connected neighbors of top-ranked nodes
5. Pack nodes into the output in score order, stopping when `maxTokens` is reached
6. Format output as `markdown` (default), `json`, or `plain`

### 7.6 Use cases

```ts
// ── Chatbot session memory ────────────────────────────────────
const memory = new MemoryGraph({ maxNodes: 200 })

memory.add("User prefers dark mode", { tags: ["preference"], importance: 0.9 })
memory.add("User asked about billing on 2026-05-01", { tags: ["billing"] })
memory.add("Subscription plan: Pro, renews 2026-06-01", { tags: ["billing"], importance: 1.0 })

const context = memory.toContext({
  prompt: "user asking about invoice",
  maxTokens: 400,
  format: "markdown",
})
// → Injects only the billing-related nodes, respecting the token budget

// ── Agent workspace ───────────────────────────────────────────
const workspace = new MemoryGraph()

const taskNode  = workspace.add("Task: refactor auth module", { importance: 1.0 })
const obsNode   = workspace.add("Found: JWT secret hardcoded in config.ts line 42")
const decNode   = workspace.add("Decision: move secret to env variable")

workspace.relate(taskNode.id, obsNode.id, 'depends_on')
workspace.relate(obsNode.id, decNode.id, 'causes')

// Serialize for persistence between agent turns
localStorage.setItem('agent-workspace', workspace.serialize())
```

### 7.7 Package structure

```
packages/memory-graph/
  src/
    MemoryGraph.ts       core class
    MemoryNode.ts        node type + factory
    MemoryEdge.ts        edge type + factory
    retrieval.ts         scoring, ranking, keyword matching
    context.ts           toContext() pipeline
    tokenizer.ts         default estimator + setTokenizer()
    prune.ts             eviction strategies
    index.ts             barrel export
  src/__tests__/
    MemoryGraph.test.ts
    retrieval.test.ts
    context.test.ts
    prune.test.ts
  tsconfig.json          extends @synerity/tsconfig/base.json (no JSX)
  tsup.config.ts         dual CJS+ESM, dts: true
  vitest.config.ts       node environment
  package.json
```

### 7.8 Tests

- `MemoryGraph.test.ts` — CRUD operations, edge operations, neighbors, serialization/deserialization
- `retrieval.test.ts` — query scoring, tag filtering, importance filtering, recency ordering
- `context.test.ts` — token budget enforcement, format output correctness, neighbor inclusion
- `prune.test.ts` — all three eviction strategies (`lru`, `fifo`, `importance`), TTL expiry, `maxNodes` auto-prune

Coverage target: 90%+

### Acceptance criteria

- [ ] `new MemoryGraph()` works in Node.js 18+ and browser without polyfills
- [ ] `graph.toContext({ maxTokens: 500 })` never exceeds the budget (by default estimator)
- [ ] `graph.serialize()` / `MemoryGraph.deserialize()` round-trip is lossless
- [ ] All three prune strategies produce expected node counts
- [ ] Zero runtime dependencies in `package.json`
- [ ] `pnpm typecheck` clean — strict TypeScript, no `any`
- [ ] `pnpm test` passes with ≥90% coverage

---

## Phase 8 — `apps/playground`

**Goal:** A live, interactive sandbox where every component can be viewed, configured, and tested. Used during development and shipped as the public component gallery.

### 8.1 Tech stack

- Vite + React 18
- `@synerity/ui` (workspace dep)
- `@synerity/icons` (workspace dep)
- `@synerity/forms` (workspace dep)
- `@synerity/tokens/css` imported globally

### 8.2 Structure

```
apps/playground/
  src/
    pages/
      index.tsx              component grid overview
      components/[slug].tsx  per-component demo page
    demos/
      Button.demo.tsx
      Input.demo.tsx
      ...
    layout/
      Sidebar.tsx            component nav
      Header.tsx             theme toggle, links
    App.tsx
    main.tsx
    global.css
```

### 8.3 Per-component demo page

Each demo page shows:
- Live rendered component with all variants
- Props control panel (auto-generated from TypeScript types)
- Copy-paste code snippet
- Keyboard interaction guide
- Accessibility notes (ARIA roles used)

### Acceptance criteria

- [ ] All components from Phase 3 have a demo page
- [ ] Dark/light mode toggle works
- [ ] Props panel lets users change variant/size/state live
- [ ] Accessible: keyboard navigable, no axe violations

---

## Phase 9 — `apps/docs`

**Goal:** The public documentation site for synerity.dev.

### 9.1 Tech stack

- Next.js 14 App Router (RSC-compatible — proves Synerity's own RSC claim)
- MDX for component docs
- `@synerity/ui` (workspace dep)
- `@synerity/tokens/css` imported in root layout

### 9.2 Pages

```
/                        Landing page — tagline, feature matrix, quick start
/docs/getting-started    Installation, quick start code, FAQ
/docs/tokens             Token reference with live swatches
/docs/headless           Headless API reference (auto-generated from TSDoc)
/docs/components/[slug]  Per-component page (props table + live demo embed)
/docs/forms              Forms package guide
/docs/icons              Icon search + browser
/docs/cli                CLI reference
/docs/memory-graph       MemoryGraph API reference + token-saving examples
/docs/theming            Token override guide with live preview
/docs/accessibility      WCAG coverage claim + testing methodology
/blog                    Release announcements
```

### 9.3 Component doc page structure

Each `/docs/components/[slug]` page includes:
1. Description + when to use
2. Live interactive demo (iframe to playground)
3. Variants gallery (static renders of each variant)
4. Props table (auto-generated from TypeScript types via `react-docgen-typescript`)
5. Accessibility section: ARIA roles, keyboard shortcuts, screen reader notes
6. Code examples (copy button on each block)
7. Related components links

### Acceptance criteria

- [ ] All components documented
- [ ] Docs site builds as a Next.js static export (can deploy to Vercel/Netlify)
- [ ] Lighthouse score: Performance ≥90, Accessibility 100
- [ ] Zero axe violations on any page

---

## Phase 10 — Quality, Accessibility & Release

### 10.1 Accessibility audit

Before any v1.0 release candidate:
- Run `jest-axe` on every component in both light and dark mode
- Manual keyboard-only navigation test for all interactive components
- Screen reader testing: VoiceOver (macOS), NVDA (Windows)
- Target: WCAG 2.1 AA compliance — all success criteria met, none just claimed

### 10.2 Bundle size audit

- Use `size-limit` to enforce per-package budgets
- Target: `@synerity/headless` < 12kB gzip, `@synerity/ui` < 40kB gzip (excluding icons)
- Individual component tree-shaking: importing `Button` alone costs < 3kB gzip

### 10.3 RSC compatibility verification

- Confirm every `@synerity/ui` component can render server-side without `use client`
- CSS Modules are inlined by Next.js — verify no `useLayoutEffect` or other browser-only APIs in render paths
- Write a Next.js App Router test app that imports and renders each component in a Server Component

### 10.4 Browser compatibility

Target: last 2 versions of Chrome, Firefox, Safari, Edge. No IE.

Test matrix:
- Chrome/Chromium latest
- Firefox latest
- Safari 16+
- Edge latest
- iOS Safari 16+
- Chrome Android latest

### 10.5 Release checklist

- [ ] All packages at consistent version (Changesets coordinates this)
- [ ] `CHANGELOG.md` generated by Changesets for each package
- [ ] `README.md` in each package with install + basic usage example
- [ ] `LICENSE` file (MIT) in each package
- [ ] npm provenance enabled (`--provenance` flag on publish)
- [ ] GitHub release created with changelog notes
- [ ] `synerity.dev` docs site deployed
- [ ] Playground deployed (e.g. `play.synerity.dev`)
- [ ] Tweet/announcement drafted

---

## Implementation order summary

| Phase | Package / App | Depends on | Status | Estimated effort |
|---|---|---|---|---|
| 0 | Monorepo bootstrap | — | ✅ Done | 1–2 days |
| 1 | `@synerity/tokens` | Phase 0 | ✅ Done | 1–2 days |
| 2 | `@synerity/headless` | Phase 0 | ✅ Done | 2–3 weeks |
| 3 | `@synerity/ui` | Phases 1, 2 | ✅ Done | 3–4 weeks |
| 4 | `@synerity/forms` | Phase 2 | ✅ Done | 1 week |
| 5 | `@synerity/icons` | Phase 0 | ✅ Done | 3–5 days |
| 6 | `@synerity/cli` | Phases 3, 5 | ✅ Done | 1 week |
| 7 | `@synerity/memory-graph` | Phase 0 (standalone) | ✅ Done | 1–2 weeks |
| 8 | `apps/playground` | Phases 3, 4, 5, 7 | ✅ Done | 1 week |
| 9 | `apps/docs` | All packages | ✅ Done | 2–3 weeks |
| 10 | Quality & release | All | ✅ Done | 1–2 weeks |

**Total estimated: 14–18 weeks for v1.0** (2 weeks added for memory-graph)

- Phases 4, 5, and 7 are all independent of each other and can run in parallel.
- Phase 6 (CLI) can start once Phase 3 reaches ~50% of its component list.
- Phase 7 (`memory-graph`) has no UI dependencies — it can be worked on at any point after Phase 0.

---

## What is explicitly out of scope for v1.0

- `@synerity/charts` — mentioned in the old brand doc, deferred to v1.1
- Date/time picker — complex, high-risk for accessibility, post-v1.0
- Data grid — post-v1.0 (Mantine's own weakness — worth getting right)
- Native mobile (React Native) — separate future effort
- Figma design kit — post-v1.0
- i18n/RTL support — architecture decision deferred (tokens are RTL-safe; component RTL needs explicit work)
- `@synerity/memory-graph` vector/embedding support — v1.0 uses keyword matching only; semantic search via embeddings is a v1.1 addition
- `@synerity/memory-graph` persistence adapters (Redis, SQLite, IndexedDB) — v1.0 is in-memory + JSON serialization only
