/**
 * Text Overlay Style — Hybrid Template (AI background + Satori text)
 *
 * Pipeline: AI generates background image → Satori overlays precise text.
 * Use this when: you have an AI-generated or external background image URL
 * and need pixel-perfect text on top.
 *
 * Usage:
 *   1. Generate background via AI pipeline (see AI_PROMPT below)
 *   2. Copy this template, set bgImageUrl to the generated image
 *   3. Replace title, subtitle, author, date, domain
 */

// ─── Config ───────────────────────────────────
const bgImageUrl = "https://example.com/background.png"; // AI-generated or existing
const title = "The Future of AI Image Generation";
const subtitle = "How 6 leading models compare in 2026";
const author = "Kostja";
const date = "May 2026";
const domain = "yoursite.com";
const overlayOpacity = 0.45; // dark gradient mask opacity
const overlayDirection = "bottom"; // "bottom" | "center" | "full"

// ─── AI Prompt Template (for generating background) ──────────────────
export const AI_PROMPT = `
Editorial photograph for a social media preview card background. 1200x630px.
Subject: {describe scene related to page content}.
Soft lighting, shallow depth of field. Professional photography style.
The bottom half should be darker (natural vignette) to accommodate white text overlay.
No text, no logos, no UI elements in the image.
Style: editorial photography, {additional style hints}.
`;

// ─── Satori Template ──────────────────
export function TextOverlayTemplate() {
  const isBottomHeavy = overlayDirection === "bottom";

  return (
    <div style={{
      width: 1200, height: 630,
      fontFamily: '"Inter", sans-serif',
      color: "#ffffff",
      display: "flex", flexDirection: "column",
      justifyContent: isBottomHeavy ? "flex-end" : "center",
      padding: "60px 80px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background image */}
      <img
        src={bgImageUrl}
        style={{
          position: "absolute", top: 0, left: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Dark gradient overlay */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: "100%", height: "100%",
        background: isBottomHeavy
          ? `linear-gradient(to top, rgba(0,0,0,${overlayOpacity + 0.15}) 0%, rgba(0,0,0,${overlayOpacity}) 40%, rgba(0,0,0,0.15) 100%)`
          : `linear-gradient(rgba(0,0,0,${overlayOpacity}), rgba(0,0,0,${overlayOpacity}))`,
      }} />

      {/* Text content */}
      <div style={{ display: "flex", flexDirection: "column", zIndex: 1 }}>
        <div style={{
          fontSize: "72px", fontWeight: 700,
          lineHeight: 1.12, letterSpacing: "-0.02em",
          maxWidth: "900px",
          textShadow: "0 2px 12px rgba(0,0,0,0.5)",
        }}>
          {title}
        </div>
        {subtitle && (
          <div style={{
            fontSize: "28px", fontWeight: 400,
            opacity: 0.85, marginTop: "16px",
            maxWidth: "750px", lineHeight: 1.4,
            textShadow: "0 1px 6px rgba(0,0,0,0.5)",
          }}>
            {subtitle}
          </div>
        )}
        <div style={{
          display: "flex", gap: "24px",
          marginTop: "32px",
          fontSize: "22px", fontWeight: 500,
          opacity: 0.7,
        }}>
          <span>By {author}</span>
          <span>{date}</span>
        </div>
        <div style={{
          fontSize: "20px", fontWeight: 400,
          opacity: 0.45, marginTop: "40px",
          alignSelf: "flex-end",
        }}>
          {domain}
        </div>
      </div>
    </div>
  );
}
