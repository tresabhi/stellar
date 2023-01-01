// vite.config.ts
import react from "file:///workspace/stellar/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///workspace/stellar/node_modules/vite/dist/node/index.js";
import checker from "file:///workspace/stellar/node_modules/vite-plugin-checker/dist/esm/main.js";
import { VitePWA } from "file:///workspace/stellar/node_modules/vite-plugin-pwa/dist/index.mjs";
import svgrPlugin from "file:///workspace/stellar/node_modules/vite-plugin-svgr/dist/index.mjs";
import tsconfigPaths from "file:///workspace/stellar/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig({
  build: {
    outDir: "build",
    sourcemap: true
  },
  assetsInclude: ["**/*.gltf"],
  plugins: [
    tsconfigPaths(),
    VitePWA({ registerType: "prompt" }),
    checker({
      typescript: true,
      eslint: { lintCommand: "eslint ." },
      enableBuild: true
    }),
    react(),
    svgrPlugin({ svgrOptions: { icon: true } })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvd29ya3NwYWNlL3N0ZWxsYXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi93b3Jrc3BhY2Uvc3RlbGxhci92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vd29ya3NwYWNlL3N0ZWxsYXIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgY2hlY2tlciBmcm9tICd2aXRlLXBsdWdpbi1jaGVja2VyJztcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnO1xuaW1wb3J0IHN2Z3JQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tc3Zncic7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6ICdidWlsZCcsXG4gICAgc291cmNlbWFwOiB0cnVlLFxuICB9LFxuXG4gIGFzc2V0c0luY2x1ZGU6IFsnKiovKi5nbHRmJ10sXG5cbiAgcGx1Z2luczogW1xuICAgIHRzY29uZmlnUGF0aHMoKSxcbiAgICBWaXRlUFdBKHsgcmVnaXN0ZXJUeXBlOiAncHJvbXB0JyB9KSxcbiAgICBjaGVja2VyKHtcbiAgICAgIHR5cGVzY3JpcHQ6IHRydWUsXG4gICAgICBlc2xpbnQ6IHsgbGludENvbW1hbmQ6ICdlc2xpbnQgLicgfSxcbiAgICAgIGVuYWJsZUJ1aWxkOiB0cnVlLFxuICAgIH0pLFxuICAgIHJlYWN0KCksXG4gICAgc3ZnclBsdWdpbih7IHN2Z3JPcHRpb25zOiB7IGljb246IHRydWUgfSB9KSxcbiAgXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3TyxPQUFPLFdBQVc7QUFDMVAsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxhQUFhO0FBQ3BCLFNBQVMsZUFBZTtBQUN4QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLG1CQUFtQjtBQUUxQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsRUFDYjtBQUFBLEVBRUEsZUFBZSxDQUFDLFdBQVc7QUFBQSxFQUUzQixTQUFTO0FBQUEsSUFDUCxjQUFjO0FBQUEsSUFDZCxRQUFRLEVBQUUsY0FBYyxTQUFTLENBQUM7QUFBQSxJQUNsQyxRQUFRO0FBQUEsTUFDTixZQUFZO0FBQUEsTUFDWixRQUFRLEVBQUUsYUFBYSxXQUFXO0FBQUEsTUFDbEMsYUFBYTtBQUFBLElBQ2YsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBLElBQ04sV0FBVyxFQUFFLGFBQWEsRUFBRSxNQUFNLEtBQUssRUFBRSxDQUFDO0FBQUEsRUFDNUM7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
