# OG Image Content Strategy — Page Priority Framework

> **用途**：Agent 生成 OG 图前的第一个决策点——判断页面是否值得生成、做到什么程度。
> **引用**：[SKILL.md](../SKILL.md) §1.2 | [style-system-v3.md](./style-system-v3.md) | [pipeline-guide.md](./pipeline-guide.md)

---

## 1. S/A/B/C Priority Definition

| Level | Definition | Strategy | AI Cost Justification |
|-------|-----------|----------|----------------------|
| **S (Must-do)** | Page exists to be shared. No OG image = wasted social traffic. | Per-page custom generation. No budget limit. Content-aware workflow. | $0.067/image is fully justified |
| **A (High)** | Shared moderately; preview image directly determines CTR/conversion. | Per-page generation. At least 2 style variants for A/B testing. Budget priority. | $0.067/image is worth it |
| **B (Medium)** | Occasionally shared. Nice to have, not noticed if missing. | Template batch generation if >5 pages; otherwise per-page. | Acceptable but optional |
| **C (Skip)** | Almost never shared. No ROI for OG image. | One brand-default 1200×630 image for the entire site. | Don't spend AI cost |

### Agent Decision Rules

```
IF page_type IN (S-list):
  → priority = S, budget = unlimited, strategy = content_aware

ELIF page_type IN (A-list):
  → priority = A, budget = per_page, strategy = content_aware_with_variants

ELIF page_type IN (B-list):
  → priority = B, strategy = template_batch_if_many_else_custom

ELSE:
  → priority = C, strategy = brand_default, skip_custom_generation
```

### Site-Type Priority Modifier

The base priority (from page type) is adjusted by site type:

```
IF site_type IN (Content/Media, News, DevTool/OpenSource, AI/ML, Independent Publishing):
  → boost: B-level pages can be treated as A-level (per-page custom generation)
  Reason: These sites' traffic relies heavily on social sharing.

IF site_type IN (Healthcare, Government, FinTech):
  → suppress: Reduce style aggressiveness (avoid Brutalist/Neo-Brutalism/Vaporwave)
  Reason: Credibility and trust are paramount.

IF site_type IN (Personal/Portfolio):
  → boost: All B-level pages can use A-level strategy
  Reason: Few total pages; each image boosts personal brand perception.
```

---

## 2. Page Type Taxonomy (~100 types in 13 categories)

### A. Content/Article Pages (naturally high sharing)

| # | Page Type | Priority | Primary Style | Secondary |
|---|-----------|----------|---------------|-----------|
| A01 | Blog Post | **S** | Magazine | Newspaper, Text Overlay |
| A02 | Long-form Guide | **S** | Magazine | Text Overlay |
| A03 | News Article | **S** | Newspaper | Text Overlay |
| A04 | Research Report | **S** | Magazine, Swiss | Risograph |
| A05 | Case Study | **S** | Swiss, Magazine | — |
| A06 | Tutorial / How-to | **A** | Magazine, Swiss | Text Overlay |
| A07 | Listicle | **A** | Magazine, Newspaper | Bento Grid |
| A08 | Opinion / Essay | **A** | Magazine, Risograph | Cinematic |
| A09 | Interview / Q&A | **A** | Magazine, Newspaper | — |
| A10 | Newsletter Issue | **S** | Newspaper, Magazine | Collage |
| A11 | Scholarly Article | **B** | Swiss, Newspaper | — |
| A12 | Satirical Article | **B** | Newspaper, Risograph | — |
| A13 | Sponsored Content | **B** | Magazine, On-brand | — |
| A14 | Social Media Posting | **B** | Neo-Brutalism, Brutalist | — |

### B. Product/Commercial Pages (high conversion value)

