import { fileURLToPath } from 'url';
import { dirname } from 'path';
import js from '@eslint/js';
import globals from 'globals';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'loader-scss.js', 'mochaSetup.js']
  },

  ...compat.extends(
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended'
  ),

  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname
      }
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      prettier: eslintPluginPrettier
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { args: 'none', varsIgnorePattern: '^_' }
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off'
    }
  }
];
