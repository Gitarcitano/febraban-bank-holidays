const globals = require("globals");
const js = require("@eslint/js");
const ts = require("typescript-eslint");
const prettierPlugin = require("eslint-plugin-prettier");
const prettierConfig = require("eslint-config-prettier");

module.exports = ts.config(
  js.configs.recommended,
  ...ts.configs.recommendedTypeChecked,
  ...ts.configs.stylisticTypeChecked,
  prettierConfig,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
        ecmaVersion: 2020,
        sourceType: "module",
      },
      globals: globals.node,
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
);
