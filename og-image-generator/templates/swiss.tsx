/**
 * Swiss Minimal Style — Satori JSX Seed Template
 *
 * Visual anchors: light sans-serif display (Inter weight 200-400),
 * strict left-aligned grid, ONE accent color, hairline rules, no decoration.
 * Hard rule: "the larger, the lighter" — display titles use weight <=400.
 *
 * Usage:
 *   1. Copy this file
 *   2. Replace title, subtitle, megaStat (or set to null), dataRows, domain
 *   3. Change accent color via ACCENT
 */

// ─── Config ─────────────────────────────────────────────────
const title = "AI Image Generators";
const subtitle = "Compared across 6 dimensions including visual quality, text accuracy, speed, and pricing.";
const megaStat = "120";   // set to null to hide the mega number
const megaLabel = "tools tested";
const accent = "#0033ff"; // IKB Blue — change for other presets:
// "#ff4400" = Safety Orange, "#ffdd00" = Lemon Yellow, "#00cc44" = Lemon Green

const dataRows = [
  ["Flux", "9.2", "Midjourney", "9.5"],
  ["DALL·E", "8.7", "GPT Image", "8.9"],
];
const domain = "yoursite.com";

// ─── Template ───────────────────────────────────────────────
export function SwissTemplate() {
  return (
    <div style={{
      width: 1200, height: 630,
      background: "#fafafa",
      fontFamily: '"Inter", "Geist", sans-serif',
      color: "#0a0a0a",
      display: "flex", flexDirection: "column",
      padding: "80px 100px",
    }}>
      {/* Mega stat (optional) */}
      {megaStat && (
        <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "12px" }}>
          <div style={{
            fontSize: "120px", fontWeight: "200",
            color: accent, lineHeight: 1,
            letterSpacing: "-0.03em",
          }}>
            {megaStat}
          </div>
          {megaLabel && (
            <div style={{
              fontSize: "24px", fontWeight: 500,
              color: "#999", textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}>
              {megaLabel}
            </div>
          )}
        </div>
      )}

      {/* Title — very light, very large */}
      <div style={{
        fontSize: "80px", fontWeight: 300,
        lineHeight: 1.1, letterSpacing: "-0.02em",
        maxWidth: "950px",
      }}>
        {title}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div style={{
          fontSize: "28px", fontWeight: 400,
          color: "#666", lineHeight: 1.5,
          marginTop: "20px", maxWidth: "750px",
        }}>
          {subtitle}
        </div>
      )}

      {/* Hairline rule (accent color) */}
      <div style={{
        width: "900px", height: "2px",
        background: accent,
        marginTop: "36px", marginBottom: "36px",
      }} />

      {/* Data rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {dataRows.map((row, i) => (
          <div key={i} style={{
            display: "flex", gap: "80px",
          }}>
            {/* Left pair */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "12px", width: "260px" }}>
              <div style={{ fontSize: "24px", fontWeight: 500, color: "#888" }}>
                {row[0]}
              </div>
              <div style={{ fontSize: "36px", fontWeight: 700, color: "#0a0a0a" }}>
                {row[1]}
              </div>
            </div>
            {/* Right pair */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "12px", width: "260px" }}>
              <div style={{ fontSize: "24px", fontWeight: 500, color: "#888" }}>
                {row[2]}
              </div>
              <div style={{ fontSize: "36px", fontWeight: 700, color: "#0a0a0a" }}>
                {row[3]}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Domain footer */}
      <div style={{
        fontSize: "24px", fontWeight: 500,
        color: "#bbb", textAlign: "right",
      }}>
        {domain}
      </div>
    </div>
  );
}
