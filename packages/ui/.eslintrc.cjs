/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@synerity/eslint-config/react"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
    "jsx-a11y/no-noninteractive-element-to-interactive-role": "off",
  },
};
