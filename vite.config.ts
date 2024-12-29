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
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
  build: {
    outDir: "dist",
    assetsDir: "",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/main/index.html"),
        popup: resolve(__dirname, "src/popup/index.html"),
        options: resolve(__dirname, "src/options/index.html"),
        content: resolve(__dirname, "src/content/content.ts"),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === "content") {
            return "content.js";
          }
          return "[name].[hash].js";
        },
        chunkFileNames: "[name]/[name].js",
        assetFileNames: "assets/[name].[ext]",
        sanitizeFileName: (name) => {
          return name
            .replace(/\x00/g, "")
            .replace(/^_/, "plugin-")
            .replace(/:/g, "-");
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  base: "./",
  server: {
    port: 5173,
    open: false,
    headers: {
      "Content-Security-Policy":
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; object-src 'none';",
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      options: resolve(__dirname, "options"),
    },
  },
} as VitestConfigExport);
