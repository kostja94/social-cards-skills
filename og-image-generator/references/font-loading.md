# Font Loading & Subsetting for OG Image Generation

Satori requires explicit font loading — it cannot read system fonts. This reference covers font selection, loading strategies, CJK handling, and size optimization.

## How Satori Loads Fonts

```ts
import satori from 'satori';

const fonts: SatoriOptions['fonts'] = [
  {
    name: 'Inter',           // Must match fontFamily in JSX styles
    data: fontArrayBuffer,   // Binary font data (ttf/otf/woff)
    weight: 700,             // 400, 500, 600, 700, 800, 900
    style: 'normal',         // 'normal' | 'italic'
  },
];

const svg = await satori(jsxElement, { width: 1200, height: 630, fonts });
```

**Each weight + style combination is a separate entry.** If your template uses `fontWeight: 400` and `fontWeight: 700`, you need two font entries — even if both are "Inter."

## Font Selection by Content Language

| Content language | Recommended font | Size (single weight) | Notes |
|-----------------|------------------|---------------------|-------|
| English / Latin | Inter | ~200KB (woff) | Clean, modern, used by Vercel |
| English (default) | Geist Sans | Bundled in `next/og` | Zero config in Next.js |
| Chinese (Simplified) | Noto Sans SC | ~5MB (full) → 200–500KB (subset) | Requires subsetting for edge |
| Chinese (Traditional) | Noto Sans TC | ~5MB (full) | Same subsetting strategy |
| Japanese | Noto Sans JP | ~4MB (full) → 200–500KB (subset) | Subset by character frequency |
| Korean | Noto Sans KR | ~3MB (full) → 200–500KB (subset) | Subset by character frequency |
| Arabic | Noto Sans Arabic | ~200KB (single weight) | RTL text: use `direction: 'rtl'` |
| Mono / code | JetBrains Mono | ~150KB (single weight) | For code snippets, file names |

## Loading Strategies by Platform

### Next.js (Node.js runtime)

```ts
import fs from 'fs/promises';
import path from 'path';

async function loadFont(filename: string): Promise<ArrayBuffer> {
  const fontPath = path.join(process.cwd(), 'fonts', filename);
  const data = await fs.readFile(fontPath);
  return data.buffer;
}

const interBold = await loadFont('Inter-Bold.ttf');
```

### Next.js (Edge runtime)

Edge runtime has NO filesystem access. Bundle fonts with your code or load from CDN:

```ts
// Font is bundled as part of the deployment
import interBold from './fonts/Inter-Bold.ttf';

// OR: fetch from CDN at runtime
const res = await fetch('https://cdn.example.com/fonts/Inter-Bold.ttf');
const interBold = await res.arrayBuffer();
```

### Cloudflare Workers

Same constraint as Edge — no filesystem. Fetch from CDN or bundle via Workers KV / R2.

```ts
const res = await fetch('https://cdn.example.com/fonts/Inter-Bold.ttf');
const fontData = await res.arrayBuffer();
```

## CJK Subsetting Strategy

Full CJK fonts are too large for edge runtimes (3–5MB per weight). Subset to only the characters your titles use.

### Approach 1: Static subset (content-controlled)

If your OG titles use a known set of characters (product names, fixed labels), pre-generate a subset font:

```bash
# Using fonttools (Python)
pip install fonttools brotli

pyftsubset NotoSansSC-Regular.ttf \
  --text="你的标题文字集合" \
  --output-file=NotoSansSC-subset.woff2 \
  --flavor=woff2
```

Result: ~5MB → ~50–200KB depending on character count.

### Approach 2: Dynamic subset (unpredictable titles)

For UGC or highly variable titles, use a font CDN with subsetting:

```
https://fonts.googleapis.com/css2?family=Noto+Sans+SC&text=你的标题文字
```

Google Fonts API subsets on the fly. Cache the result.

### Approach 3: Bilingual strategy (recommended for EN/ZH sites)

Load a lightweight Latin font (Inter ~200KB) for English text + a heavily subsetted CJK font for Chinese characters. Use a `<span>` with different `fontFamily` for each language segment.

```tsx
<div style={{ fontFamily: 'Inter' }}>
  Best AI Tools in 2026
  <span style={{ fontFamily: 'Noto Sans SC' }}>最好的 AI 工具</span>
</div>
```

## Emoji Fonts

Satori's built-in emoji support is limited. Load a dedicated emoji font:

```ts
const emojiFont = await loadFont('NotoEmoji-Regular.ttf');
// OR
const twemoji = await loadFont('Twemoji.ttf');

fonts: [
  { name: 'Inter', data: interBold, weight: 700 },
  { name: 'Emoji', data: emojiFont, weight: 400 },
]
```

**Note**: Emoji fonts are large (Noto Emoji ~2MB). Subset to only the emoji you use, or skip emoji in OG images (they render inconsistently across platforms anyway).

## Geist: Next.js Built-in Default

`next/og` (`ImageResponse`) bundles Geist Sans and Geist Mono. If your template uses `fontFamily: 'Geist'` (or doesn't specify a font), Next.js uses Geist automatically — no manual font loading needed.

```tsx
// This works in Next.js without any font loading:
new ImageResponse(
  <div style={{ fontFamily: 'Geist', fontWeight: 800, fontSize: 64 }}>
    {title}
  </div>,
  { width: 1200, height: 630 },
);
```

**Trade-off**: Geist is Latin-only. For CJK, Arabic, Cyrillic, etc., you still need manual font loading.

## Font File Size Comparison

| Font | Regular | Bold | Both |
|------|---------|------|------|
| Inter (woff2) | ~100KB | ~100KB | ~200KB |
| Geist Sans (bundled) | 0KB (bundled) | 0KB (bundled) | 0KB |
| Noto Sans SC (full, woff2) | ~3MB | ~3MB | ~6MB |
| Noto Sans SC (subset ~200 chars, woff2) | ~50KB | ~50KB | ~100KB |
| Noto Emoji (full) | ~2MB | N/A | ~2MB |
| JetBrains Mono (woff2) | ~80KB | ~80KB | ~160KB |

**Rule of thumb**: Keep total font payload under 500KB for edge runtimes. Subset CJK fonts; skip emoji unless essential.
