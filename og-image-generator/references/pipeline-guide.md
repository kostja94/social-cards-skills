# Pipeline Guide — Satori vs AI Generation

> **用途**：Agent 选择生成管线的决策指南——Satori(排版型) vs AI(纹理型) vs Hybrid(混合)。
> **引用**：[style-system-v3.md](./style-system-v3.md) | [SKILL.md](../SKILL.md) | [content-strategy.md](./content-strategy.md)

---

## Pipeline Comparison

| Dimension | Satori Pipeline | AI Pipeline | Hybrid Pipeline |
|-----------|----------------|-------------|-----------------|
| **How it works** | JSX → Satori → SVG → resvg → PNG | LLM理解内容 → Prompt → AI模型 → 完整图像（文字+视觉一次出） | AI生成背景/纹理 → Satori叠加文字 |
| **Speed** | 100-500ms | 5-15s | 5-15s (AI) + 100ms (Satori) |
| **Cost per image** | ~$0 | ~$0.067 (Nano Banana 2) | Same as AI |
| **Text accuracy** | 100% | ~95-99% (Gemini 3.1 / GPT Image 2 / Flux 均可靠) | 100% (Satori兜底) |
| **CJK support** | ✅ (with font loading) | ✅ (Gemini/GPT Image 2 支持良好) | ✅ (Satori兜底) |
| **Nativity** | 代码排版 | AI原生创作，一次出图 | 两步拼接 |
| **Photorealism** | ❌ (external URL images only) | ✅ | ✅ (background is AI) |
| **Textures** | Limited (SVG patterns only) | ✅ (halftone, grain, noise) | ✅ |
| **Lighting/Depth** | ❌ (no blur/filter support) | ✅ (bokeh, shadows, glow) | ✅ |
| **Layout complexity** | Flexbox only (no CSS Grid) | ✅ (model handles composition) | ✅ |
| **Edge compatible** | ✅ (WASM) | ❌ (needs API call) | ❌ (needs API call) |

---

## Pipeline Selection Decision Tree

```
FUNCTION selectPipeline(style, constraints):
  
  // Gate 1: Hard constraints
  IF constraints.budget == "zero" AND style IN (#11-#16):
    RETURN {
      pipeline: "Satori",
      warning: "Texture styles (#11-#16) cannot render full effects without AI. 
                Text Overlay: use external image URL. 
                Cinematic/Riso/Vaporwave/Grunge: downgrade to nearest Satori style."
    }
  
  IF constraints.requiresCJKTextAccuracy AND style IN (#12,#14,#15,#16):
    RETURN {
      pipeline: "Hybrid",
      strategy: "AI generates background/texture → Satori overlays precise CJK text"
    }
  
  IF constraints.speed == "critical":
    RETURN {
      pipeline: "Satori",
      availableStyles: [#1-#10]
    }
  
  // Gate 2: Style-native pipeline
  SWITCH style:
    CASE #1-#6 (Swiss, Magazine, Terminal, Pixel, Brutalist, Newspaper):
      → "Satori" (zero cost, instant, text-perfect)
    
    CASE #7-#10 (Neo-Brutalism, Bento Grid, Neo-Swiss Gradient, Dark Gradient):
      → "Satori" (native layout styles, all effects achievable in Satori)
    
    CASE #11 (Text Overlay):
      IF hasBackgroundImage:
        → "Satori" (use external image URL as background)
      ELSE:
        → "Hybrid" (AI generates background → Satori overlays text)
    
    CASE #13 (Collage):
      → "Hybrid" (AI generates collage layout/texture → Satori overlays text on solid panels)
    
    CASE #12, #14, #15, #16 (Cinematic, Risograph, Vaporwave, Grunge):
      → "Hybrid" (AI generates full atmosphere/texture → Satori overlays critical text)
  
  // Default: Hybrid for all texture styles
  RETURN { pipeline: "Hybrid", reason: "Best quality + text accuracy" }
```

---

## Style → Pipeline Mapping

