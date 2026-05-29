/**
 * Magazine Editorial Style — Satori JSX Seed Template
 *
 * Visual anchors: serif display title, warm paper background, hairline rules,
 * photo well or data ledger, issue metadata.
 * Color preset: Ink Classic (change via COLORS below).
 *
 * Usage:
 *   1. Copy this file
 *   2. Replace title, subtitle, issue, date, stats, domain
 *   3. Change color preset via COLORS
 *   4. If you have a photo URL, set photoUrl; otherwise it shows a stats ribbon
 */

// ─── Config ─────────────────────────────────────────────────
const title = "The State of AI";
const titleLine2 = "Image Generation";
const subtitle = "";
const issue = "04";
const date = "May 2026";
const author = "Kostja";
const domain = "yoursite.com";

// Stats ribbon (shown when no photo)
const stats = [
  { label: "Flux", value: "9.2" },
  { label: "Midjourney", value: "9.5" },
  { label: "DALL·E", value: "8.7" },
];

// Set to a URL to show a photo well instead of stats ribbon
const photoUrl = ""; // e.g., "https://example.com/hero.jpg"

// Color presets — uncomment one set:
const COLORS = { bg: "#faf8f5", title: "#1a1a1a", body: "#4a4a4a", accent: "#c41e3a", rule: "#d4cfc8" };
// Forest Ink:     { bg: "#f2f0eb", title: "#1a2418", body: "#3a4a38", accent: "#2d5016", rule: "#c4c0b8" }
// Indigo Porcelain: { bg: "#f4f2f0", title: "#1a1a2e", body: "#3a3a5e", accent: "#16213e", rule: "#c8c4c0" }
// Dune:           { bg: "#faf6f0", title: "#2a2018", body: "#5a4838", accent: "#8b6914", rule: "#d0c8b8" }
// Midnight Ink:   { bg: "#0f0f14", title: "#e8e0d0", body: "#8a8070", accent: "#c4a44a", rule: "#2a2824" }

// ─── Template ───────────────────────────────────────────────
export function MagazineTemplate() {
  return (
    <div style={{
      width: 1200, height: 630,
      background: COLORS.bg,
      fontFamily: '"Playfair Display", "Noto Serif SC", serif',
      color: COLORS.title,
      display: "flex", flexDirection: "column",
      padding: "60px 80px",
    }}>
      {/* Issue + date kicker */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: "36px",
      }}>
        <div style={{
          fontSize: "20px", fontWeight: 500,
          fontFamily: "Inter, sans-serif",
          color: COLORS.accent, letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}>
          Issue {issue}
        </div>
        <div style={{
          fontSize: "20px", fontWeight: 500,
          fontFamily: "Inter, sans-serif",
          color: COLORS.body, letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}>
          {date}
        </div>
      </div>

      {/* Title — serif display */}
      <div style={{
        fontSize: "72px", fontWeight: 600,
        lineHeight: 1.15, letterSpacing: "-0.01em",
        maxWidth: "900px",
      }}>
        {title}
      </div>
      {titleLine2 && (
        <div style={{
          fontSize: "72px", fontWeight: 600,
          lineHeight: 1.15, letterSpacing: "-0.01em",
          maxWidth: "900px",
        }}>
          {titleLine2}
        </div>
      )}

      {/* Subtitle */}
      {subtitle && (
        <div style={{
          fontSize: "28px", fontWeight: 400,
          fontFamily: "Inter, sans-serif",
          color: COLORS.body, lineHeight: 1.45,
          marginTop: "20px", maxWidth: "700px",
        }}>
          {subtitle}
        </div>
      )}

      {/* Photo well OR Stats ribbon */}
      <div style={{ display: "flex", marginTop: "40px", gap: "60px", flex: 1 }}>
        {photoUrl ? (
          <div style={{
            width: "360px", height: "220px",
            background: COLORS.rule,
            display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: "2px",
          }}>
            <div style={{ fontSize: "32px", color: COLORS.body, opacity: 0.3 }}>
              PHOTO WELL
            </div>
          </div>
        ) : (
          <div style={{
            display: "flex", flexDirection: "column",
            justifyContent: "center", gap: "24px",
            flex: 1,
          }}>
            {/* Hairline rule */}
            <div style={{
              width: "100%", height: "1px", background: COLORS.rule,
            }} />

            {/* Stats ribbon */}
            <div style={{
              display: "flex", gap: "48px",
            }}>
              {stats.map((s, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{
                    fontSize: "48px", fontWeight: 700,
                    fontFamily: "Inter, sans-serif",
                    color: COLORS.title, lineHeight: 1.1,
                  }}>
                    {s.value}
                  </div>
                  <div style={{
                    fontSize: "22px", fontWeight: 500,
                    fontFamily: "Inter, sans-serif",
                    color: COLORS.body,
                  }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Hairline rule */}
            <div style={{
              width: "100%", height: "1px", background: COLORS.rule,
            }} />
          </div>
        )}
      </div>

      {/* Author + domain footer */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        marginTop: "auto", paddingTop: "40px",
        borderTop: `1px solid ${COLORS.rule}`,
      }}>
        <div style={{
          fontSize: "22px", fontWeight: 400,
          fontFamily: "Inter, sans-serif",
          color: COLORS.body,
        }}>
          By {author}
        </div>
        <div style={{
          fontSize: "22px", fontWeight: 400,
          fontFamily: "Inter, sans-serif",
          color: COLORS.body, opacity: 0.5,
        }}>
          {domain}
        </div>
      </div>
    </div>
  );
}
