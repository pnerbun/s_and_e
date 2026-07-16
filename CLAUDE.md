# CLAUDE.md — Smith + Elliot

Guidance for Claude Code when working in this project. See the repo-root `CLAUDE.md` for shared infrastructure and the SEO workflow.

## What this is

Marketing website for **Smith + Elliot — A Salon Collective**, a boutique hair salon and chair-rental collective opening Fall 2026 in historic downtown Delafield, WI. Owner/founder: **Sara Nickols** (transitioning her styling business from Milwaukee). The site serves **two audiences**: prospective clients, and independent stylists who might rent one of the 4 available chairs (each renter is a separate business that sets its own prices).

Built to mirror the `MakeupAndHairbyAndreina/` pattern: vanilla HTML/CSS/JS, no build step, shared `styles.css` + `main.js`, per-page nav/footer copy-pasted, deployed to Vercel.

## Stack & structure

- **Vanilla HTML/CSS/JS** — no framework, no build.
- Shared `styles.css` (design tokens in `:root`) linked from every page; shared `main.js` (fade-up observer, scroll nav, mobile menu).
- Pages: `index.html`, `about.html`, `services.html`, `contact.html`, `blog.html`, `privacy.html`; posts in `blog/<slug>.html`.
- Images in `photos/` — **lowercase, descriptive, hyphenated filenames**. Optimize with `sips` (JPG ~82 quality, ≤1500px) before committing.

## Design system

| Token | Hex | Use |
|---|---|---|
| `--black` | #1A1714 | Nav, footer, dark sections (matches the black & gold sign) |
| `--gold` | #B8945A | Accents, rules, the diamond ◆ motif |
| `--gold-deep` | #927039 | Gold text on light backgrounds (contrast) |
| `--forest` | #2C4034 | Secondary dark sections |
| `--navy` | #1E2A44 | Tertiary accent |
| `--cream` / `--cream-alt` | #F5EFE6 / #EDE4D6 | Page + alternating backgrounds |

- **Fonts:** Cormorant Garamond (display/serif, matches the sign) + Jost (body/UI).
- **Brand motif:** the gold diamond divider (`.diamond-rule` with a rotated `.dot`) — carried from the physical sign and banner.
- **Wordmark:** text-based `Smith + Elliot` with a gold `+` (`.wordmark`). No logo file yet.
- Tagline: **"Your business, your way."** Descriptor: **"A Salon Collective."**

## Client facts

- **Phone:** (262) 893-2887 — call/text to book or inquire about chairs (`tel:+12628932887`).
- **Address:** 715 Genesee Street, Delafield, WI 53018 — ✅ **confirmed by client** (2026-07-16). Geocodes to `43.061377, -88.404404`; that geo + `hasMap` is in the `HairSalon` schema on `index.html` and `contact.html`. Displayed as "Genesee Street" spelled out — if Sara's Google Business Profile ends up using "Genesee St", match it exactly for NAP consistency.
- **Email:** hello@sesaloncollective.com — ⚠️ **still a placeholder** (updated to match the real domain, but the mailbox may not exist yet — confirm with Sara before launch).
- **Domain/canonical:** `https://sesaloncollective.com` — ✅ **confirmed** (registered via Squarespace, 2026-07-16). Applied across canonicals, OG/Twitter, JSON-LD, `sitemap.xml`, `robots.txt`.
  - **Hosting plan:** stays registered at Squarespace; DNS points at Vercel. Do **not** transfer the registrar — newly registered domains are ICANN-locked for 60 days, and a transfer isn't needed to host on Vercel.
- **Socials:** Instagram is live — `https://www.instagram.com/smithandelliot_saloncollective/` (wired into nav, all footers, and the `sameAs` arrays in the HairSalon + Organization schema). ⚠️ **Facebook handle still unknown** — the FB icons still point to generic `facebook.com`; update those `href`s and both schema `sameAs` arrays when it arrives. Banner-style social images to be created later.
- **Hours:** "By appointment · Opening Fall 2026" placeholder — confirm real hours.

Sara's own service pricing (other stylists set their own): Women's Cut $55 · Men's Cut $45 · Single-Process Color from $80 · Foils from $50 · Balayage from $135 · Toner from $30 · Blowout from $40 · Deep Conditioning from $20.

## Photos on hand (client-supplied only)

Originals keep their given names; web-ready derivatives are lowercase + descriptive. **Always lowercase** — git/Vercel are case-sensitive (both `flower.PNG` and `new_landing.PNG` arrived uppercase and were renamed).

| File | Source | Used |
|---|---|---|
| `salon-building-delafield.jpg` | `bldg.png` | Desktop hero + About + The Space. The real 1800s cream-city-brick building (#715). |
| `smith-elliot-salon-sign.jpg` | `bldg_signage.jpg` | Our Story teaser — **desktop only** (`.about-teaser-img` is hidden ≤640px). |
| `chair-rentals-now-leasing.jpg` | `new_landing.png` | **Mobile hero** (≤640px). Clean banner — wordmark + "Chair Rentals Now Leasing" over the interior render, no baked-in phone/CTA. |
| `botanical-motif-gold.png` | `flower.png` | Decorative flourish, used twice on the homepage: behind Our Story (`.botanical-watermark`, **26%** + `brightness(0.78)` to deepen the gold against cream) and bottom-right of the forest Now Leasing section (`.botanical-chairs`, **30%** + `brightness(1.15)` to lift it against dark green, mirrored via `scaleX(-1)`). Transparent, tinted `--gold`, generated by stripping the white bg (alpha = inverted luminance) and auto-cropping — so it drops onto light *or* dark sections, tuned per background with a CSS `filter` rather than shipping a second asset. Decorative only: empty `alt` + `aria-hidden`. |
| `chair-rental-banner-delafield.jpg` | `landing.png` | **Superseded** by the above; older banner with baked-in phone + bullets. Social asset only. |

The interior shots are renders — no real interior photos exist yet (space under remodel). No stock people photos by client preference. Blog posts use Pexels images.

## Local preview

```bash
cd "Smith+Elliot" && python3 -m http.server 8765   # or: python3 ../serve.py
# http://localhost:8765
```

## Deployment (Vercel)

- Static site → Vercel; point Sara's domain via DNS. `vercel.json` sets CSP + security headers (allows Google Fonts, Pexels images, Google Maps embed).
- **Gotcha (same as GlamourByCL):** Vercel Hobby blocks deploys with unrecognized git co-author emails. For this project's commits, **do NOT add a `Co-Authored-By` trailer**, and don't use `vercel --prod` (reads git metadata). Deploy via dashboard/GitHub integration or a token-based deploy script.

## SEO

- Follows repo-root `on-page-seo.md`. Home carries `HairSalon` (LocalBusiness) + `Organization` JSON-LD; services has `Service`/`OfferCatalog`; every page has BreadcrumbList + full meta/OG/Twitter/canonical.
- Primary keyword: **hair salon Delafield WI**; recruiting secondary: **salon chair rental Delafield**.
- Blog workflow: `keyword-research` → `blog-generator` agents (read `client-profile.md` + the five writing-style frameworks). Add each post's card to `blog.html` (template in `#posts`) and a `<url>` to `sitemap.xml`.
