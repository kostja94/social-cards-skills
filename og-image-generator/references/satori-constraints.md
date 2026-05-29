# Satori CSS Constraints Reference

Satori converts JSX/HTML to SVG using Yoga (Flexbox layout engine). It supports a subset of CSS. This reference covers what works, what doesn't, and workarounds.

## Layout (Flexbox)

### Supported

| Property | Notes |
|----------|-------|
| `display: flex` | Required on containers. Default is block (no auto-layout). |
| `flexDirection: 'column' | 'row'` | Default is `row` |
| `alignItems` | `flex-start`, `center`, `flex-end`, `stretch` |
| `justifyContent` | `flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly` |
| `flex` | Shorthand: `flex: 1`, `flex: '0 0 auto'`, `flexGrow`, `flexShrink`, `flexBasis` |
| `width`, `height` | **Required** on every flex item. Percentage values supported when parent has explicit size. |
| `minWidth`, `maxWidth`, `minHeight`, `maxHeight` | Supported |
| `padding`, `margin` | Full shorthand support: `padding: '10px 20px'`, `marginTop: 10` |
| `position: 'absolute'` | Absolute positioning relative to nearest flex container |
| `top`, `left`, `right`, `bottom` | For absolutely positioned elements |
| `gap` | **NOT SUPPORTED**. Use `margin` or `padding` for spacing between elements. |

### Not Supported

| Property | Workaround |
|----------|-----------|
| CSS Grid (`display: grid`, `grid-template-columns`) | Nested flex with explicit widths |
| `gap` | `margin` on children: `marginRight: 20` on every child except last |
| `flex-wrap` | Pre-calculate max items per row; manually split into rows |
| `float` | Flexbox or absolute positioning |
| `overflow: hidden` / `scroll` | Pre-calculate content that fits; truncate text manually |

## Typography

### Supported

| Property | Notes |
|----------|-------|
| `fontSize` | In px: `fontSize: 32` or `fontSize: '2rem'` |
| `fontWeight` | `400`, `500`, `600`, `700`, `800`, `900` — must match loaded font data |
| `fontFamily` | String matching font name in Satori `fonts` config |
| `lineHeight` | Number (multiplier): `lineHeight: 1.2` or px: `lineHeight: '48px'` |
| `letterSpacing` | In em: `letterSpacing: '-0.02em'` or px |
| `textAlign` | `left`, `center`, `right` |
| `color` | Hex (`#333`), rgb (`rgb(255,0,0)`), rgba (`rgba(0,0,0,0.5)`) |
| `whiteSpace: 'nowrap'` | Prevents text wrapping |
| `textOverflow: 'ellipsis'` | With `overflow: hidden` |
| `textDecoration: 'underline'` | Also `line-through` |

### Not Supported

- `word-break`, `overflow-wrap`: Text does NOT auto-wrap by default. Manually insert newlines.
- `font-style: italic`: Only works if a dedicated italic font weight is loaded.
- Variable fonts (`font-variation-settings`): Not supported. Load static font files.

## Visual

### Supported

| Property | Notes |
|----------|-------|
| `backgroundColor` | Hex, rgb, rgba, named colors |
| `backgroundImage: 'linear-gradient(...)'` | Supported. Radial gradients: partial support. |
| `backgroundImage: 'url(...)'` | Only works with `@resvg/resvg-js` (Node.js), NOT `@resvg/resvg-wasm` (Edge) |
| `border` | Full shorthand: `border: '2px solid #333'` |
| `borderRadius` | In px: `borderRadius: 8` or px string; percent: `borderRadius: '50%'` |
| `boxShadow` | Supported: `boxShadow: '0 4px 12px rgba(0,0,0,0.15)'` |
| `opacity` | Number 0–1 |
| `transform: 'rotate(...)'` | Supported. Also `scale()`. |

### Not Supported

- `backdrop-filter` (blur, etc.)
- `mix-blend-mode`
- `filter` (drop-shadow, blur)
- `clip-path`
- SVG filters

## Images

### Supported

- External images: `src="https://..."` — Supported, but Satori fetches them during render (adds latency)
- Base64 data URIs: `src="data:image/png;base64,..."` — Works on both WASM and JS builds
- `objectFit: 'cover' | 'contain' | 'fill'`
- `width`, `height` on `<img>` — Required

### Not Supported

- `<svg>` inline elements within JSX
- `<canvas>` elements
- Animated GIFs (only first frame)
- WebP images on some older Satori versions

## Common Error Messages & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `"text" is not a valid tag` | Using `<p>` or `<span>` instead of `<div>` | Satori only supports `<div>` and `<img>`. Use `<div>` for all text. |
| `Could not find font` | Font name in style doesn't match loaded font | Match `fontFamily` string to the `name` in Satori `fonts` array |
| Blank image / white output | Unsupported CSS property crashing render | Comment out styles one by one to find the culprit |
| Text overlapping / not wrapping | Missing explicit dimensions on flex items | Add `width`/`height` to every flex child |
| `initWasm` not called | `@resvg/resvg-wasm` requires manual WASM init | Call `await resvg.initWasm(wasmBinary)` before `.render()` |

## Text Wrapping Workaround

Since Satori doesn't auto-wrap text, use a helper that inserts `<br/>` tags:

```tsx
function wrapText(text: string, maxCharsPerLine: number): JSX.Element[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length > maxCharsPerLine && currentLine) {
      lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine += (currentLine ? ' ' : '') + word;
    }
  }
  if (currentLine) lines.push(currentLine.trim());

  return lines.map((line, i) => (
    <tspan key={i} x={0} dy={i === 0 ? 0 : undefined}>
      {line}
    </tspan>
  ));
}
```

**Note**: `<tspan>` is experimental in Satori. A safer approach is to split into multiple `<div>` elements with explicit spacing, or limit titles to a safe character count (60–80 chars) and keep them on one line.
