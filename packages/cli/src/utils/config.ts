import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

export const CONFIG_FILENAME = "synerity.config.json";

export type SynerityConfig = {
  /** Output directory for added components, relative to project root. */
  outputDir: string;
  /** Whether to write TypeScript source files (true) or JavaScript (false). */
  typescript: boolean;
  /** Whether to emit CSS Modules alongside components. */
  cssModules: boolean;
};

const DEFAULT_CONFIG: SynerityConfig = {
  outputDir: "src/components/ui",
  typescript: true,
  cssModules: true,
};

/**
 * Reads `synerity.config.json` from the current working directory.
 * Returns `null` when the file does not exist.
 */
export function readConfig(cwd = process.cwd()): SynerityConfig | null {
  const configPath = join(cwd, CONFIG_FILENAME);
  if (!existsSync(configPath)) return null;

  try {
    const raw = readFileSync(configPath, "utf8");
    return { ...DEFAULT_CONFIG, ...(JSON.parse(raw) as Partial<SynerityConfig>) };
  } catch {
    return null;
  }
}

/**
 * Writes `synerity.config.json` to the current working directory.
 */
export function writeConfig(config: SynerityConfig, cwd = process.cwd()): void {
  const configPath = join(cwd, CONFIG_FILENAME);
  writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n", "utf8");
}

export { DEFAULT_CONFIG };
