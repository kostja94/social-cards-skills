/**
 * Grunge Style — AI Prompt Template + Satori Text Overlay
 *
 * Pipeline: AI only (noise grain, photocopy textures, distressing).
 * Hybrid text recommended — AI cannot reliably render distressed but legible text.
 */

// ─── AI Prompt Template ──────────────────
export const AI_PROMPT = `
Grunge / photocopy aesthetic background for a social media preview card. 1200x630px.
Faded black and off-white (#f4f0eb) color palette — NOT pure black, NOT bright white.
Heavy noise grain and dust texture across the entire image.
Xerox photocopy texture overlay — subtle banding and toner artifacts.
Subtle crease marks and stains distributed across the surface.
DIY punk zine aesthetic. High contrast but desaturated.
Rough border — edges are slightly uneven, not cleanly cropped.
Leave a central zone with slightly less texture for text placement.
No text, no letters, no numbers in the image.
Style: 90s grunge, xerox art, punk zine, distressed print, photocopy scan.
`;

// ─── Satori Text Overlay (hybrid step) ──────────────────

export function GrungeTextOverlay({
  bgImageUrl,
  title,
  dataRow,
  domain,
}: {
  bgImageUrl: string;
  title: string;
  dataRow?: string;
  domain: string;
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
      {/* AI-generated grunge background */}
      <img src={bgImageUrl} style={{
        position: "absolute", top: 0, left: 0,
        width: "100%", height: "100%",
        objectFit: "cover",
      }} />

      {/* Text overlay */}
      <div style={{
        display: "flex", flexDirection: "column",
        padding: "80px 100px",
        zIndex: 1,
      }}>
        <div style={{
          fontSize: "72px", fontWeight: 900,
          fontFamily: '"Inter", sans-serif',
          lineHeight: 1.08, letterSpacing: "-0.03em",
          color: "#1a1a1a",
          maxWidth: "900px",
        }}>
          {title}
        </div>

        {dataRow && (
          <div style={{
            display: "flex", gap: "32px",
            marginTop: "36px",
          }}>
            {dataRow.split("·").map((item, i) => (
              <div key={i} style={{
                fontSize: "24px", fontWeight: 700,
                fontFamily: '"Inter", sans-serif',
                color: "#2a2a2a",
                letterSpacing: "0.02em",
              }}>
                {item.trim()}
              </div>
            ))}
          </div>
        )}

        {/* Hand-drawn separator */}
        <div style={{
          width: "300px", height: "4px",
          background: "#1a1a1a",
          marginTop: "48px",
          opacity: 0.6,
        }} />

        {/* Domain with rough border */}
        <div style={{
          marginTop: "24px",
          display: "flex",
        }}>
          <div style={{
            fontSize: "20px", fontWeight: 700,
            fontFamily: '"Inter", sans-serif',
            color: "#1a1a1a",
            opacity: 0.6,
            letterSpacing: "0.06em",
            padding: "4px 16px",
            border: "2px solid #1a1a1a",
            borderWidth: "2px",
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
  title: "BEST AI IMAGE GENERATORS 2026",
  dataRow: "Flux 9.2 · Midjourney 9.5 · DALL·E 8.7 · GPT Image 8.9",
  domain: "yoursite.com",
};
