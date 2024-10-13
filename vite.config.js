import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import eslint from 'vite-plugin-eslint2';

export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [
    handlebars(),
    eslint({
      fix: true
    })
  ],
  assetsInclude: ['**/*.hbs'],
  build: {
    outDir: 'dist'
  }
});
