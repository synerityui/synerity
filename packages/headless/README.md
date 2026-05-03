# @synerity/headless

ARIA-compliant React hooks for building accessible UI components. Zero CSS, zero DOM opinions — pure logic and keyboard navigation following the [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/).

## Installation

```bash
npm install @synerity/headless
```

## Usage

```tsx
import { useButton, useTabs, useDialog } from '@synerity/headless'

function MyButton({ children, onClick, disabled }) {
  const { buttonProps } = useButton({ onClick, disabled })
  return (
    <button {...buttonProps} className="your-styles">
      {children}
    </button>
  )
}
```

## Hooks

| Hook | Description |
|---|---|
| `useButton` | Click, keyboard activation, aria-disabled, aria-busy |
| `useInput` | Controlled/uncontrolled value, aria-invalid, aria-describedby |
| `useTextarea` | Extends useInput + autoResize |
| `useCheckbox` | Checked, indeterminate, aria-checked="mixed" |
| `useSwitch` | role="switch", aria-checked |
| `useTabs` | Roving tabindex, arrow key nav, aria-selected |
| `useAccordion` / `useAccordionItem` | Expand/collapse, arrow key nav |
| `useDialog` | Focus trap, scroll lock, Escape to close |
| `usePopover` | Floating panel, no focus trap |
| `useTooltip` | Hover/focus delay, role="tooltip" |
| `useDisclosure` | Simple open/close state helper |

## Utilities

```ts
import { mergeRefs, useId, useControllable, useFocusTrap } from '@synerity/headless'
```

## License

MIT © [Synerity Labs](https://github.com/synerityui)
