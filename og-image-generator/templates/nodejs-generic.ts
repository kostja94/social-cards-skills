// templates/nodejs-generic.ts
// Framework-agnostic batch OG image generation script.
// Dependencies: satori, @resvg/resvg-js, sharp (optional, for optimization)
//
// npm install satori @resvg/resvg-js sharp
// npx tsx scripts/generate-og-images.ts
//
// For the 6 visual styles (terminal, magazine, swiss, pixel, brutalist,
// newspaper), see og-image-generator/templates/{style}.tsx — each style has
// a full Satori JSX template. This file shows the batch pipeline; import
// a style's template function to use it here.

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PageData {
  title: string;
  slug: string;
  subtitle?: string;
  category?: string;
  style?: string; // 'terminal' | 'magazine' | 'swiss' | 'pixel' | 'brutalist' | 'newspaper'
}

interface FontConfig {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 500 | 600 | 700 | 800 | 900;
  style?: 'normal' | 'italic';
}

// ---------------------------------------------------------------------------
// Font loading
// ---------------------------------------------------------------------------

async function loadFonts(): Promise<FontConfig[]> {
  const fontDir = path.join(process.cwd(), 'fonts');

  const [interBold, interRegular] = await Promise.all([
    fs.readFile(path.join(fontDir, 'Inter-Bold.ttf')),
    fs.readFile(path.join(fontDir, 'Inter-Regular.ttf')),
  ]);

  return [
    { name: 'Inter', data: interBold.buffer as ArrayBuffer, weight: 700, style: 'normal' },
    { name: 'Inter', data: interRegular.buffer as ArrayBuffer, weight: 400, style: 'normal' },
  ];
}

// ---------------------------------------------------------------------------
// Template: Swiss Minimal (plain object — no JSX in .ts file)
// ---------------------------------------------------------------------------
// For other styles, copy the equivalent plain-object version from
// templates/{style}.tsx or convert the JSX to Satori's object format.

function swissTemplate(title: string, subtitle?: string): Parameters<typeof satori>[0] {
  return {
    type: 'div',
    props: {
      style: {
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        background: '#fafafa', fontFamily: 'Inter',
        color: '#0a0a0a', padding: '80px 100px',
      },
      children: [
        // Title — light, large
        {
          type: 'div',
          props: {
            style: {
              fontSize: '80px', fontWeight: '300',
              lineHeight: 1.1, letterSpacing: '-0.02em',
            },
            children: title,
          },
        },
        // Subtitle (conditional)
        ...(subtitle ? [{
          type: 'div' as const,
          props: {
            style: {
              fontSize: '28px', fontWeight: '400',
              color: '#666', lineHeight: 1.5,
              marginTop: '20px', maxWidth: '750px',
            },
            children: subtitle,
          },
        }] : []),
        // Accent rule
        {
          type: 'div',
          props: {
            style: {
              width: '900px', height: '2px',
              background: '#0033ff',
              marginTop: '36px', marginBottom: '36px',
            },
          },
        },
        // Spacer
        { type: 'div', props: { style: { flex: 1 } } },
        // Domain
        {
          type: 'div',
          props: {
            style: {
              fontSize: '24px', fontWeight: '500',
              color: '#bbb', textAlign: 'right',
            },
            children: 'yoursite.com',
          },
        },
      ],
    },
  };
}

// ---------------------------------------------------------------------------
// Core: render single OG image
// ---------------------------------------------------------------------------

async function renderOgImage(
  title: string,
  subtitle: string | undefined,
  fonts: FontConfig[],
  width = 1200,
  height = 630,
): Promise<Buffer> {
  const element = swissTemplate(title, subtitle);

  const svg = await satori(element as any, {
    width, height,
    fonts: fonts as any,
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
  });

  const pngBuffer = resvg.render().asPng();

  // Optional: optimize with sharp
  // const optimized = await sharp(pngBuffer).png({ quality: 90 }).toBuffer();
  // return optimized;

  return Buffer.from(pngBuffer);
}

// ---------------------------------------------------------------------------
// Batch generation
// ---------------------------------------------------------------------------

async function generateAll() {
  console.log('Loading fonts...');
  const fonts = await loadFonts();

  // Define your pages — or read from CMS, file system, or API
  const pages: PageData[] = [
    { title: 'Home', slug: 'home' },
    { title: 'About Us', slug: 'about' },
    { title: 'Blog', slug: 'blog', subtitle: 'Latest posts and insights' },
    // ... add all pages. Set `style` to any of the 6 style names.
  ];

  const outputDir = path.join(process.cwd(), 'public', 'og');
  await fs.mkdir(outputDir, { recursive: true });

  let generated = 0;

  for (const page of pages) {
    const outputPath = path.join(outputDir, `${page.slug}.png`);

    try {
      const png = await renderOgImage(page.title, page.subtitle, fonts);
      await fs.writeFile(outputPath, png);
      generated++;
      console.log(`  ✓ ${page.slug}.png`);
    } catch (error) {
      console.error(`  ✗ ${page.slug}:`, error);
    }
  }

  console.log(`\nDone: ${generated} generated.`);
}

generateAll().catch(console.error);
