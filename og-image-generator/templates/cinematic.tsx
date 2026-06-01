/**
 * Cinematic Style — AI Prompt Template + Satori Text Overlay
 *
 * Pipeline: AI only (lighting, bokeh, film grain).
 * Hybrid text overlay recommended for CJK or precise product names.
 */

// ─── AI Prompt Template ──────────────────
export const AI_PROMPT = `
Cinematic widescreen composition for a social media preview card. 1200x630px.
Film color grading: {teal-orange | golden hour | moody desaturated}.
Shallow depth of field with soft bokeh background.
Subtle film grain throughout. Dramatic side lighting from {left | right | top}.
The upper 2/3 of the frame should be an atmospheric "empty frame" — blurred lights,
warm glow, or abstract texture that sets mood without distracting.
The lower 1/3 should be darker, creating a natural platform for title text.
No text, no logos, no UI elements in the image.
Style: editorial film photography, A24 aesthetic, {additional hints}.
`;

// ─── Satori Text Overlay (hybrid step) ──────────────────
// Use this AFTER AI generates the cinematic background.
// Place the AI image URL as bgImageUrl, then this component renders text overlay.

export function CinematicTextOverlay({
  bgImageUrl,
  title,
  subtitle,
  author,
  domain,
}: {
  bgImageUrl: string;
  title: string;
  subtitle?: string;
  author?: string;
  domain: string;
}) {
  return (
    <div style={{
      width: 1200, height: 675,
      fontFamily: '"Playfair Display", "Noto Serif SC", serif',
      color: "#f0e8d0",
      display: "flex", flexDirection: "column",
      justifyContent: "flex-end",
      padding: "0px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* AI-generated cinematic background */}
      <img src={bgImageUrl} style={{
        position: "absolute", top: 0, left: 0,
        width: "100%", height: "100%",
        objectFit: "cover",
      }} />

      {/* Letterbox bars (subtle) */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: "100%", height: "30px",
        background: "rgba(0,0,0,0.6)",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        width: "100%", height: "30px",
        background: "rgba(0,0,0,0.5)",
      }} />

      {/* Text zone — lower 1/3 */}
      <div style={{
        display: "flex", flexDirection: "column",
        padding: "50px 90px 70px",
        background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
        zIndex: 1,
      }}>
        <div style={{
          fontSize: "64px", fontWeight: 500,
          lineHeight: 1.15, letterSpacing: "0.01em",
          maxWidth: "850px",
        }}>
          {title}
        </div>
        {subtitle && (
          <div style={{
            fontSize: "26px", fontWeight: 400,
            fontFamily: '"Inter", sans-serif',
            opacity: 0.7, marginTop: "12px",
          }}>
            {subtitle}
          </div>
        )}
        <div style={{
          display: "flex", justifyContent: "space-between",
          marginTop: "24px",
        }}>
          {author && (
            <div style={{
              fontSize: "22px", fontWeight: 400,
              fontStyle: "italic", opacity: 0.6,
            }}>
              By {author}
            </div>
          )}
          <div style={{
            fontSize: "20px", fontWeight: 400,
            opacity: 0.4, marginLeft: "auto",
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
  title: "The State of AI Image Generation in 2026",
  subtitle: "A visual journey through the landscape of generative models",
  author: "Kostja",
  domain: "yoursite.com",
  colorGrading: "golden hour",
  lighting: "right side window light",
  sceneHint: "warm amber light filtering through leaves, shallow bokeh",
};
