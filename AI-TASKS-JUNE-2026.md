# AI Implementation Tasks — June 2026 (Chris Walker Insurance)

These are executable instructions for an AI coding agent. Work top-to-bottom; tasks are ordered by
priority and dependency. Each task is self-contained: goal, files, exact steps, and acceptance criteria.

> Derived from the full-site audit. Where a task needs a real-world fact (address, licence number,
> hours, testimonials), it is marked **🛑 NEEDS OWNER INPUT** — do not invent it.

---

## EXECUTION STATUS — updated 2026-06-01
**Phase 1 executed in-repo this session (verified):**
- ✅ T1 robots.txt set to clean **allow-all (maximum AEO)** + page-level `max-snippet`/`max-image-preview`
  meta on all 16 indexable pages (404 = noindex) — **but the live unblock still needs the Cloudflare step (see T1).**
- ✅ T2 FAQ schema rebuilt to match the 6 visible accordions (JSON validated; schema↔page = 6/6).
- ✅ T3 sitemap: `resources.html` added; HTML `lastmod` → 2026-06-01 (PDFs unchanged); XML valid.
- ✅ T5 Playfair font removed from all 8 insight pages.
- ✅ T6 homepage logo `href="#"` → `/`.
- ✅ T7 focus-visible + skip-link CSS added; skip link + `id="main-content"` added to all 16 `<main>` pages.
- ✅ T8 `<noscript>` reveal-fallback added to all 17 pages.
- ✅ Cache version bumped sitewide; homepage rendered in preview with no console errors and no visual regression.

**Phase 2–4 executed this session (verified in preview — every image loads as AVIF, all JSON-LD valid, all pages structurally balanced, console clean):**
- ✅ T9 image pipeline: generated resized AVIF+WebP+JPEG for hero + 7 thumbnails + 7 feature images;
  swapped ALL CSS-background images to real `<picture>`/`<img>` (20 `<picture>`, 21 `<img>` sitewide, was 0);
  hero is a real AVIF `<img>` with preload + `fetchpriority="high"`; thumbnails `loading="lazy"`; real `alt`
  text everywhere; fixed the 277 KB thumbnail (→33 KB AVIF). Hero/feature/thumb all confirmed serving AVIF.
- ✅ T12 breadcrumbs (visible nav + `BreadcrumbList` JSON-LD) + Article schema enriched (`author.url`,
  `mainEntityOfPage`) on all 7 insight pages.
- ✅ T4 InsuranceAgency schema: added real `geo` coords + `priceRange`; TODO comment for owner NAP/hours.
- ✅ T10 About-Chris section + T11 Testimonials section scaffolded on the homepage with clearly-labelled
  placeholders (6 placeholder markers, 3 TODO comments). No fabricated facts/reviews.
- ✅ T13 quote-life **and** quote-savings grid bug fixed — PLUS the same pre-existing bug found and fixed on
  disability-insurance.html and mortgage-protection.html (4 landing pages total now balanced).
- ✅ T14 inline `onclick` email-copy → standardized `.contact-copy-email` button on all 13 pages.
- ✅ T15 hero `100vh`→`100svh`. ✅ T16 og:site_name/locale/image dims + `twitter:card` + `theme-color` + `lang=en-CA` sitewide. ✅ T17 removed Tally embed.js from 404 + removed `background-attachment:fixed`.

