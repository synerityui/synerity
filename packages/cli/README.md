# @synerity/cli

A shadcn-style copy-paste installer for Synerity components. Run `npx synerity add button` and the component source lands directly in your project — you own it, no `npm update` required.

## Usage

No installation needed — use `npx`:

```bash
# Initialise config (run once per project)
npx synerity init

# Add a single component
npx synerity add button

# Add multiple components
npx synerity add button modal input table badge

# Add everything
npx synerity add --all

# List available components
npx synerity list
```

## Configuration

`npx synerity init` creates `synerity.config.json` at the project root:

```json
{
  "outputDir": "src/components/ui",
  "typescript": true,
  "cssModules": true
}
```

| Field | Default | Description |
|---|---|---|
| `outputDir` | `src/components/ui` | Where component files are copied |
| `typescript` | `true` | Output `.tsx` files (false → `.jsx`) |
| `cssModules` | `true` | Include `.module.css` files |

## How it works

1. Reads `synerity.config.json` (prompts to run `init` if missing)
2. Resolves the component and any transitive component dependencies
3. Checks for file conflicts — prompts before overwriting
4. Copies TSX + CSS Module files to `outputDir`
5. Prints the `npm install` command for required peer dependencies

## Requirements

- Node.js 18+
- macOS, Linux, or Windows

## License

MIT © [Synerity Labs](https://github.com/synerityui)
