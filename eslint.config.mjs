import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import tailwindPlugin from 'eslint-plugin-tailwindcss';
import unusedImports from 'eslint-plugin-unused-imports';
import importPlugin from 'eslint-plugin-import';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: [".next/**"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json"
      }
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      react: reactPlugin,
      'jsx-a11y': jsxA11yPlugin,
      tailwindcss: tailwindPlugin,
    },
    rules: {
      ...typescriptEslint.configs['recommended'].rules,
      ...reactPlugin.configs['recommended'].rules,
      ...jsxA11yPlugin.configs['recommended'].rules,
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  }
]