**Deferred (low value / risk):** T19 CSS de-dup (backlog/maintainability — skipped to keep the diff safe for live comparison).
**Owner actions still required:** T1 Cloudflare Managed-robots toggle + apex→www 301; fill placeholders in
T4 (address/postal/hours), T10 (headshot/bio/licence #/year/designations), T11 (real testimonials).
Note `social-share.jpg` is 1200×1200 — a 1200×630 version would render better as a link-preview card.

**Everything is in the working tree, NOT committed** (commit/push on owner's go-ahead → then purge Cloudflare + resubmit sitemap in GSC + run Rich Results Test).

---

## GLOBAL RULES (read before any task)

1. **Never fabricate facts.** Do NOT invent licence numbers, a street address, postal code, business
   hours, testimonials, reviews, star ratings, designations, statistics, or dates. Use a clearly-marked
   `<<PLACEHOLDER>>` token and flag it for the owner. This is a YMYL (financial) site — fabrication is a
   hard failure.
2. **Preserve all tracking.** Never remove or reorder the GTM/`gtag.js` snippet or the Tally script
   (except where a task explicitly scopes Tally loading).
3. **No git worktrees.** Use `git checkout`/`git switch` only (per CLAUDE.md).
4. **After any `style.css` change, bump the cache version across all HTML.** This machine is Linux/fish,
   so the PowerShell script won't run. Use this portable equivalent from the repo root:
   ```sh
   v=$(date +%Y%m%d%H%M); sed -i "s/style\.css?v=[0-9]*/style.css?v=$v/g" *.html
   ```
5. **Stay on the "Premium Light" design tokens** (CSS variables in `:root`, `style.css:4-40`). No new
   dark blocks, no generic blue/red. Match existing spacing/radius conventions.
6. **Do not change canonical URLs, file names, or URL structure** unless a task says so — it breaks SEO.
7. **Verify before declaring done.** Run the previewer, check the console, and validate schema with the
   Rich Results Test where relevant. Don't ask the owner to check manually.
8. Commit per task (or per phase) with a clear message. Do not push unless asked.

---

# PHASE 1 — Quick wins (low effort, high value, mostly independent)

## T1 — Fix `robots.txt` so AI answer engines can read the site  ✅ REPO DONE / ⛔ CLOUDFLARE STILL REQUIRED
**Priority:** P0 · **File:** `robots.txt` + **Cloudflare dashboard** · **Depends on:** none

### ⚠️ ROOT CAUSE (why repo edits never worked — confirmed 2026-06-01 against the live site)
The live `robots.txt` is **NOT** the repo file. Cloudflare's **Managed robots.txt** (Sept-2025 *Content
Signals Policy*) is enabled and **prepends** its own block at the edge. Fetched live, the www file is:
Cloudflare managed block (lines 1–59: `Content-Signal: search=yes,ai-train=no` + `Disallow: /` for
Amazonbot, Applebot-Extended, Bytespider, **CCBot, ClaudeBot, Google-Extended, GPTBot**, meta-externalagent)
**then** the repo file appended. The apex serves ONLY the managed block (no Sitemap line).
Result: two `User-agent: *` groups, and Google-Extended/GPTBot/CCBot/ClaudeBot are blocked by Cloudflare
**regardless of the repo file** — so no code-only change fixes it. **The real fix is in Cloudflare.**

### 🛑 OWNER ACTION — Cloudflare dashboard (this is the actual unblock)
In the `chriswalkerinsurance.ca` zone: **AI Audit / Bots → Manage robots.txt** (and/or **Scrape Shield →
Content Signals**) → either **disable Managed robots.txt** entirely so Cloudflare serves only the origin
file (recommended — makes the repo file below authoritative), **or** edit the managed signals to allow AI
answer engines (`ai-input=yes`, remove the `Google-Extended` disallow). Then purge cache and re-fetch
`https://www.chriswalkerinsurance.ca/robots.txt` to confirm the managed block is gone. Also add a 301
redirect apex → www (canonicals are all www; apex currently serves a different robots.txt).

### Repo file (DONE) — maximum-AEO posture; authoritative once Managed robots.txt is off
Per owner direction ("best practices + maximum Google AEO compatibility, whatever the case"), the file is
now **clean allow-all** — every crawler welcome, including Google-Extended and all answer engines. No
training-crawler `Disallow` groups (avoids duplicate-group ambiguity; being in LLM training data also aids
brand-level AEO). The effective directives are:
```
User-agent: *
Allow: /

Sitemap: https://www.chriswalkerinsurance.ca/sitemap.xml
```
(The live file ships with a documentation header listing the welcomed engines + the Cloudflare warning.)
To re-enable training-crawler blocking later, add `User-agent: GPTBot|ClaudeBot|CCBot` / `Disallow: /`
groups — this has **zero** Google-AEO cost (Google AEO depends only on Googlebot + Google-Extended).

### T1b — Page-level AEO snippet signal (DONE)
Added to every indexable page's `<head>` (16 pages):
`<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">`
— lets Google use full-length text snippets and large image previews in AI Overviews / rich results
(previously unset → Google used conservative defaults). `404.html` set to `noindex, follow`.

### Acceptance criteria
- [x] Repo `robots.txt` = clean allow-all + Sitemap; Google-Extended NOT disallowed; legacy tokens gone.
- [x] `max-snippet`/`max-image-preview:large` meta on all 16 indexable pages; 404 noindex.
- [ ] **Owner:** disable Cloudflare Managed robots.txt (the live override) + purge cache + re-fetch to confirm.
- [ ] **Owner:** 301 apex → www so a single robots.txt/host serves.

---

## T2 — Make the homepage FAQ schema match the visible FAQ
**Priority:** P1 · **File:** `index.html` · **Depends on:** none

### Goal
The `FAQPage` JSON-LD (`index.html:95-142`) lists 5 questions that are NOT on the page; the visible
accordion (`index.html:574-614`) has 6 different ones. Google requires schema to match visible content.

### Do this
Replace the entire second `<script type="application/ld+json">` block (the `FAQPage` one) with the
following, which mirrors the six visible accordions verbatim:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much do your services cost? Do you charge broker fees?",
      "acceptedAnswer": { "@type": "Answer", "text": "My advisory and broker services are 100% free to you. Independent brokers are compensated directly by the insurance carriers through standard industry commissions. You pay the exact same premium whether you use a broker or buy directly from a carrier, but with me, you get personalized, unbiased comparison shopping and dedicated lifetime support at no extra cost." }
    },
    {
      "@type": "Question",
      "name": "I have insurance through my employer benefits. Isn't that enough?",
      "acceptedAnswer": { "@type": "Answer", "text": "Group benefits are a fantastic perk, but relying on them alone carries substantial risk. First, group coverage is not portable: if you change careers, get laid off, or retire, your protection ends immediately, and buying a personal policy when you are older or have new health issues will cost significantly more. Second, group policies typically only cover 1x to 2x your annual salary, which is rarely enough to clear a mortgage or sustain a family's lifestyle over the long term." }
    },
    {
      "@type": "Question",
      "name": "Am I locked into a long-term contract? Can I cancel or change my policy?",
      "acceptedAnswer": { "@type": "Answer", "text": "No, you remain in complete control. Personal life and health insurance policies are highly flexible and have no lock-in contracts or exit penalties. You can cancel, reduce, or convert your coverage at any time without fees or questions asked. If your financial situation or budget changes, we can easily downsize your coverage to match your new reality." }
    },
    {
      "@type": "Question",
      "name": "Why use an independent broker instead of going directly to a carrier?",
      "acceptedAnswer": { "@type": "Answer", "text": "An independent broker represents you, not the insurance company. If you go directly to a single carrier, you will only see their products and prices. As a broker, I compare rates and policies across all of Canada's top-rated carriers (such as Manulife, Sun Life, Canada Life, iA Financial, and Equitable Life) to find the absolute best value and underwriting fit for your specific background." }
    },
    {
      "@type": "Question",
      "name": "Why is bank mortgage insurance considered a poor choice?",
      "acceptedAnswer": { "@type": "Answer", "text": "Bank mortgage insurance only protects the bank's loan, not your family. The benefit decreases as you pay down your mortgage, but your premiums stay exactly the same. Plus, bank policies are tied to your specific lender, meaning you lose coverage if you switch banks. Personal mortgage protection pays a fixed tax-free cash benefit directly to your family, stays level, and moves with you if you refinance or switch lenders." }
    },
    {
      "@type": "Question",
      "name": "Can I get coverage if I have pre-existing health conditions?",
      "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Access to specialty underwriting is one of the biggest advantages of working with an independent broker. Even if you've been declined by a bank or a single carrier in the past, we work with specialized providers to secure coverage—often through no-medical or simplified-issue plans that require zero exams, needles, or doctor reports." }
    }
  ]
}
</script>
```

### Acceptance criteria
- [ ] Every `name` in the schema exactly matches an on-page `<summary class="faq-question">`.
- [ ] Every `text` matches the corresponding `.faq-answer` paragraph (links/markup stripped).
- [ ] Rich Results Test parses it with no errors.

---

## T3 — Fix `sitemap.xml` (missing page + stale dates)
**Priority:** P1 · **File:** `sitemap.xml` · **Depends on:** none

### Do this
1. Add `resources.html` (currently absent). Insert before the `privacy.html` entry:
   ```xml
   <url>
     <loc>https://www.chriswalkerinsurance.ca/resources.html</loc>
     <lastmod>2026-06-01</lastmod>
     <changefreq>monthly</changefreq>
     <priority>0.6</priority>
   </url>
   ```
2. Update `<lastmod>` to today's date (`2026-06-01`) on `/` and on any page modified by these tasks.
3. Leave PDF entries as-is.

### Acceptance criteria
- [ ] `grep -c resources.html sitemap.xml` returns ≥ 1.
- [ ] XML is valid (no blank `<loc>`).
- [ ] Owner reminder emitted: resubmit sitemap in GSC after deploy (not automatic).

---

## T4 — Complete the `InsuranceAgency` schema (local SEO)
**Priority:** P1 · **File:** `index.html` (first JSON-LD block, ~`:22-92`) · **Depends on:** none

### Do this
Within the `InsuranceAgency` object, upgrade `address` and add `geo`, `openingHoursSpecification`,
`priceRange`. Use this shape (keep existing keys like `telephone`, `email`, `areaServed`, `sameAs`):
```json
"address": {
  "@type": "PostalAddress",
  "streetAddress": "<<STREET ADDRESS>>",
  "addressLocality": "Abbotsford",
  "addressRegion": "BC",
  "postalCode": "<<POSTAL CODE>>",
  "addressCountry": "CA"
},
"geo": { "@type": "GeoCoordinates", "latitude": 49.0514355, "longitude": -122.319642 },
"openingHoursSpecification": [
  { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "<<HH:MM>>", "closes": "<<HH:MM>>" }
],
"priceRange": "Free consultation"
```

### 🛑 NEEDS OWNER INPUT
`streetAddress`, `postalCode`, and `opens`/`closes` hours. These must exactly match the Google Business
Profile for NAP consistency. Do NOT guess. The `geo` coordinates are already known (from the Maps link)
and are safe to use.

### Acceptance criteria
- [ ] No `<<PLACEHOLDER>>` tokens remain before deploy (block the task on owner input).
- [ ] NAP matches Google Business Profile verbatim.
- [ ] Rich Results Test shows a valid LocalBusiness/InsuranceAgency item.

---

## T5 — Remove the unused Playfair Display font
**Priority:** P2 · **Files:** 8 insight pages · **Depends on:** none

### Do this
On every page whose Google Fonts `<link href>` contains `Playfair+Display`, remove only that family
segment. Target pages: `archive-insights.html`, `edge-benefits.html`, `insight-bc-probate.html`,
`insight-disability.html`, `insight-fhsa.html`, `insight-flood.html`, `insight-life.html`,
`insight-mortgage.html`.

Change `…Lora:ital,wght@0,400;0,600;1,400&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Outfit…`
→ `…Lora:ital,wght@0,400;0,600;1,400&family=Outfit…` (delete the `Playfair+Display:…&` chunk).

### Acceptance criteria
- [ ] `grep -l Playfair *.html` returns nothing.
- [ ] Visual diff: no rendering change (Playfair was never applied in CSS).

---

## T6 — Fix the homepage logo link
**Priority:** P2 · **File:** `index.html:168` · **Depends on:** none

Change `<a href="#" class="logo">` → `<a href="/" class="logo">` (matches every other page; stops the
URL picking up a bare `#`).

