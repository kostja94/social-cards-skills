/**
 * AI Sticker/Badge Style — AI-Native Prompt Template
 *
 * Pipeline: AI-Native only. Short text (1-3 words) is AI's sweet spot.
 * Badge + atmospheric background, one prompt, one image.
 *
 * KEY CONSTRAINT: Title MUST be 1-3 words. Longer titles = use Text Overlay (#11).
 */

// ─── AI Prompt Template ──────────────────

export const STICKER_PROMPT = `
Bold sticker badge social media preview card, 1200x630px, 1.91:1 aspect ratio.
A single large, prominent badge/sticker with the text "{title}" (keep to 1-3 words max).
Text is in heavy bold sans-serif, perfectly centered on the badge.
Badge color: {badge_color}. Badge has slight 3D depth — soft drop shadow creating
a floating-above-the-surface effect. Slightly rounded corners on badge.
Background behind the badge: {scene_description} — atmospheric, slightly blurred
or muted, clearly secondary to the badge. The eye goes to the badge first.
Clean, modern, punchy. Pop art energy meets Notion/Telegram/Discord aesthetic.
"{domain}" tiny in bottom-right corner, low opacity.
The badge should feel tangible — like you could peel it off the screen.
`;

// ─── Variant Prompts ──────────────────

export const STICKER_DARK_PROMPT = `
Dark mode sticker badge social media card, 1200x630px, 1.91:1 aspect ratio.
Dark gradient background ({bg_color}). A single glowing badge with text "{title}"
in bold white or neon {accent_color} sans-serif. Badge has inner glow + outer shadow.
Floating in dark space. Premium, tech-forward, Discord/Slack aesthetic.
"{domain}" subtle at bottom. 1-3 words on badge only.
`;

export const STICKER_PLAYFUL_PROMPT = `
Playful sticker social media card, 1200x630px, 1.91:1 aspect ratio.
A sticker sheet aesthetic — one main bold badge with "{title}" (1-3 words),
surrounded by 2-3 tiny decorative stickers (stars, sparkles, abstract shapes).
Slight rotation on the main badge (not perfectly horizontal). Hand-applied feel.
Background: {scene_description} — like a laptop lid covered in stickers.
Youthful, indie, authentic. "{domain}" as a tiny sticker too.
`;

// ─── Example Config ──────────────────
export const EXAMPLE_CONFIG = {
  title: "NOW LIVE",
  badge_color: "#FFD700",
  scene_description: "soft gradient from deep blue to purple, subtle grid texture",
  domain: "yoursite.com",
};
