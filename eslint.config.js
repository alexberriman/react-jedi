// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import unicorn from "eslint-plugin-unicorn";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import sonarjs from "eslint-plugin-sonarjs";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";

export default [js.configs.recommended, {
  ignores: ["**/dist/**", "**/node_modules/**", "**/.cache/**"],
}, // Configuration for Node.js scripts
{
  files: ["src/**/*.{ts,tsx}"],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      project: "./tsconfig.json",
      ecmaFeatures: {
        jsx: true,
      },
    },
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      // Browser globals
      window: "readonly",
      document: "readonly",
      navigator: "readonly",
      localStorage: "readonly",
      sessionStorage: "readonly",
      fetch: "readonly",
      alert: "readonly",
      location: "readonly",
      history: "readonly",
      FormData: "readonly",
      Blob: "readonly",
      File: "readonly",
      FileReader: "readonly",
      URL: "readonly",
      URLSearchParams: "readonly",

      // Other globals
      console: "readonly",
      process: "readonly",
      React: "writable",
      Bun: "readonly",
    },
  },
  plugins: {
    "@typescript-eslint": typescriptEslint,
    unicorn: unicorn,
    sonarjs: sonarjs,
    react: reactPlugin,
    "react-hooks": reactHooksPlugin,
    "jsx-a11y": jsxA11yPlugin,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    ...typescriptEslint.configs.recommended.rules,
    ...unicorn.configs.recommended.rules,
    ...sonarjs.configs.recommended.rules,
    ...reactPlugin.configs.recommended.rules,
    ...reactHooksPlugin.configs.recommended.rules,
    ...jsxA11yPlugin.configs.recommended.rules,

    // Basic styling
    quotes: ["error", "double"],
    semi: ["error", "always"],

    // React specific rules
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/jsx-uses-react": "off",

    // Set specific rules
    "@typescript-eslint/no-unused-vars": "off",
    "sonarjs/no-useless-undefined": "off",
    "unicorn/no-useless-undefined": "off",
    "unicorn/no-null": "off",
    "unicorn/prevent-abbreviations": "off",
    "sonarjs/different-types-comparison": "off",
    "sonarjs/function-return-type": "off",
  },
}, // This disables rules that conflict with prettier
{
  files: ["**/*.js"],
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      console: "readonly",
      process: "readonly",
      __dirname: "readonly",
      __filename: "readonly",
      Buffer: "readonly",
      global: "readonly",
    },
  },
}, prettierConfig, ...storybook.configs["flat/recommended"], ...storybook.configs["flat/recommended"]];
