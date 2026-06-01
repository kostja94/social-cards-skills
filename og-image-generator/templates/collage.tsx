/**
 * Collage Style — AI Prompt Template + Satori Text Overlay
 *
 * Pipeline: AI优先 (generates collage layout + textures).
 * Hybrid: AI generates the collage background with solid text panels → Satori overlays precise text.
 */

// ─── AI Prompt Template ──────────────────
export const AI_PROMPT = `
Collage / scrapbook style background for a social media preview card. 1200x630px.
2-4 panels arranged asymmetrically with slight overlap between them.
One panel is solid {color} — this panel is where bold text will be placed (leave it clean).
One panel shows {image_description} — photograph or texture.
Optional third panel with abstract texture or patterned paper.
Torn paper edges on at least one panel. Washi tape holding one corner.
Subtle drop shadows between layered panels (flat-lay photography feel).
Uncoated paper texture on the background surface.
No text, no letters, no numbers in the image — text will be overlaid separately.
Style: editorial scrapbook, indie zine aesthetic, {additional hints}.
`;

// ─── Satori Text Overlay (hybrid step) ──────────────────
// Use this AFTER AI generates the collage background.
// Place text onto the solid-color panel(s).

export function CollageTextOverlay({
  bgImageUrl,
  title,
  dataPoints,
  domain,
}: {
  bgImageUrl: string;
  title: string;
  dataPoints?: string[];
  domain: string;
}) {
  return (
    <div style={{
      width: 1200, height: 630,
      fontFamily: '"Inter", sans-serif',
      display: "flex", flexDirection: "column",
      padding: "50px 70px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* AI-generated collage background */}
      <img src={bgImageUrl} style={{
        position: "absolute", top: 0, left: 0,
        width: "100%", height: "100%",
        objectFit: "cover",
      }} />

      {/* Text positioned for the solid panel (adjust coordinates to match AI layout) */}
      <div style={{
        display: "flex", flexDirection: "column",
        zIndex: 1, maxWidth: "600px",
        marginTop: "40px",
      }}>
        <div style={{
          fontSize: "56px", fontWeight: 700,
          lineHeight: 1.1, letterSpacing: "-0.02em",
          color: "#1a1a1a",
        }}>
          {title}
        </div>

        {dataPoints && dataPoints.length > 0 && (
          <div style={{
            display: "flex", flexDirection: "column",
            gap: "8px", marginTop: "24px",
          }}>
            {dataPoints.map((dp, i) => (
              <div key={i} style={{
                fontSize: "24px", fontWeight: 600,
                color: "#444444",
              }}>
                {dp}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Domain — bottom right */}
      <div style={{
        position: "absolute", bottom: "40px", right: "60px",
        fontSize: "18px", fontWeight: 500,
        color: "#666666", zIndex: 1,
      }}>
        {domain}
      </div>
    </div>
  );
}

// ─── Example seed config ──────────────────
export const EXAMPLE_CONFIG = {
  title: "Best AI Image Generators 2026",
  dataPoints: [
    "Flux — Visual Quality: 9.2",
    "Midjourney — Aesthetic: 9.5",
    "DALL·E 3 — Text Accuracy: 8.7",
    "GPT Image 2 — Most Versatile",
  ],
  domain: "yoursite.com",
  solidPanelColor: "warm yellow (#FFD700)",
  imagePanelDesc: "abstract tech texture with circuit-like patterns",
};