| # | Page Type | Priority | Primary Style | Secondary |
|---|-----------|----------|---------------|-----------|
| B01 | Homepage | **A** | Swiss, Neo-Swiss Gradient | Dark Gradient |
| B02 | Pricing | **A** | Swiss, Bento Grid | — |
| B03 | Feature Page | **A** | Swiss, Bento Grid | — |
| B04 | Use Case Page | **A** | On-brand, Bento Grid | — |
| B05 | Comparison / vs Page | **A** | Swiss, Newspaper | — |
| B06 | Product Detail (eCommerce) | **A** | On-brand, Text Overlay | — |
| B07 | Integration Page | **B** | Swiss, On-brand | — |
| B08 | Template / Resource | **B** | Swiss, Terminal | — |
| B09 | App Marketplace Listing | **B** | On-brand | — |
| B10 | Demo / Trial | **C** | Brand default | — |
| B11 | Waitlist | **A** | Neo-Brutalism, Brutalist | Cinematic |
| B12 | Changelog | **S** | Terminal | Dark Gradient |
| B13 | Roadmap | **B** | Swiss, Terminal | — |
| B14 | Campaign Landing | **S** | Neo-Brutalism, Collage | Risograph, Vaporwave, Grunge |
| B15 | Launch Announcement | **S** | Neo-Brutalism, Brutalist | Collage, Vaporwave |
| B16 | Product Collection | **B** | On-brand, Bento Grid | — |
| B17 | Seasonal Collection | **A** | Magazine, Cinematic | — |
| B18 | Deal / Promotion | **A** | Neo-Brutalism, Brutalist | — |

### C. Brand/About Pages (low-frequency, high-trust)

| # | Page Type | Priority | Primary Style | Secondary |
|---|-----------|----------|---------------|-----------|
| C01 | About Page | **B** | Magazine, On-brand | — |
| C02 | Brand Story | **B** | Magazine, Cinematic | Risograph |
| C03 | Press / Media Center | **B** | On-brand, Newspaper | — |
| C04 | Careers / Jobs | **B** | On-brand | — |
| C05 | Team Page | **B** | Magazine, Collage | — |
| C06 | Contact | **C** | Brand default | — |
| C07 | Profile Page | **B** | Magazine, Collage | — |

### D. Directory/Navigation Pages (content organization)

| # | Page Type | Priority | Primary Style | Secondary |
|---|-----------|----------|---------------|-----------|
| D01 | Blog Index | **B** | Magazine, Newspaper | — |
| D02 | Category Page | **B** | On-brand, Bento Grid | — |
| D03 | Tag Page | **C** | Brand default | — |
| D04 | Author Page | **B** | Magazine, Newspaper | Collage |
| D05 | Hub / Topic Page | **B** | On-brand, Bento Grid | — |
| D06 | Sitemap | **C** | — (not needed) | — |
| D07 | Events Calendar | **B** | Neo-Brutalism, Magazine | — |

### E. Documentation/Developer Pages (technical)

| # | Page Type | Priority | Primary Style | Secondary |
|---|-----------|----------|---------------|-----------|
| E01 | Documentation | **B** | Terminal, Swiss | Dark Gradient |
| E02 | API Reference | **B** | Terminal | Dark Gradient |
| E03 | SDK / Library | **B** | Terminal | — |
| E04 | Quickstart Guide | **A** | Terminal, Swiss | — |
| E05 | Release Notes | **S** | Terminal | — |
| E06 | Status Page | **B** | Terminal, Swiss | — |
| E07 | Error Page (404/500) | **C** | Brand default | — |

### F. Transaction/Account Pages (private)

| # | Page Type | Priority |
|---|-----------|----------|
| F01–F08 | Cart, Checkout, Order Confirm, Login, Signup, Dashboard, Billing, Account | **C** |

### G. E-Commerce/Catalog Pages

| # | Page Type | Priority | Primary Style | Secondary |
|---|-----------|----------|---------------|-----------|
| G01 | Product Collection | **B** | On-brand, Bento Grid | — |
| G02 | Seasonal Collection | **A** | Magazine, Cinematic | — |
| G03 | Deal / Promotion | **A** | Neo-Brutalism, Brutalist | — |
| G04 | Catalog Page | **B** | On-brand, Bento Grid | — |

### H. Search/Discovery Pages

| # | Page Type | Priority | Primary Style |
|---|-----------|----------|---------------|
| H01–H03 | Search Results, Advanced Search, Discover/Recommendations | **C** (or **B** for Discover) |

### I. Media/Multimedia Pages

