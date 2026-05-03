# @synerity/tokens

Design tokens for the Synerity UI system — CSS custom properties for color, typography, spacing, radius, shadow, and motion. The single source of visual truth consumed by `@synerity/ui`.

## Installation

```bash
npm install @synerity/tokens
```

## Usage

```ts
// Drop into any project as a CSS stylesheet
import '@synerity/tokens/css'

// Or import typed JS constants
import { tokens } from '@synerity/tokens'
console.log(tokens.color.primary) // → oklch(...)
```

## Token namespaces

All tokens use the `--synerity-*` prefix:

```css
/* Color */
--synerity-color-primary
--synerity-color-primary-hover
--synerity-color-primary-subtle
--synerity-color-surface
--synerity-color-border
--synerity-color-text-primary
--synerity-color-text-secondary
--synerity-color-success / -warning / -danger / -info

/* Typography */
--synerity-font-sans
--synerity-font-mono

/* Spacing (4px base grid) */
--synerity-space-1 through --synerity-space-24

/* Radius */
--synerity-radius-sm / -md / -lg / -xl / -full

/* Shadow */
--synerity-shadow-sm / -md / -lg / -xl

/* Motion */
--synerity-duration-fast / -normal / -slow
--synerity-easing-default / -in / -out
```

## Dark mode

All color tokens redefine under `[data-theme="dark"]`. Set that attribute on `<html>` to switch:

```js
document.documentElement.setAttribute('data-theme', 'dark')
```

## License

MIT © [Synerity Labs](https://github.com/synerityui)
