import { copyFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const browser = process.env.BROWSER || "chrome";
const __dirname = fileURLToPath(new URL('.', import.meta.url));

const manifestPath = join(
  __dirname,
  `../manifests/manifest.${browser}.json`
);
const destPath = join(__dirname, "../public/manifest.json");

// Copy the appropriate manifest
copyFileSync(manifestPath, destPath);
console.log(`Copied manifest for ${browser}`);
