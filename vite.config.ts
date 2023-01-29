import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import { VitePWA } from 'vite-plugin-pwa';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: { sourcemap: true },

  assetsInclude: ['**/*.gltf'],

  plugins: [
    tsconfigPaths(),
    VitePWA({ registerType: 'prompt' }),
    checker({
      typescript: true,
      eslint: { lintCommand: 'eslint --ext ts,tsx src' },
      enableBuild: true,
      overlay: false,
    }),
    react(),
    svgrPlugin({ svgrOptions: { icon: true } }),
  ],
});
