import { defineConfig } from "tsup";
import path from "path";

/** Redirect `import styles from './Foo.module.css'` to the pre-generated `./Foo.module.css.js` sidecar. */
const cssModulesRedirectPlugin = {
  name: "css-modules-redirect",
  setup(build: any) {
    build.onResolve({ filter: /\.module\.css$/ }, (args: any) => ({
      path: path.resolve(args.resolveDir, args.path + ".js"),
    }));
  },
};

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ["react", "react-dom"],
  esbuildPlugins: [cssModulesRedirectPlugin],
});
