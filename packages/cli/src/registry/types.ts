/** A single file to be written into the user's project. */
export type RegistryFile = {
  /** Path relative to the configured `outputDir`. */
  path: string;
  /** Full file content — written as-is. */
  content: string;
};

/** Metadata and source for one copy-pasteable component. */
export type RegistryEntry = {
  description: string;
  /** Files to copy into `outputDir`. */
  files: RegistryFile[];
  /** npm packages the component imports at runtime. */
  npmDependencies: string[];
  /** Other registry components that must be added alongside this one. */
  componentDependencies: string[];
};

/** The full component registry keyed by lowercase component name. */
export type Registry = Record<string, RegistryEntry>;
