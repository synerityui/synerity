# @synerity/icons

75 outline SVG icons as tree-shakeable React components. 1.6 stroke weight, 24×24 viewbox, `currentColor` everywhere.

## Installation

```bash
npm install @synerity/icons
```

## Usage

```tsx
import { Download, Check, AlertCircle, Search } from '@synerity/icons'

// Inherits text color — use anywhere
<Download size={20} />

// Accessible icon (meaningful, not decorative)
<AlertCircle size={20} aria-label="Error" aria-hidden={false} />

// Inside a button
<button>
  <Download size={16} />
  Download report
</button>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `number` | `20` | Sets both `width` and `height` |
| `aria-hidden` | `boolean` | `true` | Set to `false` for meaningful icons |
| `aria-label` | `string` | — | Required when `aria-hidden={false}` |

All other `SVGProps` are forwarded to the `<svg>` element.

## Categories

**Navigation** · ArrowLeft/Right/Up/Down · ChevronLeft/Right/Up/Down · Home · Menu · X · ExternalLink · MoreHorizontal/Vertical

**Actions** · Plus · Minus · Search · Edit · Trash · Copy · Download · Upload · Share · Filter · Sort · Refresh · Settings · Sliders

**Status** · Check · CheckCircle · AlertCircle · AlertTriangle · Info · XCircle · Clock · Loader

**Media** · Play · Pause · Stop · VolumeX · Volume2 · Maximize · Minimize

**Files** · File · FileText · Folder · FolderOpen · Image · Code · Database · Table

**Communication** · Mail · Bell · BellOff · MessageSquare · Phone

**User** · User · Users · LogIn · LogOut · Lock · Unlock · Shield · Key

**Misc** · Star · Heart · Bookmark · Tag · Globe · Map · Calendar · Sun · Moon

## License

MIT © [Synerity Labs](https://github.com/synerityui)
