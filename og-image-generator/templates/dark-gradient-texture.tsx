/**
 * Dark Gradient + Texture Style — Satori JSX Seed Template
 *
 * Visual anchors: near-black base, radial gradient glow, dot-grid texture,
 * glowing divider line, white title on max-contrast background.
 *
 * Usage:
 *   1. Copy this file
 *   2. Replace title, subtitle, dataRow, domain
 *   3. Change glow color via GLOW_COLOR
 *   4. Toggle dotGrid (true/false) to show/hide texture
 */

const title = "Best AI Image Generators";
const subtitle = "A complete benchmark of 6 leading models in 2026";
const dataRow = "Flux 9.2 · Midjourney 9.5 · DALL·E 8.7 · GPT Image 8.9";
const domain = "yoursite.com";

const GLOW_COLOR = "#3b82f6";  // blue glow
// Purple: "#8b5cf6"  Cyan: "#06b6d4"  Amber: "#f59e0b"
const BASE_BG = "#0a0a0f";
const TEXT_COLOR = "#ffffff";
const DIM_COLOR = "#888888";
const showDotGrid = true;

export function DarkGradientTextureTemplate() {
  return (
    <div style={{
      width: 1200, height: 630,
      background: BASE_BG,
      fontFamily: '"Inter", sans-serif',
      color: TEXT_COLOR,
      display: "flex", flexDirection: "column",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Radial glow — positioned top-right */}
      <div style={{
        position: "absolute",
        top: "-200px", right: "-100px",
        width: "700px", height: "700px",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${GLOW_COLOR}22, ${GLOW_COLOR}08, transparent 70%)`,
      }} />

      {/* Radial glow — positioned bottom-left */}
      <div style={{
        position: "absolute",
        bottom: "-150px", left: "-50px",
        width: "500px", height: "500px",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${GLOW_COLOR}15, transparent 65%)`,
      }} />

      {/* Dot-grid texture overlay (CSS gradient pattern simulating dots) */}
      {showDotGrid && (
        <div style={{
          position: "absolute",
          top: 0, left: 0,
          width: "100%", height: "100%",
          opacity: 0.06,
          backgroundImage: `radial-gradient(circle, ${TEXT_COLOR} 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }} />
      )}

      {/* Content — positioned above texture and glows */}
      <div style={{
        display: "flex", flexDirection: "column",
        padding: "70px 90px",
        flex: 1, zIndex: 1,
      }}>
        {/* Glowing divider line */}
        <div style={{
          width: "180px", height: "3px",
          background: GLOW_COLOR,
          marginBottom: "48px",
          boxShadow: `0 0 12px ${GLOW_COLOR}66`,
        }} />

        {/* Title */}
        <div style={{
          fontSize: "72px", fontWeight: 700,
          lineHeight: 1.12, letterSpacing: "-0.02em",
          maxWidth: "950px",
        }}>
          {title}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div style={{
            fontSize: "26px", fontWeight: 400,
            color: DIM_COLOR, lineHeight: 1.5,
            marginTop: "20px", maxWidth: "750px",
          }}>
            {subtitle}
          </div>
        )}

        {/* Data row */}
        <div style={{
          fontSize: "24px", fontWeight: 500,
          color: DIM_COLOR, marginTop: "40px",
          letterSpacing: "0.02em",
        }}>
          {dataRow}
        </div>

        {/* Domain */}
        <div style={{
          fontSize: "22px", fontWeight: 400,
          color: DIM_COLOR, opacity: 0.5,
          marginTop: "auto",
          marginLeft: "auto",
        }}>
          {domain}
        </div>
      </div>
    </div>
  );
}
