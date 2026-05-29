/**
 * Newspaper Style — Satori JSX Seed Template
 *
 * Visual anchors: multi-section layout, modest serif title (≤56px),
 * uppercase section labels, dateline (date + location), horizontal rules,
 * high information density.
 *
 * Newspaper is about fitting MORE content than other styles. The title is
 * modest because newspapers communicate authority through density + structure,
 * not loud headlines.
 *
 * Usage:
 *   1. Copy this file
 *   2. Replace title, sectionLabel, date, byline, data, domain
 *   3. Change color preset via COLORS
 *   4. Add/remove sections — newspaper supports 3-5 distinct blocks
 */

// ─── Config ─────────────────────────────────────────────────
const sectionLabel = "AI TOOLS";
const date = "MAY 29, 2026";
const title = "Best AI Image Generators";
const titleLine2 = "Compared Across 6 Dimensions";
const byline = "By Kostja · 8 min read";
const domain = "yoursite.com";

// Data rows (3-column comparison)
const columns = [
  { header: "FLUX", points: ["Visual: 9.2", "Speed: Fast", "API: Yes"] },
  { header: "MIDJOURNEY", points: ["Aesthetic: 9.5", "Quality: Highest", "API: No"] },
  { header: "DALL·E", points: ["Text: 8.7", "Photo: Best", "Price: $$"] },
];

// Color presets — uncomment one set:
const COLORS = { bg: "#fcfaf7", title: "#111111", body: "#333333", rule: "#111111", label: "#555555" };
// Evening Edition: { bg: "#faf8f4", title: "#1a1a1a", body: "#444444", rule: "#1a1a1a", label: "#666666" }
// Financial:       { bg: "#faf9f6", title: "#0a1a2a", body: "#2a3a4a", rule: "#0a1a2a", label: "#4a5a6a" }
// Sunday Magazine: { bg: "#fefcf8", title: "#1a1a1a", body: "#3a3a3a", rule: "#1a1a1a", label: "#666666" }

// ─── Helper: hairline rule ──────────────────────────────────
function Rule() {
  return (
    <div style={{
      width: "100%", height: "1px",
      background: COLORS.rule, opacity: 0.8,
    }} />
  );
}

// ─── Template ───────────────────────────────────────────────
export function NewspaperTemplate() {
  return (
    <div style={{
      width: 1200, height: 630,
      background: COLORS.bg,
      fontFamily: '"Source Serif", "Noto Serif SC", "Inter", serif',
      color: COLORS.title,
      display: "flex", flexDirection: "column",
      padding: "50px 70px",
    }}>
      {/* Section label + date header */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-end", marginBottom: "12px",
      }}>
        <div style={{
          fontSize: "20px", fontWeight: 600,
          fontFamily: "Inter, sans-serif",
          color: COLORS.label, letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>
          {sectionLabel}
        </div>
        <div style={{
          fontSize: "20px", fontWeight: 500,
          fontFamily: "Inter, sans-serif",
          color: COLORS.label, letterSpacing: "0.05em",
        }}>
          {date}
        </div>
      </div>

      <Rule />

      {/* Title — modest, serif */}
      <div style={{
        fontSize: "48px", fontWeight: 700,
        lineHeight: 1.2, maxWidth: "950px",
        marginTop: "24px",
      }}>
        {title}
      </div>
      {titleLine2 && (
        <div style={{
          fontSize: "42px", fontWeight: 600,
          lineHeight: 1.2, maxWidth: "950px",
          color: COLORS.body,
        }}>
          {titleLine2}
        </div>
      )}

      {/* Byline */}
      <div style={{
        fontSize: "22px", fontWeight: 400,
        fontFamily: "Inter, sans-serif",
        color: COLORS.label,
        marginTop: "16px", marginBottom: "24px",
      }}>
        {byline}
      </div>

      <Rule />

      {/* 3-column data section */}
      <div style={{
        display: "flex", gap: "40px",
        marginTop: "24px", flex: 1,
      }}>
        {columns.map((col, i) => (
          <div key={i} style={{
            display: "flex", flexDirection: "column",
            flex: 1, gap: "10px",
          }}>
            {/* Column header */}
            <div style={{
              fontSize: "26px", fontWeight: 700,
              fontFamily: "Inter, sans-serif",
              color: COLORS.title, letterSpacing: "0.03em",
              textTransform: "uppercase",
              borderBottom: `2px solid ${COLORS.rule}`,
              paddingBottom: "8px",
            }}>
              {col.header}
            </div>

            {/* Points */}
            {col.points.map((pt, j) => (
              <div key={j} style={{
                fontSize: "24px", fontWeight: 400,
                fontFamily: "Inter, sans-serif",
                color: COLORS.body, lineHeight: 1.4,
              }}>
                {pt}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom rule + footer */}
      <div style={{ marginTop: "auto", paddingTop: "24px" }}>
        <Rule />
        <div style={{
          display: "flex", justifyContent: "space-between",
          marginTop: "12px",
        }}>
          <div style={{
            fontSize: "20px", fontWeight: 500,
            fontFamily: "Inter, sans-serif",
            color: COLORS.label,
          }}>
            Continued on Page B4
          </div>
          <div style={{
            fontSize: "20px", fontWeight: 500,
            fontFamily: "Inter, sans-serif",
            color: COLORS.label, opacity: 0.6,
          }}>
            {domain}
          </div>
        </div>
      </div>
    </div>
  );
}
