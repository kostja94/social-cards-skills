/**
 * Pixel Retro Style — Satori JSX Seed Template
 *
 * Visual anchors: pixel font (Press Start 2P), 8/16-bit color palette,
 * chunky borders via boxShadow, game HUD elements (progress bars, hearts).
 * Color preset: NES (change via COLORS below).
 *
 * Constraints: Title ≤30 characters. Press Start 2P rendering size is ~2x
 * normal — a fontSize of 32px looks like 64px in visual weight.
 *
 * Usage:
 *   1. Copy this file
 *   2. Replace title, items (name+score pairs), domain
 *   3. Change color preset via COLORS
 *   4. Adjust hudLine (bottom text)
 */

// ─── Config ─────────────────────────────────────────────────
const title = "BEST AI IMAGE GENERATORS";
const items = [
  { name: "FLUX", score: 9.2 },
  { name: "MIDJRNY", score: 9.5 },
  { name: "DALL-E", score: 8.7 },
  { name: "GPT IMG", score: 8.9 },
];
const hudLine = "2026 EDITION";
const domain = "yoursite.com";

// Color presets — uncomment one set:
const COLORS = { bg: "#1a1a2e", text: "#f8f8f8", accent: "#f8b800", secondary: "#e83030", border: "#f8f8f8" };
// Game Boy:   { bg: "#9bbc0f", text: "#0f380f", accent: "#0f380f", secondary: "#306230", border: "#0f380f" }
// SNES:       { bg: "#4a3a6e", text: "#f0e8d0", accent: "#d0a040", secondary: "#60d0d0", border: "#f0e8d0" }
// Arcade:     { bg: "#0a0a1a", text: "#ff00ff", accent: "#ffff00", secondary: "#00ffff", border: "#ff00ff" }
// CGA:        { bg: "#000000", text: "#00aaaa", accent: "#aaaaaa", secondary: "#aa00aa", border: "#00aaaa" }

// ─── Template ───────────────────────────────────────────────
export function PixelTemplate() {
  return (
    <div style={{
      width: 1200, height: 630,
      background: COLORS.bg,
      fontFamily: '"Press Start 2P", "VT323", monospace',
      color: COLORS.text,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "60px",
    }}>
      {/* Outer chunky border frame */}
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center",
        border: `4px solid ${COLORS.border}`,
        padding: "36px 56px",
        width: "100%", height: "100%",
        boxSizing: "border-box",
        // Satori boxShadow for chunky effect:
        boxShadow: `8px 8px 0px 0px ${COLORS.secondary}`,
      }}>
        {/* Title banner */}
        <div style={{
          display: "flex", alignItems: "center", gap: "16px",
          marginBottom: "32px",
        }}>
          <div style={{ color: COLORS.accent, fontSize: "28px" }}>★</div>
          <div style={{
            fontSize: "28px", fontWeight: 400,
            lineHeight: 1.6, letterSpacing: "2px",
            textAlign: "center",
            color: COLORS.accent,
          }}>
            {title}
          </div>
          <div style={{ color: COLORS.accent, fontSize: "28px" }}>★</div>
        </div>

        {/* Scoreboard items */}
        <div style={{
          display: "flex", flexDirection: "column",
          gap: "20px", width: "100%", maxWidth: "800px",
        }}>
          {items.map((item, i) => {
            const barWidth = Math.round((item.score / 10) * 100);
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "16px",
              }}>
                {/* Name label */}
                <div style={{
                  fontSize: "20px", fontWeight: 400,
                  color: COLORS.text, width: "140px",
                  letterSpacing: "2px",
                }}>
                  {"<"} {item.name} {" >"}
                </div>

                {/* Progress bar track */}
                <div style={{
                  flex: 1, height: "28px",
                  background: COLORS.bg,
                  border: `3px solid ${COLORS.border}`,
                  position: "relative",
                }}>
                  {/* Filled portion */}
                  <div style={{
                    width: `${barWidth}%`, height: "100%",
                    background: item.score >= 9 ? COLORS.accent : COLORS.secondary,
                  }} />
                </div>

                {/* Score */}
                <div style={{
                  fontSize: "22px", fontWeight: 400,
                  color: COLORS.accent, width: "70px",
                  textAlign: "right",
                }}>
                  {item.score.toFixed(1)}/10
                </div>
              </div>
            );
          })}
        </div>

        {/* HUD footer */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", width: "100%",
          marginTop: "32px", gap: "24px",
        }}>
          {/* Down arrows + year */}
          <div style={{
            display: "flex", gap: "8px",
            fontSize: "22px", color: COLORS.accent,
            letterSpacing: "2px",
          }}>
            ▼▼▼ {hudLine} ▼▼▼
          </div>

          {/* Lives / HUD */}
          <div style={{
            display: "flex", gap: "4px",
            fontSize: "24px",
          }}>
            ♥♥♥
          </div>
        </div>

        {/* Domain */}
        <div style={{
          fontSize: "18px", fontWeight: 400,
          color: COLORS.text, opacity: 0.5,
          marginTop: "16px", letterSpacing: "1px",
        }}>
          {domain}
        </div>
      </div>
    </div>
  );
}
