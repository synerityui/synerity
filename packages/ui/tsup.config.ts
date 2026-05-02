import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ["react", "react-dom"],
  // Treat .module.css as local CSS modules — esbuild scopes class names and extracts CSS to dist/index.css
  loader: {
    ".module.css": "local-css",
  },
});
