/**
 * Risograph Style — AI Prompt Template + Satori Text Overlay
 *
 * Pipeline: AI only (halftone dots, ink offset, paper texture).
 * Hybrid text STRONGLY recommended — Risograph misregistration risks text legibility.
 */

// ─── AI Prompt Template ──────────────────
export const AI_PROMPT = `
Risograph print style background for a social media preview card. 1200x630px.
Use exactly 2-3 colors: {color_a}, {color_b}, and off-white paper (#faf8f5).
Visible halftone dot pattern on large color blocks — dots should be clearly visible.
Slight ink misregistration/offset at color edges — each color plate shifted by ~2-3px.
Uncoated paper texture throughout the entire surface.
Bold graphic shapes, no photographic elements. Zine/poster aesthetic.
Hand-drawn quality border lines (slightly uneven width).
Leave a clean central zone for crisp text — this zone should be solid paper color
with no halftone dots or offset effects. Make this zone large enough for 2 lines of text.
No text, no letters, no numbers in the image — text will be overlaid separately.
Style: risograph print, art school poster, indie publishing.
`;

// ─── Satori Text Overlay (hybrid step) ──────────────────
// Use this AFTER AI generates the risograph background.
// Text MUST be overlaid via Satori — do NOT rely on AI for text in risograph style.

export function RisographTextOverlay({
  bgImageUrl,
  title,
  subtitle,
  domain,
  textColor,
}: {
  bgImageUrl: string;
  title: string;
  subtitle?: string;
  domain: string;
  textColor: string; // one of the 2-3 palette colors
}) {
  return (
    <div style={{
      width: 1200, height: 630,
      display: "flex", flexDirection: "column",
      justifyContent: "center",
      padding: "0px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* AI-generated risograph background */}
      <img src={bgImageUrl} style={{
        position: "absolute", top: 0, left: 0,
        width: "100%", height: "100%",
        objectFit: "cover",
      }} />

      {/* Text overlay — positioned in the clean paper zone */}
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        zIndex: 1, padding: "60px 100px",
        textAlign: "center",
      }}>
        <div style={{
          fontSize: "64px", fontWeight: 900,
          fontFamily: '"Inter", sans-serif',
          lineHeight: 1.12, letterSpacing: "-0.02em",
          color: textColor, maxWidth: "900px",
        }}>
          {title}
        </div>
        {subtitle && (
          <div style={{
            fontSize: "28px", fontWeight: 600,
            fontFamily: '"Inter", sans-serif',
            color: textColor, opacity: 0.8,
            marginTop: "20px", maxWidth: "700px",
            letterSpacing: "0.02em",
          }}>
            {subtitle}
          </div>
        )}

        {/* Hand-drawn style border around domain */}
        <div style={{
          marginTop: "48px",
          border: `3px solid ${textColor}`,
          padding: "8px 24px",
        }}>
          <div style={{
            fontSize: "20px", fontWeight: 700,
            fontFamily: '"Inter", sans-serif',
            color: textColor,
            letterSpacing: "0.06em",
          }}>
            {domain}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Example seed config ──────────────────
export const EXAMPLE_CONFIG = {
  title: "The State of AI Tools 2026",
  subtitle: "A comparison report",
  domain: "yoursite.com",
  colorA: "#e63946",  // Red
  colorB: "#1d3557",  // Blue
  textColor: "#1d3557",
};
