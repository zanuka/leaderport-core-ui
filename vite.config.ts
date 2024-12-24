import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
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
  },
  base: "./",
});
