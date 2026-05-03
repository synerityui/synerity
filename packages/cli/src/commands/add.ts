import * as p from "@clack/prompts";
import { ensureDirSync, existsSync, writeFileSync } from "fs-extra";
import { join } from "path";
import pc from "picocolors";
import { getComponent, listComponents, resolveComponents } from "../registry";
import type { RegistryEntry } from "../registry";
import { readConfig } from "../utils/config";
import { buildInstallCommand, collectDependencies } from "../utils/deps";
import { logger } from "../utils/logger";

type AddOptions = {
  all?: boolean;
  overwrite?: boolean;
  cwd?: string | undefined;
};

/**
 * `synerity add [components...] [--all] [--overwrite]`
 *
 * Copies component source files into the project's configured output directory.
 */
export async function runAdd(
  componentNames: string[],
  options: AddOptions = {},
): Promise<void> {
  const cwd = options.cwd ?? process.cwd();

  // ── Config ──────────────────────────────────────────────────────────────────
  const config = readConfig(cwd);
  if (!config) {
    logger.error(`No ${pc.cyan("synerity.config.json")} found.`);
    logger.dim(`Run ${pc.cyan("npx synerity init")} first.`);
    process.exit(1);
  }

  // ── Resolve component list ───────────────────────────────────────────────────
  const all = listComponents();

  if (options.all) {
    componentNames = all;
  }

  if (componentNames.length === 0) {
    logger.error("No components specified. Run `npx synerity list` to see available components.");
    process.exit(1);
  }

  // Validate names
  const unknown = componentNames.filter((n) => !getComponent(n));
  if (unknown.length > 0) {
    for (const name of unknown) {
      logger.error(`Unknown component: ${pc.bold(name)}`);
    }
    logger.dim(`Run ${pc.cyan("npx synerity list")} to see available components.`);
    process.exit(1);
  }

  // Expand transitive component dependencies
  const resolved = resolveComponents(componentNames);

  // Build entry map
  const entries = new Map<string, RegistryEntry>();
  for (const name of resolved) {
    const entry = getComponent(name);
    if (entry) entries.set(name, entry);
  }

  p.intro(pc.bold(pc.cyan("Synerity — add")));

  // ── Conflict detection ───────────────────────────────────────────────────────
  const outputBase = join(cwd, config.outputDir);
  const conflicts: string[] = [];

  for (const entry of entries.values()) {
    for (const file of entry.files) {
      if (!config.cssModules && file.path.endsWith(".module.css")) continue;
      const dest = join(outputBase, file.path);
      if (existsSync(dest)) conflicts.push(file.path);
    }
  }

  let shouldOverwrite = options.overwrite ?? false;

  if (conflicts.length > 0 && !shouldOverwrite) {
    logger.blank();
    logger.warn(`${conflicts.length} file(s) already exist:`);
    for (const p of conflicts) logger.file("skip", join(config.outputDir, p));
    logger.blank();

    const answer = await p.confirm({
      message: "Overwrite existing files?",
      initialValue: false,
    });

    if (p.isCancel(answer)) {
      p.cancel("Cancelled.");
      process.exit(0);
    }

    shouldOverwrite = Boolean(answer);
  }

  // ── Write files ──────────────────────────────────────────────────────────────
  logger.blank();
  logger.step("Writing files…");
  logger.blank();

  const written: string[] = [];
  const skipped: string[] = [];

  for (const entry of entries.values()) {
    for (const file of entry.files) {
      if (!config.cssModules && file.path.endsWith(".module.css")) continue;
      if (!config.typescript && file.path.endsWith(".tsx")) continue;

      const dest = join(outputBase, file.path);
      const existed = existsSync(dest);

      if (existed && !shouldOverwrite) {
        logger.file("skip", join(config.outputDir, file.path));
        skipped.push(file.path);
        continue;
      }

      ensureDirSync(join(dest, ".."));
      writeFileSync(dest, file.content, "utf8");
      logger.file(existed ? "update" : "create", join(config.outputDir, file.path));
      written.push(file.path);
    }
  }

  // ── Dependencies ─────────────────────────────────────────────────────────────
  const allDeps = collectDependencies([...entries.values()]);

  logger.blank();

  if (written.length > 0) {
    logger.success(
      `${written.length} file${written.length === 1 ? "" : "s"} written` +
        (skipped.length > 0 ? `, ${skipped.length} skipped` : "") +
        ".",
    );
  } else {
    logger.warn("No files written (all skipped).");
  }

  if (allDeps.length > 0) {
    logger.blank();
    logger.step("Install dependencies:");
    logger.blank();
    console.log(`  ${pc.cyan(buildInstallCommand(allDeps, { cwd }))}`);
  }

  logger.blank();
  p.outro(pc.green("Done!"));
}
