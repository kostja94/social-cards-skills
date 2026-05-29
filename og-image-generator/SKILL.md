---
name: og-image-generator
description: Generate Open Graph images for social sharing previews across Facebook, LinkedIn, Slack, Discord, WhatsApp, Telegram, Pinterest, iMessage, and QQ. Use when the user mentions "OG image," "og:image," "Open Graph image," "social share image," "link preview image," "generate OG image," "dynamic og image," "social card image," "programmatic og," or "auto-generate social images." Core approaches: AI image generation (Nano Banana, GPT Image, Flux), Agent-native content-aware workflow, Satori+resvg, Puppeteer. Covers 6 visual styles: Terminal/CLI, Magazine Editorial, Swiss Minimal, Pixel Retro, Brutalist, Newspaper. For Twitter-specific image generation, use twitter-card-image-generator.
license: MIT
compatibility: Requires Node.js for Satori/resvg templates. Next.js, Nuxt, or Cloudflare Workers recommended for code-based generation. AI generation requires external image API access.
metadata:
  version: 2.0.0
---

# OG Image Generator

Generate Open Graph images — the 1200x630px preview cards that appear when links are shared on social platforms. Pages with unique, well-designed OG images get 2–3x more clicks than bare URL links.

This skill's core is **content-aware generation**: extracting meaning from the page, matching a visual style, and producing an image that reflects the actual content — not just filling a template with a title.

## When to Use

- User needs **1200×630px (1.91:1)** images for Facebook, LinkedIn, Slack, Discord, WhatsApp, Telegram, Pinterest, iMessage, or QQ
- User mentions `og:image`, Open Graph, social share image, link preview image, or dynamic/programmatic OG generation
- User wants Satori JSX templates, AI image generation, or a content-aware workflow that extracts page meaning into a visual card
- User needs one of the six visual styles (Terminal, Magazine, Swiss, Pixel, Brutalist, Newspaper)

## When NOT to Use

