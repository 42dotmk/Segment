# Segment

A custom display font, packaged for web distribution.

52 glyphs — uppercase `A`–`Z` (`U+0041`–`U+005A`) and lowercase `a`–`z`
(`U+0061`–`U+007A`).

## Install

```bash
npm install segment-font
```

## Use

```css
@import "segment-font/css";

.label {
  font-family: "Segment", sans-serif;
}
```

Or reference the files directly:

```html
<link rel="preload" href="/segment-font/dist/segment.woff2"
      as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/segment-font/dist/segment.css">
```

The generated CSS defines the `@font-face` and a `.segment` helper class.

## Build from source

```bash
npm install
npm run build
```

Pipeline: `src/svg/*.svg` → stroke-expand (`oslllo-svg-fixer`) →
`svgicons2svgfont` → `svg2ttf` → `ttf2woff` + `wawoff2` → `dist/`.

Source SVGs are named `{HEX4}-{char}.svg`, where the hex prefix is the
Unicode codepoint the glyph maps to. Add or replace glyphs by dropping
files into `src/svg/` using that convention.

## Layout

```
src/svg/           source glyphs (unicode-prefixed filenames)
scripts/           build pipeline
dist/              built font files + CSS (generated)
demo/              local preview
segment_font_export/  original icomoon export (reference only)
```

## License

[SIL Open Font License 1.1](./LICENSE).
