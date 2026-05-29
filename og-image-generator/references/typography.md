# OG Image Typography Guide

Typography for 1200x630px and 1200x675px social cards. Based on the principles from the Alignify design system's type scale methodology, adapted for the unique constraints of programmatically-rendered images.

## 1. Font Philosophy for OG Images

OG images are viewed at small sizes — ~260px wide on mobile feeds, ~500px on desktop timelines. This changes everything about font selection:

**Legibility over personality**: A display font that looks distinctive at full size becomes illegible when the card is viewed at thumbnail scale. The safest choice is a highly readable sans-serif (Inter, Geist) for all text. Only use display fonts (serif, pixel, mono) when the chosen visual style explicitly calls for it, and always test at 300px wide.

**Fewer families, more weights**: One font family with 3–4 weights (400, 500, 600, 700) is better than two families with 2 weights each. Satori must load every weight as binary data — more families = more bytes = slower render.

**The "remove the font" test**: If replacing your chosen font with system Arial collapses the visual quality, you're over-relying on font personality. Good OG design works because of hierarchy and spacing, not because of a special font.

## 2. Type Scale for 1200px Canvas

Based on Perfect Fourth (1.333), the recommended proportion for OG cards where 3–4 levels of hierarchy are needed:

| Level | px | Use |
|-------|----|-----|
| `xs` | 20–22 | Legal text, copyright, extreme footnote |
| `sm` | 24–28 | Labels, tags, metadata, category badges |
| `base` | 32–36 | Body text, descriptions, secondary information |
| `md` | 42–48 | Subtitle, section headers, author names |
| `lg` | 56–72 | Page title (short, 1–6 words) |
| `xl` | 80–104 | Large title (1–3 words, hero cards) |
| `xxl` | 120–160 | Single statement, mega number, brand name |

**Why 24px minimum**: At 1200px canvas, 24px text renders to ~5px tall when the card is viewed at 250px wide (mobile feed). Below 24px, text becomes unreadable noise.

**Title-length to size mapping**:

| Chinese chars | English words | Recommended size |
|--------------|--------------|-----------------|
| 1–4 | 1–2 | 96–128px |
| 5–8 | 3–5 | 72–88px |
| 9–14 | 6–10 | 56–68px |
| 15–20 | 11–15 | 44–52px |
| 21+ | 16+ | Split to title + subtitle |

## 3. Font Pairing Formulas

Three tested formulas for OG cards. Pick one per style — don't mix across styles.

### Formula A: Single Family, Multi-Weight

```css
font-family: 'Inter'  /* or 'Geist' */
title:    weight 700, size 64–96px
subtitle: weight 400, size 32–40px
label:    weight 600, size 22–28px, uppercase + letter-spacing
```

Used by: Swiss Minimal, Brutalist, Newspaper.

### Formula B: Serif Display + Sans Body

```css
display:  'Playfair Display' | 'Source Serif' | 'Noto Serif SC'
title:    weight 700, size 64–88px, letter-spacing -0.01em
body:     'Inter' weight 400, size 28–36px
label:    'Inter' weight 500, size 20–24px, uppercase + letter-spacing 0.08em
```

Used by: Magazine Editorial, Newspaper.

### Formula C: Monospace

```css
family:   'JetBrains Mono' | 'Fira Code' | 'Cascadia Code'
title:    weight 700, size 56–80px
body:     weight 400, size 28–36px
label:    weight 500, size 20–24px, dimmed color
```

Used by: Terminal/CLI.

### Formula D: Pixel Display

```css
display:  'Press Start 2P' | 'VT323' | 'Pixelify Sans'
title:    size 28–48px (note: Press Start 2P runs large — halve normal sizes)
body:     size 20–28px in a readable sans fallback (Inter) or VT323 for full retro
label:    same as body, bold
```

Used by: Pixel Retro.

## 4. Weight Assignment

| Role | Recommended weight | Anti-pattern |
|------|-------------------|-------------|
| **Title** | 600–800 | Never below 500 — weak title hierarchy |
| **Subtitle** | 400–500 | Never bold — competes with title |
| **Body** | 400 | Never 600+ — body is for reading, not shouting |
| **Numbers/stats** | 700–800 | Large numbers carry weight naturally, reinforce with bold |
| **Labels/tags** | 500–600 | Needs to stand out from body but not compete with title |
| **Domain/footer** | 400–500 | Low hierarchy, not competing for attention |

**"The larger, the lighter"**: For display titles above 80px, consider dropping a weight level. An 96px title at weight 500 feels refined; at weight 800 it feels aggressive. This is mandatory for Magazine Editorial and Swiss Minimal styles.

## 5. Chinese Typography Specifics

**Line height**: Chinese characters are denser than Latin. Use 1.15–1.25 for titles, 1.4–1.55 for body text. Below 1.1, characters touch vertically. Above 1.6, lines feel disconnected.

**Character count per line**: Chinese titles above 20 characters per line become walls of text on OG cards. For titles longer than 20 characters, split into two lines with intentional breaks (at natural phrase boundaries, not mechanical mid-word).

**Font weight for Chinese**: Chinese glyphs at weight 400 already carry significant visual density. A 64px Chinese title at weight 700 on a 1200px canvas looks heavier than the same size in Latin. For editorial styles, prefer weight 500–600 for Chinese display titles where Latin would use 700.

**Font stack priority** (Satori context — fonts are explicitly loaded, not system stacks):
- Simplified Chinese: Noto Sans SC (subset), or use system fonts if Puppeteer
- Traditional Chinese: Noto Sans TC (subset)
- Both: subset to only characters that appear in titles (~200 chars typically)

## 6. Spacing & Layout Constraints

**Safe zone**: Keep all critical content within 1000px width (100px padding each side) and 550px height (40px top, 40px bottom padding from 630px). The outer 100px is the "edge zone" — logos, domain names, and decorative elements only.

**Title safe zone**: The title should occupy the horizontal center band, between 160px and 460px from the top (for 630px canvas). This keeps the title visible when cards are cropped in some platform views.

**Logo position**: Bottom-right (safe, never clipped) or top-left (brand-first). Avoid center — competes with title.

**Element spacing rules**:
- Title to subtitle: 16–24px gap
- Last text element to domain/footer: 40–56px gap
- Accent bar to first content: 0px (accent is at edge)
- Side padding: 80–120px from canvas edge

## 7. Common Typography Mistakes in OG Images

1. **Title too small for the canvas**: A 32px title on a 1200px canvas covers only 2.7% of the height. It reads as "metadata," not "headline."
2. **Title too large with many characters**: 20 Chinese characters at 96px will overflow. Map character count to size before coding.
3. **Body text too light**: Gray (#999) body text on a dark background fails contrast at thumbnail size. Minimum contrast ratio 4.5:1 for all text.
4. **Mixed alignment**: Center title with left-aligned body creates a disoriented focal point. Align all primary text to the same axis.
5. **No hierarchy**: Title, subtitle, body, and domain all at similar sizes (within 10px range). The largest element should be at least 2x the smallest.
6. **Letter-spacing on body text**: Positive letter-spacing on Chinese body text destroys readability. Only use on English uppercase labels.
7. **WOFF2 font format**: Satori supports TTF and OTF only. WOFF/WOFF2 must be converted before loading.