| # | Page Type | Priority | Primary Style | Secondary |
|---|-----------|----------|---------------|-----------|
| I01 | Video Page | **B** | Text Overlay, Cinematic | — |
| I02 | Podcast Episode | **B** | Magazine, Text Overlay | — |
| I03 | Image Gallery | **B** | Collage, Bento Grid | — |
| I04 | Video Gallery | **B** | Text Overlay, Cinematic | — |
| I05 | Live Stream | **A** | Neo-Brutalism, Brutalist | Dark Gradient |

### J. Community/Interactive Pages

| # | Page Type | Priority | Primary Style | Secondary |
|---|-----------|----------|---------------|-----------|
| J01 | Community Hub | **B** | Neo-Brutalism, Brutalist | Dark Gradient |
| J02 | Forum Thread | **B** | Terminal, Brutalist | — |
| J03 | Q&A Page | **B** | Swiss, Newspaper | — |
| J04 | User Profile | **C** | Brand default | — |
| J05 | Discussion Group | **B** | Neo-Brutalism, Brutalist | — |

### K. Tools/Utilities Pages

| # | Page Type | Priority | Primary Style | Secondary |
|---|-----------|----------|---------------|-----------|
| K01 | Free Tool | **A** | Swiss, Terminal | Neo-Brutalism |
| K02 | Calculator | **B** | Swiss | — |
| K03 | Generator | **A** | Terminal, Swiss | Neo-Brutalism, Dark Gradient |
| K04 | Quiz / Assessment | **B** | Neo-Brutalism, Brutalist | — |
| K05 | Webform | **B** | Swiss | — |

### L. Events/Ticketing Pages

| # | Page Type | Priority | Primary Style | Secondary |
|---|-----------|----------|---------------|-----------|
| L01 | Event Page | **A** | Neo-Brutalism, Collage | Cinematic |
| L02 | Ticketing | **B** | Neo-Brutalism, Swiss | — |
| L03 | Conference Page | **A** | Brutalist, Magazine | Collage |
| L04 | Webinar | **B** | Magazine, Neo-Swiss Gradient | — |
| L05 | Meetup | **B** | Neo-Brutalism, Collage | — |

### M. Miscellaneous

| # | Page Type | Priority | Primary Style | Secondary |
|---|-----------|----------|---------------|-----------|
| M01 | FAQ Page | **B** | Swiss, Newspaper | — |
| M02 | Service Status | **B** | Terminal, Swiss | — |
| M03 | Directory Listing | **B** | Swiss, Bento Grid | — |
| M04 | Step-by-Step Guide | **B** | Swiss, Terminal | — |
| M05 | Donation Page | **A** | Magazine, On-brand | — |
| M06 | Crowdfunding Page | **A** | Neo-Brutalism, Collage | Grunge |
| M07 | Subscription Page | **A** | Swiss, Neo-Swiss Gradient | — |
| M08 | Landing Page (generic) | **A** | Swiss, Neo-Brutalism | Text Overlay |

---

## 3. Site Type Taxonomy (35 types)

