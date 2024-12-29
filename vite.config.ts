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
        options: resolve(__dirname, "src/options/index.html"),
        content: resolve(__dirname, "src/content/content.js"),
        service_worker: resolve(__dirname, "src/background/service_worker.js"),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === "service_worker") {
            return "[name].js";
          }
          return `${chunkInfo.name}/${chunkInfo.name}.js`;
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".html")) {
            const folder = assetInfo.name.split("/")[0];
            return `${folder}/index.html`;
          }
          if (assetInfo.name?.endsWith(".css")) {
            return `styles/[name].[ext]`;
          }
          if (assetInfo.name?.startsWith("assets/")) {
            return assetInfo.name;
          }
          return "assets/[name].[ext]";
        },
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
