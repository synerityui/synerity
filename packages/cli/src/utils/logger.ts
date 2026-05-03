import pc from "picocolors";

/** Structured console output using picocolors. Never use console.log directly. */
export const logger = {
  info: (msg: string) => console.log(pc.cyan("ℹ") + "  " + msg),
  success: (msg: string) => console.log(pc.green("✓") + "  " + msg),
  warn: (msg: string) => console.warn(pc.yellow("⚠") + "  " + msg),
  error: (msg: string) => console.error(pc.red("✗") + "  " + msg),
  step: (msg: string) => console.log(pc.bold(pc.white("→")) + "  " + msg),
  dim: (msg: string) => console.log(pc.dim(msg)),
  blank: () => console.log(),
  /** Prints a coloured file path. */
  file: (action: "create" | "update" | "skip", path: string) => {
    const prefix =
      action === "create"
        ? pc.green("  + ")
        : action === "update"
          ? pc.yellow("  ~ ")
          : pc.dim("  - ");
    console.log(prefix + pc.dim(path));
  },
};
