---
name: og-image-generator
description: Generate Open Graph images for social sharing previews across Facebook, LinkedIn, Slack, Discord, WhatsApp, Telegram, Pinterest, iMessage, and QQ. Use when the user mentions "OG image," "og:image," "Open Graph image," "social share image," "link preview image," "generate OG image," "dynamic og image," "social card image," "programmatic og," or "auto-generate social images." Core approaches; AI image generation (Nano Banana, GPT Image, Flux), Agent-native content-aware workflow with page priority (S/A/B/C), Satori+resvg pipeline, Puppeteer. Supports dual pipeline (Satori for layout styles, AI for texture styles, Hybrid for best quality). Covers 16 visual styles across 10 layout-type (Satori-native) and 6 texture-type (AI/hybrid). For Twitter-specific image generation, use twitter-card-image-generator.
license: MIT
compatibility: Requires Node.js for Satori/resvg templates. Next.js, Nuxt, or Cloudflare Workers recommended for code-based generation. AI generation requires external image API access. Hybrid pipeline requires both.
metadata:
  version: 3.0.0
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

### 1.2 Agent-Native Content-Aware Workflow v3 (Core #2)

This is not a rendering technology — it's a **9-step decision-making workflow**. The Agent classifies the page, determines priority (S/A/B/C), matches style using a 3D matrix, selects the right pipeline, and drives generation end-to-end.

**PHASE 1 — Classify & Decide (NEW in v3)**

```
1. CLASSIFY THE PAGE
   → Determine page type from URL pattern + content signals:
     /blog/*, /post/* → blog_post
     /pricing → pricing
     /docs/* → docs
     (Full taxonomy: references/content-strategy.md — 100+ types in 13 categories)
   
   → Detect site type:
     Has pricing/feature/SaaS → SaaS
     Has product grid/cart → eCommerce
     Has byline/reading time → Content/Media
     (Full taxonomy: references/content-strategy.md — 35 types)

2. DETERMINE PRIORITY (NEW)
   → Query content-strategy.md S/A/B/C table:
     S (Must-do): blog_post, changelog, research_report, campaign_landing...
     A (High): homepage, pricing, feature_page, comparison, event_page...
     B (Medium): about, docs, author_page, category, integration...
     C (Skip): login, cart, checkout, dashboard, privacy, terms, 404, contact...
   
   → IF C-level: STOP. Report "This page type rarely gets shared. Use one brand-default
     1200×630 image instead. Proceed anyway? [y/N]"
   → IF B-level: If >5 B pages → template batch strategy. If ≤5 → treat as A.
   → IF A/S-level: Continue to full workflow.

3. EXTRACT CONTENT WITH CONTEXT (enhanced)
   → Extract: title (1-2 lines), subtitle, THE ONE most interesting data point,
     date, author, category tags, hero image URL, brand colors, content tone
     (technical/narrative/data_heavy/playful/urgent/premium/raw)
   → Output: ContentProfile { title, subtitle, dataPoint, meta, visualCandidates, tone }
```

**PHASE 2 — Match Style & Build Recipe (enhanced)**

```
4. MATCH STYLE (3D multi-axis, replacing old tone-only mapping)
   → Call selectStyle(pageType, siteType, contentTone)
     Algorithm in references/style-system-v3.md §Style Selection Algorithm
   → Uses 16×100 page-type matrix + 16×35 site-type matrix
   → Output: { primary, variants[2-3], avoid[] }
   
   Example: SaaS pricing page → Swiss Minimal (score:7), Neo-Swiss Gradient (5), Bento Grid (4)
            Avoid: Grunge, Vaporwave, Pixel Retro

5. BUILD VISUAL RECIPE (NEW)
   → For the selected (style, pageType) combo, query style-system-v3.md:
     - Required elements (must_include)
     - Recommended elements (adds value)
     - Forbidden patterns (style-breaking)
     - Layout wireframe (ASCII)
     - Color preset
     - Font config
     - Agent check checklist
   → Output: VisualRecipe

6. SELECT PIPELINE (NEW — dual pipeline decision)
   → Satori pipeline (layout styles #1-10): zero cost, instant, text-perfect
   → AI pipeline (texture styles #11-16): ~$0.067/img, 5-15s, visual quality
   → Hybrid (AI bg + Satori text): best quality + perfect text accuracy
   → Decision tree: references/pipeline-guide.md
```

**PHASE 3 — Generate & Validate**

```
7. GENERATE
   → If Satori: copy seed template from templates/{style}.tsx, fill with ContentProfile
   → If AI: build prompt from VisualRecipe.aiPromptTemplate, call AI model
   → If Hybrid: AI generates background → Satori overlays text from ContentProfile

8. VALIDATE (enhanced)
   → Run pre_flight checks (§9): page classification, priority, pipeline choice
   → Run style-specific checks from VisualRecipe.agentChecks
   → Run standard Agent YAML checks (§9)

9. SUGGEST NEXT ACTIONS (NEW)
   → If ≥2 variants generated: "These styles differ enough for A/B testing"
   → If S-level page: "Consider regenerating when content updates"
   → Deployment path: WordPress(Featured Image), Next.js(opengraph-image.png), etc.
```

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

