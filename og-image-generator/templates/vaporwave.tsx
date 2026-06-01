/**
 * Vaporwave Style — AI Prompt Template + Satori Text Overlay
 *
 * Pipeline: AI only (glitch effects, neon gradients, statue silhouettes).
 * Hybrid text recommended.
 */

// ─── AI Prompt Template ──────────────────
export const AI_PROMPT = `
Vaporwave aesthetic background for a social media preview card. 1200x630px.
Neon pink (#ff6ac1) to cyan (#00ffff) gradient sunset sky filling the top half.
Dark purple/black grid floor on the bottom half with perspective lines.
Greek statue bust silhouette in the composition — placed offset to one side.
CRT monitor scanlines overlay across the entire image.
VHS tracking noise/static on the bottom edge (10-15% of height).
Retro-futurist 80s/90s computer aesthetic. Neon glow.
Leave a clean central zone for text — no glitch/static in this zone.
No text, no letters, no numbers in the image.
Style: vaporwave, synthwave, retro internet aesthetic, 80s futurism.
`;

// ─── Satori Text Overlay (hybrid step) ──────────────────

export function VaporwaveTextOverlay({
  bgImageUrl,
  title,
  subtitle,
  domain,
}: {
  bgImageUrl: string;
  title: string;
  subtitle?: string;
  domain: string;
}) {
  return (
    <div style={{
      width: 1200, height: 630,
      display: "flex", flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "0px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* AI-generated vaporwave background */}
      <img src={bgImageUrl} style={{
        position: "absolute", top: 0, left: 0,
        width: "100%", height: "100%",
        objectFit: "cover",
      }} />

      {/* Title — wide sans-serif, neon gradient */}
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center",
        zIndex: 1, padding: "60px 80px",
      }}>
        <div style={{
          fontSize: "68px", fontWeight: 700,
          fontFamily: '"Inter", sans-serif',
          lineHeight: 1.15, letterSpacing: "0.04em",
          color: "#ff6ac1",
          textShadow: "0 0 20px rgba(255,106,193,0.6), 2px 0 #00ffff, -2px 0 #ff6ac1",
          maxWidth: "900px", textAlign: "center",
        }}>
          {title}
        </div>
        {subtitle && (
          <div style={{
            fontSize: "26px", fontWeight: 500,
            fontFamily: '"Inter", sans-serif',
            color: "#00ffff", opacity: 0.8,
            marginTop: "16px",
            textShadow: "0 0 10px rgba(0,255,255,0.4)",
            letterSpacing: "0.08em",
            textAlign: "center",
          }}>
            {subtitle}
          </div>
        )}

        {/* Fullwidth decorative characters */}
        <div style={{
          fontSize: "28px", fontWeight: 400,
          color: "#ffffff", opacity: 0.4,
          marginTop: "36px",
          letterSpacing: "0.3em",
        }}>
          ２０２６
        </div>

        <div style={{
          fontSize: "18px", fontWeight: 400,
          color: "#ffffff", opacity: 0.3,
          marginTop: "20px",
          letterSpacing: "0.1em",
        }}>
          {domain}
        </div>
      </div>
    </div>
  );
}

// ─── Example seed config ──────────────────
export const EXAMPLE_CONFIG = {
  title: "BEST AI IMAGE GENERATORS",
  subtitle: "F L U X   ·   M I D J O U R N E Y   ·   D A L L · E",
  domain: "yoursite.com",
};
