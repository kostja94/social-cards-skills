/**
 * AI Painterly Style — AI-Native Prompt Template
 *
 * Pipeline: AI-Native only. The painting IS the output — text and background
 * are the same unified medium. No Satori step. No Hybrid needed.
 *
 * Modern AI models (Gemini 3.1, GPT Image 2, Flux) handle text-in-painting well.
 * The slight irregularity of painted letterforms is intentional, not a bug.
 */

// ─── AI Prompt Templates ──────────────────

export const WATERCOLOR_PROMPT = `
Watercolor painting social media preview card, 1200x630px, 1.91:1 aspect ratio.
Title "{title}" is hand-painted into the composition — letters have visible watercolor
brush strokes, pigment pooling at edges, soft bleeding at color transitions.
Background: {scene_description} in loose watercolor wash.
Color palette: {warm florals | cool ocean tones | monochrome ink}.
The entire image is one unified watercolor painting — text IS the painting, not overlaid.
"{domain}" painted small in bottom-right corner, same watercolor style.
Gallery wall quality. Handcrafted, organic, anti-perfection.
`;

export const OIL_PAINTING_PROMPT = `
Oil painting social media preview card, 1200x630px, 1.91:1 aspect ratio.
Title "{title}" is painted with visible impasto brushwork — thick paint strokes,
palette knife texture, rich pigment. Letters have organic edges, not crisp vectors.
Background: {scene_description} in expressive oil painting style.
Color palette: {earthy rich tones | vibrant expressionist | moody chiaroscuro}.
Unified oil painting — text and background are the same painted surface.
"{domain}" painted small at bottom. Museum quality. Thick, tactile, alive.
`;

export const INK_WASH_PROMPT = `
Sumi-e / ink wash social media preview card, 1200x630px, 1.91:1 aspect ratio.
Title "{title}" is brushed with black ink — varying stroke width, dry brush texture
at stroke ends, organic ink bleeding. Asian calligraphy aesthetic.
Background: {scene_description} in grey ink wash, atmospheric and minimal.
Monochrome with subtle warm paper tone. Negative space is intentional.
The title IS the brush painting — unified, not overlaid.
"{domain}" as a small red seal (hanko) in corner. Zen, meditative, refined.
`;

// ─── Example Config ──────────────────
export const EXAMPLE_CONFIG = {
  style: "watercolor" as const,
  title: "The Art of Building Products",
  scene_description: "abstract organic forms suggesting growth and creation",
  palette: "warm florals — rose, amber, sage green",
  domain: "yoursite.com",
};