### 1.7 Page Priority Decision (NEW in v3)

The FIRST question is not "what style?" but "**should I generate at all?**"

**Decision flow**:
```
Classify page type (100+ types, see content-strategy.md §2)
  → S-level: blog_post, changelog, research_report, campaign_landing, newsletter_issue...
  → A-level: homepage, pricing, feature_page, comparison, event_page, product_detail, waitlist...
  → B-level: about, docs, author_page, category, integration, template, tutorial, podcast...
  → C-level: login, signup, cart, checkout, dashboard, billing, privacy, terms, 404, contact...

IF C-level → STOP. Suggest one brand-default 1200×630 image for entire site.
IF B-level AND site has >5 B pages → recommend template batch strategy.
IF A/S-level → proceed with full content-aware workflow (§1.2).
```

**Platform built-in OG check**: Before generating, verify the user's platform doesn't already auto-generate adequate OG images. Platforms with built-in OG: Vercel, Next.js (ImageResponse), WordPress (Jetpack), Ghost, Substack, Medium, GitHub, Framer, Webflow, Notion, Dev.to, Hashnode. If the platform's built-in OG is good enough → skip. If not → generate.

**Site-type priority modifier**: Content/Media, News, DevTool, Personal/Portfolio sites → boost all B-level pages to A (their traffic relies on social sharing). Healthcare, Government, FinTech → suppress aggressive styles.

See **[references/content-strategy.md](references/content-strategy.md)** for the full priority framework.

### 1.8 Pipeline Selection (NEW in v3)

Two rendering pipelines, chosen based on the selected style:

| Pipeline | Styles | Speed | Cost | Text Accuracy | Best For |
|----------|--------|-------|------|---------------|----------|
| **Satori** | #1-10 (layout styles) | 100-500ms | $0 | 100% perfect | Swiss, Terminal, Brutalist, Neo-Brutalism, Bento, Newspaper... |
| **AI** | #11-16 (texture styles) | 5-15s | ~$0.067/img | ~80-95% | Text Overlay, Cinematic, Collage, Risograph, Vaporwave, Grunge |
| **Hybrid** | #11-16 recommended | 5-15s | ~$0.067/img | 100% perfect | AI generates background/texture → Satori overlays pixel-perfect text |

**Decision rule**: See **[references/pipeline-guide.md](references/pipeline-guide.md)** for the complete decision tree, AI prompt templates per style, and hybrid implementation patterns.

