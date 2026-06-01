/**
 * Bento Grid Style — Satori JSX Seed Template
 *
 * Visual anchors: asymmetric card grid (3-6 cards of varying sizes),
 * dark base with lighter cards, rounded corners, subtle inner glow.
 *
 * Usage:
 *   1. Copy this file
 *   2. Replace title, subtitle, stats, domain
 *   3. Change card sizes by adjusting width/height values
 *   4. Change color theme via COLORS
 */

const title = "Best AI Image Generators";
const subtitle = "A comprehensive comparison of 6 leading models in 2026";
const stats = [
  { label: "Flux", value: "9.2", sub: "Visual Quality" },
  { label: "Midjourney", value: "9.5", sub: "Aesthetic" },
  { label: "DALL·E", value: "8.7", sub: "Text Accuracy" },
];
const domain = "yoursite.com";
const badge = "GPT Image 2.0 · Most Versatile";

// Color themes — uncomment one:
const COLORS = {
  base: "#0a0a0a",
  card: "#1a1a1a",
  cardAlt: "#222222",
  accent: "#3b82f6",
  text: "#ffffff",
  textDim: "#888888",
  glow: "0 0 20px rgba(59,130,246,0.15)",
};

export function BentoGridTemplate() {
  return (
    <div style={{
      width: 1200, height: 630,
      background: COLORS.base,
      fontFamily: '"Inter", sans-serif',
      color: COLORS.text,
      display: "flex",
      padding: "40px",
      gap: "16px",
    }}>
      {/* Left column: Large title card + stat row */}
      <div style={{
        display: "flex", flexDirection: "column",
        gap: "16px", flex: 1,
      }}>
        {/* Title card (large) */}
        <div style={{
          display: "flex", flexDirection: "column",
          background: COLORS.card,
          borderRadius: "16px",
          padding: "40px 44px",
          flex: 1,
          boxShadow: COLORS.glow,
          justifyContent: "center",
        }}>
          <div style={{
            fontSize: "56px", fontWeight: 700,
            lineHeight: 1.15, letterSpacing: "-0.02em",
            marginBottom: "12px",
          }}>
            {title}
          </div>
          <div style={{
            fontSize: "24px", fontWeight: 400,
            color: COLORS.textDim, lineHeight: 1.5,
          }}>
            {subtitle}
          </div>
        </div>

        {/* Stats row (medium height) */}
        <div style={{
          display: "flex", gap: "16px", height: "140px",
        }}>
          {stats.map((stat, i) => (
            <div key={i} style={{
              display: "flex", flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: i === 0 ? COLORS.cardAlt : COLORS.card,
              borderRadius: "14px",
              padding: "20px",
              flex: 1,
              boxShadow: i === 0 ? COLORS.glow : "none",
            }}>
              <div style={{
                fontSize: "36px", fontWeight: 700,
                color: COLORS.accent, lineHeight: 1,
                marginBottom: "4px",
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: "16px", fontWeight: 600,
                color: COLORS.text, marginBottom: "2px",
              }}>
                {stat.label}
              </div>
              <div style={{
                fontSize: "14px", fontWeight: 400,
                color: COLORS.textDim,
              }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right column: Badge + domain */}
      <div style={{
        display: "flex", flexDirection: "column",
        gap: "16px", width: "260px",
      }}>
        {/* Badge card */}
        <div style={{
          display: "flex", flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: COLORS.cardAlt,
          borderRadius: "14px",
          padding: "30px 20px",
          flex: 1,
          border: `1px solid ${COLORS.accent}33`,
        }}>
          <div style={{
            fontSize: "28px", fontWeight: 700,
            color: COLORS.accent, marginBottom: "8px",
          }}>
            ★
          </div>
          <div style={{
            fontSize: "18px", fontWeight: 600,
            color: COLORS.text, textAlign: "center",
            lineHeight: 1.4,
          }}>
            {badge}
          </div>
        </div>

        {/* Domain card */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: COLORS.card,
          borderRadius: "14px",
          padding: "24px",
          height: "60px",
        }}>
          <div style={{
            fontSize: "20px", fontWeight: 500,
            color: COLORS.textDim,
          }}>
            {domain}
          </div>
        </div>
      </div>
    </div>
  );
}