### Acceptance criteria
- [ ] Homepage logo navigates to `/`, not `#`.

---

## T7 — Add keyboard focus styling + skip link (accessibility)
**Priority:** P1 · **Files:** `style.css`, all page `<body>` tops · **Depends on:** none

### Do this
1. Add to `style.css` (then run the version bump from Global Rule 4):
   ```css
   /* Visible keyboard focus (WCAG 2.4.7) */
   a:focus-visible,
   button:focus-visible,
   summary:focus-visible,
   .btn:focus-visible,
   input:focus-visible,
   textarea:focus-visible,
   [tabindex]:focus-visible {
     outline: 3px solid var(--color-accent);
     outline-offset: 2px;
     border-radius: 4px;
   }
   /* Skip link */
   .skip-link {
     position: absolute; left: -9999px; top: 0; z-index: 3000;
     background: var(--color-primary); color: #fff;
     padding: 0.75rem 1.25rem; border-radius: 0 0 8px 0; font-family: var(--font-display);
   }
   .skip-link:focus { left: 0; }
   ```
2. As the first child of `<body>` on every page, add:
   `<a href="#main-content" class="skip-link">Skip to content</a>`
3. Add `id="main-content"` to the `<main>` element on every page.

### Acceptance criteria
- [ ] Tabbing shows a visible gold focus ring on links/buttons/cards.
- [ ] First Tab on each page reveals the skip link; activating it jumps to `<main>`.