**Hybrid is the default recommendation** for all texture styles (#11-16) when CJK text or product names must be exact. AI generates the atmosphere/photo/texture; Satori renders the text — combining AI's visual quality with code's text precision.

## 2. Typography

See **[references/typography.md](references/typography.md)** for the complete OG image typography guide: font philosophy, pairing formulas, type scale (Perfect Fourth 1.333), weight assignments, CJK-specific rules, and line-length constraints.

Key constraints enforced across all styles:
- Minimum font size: 24px at 1200px canvas width
- Title: 56–128px depending on character count and style
- Body/secondary: 28–42px
- Labels/meta: 20–28px
- Chinese titles: ≤20 characters per line
- English titles: ≤15 words per line

## 3. Style System — 20 Visual Styles

See **[references/style-system-v3.md](references/style-system-v3.md)** for the complete design system with 20 styles, pipeline compatibility, style×page-type matrix (20×100), and style×site-type matrix (20×35). The legacy [references/style-system.md](references/style-system.md) is retained for reference on original 6 styles.

### Layout-Type Styles (Satori-Native, #1-10)

Zero-cost, instant rendering, 100% text accuracy.

| # | Style | Template | Pipeline | Signature |
|---|-------|----------|----------|-----------|
| 1 | **Terminal / CLI** | [terminal.tsx](templates/terminal.tsx) | Satori | `$>` prompts, monospace, green-on-black |
| 2 | **Magazine Editorial** | [magazine.tsx](templates/magazine.tsx) | Satori | Serif display, paper tones, pull quotes |
| 3 | **Swiss Minimal** | [swiss.tsx](templates/swiss.tsx) | Satori | Inter light, single accent, left grid |
| 4 | **Pixel Retro** | [pixel.tsx](templates/pixel.tsx) | Satori | Press Start 2P, 8-bit palette, HUD |
| 5 | **Brutalist** | [brutalist.tsx](templates/brutalist.tsx) | Satori | B&W, max-bold, zero radius |
| 6 | **Newspaper** | [newspaper.tsx](templates/newspaper.tsx) | Satori | Multi-column, serif titles, dateline |
| 7 | **Neo-Brutalism** | [neo-brutalism.tsx](templates/neo-brutalism.tsx) | Satori | Clash colors, 6px borders, hard shadow |
| 8 | **Bento Grid** | [bento-grid.tsx](templates/bento-grid.tsx) | Satori | Asymmetric cards, dark glow, 14px radius |
| 9 | **Neo-Swiss Gradient** | [neo-swiss-gradient.tsx](templates/neo-swiss-gradient.tsx) | Satori | Warm gradient, Inter 200, hairline rules |
| 10 | **Dark Gradient+Texture** | [dark-gradient-texture.tsx](templates/dark-gradient-texture.tsx) | Satori | Radial glow, dot-grid, glowing line |

### Texture-Type Styles (AI/Hybrid, #11-16)

Require AI for full effect. Hybrid (AI bg + Satori text) recommended for text accuracy.

| # | Style | Template | Pipeline | Signature |
|---|-------|----------|----------|-----------|
| 11 | **Text Overlay** | [text-overlay-hybrid.tsx](templates/text-overlay-hybrid.tsx) | Hybrid | Photo bg + dark mask + bold white title |
| 12 | **Cinematic** | [cinematic.tsx](templates/cinematic.tsx) | AI+Hybrid | Film grading, bokeh, grain, lower-third title |
| 13 | **Collage** | [collage.tsx](templates/collage.tsx) | AI+Hybrid | Torn edges, tape, polaroids, layered panels |
| 14 | **Risograph** | [risograph.tsx](templates/risograph.tsx) | AI+Hybrid | 2-3 colors, halftone dots, ink offset |
| 15 | **Vaporwave** | [vaporwave.tsx](templates/vaporwave.tsx) | AI+Hybrid | Neon sunset, statues, CRT scanlines, glitch |
| 16 | **Grunge** | [grunge.tsx](templates/grunge.tsx) | AI-Native | Noise grain, photocopy texture, distressed |

### AI-Native Styles (#17-20 — Pure AI, No Satori)

These styles are **AI-only**: the model generates the complete image with text built in. No Satori template, no Hybrid step. One prompt, one image.

| # | Style | Template | Pipeline | Signature |
|---|-------|----------|----------|-----------|
| 17 | **AI Painterly** | [ai-painterly.tsx](templates/ai-painterly.tsx) | AI-Native | Watercolor/oil/ink — text is painted, not typeset |
| 18 | **Abstract Gradient** | [abstract-gradient.tsx](templates/abstract-gradient.tsx) | AI-Native | Zero text. Pure color field. Rothko-esque |
| 19 | **AI Sticker/Badge** | [ai-sticker.tsx](templates/ai-sticker.tsx) | AI-Native | 1-3 word badge floating on atmospheric bg |
| 20 | **AI Infographic** | [ai-infographic.tsx](templates/ai-infographic.tsx) | AI-Native | Editorial data art — visual comparisons, not precise charts |

**Style selection** (used by Agent-Native workflow §1.2 step 4):

The Agent now uses a 3D matrix (page_type × site_type × content_tone) instead of simple tone-only mapping. The full algorithm is in [references/style-system-v3.md](references/style-system-v3.md) §Style Selection Algorithm. Quick reference:

| Content Tone | Top 3 Styles |
|-------------|-------------|
| Technical, data-heavy | Swiss, Dark Gradient, Terminal |
| Narrative, brand story | Magazine, Cinematic, Neo-Swiss Gradient |
| Dev tool, CLI, API | Terminal, Dark Gradient, Neo-Brutalism |
| Design-forward, bold | Neo-Brutalism, Brutalist, Collage |
| News, timely, dense | Newspaper, Text Overlay, Bento Grid |
| Playful, retro, indie | Pixel, Vaporwave, Collage |
| Premium, refined | Cinematic, Neo-Swiss Gradient, Magazine |
| Raw, anti-convention | Grunge, Risograph, Brutalist |

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
pre_flight:  # NEW in v3 — run before generation
  - id: page-classification
    description: Page type identified from URL pattern + content signals (content-strategy.md §2)
  - id: priority-determination
    description: S/A/B/C level assigned. C-level pages should NOT use custom generation.
  - id: site-type-detection
    description: Site type inferred from content, title patterns, and business signals
  - id: c-level-gate
    description: If C-level, agent has warned user and confirmed before proceeding
  - id: platform-built-in-check
    description: Verified user's platform does not already auto-generate adequate OG images
  - id: pipeline-choice
    description: Correct pipeline selected (Satori for #1-10, Hybrid for #11-16)

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
    description: All visual elements follow the chosen style's rules (see style-system-v3.md per-style agent checks)
  - id: text-accuracy
    description: All text matches the source — no hallucinated or misspelled text
  - id: ai-hybrid-validation
    description: If using AI generation, text was validated; critical text uses hybrid approach
  - id: pipeline-appropriate
    description: Generated image quality matches pipeline expectations (Satori=sharp text, AI=visual richness, Hybrid=both)

  # P2 — nice to have
  - id: unique-per-page
    description: Each page has a unique OG image (not site-wide identical)
  - id: dark-mode-friendly
    description: Template has a dark background variant (better on X/Twitter)
  - id: ab-test-ready
    description: If ≥2 style variants generated, styles differ enough for meaningful A/B testing
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
