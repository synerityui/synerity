# Synerity — Architecture

## Overview

Synerity is a pnpm monorepo powered by Turborepo. All packages live under `/packages`, all applications under `/apps`.

## Two-layer model

```
┌─────────────────────────────────────────────┐
│               @synerity/ui                  │
│   Token-driven styled components            │
│   CSS Modules — zero runtime cost           │
└─────────────────┬───────────────────────────┘
                  │ builds on top of
┌─────────────────▼───────────────────────────┐
│            @synerity/headless               │
│   Logic, state, keyboard nav, ARIA          │
│   Zero CSS — bring your own styles          │
└─────────────────────────────────────────────┘
```

Teams use either layer independently:
- `@synerity/headless` alone for full styling control
- `@synerity/ui` for the full styled system out of the box
- `npx synerity add` to copy components directly into your project

## Package dependency graph

```
@synerity/ui
  └── @synerity/headless
  └── @synerity/tokens

@synerity/forms
  └── @synerity/headless

@synerity/icons      (standalone)
@synerity/cli        (standalone)
@synerity/tokens     (standalone)
```

## Tech stack

| Concern | Choice | Why |
|---|---|---|
| Monorepo | pnpm workspaces + Turborepo | Industry standard for UI libraries |
| CSS | CSS Modules | Zero runtime, RSC-safe |
| Bundler | tsup | Fast, dual CJS/ESM output |
| Types | TypeScript strict | No `any`, full inference |
| Versioning | Changesets | Coordinated releases across packages |
| Testing | Vitest + Testing Library | Fast, RSC-compatible |
| CI | GitHub Actions | On every PR and push to main |
| Release | Changesets action | Auto PR + publish on merge to main |

## Repository structure

```
synerity/
├── packages/
│   ├── ui/               @synerity/ui
│   ├── headless/         @synerity/headless
│   ├── tokens/           @synerity/tokens
│   ├── icons/            @synerity/icons
│   ├── forms/            @synerity/forms
│   └── cli/              @synerity/cli
├── apps/
│   ├── docs/             documentation site
│   └── playground/       live component sandbox
├── docs/
│   ├── BRAND.md
│   ├── ARCHITECTURE.md   (this file)
│   └── CONTRIBUTING.md
├── .github/
│   └── workflows/
│       ├── ci.yml        build + test on every PR
│       └── release.yml   publish on merge to main
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

## Design token system

All visual decisions are CSS custom properties namespaced under `--synerity-*`:

```css
/* Color */
--synerity-color-primary
--synerity-color-primary-hover
--synerity-color-secondary

/* Typography */
--synerity-font-sans
--synerity-font-mono
--synerity-text-sm / -md / -lg

/* Spacing */
--synerity-space-1 through --synerity-space-16

/* Radius */
--synerity-radius-sm / -md / -lg / -full

/* Shadow */
--synerity-shadow-sm / -md / -lg
```

Override any token globally to re-skin the entire library. No JS. No runtime cost. RSC-safe.

## Release process

1. Make changes in a feature branch
2. Run `pnpm changeset` to describe the change
3. Open a PR — CI runs typecheck + lint + build + test
4. Merge to main — Changesets action opens a "Version Packages" PR
5. Merge the version PR — packages publish automatically to npm
