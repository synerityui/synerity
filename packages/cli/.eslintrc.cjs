/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@synerity/eslint-config"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  rules: {
    "no-console": "off",
    "import/order": "warn",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
  },
};
