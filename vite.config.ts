import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    outDir: 'build',
    sourcemap: true,
  },

  plugins: [
    tsconfigPaths(),
    react(),
    svgrPlugin({
      svgrOptions: { icon: true },
    }),
  ],
});
