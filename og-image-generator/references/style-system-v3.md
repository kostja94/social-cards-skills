# OG Image Style System v3 — 20 Visual Styles

> **用途**：Agent 的风格决策引擎——风格定义、管线兼容性、匹配矩阵、决策算法。
> **继承**：Styles #1-6 定义自 [style-system.md](./style-system.md)（保留完整定义）。
> **引用**：[content-strategy.md](./content-strategy.md) | [pipeline-guide.md](./pipeline-guide.md) | [SKILL.md](../SKILL.md)

---

## Style Index & Pipeline Compatibility

| # | Style | Satori | AI | Recommended Pipeline | Type |
|---|-------|:---:|:---:|---------------------|------|
| 1 | Swiss Minimal | ✅ | ✅ | **Satori** | Layout |
| 2 | Magazine Editorial | ✅ | ✅ | **Satori** | Layout |
| 3 | Terminal / CLI | ✅ | ✅ | **Satori** | Layout |
| 4 | Pixel Retro | ✅ | ✅ | **Satori** | Layout |
| 5 | Brutalist | ✅ | ✅ | **Satori** | Layout |
| 6 | Newspaper | ✅ | ✅ | **Satori** | Layout |
| 7 | Neo-Brutalism | ✅ | ✅ | **Satori** | Layout |
| 8 | Bento Grid | ✅ | ✅ | **Satori** | Layout |
| 9 | Neo-Swiss Gradient | ✅ | ✅ | **Satori** | Layout |
| 10 | Dark Gradient + Texture | ✅ | ✅ | **Satori** | Layout |
| 11 | Text Overlay | ⚠️ | ✅ | **AI优先** + hybrid | Texture |
| 12 | Cinematic | ❌ | ✅ | **AI only** + hybrid text | Texture |
| 13 | Collage | ⚠️ | ✅ | **AI优先** + hybrid | Texture |
| 14 | Risograph | ❌ | ✅ | **AI only** + hybrid text | Texture |
| 15 | Vaporwave | ❌ | ✅ | **AI only** + hybrid text | Texture |
| 16 | Grunge | ❌ | ✅ | **AI-Native** | Texture |
| 17 | AI Painterly | ❌ | ✅ | **AI-Native** | Artistic |
| 18 | Abstract Gradient | ❌ | ✅ | **AI-Native** | Visual |
| 19 | AI Sticker/Badge | ❌ | ✅ | **AI-Native** | Graphic |
| 20 | AI Infographic | ❌ | ✅ | **AI-Native** | Data |

