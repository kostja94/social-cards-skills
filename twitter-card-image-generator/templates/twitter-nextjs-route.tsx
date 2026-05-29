// templates/twitter-nextjs-route.tsx
// Twitter/X-optimized OG image route for Next.js (App Router).
// Copy to app/twitter-image/route.tsx — OR — extend your existing og/route.tsx
// to handle platform=twitter (see og-image-generator/templates/nextjs-route.tsx).
//
// Dependencies: next (>=13.4)
//
// This route reuses the 6 visual styles from og-image-generator/templates/,
// adapted for Twitter's 1200x675px canvas and timeline-safe zones.
// See twitter-card-image-generator/SKILL.md §4 for X-specific adaptations per style.

import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type OgStyle = 'terminal' | 'magazine' | 'swiss' | 'pixel' | 'brutalist' | 'newspaper';

interface TwitterOptions {
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  style?: OgStyle;
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function GET(req: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') ?? 'Default Title';

    const options: TwitterOptions = {
      title,
      subtitle: searchParams.get('subtitle') ?? undefined,
      author: searchParams.get('author') ?? undefined,
      date: searchParams.get('date') ?? undefined,
      style: (searchParams.get('style') as OgStyle) ?? 'terminal',
    };

    // Twitter dimensions: 1200x675 (2:1 ratio)
    const width = 1200;
    const height = 675;

    return new ImageResponse(
      <TwitterStyleSwitchboard {...options} width={width} height={height} />,
      {
        width, height,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=604800, immutable',
        },
      },
    );
  } catch (error) {
    console.error('Twitter image generation failed:', error);
    return new Response('Error generating image', { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// Style switchboard
// ---------------------------------------------------------------------------
// Each function below is a Twitter-adapted version of the corresponding
// OG style template. Key adaptations:
//   - Dark backgrounds (Twitter ~40% dark mode users)
//   - Critical content in upper 60% (survives mobile 1:1 crop)
//   - 20px edge margin (Twitter rounded corner mask)
//   - Minimum 28px font size (Timeline renders at ~260px wide)

function TwitterStyleSwitchboard(props: TwitterOptions & { width: number; height: number }) {
  switch (props.style) {
    case 'terminal': return <TwitterTerminal {...props} />;
    case 'magazine': return <TwitterMagazine {...props} />;
    case 'swiss':    return <TwitterSwiss {...props} />;
    case 'pixel':    return <TwitterPixel {...props} />;
    case 'brutalist':return <TwitterBrutalist {...props} />;
    case 'newspaper':return <TwitterNewspaper {...props} />;
    default:         return <TwitterTerminal {...props} />;
  }
}

// === Twitter Terminal (dark, monospace, naturally X-friendly) ===

function TwitterTerminal({ title, subtitle, author, date }: TwitterOptions) {
  const C = { bg: '#0d1117', text: '#f0f6fc', accent: '#58a6ff', dim: '#8b949e' };
  return (
    <div style={{ width: '100%', height: '100%', background: C.bg, fontFamily: '"JetBrains Mono", monospace', color: C.text, display: 'flex', flexDirection: 'column', padding: '36px 20px 20px' }}>
      <div style={{ display: 'flex', fontSize: '22px', marginBottom: '20px', marginLeft: '40px' }}>
        <span style={{ color: C.dim }}>~/blog $ </span>
        <span style={{ color: C.text }}>cat post.md</span>
      </div>
      <div style={{ height: '24px' }} />
      <div style={{ fontSize: '54px', fontWeight: 700, lineHeight: 1.2, color: C.accent, marginLeft: '40px', maxWidth: '950px' }}>
        {title}
      </div>
      {subtitle && (
        <div style={{ fontSize: '28px', fontWeight: 400, color: C.text, opacity: 0.85, marginTop: '14px', marginLeft: '40px', maxWidth: '850px' }}>
          {subtitle}
        </div>
      )}
      <div style={{ fontSize: '22px', color: C.dim, marginTop: '32px', marginLeft: '40px' }}>
        # {date}  # @{author}
      </div>
      <div style={{ marginTop: 'auto', fontSize: '24px', color: C.dim, textAlign: 'right', paddingRight: '20px' }}>
        yoursite.com
      </div>
    </div>
  );
}

// === Twitter Magazine (Midnight Ink preset, dark editorial) ===

function TwitterMagazine({ title, subtitle, author, date }: TwitterOptions) {
  const C = { bg: '#0f0f14', text: '#e8e0d0', body: '#8a8070', accent: '#c4a44a', rule: '#2a2824' };
  return (
    <div style={{ width: '100%', height: '100%', background: C.bg, fontFamily: '"Playfair Display", serif', color: C.text, display: 'flex', flexDirection: 'column', padding: '50px 80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div style={{ fontSize: '20px', fontWeight: 500, fontFamily: 'Inter, sans-serif', color: C.accent, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Issue 01</div>
        <div style={{ fontSize: '20px', fontWeight: 500, fontFamily: 'Inter, sans-serif', color: C.body, textTransform: 'uppercase' }}>{date}</div>
      </div>
      <div style={{ fontSize: '68px', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.01em', maxWidth: '850px' }}>
        {title}
      </div>
      {subtitle && (
        <div style={{ fontSize: '28px', fontWeight: 400, fontFamily: 'Inter, sans-serif', color: C.body, marginTop: '16px' }}>{subtitle}</div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '32px', borderTop: `1px solid ${C.rule}` }}>
        <div style={{ fontSize: '22px', fontFamily: 'Inter, sans-serif', color: C.body }}>By {author}</div>
        <div style={{ fontSize: '22px', fontFamily: 'Inter, sans-serif', color: C.body, opacity: 0.5 }}>yoursite.com</div>
      </div>
    </div>
  );
}

// === Twitter Swiss (dark variant with accent intact) ===

function TwitterSwiss({ title, subtitle }: TwitterOptions) {
  const accent = '#3b82f6';
  return (
    <div style={{ width: '100%', height: '100%', background: '#0a0a0a', fontFamily: '"Inter", sans-serif', color: '#f5f5f5', display: 'flex', flexDirection: 'column', padding: '70px 90px' }}>
      <div style={{ fontSize: '72px', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{title}</div>
      {subtitle && (
        <div style={{ fontSize: '28px', fontWeight: 400, color: '#888', lineHeight: 1.5, marginTop: '18px', maxWidth: '700px' }}>{subtitle}</div>
      )}
      <div style={{ width: '900px', height: '2px', background: accent, marginTop: '32px', marginBottom: '32px' }} />
      <div style={{ flex: 1 }} />
      <div style={{ fontSize: '24px', fontWeight: 500, color: '#555', textAlign: 'right' }}>yoursite.com</div>
    </div>
  );
}

// === Twitter Pixel (naturally dark, shrunk HUD for edge mask) ===

function TwitterPixel({ title }: TwitterOptions) {
  const C = { bg: '#1a1a2e', text: '#f8f8f8', accent: '#f8b800', sec: '#e83030', border: '#f8f8f8' };
  return (
    <div style={{ width: '100%', height: '100%', background: C.bg, fontFamily: '"Press Start 2P", monospace', color: C.text, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '50px' }}>
      <div style={{ border: `4px solid ${C.border}`, padding: '30px 50px', width: '100%', height: '100%', boxSizing: 'border-box', boxShadow: `6px 6px 0px 0px ${C.sec}`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontSize: '26px', color: C.accent, letterSpacing: '2px', textAlign: 'center', marginBottom: '40px' }}>★ {title} ★</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '850px' }}>
          {['FLUX 9.2', 'MIDJRNY 9.5', 'DALL-E 8.7', 'GPT IMG 8.9'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ fontSize: '18px', width: '170px', letterSpacing: '2px' }}>{item}</div>
              <div style={{ flex: 1, height: '26px', border: `3px solid ${C.border}` }}>
                <div style={{ width: `${[92,95,87,89][i]}%`, height: '100%', background: [92,95,87,89][i] >= 90 ? C.accent : C.sec }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: '20px', color: C.accent, marginTop: '28px', letterSpacing: '2px' }}>▼▼▼ 2026 ▼▼▼</div>
        <div style={{ fontSize: '16px', color: C.text, opacity: 0.5, marginTop: '14px', letterSpacing: '1px' }}>yoursite.com</div>
      </div>
    </div>
  );
}

// === Twitter Brutalist (black BG already dark-mode-native) ===

function TwitterBrutalist({ title }: TwitterOptions) {
  const bg = '#000000'; const fg = '#ffffff';
  const labels = ['FLUX', 'MIDJOURNEY', 'DALL-E', 'GPT IMAGE'];
  const scores = ['9.2', '9.5', '8.7', '8.9'];
  const pcts = [92, 95, 87, 89];
  return (
    <div style={{ width: '100%', height: '100%', background: bg, fontFamily: '"Inter", sans-serif', color: fg, display: 'flex', flexDirection: 'column', padding: '0px' }}>
      <div style={{ background: fg, color: bg, padding: '36px 50px', marginTop: '30px', marginLeft: '50px', alignSelf: 'flex-start' }}>
        <div style={{ fontSize: '80px', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.04em' }}>{title}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '50px', marginLeft: '50px', marginRight: '50px' }}>
        {labels.map((label, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ fontSize: '26px', fontWeight: 800, width: '200px' }}>{label}</div>
            <div style={{ flex: 1, height: '28px', border: `3px solid ${fg}`, marginLeft: '16px' }}>
              <div style={{ width: `${pcts[i]}%`, height: '100%', background: fg }} />
            </div>
            <div style={{ fontSize: '30px', fontWeight: 900, marginLeft: '14px' }}>{scores[i]}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', background: fg, color: bg, padding: '16px 50px 16px 50px', marginTop: '50px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ fontSize: '28px', fontWeight: 900 }}>COMPARISON 2026</div>
        <div style={{ fontSize: '18px', fontWeight: 700, opacity: 0.6 }}>yoursite.com</div>
      </div>
    </div>
  );
}

// === Twitter Newspaper (dark variant for X timeline) ===

function TwitterNewspaper({ title, subtitle, author, date }: TwitterOptions) {
  const C = { bg: '#1a1a1a', text: '#f0f0f0', body: '#aaaaaa', rule: '#444444', label: '#888888' };
  return (
    <div style={{ width: '100%', height: '100%', background: C.bg, fontFamily: '"Source Serif", serif', color: C.text, display: 'flex', flexDirection: 'column', padding: '44px 60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ fontSize: '18px', fontWeight: 600, fontFamily: 'Inter, sans-serif', color: C.label, letterSpacing: '0.1em', textTransform: 'uppercase' }}>DAILY REPORT</div>
        <div style={{ fontSize: '18px', fontWeight: 500, fontFamily: 'Inter, sans-serif', color: C.label }}>{date}</div>
      </div>
      <div style={{ width: '100%', height: '1px', background: C.rule }} />
      <div style={{ fontSize: '46px', fontWeight: 700, lineHeight: 1.2, marginTop: '20px', maxWidth: '900px' }}>{title}</div>
      {subtitle && (
        <div style={{ fontSize: '38px', fontWeight: 600, lineHeight: 1.2, color: C.body }}>{subtitle}</div>
      )}
      <div style={{ fontSize: '20px', fontFamily: 'Inter, sans-serif', color: C.label, marginTop: '12px', marginBottom: '20px' }}>By {author}</div>
      <div style={{ width: '100%', height: '1px', background: C.rule }} />
      <div style={{ display: 'flex', gap: '36px', marginTop: '20px', flex: 1 }}>
        {['FLUX', 'MIDJOURNEY', 'DALL-E'].map((h, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'Inter, sans-serif', borderBottom: `2px solid ${C.rule}`, paddingBottom: '6px', textTransform: 'uppercase' }}>{h}</div>
            <div style={{ fontSize: '22px', fontFamily: 'Inter, sans-serif', color: C.body, lineHeight: 1.4 }}>{['Score: 9.2', 'Score: 9.5', 'Score: 8.7'][i]}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
        <div style={{ width: '100%', height: '1px', background: C.rule }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <div style={{ fontSize: '18px', fontFamily: 'Inter, sans-serif', color: C.label }}>yoursite.com</div>
        </div>
      </div>
    </div>
  );
}
