import postcss from "postcss";
import postcssModules from "postcss-modules";
import { readFileSync } from "fs";

/**
 * esbuild plugin that processes CSS Modules via postcss-modules.
 *
 * For each *.module.css import it:
 *   1. Generates scoped class names  (e.g. Button__root__3xYz)
 *   2. Injects the scoped CSS into <head> at runtime
 *   3. Exports named constants so `import * as styles` works correctly
 */
export function cssModulesPlugin() {
  return {
    name: "css-modules",
    setup(build) {
      build.onLoad({ filter: /\.module\.css$/ }, async (args) => {
        const source = readFileSync(args.path, "utf8");
        const classMap = {};

        const result = await postcss([
          postcssModules({
            generateScopedName: "[name]__[local]__[hash:base64:5]",
            getJSON(_, json) {
              Object.assign(classMap, json);
            },
          }),
        ]).process(source, { from: args.path });

        // Inline CSS injection (runs once per module on first import)
        const inject = `(function(){if(typeof document==='undefined')return;var s=document.createElement('style');s.textContent=${JSON.stringify(result.css)};document.head.appendChild(s);})();`;

        // Named exports so `import * as styles from '...'` resolves correctly
        const exports = Object.entries(classMap)
          .map(([k, v]) => `export var ${k}=${JSON.stringify(v)};`)
          .join("\n");

        return { contents: `${inject}\n${exports}`, loader: "js" };
      });
    },
  };
}
