// templates/nextjs-route.tsx
// Copy this to app/og/route.tsx in your Next.js (App Router) project.
//
// Dependencies: next (>=13.4), react (>=18)
// No additional packages needed — next/og bundles Satori + resvg
//
// This route accepts a `style` query parameter to pick from 6 visual styles:
//   terminal, magazine, swiss, pixel, brutalist, newspaper
// See og-image-generator/references/style-system.md for full specs.
//
// Each style has a seed template at templates/{style}.tsx — copy the template
// function from there or use this single-file version below.

import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type OgStyle = 'terminal' | 'magazine' | 'swiss' | 'pixel' | 'brutalist' | 'newspaper';

interface OgOptions {
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  category?: string;
  style?: OgStyle;
  platform?: 'og' | 'twitter';
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function GET(req: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);

    const options: OgOptions = {
      title: searchParams.get('title') ?? 'Default Title',
      subtitle: searchParams.get('subtitle') ?? undefined,
      author: searchParams.get('author') ?? undefined,
      date: searchParams.get('date') ?? undefined,
      category: searchParams.get('category') ?? undefined,
      style: (searchParams.get('style') as OgStyle) ?? 'swiss',
      platform: (searchParams.get('platform') as 'og' | 'twitter') ?? 'og',
    };

    const width = 1200;
    const height = options.platform === 'twitter' ? 675 : 630;

    const cacheKey = hashInputs(options);
    const headers: Record<string, string> = {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=604800, immutable',
      'X-OG-Cache-Key': cacheKey,
    };

    return new ImageResponse(
      <OgSwitchboard {...options} width={width} height={height} />,
      { width, height, headers },
    );
  } catch (error) {
    console.error('OG image generation failed:', error);
    return fetch(new URL('/opengraph-image.png', req.url));
  }
}

// ---------------------------------------------------------------------------
// Style switchboard — dispatches to the selected visual style
// ---------------------------------------------------------------------------
// Each style has a full-featured seed template at templates/{style}.tsx.
// The functions below are compact inline versions that work as a single-file
// drop-in. For richer layouts with color presets and config blocks, copy the
// full template from the corresponding .tsx file.

function OgSwitchboard(props: OgOptions & { width: number; height: number }) {
  switch (props.style) {
    case 'terminal': return <TerminalStyle {...props} />;
    case 'magazine': return <MagazineStyle {...props} />;
    case 'swiss':    return <SwissStyle {...props} />;
    case 'pixel':    return <PixelStyle {...props} />;
    case 'brutalist':return <BrutalistStyle {...props} />;
    case 'newspaper':return <NewspaperStyle {...props} />;
    default:         return <SwissStyle {...props} />;
  }
}

// === Style 1: Terminal/CLI ===

function TerminalStyle({ title, subtitle, author, date }: OgOptions) {
  const C = { bg: '#0d1117', text: '#f0f6fc', accent: '#58a6ff', dim: '#8b949e' };
  return (
    <div style={{ width: '100%', height: '100%', background: C.bg, fontFamily: '"JetBrains Mono", monospace', color: C.text, display: 'flex', flexDirection: 'column', padding: '0px' }}>
      <div style={{ display: 'flex', alignItems: 'center', height: '40px', padding: '0 16px', background: '#161b22', borderRadius: '8px 8px 0 0' }}>
        <div style={{ display: 'flex', gap: '8px', marginRight: '16px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840' }} />
        </div>
        <div style={{ fontSize: '14px', color: C.dim }}>terminal — -zsh — 80×24</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '40px 60px 60px', flex: 1 }}>
        <div style={{ display: 'flex', fontSize: '24px', marginBottom: '24px' }}>
          <span style={{ color: C.dim }}>~/blog $ </span>
          <span style={{ color: C.text }}>cat post.md</span>
        </div>
        <div style={{ height: '32px' }} />
        <div style={{ fontSize: '60px', fontWeight: 700, lineHeight: 1.25, color: C.accent }}>{title}</div>
        {subtitle && (
          <div style={{ fontSize: '28px', fontWeight: 400, color: C.text, opacity: 0.85, marginTop: '16px' }}>{subtitle}</div>
        )}
        <div style={{ fontSize: '22px', color: C.dim, marginTop: '40px' }}># {date}  # author: {author}</div>
        <div style={{ marginTop: 'auto', fontSize: '24px', color: C.dim, textAlign: 'right' }}>yoursite.com</div>
      </div>
    </div>
  );
}

