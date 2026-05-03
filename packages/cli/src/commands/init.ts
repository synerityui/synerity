import * as p from "@clack/prompts";
import { existsSync } from "fs";
import { join } from "path";
import pc from "picocolors";
import { CONFIG_FILENAME, writeConfig } from "../utils/config";
import { logger } from "../utils/logger";

/**
 * `synerity init`
 *
 * Scaffolds `synerity.config.json` in the current working directory.
 * Prompts the user for output directory, TypeScript, and CSS Modules preferences.
 */
export async function runInit(options: { yes?: boolean } = {}): Promise<void> {
  const cwd = process.cwd();
  const configPath = join(cwd, CONFIG_FILENAME);

  p.intro(pc.bold(pc.cyan("Synerity — init")));

  if (existsSync(configPath)) {
    const overwrite = options.yes
      ? true
      : await p.confirm({
          message: `${CONFIG_FILENAME} already exists. Overwrite?`,
          initialValue: false,
        });

    if (p.isCancel(overwrite) || !overwrite) {
      p.cancel("Init cancelled.");
      process.exit(0);
    }
  }

  const answers = options.yes
    ? { outputDir: "src/components/ui", typescript: true, cssModules: true }
    : await p.group(
        {
          outputDir: () =>
            p.text({
              message: "Output directory for components:",
              placeholder: "src/components/ui",
              defaultValue: "src/components/ui",
              validate: (v) => (v.trim() === "" ? "Required" : undefined),
            }),
          typescript: () =>
            p.confirm({
              message: "Use TypeScript?",
              initialValue: true,
            }),
          cssModules: () =>
            p.confirm({
              message: "Include CSS Modules alongside components?",
              initialValue: true,
            }),
        },
        {
          onCancel: () => {
            p.cancel("Init cancelled.");
            process.exit(0);
          },
        },
      );

  if (p.isCancel(answers)) {
    p.cancel("Init cancelled.");
    process.exit(0);
  }

  writeConfig({
    outputDir: String(answers.outputDir),
    typescript: Boolean(answers.typescript),
    cssModules: Boolean(answers.cssModules),
  });

  p.outro(pc.green(`${CONFIG_FILENAME} created.`));

  logger.blank();
  logger.dim("Next: run `npx synerity add <component>` to add components to your project.");
}
