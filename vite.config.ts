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
        popup: resolve(__dirname, "popup/index.html"),
        options: resolve(__dirname, "options/index.html"),
      },
      output: {
        entryFileNames: "[name]/[name].js",
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
  },
} as VitestConfigExport);
