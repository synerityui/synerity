# @synerity/ui

Polished, accessible React components with a token-driven default skin. Built on `@synerity/headless` for logic and `@synerity/tokens` for design values. Zero runtime CSS-in-JS.

## Installation

```bash
npm install @synerity/ui
```

## Usage

```tsx
// 1. Import the token stylesheet once at your app root
import '@synerity/tokens/css'

// 2. Use components
import { Button, Input, Modal, Badge } from '@synerity/ui'

export default function App() {
  return (
    <Button variant="solid" size="md">
      Get started
    </Button>
  )
}
```

## Components

| Component | Category |
|---|---|
| `Button` | Inputs & Controls |
| `Input`, `Textarea` | Inputs & Controls |
| `Checkbox`, `Switch` | Inputs & Controls |
| `Badge`, `Alert`, `Spinner` | Feedback & Display |
| `Avatar`, `AvatarGroup` | Feedback & Display |
| `Card`, `CardHeader`, `CardBody`, `CardFooter` | Feedback & Display |
| `Stack`, `Group` | Layout |
| `Text`, `Heading` | Typography |
| `Modal` | Overlays |
| `Tooltip` | Overlays |
| `Tabs`, `Accordion` | Navigation |

## Theming

Override any `--synerity-*` CSS custom property to re-skin the entire library:

```css
:root {
  --synerity-color-primary: #6366f1;
  --synerity-radius-md: 8px;
  --synerity-font-sans: 'Outfit', system-ui, sans-serif;
}
```

Dark mode is driven by `[data-theme="dark"]` on the root element.

## License

MIT © [Synerity Labs](https://github.com/synerityui)
