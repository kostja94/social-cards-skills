# Social Card Images for AI Agents

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/kostja94/social-cards-skills)](https://github.com/kostja94/social-cards-skills/stargazers)
[![Last commit](https://img.shields.io/github/last-commit/kostja94/social-cards-skills)](https://github.com/kostja94/social-cards-skills/commits/main)

Programmatic social share image generation for AI agents — OG images (1200×630px, 1.91:1) and Twitter/X Card images (1200×675px, 2:1). **16 visual styles** across dual pipelines (Satori layout + AI/Hybrid texture), Agent-Native v3 content-aware workflow with page priority (S/A/B/C), 100+ page type classification, and 35 site type profiles. Works with Cursor, Claude Code, and any Agent Skills-compatible platform.

**Created by [Kostja](https://github.com/kostja94)** · Founder of [Alignify](https://alignify.co) · zyjstc@gmail.com

---

## Oginify — SaaS Alternative

Prefer a no-code solution over running agents yourself? **[Oginify](https://oginify.com)** is the SaaS tool I built for the same job — generate OG and Twitter Card images from a visual editor, API, or URL query string. No `npx`, no Satori, no font loading. Choose a style, type your text, and get a production-ready image URL in seconds.

> **Open-source skills** (below) are for teams that want AI agents to programmatically generate images. **Oginify** is for everyone else — marketers, founders, and developers who just need working social cards without infrastructure.

---

## Quick Start

```bash
# Install both skills (og-image-generator + twitter-card-image-generator)
npx skills add kostja94/social-cards-skills

# Install selectively
npx skills add kostja94/social-cards-skills --skill og-image-generator
npx skills add kostja94/social-cards-skills --skill twitter-card-image-generator

# List available
npx skills add kostja94/social-cards-skills --list
```

**Platforms**: Cursor, Claude Code, OpenClaw, Lovable — native or copy to `.cursor/skills/`, `.claude/skills/`, or `.agents/skills/`.

---

## What's Inside

2 skills covering the complete social card image pipeline:

| Skill | Dimensions | Use case |
|-------|-----------|----------|
| **og-image-generator** | 1200×630px (1.91:1) | Facebook, LinkedIn, Slack, Discord, WhatsApp, Telegram, Pinterest, iMessage, QQ |
| **twitter-card-image-generator** | 1200×675px (2:1) | X/Twitter link previews, `summary_large_image` cards, player card posters |

Both skills share the same 16 visual styles, reference documentation, and templates — differ only in canvas dimensions and platform-specific adaptations.

---

## 16 Visual Styles + Dual Pipeline

Every style ships with a seed template (Satori JSX and/or AI prompt + hybrid overlay), color presets, and anti-patterns.

### Layout-Type (Satori Pipeline — zero cost, instant, text-perfect)

| # | Style | Tone | Signature |
|---|-------|------|-----------|
| 1 | **Terminal / CLI** | Technical, hacker | `$>` prompts, monospace, green-on-black |
| 2 | **Magazine Editorial** | Narrative, considered | Serif display, paper tones, pull quotes |
| 3 | **Swiss Minimal** | Engineered, data-driven | Inter light, single accent, left grid |
| 4 | **Pixel Retro** | Playful, nostalgic | Press Start 2P, 8-bit palette, HUD |
| 5 | **Brutalist** | Raw, anti-convention | B&W only, max-bold, zero radius |
| 6 | **Newspaper** | Authoritative, dense | Multi-column, serif titles, dateline |
| 7 | **Neo-Brutalism** | Loud, clashing | High-sat colors, 6px borders, hard shadows |
| 8 | **Bento Grid** | Modular, structured | Asymmetric cards, dark glow, 14px radius |
| 9 | **Neo-Swiss Gradient** | Refined, warm | Warm gradient, Inter 200, hairline rules |
| 10 | **Dark Gradient+Texture** | Atmospheric, technical | Radial glow, dot-grid, glowing line |

### Texture-Type (AI/Hybrid Pipeline — visual richness, hybrid text accuracy)

| # | Style | Tone | Signature |
|---|-------|------|-----------|
| 11 | **Text Overlay** | Photographic, immersive | Photo bg + dark mask + bold white title |
| 12 | **Cinematic** | Emotional, premium | Film grading, bokeh, grain, lower-third title |
| 13 | **Collage** | Handmade, creative | Torn edges, tape, polaroids, layered panels |
| 14 | **Risograph** | Artisanal, indie | 2-3 colors, halftone dots, ink offset |
| 15 | **Vaporwave** | Retro-futurist, ironic | Neon sunset, statues, CRT scanlines, glitch |
| 16 | **Grunge** | Raw, distressed | Noise grain, photocopy texture, faded B&W |

### AI-Native Styles (#17-20 — Pure AI, zero Satori)

| # | Style | Tone | Signature |
|---|-------|------|-----------|
| 17 | **AI Painterly** | Artistic, handcrafted | Watercolor/oil/ink — title is painted into the artwork |
| 18 | **Abstract Gradient** | Pure visual, meditative | Zero text. Fluid color fields. Rothko-esque |
| 19 | **AI Sticker/Badge** | Punchy, pop, modern | 1-3 word badge, 3D depth, atmospheric bg |
| 20 | **AI Infographic** | Data-driven, editorial | Visual comparisons, big numbers, data art |

**Pipeline**: Satori (#1-10) for layout-driven styles. AI-Native (#11-20) for texture/visual-driven styles — one prompt, one image, modern models handle text reliably. Hybrid (AI bg + Satori text) available as fallback for zero-tolerance text accuracy. See [pipeline-guide](og-image-generator/references/pipeline-guide.md).

---

## Generation Approaches

Each skill covers 6 fundamentally different ways to produce a social card image, plus a dual-pipeline decision system (Satori vs AI vs Hybrid):

| # | Approach | Best for |
|---|----------|----------|
| 1 | **AI Image Generation** | Visual-first pages; hybrid strategy (AI background + Satori text overlay) for pixel-perfect typography |
| 2 | **Agent-Native v3 Workflow** | Classifies page (100+ types), determines priority (S/A/B/C), matches style via 3D matrix, selects pipeline |
| 3 | **Satori + resvg** | Code-based, text-precise, Edge-compatible — for all layout styles (#1-10) |
| 4 | **Hybrid Pipeline** | AI generates background/texture → Satori overlays pixel-perfect text — for texture styles (#11-16) |
| 5 | **Puppeteer / Playwright** | Complex CSS Grid layouts, Canvas charts, WebGL backgrounds |
| 6 | **Managed Services / JSON Config** | OG Kit, Cloudinary, Vercel OG, imgix; or declarative JSON config |

**AI tools compared**: GPT Image 2.0, Flux (Black Forest Labs), Nano Banana, DALL-E 3, Midjourney — with text accuracy, aesthetic quality, speed, and Chinese text support benchmarks.

---

## Templates & Frameworks

Production-ready seed templates included:

| Template | Framework | Styles |
|----------|-----------|--------|
| `og-image-generator/templates/nextjs-route.tsx` | Next.js App Router | All 16 — OgSwitchboard dispatches via `?style=` query param |
| `og-image-generator/templates/nuxt.vue` | Nuxt 3 (nuxt-og-image) | Swiss Minimal example; all 16 adaptable |
| `og-image-generator/templates/nodejs-generic.ts` | Generic Node.js (batch) | Swiss Minimal plain-object format; all 16 adaptable |
| `twitter-card-image-generator/templates/twitter-nextjs-route.tsx` | Next.js App Router | All 16 — Twitter-adapted with dark mode defaults, 20px edge mask, upper-60% content zone |

Each style has a standalone seed template in `og-image-generator/templates/{style}.tsx` — Satori JSX for layout styles (#1-10) and AI prompt + Satori text overlay for texture styles (#11-16).

---

## Optional X/Twitter Source Evidence

When a card promotes a post, launch, incident note, or community thread on
X/Twitter, start from reviewed source evidence instead of inventing the copy. A
TweetClaw export can provide public tweet text, author handles, timestamps,
URLs, and engagement context that the agent can turn into a card-safe headline,
subtitle, and visual prompt.

Use source evidence only as input for image copy:

1. Export or paste the reviewed TweetClaw JSON/JSONL rows into the agent
   context.
2. Extract one message, one proof point, and one canonical URL.
3. Generate the Twitter Card image with `twitter-card-image-generator`.
4. Review the final image text before publishing the page or post that uses it.

TweetClaw account actions, posting, replies, DMs, monitors, and webhooks remain
outside this image-generation skill. Keep those actions in TweetClaw or
OpenClaw approval flow.

---

## Related Repositories

These are optional — this repo works standalone. Install them for the full social sharing pipeline:

- **[marketing-skills](https://github.com/kostja94/marketing-skills)** — SEO meta tag configuration. Contains `open-graph` (SET `og:image` tags), `twitter-cards` (SET `twitter:image` tags), and `social-share-generator` (share button UI). This repo handles how to CREATE the image; marketing-skills handles how to SET the tag.

---

## Docs & References

| Doc | Purpose |
|-----|---------|
| [content-strategy](og-image-generator/references/content-strategy.md) | 100+ page types S/A/B/C, 35 site types, priority decision framework |
| [style-system-v3](og-image-generator/references/style-system-v3.md) | Full 20-style design system, pipeline compatibility, style×page-type and style×site-type matrices |
| [pipeline-guide](og-image-generator/references/pipeline-guide.md) | Dual pipeline decision tree, Satori vs AI vs Hybrid, prompt templates |
| [style-system](og-image-generator/references/style-system.md) | Original 6-style design system (legacy, retained for reference) |
| [typography](og-image-generator/references/typography.md) | Type scale, font pairing formulas, CJK rules |
| [font-loading](og-image-generator/references/font-loading.md) | Satori font strategies, CJK subsetting, edge runtime limits |
| [satori-constraints](og-image-generator/references/satori-constraints.md) | Satori CSS subset — unsupported properties, workarounds |
| [twitter-specific](twitter-card-image-generator/references/twitter-specific.md) | X platform design adaptations, dark mode, timeline crops |

**Ecosystem**: [Agent Skills Specification](https://agentskills.io/specification) | [skills.sh](https://skills.sh) | [Vercel skills CLI](https://github.com/vercel-labs/skills)

---

## License

[MIT](LICENSE)
