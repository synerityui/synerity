/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [require.resolve("./index.js")],
  plugins: ["react", "react-hooks", "jsx-a11y"],
  extends: [
    "./index.js",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/strict",
  ],
  rules: {
    "react/prop-types": "off",
    "react/display-name": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "jsx-a11y/no-autofocus": "error",
    "jsx-a11y/interactive-supports-focus": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
