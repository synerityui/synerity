import { existsSync } from "fs";
import { join } from "path";

type PackageManager = "pnpm" | "yarn" | "bun" | "npm";

/** Detects the package manager used in the given directory. */
export function detectPackageManager(cwd = process.cwd()): PackageManager {
  if (existsSync(join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(cwd, "yarn.lock"))) return "yarn";
  if (existsSync(join(cwd, "bun.lockb"))) return "bun";
  return "npm";
}

/** Returns the install command for the detected package manager. */
export function buildInstallCommand(
  packages: string[],
  options: { dev?: boolean; cwd?: string } = {},
): string {
  if (packages.length === 0) return "";
  const pm = detectPackageManager(options.cwd);
  const pkgList = packages.join(" ");
  const devFlag = options.dev ? (pm === "npm" ? " --save-dev" : " -D") : "";

  switch (pm) {
    case "pnpm":
      return `pnpm add${devFlag} ${pkgList}`;
    case "yarn":
      return `yarn add${devFlag} ${pkgList}`;
    case "bun":
      return `bun add${devFlag} ${pkgList}`;
    default:
      return `npm install${devFlag} ${pkgList}`;
  }
}

/** Collects unique npm dependencies across multiple registry entries. */
export function collectDependencies(
  entries: Array<{ npmDependencies: string[] }>,
): string[] {
  return [...new Set(entries.flatMap((e) => e.npmDependencies))].sort();
}
