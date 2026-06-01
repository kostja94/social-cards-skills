/**
 * Abstract Gradient Style — AI-Native Prompt Template
 *
 * Pipeline: AI-Native only. Zero text. Pure visual color field.
 * The color IS the message. No Satori step — nothing to overlay.
 */

// ─── AI Prompt Templates ──────────────────

export const WARM_ABSTRACT_PROMPT = `
Abstract color-field social media preview card, 1200x630px, 1.91:1 aspect ratio.
ABSOLUTELY NO text, NO letters, NO numbers, NO symbols of any kind.
Pure visual — fluid organic blending of {color_palette}.
Soft transitions between color zones, no hard edges, no geometric shapes.
Atmospheric, meditative, deeply premium. Like a Rothko or Helen Frankenthaler
painting cropped exactly to a 1.91:1 social card ratio.
Subtle lighter zone in the {corner} where a brand logo could naturally rest —
this zone should emerge from the color field, not cut into it.
Minimal, sophisticated, brand-defining. The color speaks.
`;

export const COOL_ABSTRACT_PROMPT = `
Abstract color-field social media preview card, 1200x630px, 1.91:1 aspect ratio.
ZERO text — NO letters, NO words, NO numbers anywhere.
Fluid cool-toned color blending: {color_palette}. Soft atmospheric gradients.
Misty, ethereal, meditative quality. No hard divisions, no geometric patterns.
Premium brand mood piece. Like a James Turrell light installation flattened to 1.91:1.
Subtle {brand_color} presence emerging organically in the {corner} area.
Sophisticated, understated, pure emotion through color.
`;

export const BOLD_ABSTRACT_PROMPT = `
Abstract bold color-field social media preview card, 1200x630px, 1.91:1 aspect ratio.
NO text whatsoever. Pure bold color interaction.
Saturated {color_palette} with confident, sweeping color transitions.
Not a gradient — organic color masses pushing against each other with soft edges.
Energetic, modern, confident. Abstract expressionist meets brand design.
A lighter zone in the {corner} where a logo belongs — the composition builds toward it.
Bold, undeniable, pure visual identity.
`;

// ─── Example Config ──────────────────
export const EXAMPLE_CONFIG = {
  variant: "warm",
  palette: "terracotta, warm ochre, cream, deep burgundy",
  corner: "bottom-right",
  brand_color: "terracotta",
};
