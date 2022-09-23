import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    outDir: 'build',
    sourcemap: true,
  },

  plugins: [
    tsconfigPaths(),
    checker({
      typescript: true,
      eslint: { lintCommand: 'eslint .' },
      overlay: true,
    }),
    react(),
    svgrPlugin({
      svgrOptions: { icon: true },
    }),
  ],
});