---

## T8 — Add a no-JS fallback so content isn't hidden
**Priority:** P1 · **Files:** every page using `.reveal` (head) · **Depends on:** none

### Why
`.reveal { opacity:0; visibility:hidden }` hides most homepage sections until the IntersectionObserver
runs. No-JS clients and some non-rendering fetchers see blank sections.

### Do this
Add inside `<head>` (after the stylesheet link) on every page that uses `class="reveal"`:
```html
<noscript><style>.reveal{opacity:1!important;visibility:visible!important;transform:none!important;}</style></noscript>
```

### Acceptance criteria
- [ ] With JS disabled, all sections render fully.
- [ ] With JS enabled, scroll animations still play (unchanged).

---

# PHASE 2 — The real performance lift

## T9 — Replace CSS-background images with real, modern `<img>`
**Priority:** P0 · **Files:** `index.html`, all `insight-*.html`, `style.css`, `images/` · **Depends on:** none

### Why
There is not one `<img>` on the site. The hero (LCP) and all thumbnails/feature images are CSS
backgrounds → slow LCP, no `alt`, no `srcset`, no AVIF/WebP, and 7 images exceed 100KB
(`insight-mortgage-thumb.jpg` is 277KB but renders ~160px tall).

### Step 9a — Generate modern formats + right-sized assets
Use whatever is installed (ImageMagick 7, `cwebp`/`avifenc`, or `npx sharp-cli`). Example with
ImageMagick + libwebp/libaom:
```sh
cd images
# Right-size oversized thumbnails first (cards display ≤ ~800px wide @2x)
for f in insight-*-thumb.jpg; do magick "$f" -resize 800x\> -strip -quality 82 "$f"; done
# Hero target ~1920px wide
magick hero-bg.jpg -resize 1920x\> -strip -quality 82 hero-bg.jpg
# Emit WebP + AVIF beside each JPEG
for f in *.jpg; do
  cwebp -q 78 "$f" -o "${f%.jpg}.webp"
  avifenc --min 24 --max 34 "$f" "${f%.jpg}.avif"
done
```
Target: every thumbnail < 40KB, hero < 120KB AVIF.

