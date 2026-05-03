import { Command } from "commander";
import { runAdd } from "./commands/add";
import { runInit } from "./commands/init";
import { runList } from "./commands/list";

const program = new Command();

program
  .name("synerity")
  .description("Synerity component installer — copy-paste components into your project.")
  .version("0.0.1");

// ── init ──────────────────────────────────────────────────────────────────────

program
  .command("init")
  .description("Create a synerity.config.json in the current directory.")
  .option("-y, --yes", "Skip prompts and use defaults.", false)
  .action(async (opts: { yes: boolean }) => {
    await runInit({ yes: opts.yes });
  });

// ── add ───────────────────────────────────────────────────────────────────────

program
  .command("add [components...]")
  .description("Copy component source files into your project.")
  .option("--all", "Add all available components.", false)
  .option("--overwrite", "Overwrite existing files without prompting.", false)
  .option("--cwd <path>", "Working directory (defaults to process.cwd()).")
  .action(
    async (
      components: string[],
      opts: { all: boolean; overwrite: boolean; cwd?: string },
    ) => {
      await runAdd(components, {
        all: opts.all,
        overwrite: opts.overwrite,
        cwd: opts.cwd,
      });
    },
  );

// ── list ──────────────────────────────────────────────────────────────────────

program
  .command("list")
  .description("List all available components.")
  .action(() => {
    runList();
  });

program.parse();
