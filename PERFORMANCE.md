# Performance — Smith + Elliot

Run with `/perf-review` (monorepo root command). Audit the **deployed** URL, not localhost.

## Current — 2026-07-16 (after fixes 1–3 below)

| Category | Mobile | Desktop |
|---|---|---|
| **Performance** | 🟢 **98** | 🟢 **100** |
| Accessibility | 🟢 95 | 🟢 100 |
| Best Practices | 🟢 100 | 🟢 100 |
| SEO | 🟢 100 | 🟢 100 |

| Metric | Mobile | Desktop | Target |
|---|---|---|---|
| LCP | 🟢 **2.3s** | 🟢 **0.5s** | ≤2.5s |
| CLS | 🟢 0 | 🟢 0 | ≤0.1 |
| TBT | 🟢 0ms | 🟢 0ms | ≤200ms |

Page weight: mobile **1,122 → 502 KiB**, desktop **1,315 → 543 KiB** (~55% lighter).
All three fixes below are **done** (commit `438e2e9`).

### Original baseline (before fixes) — for reference
Mobile perf 82 / LCP 3.5s; desktop 94 / LCP 1.4s. The two drivers were render-blocking
Google Fonts (891ms) and oversized JPEGs.

## Fixes — DONE 2026-07-16

1. ✅ **[done] Self-hosted the fonts** (was render-blocking Google Fonts) — 891ms on mobile, the single blocking request.
   `<link href="fonts.googleapis.com/css2?...">` blocks first paint.
   ⚠️ The usual `media="print" onload="this.media='all'"` async trick uses an inline handler,
   which our CSP (`script-src 'self'`) **blocks** — don't reach for it.
   **Right fix: self-host the two families** (Cormorant Garamond 400/500/600 + italics, Jost
   300/400/500) as `woff2` under `photos/` or a new `fonts/`, with `@font-face … font-display:swap`
   in `styles.css`. Removes the third-party render-block entirely and lets us drop `fonts.gstatic.com`
   from the CSP. Biggest single mobile win.

2. ✅ **[done] Sized + WebP mobile hero banner** — LCP element = `chair-rentals-now-leasing.jpg`.
   Served at 1535px wide but displayed ~390px. Save ~143KB by sizing + ~84KB as WebP.
   Ship an ~800px WebP variant (already has `fetchpriority="high"`, good).

3. ✅ **[done] Converted photos to WebP** — `salon-building-delafield.jpg` (−341KB),
   `chair-rentals-now-leasing.jpg` (−84KB), `botanical-motif-gold.png` (−78KB). Use `<picture>`
   with WebP + JPEG fallback, or just swap to WebP (universally supported now).

## Skip — noise on a static brochure site
- "Reduce unused CSS/JS" — the JS is ~40 hand-written lines; not worth chasing.
- Cache/compression — Vercel handles these; verify with `curl -I`, don't "fix" in code.

## Notes
- Scores drift ±3 run-to-run; don't over-read a single run.
- Re-run `/perf-review` after fixes and update the baseline table above.