> **Satori** (排版型, #1-10): 纯 Flexbox 布局, 文字 100% 准确, 毫秒级, 零成本。
> **AI-Native** (原生型, #11-20): AI 一次出图——文字+视觉融合在一个 prompt 里。Gemini 3.1 / GPT Image 2 / Flux 的文字生成已足够可靠。Hybrid 仅为文字零容忍场景的 fallback。

---

## Styles #1-6 (Existing — see style-system.md for full definitions)

Brief summaries for matrix reference:

| # | Style | Key Visual Signature | Font | Template |
|---|-------|---------------------|------|----------|
| 1 | Swiss Minimal | Light Inter display, single accent, left grid, hairline rules | Inter 200-400 | [swiss.tsx](../templates/swiss.tsx) |
| 2 | Magazine Editorial | Serif display, paper tones, photo well, pull quotes | Playfair Display | [magazine.tsx](../templates/magazine.tsx) |
| 3 | Terminal/CLI | `$>` prompts, monospace, green-on-black, scanlines | JetBrains Mono | [terminal.tsx](../templates/terminal.tsx) |
| 4 | Pixel Retro | Press Start 2P, 8-bit palette, chunky borders, HUD elements | Press Start 2P | [pixel.tsx](../templates/pixel.tsx) |
| 5 | Brutalist | B&W only, max-bold, zero border-radius, asymmetric | Inter 800-900 | [brutalist.tsx](../templates/brutalist.tsx) |
| 6 | Newspaper | Multi-column, serif titles, uppercase labels, dateline | Source Serif | [newspaper.tsx](../templates/newspaper.tsx) |

---

## Style #7: Neo-Brutalism

**Visual anchors (non-negotiable)**:
- 2-3 high-saturation clashing colors (bright yellow #FFD700, red #FF3B30, blue #0066FF) + black + white
- Ultra-thick black borders (4-6px solid #000) around main content blocks
- Hard shadows (offset 8px 8px 0 #000, no blur)
- Oversized sans-serif bold title (Inter 800-900, 72-128px)
- Zero gradients, zero border-radius (all 0px)
- Visible grid lines or background dot pattern (optional)

**Font rules**:
- Title: Inter Black (900), 72-128px, letter-spacing -0.04em
- Subtitles: Inter Bold (700), 28-36px
- Labels/tags: Inter Bold (700), 20-26px

**Color presets**:
| Preset | Background | Text | Accent |
|--------|-----------|------|--------|
| Yellow Pop | `#FFD700` | `#000000` | `#FFFFFF` |
| Red Alert | `#FF3B30` | `#FFFFFF` | `#000000` |
| Blue Blast | `#0066FF` | `#FFFFFF` | `#FFD700` |
| Lime Punch | `#00FF41` | `#000000` | `#FF006E` |

**Layout recipe**:
```
┌─────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────┐ │ ← 6px solid black border
│ │                                         │ │
│ │  BEST AI IMAGE                          │ │   白底黑字 或 黄底黑字
│ │  GENERATORS                             │ │   标题, Inter 900, 88px
│ │                                         │ │
│ │  ┌──────────┐ ┌──────────┐ ┌────────┐ │ │   黑底白字标签
│ │  │ FLUX 9.2 │ │MIDJRNY 9│ │DALL·E  │ │ │
│ │  └──────────┘ └──────────┘ └────────┘ │ │
│ └─────────────────────────────────────────┘ │
│          ┌─────────────┐ ┌───────────────┐  │   硬阴影 offset 8px 8px 0 #000
│          │yoursite.com │ │ 2026 REPORT   │  │
│          └─────────────┘ └───────────────┘  │
└─────────────────────────────────────────────┘
```

**vs Brutalist (#5)**: Brutalist = black+white only. Neo-Brutalism = clashing high-saturation colors.
**vs Swiss (#1)**: Swiss = restrained, engineered. Neo-Brutalism = loud, anti-convention.

**Agent checks**:
- [ ] 2-3 high-saturation colors used (at least 1 non-black/white)
- [ ] Black borders ≥4px solid
- [ ] Title weight ≥800
- [ ] Zero gradients, zero border-radius
- [ ] Hard shadow present (offset, no blur)

**Satori template**: [neo-brutalism.tsx](../templates/neo-brutalism.tsx)
**Best pages**: launch_announcement, campaign_landing, deal_promotion, waitlist, event_page
**Best sites**: SaaS (campaign), Gaming, Events, AI/ML, Crypto/Web3

---

## Style #8: Bento Grid

**Visual anchors (non-negotiable)**:
- Asymmetric card grid (like a bento box) — 3-6 cards of varying sizes
- Uniform gap between cards (12-20px)
- Each card has independent background (dark mode: dark gray + brand accent)
- Main card (largest area) holds the title
- Secondary cards hold data points, tags, domain
- Dark or light unified background behind the grid
- Rounded corners 12-16px (the ONLY rounded-corner style)
- Subtle inner glow or light edge on cards (dark mode)

**Font rules**:
- Title card: Inter Bold (700), 48-64px
- Data cards: Inter SemiBold (600), 28-40px
- Labels: Inter Medium (500), 18-22px
- Domain card: Inter Regular (400), 20-24px

**Color presets**:
| Preset | Base BG | Card BG | Accent |
|--------|---------|---------|--------|
| Dark Tech | `#0a0a0a` | `#1a1a1a`, `#222` | `#3b82f6` |
| Warm Dark | `#0f0f0f` | `#1c1c1c`, `#252525` | `#f59e0b` |
| Light Clean | `#f5f5f5` | `#fff`, `#fafafa` | `#0066ff` |
| Brand Pop | `#fafafa` | `#fff`, brand-light | brand-primary |

**Layout recipe (5-card)**:
```
┌──────────────────────────────────────────────┐
│ ┌────────────────────┐ ┌──────────────────┐  │
│ │                    │ │  ★ 9.2/10       │  │ Card 2 (small): rating
│ │  BEST AI IMAGE     │ │  Visual Quality  │  │
│ │  GENERATORS 2026   │ └──────────────────┘  │ Card 1 (large): title
│ │                    │ ┌──────────────────┐  │
│ │  A comprehensive   │ │  GPT Image 2.0   │  │ Card 3 (small): badge
│ └────────────────────┘ └──────────────────┘  │
│ ┌──────────────────┐ ┌────────────────────┐  │
│ │  FLUX  MIDJOURNEY│ │                    │  │ Card 5 (medium): domain
│ │  Speed  Quality  │ │  yoursite.com      │  │
│ └──────────────────┘ └────────────────────┘  │ Card 4 (medium-long): data
└──────────────────────────────────────────────┘
```

**Agent checks**:
- [ ] 3-6 cards, sizes are asymmetric (not all equal)
- [ ] Main card has largest area, holds title
- [ ] Gap between cards uniform (12-20px)
- [ ] Dark base + cards slightly lighter than base (or light base + cards white)
- [ ] Border-radius 12-16px

**Satori template**: [bento-grid.tsx](../templates/bento-grid.tsx)
**Best pages**: product_collection, category_page, hub_topic, feature_page, portfolio, use_case_page
**Best sites**: SaaS, DevTool, Design Tools, AI/ML, eCommerce

---

## Style #9: Neo-Swiss Gradient

**Visual anchors (non-negotiable)**:
- Swiss grid system + atmospheric diffused gradient instead of pure white background
- Ultra-light title weight (Inter 200-300, 80-120px)
- Single gradient source (radiating from corner or center)
- Hairline rules (1px) as the only divider
- Strict left-alignment
- Warm-neutral or cool-neutral gradient palette — never overpowering

**Font rules**:
- Display: Inter Light (200-300), 80-120px, letter-spacing -0.02em
- Body/subtitle: Inter Regular (400), 28-36px
- Labels: Inter Medium (500), 20-24px
- Numbers/stats: Inter Bold (700), 64-96px

**Color presets**:
| Preset | Gradient | Text | Accent |
|--------|----------|------|--------|
| Warm Dawn | `#f5f0eb` → `#e8ddd0` (radial) | `#1a1a1a` | `#c41e3a` |
| Cool Mist | `#f0f4f8` → `#dce6f0` (radial) | `#0a1a2a` | `#0033ff` |
| Sand | `#faf6f0` → `#efe0d0` (radial) | `#2a2018` | `#8b6914` |
| Ice | `#f4f8fc` → `#e0ecf4` (radial) | `#1a1a2e` | `#16213e` |

**Layout recipe**:
```
┌─────────────────────────────────────────────┐
│                    ░░░░░                     │   右上角弥散渐变
│               ░░░░░░░░░░░                    │   (覆盖约30-50%面积)
│                                          │
│  120                                        │   mega stat, accent, light
│  AI Image Generators                        │   标题, weight 200, 96px
│                                          │
│  Compared across 6 dimensions               │   副标题, 400, 小字
│                                          │
│  ─────────────────────────────────────       │   细线 1px
│                                          │
│  Flux 9.2 · Midjourney 9.5 · DALL·E 8.7  │   数据行
│                              yoursite.com │
└─────────────────────────────────────────────┘
```

**vs Swiss (#1)**: Neo-Swiss adds warm gradient atmosphere; Classic Swiss = pure white/grey.
**vs Dark Gradient (#10)**: Neo-Swiss = light/warm; Dark Gradient = dark/dramatic.

**Agent checks**:
- [ ] Gradient covers ≥30% of background but ≤50%
- [ ] Title weight ≤300
- [ ] Only 1 hairline divider + 1 accent color
- [ ] Strict left-alignment
- [ ] Ample whitespace

**Satori template**: [neo-swiss-gradient.tsx](../templates/neo-swiss-gradient.tsx)
**Best pages**: homepage, feature_page, use_case_page, comparison, pricing, subscription_page
**Best sites**: SaaS, FinTech, Education, Design Tools, Large Corporate, Healthcare

---

## Style #10: Dark Gradient + Texture

**Visual anchors (non-negotiable)**:
- Near-black base (`#0a0a0a` – `#1a1a1a`)
- Radial gradient glow from brand-color position
- Dot-grid texture overlay (SVG pattern)
- Glowing divider line (brand color, 1-2px)
- White/light title, maximum contrast
- Subtle noise grain texture

**Font rules**:
- Title: Inter Bold (700), 64-88px, white
- Subtitle: Inter Regular (400), 24-32px, light grey (#aaa)
- Labels: Inter Medium (500), 20-24px
- Domain: Inter Regular (400), 20-24px, low opacity white

**Color presets**:
| Preset | Base BG | Glow Color | Text |
|--------|---------|-----------|------|
| Blue Void | `#0a0a0f` | `#3b82f6` (blue) | `#ffffff` |
| Purple Abyss | `#0a0a12` | `#8b5cf6` (purple) | `#ffffff` |
| Cyan Deep | `#0a1214` | `#06b6d4` (cyan) | `#ffffff` |
| Amber Core | `#0f0a05` | `#f59e0b` (amber) | `#ffffff` |

**Layout recipe**:
```
┌─────────────────────────────────────────────┐
│  · · · · · · · · · · · · · · · · · · · ·  │   点阵纹理(全幅, svg pattern)
│       ◉                                      │   径向光晕(brand color)
│    ◉     ◉                                   │
│                                          │
│  ───────────────────────────────────         │   发光线(brand color, 2px)
│                                          │
│  Best AI Image Generators                   │   标题, white, bold, 72px
│  2026 — Complete Benchmark                  │
│                                          │
│  Flux 9.2 · Midjourney 9.5 · DALL·E 8.7  │   副标题, #aaa
│                              yoursite.com │
└─────────────────────────────────────────────┘
```

**Agent checks**:
- [ ] Base background ≤ `#1a1a1a` (near-black)
- [ ] At least 1 radial gradient glow
- [ ] Dot-grid or noise texture visible
- [ ] Glowing divider line present
- [ ] Text white or very light grey, contrast ≥7:1

**Satori template**: [dark-gradient-texture.tsx](../templates/dark-gradient-texture.tsx)
**Best pages**: homepage, feature_page, changelog, docs, api_reference, live_stream, generator
**Best sites**: DevTool, AI/ML, Gaming, Crypto/Web3, SaaS

---

## Style #11: Text Overlay

**Visual anchors (non-negotiable)**:
- Full-width background image (AI-generated photo / brand photography / page screenshot)
- Semi-transparent dark gradient overlay (rgba(0,0,0,0.3-0.6))
- Large white title on top of overlay
- Optional brand logo or domain in corner
- Title position flexible (centered / left-aligned / lower-third)

**Font rules**:
- Title: Inter Bold (700), 64-88px, white
- Metadata: Inter Regular (400), 22-28px, white at lower opacity
- Domain: Inter Regular (400), 20-24px

**Pipeline strategy**:
- **Satori**: Requires external background image URL. Can only overlay text on existing images.
- **AI**: Generate complete scene including background + text (text accuracy risk).
- **Recommended**: AI generates background → Satori overlays precise text.

**AI Prompt Template**:
```
A {mood} background photograph for a social media preview card.
{scene_description}. The image should be 1200x630px, 1.91:1 aspect ratio.
Dark gradient overlay on the bottom half for text placement.
No text in the image itself — text will be overlaid separately.
Style: photography, editorial, {additional_style_hints}.
```

**Agent checks**:
- [ ] Background image relates to page content
- [ ] Overlay ensures text contrast ≥4.5:1
- [ ] Critical text in central 630×630 safe zone
- [ ] Text ≤3 lines
- [ ] If AI-generated full image: text MUST be validated for accuracy

**Template**: [text-overlay-hybrid.tsx](../templates/text-overlay-hybrid.tsx)
**Best pages**: blog_post, news_article, event_page, video_landing, portfolio, travel
**Best sites**: Travel, Media, Lifestyle, Photography, Food, Automotive

---

## Style #12: Cinematic

**Visual anchors (non-negotiable)**:
- 16:9 widescreen composition feel (on 1.91:1 canvas)
- Film color grading: teal-orange contrast, or golden hour warmth
- Shallow depth of field (bokeh/blur background)
- Film grain overlay
- Side-lit or window-lit directional light
- Title in lower 1/3, upper portion reserved for "the frame"
- Optional letterbox bars (thin black bars top/bottom)

**Font rules**:
- Title: Playfair Display or Spectral, weight 400-600, 56-80px
- Byline: Playfair Display italic or Inter light, 22-28px
- Domain: Inter Regular (400), 18-22px

**Pipeline**: AI only. Satori cannot generate lighting, bokeh, or film grain effects.
**Hybrid text recommended** for CJK or precise product names.

**AI Prompt Template**:
```
Cinematic widescreen composition for a social media preview card. 1200x630px.
Film color grading: {teal-orange | golden hour | moody desaturated}.
Shallow depth of field with blurred background.
Soft film grain throughout. Dramatic side lighting.
Subject: {scene_description}.
Upper 2/3 is atmospheric "empty frame." Lower 1/3 has space for title text.
No text in image — text will be overlaid.
Style: editorial photography, A24 film aesthetic, {additional_hints}.
```

**Agent checks**:
- [ ] Unified film color grading (not neutral/natural)
- [ ] Film grain present but doesn't obscure text zone
- [ ] Title area in lower 1/3
- [ ] Bokeh/blur effect visible

**Template**: [cinematic.tsx](../templates/cinematic.tsx)
**Best pages**: brand_story, travel_article, opinion_essay, event_page, lifestyle
**Best sites**: Travel, Lifestyle, Music, Video, Automotive

---

## Style #13: Collage

**Visual anchors (non-negotiable)**:
- 2-5 panels in asymmetric layout
- Torn paper edges / washi tape / polaroid frames / paperclips
- At least 1 solid-color panel holding text
- At least 1 texture/photo panel
- Layered depth (z-index stagger)
- Hand-drawn annotation elements (optional)
- Overall "handmade scrapbook" feel, not CSS Grid

**Font rules**:
- Primary text panel: Inter Bold (700), 42-64px
- Can mix in 1 handwritten font for short labels (optional)
- Each panel may use different fonts

**Pipeline**: AI优先. Satori can simulate simple collage layouts but cannot generate torn edges, tape, or paper textures.
**Hybrid text recommended**.

**AI Prompt Template**:
```
Collage / scrapbook style social media preview card. 1200x630px.
2-4 panels arranged asymmetrically with slight overlap.
One panel is solid {color} with large bold text space (text will be overlaid).
One panel shows {image_description}.
Torn paper edges on at least one panel.
Washi tape or paperclip holding one element.
Flat lay photography style with subtle shadows between layers.
No text in the image — text will be overlaid on the solid panel.
Style: editorial scrapbook, indie zine aesthetic.
```

**Agent checks**:
- [ ] 2-5 panels, non-symmetric layout
- [ ] ≥1 solid-color panel for text
- [ ] ≥1 texture/photo panel
- [ ] Panels have layered/overlapping feel
- [ ] Handmade element visible (tape/tear/polaroid/clip ≥1)

**Template**: [collage.tsx](../templates/collage.tsx)
**Best pages**: campaign_landing, portfolio, event_page, newsletter_issue, launch
**Best sites**: Personal/Portfolio, Agency, Events, Independent Publishing, Design Tools

---

## Style #14: Risograph

**Visual anchors (non-negotiable)**:
- Limited palette: exactly 2-3 colors only (including paper color)
- Halftone dot pattern on color blocks
- Ink misregistration / offset at color edges (slight "off-register" look)
- Uncoated paper texture (subtle grain background)
- Hand-drawn quality lines/borders (imperfect, varying width)
- Slight "misprint" — each color plate slightly shifted

**Font rules**:
- Titles: Inter Black (900) or Spectral Bold (700), 56-80px
- Body: Inter Regular (400), 24-32px
- All text in one of the 2-3 palette colors

**Color palettes** (choose exactly one, all use paper #faf8f5):
| Name | Color A | Color B |
|------|---------|---------|
| Classic Riso | Red `#e63946` | Blue `#1d3557` |
| Fluorescent | Hot Pink `#ff006e` | Black `#1a1a1a` |
| Earth | Forest Green `#2d5016` | Burnt Orange `#e76f51` |
| Blue-Gold | Navy `#1a1a2e` | Gold `#c4a44a` |

**Pipeline**: AI only. Satori cannot generate halftone dots, ink offset, or paper texture.
**Hybrid text STRONGLY recommended** — Risograph misregistration risks text legibility.

**AI Prompt Template**:
```
Risograph print style social media preview card. 1200x630px.
Exactly 2-3 colors: {color_a}, {color_b}, and off-white paper.
Visible halftone dot pattern on large color blocks.
Slight ink misregistration at color edges (colors slightly offset).
Uncoated paper texture throughout. Hand-drawn border lines.
Bold graphic shapes, not photographic. Zine/poster aesthetic.
Leave a clean text zone for overlay — text should be crisp, not offset.
Style: risograph print, indie publishing, art school poster.
```

**Agent checks**:
- [ ] Only 2-3 colors used (including paper)
- [ ] Halftone dots visible on ≥1 color block
- [ ] Ink offset/misregistration at color edges
- [ ] Hand-drawn line quality
- [ ] Paper texture visible

**Template**: [risograph.tsx](../templates/risograph.tsx)
**Best pages**: opinion_essay, brand_story, research_report, newsletter_issue
**Best sites**: Independent Publishing, Personal/Portfolio, Agency (differentiation), Non-Profit, Education

---

## Style #15: Vaporwave

**Visual anchors (non-negotiable)**:
- Neon pink/purple/cyan gradient sunset background
- Greek statue bust, retro computer, or palm tree silhouette
- Glitch effect: RGB channel shift on title text
- Japanese katakana/fullwidth characters as decoration
- CRT scanline overlay
- VHS noise/tracking lines
- Strong 80s-90s retro-futurism feel

**Font rules**:
- Title: wide sans-serif (VCR-style) or mixed with Japanese kana, 56-80px
- Subtext: monospace or fullwidth characters, 20-28px
- Domain: monospace, small

**Pipeline**: AI only. Satori cannot generate glitch effects, statue silhouettes, or CRT scanlines.
**Hybrid text recommended** — glitch effect on text can be simulated in Satori, but background must be AI.

**AI Prompt Template**:
```
Vaporwave aesthetic social media preview card. 1200x630px.
Neon pink (#ff6ac1) to cyan (#00ffff) gradient sunset background.
Greek statue bust silhouette in the composition.
CRT scanlines overlay. VHS tracking noise on bottom edge.
Retro-futurist 80s/90s aesthetic. Grid on the horizon.
Leave a central text zone for overlay.
Style: vaporwave, synthwave, retro internet aesthetic.
```

**Agent checks**:
- [ ] Neon pink/purple/cyan color palette
- [ ] ≥1 retro element (statue/palm/computer silhouette)
- [ ] RGB shift or glitch effect present
- [ ] Scanline texture
- [ ] Japanese/fullwidth decorative characters ≥1

**Template**: [vaporwave.tsx](../templates/vaporwave.tsx)
**Best pages**: launch_announcement, campaign_landing, event_page, music_release
**Best sites**: Music, Gaming, Crypto/Web3, Creative Agencies, Personal/Portfolio

---

## Style #16: Grunge

**Visual anchors (non-negotiable)**:
- Full-width noise/grain + dust + scratch texture overlay
- Faded/desaturated color palette (like aged print)
- Xerox photocopy aesthetic: high-contrast B&W + copy texture
- Tears, creases, stains, or distressing marks
- Bold sans-serif title with slight distortion (not pixel-perfect)
- Uneven ink density
- 90s DIY / punk / zine aesthetic

**Font rules**:
- Title: Inter Black (900) or Impact-style, 64-88px, slightly "distressed" feel
- Body: Inter Regular (400), 24-32px, faded dark grey
- Domain: Inter Regular (400), 18-22px

**Pipeline**: AI only. Satori cannot generate noise grain, photocopy textures, or distressing effects.
**Hybrid text recommended**.

**AI Prompt Template**:
```
Grunge / photocopy aesthetic social media preview card. 1200x630px.
Faded black and off-white color palette. Heavy noise grain and dust texture throughout.
Xerox photocopy texture overlay. Subtle crease marks and stains.
DIY punk zine aesthetic. High contrast but desaturated (not pure black — faded).
Leave a central zone for bold text overlay.
Style: 90s grunge, xerox art, punk zine, distressed print.
```

**Agent checks**:
- [ ] Full-width noise/dust texture visible
- [ ] Faded/desaturated palette (not vibrant)
- [ ] Title has uneven ink or slight distortion feel
- [ ] Lines/borders imperfect (hand-drawn quality)
- [ ] Overall "aged print" texture

**Template**: [grunge.tsx](../templates/grunge.tsx)
**Best pages**: opinion_essay, music_review, campaign_landing, crowdfunding
**Best sites**: Independent Publishing, Music, Personal/Portfolio, Non-Profit (campaign), Creative Agencies

---

## Style #17: AI Painterly

**Visual anchors (non-negotiable)**:
- Title is "painted" into the image — letters have brush texture, organic edges, not crisp vectors
- Entire image is one unified painting: text + background are the same medium
- Style: watercolor, oil painting, gouache, ink wash, or thick acrylic
- Slight irregularity in letterforms is intentional — it's art, not typography
- Color palette is painterly (mixed, blended, not flat)

**Font feel**: Hand-painted letterforms, not a specific font. Think sign painter, calligrapher, or brush artist.
**Pipeline**: AI-Native only. No Satori template — the painting IS the output.

**AI Prompt**:
```
Painterly social media card, 1200x630px. {watercolor | oil | ink wash | gouache} style.
Title "{title}" is painted into the composition — letters have visible brush strokes,
organic edges, paint pooling at stroke ends. Background: {scene_description}.
Colors: {warm earth tones | vibrant watercolor blooms | monochrome ink}.
The text IS the painting — unified, not overlaid. Gallery wall worthy.
"{domain}" painted small in corner. Artistic, handcrafted, anti-AI aesthetic.
```

**Agent checks**:
- [ ] Text is painted, not typeset — visible brush texture on letters
- [ ] Unified medium: text and background are same paint style
- [ ] Color palette is mixed/blended (not flat hex colors)
- [ ] Letters slightly irregular (not pixel-perfect)

**Best pages**: opinion_essay, brand_story, personal_about, poetry, art_review, creative_portfolio
**Best sites**: Personal/Portfolio, Independent Publishing, Art/Creative, Lifestyle, Music

---

## Style #18: Abstract Gradient

**Visual anchors (non-negotiable)**:
- NO text, NO letters, NO numbers. Pure visual.
- Fluid, organic color fields — soft blending, no hard edges
- Atmospheric, meditative, brand-elevating
- Like a Rothko or color-field painting adapted for 1200×630
- Subtle accent zone (a lighter/darker area) where brand logo could sit
- The color IS the message

**Font**: None. This is a zero-text style.
**Pipeline**: AI-Native only.

**AI Prompt**:
```
Abstract color-field social media card, 1200x630px. Pure visual — NO text, NO letters, NO numbers.
Fluid organic blending of {color_palette}. Soft transitions, no hard edges.
Meditative, atmospheric, premium. Like a Rothko painting cropped to 1.91:1.
Subtle {brand_color} zone in {corner} where a logo could naturally sit.
Minimal, sophisticated, brand-defining.
```

**Agent checks**:
- [ ] Absolutely zero text/letters/numbers
- [ ] Fluid color blending, no hard geometric edges
- [ ] Atmospheric quality (not a flat gradient)
- [ ] Logo-safe zone is subtle, doesn't break the composition

**Best pages**: homepage (brand-forward), about (mood-setting), brand_story
**Best sites**: Luxury, Design, Art, Personal/Portfolio, Lifestyle, Premium SaaS

---

## Style #19: AI Sticker / Badge

**Visual anchors (non-negotiable)**:
- ONE large badge/sticker with short text (1-3 words max)
- 3D depth: sticker has subtle shadow, appears to float above background
- Background is atmospheric scene or gradient — secondary to the badge
- Clean, punchy, Telegram/Discord/Notion-style aesthetic
- Short text = high AI accuracy. Long text = don't use this style.

**Font feel**: Bold, digital-native sans-serif (Inter/Geist feel, rendered by AI)
**Pipeline**: AI-Native only. Hybrid unnecessary — 1-3 words is AI's text sweet spot.

**AI Prompt**:
```
Bold sticker badge social media card, 1200x630px. A single large badge with text
"{title}" (keep to 1-3 words) in heavy bold sans-serif, centered on the badge.
Badge has slight 3D depth and soft shadow, floating feel. Background: {scene_description}
— atmospheric, slightly blurred, secondary to the badge. Badge color: {color}.
Clean, modern, punchy. Pop art energy meets app store aesthetic.
"{domain}" tiny in bottom corner.
```

**Agent checks**:
- [ ] Title is 1-3 words MAX (longer = use Text Overlay instead)
- [ ] Badge has depth/shadow (3D feel, not flat rectangle)
- [ ] Background is atmospheric/blurred, badge is sharp
- [ ] Punchy, grab-attention composition

**Best pages**: launch_announcement, deal_promotion, waitlist, free_tool, feature_page
**Best sites**: SaaS, eCommerce, Gaming, Crypto/Web3, DevTool

---

## Style #20: AI Infographic

**Visual anchors (non-negotiable)**:
- Data-driven visual storytelling — numbers, comparisons, categories as visual elements
- NOT precise charts (bar charts, pie charts) — it's "chart-like visuals," editorial data art
- Headline is anchor, data points radiate or stack around it
- Visual hierarchy: big numbers > labels > annotations
- Feels like NYT data section, The Economist chart, or Information is Beautiful
- Numbers don't need to be pixel-perfect bar heights — visual impact > precision

**Font feel**: Clean sans-serif (AI-rendered), numbers large and bold
**Pipeline**: AI-Native only. The charm is that it's "data art," not a precise chart.

**AI Prompt**:
```
Editorial infographic social media card, 1200x630px. Data-storytelling visual style.
Headline "{title}" as the anchor element — large, bold, prominent.
Key data points rendered as visual comparison elements (bar-like, size-comparison,
big-number callouts): {data_points}. NOT a precise chart — editorial data art.
Colors: {palette}. Clean reading flow, information-dense but scannable.
The data IS the visual. NYT data section / Economist chart aesthetic.
"{domain}" small at bottom. "Source: {source}" in tiny text if applicable.
```

**Agent checks**:
- [ ] Data points are visual, not just listed as text
- [ ] Visual comparisons (size/color/position) communicate hierarchy
- [ ] Headline is largest element
- [ ] Not a rigid bar chart — editorial, artistic data presentation
- [ ] Scannable at thumbnail size

**Best pages**: research_report, case_study, comparison_vs, listicle, annual_report, benchmark
**Best sites**: Content/Media, News, FinTech, Education, SaaS (benchmarks/reports)

---

## Style × Page Type Matrix (20 × core types)

```
Page Type            SWI MAG TER PIX BRU NEW NBR BEN NSG DGD TXT CIN COL RIS VAP GRU PAI ABS STK INF
──────────────────────────────────────────────────────────────────────────────────────────────────────
blog_post             ○   ●   —   —   —   ●   —   ○   ○   ○   ●   —   —   —   —   —   ○   —   —   —
long_form_guide       —   ●   —   —   —   ○   —   —   ○   ○   ●   —   —   ○   —   —   ○   —   —   ○
news_article          —   ○   —   —   —   ●   —   —   —   —   ●   —   —   —   —   —   —   —   —   ○
research_report       ●   ●   —   —   —   ○   —   —   ○   ○   —   —   —   ●   —   —   —   —   —   ●
case_study            ●   ●   —   —   —   —   —   ○   ●   ○   —   —   —   —   —   —   —   —   —   ●
opinion_essay         —   ●   —   —   ○   —   ○   —   —   —   —   ○   —   ●   —   ○   ●   —   —   —
newsletter_issue      —   ●   —   —   ○   ●   ○   —   —   —   ○   —   ○   ○   —   —   ○   —   ○   ○
──────────────────────────────────────────────────────────────────────────────────────────────────────
homepage              ●   ○   —   —   —   —   ○   ○   ●   ●   —   —   —   —   —   —   —   ●   —   —
pricing               ●   —   —   —   —   —   —   ●   ○   ○   —   —   —   —   —   —   —   —   —   ○
feature_page          ●   ○   —   —   —   —   ○   ●   ○   ○   —   —   —   —   —   —   —   —   ●   —
comparison_vs         ●   —   —   —   —   ○   —   ●   —   —   —   —   —   —   —   —   —   —   —   ●
launch_announcement   ○   —   —   —   ●   —   ●   ○   —   —   ○   ○   ●   ○   ●   —   —   —   ●   —
campaign_landing      —   ○   —   —   ○   —   ●   —   —   —   ○   ○   ●   ●   ●   ●   ○   —   ●   ○
changelog             —   —   ●   ○   —   —   ○   —   —   ●   —   —   —   —   —   —   —   —   ●   —
──────────────────────────────────────────────────────────────────────────────────────────────────────
docs                  ○   —   ●   —   —   —   —   —   —   ●   —   —   —   —   —   —   —   —   —   —
generator             ○   —   ●   —   ○   —   ○   —   —   ●   —   —   —   —   —   —   —   —   ●   —
──────────────────────────────────────────────────────────────────────────────────────────────────────
portfolio_gallery     —   ○   —   —   ○   —   ○   ●   —   —   ○   —   ●   ○   —   —   ●   ○   —   —
event_page            —   ○   —   —   ●   —   ●   —   —   —   ○   ●   ●   ●   ○   —   ○   —   ●   —
──────────────────────────────────────────────────────────────────────────────────────────────────────
donation_page         —   ●   —   —   —   —   —   —   ○   —   —   —   —   —   —   —   ○   ○   —   —
crowdfunding          ●   —   —   —   ●   —   ●   —   —   —   —   —   ○   —   —   ○   —   —   ●   —
brand_story           —   ●   —   —   —   —   —   —   —   —   —   ●   —   ●   —   —   ●   ●   —   —
annual_report         ●   —   —   —   —   ●   —   ○   ●   —   —   —   —   —   —   —   —   —   —   ●

● = Best  ○ = Viable  — = Not recommended

Abbreviations:
SWI=Swiss  MAG=Magazine  TER=Terminal  PIX=Pixel  BRU=Brutalist  NEW=Newspaper
NBR=Neo-Brutalism  BEN=Bento Grid  NSG=Neo-Swiss Gradient  DGD=Dark Gradient+Texture
TXT=Text Overlay  CIN=Cinematic  COL=Collage  RIS=Risograph  VAP=Vaporwave  GRU=Grunge
PAI=Painterly  ABS=Abstract  STK=Sticker  INF=Infographic
```

## Style × Site Type Matrix (20 × 35)

```
Site Type             SWI MAG TER PIX BRU NEW NBR BEN NSG DGD TXT CIN COL RIS VAP GRU
────────────────────────────────────────────────────────────────────────────────────
SaaS                  ●   ○   —   —   —   —   ○   ●   ●   ●   —   —   —   —   —   —
DevTool/Open Source   ○   —   ●   △   ○   —   ○   ○   —   ●   —   —   —   —   —   —
AI/ML Product         ○   —   ●   —   ●   —   ●   ●   —   ●   —   —   —   —   ○   —
eCommerce/DTC         ●   ○   —   —   —   —   ○   ●   ○   —   ○   —   —   —   —   —
Content/Media         —   ●   —   —   —   ●   —   ○   —   —   ●   —   —   ○   —   —
News                  —   ○   —   —   —   ●   —   —   —   —   ●   —   —   —   —   —
Education             ●   ●   —   —   —   —   —   ○   ●   —   ○   —   —   —   —   —
Personal/Portfolio    —   ○   —   —   ●   —   ●   ●   —   —   ○   ●   ●   ●   ○   ○
Non-Profit            —   ●   —   —   —   —   —   —   ○   —   ○   —   —   —   —   —
Healthcare            ●   ●   —   —   —   —   —   —   ○   —   —   —   —   —   —   —
Events/Ticketing      —   ○   —   —   ●   —   ●   —   —   —   ○   ●   ●   ●   ○   ○
FinTech               ●   ○   —   —   —   —   —   ○   ●   ●   —   —   —   —   —   —
Real Estate           ●   ○   —   —   —   —   —   ○   —   —   ●   —   —   —   —   —
Travel/Hospitality    —   ●   —   —   —   —   —   —   —   —   ●   ●   ○   —   —   —
Recruitment           ●   ○   —   —   —   —   —   ○   —   —   —   —   —   —   —   —
Gaming/Esports        —   —   ○   ●   ●   —   ●   —   —   ●   —   —   —   —   ●   ○
Agency/Services       ●   ●   —   —   △   —   ○   —   —   —   —   —   ○   ○   —   —
Independent Pub       —   ○   —   —   ●   ●   ○   —   —   —   —   —   ○   ●   —   ○
Community/Forum       —   —   ○   ○   ●   —   ●   —   —   ●   —   —   —   —   —   —
Government/Public     ●   —   —   —   —   ●   —   —   —   —   —   —   —   —   —   —
Legal                 ●   —   —   —   —   ●   —   —   —   —   —   —   —   —   —   —
Music/Audio           —   ●   —   —   ○   —   ○   —   —   —   ○   ●   ○   —   ●   ○
Video/Streaming       —   —   —   —   —   —   —   —   —   —   ●   ●   —   —   —   —
Design Tools          ○   —   —   —   ●   —   ●   ●   ○   —   ○   —   ●   ○   —   —
Lifestyle/Wellness    —   ●   —   —   —   —   —   —   ○   —   ●   ●   —   —   —   —
Food/Delivery         —   ○   —   —   —   —   —   —   —   —   ●   —   —   —   —   —
Automotive            —   —   —   —   —   —   —   —   —   —   ○   ●   —   —   —   —
Crypto/Web3           —   —   ○   ●   ●   —   ●   —   —   ●   —   —   —   —   ●   ○
Enterprise            ●   —   —   —   —   —   —   ○   ●   —   —   —   —   —   —   —
Weather/Reference     ●   —   —   —   —   —   —   ●   —   —   —   —   —   —   —   —
Wiki/Knowledge Base   ●   —   —   —   —   ●   —   ○   —   —   —   —   —   —   —   —

● = Primary  ○ = Viable/Variant  △ = A/B wildcard  — = Not recommended
```

---

## Style Selection Algorithm

```
FUNCTION selectStyle(pageType, siteType, contentTone, userPreference):
  
  candidates = []
  FOR EACH style IN allStyles:
    score = 0
    
    // Page type match: ●=3  ○=2  —=-1
    pageMatch = MATRIX_PAGE[pageType][style]
    score += (pageMatch === '●' ? 3 : pageMatch === '○' ? 2 : -1)
    
    // Site type match: ●=3  ○=2  △=1  —=-1
    siteMatch = MATRIX_SITE[siteType][style]
    score += (siteMatch === '●' ? 3 : siteMatch === '○' ? 2 : siteMatch === '△' ? 1 : -1)
    
    // Content tone bonus
    toneMap = {
      technical:  { TER:2, DGD:1, SWI:1 },
      narrative:  { MAG:2, CIN:1, COL:1, RIS:1 },
      data_heavy: { SWI:2, NSG:1, NEW:1, BEN:1 },
      playful:    { PIX:2, COL:1, VAP:1, NBR:1 },
      urgent:     { NEW:2, NBR:1, BRU:1 },
      premium:    { CIN:2, NSG:1, MAG:1, DGD:1 },
      raw:        { BRU:2, GRU:1, RIS:1, COL:1 }
    }
    score += toneMap[contentTone]?.[style] || 0
    
    IF score > 0: candidates.push({style, score})
  
  candidates.sort((a,b) => b.score - a.score)
  
  RETURN {
    primary: candidates[0],
    variants: candidates.slice(1, 4),
    avoid: styles.filter(s => !candidates.find(c => c.style === s))
      .map(s => s).slice(0, 5)
  }
```

---

*Last updated: 2026-06-02*
