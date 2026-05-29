/**
 * Brutalist Style — Satori JSX Seed Template
 *
 * Visual anchors: black + white only (NO grey, NO accent colors),
 * max-bold everywhere (Inter 700-900), zero border-radius,
 * asymmetric composition, black-filled rectangles with inverted text.
 *
 * Hard rules:
 *   - Only #000000 and #ffffff — introducing grey kills the style
 *   - No border-radius anywhere — even 2px breaks it
 *   - Intentional asymmetry — do NOT center everything
 *
 * Usage:
 *   1. Copy this file
 *   2. Replace title, data, domain
 *   3. Toggle invert (white-on-black vs black-on-white)
 *   4. NEVER add grey or accent colors
 */

// ─── Config ─────────────────────────────────────────────────
const title = "BEST AI";
const titleLine2 = "IMAGE";
const titleLine3 = "GENERATORS";
const data = [
  { label: "FLUX", barPct: 92, score: 9.2 },
  { label: "MIDJOURNEY", barPct: 95, score: 9.5 },
  { label: "DALL·E", barPct: 87, score: 8.7 },
  { label: "GPT IMAGE", barPct: 89, score: 8.9 },
];
const footerLabel = "COMPARISON";
const footerYear = "2026";
const domain = "yoursite.com";

const INVERT = false; // true = white background, black text. false = black background, white text.

// ─── Template ───────────────────────────────────────────────
export function BrutalistTemplate() {
  const bg = INVERT ? "#ffffff" : "#000000";
  const fg = INVERT ? "#000000" : "#ffffff";

  return (
    <div style={{
      width: 1200, height: 630,
      background: bg,
      fontFamily: '"Inter", sans-serif',
      color: fg,
      display: "flex", flexDirection: "column",
      padding: "0px",
    }}>
      {/* Title block — black rectangle with white text (or inverse) */}
      <div style={{
        display: "flex", flexDirection: "column",
        background: fg, color: bg,
        padding: "40px 60px",
        marginTop: "40px",
        marginLeft: "60px",
        marginRight: "40px",
        alignSelf: "flex-start", // asymmetric — NOT centered
      }}>
        <div style={{
          fontSize: "88px", fontWeight: 900,
          lineHeight: 1.0, letterSpacing: "-0.04em",
        }}>
          {title}
        </div>
        <div style={{
          fontSize: "88px", fontWeight: 900,
          lineHeight: 1.0, letterSpacing: "-0.04em",
        }}>
          {titleLine2}
        </div>
        <div style={{
          fontSize: "88px", fontWeight: 900,
          lineHeight: 1.0, letterSpacing: "-0.04em",
        }}>
          {titleLine3}
        </div>
      </div>

      {/* Data bars — raw, chunky, no alignment */}
      <div style={{
        display: "flex", flexDirection: "column",
        gap: "16px", marginTop: "60px",
        marginLeft: "60px", marginRight: "80px",
      }}>
        {data.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: "0px",
          }}>
            {/* Label */}
            <div style={{
              fontSize: "28px", fontWeight: 800,
              width: "220px", letterSpacing: "-0.02em",
            }}>
              {item.label}
            </div>

            {/* Bar track */}
            <div style={{
              flex: 1, height: "32px",
              border: `3px solid ${fg}`,
              marginLeft: "20px",
            }}>
              {/* Filled */}
              <div style={{
                width: `${item.barPct}%`, height: "100%",
                background: fg,
              }} />
            </div>

            {/* Score — chunky, touches the bar */}
            <div style={{
              fontSize: "32px", fontWeight: 900,
              marginLeft: "16px", lineHeight: 1,
            }}>
              {item.score}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom block — inverted rectangle */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        background: fg, color: bg,
        padding: "20px 60px 20px 80px",
        marginTop: "60px",
        width: "100%",
        boxSizing: "border-box",
      }}>
        <div style={{
          fontSize: "32px", fontWeight: 900,
          letterSpacing: "-0.02em",
        }}>
          {footerLabel} {footerYear}
        </div>
        <div style={{
          fontSize: "20px", fontWeight: 700,
          opacity: 0.6,
        }}>
          {domain}
        </div>
      </div>
    </div>
  );
}
