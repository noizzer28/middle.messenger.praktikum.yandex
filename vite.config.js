import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import eslint from 'vite-plugin-eslint2';

export default defineConfig({
  plugins: [
    handlebars(),
    eslint({
      fix: true
    })
  ],
  assetsInclude: ['**/*.hbs']
});
