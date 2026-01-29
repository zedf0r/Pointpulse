import { defineConfig } from "eslint/config";
import { base } from "@dubium/eslint-config/base";
import { typescript } from "@dubium/eslint-config/typescript";
import { react } from "@dubium/eslint-config/react";
import globals from "globals";
import prettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";

const enhancedTypescript = {
  ...typescript,
  languageOptions: {
    ...typescript.languageOptions,
    parserOptions: {
      ...(typescript.languageOptions?.parserOptions || {}),
      project: "./tsconfig.json",
      tsconfigRootDir: process.cwd(),
      EXPERIMENTAL_useProjectService: true,
    },
  },
};

export default defineConfig([
  base,
  enhancedTypescript,
  react,
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
  prettier,
  {
    files: ["**/*.schema.ts"],
    rules: {
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
    },
  },
]);
