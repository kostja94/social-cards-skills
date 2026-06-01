/**
 * Neo-Swiss Gradient Style — Satori JSX Seed Template
 *
 * Visual anchors: Swiss grid + atmospheric diffused gradient, ultra-light
 * display titles (weight 200-300), single hairline rule, strict left-alignment.
 *
 * Usage:
 *   1. Copy this file
 *   2. Replace title, subtitle, stats, megaStat, domain
 *   3. Change color preset (gradient + accent)
 */

const title = "Best AI Image Generators";
const subtitle = "Compared across 6 dimensions including visual quality, text accuracy, speed, and pricing";
const megaStat = "120";
const statLabel = "AI Image Models Tested";
const dataRow = "Flux 9.2 · Midjourney 9.5 · DALL·E 8.7 · GPT Image 8.9";
const domain = "yoursite.com";

// Color presets:
const PRESET = {
  gradientStart: "#f5f0eb", gradientEnd: "#e8ddd0",
  text: "#1a1a1a",
  accent: "#c41e3a",
  accentLight: "#c41e3a22",
  dimmed: "#8a8070",
};
// Warm Dawn (above), Cool Mist, Sand, Ice — see style-system-v3.md §9

export function NeoSwissGradientTemplate() {
  return (
    <div style={{
      width: 1200, height: 630,
      background: `radial-gradient(circle at 75% 25%, ${PRESET.gradientStart}, ${PRESET.gradientEnd})`,
      fontFamily: '"Inter", sans-serif',
      color: PRESET.text,
      display: "flex", flexDirection: "column",
      padding: "80px 100px",
    }}>
      {/* Mega stat + label */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "12px" }}>
        <div style={{
          fontSize: "120px", fontWeight: 200,
          lineHeight: 1, color: PRESET.accent,
          letterSpacing: "-0.03em",
        }}>
          {megaStat}
        </div>
        <div style={{
          fontSize: "22px", fontWeight: 500,
          color: PRESET.dimmed, letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}>
          {statLabel}
        </div>
      </div>

      {/* Display title — ultra-light */}
      <div style={{
        fontSize: "88px", fontWeight: 200,
        lineHeight: 1.08, letterSpacing: "-0.02em",
        maxWidth: "950px",
      }}>
        {title}
      </div>

      {/* Subtitle */}
      <div style={{
        fontSize: "26px", fontWeight: 400,
        color: PRESET.dimmed, lineHeight: 1.5,
        marginTop: "20px", maxWidth: "750px",
      }}>
        {subtitle}
      </div>

      {/* Hairline rule */}
      <div style={{
        width: "900px", height: "1px",
        background: PRESET.accent,
        marginTop: "40px", marginBottom: "40px",
      }} />

      {/* Data row */}
      <div style={{
        fontSize: "28px", fontWeight: 400,
        color: PRESET.text, opacity: 0.7,
        letterSpacing: "-0.01em",
      }}>
        {dataRow}
      </div>

      {/* Domain — bottom right */}
      <div style={{
        fontSize: "22px", fontWeight: 500,
        color: PRESET.dimmed, opacity: 0.5,
        marginTop: "auto", alignSelf: "flex-end",
      }}>
        {domain}
      </div>
    </div>
  );
}