// === Style 2: Magazine Editorial ===

function MagazineStyle({ title, subtitle, author, date }: OgOptions) {
  const C = { bg: '#faf8f5', text: '#1a1a1a', body: '#4a4a4a', accent: '#c41e3a', rule: '#d4cfc8' };
  return (
    <div style={{ width: '100%', height: '100%', background: C.bg, fontFamily: '"Playfair Display", serif', color: C.text, display: 'flex', flexDirection: 'column', padding: '60px 80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '36px' }}>
        <div style={{ fontSize: '20px', fontWeight: 500, fontFamily: 'Inter, sans-serif', color: C.accent, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Issue 01</div>
        <div style={{ fontSize: '20px', fontWeight: 500, fontFamily: 'Inter, sans-serif', color: C.body, textTransform: 'uppercase' }}>{date}</div>
      </div>
      <div style={{ fontSize: '72px', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.01em' }}>{title}</div>
      {subtitle && (
        <div style={{ fontSize: '28px', fontWeight: 400, fontFamily: 'Inter, sans-serif', color: C.body, marginTop: '20px' }}>{subtitle}</div>
      )}
      <div style={{ marginTop: '60px' }}>
        <div style={{ width: '100%', height: '1px', background: C.rule }} />
        <div style={{ display: 'flex', gap: '48px', marginTop: '20px' }}>
          {['9.2', '9.5', '8.7'].map((v, i) => (
            <div key={i} style={{ fontSize: '48px', fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>{v}</div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '40px', borderTop: `1px solid ${C.rule}` }}>
        <div style={{ fontSize: '22px', fontFamily: 'Inter, sans-serif', color: C.body }}>By {author}</div>
        <div style={{ fontSize: '22px', fontFamily: 'Inter, sans-serif', color: C.body, opacity: 0.5 }}>yoursite.com</div>
      </div>
    </div>
  );
}

// === Style 3: Swiss Minimal ===

function SwissStyle({ title, subtitle }: OgOptions) {
  const accent = '#0033ff';
  return (
    <div style={{ width: '100%', height: '100%', background: '#fafafa', fontFamily: '"Inter", sans-serif', color: '#0a0a0a', display: 'flex', flexDirection: 'column', padding: '80px 100px' }}>
      <div style={{ fontSize: '80px', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{title}</div>
      {subtitle && (
        <div style={{ fontSize: '28px', fontWeight: 400, color: '#666', lineHeight: 1.5, marginTop: '20px', maxWidth: '750px' }}>{subtitle}</div>
      )}
      <div style={{ width: '900px', height: '2px', background: accent, marginTop: '36px', marginBottom: '36px' }} />
      <div style={{ flex: 1 }} />
      <div style={{ fontSize: '24px', fontWeight: 500, color: '#bbb', textAlign: 'right' }}>yoursite.com</div>
    </div>
  );
}

// === Style 4: Pixel Retro ===

function PixelStyle({ title }: OgOptions) {
  const C = { bg: '#1a1a2e', text: '#f8f8f8', accent: '#f8b800', sec: '#e83030', border: '#f8f8f8' };
  const items = ['FLUX 9.2', 'MIDJRNY 9.5', 'DALL-E 8.7', 'GPT IMG 8.9'];
  const pcts = [92, 95, 87, 89];
  return (
    <div style={{ width: '100%', height: '100%', background: C.bg, fontFamily: '"Press Start 2P", monospace', color: C.text, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px' }}>
      <div style={{ border: `4px solid ${C.border}`, padding: '36px 56px', width: '100%', height: '100%', boxSizing: 'border-box', boxShadow: `8px 8px 0px 0px ${C.sec}`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontSize: '28px', color: C.accent, letterSpacing: '2px', textAlign: 'center', marginBottom: '48px' }}>★ {title} ★</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '800px' }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '20px', width: '180px', letterSpacing: '2px' }}>{item}</div>
              <div style={{ flex: 1, height: '28px', border: `3px solid ${C.border}` }}>
                <div style={{ width: `${pcts[i]}%`, height: '100%', background: pcts[i] >= 90 ? C.accent : C.sec }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: '22px', color: C.accent, marginTop: '32px', letterSpacing: '2px' }}>▼▼▼ 2026 ▼▼▼</div>
        <div style={{ fontSize: '18px', color: C.text, opacity: 0.5, marginTop: '16px', letterSpacing: '1px' }}>yoursite.com</div>
      </div>
    </div>
  );
}

// === Style 5: Brutalist ===

function BrutalistStyle({ title }: OgOptions) {
  const bg = '#000000'; const fg = '#ffffff';
  const labels = ['FLUX', 'MIDJOURNEY', 'DALL-E', 'GPT IMAGE'];
  const scores = ['9.2', '9.5', '8.7', '8.9'];
  const pcts = [92, 95, 87, 89];
  return (
    <div style={{ width: '100%', height: '100%', background: bg, fontFamily: '"Inter", sans-serif', color: fg, display: 'flex', flexDirection: 'column', padding: '0px' }}>
      <div style={{ background: fg, color: bg, padding: '40px 60px', marginTop: '40px', marginLeft: '60px', alignSelf: 'flex-start' }}>
        <div style={{ fontSize: '88px', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.04em' }}>{title}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '60px', marginLeft: '60px', marginRight: '80px' }}>
        {labels.map((label, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, width: '220px' }}>{label}</div>
            <div style={{ flex: 1, height: '32px', border: `3px solid ${fg}`, marginLeft: '20px' }}>
              <div style={{ width: `${pcts[i]}%`, height: '100%', background: fg }} />
            </div>
            <div style={{ fontSize: '32px', fontWeight: 900, marginLeft: '16px' }}>{scores[i]}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', background: fg, color: bg, padding: '20px 60px 20px 80px', marginTop: '60px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ fontSize: '32px', fontWeight: 900 }}>COMPARISON 2026</div>
        <div style={{ fontSize: '20px', fontWeight: 700, opacity: 0.6 }}>yoursite.com</div>
      </div>
    </div>
  );
}

// === Style 6: Newspaper ===

function NewspaperStyle({ title, subtitle, author, date }: OgOptions) {
  const C = { bg: '#fcfaf7', text: '#111111', body: '#333333', rule: '#111111', label: '#555555' };
  return (
    <div style={{ width: '100%', height: '100%', background: C.bg, fontFamily: '"Source Serif", serif', color: C.text, display: 'flex', flexDirection: 'column', padding: '50px 70px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'Inter, sans-serif', color: C.label, letterSpacing: '0.1em', textTransform: 'uppercase' }}>DAILY REPORT</div>
        <div style={{ fontSize: '20px', fontWeight: 500, fontFamily: 'Inter, sans-serif', color: C.label }}>{date}</div>
      </div>
      <div style={{ width: '100%', height: '1px', background: C.rule }} />
      <div style={{ fontSize: '48px', fontWeight: 700, lineHeight: 1.2, marginTop: '24px' }}>{title}</div>
      {subtitle && (
        <div style={{ fontSize: '42px', fontWeight: 600, lineHeight: 1.2, color: C.body }}>{subtitle}</div>
      )}
      <div style={{ fontSize: '22px', fontFamily: 'Inter, sans-serif', color: C.label, marginTop: '16px', marginBottom: '24px' }}>By {author}</div>
      <div style={{ width: '100%', height: '1px', background: C.rule }} />
      <div style={{ display: 'flex', gap: '40px', marginTop: '24px', flex: 1 }}>
        {['FLUX', 'MIDJOURNEY', 'DALL-E'].map((h, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontSize: '26px', fontWeight: 700, fontFamily: 'Inter, sans-serif', borderBottom: `2px solid ${C.rule}`, paddingBottom: '8px', textTransform: 'uppercase' }}>{h}</div>
            <div style={{ fontSize: '24px', fontFamily: 'Inter, sans-serif', color: C.body, lineHeight: 1.4 }}>{['Score: 9.2', 'Score: 9.5', 'Score: 8.7'][i]}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
        <div style={{ width: '100%', height: '1px', background: C.rule }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
          <div style={{ fontSize: '20px', fontFamily: 'Inter, sans-serif', color: C.label }}>yoursite.com</div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function hashInputs(options: OgOptions): string {
  const str = `${options.title}|${options.style}|${options.platform}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
}
