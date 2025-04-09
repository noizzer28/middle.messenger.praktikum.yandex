import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint2';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
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
