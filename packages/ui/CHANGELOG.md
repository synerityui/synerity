# @synerity/ui

## 0.2.0

### Minor Changes

- Add 27 components completing the v1.0 component set.

  **Inputs & Controls:** Radio, RadioGroup, Select, Combobox, NumberInput, Slider, PinInput

  **Feedback & Display:** Progress, Skeleton, Chip, Callout, Stat

  **Layout:** Grid, Divider, Container, AspectRatio, ScrollArea

  **Typography:** Link, Mark, Truncate

  **Overlays:** Popover, Drawer, Menu, MenuItem, MenuDivider, MenuGroup

  **Navigation:** Pagination, Breadcrumb, Stepper

  **Data Display:** Table (+ Thead/Tbody/Tr/Th/Td/TableContainer), Timeline

## 0.1.2

### Patch Changes

- Fix CSS class names not applied when installed from npm.

  Root cause: esbuild's `local-css` / `injectStyle` loaders produce empty class name objects (`{}`). The pre-build script now runs `postcss-modules` on every `*.module.css` file to generate a `*.module.css.js` sidecar with scoped class names and inline CSS injection. tsup's `onResolve` plugin redirects the component imports to these sidecars. Result: all component styles are injected at runtime with properly scoped, non-conflicting class names.

## 0.1.1

### Patch Changes

- Fix CSS not applying when installed from npm.

  Switched from esbuild `local-css` loader (which generated empty class name objects) to `injectStyle: true`, which bundles all component styles into the JS bundle and injects them via a style tag at runtime. Also added `css-modules.d.ts` for correct TypeScript types on CSS Module namespace imports.

## 0.1.0

### Minor Changes

- 133b859: Initial release of all Synerity packages (v0.1.0).

  ### @synerity/ui

  18 accessible, token-driven React components: Button, Input, Textarea, Checkbox, Switch, Badge, Alert, Spinner, Avatar, AvatarGroup, Card, Stack, Group, Text, Heading, Modal, Tooltip, Tabs, Accordion.

  ### @synerity/headless

  ARIA-compliant logic hooks: useButton, useInput, useTextarea, useCheckbox, useSwitch, useTabs, useAccordion, useDialog, usePopover, useTooltip, useDisclosure, and shared utilities (mergeRefs, useId, useControllable, useFocusTrap, useScrollLock).

  ### @synerity/tokens

  CSS custom property design system — oklch color ramps, 4px spacing grid, semantic radius/shadow/motion tokens, light + dark mode.

  ### @synerity/icons

  75 outline SVG icons as tree-shakeable React components.

  ### @synerity/forms

  Headless form engine with Zod resolver, field-level state, controlled/uncontrolled support, dirty/touched tracking.

  ### @synerity/memory-graph

  Zero-dependency LLM context graph — typed edges, token-budget retrieval, serialize/deserialize, three pruning strategies.

  ### @synerity/cli

  shadcn-style copy-paste installer: `npx synerity add <component>`.

### Patch Changes

- Updated dependencies [133b859]
  - @synerity/headless@0.1.0
  - @synerity/tokens@0.1.0
