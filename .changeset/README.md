# Changesets

This directory stores pending changesets — descriptions of changes that will be included in the next release.

## Adding a changeset

```bash
pnpm changeset
```

Follow the prompts to select which packages changed and whether the change is a patch, minor, or major.

## Releasing

Merging to `main` triggers the release workflow. The Changesets GitHub Action will:
1. Open a "Version Packages" PR that bumps versions and updates changelogs
2. When that PR is merged, publish the updated packages to npm
