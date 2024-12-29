/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import { resolve } from "path";
import type { UserConfig } from "vite";
import { defineConfig } from "vite";
import type { InlineConfig } from "vitest";

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

export default defineConfig({
  plugins: [react()],
  root: ".",
  publicDir: "./public",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    modulePreload: false,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "src/popup/index.html"),
        "popup/index": resolve(__dirname, "src/popup/index.tsx"),
        options: resolve(__dirname, "src/options/index.html"),
        "options/index": resolve(__dirname, "src/options/index.tsx"),
        content: resolve(__dirname, "src/content/content.js"),
        service_worker: resolve(__dirname, "src/background/service_worker.js"),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === "service_worker") {
            return "[name].js";
          }
          return `${chunkInfo.name.split("/")[0]}/${chunkInfo.name.split("/")[1] || chunkInfo.name}.js`;
        },
        assetFileNames: "assets/[name].[ext]",
        chunkFileNames: "[name]/[name].js",
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  server: {
    port: 5173,
    open: false,
    headers: {
      "Content-Security-Policy":
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; object-src 'none';",
    },
  },
} as VitestConfigExport);
