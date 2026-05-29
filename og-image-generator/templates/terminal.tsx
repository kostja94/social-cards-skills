/**
 * Terminal/CLI Style — Satori JSX Seed Template
 *
 * Visual anchors: dark background, monospace, $> prompts, window chrome.
 * Color preset: GitHub Dark (change accent via CSS variables noted below).
 *
 * Usage:
 *   1. Copy this file
 *   2. Replace title, subtitle, date, author, domain
 *   3. Change color preset by swapping the 4 highlight color values
 *   4. Toggle window chrome (set showChrome to true/false)
 */

// ─── Config (edit these) ───────────────────────────────────
const title = "Best AI Image Generators";
const subtitle = "Flux vs Midjourney vs DALL·E — 2026 comparison";
const date = "2026-05-29";
const author = "@kostja";
const domain = "yoursite.com";

// Color presets — uncomment one set:
// GitHub Dark (default):
const COLORS = { bg: "#0d1117", text: "#f0f6fc", accent: "#58a6ff", dimmed: "#8b949e", prompt: "#58a6ff" };
// Matrix:   { bg: "#0a0a0a", text: "#00ff41", accent: "#00ff41", dimmed: "#005c1f", prompt: "#00ff41" }
// Amber:    { bg: "#1a1a0a", text: "#ffb000", accent: "#ffb000", dimmed: "#5c4000", prompt: "#ffb000" }
// Nord:     { bg: "#2e3440", text: "#eceff4", accent: "#88c0d0", dimmed: "#4c566a", prompt: "#88c0d0" }
// Dracula:  { bg: "#282a36", text: "#f8f8f2", accent: "#bd93f9", dimmed: "#6272a4", prompt: "#bd93f9" }

const showChrome = true;       // toggle window title bar
const showCursor = true;       // toggle blinking prompt at bottom

// ─── Template (modify layout, not config) ──────────────────
export function TerminalTemplate() {
  return (
    <div style={{
      width: 1200, height: 630,
      background: COLORS.bg,
      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
      color: COLORS.text,
      display: "flex", flexDirection: "column",
      padding: showChrome ? "0px" : "60px 80px",
    }}>
      {/* Window chrome */}
      {showChrome && (
        <div style={{
          display: "flex", alignItems: "center",
          height: "40px", padding: "0 16px",
          background: "#161b22", borderRadius: "8px 8px 0 0",
        }}>
          {/* Traffic light dots */}
          <div style={{ display: "flex", gap: "8px", marginRight: "16px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#28c840" }} />
          </div>
          <div style={{ fontSize: "14px", color: COLORS.dimmed, flex: 1, textAlign: "center" }}>
            terminal — -zsh — 80×24
          </div>
        </div>
      )}

      {/* Content area */}
      <div style={{
        display: "flex", flexDirection: "column",
        padding: showChrome ? "40px 60px 60px" : "0px",
        flex: 1, justifyContent: "flex-start",
      }}>
        {/* Path + prompt */}
        <div style={{ display: "flex", fontSize: "24px", marginBottom: "24px" }}>
          <span style={{ color: COLORS.dimmed }}>~/blog $ </span>
          <span style={{ color: COLORS.text }}>cat post.md</span>
        </div>

        {/* Spacer */}
        <div style={{ height: "32px" }} />

        {/* Title (the main content) */}
        <div style={{
          fontSize: "60px", fontWeight: 700,
          lineHeight: 1.25, color: COLORS.accent,
          maxWidth: "1000px",
        }}>
          {title}
        </div>

        {/* Subtitle if present */}
        {subtitle && (
          <div style={{
            fontSize: "28px", fontWeight: 400,
            color: COLORS.text, opacity: 0.85,
            marginTop: "16px", maxWidth: "900px",
            lineHeight: 1.4,
          }}>
            {subtitle}
          </div>
        )}

        {/* Comment-style metadata */}
        <div style={{
          display: "flex", flexDirection: "column",
          marginTop: "40px", gap: "4px",
        }}>
          <div style={{ fontSize: "22px", color: COLORS.dimmed, fontWeight: 400 }}>
            # {date}
          </div>
          <div style={{ fontSize: "22px", color: COLORS.dimmed, fontWeight: 400 }}>
            # author: {author}
          </div>
        </div>

        {/* Bottom: cursor + domain */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-end", marginTop: "auto",
          paddingTop: "60px",
        }}>
          {showCursor && (
            <div style={{ fontSize: "26px", color: COLORS.accent }}>
              ~/blog $ <span style={{
                display: "inline-block", width: "10px", height: "26px",
                background: COLORS.accent, marginLeft: "4px",
                verticalAlign: "bottom",
              }} />
            </div>
          )}
          <div style={{
            fontSize: "24px", color: COLORS.dimmed, fontWeight: 400,
            marginLeft: "auto",
          }}>
            {domain}
          </div>
        </div>
      </div>
    </div>
  );
}
