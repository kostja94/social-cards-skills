# OG Image Style System

Six visual styles for programmatically-generated OG images. Each style is a **visual stance**, not a content category — any topic can be rendered in any style. The choice should reflect the emotional tone and functional needs of the page, not the topic domain.

## Shared Rules (All Styles)

- Content shape decides layout — don't pick a layout and force content into it
- One clear focal point per card (usually the title or a single stat)
- Keep all text in safe zone: 100px padding from each edge
- Minimum font size: 24px at 1200px width
- No pure decoration: every visual element communicates something
- Domain name always present, always at low opacity (0.35–0.5)

## Style ↔ Content Decoupling

These styles are visual stances, not content categories. A workplace essay can be Swiss; a travel guide can be Terminal. Pick by the **feeling** you want:

| Content tone | Best-fitting styles |
|-------------|-------------------|
| Technical, data-rich, comparison | Swiss Minimal, Terminal/CLI |
| Narrative, brand story, long-form | Magazine Editorial |
| Dev tool, CLI product, API docs | Terminal/CLI |
| Game, retro, community, nostalgia | Pixel Retro |
| Design-forward, anti-convention, bold opinion | Brutalist |
| News, aggregation, time-sensitive, information-dense | Newspaper |

---

## Style 1: Terminal / CLI

