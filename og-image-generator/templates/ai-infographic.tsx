/**
 * AI Infographic Style — AI-Native Prompt Template
 *
 * Pipeline: AI-Native only. Data visual storytelling — "chart-like" visuals,
 * not precise charts. The data IS the visual. Editorial data art aesthetic.
 *
 * This is NOT for precise data visualization (use a chart library for that).
 * This is for making data FEEL impactful at thumbnail size.
 */

// ─── AI Prompt Template ──────────────────

export const INFOGRAPHIC_PROMPT = `
Editorial infographic / data-storytelling social media preview card, 1200x630px.
Headline "{title}" is the largest, most prominent element — bold, anchoring the composition.
Key data points rendered as visual comparison elements (NOT precise charts — editorial
data art). Use techniques like:
- Size comparison: larger numbers = larger visual elements
- Horizontal bar-like comparisons showing relative magnitude
- Big-number callouts with short labels
- Color intensity showing ranking
- Icons or simple visual metaphors reinforcing each data point

Data to visualize: {data_points}

Layout: headline at top or left, data elements flowing below or beside. Clean reading path.
Colors: {palette} — bold enough to distinguish categories, not chaotic.
Information-dense but scannable at small size. The data IS the visual — not text next to a chart.
Like The New York Times data section hero, The Economist daily chart, or Information is Beautiful.
"{domain}" small at bottom-right. "{source_line}" tiny below domain if applicable.
Editorial, trustworthy, makes you want to stop and read the numbers.
`;

// ─── Variant: Comparison Focus ──────────────────

export const INFOGRAPHIC_COMPARISON_PROMPT = `
Head-to-head comparison infographic social media card, 1200x630px.
"{title}" as the main headline. Two or three subjects compared side by side:
{comparison_data}. Visual comparison elements — larger bars/blocks for higher values,
color coding per subject (e.g. blue vs orange). The comparison IS the visual.
Clean, editorial, easy to scan. Like a consumer reports comparison graphic.
"{domain}" at bottom. "{source}" tiny if applicable.
`;

// ─── Variant: Timeline / Process ──────────────────

export const INFOGRAPHIC_TIMELINE_PROMPT = `
Timeline / process infographic social media card, 1200x630px.
"{title}" as the headline. A visual flow showing {num_steps} steps or milestones:
{step_descriptions}. Connected visual elements (not a literal horizontal line —
organic flow, curved path, or stacked progression). Each step has a short label.
Left-to-right or top-to-bottom reading flow. Clean, editorial, scannable.
Colors: {palette}. "{domain}" at bottom.
`;

// ─── Example Config ──────────────────
export const EXAMPLE_CONFIG = {
  title: "AI Image Generator Benchmark 2026",
  data_points: "Flux: Visual 9.2/10, Midjourney: Aesthetic 9.5/10, DALL·E 3: Text 8.7/10, GPT Image 2: Versatile 8.9/10. Nano Banana: Speed 9.0/10",
  palette: "navy blue, warm amber, charcoal, white",
  source_line: "Source: Independent benchmark, May 2026",
  domain: "yoursite.com",
};
