/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@synerity/eslint-config"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
};
