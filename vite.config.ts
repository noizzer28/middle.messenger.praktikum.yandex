import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint2';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  base: '/',
  server: {
    port: 3000
  },
  plugins: [
    eslint({
      fix: true
    }),
    svgr()
  ],
  assetsInclude: ['**/*.hbs'],
  build: {
    outDir: 'dist'
  }
});
