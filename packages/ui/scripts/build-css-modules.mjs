/**
 * Pre-build step: for every *.module.css file in src/,
 * generate a *.module.css.js sidecar that:
 *   1. Injects the scoped CSS into <head> at runtime
 *   2. Exports the class name map as the default export
 *
 * tsup.config.ts then redirects `import from './Button.module.css'`
 * to `./Button.module.css.js` via an onResolve plugin.
 */
import { readFileSync, writeFileSync } from "fs";
import { glob } from "glob";
import path from "path";
import postcss from "postcss";
import postcssModules from "postcss-modules";

const cssFiles = await glob("src/**/*.module.css", { cwd: process.cwd() });

for (const rel of cssFiles) {
  const abs = path.resolve(process.cwd(), rel);
  const source = readFileSync(abs, "utf8");
  const classMap = {};

  const result = await postcss([
    postcssModules({
      generateScopedName: "[name]__[local]__[hash:base64:5]",
      getJSON(_, json) {
        Object.assign(classMap, json);
      },
    }),
  ]).process(source, { from: abs });

  const inject = `(function(){if(typeof document==="undefined")return;var s=document.createElement("style");s.textContent=${JSON.stringify(result.css)};document.head.appendChild(s);})();`;
  const contents = `${inject}\nexport default ${JSON.stringify(classMap, null, 0)};\n`;

  writeFileSync(`${abs}.js`, contents, "utf8");
  console.log(`  generated ${rel}.js (${Object.keys(classMap).length} classes)`);
}

console.log(`\n✓ CSS Modules pre-build complete (${cssFiles.length} files)`);
