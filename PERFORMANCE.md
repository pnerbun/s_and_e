# Performance — Smith + Elliot

Run with `/perf-review` (monorepo root command). Audit the **deployed** URL, not localhost.

## Baseline — 2026-07-16 (Lighthouse 12, `s-and-e.vercel.app`)

| Category | Mobile | Desktop |
|---|---|---|
| **Performance** | 🟡 82 | 🟢 94 |
| Accessibility | 🟢 95 | 🟢 100 |
| Best Practices | 🟢 100 | 🟢 100 |
| SEO | 🟢 100 | 🟢 100 |

**Core Web Vitals**

| Metric | Mobile | Desktop | Target |
|---|---|---|---|
| LCP | 🟡 3.5s | 🟢 1.4s | ≤2.5s |
| CLS | 🟢 0 | 🟢 0 | ≤0.1 |
| TBT | 🟢 0ms | 🟢 0ms | ≤200ms |

Desktop is excellent. Mobile is good but LCP misses the "good" bar — driven by two things below.
CLS 0 and TBT 0 are as good as it gets (the explicit image dimensions and the ~40 lines of JS pay off).

## Fixes, by measured impact

1. **[medium] Render-blocking Google Fonts** — 891ms on mobile, the single blocking request.
   `<link href="fonts.googleapis.com/css2?...">` blocks first paint.
   ⚠️ The usual `media="print" onload="this.media='all'"` async trick uses an inline handler,
   which our CSP (`script-src 'self'`) **blocks** — don't reach for it.
   **Right fix: self-host the two families** (Cormorant Garamond 400/500/600 + italics, Jost
   300/400/500) as `woff2` under `photos/` or a new `fonts/`, with `@font-face … font-display:swap`
   in `styles.css`. Removes the third-party render-block entirely and lets us drop `fonts.gstatic.com`
   from the CSP. Biggest single mobile win.

2. **[quick] Mobile hero banner is oversized** — LCP element = `chair-rentals-now-leasing.jpg`.
   Served at 1535px wide but displayed ~390px. Save ~143KB by sizing + ~84KB as WebP.
   Ship an ~800px WebP variant (already has `fetchpriority="high"`, good).

3. **[quick] Convert the JPEG/PNG photos to WebP** — `salon-building-delafield.jpg` (−341KB),
   `chair-rentals-now-leasing.jpg` (−84KB), `botanical-motif-gold.png` (−78KB). Use `<picture>`
   with WebP + JPEG fallback, or just swap to WebP (universally supported now).

## Skip — noise on a static brochure site
- "Reduce unused CSS/JS" — the JS is ~40 hand-written lines; not worth chasing.
- Cache/compression — Vercel handles these; verify with `curl -I`, don't "fix" in code.

## Notes
- Scores drift ±3 run-to-run; don't over-read a single run.
- Re-run `/perf-review` after fixes and update the baseline table above.
