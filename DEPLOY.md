# Deploying Smith + Elliot → Vercel

Domain: **sesaloncollective.com** (registered via Squarespace)
Repo: **https://github.com/pnerbun/s_and_e** (branch `main`)

## Why not host on Squarespace?

You can't. Squarespace is a closed CMS — there's no way to upload a custom static site. Code Injection only bolts scripts onto *their* templates; it can't host our HTML/CSS/JS, our page structure, or the JSON-LD schema. Using Squarespace means rebuilding from scratch in their editor and throwing away the custom design + SEO work.

## Do NOT transfer the domain registrar

Hosting on Vercel does **not** require moving the registration. Keep it registered at Squarespace and just point its DNS at Vercel — free, reversible, done in minutes.

Also, a registrar transfer isn't even possible right now: **ICANN locks newly registered domains for 60 days.**

---

## Starting state (verified 2026-07-16)

The domain is already live and serving Squarespace:

```
$ dig +short sesaloncollective.com A
198.49.23.144    198.185.159.145    198.185.159.144    198.49.23.145   # Squarespace

$ dig +short sesaloncollective.com NS
nsc1–nsc4.squarespacedns.com
```

Those A records must be replaced with Vercel's.

---

## Step 1 — Deploy the site to Vercel

1. Go to **vercel.com** → sign in **with GitHub**.
2. **Add New… → Project** → **Import** `pnerbun/s_and_e`.
3. Settings for this repo (it's a no-build static site):
   - **Framework Preset:** `Other`
   - **Build Command:** leave empty
   - **Output Directory:** leave default (repo root)
   - **Install Command:** leave empty
4. **Deploy.** You'll get a URL like `s-and-e.vercel.app`.
5. **Test that URL thoroughly before touching DNS** — every page, the mobile menu, the map embed. `vercel.json` applies the CSP + security headers here, so this is the first time the site runs under the real CSP.

## Step 2 — Free the domain from Squarespace

In Squarespace: **Settings → Domains → sesaloncollective.com**

- If it's connected to a Squarespace site/trial, **disconnect** it. Otherwise Squarespace keeps managing (and resetting) the records.
- ⚠️ **Check billing before cancelling anything.** Squarespace's "free domain" is usually tied to an annual plan — cancelling the plan can forfeit the free domain or force you to pay for it separately. Confirm what the ~$250 actually bought (plan vs. domain) before cancelling the website subscription.

## Step 3 — Add the domain in Vercel

Project → **Settings → Domains → Add Domain** → `sesaloncollective.com`
(Vercel will prompt to add `www.sesaloncollective.com` too — accept it.)

Vercel then shows the **exact records to create**. As of 2026-07-16 the dashboard gives:

| Type | Name | Value |
|---|---|---|
| `A` | `@` | `216.198.79.1` |
| `CNAME` | `www` | *(read it off the `www.sesaloncollective.com` row → DNS Records tab — it's project-unique)* |

> **Use the values Vercel shows you — do not copy them from a blog post.**
> Vercel's own dashboard notes: *"As part of a planned IP range expansion… the old records of
> `cname.vercel-dns.com` and `76.76.21.21` will continue to work but we recommend you use the
> new ones."* That's why the apex is now `216.198.79.1` and the `www` CNAME is project-unique.

### ⚠️ Set the APEX as primary (not www)

By default Vercel makes `www` primary and 308-redirects the apex to it. **This site is
entirely non-www** — every canonical, `sitemap.xml`, `robots.txt`, and the JSON-LD `url`
fields all declare `https://sesaloncollective.com/` (0 `www` references). Leaving Vercel's
default means every canonical points at a URL that redirects → mixed indexing signals.

Fix it on the Domains page **before** DNS propagates:
1. **Edit** `sesaloncollective.com` → set **No Redirect** (serve Production).
2. **Edit** `www.sesaloncollective.com` → **Redirect to** `sesaloncollective.com` (308).

Result: `www` → apex, apex serves the site, canonicals match reality.

## Step 4 — Point DNS at Vercel (in Squarespace)

Squarespace: **Settings → Domains → sesaloncollective.com → DNS Settings**

1. **Delete the entire "Squarespace Defaults" preset** (trash icon on the preset card).
   That removes all of it in one action:
   - 4 × `A` on `@` → `198.185.159.144/145`, `198.49.23.144/145`
   - `CNAME` on `www` → `ext-sq.squarespace.com`
   - `HTTPS` on `@` → **← the one everyone misses**

   > ⚠️ **The `HTTPS` (SVCB) record must go too.** It pins the Squarespace IPs via `ipv4hint`:
   > ```
   > $ dig +short sesaloncollective.com HTTPS
   > 198.185.159.145  198.185.159.144  198.49.23.145  198.49.23.144
   > ```
   > Delete the A records but leave this one and modern browsers can still use the hint to
   > reach Squarespace — producing intermittent "works for me, not for her" behaviour that's
   > painful to diagnose.

2. **Add** an `A` record: host `@` → *the IP Vercel showed you*.
3. **Add** a `CNAME` record: host `www` → *the unique target Vercel showed you*.
4. **Leave the nameservers on `squarespacedns.com`.**

> ❌ **Do not CNAME `www` to `s-and-e.vercel.app`.** Vercel doesn't support pointing a custom
> domain at a `.vercel.app` alias — it breaks cert provisioning and routing. The `.vercel.app`
> hostname is only the deployment alias. Use the project-unique target from the dashboard
> (e.g. `d1d4fc829fe7bc7c.vercel-dns-017.com`).

> **Why keep Squarespace's nameservers?** Delegating to Vercel's nameservers moves *all*
> DNS to Vercel — you'd have to manually re-create every other record. If email
> (MX records) is ever set up on this domain, switching nameservers without copying
> them over silently breaks mail. The A/CNAME method is lower risk and reversible.

## Step 5 — Verify

- Propagation is usually minutes, but allow up to 48h.
- Vercel auto-provisions the SSL cert (Let's Encrypt) once DNS resolves — no action needed.
- Check:
  ```bash
  dig +short sesaloncollective.com A        # should be Vercel's IP, not 198.185.x
  dig +short www.sesaloncollective.com      # should be the Vercel CNAME
  curl -sI https://sesaloncollective.com | head -1   # HTTP/2 200
  ```
- In Vercel → Domains, set the **primary** domain and let the other redirect to it (apex ↔ www).

## Step 6 — After it's live

- **Google Search Console:** verify the domain, submit `https://sesaloncollective.com/sitemap.xml`.
- **Google Business Profile:** create the listing. Match the NAP exactly to the site
  (Smith + Elliot / 715 Genesee Street, Delafield, WI 53018 / (262) 893-2887).
  If the profile ends up using "Genesee St", match that spelling on the site.
- Remaining placeholders to replace: **Facebook handle**, **business email**, **hours**.

---

## Ongoing deploys

Vercel auto-deploys on every push to `main`. No CLI needed.

> ⚠️ **Never add a `Co-Authored-By` trailer to commits in this repo.** Vercel Hobby blocks
> deploys when a commit has an unrecognized co-author email. For the same reason, don't
> deploy with `vercel --prod` (it reads git metadata) — use the dashboard/GitHub integration.