| # | Site Type | Primary Styles | Avoid |
|---|-----------|---------------|-------|
| 1 | SaaS | Swiss, Neo-Swiss Gradient, Bento Grid, Dark Gradient | Brutalist (too aggressive for B2B) |
| 2 | DevTool / Open Source | Terminal, Dark Gradient, Swiss | Corporate on-brand |
| 3 | AI/ML Product | Terminal, Neo-Brutalism, Dark Gradient, Bento Grid | Traditional corporate |
| 4 | eCommerce / DTC | On-brand, Magazine, Bento Grid, Text Overlay | Terminal (too cold) |
| 5 | Marketplace (eCommerce platform) | On-brand, Bento Grid | — |
| 6 | Content / Media / Blog | Magazine, Newspaper, Text Overlay | Terminal |
| 7 | News | Newspaper, Text Overlay | Brutalist, Neo-Brutalism |
| 8 | Education / Online Courses | Swiss, Magazine, Neo-Swiss Gradient | Terminal, Brutalist |
| 9 | Personal / Portfolio | Brutalist, Collage, Cinematic, Risograph, Neo-Brutalism, Bento Grid | Corporate on-brand |
| 10 | Non-Profit / Charity | Magazine, Swiss, Neo-Swiss Gradient | — |
| 11 | Healthcare | Swiss, Magazine, Neo-Swiss Gradient | Brutalist, Terminal, Neo-Brutalism |
| 12 | Events / Ticketing | Neo-Brutalism, Collage, Cinematic, Magazine | — |
| 13 | FinTech | Swiss, Neo-Swiss Gradient, Dark Gradient | Brutalist, Neo-Brutalism |
| 14 | Real Estate | On-brand, Text Overlay, Neo-Swiss Gradient | Terminal |
| 15 | Travel / Hospitality | Magazine, Cinematic, Text Overlay | Terminal, Brutalist |
| 16 | Recruitment / Jobs | On-brand, Swiss | Brutalist |
| 17 | Gaming / Esports | Pixel, Brutalist, Neo-Brutalism, Cyber-Brutalism/Vaporwave, Dark Gradient | Swiss (too cold) |
| 18 | Agency / Services | On-brand, Magazine, Neo-Brutalism (differentiation) | — |
| 19 | Independent Publishing / Zine | Risograph, Brutalist, Newspaper, Collage | Corporate on-brand |
| 20 | Community / Forum | Brutalist, Neo-Brutalism, Terminal, Dark Gradient | Swiss |
| 21 | Government / Public | Swiss, Newspaper | Brutalist, Neo-Brutalism, Pixel |
| 22 | Legal | Swiss, Newspaper | Brutalist, Neo-Brutalism |
| 23 | Music / Audio Streaming | Magazine, Cinematic, Vaporwave, Collage | — |
| 24 | Video / Streaming | Text Overlay, Cinematic | — |
| 25 | Design Tools / Creative | Brutalist, Neo-Brutalism, Bento Grid, Collage | — |
| 26 | Lifestyle / Wellness | Magazine, Cinematic, On-brand, Text Overlay | — |
| 27 | Food / Delivery | Text Overlay, Magazine | — |
| 28 | Automotive | Cinematic, On-brand, Text Overlay | — |
| 29 | Crypto / Web3 | Neo-Brutalism, Vaporwave, Pixel, Dark Gradient, Terminal | Swiss |
| 30 | Enterprise / Internal | Swiss, On-brand, Neo-Swiss Gradient | Brutalist, Neo-Brutalism |
| 31 | Dating / Social | Magazine, Bento Grid, On-brand | — |
| 32 | Deals / Coupons | Neo-Brutalism, Brutalist | — |
| 33 | Weather / Reference | Swiss, Bento Grid | — |
| 34 | Wiki / Knowledge Base | Swiss, Newspaper, Bento Grid | — |
| 35 | Large Corporate | Swiss, Neo-Swiss Gradient, On-brand | Brutalist, Neo-Brutalism, Vaporwave |

---

## 4. Visual Recipe Card Format

For each (page_type, style) combination, the Agent builds a visual recipe:

```
{
  page_type: "blog_post",
  style: "magazine",
  priority: "S",
  must_include: ["title (1-2 lines)", "date", "author", "domain"],
  recommended: ["featured image", "reading time badge", "category tag"],
  forbidden: ["title over 3 lines", "body paragraphs on card", "watermark-style logo"],
  tone: "Content-forward > brand-forward. Make reader think 'this article is worth clicking.'",
  color_preset: "Ink Classic",
  satori_template: "templates/magazine.tsx",
  ai_prompt: "Magazine editorial style OG image for a blog post titled '{title}'...",
  agent_checks: [
    "Serif font for display title",
    "Background is warm paper tone, not pure white/black",
    "At least one non-text visual anchor"
  ]
}
```

---

## 5. Pre-Flight Checks (Agent YAML)

```yaml
pre_flight:
  - id: page-classification
    description: Page type identified from URL pattern + content signals
  - id: priority-determination
    description: S/A/B/C level assigned before any generation work
  - id: site-type-detection
    description: Site type inferred from content, title patterns, and business signals
  - id: c-level-gate
    description: If C-level, suggest brand-default and confirm before proceeding
  - id: platform-built-in-check
    description: Check if hosting platform (Vercel, WordPress, Ghost, etc.) already auto-generates adequate OG images
```

---

*Last updated: 2026-06-02*
