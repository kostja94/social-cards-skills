# Twitter-Specific Image Details

Supplementary reference for **twitter-card-image-generator** covering edge cases, platform quirks, and detailed rendering behavior that doesn't fit in the main SKILL.md.

## Card Type Image Behavior (Detailed)

### summary_large_image (recommended)

- **Timeline**: Full-width image at top of the card, ~506px wide on desktop, ~260px on mobile
- **Expanded view**: Image renders at up to ~1024px wide
- **Aspect ratio**: 2:1 official; renders correctly at 1.91:1 in practice
- **Bottom safe zone**: Bottom ~10-15% may be hidden behind card text overlay on some clients

### summary

- **Timeline**: Small 100x100px square thumbnail on the left
- **Purpose**: Minimal visual presence; used for text-forward tweets
- **Image is cropped to square**: Upload a square image or accept auto-cropping from center

### player

- **Poster image**: Displayed before user taps play; then replaced by embedded player
- **Dimensions**: Poster image at 2:1 ratio recommended; player iframe at 480x480 default
- **Play button overlay**: Add a white triangle play button to poster manually — Twitter does NOT add one
- **Whitelist requirement**: Twitter whitelists domains for `player` cards. Contact Twitter about approval.

### app

- **App icon**: Square, used alongside the promotional image
- **Promotional image**: Banner-style, ~800x320px typical
- **Deep link**: `twitter:app:id:iphone`, `twitter:app:id:ipad`, `twitter:app:id:googleplay`

## Dark Mode Behavior

Twitter's dark mode (Dim and Lights Out) wraps the card in a dark container. Your image:

- Sits inside a dark card background — not the white background shown in the Card Validator
- Transparency in PNGs shows the dark card background behind the image
- White-background images create a stark contrast — this can be intentional (stands out) or jarring
- Dark-background images blend smoothly with the timeline

**Recommendation**: Provide both light and dark variants if your brand supports it. Use `(prefers-color-scheme: dark)` media query on the image endpoint, or serve a neutral gradient that works in both modes.

## Image Caching on X

- Twitter caches card images aggressively. After updating an image, it can take several hours for the new image to propagate across all Twitter clients.
- **Force re-crawl**: Use the [Card Validator](https://cards-dev.twitter.com/validator) and click "Preview card" — this triggers a fresh fetch.
- **Cache key trick**: If you need immediate propagation, change the image filename/URL (add `?v=2` or use content hash in path).
- **CDN**: Twitter fetches from its own IP range. Ensure your image endpoint is publicly accessible (no IP whitelisting, no auth walls).

## Platform-Specific Image Rendering Differences

| Platform | Twitter display | Facebook display | Key difference |
|----------|----------------|------------------|---------------|
| Image position | Above card text | Above card text | Twitter crops bottom; Facebook shows full image |
| Max width (desktop) | ~506px (timeline) | ~552px (news feed) | Twitter is slightly narrower |
| Dark mode | Wraps in dark card | No dark mode support | Dark backgrounds preferred for Twitter |
| Click behavior | Image + card is tappable together | Image and text are one unit | Both expand to link, same UX |
| Rounded corners | Yes (on card) | No (square) | Keep logos ~20px from edges on Twitter |
| Image alone (no meta) | Renders images directly as photos | Ignores images without meta tags | Twitter can show images even without Card tags |

## Multi-Image Cards

Twitter supports multi-image posts, but link cards only show one image. If your page has multiple OG images, Twitter picks the first one (or the one specified by `twitter:image`). There is no equivalent of `og:image:width` multi-image selection for Twitter.

## Image Alt Text

`twitter:image:alt` provides alt text (max 420 chars) for accessibility:

```html
<meta name="twitter:image:alt" content="OG card showing 'Best AI Tools 2026' title on dark blue gradient background">
```

Twitter's alt text is visible to screen readers and shown in the image description UI. Write descriptive alt text — not just the title repeated.

## When to Skip Twitter-Specific Images

In practice, many sites use a single 1200x630px image for both OG and Twitter. This is acceptable when:

- Your OG image has a flexible layout (text framed in the center, not edge-to-edge)
- You don't need the extra 45px height (675 → 630 difference is ~7%)
- Your template looks fine slightly letterboxed in Twitter's timeline

Using a cross-platform 1200x628px image is the simplest path — it's close enough to both the OG 1.91:1 and Twitter 2:1 ratios that the difference is barely noticeable.