| # | Style | Primary Pipeline | Fallback | Notes |
|---|-------|-----------------|----------|-------|
| 1 | Swiss Minimal | Satori | — | Pure layout |
| 2 | Magazine Editorial | Satori | — | Typography + layout |
| 3 | Terminal/CLI | Satori | — | Monospace + pure colors |
| 4 | Pixel Retro | Satori | — | Blocky borders + pixel fonts |
| 5 | Brutalist | Satori | — | B&W + hard borders |
| 6 | Newspaper | Satori | — | Multi-column + rules |
| 7 | Neo-Brutalism | Satori | — | Colored blocks + hard shadows |
| 8 | Bento Grid | Satori | — | Card grid layout |
| 9 | Neo-Swiss Gradient | Satori | — | Gradient + minimal layout |
| 10 | Dark Gradient+Texture | Satori | — | SVG dot pattern + radial gradient |
| 11 | Text Overlay | **AI-Native** | Hybrid (CJK/brand) | 一次出图，文字+背景融合 |
| 12 | Cinematic | **AI-Native** | Hybrid | 光影/景深/颗粒无法Satori模拟 |
| 13 | Collage | **AI-Native** | Hybrid | 撕边/胶带/层叠需AI原生 |
| 14 | Risograph | **AI-Native** | — | halftone网点/叠印需AI原生 |
| 15 | Vaporwave | **AI-Native** | — | 故障/霓虹/雕塑需AI原生 |
| 16 | Grunge | **AI-Native** | — | 噪点/做旧/复印纹理需AI原生 |
| 17 | AI Painterly | **AI-Native** | — | 水彩/油画/水墨——文字即画 |
| 18 | Abstract Gradient | **AI-Native** | — | 零文字，纯视觉场 |
| 19 | AI Sticker/Badge | **AI-Native** | — | 单标签+场景，短文字高可靠 |
| 20 | AI Infographic | **AI-Native** | — | 数据可视化感，视觉冲击优先 |

---

## Hybrid Pipeline — Optional Fallback

Hybrid is a **safety net**, not the default. Use it only when:

1. **Text must be 100.0% accurate** — legal product names, trademarked terms, exact pricing numbers, URLs that cannot be wrong
2. **CJK text + older AI model** — if the available model has known CJK issues (pre-2025 models)
3. **Brand compliance** — logo/font must match brand guidelines exactly

For everything else, AI-Native is preferred: one prompt, one image, more organic result.

### Hybrid Implementation (when needed)

```tsx
// Step 1: AI generates background
const bgPrompt = buildBackgroundPrompt(style, contentProfile);
const bgImageUrl = await aiImageGeneration(bgPrompt);
// Returns: data URL or https URL of the background image

// Step 2: Satori renders text overlay on top of background
const ogImage = await satoriRender({
  background: bgImageUrl,  // AI-generated background
  overlay: {
    gradientMask: true,    // Dark gradient for text legibility
    maskOpacity: 0.4,
  },
  elements: [
    { type: 'title', text: contentProfile.title, style: styleRules.title },
    { type: 'subtitle', text: contentProfile.subtitle, style: styleRules.subtitle },
    { type: 'domain', text: contentProfile.domain, style: styleRules.domain },
  ]
});
```

### AI Background Prompt Templates

For each texture style, the background prompt focuses on atmosphere/texture only — no text:

**Text Overlay background**:
```
Editorial photograph for social media background, 1200x630px.
Subject: {scene_description}. Soft lighting, shallow depth of field.
No text, no logos, no UI elements. Clean zone in center for text overlay.
```

**Cinematic background**:
```
Cinematic widescreen plate, 1200x630px, 1.91:1 ratio.
{color_grading_preset} color grading. Shallow bokeh. Film grain.
Upper 2/3 is atmospheric "empty frame." Lower 1/3 darker for title.
No text in image.
```

**Collage background**:
```
Collage layout background, 1200x630px.
2-4 panels with torn edges, washi tape, slightly overlapping.
One panel is solid {color} — this is where text will go.
Other panels show {texture_description}.
No text in the image itself.
```

**Risograph background**:
```
Risograph print background, 1200x630px.
Exactly {color_a} and {color_b} on off-white paper (#faf8f5).
Halftone dots visible. Slight ink offset at color edges.
Leave a clean central text zone. No text in image.
```

**Vaporwave background**:
```
Vaporwave aesthetic background, 1200x630px.
Neon sunset gradient (pink → cyan). Greek statue silhouette.
CRT scanlines. Grid horizon. No text in image.
```

**Grunge background**:
```
Grunge texture background, 1200x630px.
Heavy noise grain and dust. Faded black/white photocopy texture.
Crease marks. Distressed punk zine aesthetic. No text in image.
```

---

## AI-Native Prompt Templates (#11-20)

Unlike the Hybrid templates (which ask AI for "background only, no text"), AI-Native prompts ask the model to generate the **complete image with text built in**. Modern models (Gemini 3.1 Flash Image, GPT Image 2, Flux) handle this reliably.

