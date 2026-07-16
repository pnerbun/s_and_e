# Project Brief — Smith + Elliot Website

## Product
Marketing website + local SEO for **Smith + Elliot — A Salon Collective**, a hair salon & chair-rental business opening Fall 2026 in historic downtown Delafield, WI.

## Goals (priority order)
1. **Attract clients** for Sara's own chair (cuts, color, balayage, blowouts).
2. **Recruit independent stylists** to rent 4 of 5 chairs (booth rental).
3. **Rank in Google** for "hair salon Delafield WI" and related Lake Country terms; support with a blog.

## Audiences
- Lake Country clients wanting a warm, unhurried, higher-end salon.
- Licensed stylists ready to go independent (booth rental).

## Scope (built)
- Static vanilla site: `index`, `about`, `services`, `contact`, `blog`, `privacy`; shared `styles.css` + `main.js`.
- Homepage-only chair-rental recruiting section (per client). No dedicated rental page.
- Contact = phone/email only (no booking form / no serverless). Call/text CTAs to (262) 893-2887.
- Brand: black + antique gold + warm cream, forest-green secondary; Cormorant Garamond + Jost; diamond ◆ motif; text wordmark (no logo file).
- Photo-light by client preference; only 3 client photos (building ×2 forms, sign). Blog uses Pexels.
- SEO: HairSalon/Organization + Service + Breadcrumb + AboutPage schema; full meta/OG/Twitter/canonical; sitemap + robots; `vercel.json` security headers/CSP.

## Client decisions locked
- Name styled "Smith + Elliot"; tagline "A Salon Collective" / "Your business, your way."
- No booking form (phone/email only). Chair rental = homepage section only.
- Host static → Vercel; point her Squarespace domain.
- **No "About Me" / personal founder-bio section** — About page is about the salon/collective, not Sara personally.

## Deployment
Vercel (static). ⚠️ No `Co-Authored-By` trailer on commits (Vercel Hobby blocks unknown co-authors). Point domain via DNS.

## Open items (confirm with Sara — see client-profile.md `[NEEDED]`)
- ~~Real domain~~ ✅ **Confirmed 2026-07-16:** `sesaloncollective.com` (registered via Squarespace; keep registration there, point DNS at Vercel).
- Business email — still a placeholder (`hello@sesaloncollective.com`); confirm the mailbox exists.
- ~~Exact street address~~ ✅ **Confirmed 2026-07-16:** 715 Genesee St, Delafield, WI 53018 (geo in schema).
- Hours of operation; confirm (262) 893-2887 as the public business line.
- FB / IG handles (icons live, links are placeholders). Social banner images to be created.
- Whether to publish chair-rental pricing/terms (currently "inquire only").

## SEO content workflow
`client-profile.md` (done) → keyword research CSV → blog post(s) via blog-generator process (Pexels images, Article + FAQ schema) → wire card into `blog.html` + URL into `sitemap.xml`.
