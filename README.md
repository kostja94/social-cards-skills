# Social Card Images for AI Agents

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/kostja94/social-cards-skill)](https://github.com/kostja94/social-cards-skill/stargazers)
[![Last commit](https://img.shields.io/github/last-commit/kostja94/social-cards-skill)](https://github.com/kostja94/social-cards-skill/commits/main)

Programmatic social share image generation for AI agents — OG images (1200×630px, 1.91:1) and Twitter/X Card images (1200×675px, 2:1). 6 visual styles (Terminal, Magazine, Swiss, Pixel, Brutalist, Newspaper), Satori+resvg rendering, AI image generation pipeline, and Agent-Native content-aware workflow. Works with Cursor, Claude Code, and any Agent Skills-compatible platform.

**Created by [Kostja](https://github.com/kostja94)** · Founder of [Alignify](https://alignify.co) · zyjstc@gmail.com

---

## Oginify — SaaS Alternative

Prefer a no-code solution over running agents yourself? **[Oginify](https://oginify.com)** is the SaaS tool I built for the same job — generate OG and Twitter Card images from a visual editor, API, or URL query string. No `npx`, no Satori, no font loading. Choose a style, type your text, and get a production-ready image URL in seconds.

> **Open-source skills** (below) are for teams that want AI agents to programmatically generate images. **Oginify** is for everyone else — marketers, founders, and developers who just need working social cards without infrastructure.

---

## Quick Start

```bash
# Install both skills (og-image-generator + twitter-card-image-generator)
npx skills add kostja94/social-cards-skill

# Install selectively
npx skills add kostja94/social-cards-skill --skill og-image-generator
npx skills add kostja94/social-cards-skill --skill twitter-card-image-generator

# List available
npx skills add kostja94/social-cards-skill --list
```

**Platforms**: Cursor, Claude Code, OpenClaw, Lovable — native or copy to `.cursor/skills/`, `.claude/skills/`, or `.agents/skills/`.

---

## What's Inside

2 skills covering the complete social card image pipeline:

| Skill | Dimensions | Use case |
|-------|-----------|----------|
| **og-image-generator** | 1200×630px (1.91:1) | Facebook, LinkedIn, Slack, Discord, WhatsApp, Telegram, Pinterest, iMessage, QQ |
| **twitter-card-image-generator** | 1200×675px (2:1) | X/Twitter link previews, `summary_large_image` cards, player card posters |

Both skills share the same 6 visual styles, reference documentation, and Satori seed templates — differ only in canvas dimensions and platform-specific adaptations (dark mode, timeline-safe zones, edge masks for X).

---

## 6 Visual Styles

Every style ships with a Satori JSX seed template, color presets, and anti-pattern documentation. Pick by the feeling you want, not by topic.

| # | Style | Tone | Signature look |
|---|-------|------|----------------|
| 1 | **Terminal / CLI** | Technical, hacker, dev-tool | `$>` prompts, monospace, green-on-black, scanlines |
| 2 | **Magazine Editorial** | Slow, considered, narrative | Serif display, paper tones, large photo well, pull quotes |
| 3 | **Swiss Minimal** | Engineered, quantified, decisive | Inter light display, single accent, hairline rules, left grid |
| 4 | **Pixel Retro** | Playful, nostalgic, indie | Pixel fonts (Press Start 2P), 8-bit palette, chunky borders |
| 5 | **Brutalist** | Raw, anti-convention, bold | B&W, max-bold type, no rounded corners, asymmetric blocks |
| 6 | **Newspaper** | Authoritative, timely, dense | Multi-column, serif titles, uppercase labels, dateline |

**Style selection guide**:

| Content tone | Recommended style |
|--------------|-------------------|
| Technical, data-rich, comparison | Swiss Minimal or Terminal/CLI |
| Narrative, brand story, long-form | Magazine Editorial |
| Dev tool, CLI, API docs | Terminal/CLI |
| Game, retro, community | Pixel Retro |
| Design-forward, anti-convention | Brutalist |
| News, aggregation, time-sensitive | Newspaper |

---

## Generation Approaches

Each skill covers 6 fundamentally different ways to produce a social card image:

| # | Approach | Best for |
|---|----------|----------|
| 1 | **AI Image Generation** | Visual-first pages; hybrid strategy (AI background + Satori text overlay) for pixel-perfect typography |
| 2 | **Agent-Native Content-Aware Workflow** | Extracts meaning from page content, matches style, picks generation method automatically |
| 3 | **Satori + resvg** | Code-based, text-precise, Edge-compatible (Next.js, Cloudflare Workers) |
| 4 | **Puppeteer / Playwright** | Complex CSS Grid layouts, Canvas charts, WebGL backgrounds |
| 5 | **Managed Services** | OG Kit, Cloudinary, Vercel OG, imgix — no rendering pipeline to maintain |
| 6 | **JSON Config** | Declarative config in CMS, non-developer maintainable |

**AI tools compared**: GPT Image 2.0, Flux (Black Forest Labs), Nano Banana, DALL-E 3, Midjourney — with text accuracy, aesthetic quality, speed, and Chinese text support benchmarks.

---

## Templates & Frameworks

Production-ready seed templates included:

| Template | Framework | Styles |
|----------|-----------|--------|
| `og-image-generator/templates/nextjs-route.tsx` | Next.js App Router | All 6 — OgSwitchboard dispatches via `?style=` query param |
| `og-image-generator/templates/nuxt.vue` | Nuxt 3 (nuxt-og-image) | Swiss Minimal example; all 6 adaptable |
| `og-image-generator/templates/nodejs-generic.ts` | Generic Node.js (batch) | Swiss Minimal plain-object format; all 6 adaptable |
| `twitter-card-image-generator/templates/twitter-nextjs-route.tsx` | Next.js App Router | All 6 — Twitter-adapted with dark mode defaults, 20px edge mask, upper-60% content zone |

Each style also has a standalone Satori JSX seed template in `og-image-generator/templates/{style}.tsx` for copying into any project.

---

## Related Repositories

These are optional — this repo works standalone. Install them for the full social sharing pipeline:

- **[marketing-skills](https://github.com/kostja94/marketing-skills)** — SEO meta tag configuration. Contains `open-graph` (SET `og:image` tags), `twitter-cards` (SET `twitter:image` tags), and `social-share-generator` (share button UI). This repo handles how to CREATE the image; marketing-skills handles how to SET the tag.

---

## Docs & References

| Doc | Purpose |
|-----|---------|
| [typography](og-image-generator/references/typography.md) | Type scale, font pairing formulas, CJK rules |
| [style-system](og-image-generator/references/style-system.md) | Full design system — color presets, layout recipes, anti-patterns per style |
| [font-loading](og-image-generator/references/font-loading.md) | Satori font strategies, CJK subsetting, edge runtime limits |
| [satori-constraints](og-image-generator/references/satori-constraints.md) | Satori CSS subset — unsupported properties, workarounds |
| [twitter-specific](twitter-card-image-generator/references/twitter-specific.md) | X platform design adaptations, dark mode, timeline crops |

**Ecosystem**: [Agent Skills Specification](https://agentskills.io/specification) | [skills.sh](https://skills.sh) | [Vercel skills CLI](https://github.com/vercel-labs/skills)

---

## License

[MIT](LICENSE)