### Step 9b — Convert insight thumbnails + article feature images to `<picture>`
Replace each `<div class="insight-image insight-image-*"></div>` and each article
`<div class="article-feature-image" style="background-image:…">` with semantic `<picture>`:
```html
<picture>
  <source type="image/avif" srcset="images/insight-fhsa-thumb.avif">
  <source type="image/webp" srcset="images/insight-fhsa-thumb.webp">
  <img src="images/insight-fhsa-thumb.jpg" alt="<<DESCRIPTIVE ALT>>"
       width="800" height="450" loading="lazy" decoding="async" class="insight-image">
</picture>
```
- Article feature images: same pattern but `loading="eager"` `fetchpriority="high"` (above the fold).
- Update `style.css`: change `.insight-image`/`.article-feature-image` rules from
  `background-size/position` to `img { width:100%; height:100%; object-fit:cover; }`. Remove the now-dead
  `.insight-image-*` background-image rules (`style.css:1576-1598`).
- Provide real, descriptive `alt` per image (e.g. "First Home Savings Account guide thumbnail").

### Step 9c — Hero LCP
Preferred: render the hero photo as a real `<img>` layered under the overlay (absolute-positioned,
`object-fit:cover`, `fetchpriority="high"`), and keep only the gradient in CSS. Then preload it in `<head>`:
```html
<link rel="preload" as="image" href="images/hero-bg.avif" type="image/avif" fetchpriority="high">
```
Acceptable fallback if you keep it as a background: use `image-set()` with AVIF/WebP and still add the
preload above.