### #11 Text Overlay (AI-Native prompt)
```
Social media preview card, 1200x630px. Full-width photograph of {scene}.
Dark gradient overlay on lower half. Large white bold title "{title}" centered.
Small "{author} · {date}" below title. "{domain}" in bottom-right corner.
Clean, editorial photography style. Text must be sharp and perfectly legible.
```

### #12 Cinematic (AI-Native prompt)
```
Cinematic social media card, 1200x630px. Film grading: {teal-orange | golden hour}.
Shallow bokeh, film grain, dramatic side light. Upper 2/3 is atmospheric frame.
Title "{title}" in elegant serif font, positioned in lower 1/3.
"{author}" in italic below. "{domain}" bottom-right. A24 film aesthetic.
```

### #13 Collage (AI-Native prompt)
```
Collage-style social media card, 1200x630px. 2-4 layered panels with torn paper edges.
Washi tape in corners. One solid {color} panel with bold text "{title}".
Other panels: {image_description}. Subtle shadows between layers.
"{domain}" on a small tag. Text must be sharp and readable. Indie zine aesthetic.
```

### #14 Risograph (AI-Native prompt)
```
Risograph print social media card, 1200x630px. Only {color_a}, {color_b}, and off-white.
Halftone dots on color blocks. Slight ink offset at edges. Uncoated paper texture.
Bold title "{title}" in {color_a or color_b} — text should be affected by the ink offset
slightly but remain perfectly legible. "{domain}" in hand-drawn border. Art school poster style.
```

### #15 Vaporwave (AI-Native prompt)
```
Vaporwave social media card, 1200x630px. Neon pink-to-cyan sunset sky.
Greek statue silhouette offset to one side. CRT scanlines, VHS noise at bottom.
Title "{title}" in wide neon font with RGB channel shift glitch effect.
"２０２６" in fullwidth characters. "{domain}" small at bottom. Retro internet aesthetic.
```

### #16 Grunge (AI-Native prompt)
```
Grunge photocopy social media card, 1200x630px. Faded black and off-white palette.
Heavy noise grain, dust, photocopy artifacts. Crease marks, stains.
Bold distressed title "{title}" — ink should look slightly uneven, photocopied.
"{data_row}" below in smaller faded text. "{domain}" with rough border. 90s punk zine style.
```

### #17 AI Painterly (NEW — AI-Native)
```
Painterly social media card, 1200x630px. {watercolor | oil painting | ink wash | gouache}
style. The title "{title}" is painted into the composition — letters have brush texture,
slight irregularity, organic paint edges. {scene_description} as the painted background.
Colors: {palette}. The text IS the painting, not overlaid. Artistic, gallery-worthy.
```

### #18 Abstract Gradient (NEW — AI-Native)
```
Abstract gradient social media card, 1200x630px. Pure visual — NO text, NO letters.
Fluid organic color fields in {palette}. Soft blending, no hard edges. Atmospheric,
meditative, brand-elevating. Like a Rothko painting adapted for social preview.
Subtle {brand_color} accent zone where a logo could sit. Minimal, premium.
```

### #19 AI Sticker/Badge (NEW — AI-Native)
```
Bold sticker/badge social media card, 1200x630px. A single large badge with text
"{title}" (max 1-3 words) in bold sans-serif, placed on a {scene_description} background.
Sticker has slight 3D depth, subtle shadow. Clean, punchy, Telegram/Discord aesthetic.
Background is atmospheric but secondary to the badge. Pop art energy.
```

### #20 AI Infographic (NEW — AI-Native)
```
Editorial infographic social media card, 1200x630px. Visual data-storytelling style.
Headline "{title}" as the anchor. Key data points rendered as visual elements:
bar-like comparisons, large numbers, icons — not precise charts, but "chart-like visuals."
Colors: {palette}. Information-dense but scannable. The data IS the visual.
Like a New York Times data section hero image. "{domain}" small at bottom.
```

---

## When NOT to Use AI Generation

1. **Zero-budget projects**: Satori pipeline is free. Use styles #1-10 only.
2. **Real-time/high-volume**: Satori renders in <500ms. AI takes 5-15s per image.
3. **CJK-heavy content without hybrid**: AI models still struggle with Chinese/Japanese text. Always use hybrid.
4. **Brand consistency**: AI outputs vary run-to-run. Satori produces identical output for identical inputs.
5. **Edge runtime**: Satori runs on Cloudflare Workers / Vercel Edge. AI requires external API.

---

*Last updated: 2026-06-02*
