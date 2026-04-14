// Stroke-expands source SVGs into build/svg-fixed/ so they can be
// consumed as fillable glyphs by svgicons2svgfont. The raw icomoon
// exports in src/svg/ are stroke-only — feeding them straight into a
// font pipeline produces invisible/hairline glyphs.

import { mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import SVGFixer from "oslllo-svg-fixer";

const root = resolve(fileURLToPath(import.meta.url), "../..");
const srcDir = resolve(root, "src/svg");
const outDir = resolve(root, "build/svg-fixed");

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

console.log(`stroke-expanding ${srcDir} → ${outDir}`);
await SVGFixer(srcDir, outDir, { showProgressBar: true }).fix();
console.log("prepare done");
