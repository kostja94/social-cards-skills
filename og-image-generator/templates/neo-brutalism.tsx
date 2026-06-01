/**
 * Neo-Brutalism Style — Satori JSX Seed Template
 *
 * Visual anchors: clashing colors, ultra-thick black borders, hard shadows,
 * oversize bold titles, zero gradients, zero border-radius.
 *
 * Usage:
 *   1. Copy this file
 *   2. Replace title, subtitle, domain, tags
 *   3. Change color preset by swapping COLORS
 *   4. Adjust shadow offset via shadowX/shadowY
 */

const title = "Best AI Image Generators";
const subtitle = "Flux vs Midjourney vs DALL·E — 2026 comparison";
const domain = "yoursite.com";
const tags = ["FLUX 9.2", "MIDJRNY 9.5", "DALL·E 8.7"];

// Color presets — uncomment one:
// Yellow Pop:
const COLORS = { bg: "#FFD700", text: "#000000", accent: "#FFFFFF", border: "#000000" };
// Red Alert:   { bg: "#FF3B30", text: "#FFFFFF", accent: "#000000", border: "#000000" }
// Blue Blast:  { bg: "#0066FF", text: "#FFFFFF", accent: "#FFD700", border: "#000000" }
// Lime Punch:  { bg: "#00FF41", text: "#000000", accent: "#FF006E", border: "#000000" }

const shadowOffset = 8; // px — hard shadow (no blur)

export function NeoBrutalistTemplate() {
  return (
    <div style={{
      width: 1200, height: 630,
      background: COLORS.bg,
      fontFamily: '"Inter", sans-serif',
      display: "flex", flexDirection: "column",
      padding: "60px",
    }}>
      {/* Main content block with thick border + hard shadow */}
      <div style={{
        display: "flex", flexDirection: "column",
        border: `6px solid ${COLORS.border}`,
        padding: "50px 60px",
        flex: 1,
        background: COLORS.text === "#000000" ? COLORS.bg : COLORS.bg,
        color: COLORS.text,
        boxShadow: `${shadowOffset}px ${shadowOffset}px 0px 0px ${COLORS.border}`,
      }}>
        {/* Title — Inter Black 900, massive */}
        <div style={{
          fontSize: "84px", fontWeight: 900,
          lineHeight: 1.05, letterSpacing: "-0.04em",
          color: COLORS.text === "#000000" ? COLORS.text : COLORS.bg,
          background: COLORS.text === "#FFFFFF" ? COLORS.text : "transparent",
          padding: COLORS.text === "#FFFFFF" ? "10px 0" : "0",
          marginBottom: "24px",
        }}>
          {title}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div style={{
            fontSize: "28px", fontWeight: 700,
            color: COLORS.text, opacity: 0.8,
            lineHeight: 1.4, marginBottom: "48px",
          }}>
            {subtitle}
          </div>
        )}

        {/* Tags row — black background with white/colored text */}
        <div style={{
          display: "flex", gap: "16px",
          marginBottom: "48px", flexWrap: "wrap",
        }}>
          {tags.map((tag, i) => (
            <div key={i} style={{
              fontSize: "22px", fontWeight: 700,
              padding: "10px 24px",
              background: COLORS.text === "#FFFFFF" ? COLORS.border : "#000000",
              color: COLORS.text === "#FFFFFF" ? COLORS.bg : "#FFFFFF",
              letterSpacing: "0.04em",
            }}>
              {tag}
            </div>
          ))}
        </div>

        {/* Bottom row: domain + label */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-end", marginTop: "auto",
        }}>
          <div style={{
            fontSize: "24px", fontWeight: 700,
            padding: "10px 24px",
            border: `4px solid ${COLORS.border}`,
            color: COLORS.text,
          }}>
            {domain}
          </div>
          <div style={{
            fontSize: "24px", fontWeight: 900,
            padding: "10px 24px",
            background: COLORS.accent,
            color: COLORS.accent === "#FFFFFF" ? "#000000" : COLORS.text,
            letterSpacing: "0.06em",
          }}>
            2026 REPORT
          </div>
        </div>
      </div>
    </div>
  );
}
