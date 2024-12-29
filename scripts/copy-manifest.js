import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const browser = process.env.BROWSER || "chrome";
const manifestPath = resolve(`./manifests/manifest.${browser}.json`);
const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));

// Write to dist/manifest.json
writeFileSync("./dist/manifest.json", JSON.stringify(manifest, null, 2));
console.log(`Copied manifest for ${browser}`);