### Acceptance criteria
- [ ] `grep -r '<img' index.html insight-*.html` finds the new images.
- [ ] Every content image has meaningful `alt`, explicit `width`/`height`, and below-fold ones use `loading="lazy"`.
- [ ] AVIF/WebP served via `<picture>`; JPEG only as fallback.
- [ ] Lighthouse mobile: LCP element is the hero `<img>`, LCP improved vs baseline, CLS ≈ 0.
- [ ] Version bump run after the CSS edits.

---

# PHASE 3 — Trust / E-E-A-T content (biggest conversion lever)

## T10 — Build an "About Chris" section/block with credibility signals
**Priority:** P0 · **Files:** `index.html` (new `#about` content) + optionally a new `about.html` · **Depends on:** T9 (image pipeline)

### Why
YMYL insurance site with no human proof: no photo, bio, licence number, or designations. Google E-E-A-T
and prospect trust both suffer.

### Do this
Build a section with: a real headshot (`<picture>` per T9), a short first-person bio, years licensed,
**Insurance Council of BC registration number**, professional designations, and association memberships.
Use the existing card/typography tokens. Scaffold:
```html
<section id="about-chris" class="section-padding">
  <div class="container about-chris-grid">
    <picture><!-- headshot --></picture>
    <div>
      <p class="about-eyebrow">Meet Your Broker</p>
      <h2 class="section-title">Chris Walker</h2>
      <p><<BIO — owner supplied>></p>
      <ul class="about-credentials">
        <li>Licensed in BC since <<YEAR>></li>
        <li>Insurance Council of BC Reg. # <<NUMBER>></li>
        <li><<DESIGNATIONS — e.g. CLU, CHS>></li>
      </ul>
    </div>
  </div>
</section>
```

### 🛑 NEEDS OWNER INPUT
Headshot image, bio text, year licensed, Insurance Council of BC registration number, designations.
**Do not invent any of these.** Block the task until supplied.

### Acceptance criteria
- [ ] Real headshot rendered via `<picture>` with `alt="Chris Walker, insurance broker"`.
- [ ] No placeholder tokens remain.
- [ ] After this ships, update `Article` `author` to reference this entity (T12).

---

## T11 — Add a testimonials / reviews section (+ schema once real)
**Priority:** P0 · **File:** `index.html` · **Depends on:** none (content-gated)

### Do this
1. Build a testimonials section using existing card styles (3-up grid, quote + attribution).
2. **🛑 NEEDS OWNER INPUT:** real client testimonials and/or verified Google reviews (the GBP is already
   linked in the footer). Do NOT write fake testimonials.
3. ONLY after real, verifiable reviews exist, add `aggregateRating` + `review` to the `InsuranceAgency`
   schema in `index.html`. Never add rating markup without genuine reviews behind it (Google penalizes
   fabricated review markup).

