# Synerity

**Headless by design. Beautiful by default.**

Synerity is a React UI library that doesn't make you choose between zero-runtime CSS, RSC compatibility, WCAG-verified accessibility, strict TypeScript, painless re-skinning, stable APIs, and both npm and copy-paste distribution.

That combination doesn't exist in any single library today. That's the gap Synerity fills.

---

## Packages

| Package | Description | Version |
|---|---|---|
| [`@synerity/ui`](./packages/ui) | Styled components with the default design system | [![npm](https://img.shields.io/npm/v/@synerity/ui)](https://www.npmjs.com/package/@synerity/ui) |
| [`@synerity/headless`](./packages/headless) | Logic + accessibility primitives, zero CSS | [![npm](https://img.shields.io/npm/v/@synerity/headless)](https://www.npmjs.com/package/@synerity/headless) |
| [`@synerity/tokens`](./packages/tokens) | Design tokens and CSS custom properties | [![npm](https://img.shields.io/npm/v/@synerity/tokens)](https://www.npmjs.com/package/@synerity/tokens) |
| [`@synerity/icons`](./packages/icons) | Fully tree-shakeable icon set | [![npm](https://img.shields.io/npm/v/@synerity/icons)](https://www.npmjs.com/package/@synerity/icons) |
| [`@synerity/forms`](./packages/forms) | Form primitives with built-in validation | [![npm](https://img.shields.io/npm/v/@synerity/forms)](https://www.npmjs.com/package/@synerity/forms) |
| [`@synerity/cli`](./packages/cli) | Copy-paste component installer | [![npm](https://img.shields.io/npm/v/@synerity/cli)](https://www.npmjs.com/package/@synerity/cli) |

---

## Quick start

### Option 1 — Full styled library

```bash
npm install @synerity/ui
```

```tsx
import { Button, Modal, Input } from '@synerity/ui'
import '@synerity/tokens/css'

export default function App() {
  return <Button variant="primary">Get started</Button>
}
```

### Option 2 — Headless only (bring your own styles)

```bash
npm install @synerity/headless
```

```tsx
import { useButton, useModal } from '@synerity/headless'

function MyButton(props) {
  const { buttonProps } = useButton(props)
  return <button {...buttonProps} className="your-styles" />
}
```

### Option 3 — Copy-paste (shadcn-style)

```bash
npx synerity add button modal table input
```

Components are copied directly into your project — you own the code, no `npm update` required.

---

## Why Synerity?

The React UI library market in 2026 is mature but uncomfortable. Every library forces a structural compromise:

- **MUI** — great breadth, but Emotion runtime + painful major migrations + not RSC-friendly
- **Mantine** — best all-rounder, but third-party data grid and limited copy-paste story
- **shadcn/ui** — maximum control, but you own every bug fix
- **Radix** — excellent a11y and composition, but no styling, no dates, no tables

Synerity is the first library that ships all of the following without compromise:

| Capability | Synerity |
|---|---|
| Zero-runtime CSS | ✓ CSS Modules, no Emotion |
| RSC / Server Components | ✓ no `use client` for styling |
| WCAG 2.1 AA accessibility | ✓ verified, not just claimed |
| Strict TypeScript | ✓ no `any`, full inference |
| Design token theming | ✓ CSS custom properties |
| Stable APIs + codemods | ✓ no painful major migrations |
| npm + copy-paste distribution | ✓ both, your choice |

---

## Architecture

Synerity ships two independent layers:

```
@synerity/headless     →   logic, state, a11y, keyboard nav (zero CSS)
       ↓
@synerity/ui           →   token-driven default skin on top of headless
```

You can use either layer standalone. Teams wanting full control use `@synerity/headless` and style it themselves. Teams wanting to ship fast use `@synerity/ui` and override tokens.

---

## Design tokens

All visual decisions live in CSS custom properties. Override any token to re-skin the entire library:

```css
:root {
  --synerity-color-primary: #6366f1;
  --synerity-color-primary-hover: #4f46e5;
  --synerity-radius-md: 8px;
  --synerity-font-sans: 'Inter', system-ui, sans-serif;
}
```

No JS theming. No runtime cost. Works in RSC.

---

## Contributing

This is a pnpm monorepo powered by Turborepo.

```bash
# Clone the repo
git clone https://github.com/synerityui/synerity.git
cd synerity

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start dev mode (watches all packages)
pnpm dev

# Run tests
pnpm test
```

See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

---

## License

MIT © [Synerity Labs](https://github.com/synerityui)
