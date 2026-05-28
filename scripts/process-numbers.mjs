#!/usr/bin/env node
// Process downloaded number SVGs: recolor, clean, rename, copy to src/svg/
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(import.meta.url), "../..");
const srcDir = "/var/home/darko/Downloads/brojki-20260528T093955Z-3-001/brojki";
const outDir = resolve(root, "src/svg");

// Asset → digit mapping (Assets 4-13 are digits 1-9,0)
const assetMap = {
  "Asset 4": "0031-1",
  "Asset 5": "0032-2",
  "Asset 6": "0033-3",
  "Asset 7": "0034-4",
  "Asset 8": "0035-5",
  "Asset 9": "0036-6",
  "Asset 10": "0037-7",
  "Asset 11": "0038-8",
  "Asset 12": "0039-9",
  "Asset 13": "0030-0",
};

for (const [asset, newName] of Object.entries(assetMap)) {
  const raw = await readFile(resolve(srcDir, `${asset}.svg`), "utf8");

  let svg = raw;

  // 1. Remove <?xml ...?> declaration
  svg = svg.replace(/<\?xml[^?]*\?>\s*/g, "");

  // 2. Remove <defs>...</defs> block (contains the blue style)
  svg = svg.replace(/<defs>[\s\S]*?<\/defs>\s*/g, "");

  // 3. Remove data-name and id attributes from root <svg>
  svg = svg.replace(/\s+id="Layer_2"/g, "");
  svg = svg.replace(/\s+data-name="Layer 2"/g, "");

  // 4. Remove <g id="Layer_1-2" data-name="Layer 1"> wrapper (keep inner content)
  svg = svg.replace(/<g id="Layer_1-2" data-name="Layer 1">\s*/g, "");
  // We'll close it at the end - find the matching </g>

  // 5. Remove fill="none" polygons (construction guides, not part of glyph)
  svg = svg.replace(/\s*<polygon[^>]*fill:\s*none[^>]*\/>\s*/g, "");
  svg = svg.replace(/\s*<polygon[^>]*class="cls-1"[^>]*points="[^"]*"\s*\/>\s*/g, "");

  // 6. Replace class="cls-1" and class="cls-2" with fill="#000000"
  svg = svg.replace(/class="cls-[12]"/g, 'fill="#000000"');

  // 7. Clean up empty style tags if any remain
  svg = svg.replace(/<style>\s*<\/style>/g, "");

  // 8. Normalize whitespace
  svg = svg.replace(/\n\s*\n/g, "\n");

  const outPath = resolve(outDir, `${newName}.svg`);
  await writeFile(outPath, svg.trim() + "\n");
  console.log(`wrote ${outPath}`);
}

console.log(`\nprocessed ${Object.keys(assetMap).length} number glyphs`);
