import { fileURLToPath } from 'url';
import { dirname } from 'path';
import js from '@eslint/js';
import globals from 'globals';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginHandlebars from 'eslint-plugin-hbs';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  ...compat.extends('eslint:recommended', 'plugin:prettier/recommended'),

  {
    files: ['**/*.js', '**/*.ts'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser
      }
    },
    plugins: {
      prettier: eslintPluginPrettier,
      handlebars: eslintPluginHandlebars
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'warn'
    }
  },

  {
    files: ['**/*.hbs'],
    languageOptions: {
      parser: 'glimmer'
    },
    plugins: {
      handlebars: eslintPluginHandlebars
    },
    processor: 'handlebars/handlebars',
    rules: {
      'prettier/prettier': 'off'
    }
  }
];
