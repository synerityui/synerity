import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "packages/tokens/vitest.config.ts",
  "packages/headless/vitest.config.ts",
  "packages/ui/vitest.config.ts",
  "packages/forms/vitest.config.ts",
  "packages/icons/vitest.config.ts",
]);
