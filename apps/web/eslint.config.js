import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import vitestPlugin from '@vitest/eslint-plugin';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  {
    ignores: [
      '.wrangler',
      'build',
      'node_modules',
      '.react-router',
      'coverage',
      'worker-configuration.d.ts',
      '*.tsbuildinfo',
    ],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: {
        version: '19',
      },
      formComponents: ['Form'],
      linkComponents: [
        { name: 'Link', linkAttribute: 'to' },
        { name: 'NavLink', linkAttribute: 'to' },
      ],
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.cloudflare.json'],
        },
      },
    },
  },
  reactPlugin.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    ...importPlugin.flatConfigs.recommended,
    settings: {
      'import/internal-regex': '[^@/|^@styles/]',
      'import/resolver': {
        node: {
          extensions: ['.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.cloudflare.json'],
        },
      },
    },
  },
  vitestPlugin.configs.recommended,
  prettierRecommended,
  {
    rules: {
      'prettier/prettier': 2,
    },
  },
);