### Acceptance criteria
- [ ] Section renders real, attributed testimonials only.
- [ ] `aggregateRating` present iff real reviews exist and are visible on the page.

---

## T12 — Enrich Article schema + add breadcrumbs (UI + JSON-LD)
**Priority:** P1 · **Files:** all `insight-*.html`, `style.css` · **Depends on:** T10

### Do this
1. In each insight page's `Article` JSON-LD add `mainEntityOfPage` (the page URL) and upgrade `author`:
   ```json
   "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.chriswalkerinsurance.ca/insight-mortgage.html" },
   "author": { "@type": "Person", "name": "Chris Walker", "url": "https://www.chriswalkerinsurance.ca/#about-chris" }
   ```
2. Add a visible breadcrumb nav above each article title: Home › Insights › <title>, and a matching
   `BreadcrumbList` JSON-LD block:
   ```json
   { "@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
     {"@type":"ListItem","position":1,"name":"Home","item":"https://www.chriswalkerinsurance.ca/"},
     {"@type":"ListItem","position":2,"name":"Insights","item":"https://www.chriswalkerinsurance.ca/archive-insights.html"},
     {"@type":"ListItem","position":3,"name":"<<ARTICLE TITLE>>"}
   ]}
   ```
3. Style `.breadcrumb` minimally with existing tokens.

### Acceptance criteria
- [ ] Rich Results Test shows valid Article **and** Breadcrumb items per page.
- [ ] Breadcrumb is visible and keyboard-navigable.

---

# PHASE 4 — Cleanup, consistency, ops

## T13 — Fix the `quote-life.html` grid layout bug
**Priority:** P2 · **File:** `quote-life.html` (~`:170-199`) · **Depends on:** none

The "Have questions? Reach out to Chris directly" block is a stray `<div class="container">` nested
*inside* `.landing-grid` (a `1fr 450px` grid), so it becomes an unintended 3rd grid child and renders
misaligned. Move that block OUT of `.landing-grid` — close `.landing-grid` and `.landing-content-section`
after the `.quote-form-card`, then place the contact block in its own full-width section below.

### Acceptance criteria
- [ ] On desktop, the contact block spans full width below the two-column area, not jammed under column 1.

---

## T14 — Standardize email-copy interaction (remove inline `onclick`)
**Priority:** P2 · **Files:** 13 pages with `onclick=` · **Depends on:** none

Replace every inline `onclick` clipboard anchor (`<a href="javascript:void(0)" onclick="navigator.clipboard…">`)
with the same pattern `index.html` already uses + the handler in `scripts.js`:
```html
<button type="button" class="contact-detail-link contact-copy-email"
        data-copy-value="quotes@chriswalkerinsurance.ca" title="Copy email to clipboard">
  <svg …></svg><span>quotes@chriswalkerinsurance.ca</span>
</button>
```
`scripts.js` already wires `.contact-copy-email` (see `scripts.js:77-100`). No JS change needed.

### Acceptance criteria
- [ ] `grep -rl 'onclick=' *.html` returns nothing.
- [ ] Clicking the email on any page copies it and shows "Copied!" then reverts.
- [ ] Unblocks a future strict CSP (T18).

---

## T15 — Switch hero to dynamic viewport units
**Priority:** P2 · **File:** `style.css:698` and `:2474` · **Depends on:** none

Change `min-height: 100vh;` → `min-height: 100svh;` in both `#hero` rules (prevents the hero jumping as
the mobile address bar shows/hides). Run the version bump after.

### Acceptance criteria
- [ ] No hero height jump on mobile scroll; desktop unchanged.

---

## T16 — Social/meta polish
**Priority:** P2 · **Files:** all indexable pages · **Depends on:** none

