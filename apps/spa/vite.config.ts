import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@template/ui": resolve(__dirname, "../../packages/ui/src/index.ts"),
      "@template/utils": resolve(__dirname, "../../packages/utils/src/index.ts"),
    },
  },

  server: {
    port: 9001,
    host: "0.0.0.0",
    strictPort: false,
    proxy: {
      "/api": {
        target: "http://localhost:9000",
        changeOrigin: true,
      },
    },
  },

  preview: {
    port: 9001,
    host: "0.0.0.0",
  },

  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router"],
        },
      },
    },
  },

  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV !== "production"),
  },
});