**Visual anchors** (non-negotiable):
- Dark background (#0d1117, #1a1a2e, or pure #000)
- Monospace font throughout (JetBrains Mono, Fira Code, Cascadia Code)
- `$` or `>` prompt prefix before title
- Green, cyan, or amber accent on key text
- Window control dots (red/yellow/green circles) in top-left corner (optional but signature)
- Horizontal rule separators using dashes or equals signs

**Font rules**:
- Family: JetBrains Mono (preferred), Fira Code, or Cascadia Code
- Title: weight 700, 56–80px
- Prompt prefix (`$`): weight 400, same size as body, accent color
- Body/secondary text: weight 400, 28–36px, dimmed color (#8b949e)
- Labels/paths: weight 500, 22–26px, dimmed color

**Color presets**:

| Preset | Background | Primary text | Accent | Dimmed |
|--------|-----------|-------------|--------|--------|
| **GitHub Dark** | `#0d1117` | `#f0f6fc` | `#58a6ff` (blue) | `#8b949e` |
| **Matrix** | `#0a0a0a` | `#00ff41` | `#00ff41` (green) | `#005c1f` |
| **Amber** | `#1a1a0a` | `#ffb000` | `#ffb000` (amber) | `#5c4000` |
| **Nord** | `#2e3440` | `#eceff4` | `#88c0d0` (cyan) | `#4c566a` |
| **Dracula** | `#282a36` | `#f8f8f2` | `#bd93f9` (purple) | `#6272a4` |

**Layout recipe**:

```
┌─────────────────────────────────────────────┐
│ ● ● ●  terminal — -zsh — 80×24               │  ← window chrome (optional)
├─────────────────────────────────────────────┤
│                                              │
│  ~/blog $ cat post.md                        │  ← path + prompt + dimmed
│                                              │
│  Best AI Image Generators                    │  ← title, primary color
│  Compared: Flux vs Midjourney vs DALL-E      │
│                                              │
│  # 2026-05-29                                │  ← comment-style date (dimmed)
│  # author: @kostja                           │
│                                              │
│  ~/blog $                                    │  ← blinking cursor effect
│                                              │
│                              yoursite.com    │  ← domain (bottom-right)
└─────────────────────────────────────────────┘
```

**Anti-patterns**:
- Sans-serif fonts mixed into Terminal style — breaks the illusion
- Too many colors — terminal emulators use 2–3 colors max
- Cursor prompt at bottom with nothing after it — add domain or leave empty
- Window chrome that takes up >10% of height — it's set dressing, not content

**Agent checks for this style**:
- [ ] All text uses monospace font family
- [ ] Prompt prefix (`$` or `>`) is present before title
- [ ] Accent color is used on ≤2 elements (prompt + one highlight)
- [ ] No rounded corners, no shadows, no gradients
- [ ] Dark background only — no light terminal variant

---

## Style 2: Magazine Editorial

**Visual anchors** (non-negotiable):
- Serif display title (Playfair Display, Source Serif, Noto Serif SC for Chinese)
- Warm paper or muted tone background — never pure white, never pure black
- One large visual element: photo well, pull quote, or ledger of data
- Fine hairline rules as separators
- Issue metadata: category label, date, page-like numbering
- "The larger, the lighter" — display titles at 96px+ use weight 500, not 700

**Font rules**:
- Display: Playfair Display (Latin) or Noto Serif SC (Chinese), weight 500–600
- Body: Inter weight 400, 28–36px
- Labels/kicker: Inter weight 500, 20–24px, uppercase, letter-spacing 0.08em
- Pull quotes: same as display, italic where available

**Color presets**:

| Preset | Background | Display text | Body text | Accent |
|--------|-----------|-------------|-----------|--------|
| **Ink Classic** | `#faf8f5` | `#1a1a1a` | `#4a4a4a` | `#c41e3a` (deep red) |
| **Forest Ink** | `#f2f0eb` | `#1a2418` | `#3a4a38` | `#2d5016` (olive) |
| **Indigo Porcelain** | `#f4f2f0` | `#1a1a2e` | `#3a3a5e` | `#16213e` (navy) |
| **Dune** | `#faf6f0` | `#2a2018` | `#5a4838` | `#8b6914` (gold) |
| **Midnight Ink** | `#0f0f14` | `#e8e0d0` | `#8a8070` | `#c4a44a` (warm gold) |

**Layout recipe (cover)**:

```
┌─────────────────────────────────────────────┐
│                                              │
│  ISSUE 04  ·  MAY 2026                       │  ← kicker row (top-left)
│                                              │
│  The State of AI                             │  ← display title (serif, large)
│  Image Generation                            │
│                                              │
│  ┌──────────────────────────┐               │
│  │                          │               │  ← photo well (~40% width)
│  │     [photograph]         │               │
│  │                          │               │
│  └──────────────────────────┘               │
│                                              │
│  ─────────────────────────────────────       │  ← hairline rule
│                                              │
│  Flux 9.2  ·  Midjourney 9.5  ·  DALL-E 8.7 │  ← data ribbon
│                                              │
│                              yoursite.com    │
└─────────────────────────────────────────────┘
```

**Anti-patterns**:
- Flat white/black background with no atmosphere — reads as unfinished
- Bold display title above 700 weight — loses editorial refinement
- Sans-serif for the main title — breaks the magazine identity
- No image/texture element — at minimum, add a hairline rule or issue metadata
- Centered title with no supporting layout — editorial is about asymmetric page composition

**Agent checks for this style**:
- [ ] Serif font is used for the display title
- [ ] Background is a warm paper/muted tone, not pure white or pure black
- [ ] At least one non-text visual anchor (photo well, pull quote, data ledger, issue strip)
- [ ] Display title weight is ≤600 (the larger it is, the lighter)
- [ ] Hairline rule or divider present if no image is used

---

## Style 3: Swiss Minimal

**Visual anchors** (non-negotiable):
- Inter or Geist, with display titles at weight 200–400 (very light, very large)
- Strict left-aligned grid — content anchored to a single vertical axis
- Exactly ONE high-saturation accent color — everything else is white, off-white, or grey
- Hairline rules (1–2px) as the only separators
- Straight corners, no shadows, no gradients, no glassmorphism
- Small labels in mono or uppercase at weight 500–600

**Font rules**:
- Display: Inter weight 200–400, 80–128px, letter-spacing -0.02em
- Body: Inter weight 400, 28–36px
- Labels: Inter weight 500–600, 20–24px, uppercase or mono
- Numbers/stats: Inter weight 700, 64–96px

**Color presets**:

| Preset | Background | Text | Accent | Grey |
|--------|-----------|------|--------|------|
| **IKB Blue** | `#fafafa` | `#0a0a0a` | `#0033ff` | `#e5e5e5` |
| **Safety Orange** | `#fafafa` | `#0a0a0a` | `#ff4400` | `#e5e5e5` |
| **Lemon Yellow** | `#fafafa` | `#0a0a0a` | `#ffdd00` | `#e5e5e5` |
| **Lemon Green** | `#fafafa` | `#0a0a0a` | `#00cc44` | `#e5e5e5` |

**Layout recipe**:

```
┌─────────────────────────────────────────────┐
│                                              │
│  120                                         │  ← mega stat (accent color, light weight)
│  AI Image Generators                         │  ← display title (very light, very large)
│                                              │
│  Compared across 6 dimensions                │  ← subtitle (small, grey)
│  including visual quality, text accuracy,    │
│  speed, and pricing.                         │
│                                              │
│  ─────────────────────────────────────       │  ← hairline rule (accent color)
│                                              │
│  Flux 9.2           Midjourney 9.5          │  ← data row (two columns)
│  DALL-E 8.7         GPT Image 8.9           │
│                                              │
│                              yoursite.com    │
└─────────────────────────────────────────────┘
```

**Anti-patterns**:
- Bold display title — "the larger, the lighter" is a hard rule
- More than one accent color
- Rounded corners, shadows, gradient backgrounds
- Center-aligned text — Swiss is left-aligned by principle
- Sans-serif display title with no accompanying data/stat — Swiss without data is just a poster

**Agent checks for this style**:
- [ ] Display title weight is ≤400
- [ ] Only ONE accent color is used
- [ ] All content is left-aligned
- [ ] No rounded corners, no shadows, no gradients
- [ ] Hairline rule or data element accompanies the title

---

## Style 4: Pixel Retro

**Visual anchors** (non-negotiable):
- Pixel font for title (Press Start 2P, VT323, or Pixelify Sans)
- 8-bit / 16-bit inspired color palette — saturated primaries on dark backgrounds
- Chunky borders using `box-shadow` (Satori doesn't support `border-style: double` well)
- Blocky separators made of repeating characters or thick lines
- Game HUD elements: score counters, hearts/lives, level indicators
- CRT scanline overlay (repeating linear-gradient) for extra retro feel

**Font rules**:
- Display: Press Start 2P (8px native, multiply sizes by 3–4x), weight 400
- Body (if needed): VT323 at 32–40px, or Inter at 28px for readability
- Labels: Press Start 2P at 14–18px (small but legible for pixel font)
- Note: Press Start 2P at 48px on 1200px canvas = roughly equivalent to a 96px Inter title in visual weight

**Color presets**:

| Preset | Background | Primary text | Secondary | Accent |
|--------|-----------|-------------|-----------|--------|
| **Game Boy** | `#9bbc0f` | `#0f380f` | `#306230` | `#8bac0f` |
| **NES** | `#1a1a2e` | `#f8f8f8` | `#e83030` | `#f8b800` |
| **SNES** | `#4a3a6e` | `#f0e8d0` | `#d0a040` | `#60d0d0` |
| **Arcade** | `#0a0a1a` | `#ff00ff` | `#00ffff` | `#ffff00` |
| **CGA** | `#000000` | `#00aaaa` | `#aa00aa` | `#aaaaaa` |

**Layout recipe**:

```
┌─────────────────────────────────────────────┐
│  ╔══════════════════════════════════════╗   │
│  ║  ★ BEST AI IMAGE GENERATORS ★       ║   │  ← chunky border frame
│  ║                                      ║   │
│  ║  < FLUX >    [████████░░]  9.2/10   ║   │  ← progress bar + score
│  ║  < MIDJRNY > [█████████░]  9.5/10   ║   │
│  ║  < DALL-E >  [███████░░░]  8.7/10   ║   │
│  ║                                      ║   │
│  ║  ▼▼▼ 2026 EDITION ▼▼▼               ║   │
│  ║                                      ║   │
│  ║         ♥♥♥  LIVES: 3  ♥♥♥          ║   │  ← HUD element
│  ╚══════════════════════════════════════╝   │
│                                              │
│                              yoursite.com    │
└─────────────────────────────────────────────┘
```

**Anti-patterns**:
- Mixing pixel fonts with clean sans-serif at similar sizes — breaks the retro illusion
- Too much text — pixel fonts are hard to read at length. Keep titles to 30 characters max
- Realistic photos or gradients inside a pixel frame — style clash
- Rounded corners — pixels are square

**Agent checks for this style**:
- [ ] Title uses a pixel font (Press Start 2P, VT323, or Pixelify Sans)
- [ ] Chunky borders or frame present around content
- [ ] Color palette is saturated, retro-game-inspired
- [ ] Title character count ≤30 (pixel font legibility constraint)
- [ ] At least one game HUD element (score, progress bar, lives, level)

---

## Style 5: Brutalist

**Visual anchors** (non-negotiable):
- Black and white only — no grey, no accent colors, no gradients
- Maximum bold weight everywhere (Inter 700–900 or equivalent)
- Zero border-radius — every corner is 90 degrees
- Asymmetric composition — content is NOT centered, NOT evenly distributed
- Raw, "unfinished" feel: visible borders, large blocks of solid black, text that touches edges
- No icons, no decoration, no shadows, no "polish"

**Font rules**:
- Display: Inter weight 800–900, 72–128px, letter-spacing -0.04em (tight, aggressive)
- Body: Inter weight 600–700, 28–40px
- Labels: Inter weight 700, 22–28px
- Slogan/small: Inter weight 400, 20–24px
- All text: same font family (Inter), differentiated only by weight and size

**Color preset**:
- Only ONE preset: `#000000` and `#ffffff`. Invert for dark mode ("white mode brutalist" — black text on white). Never introduce grey.

**Layout recipe**:

```
┌─────────────────────────────────────────────┐
│                                              │
│  ┌──────────────────────────────────────┐   │
│  │                                      │   │
│  │  BEST AI                             │   │  ← title block (white on black)
│  │  IMAGE                               │   │     text fills the black rectangle
│  │  GENERATORS                          │   │     edges touch the white border
│  │                                      │   │
│  └──────────────────────────────────────┘   │
│                                              │
│  FLUX ████████████░░ 9.2                     │  ← data bars (black lines)
│  MIDJOURNEY ██████████░ 9.5                  │     label + bar + number
│  DALL·E ████████░░░░ 8.7                     │     no alignment — rough
│                                              │
│  ┌─ 2026 ──────────────────────────────┐    │
│  │ COMPARISON REPORT                    │    │  ← bottom block (inverted)
│  └──────────────────────────────────────┘    │
│                                              │
│                              yoursite.com    │
└─────────────────────────────────────────────┘
```

**Anti-patterns**:
- Any grey — Brutalist is black + white only
- Rounded corners — even 2px radius breaks the aesthetic
- Symmetrical, centered layout — Brutalism is intentionally unbalanced
- Thin fonts or regular weight — everything should feel "loud"
- Subtle shadows or gradients — any visual softness kills the style
- More than one font family

**Agent checks for this style**:
- [ ] Only black (#000) and white (#fff) are used — no grey, no accent colors
- [ ] All corners are 0px border-radius
- [ ] Title weight is ≥800
- [ ] Layout is intentionally asymmetric
- [ ] At least one black-filled rectangle with inverted text

---

## Style 6: Newspaper

**Visual anchors** (non-negotiable):
- Multi-section layout suggesting columns (achieved with nested flex in Satori)
- Small serif or compact sans-serif title — newspaper headlines are modest, not 96px hero text
- Uppercase section labels with letter-spacing
- Dateline: date + location format ("May 29, 2026 · SAN FRANCISCO")
- Horizontal rules (thin, black or dark) between sections
- Information density: more elements per card than other styles
- Body text in small, readable size — newspaper background is dense reading

**Font rules**:
- Title: Source Serif or Noto Serif SC, weight 600–700, 42–56px
- Section labels: Inter weight 600, 18–22px, uppercase, letter-spacing 0.1em
- Body: Inter weight 400, 22–28px, tight line-height (1.25–1.35)
- Dateline: Inter weight 500, 18–20px, uppercase
- Stats/numbers: Inter weight 700, 28–36px

**Color presets**:

| Preset | Background | Title | Body | Rule lines |
|--------|-----------|-------|------|------------|
| **Broadsheet** | `#fcfaf7` | `#111` | `#333` | `#111` |
| **Evening Edition** | `#faf8f4` | `#1a1a1a` | `#444` | `#1a1a1a` |
| **Financial** | `#faf9f6` | `#0a1a2a` | `#2a3a4a` | `#0a1a2a` |
| **Sunday Magazine** | `#fefcf8` | `#1a1a1a` | `#3a3a3a` | `#1a1a1a` |

**Layout recipe**:

```
┌─────────────────────────────────────────────┐
│  AI TOOLS                          MAY 2026  │  ← section label (left) + date (right)
│  ─────────────────────────────────────────  │  ← top rule (full width)
│                                              │
│  Best AI Image Generators                    │  ← title (modest size, serif)
│  Compared Across 6 Dimensions                │
│                                              │
│  By Kostja · 8 min read                      │  ← byline
│                                              │
│  ─────────────────────────────────────────  │  ← divider
│                                              │
│  FLUX           MIDJOURNEY      DALL·E      │  ← 3-column comparison
│  Visual: 9.2    Aesthetic: 9.5  Text: 8.7   │
│  Speed: fast    Quality: high   Price: $$    │
│                                              │
│  ─────────────────────────────────────────  │  ← bottom rule
│  Continued on Page B4          yoursite.com  │  ← newspaper footer convention
└─────────────────────────────────────────────┘
```

**Anti-patterns**:
- Hero-sized title (72px+) — newspaper is about information density, not visual impact
- Too little content — Newspaper needs 3+ distinct elements to feel like a paper
- Light grey rules — newspaper rules are strong, visible separators
- Center alignment throughout — left-align for the newspaper reader's scanning pattern

**Agent checks for this style**:
- [ ] Title is ≤56px (modest, newspaper-style)
- [ ] Dateline present (date + optional byline)
- [ ] Horizontal rules between sections
- [ ] At least 3 distinct information elements (title, byline, data row, section label)
- [ ] Section labels use uppercase with letter-spacing