Per page `<head>` add: `<meta property="og:site_name" content="Chris Walker Insurance Services">`,
`<meta property="og:locale" content="en_CA">`, `og:image:alt`, `og:image:width` (1200), `og:image:height`
(630), and Twitter cards:
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<<same as og:title>>">
<meta name="twitter:description" content="<<same as og:description>>">
<meta name="twitter:image" content="https://www.chriswalkerinsurance.ca/images/social-share.jpg">
```
Also add `<meta name="theme-color" content="#111827">` and set `<html lang="en-CA">`.

### Acceptance criteria
- [ ] Facebook + X/Twitter share validators render a large-image card with no warnings.

---

## T17 — Third-party JS hygiene
**Priority:** P2 · **Files:** insight/article pages, `style.css` · **Depends on:** none

1. Only load `https://tally.so/widgets/embed.js` on pages that actually contain a Tally form/modal
   (homepage + quote pages). Remove it from pure article pages that have no Tally trigger.
2. Remove `background-attachment: fixed;` (`style.css:2403`) — fixed backgrounds cause scroll repaint
   jank; the gradient overlay is unaffected.

### Acceptance criteria
- [ ] Article pages no longer request `embed.js`.
- [ ] Scroll on the homepage hero is smooth (no paint flashing).

---

## T18 — (Ops) Security headers via Cloudflare
**Priority:** P2 · **Where:** Cloudflare dashboard (not the repo) · **Depends on:** T14

This cannot be done in the static repo (GitHub Pages can't set headers). In Cloudflare → Rules →
Transform Rules → Modify Response Header, add: `X-Content-Type-Options: nosniff`, `Referrer-Policy:
strict-origin-when-cross-origin`, `Permissions-Policy: geolocation=(), microphone=(), camera=()`, confirm
HSTS is on, and — after T14 removes inline handlers — a `Content-Security-Policy` (start in
`Report-Only`). Document the final header set in CLAUDE.md.

### Acceptance criteria
- [ ] securityheaders.com grade A or better.
- [ ] No console CSP violations on any page.

---

## T19 — CSS de-duplication (maintainability)
**Priority:** P2 (backlog) · **File:** `style.css` · **Depends on:** none

Consolidate duplicate/conflicting rules: `.btn-outline-accent` is defined twice (~`:190` and ~`:2721`);
`.article-hero` twice (~`:254` and ~`:3078`); section-number comments repeat (8/14/15/16). Merge each into
one source of truth, preferring the later/most-used declaration, and re-test buttons + article heroes.
Reduce `!important` density in the mobile blocks where specificity allows. Run the version bump after.

### Acceptance criteria
- [ ] No visual regressions on homepage, an insight page, and a quote page (compare before/after screenshots).
- [ ] Each listed selector defined once.

---

# PHASE 5 — Strategic (needs an owner decision before coding)

## T20 — Decide the landing-page strategy
**Priority:** P2 · **Files:** `quote-*.html`, `mortgage-protection.html`, CLAUDE.md · **Depends on:** owner decision

CLAUDE.md prescribes conversion-only landing pages (no global nav/footer, single CTA, form above the
fold, `/lp/` subpaths excluded from nav). The live pages do the opposite (full nav+footer, root paths,
indexable).

### 🛑 NEEDS OWNER DECISION — choose one:
- **(A) Build it:** create stripped conversion variants for paid traffic under `/lp/`, `noindex` them,
  keep the current rich pages for organic. (Recommended if running ads.)
- **(B) Drop it:** update CLAUDE.md to remove the unimplemented strategy so the docs match reality.

Do not start coding until the owner picks A or B.

---

## Owner follow-ups checklist (post-deploy, from CLAUDE.md)
- [ ] Purge Cloudflare cache after each deploy.
- [ ] GSC → URL Inspection → Request Indexing for changed pages.
- [ ] GSC → Sitemaps → resubmit after T3.
- [ ] Rich Results Test after T2/T4/T12.
- [ ] Provide all **🛑 NEEDS OWNER INPUT** items: robots stance (T1), address/postal/hours (T4), bio +
      licence # + designations + headshot (T10), testimonials/reviews (T11), landing-page decision (T20).
