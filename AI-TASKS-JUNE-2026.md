# Chris Walker Insurance — Work Log & Open Tasks (June 2026)

**Branch:** `site-improvements-june-2026` — committed locally, **NOT pushed**; `main`/live untouched.
This file is the tidy successor to the original verbose task spec; completed step-by-step instructions
live in git history. Scope was **under-the-hood improvements, no redesign** (owner's call).

---

## ✅ Done this round
- **Images/performance:** every image is now a real `<picture>`/`<img>` with AVIF→WebP→JPEG fallback (the
  site had **zero** `<img>` — all CSS backgrounds). Hero preloaded + `fetchpriority="high"`, real `alt`
  everywhere, oversized JPEGs resized (the 277 KB mortgage thumbnail → 33 KB AVIF).
- **AEO/SEO:** `robots.txt` → clean allow-all; per-page `max-snippet`/`max-image-preview:large` robots meta;
  OG `site_name`/`locale`/image dims + Twitter cards + `theme-color`; `lang="en-CA"`. Sitemap: added
  `resources.html`, refreshed `lastmod`.
- **Schema:** FAQ JSON-LD now matches the visible accordion; `InsuranceAgency` gained `geo` + `priceRange`;
  insight pages got `BreadcrumbList` + visible breadcrumbs + Article `author.url` & `mainEntityOfPage`.
- **Accessibility:** `:focus-visible` rings, skip-to-content link, `<noscript>` reveal fallback.
- **Bugs fixed:** unclosed landing-grid `<div>` on quote-life, quote-savings, mortgage-protection,
  disability-insurance (contact block was a stray 3rd grid child); inline `onclick` email-copy →
  standardized button; logo `href="#"`→`/`; `100vh`→`100svh`; removed unused Playfair font + jank-y
  `background-attachment:fixed`.
- **Content:** About-Chris + Testimonials sections built, then **pinned** (see below). A cropped headshot
  of Chris is prepared (`chris-walker.{avif,webp,jpg}`, 260×325).

---

## ⏳ Open tasks — NEEDS THE OWNER
- [ ] **Cloudflare (highest impact — unblocks AEO on the live site):** dashboard → AI Audit / Bots →
      **disable Managed robots.txt** (it prepends its own block at the edge and blocks
      Google-Extended/GPTBot/CCBot/ClaudeBot regardless of the repo file). Then add an **apex → www 301**.
      Purge cache and re-fetch `/robots.txt` to confirm the Cloudflare block is gone.
- [ ] **NAP for schema:** street address, postal code, business hours → fill `InsuranceAgency.address` +
      add `openingHoursSpecification` (TODO comment is in `index.html` `<head>`). Must match the Google
      Business Profile exactly.
- [ ] **Footer reg #:** fill `Reg. #[NUMBER]` in the footer licence badge (sitewide), or delete that span.
- [ ] **About-Chris content:** bio text, year licensed, designations (photo is ready).
- [ ] **Testimonials:** real client quotes / Google reviews; then add `Review` + `aggregateRating` to the
      `InsuranceAgency` schema. Design still TBD.

## ⏸ Pinned (built, removed from page — restore from git history when ready)
- [ ] **About-Chris** and **Testimonials** homepage sections. Markup is in git history; `.about-chris-*`
      and `.testimonials-*` CSS kept dormant in `style.css`. On restore, set the Chris `<img>` to
      `width="260" height="325"`.

## 🗂 Deferred / optional (no owner input needed)
- [ ] **CSS de-dup:** duplicate `.btn-outline-accent` & `.article-hero`, heavy mobile `!important` —
      maintainability only; skipped to keep the review diff clean.
- [ ] **Landing-page strategy:** CLAUDE.md describes conversion-only LPs (no nav/footer, `/lp/` subpaths)
      that don't exist — decide build vs. update the doc.
- [ ] **`social-share.jpg` is 1200×1200** — a 1200×630 version previews better as a social link card.
- [ ] **Security headers** via Cloudflare (CSP after the inline-handler removal, Referrer-Policy, etc.).
- [ ] Insight Article `author.url` → `/#about-chris` is inert while About is pinned; reactivates on restore.

---

## 🔎 Discoveries & decisions (this overhaul)
- **`images/car.jpg` is the owner's PHOTO OF CHRIS** (lifestyle shot with his classic Oldsmobile), not
  junk — **do not delete.** It's the source for the cropped `chris-walker.*` headshot. `bike.jpg` and
  `guide-mockup.jpg` are still unused — confirm with the owner before deleting anything.
- **The long-standing robots.txt mystery was Cloudflare, not code.** Cloudflare's Managed robots.txt
  overrides the origin file at the edge, so no repo edit ever changed live behavior. Fix = the dashboard
  toggle above.
- The quote/landing pages shared a **pre-existing unclosed-`<div>`** bug (4 pages) — now fixed.
- Owner wants under-the-hood gains, not a redesign; was not sold on the testimonial section design.

## Go-live checklist
1. Fill the owner items above. 2. Merge `site-improvements-june-2026` → `main`, push (auto-deploys).
3. Cloudflare: disable Managed robots.txt + apex→www 301 + purge cache. 4. GSC: resubmit sitemap + run
the Rich Results Test (homepage + an insight page). 5. After any `style.css` change, bump the cache:
`v=$(date +%Y%m%d%H%M); sed -i "s/style\.css?v=[0-9]*/style.css?v=$v/g" *.html`