- **Twitter/X Card images (1200×675, 2:1)** — use **twitter-card-image-generator** instead
- **Only setting HTML meta tags** (not creating the image file) — use **open-graph** from marketing-skills
- **No-code visual editor or hosted API** — use [Oginify](https://oginify.com) instead of running an agent pipeline

**When invoking**: On **first use**, open with 1–2 sentences on what this skill covers and why it matters, then go directly to the generation approach that best fits the user's needs. On **subsequent use** or when the user asks to skip, go directly to the main output.

## 1. Six Generation Approaches

These are six fundamentally different ways to produce an OG image. They answer "how does an image get made?" — orthogonal to "what does the image look like?" (which §3 Style System answers).

### 1.1 AI Image Generation (Core #1)

Use an external AI image model to generate the OG image directly from a prompt. This is the most flexible approach — no template code, no font files, no layout engine. The model handles composition, color, and visual hierarchy in one shot.

**When this is the right choice**: Visual-first pages where the image's aesthetic matters more than exact text — game pages, design portfolios, brand launches, lifestyle content, event announcements. Also good for pages that need a highly specific visual mood that's hard to encode in code-based templates.

**When it's NOT**: When the OG image must contain precise, error-free text (product names, technical terms, Chinese characters). AI models struggle with text rendering — misspellings, garbled characters, or missing words are common.

**Tools and their strengths**:

| Tool | Text accuracy | Aesthetic quality | Speed | Chinese text | Best for |
|------|-------------|-------------------|-------|-------------|----------|
| **GPT Image 2.0** (GPT-4o image) | Highest | High | 5–15s | Moderate | Text-heavy OG, complex layouts, multimodal understanding |
| **Flux** (Black Forest Labs) | Moderate | Highest | 3–8s (API) | Weak | Visual quality priority, open-source flexibility |
| **Nano Banana** | Low | Good | 2–5s | Weak | Fast iteration, budget-friendly, simple compositions |
| **DALL-E 3** | Moderate | High | 5–10s | Weak | Photorealistic scenes, illustration style |
| **Midjourney** | N/A (no API) | Highest | 30–60s | N/A | Inspiration, one-off high-quality images |

**Prompt strategy for OG images**: Three-part structure:

```
Part 1 — Visual description: background, composition, mood, lighting
Part 2 — Text specification: EXACT text to display, in quotes, with font size hints
Part 3 — Technical constraints: "1200x630px, clean legible text, no edge clutter"
```

Example:
```
A dark navy gradient background with subtle grid lines. A bold white title reads "Best AI Image Generators 2026" centered at 60pt. Small label "alignify.co" in bottom-right corner. Clean, modern, minimal. 1200x630px social card. No decorative elements near edges.
```

**The hybrid approach (recommended)**: AI generates the background/atmosphere; code-based rendering (Satori, §1.3) overlays the text. This gives you AI's visual quality + code's text precision. Especially important for Chinese text where AI models still struggle.

### 1.2 Agent-Native Content-Aware Workflow (Core #2)

This is not a rendering technology — it's a **decision-making workflow** where the Agent reads the page content, extracts what makes it unique, matches a visual style, and drives the generation process end-to-end.

Traditional OG generation is: human writes template → template gets filled with a title → renders. Agent-native is: Agent reads the article → Agent understands what this page is actually about → Agent decides how to visually express that → Agent picks a generation method and executes.

**The workflow**:

```
1. READ CONTENT
   Read the page's content. Extract:
   - Page title and subtitle
   - The ONE most interesting data point or insight (not the title — the thing
     that makes THIS page different from all others)
   - Emotional tone (technical/dry, narrative/warm, data-heavy, playful, urgent)
   - Visual candidates: product names, numbers, comparisons, quotes, categories, dates

2. MATCH STYLE
   Map tone + content type to one of the 6 visual styles (see §3 Style System):
   - Technical comparison, data-heavy → Swiss Minimal or Terminal/CLI
   - Long-form narrative, brand story → Magazine Editorial
   - Game, retro topic → Pixel Retro
   - Dev tool, CLI product → Terminal/CLI
   - Design-forward, anti-convention → Brutalist
   - News, aggregation, timeliness → Newspaper

3. EXTRACT VISUAL ELEMENTS
   Identify what can become a visual anchor besides the title:
   - A stat: "4.2x faster" → large number treatment
   - A comparison: "Midjourney vs Flux" → side-by-side module
   - A quote: pull quote block
   - A category: badge or label
   - An author + date: byline treatment

4. SELECT GENERATION APPROACH
   - If visual mood is the priority and exact text is secondary
     → AI generation (§1.1), or AI background + Satori text overlay
   - If text precision is critical
     → Satori (§1.3) with chosen style template
   - If complex CSS layout needed
     → Puppeteer (§1.4)
   - If non-developer maintains this
     → Managed service (§1.5) or JSON config (§1.6)

5. GENERATE
   Execute the chosen approach. If using Satori, copy the seed template
   for the chosen style from templates/, modify with actual data.

6. VALIDATE
   Run the Agent YAML checks (§9) — dimensions, text legibility, safe zones,
   font loading, text accuracy (especially for AI-generated images).
```

**Example — how Agent-native changes the output**:

Content: "We tested 6 AI image generators. Flux scored highest on visual quality (9.2/10). Midjourney won on aesthetic (9.5/10). DALL-E 3 is best for text rendering. GPT Image 2.0 is the most versatile."

Template approach (without Agent-native):
> A card that says "Best AI Image Generators 2026" with "yoursite.com" at the bottom.

Agent-native approach (what this skill produces):
> A Swiss Minimal card with: "Best AI Image Generators" as the headline, a 3-column score matrix showing Flux 9.2 / Midjourney 9.5 / DALL-E 8.7, a small "GPT Image 2.0 — most versatile" badge, and the domain bottom-right. The unique data points from the article ARE the visual.

### 1.3 Satori + resvg (Code-based generation)

The most widely adopted code-based approach. JSX → Satori → SVG → resvg → PNG. Edge-compatible, 100–500ms render time.

**When to use**: Text must be pixel-perfect. Works on Next.js, Cloudflare Workers, Vercel Edge, any JS runtime.

**Quick implementation (Next.js App Router)**:

```tsx
// app/og/route.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') ?? 'Default Title';

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-start', justifyContent: 'flex-end',
        background: 'linear-gradient(135deg, #0f172a, #1e293b)',
        color: '#f8fafc', fontFamily: 'Inter',
        padding: '80px 100px',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '6px',
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
        }} />
        <div style={{
          fontSize: '64px', fontWeight: '800', lineHeight: 1.1,
          letterSpacing: '-0.02em', maxWidth: '900px',
        }}>{title}</div>
        <div style={{
          fontSize: '28px', fontWeight: '600', opacity: 0.4,
          marginTop: '40px',
        }}>yoursite.com</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
```

For Satori CSS limitations, see [references/satori-constraints.md](references/satori-constraints.md).

### 1.4 Puppeteer / Playwright

Headless browser screenshot. Full CSS, JavaScript, Canvas, WebGL. 1–3s render, ~300MB Chromium binary. Cannot run on Edge.

**When to use**: CSS Grid layouts, Canvas charts, WebGL backgrounds, complex CJK font shaping.

```ts
import puppeteer from 'puppeteer';

async function generateOgImage(html: string): Promise<Buffer> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.setContent(html);
  const screenshot = await page.screenshot({ type: 'png' });
  await browser.close();
  return Buffer.from(screenshot);
}
```

### 1.5 Managed Services

API-based, no rendering pipeline to maintain:

| Service | Best for |
|---------|----------|
| **OG Kit** | Visual template editor, non-developers |
| **Cloudinary** | Already using Cloudinary for images |
| **Vercel OG** | Already on Vercel, wraps Satori |
| **imgix** | Enterprise, URL-based image manipulation |

### 1.6 JSON Config (declarative)

Define OG images as JSON. `@zyrab/domo-og` is the leading library — WASM-powered, edge-compatible.

```json
{
  "width": 1200, "height": 630,
  "background": "#1a1a2e",
  "elements": [
    { "type": "text", "content": "{{title}}", "fontSize": 60, "color": "#fff" }
  ]
}
```

**When to use**: OG config lives in a CMS, non-developers maintain, simple text-only templates.

## 2. Typography

See **[references/typography.md](references/typography.md)** for the complete OG image typography guide: font philosophy, pairing formulas, type scale (Perfect Fourth 1.333), weight assignments, CJK-specific rules, and line-length constraints.

Key constraints enforced across all styles:
- Minimum font size: 24px at 1200px canvas width
- Title: 56–128px depending on character count and style
- Body/secondary: 28–42px
- Labels/meta: 20–28px
- Chinese titles: ≤20 characters per line
- English titles: ≤15 words per line

## 3. Style System — 6 Visual Styles

See **[references/style-system.md](references/style-system.md)** for the complete design system. Each style defines font rules, color presets, layout recipes, and anti-patterns. Styles are visual stances, not content categories — pick by the feeling you want, not by topic.

| # | Style | Seed template | Tone | Signature look |
|---|-------|--------------|------|----------------|
| 1 | **Terminal / CLI** | [templates/terminal.tsx](templates/terminal.tsx) | Technical, hacker, dev-tool | `$>` prompts, monospace, green-on-black, scanlines |
| 2 | **Magazine Editorial** | [templates/magazine.tsx](templates/magazine.tsx) | Slow, considered, narrative | Serif display, paper tones, large photo well, pull quotes |
| 3 | **Swiss Minimal** | [templates/swiss.tsx](templates/swiss.tsx) | Engineered, quantified, decisive | Inter light display, single accent, hairline rules, left grid |
| 4 | **Pixel Retro** | [templates/pixel.tsx](templates/pixel.tsx) | Playful, nostalgic, indie | Pixel fonts (Press Start 2P), 8-bit palette, chunky borders |
| 5 | **Brutalist** | [templates/brutalist.tsx](templates/brutalist.tsx) | Raw, anti-convention, bold | B&W, max-bold type, no rounded corners, "unfinished" |
| 6 | **Newspaper** | [templates/newspaper.tsx](templates/newspaper.tsx) | Authoritative, timely, dense | Multi-column, serif titles, uppercase labels, dateline |

**Style selection** (used by Agent-Native workflow §1.2):

```
Content tone → Style

Technical, data-rich, comparison → Swiss Minimal or Terminal/CLI
Narrative, brand story, long-form → Magazine Editorial
Dev tool, CLI, API docs           → Terminal/CLI
Game, retro, community            → Pixel Retro
Design-forward, anti-convention   → Brutalist
News, aggregation, time-sensitive → Newspaper
```

## 4. Font Handling

Satori cannot read system fonts — every font must be explicitly loaded. See **[references/font-loading.md](references/font-loading.md)** for loading strategies, CJK subsetting, and edge runtime limits.

```ts
const fonts = [
  { name: 'Inter', data: await loadFont('./Inter-Bold.ttf'), weight: 700 },
  { name: 'Inter', data: await loadFont('./Inter-Regular.ttf'), weight: 400 },
];
```

`next/og` bundles Geist Sans + Geist Mono automatically — no manual loading for Latin text in Next.js.

## 5. Caching Strategy

Content-addressed cache key: `hash(title + style + options)` → immutable cache.

```ts
res.headers.set('Cache-Control', 'public, max-age=604800, immutable');
```

Vercel: 30-day default. Other platforms: set explicitly. For AI-generated images, cache serves same prompt → same image, avoiding re-generation costs.

## 6. Static Fallback

Every page must have a static fallback. Next.js auto-detects `opengraph-image.png` in the app directory.

```tsx
images: [
  { url: `/og?title=${title}`, width: 1200, height: 630 },
  { url: '/opengraph-image.png', width: 1200, height: 630 },
],
```

## 7. Framework Implementations

- **Next.js (App Router)**: `next/og` `ImageResponse`, route at `app/og/route.tsx`
- **Nuxt**: `nuxt-og-image` module, Satori-powered
- **Astro**: `@astrojs/og` or manual Satori + sharp
- **SvelteKit**: Manual Satori in `+server.ts` endpoint
- **Cloudflare Workers**: `workers-og` or Satori + resvg-wasm
- **Generic Node.js**: Build-time batch script

## 8. Common Pitfalls

1. **AI text hallucination**: AI-generated images may garble or misspell text. Always validate. For critical text, use the hybrid approach (AI background + Satori text overlay).
2. **Missing width/height on flex containers**: Satori requires explicit dimensions.
3. **CSS Grid or gap**: Not supported by Satori. Use margin/padding.
4. **No auto text wrapping in Satori**: Split long titles manually.
5. **WASM no background images**: @resvg/resvg-wasm can't load external images.
6. **Font weight mismatch**: Load the exact weight you reference.
7. **CJK characters missing**: Geist/Inter don't include CJK — load a CJK font.
8. **Relative image URLs**: Must be absolute https:// for external platforms.
9. **Over-compression**: Don't quality=60 text-heavy OG images.
10. **No cache strategy**: Re-rendering every request wastes compute.
11. **Generic OG for every page**: The #1 missed opportunity. Use the Agent-native workflow (§1.2).

## 9. Agent YAML Checks

```yaml
checks:
  # P0 — must pass
  - id: dimensions
    description: Image is exactly 1200x630px (1.91:1 ratio)
  - id: text-legibility
    description: Minimum font size >= 24px at 1200px width; title fits safe zone
  - id: absolute-url
    description: Image URL in metadata is absolute (https://) or platform-resolvable
  - id: cache-headers
    description: Response includes Cache-Control with max-age >= 604800

  # P1 — should pass
  - id: static-fallback
    description: Static fallback image (opengraph-image.png) exists
  - id: content-aware
    description: Image reflects page-specific content, not just a title in a template
  - id: style-consistency
    description: All visual elements follow the chosen style's rules
  - id: text-accuracy
    description: All text matches the source — no hallucinated or misspelled text
  - id: ai-hybrid-validation
    description: If using AI generation, text was validated; critical text uses hybrid approach

  # P2 — nice to have
  - id: unique-per-page
    description: Each page has a unique OG image (not site-wide identical)
  - id: dark-mode-friendly
    description: Template has a dark background variant (better on X/Twitter)
```

## 10. Related Skills

These skills are optional — this skill works standalone. Install them if you need additional capabilities:

**Same repo** (always installed together):
- **twitter-card-image-generator**: X/Twitter image generation — same 6 styles, 1200×675px, platform-specific adaptations

**Separate repos** (may or may not be installed):
- **open-graph** (marketing-skills): HTML meta tag configuration for `og:title`, `og:image`, `og:url`, etc. Handles how to SET the image URL; this skill handles how to CREATE the image.
- **twitter-cards** (marketing-skills): HTML meta tag configuration for `twitter:card`, `twitter:site`, `twitter:image`, fallback logic
- **social-share-generator** (marketing-skills): Share button UI that consumes OG/Twitter Card data
- **page-metadata** (marketing-skills): Hreflang, meta robots, other meta tags
