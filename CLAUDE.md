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
- **Address:** 715 Genesee Street, Delafield, WI 53018 — ⚠️ **street name is a placeholder** (building number 715 is from the client photo; confirm the street with Sara).
- **Email:** hello@smithandelliot.com — ⚠️ placeholder, confirm.
- **Domain/canonical:** `https://smithandelliot.com` — ⚠️ placeholder. Sara bought a domain via Squarespace; confirm the real domain and find/replace across all files + schema + sitemap + robots.
- **Socials:** FB + IG exist but handles unknown — icons currently point to generic `facebook.com` / `instagram.com`. ⚠️ Update `href`s and schema `sameAs` when handles arrive. Banner-style social images to be created later.
- **Hours:** "By appointment · Opening Fall 2026" placeholder — confirm real hours.

Sara's own service pricing (other stylists set their own): Women's Cut $55 · Men's Cut $45 · Single-Process Color from $80 · Foils from $50 · Balayage from $135 · Toner from $30 · Blowout from $40 · Deep Conditioning from $20.

## Photos on hand (only 3 client images)

- `photos/salon-building-delafield.jpg` — the real 1800s cream-city-brick building (#715). Hero + About + The Space.
- `photos/smith-elliot-salon-sign.jpg` — the black & gold sign design. About teaser.
- `photos/chair-rental-banner-delafield.jpg` — Sara's pre-made "Chair Rentals Now Leasing" banner (has baked-in text; kept as a social asset, not embedded on-site). Interior render only — no real interior photos exist yet (space under remodel).

No stock people photos by client preference. Blog posts use Pexels images.

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
