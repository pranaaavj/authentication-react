import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint({
      overrideConfigFile: './config/eslint.config.js', // Update ESLint config path
    }),
  ],
  css: {
    postcss: './config/postcss.config.js',
  },
});
