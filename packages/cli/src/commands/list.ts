import pc from "picocolors";
import { listComponents, registry } from "../registry";
import { logger } from "../utils/logger";

/**
 * `synerity list`
 *
 * Prints all available components with their descriptions.
 */
export function runList(): void {
  const names = listComponents();

  if (names.length === 0) {
    logger.warn("No components found in registry.");
    return;
  }

  console.log(pc.bold(pc.cyan(`\n  Synerity components (${names.length})\n`)));

  const maxLen = Math.max(...names.map((n) => n.length));

  for (const name of names) {
    const entry = registry[name];
    const padded = name.padEnd(maxLen + 2);
    console.log(`  ${pc.green(padded)}${pc.dim(entry?.description ?? "")}`);
  }

  console.log();
  logger.dim("Usage: npx synerity add <component> [components...]");
  logger.dim("       npx synerity add --all");
  console.log();
}
