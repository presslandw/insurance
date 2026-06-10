# North Star — chriswalkerinsurance.ca

A fresh-eyes reference point for what this site should become, written without regard
to time, cost, or deployment disruption. Audited June 2026 against the **live** site
(desktop + mobile screenshots, full code pass). Constraint honoured throughout: **the
original photography stays** — no replacing existing photos.

The one-sentence vision:

> The site of a real, named, trusted human in Abbotsford who has protected BC families
> for 30 years — not a generic insurance brochure — where every visitor can learn,
> calculate, and start a conversation in under two clicks.

---

## 1. Brand & Trust — the biggest gap on the site

**Today.** The site is polished but anonymous. There is no photo of Chris, no bio, no
testimonial, no review, no designation, and the licence badge literally reads
`Reg. #[NUMBER]` on all 17 pages. The "About" nav link anchors to a generic "Why an
independent broker?" section. For a personal-brand relationship business, the person
is the product — and the product never appears.

**North star.**
- A real **About Chris** presence: homepage section *and* a dedicated `/about.html` —
  his story, year licensed, designations, community ties, the photo with his
  Oldsmobile (personality beats polish). Markup already exists pinned in git history.
- **Social proof everywhere**: Google reviews pulled in near every CTA, star rating in
  the footer, `Review`/`aggregateRating` schema for stars in search results.
- **Verifiable credentials**: real BC licence number, BCFSA reference, carrier
  appointments — all matching the Google Business Profile exactly.
- Consistent first-person voice ("I compare…") backed by a visible author: every
  insight article shows Chris's face and links to his bio (Google E-E-A-T signal).

## 2. Design & UI

**Today.** Cohesive "Premium Light" navy/gold system, glassmorphism header, generally
strong. Fresh-eyes nits: the hero headline is 24 words over 5 lines (9+ on mobile),
diluting impact; the stats bar says **"Licensed Sitewide"** (meaningless — a website is
sitewide, a licence is provincewide); the featured FHSA insight card has a large empty
void between excerpt and link; the contact section is two equal-weight outline buttons
floating in a dark expanse — no visual primary action; icons are generic line icons;
CLAUDE.md specifies Outfit for headers but the live site renders serif (Lora) headlines
— doc and reality have drifted, pick one and codify it.

**North star.**
- **Hero**: one short emotional line ("Protect the people who count on you."), subline
  with the local 30-year proof, single dominant CTA. Keep the original family photo.
- A written, versioned **design-token spec** that matches the live site (type scale,
  spacing scale, button hierarchy: one filled primary per viewport).
- Custom icon set in the gold accent style; consistent card anatomy (no whitespace
  voids); micro-interactions (accordion, reveal) tuned and subtle.
- Stats bar copy fixed: "Licensed in B.C." / "Provincewide".
- Contact section gets a clear primary (Book a Call) and secondary (Message) with an
  *embedded* form or Calendly inline — not modal-only (see §4).

## 3. Information Architecture & Product Presentation

**Today.** Six service cards, but **Critical Illness, Travel, Long-Term Care, and
Property & Business all dead-end at `#contact`** — named products with no page, no
content, no schema, no ranking chance. 4 pages have zero H2s (quote-life,
quote-savings, mortgage-protection, disability-insurance). The archive page has no
category filtering. The `/lp/` conversion landing pages described in CLAUDE.md don't
exist.

**North star.**
- **Every named product gets a real page** on one consistent template: plain-language
  explainer → who it's for → how Chris shops the market → mini-FAQ (with FAQ schema) →
  related insight → quote form. Priority: Critical Illness (core product, zero
  presence), then Travel, LTC, Property & Business.
- **Service-area pages** for the claimed territory: Abbotsford is the only city with
  real on-page presence; "Greater Vancouver & Fraser Valley" deserves Langley,
  Chilliwack, Mission, Surrey pages with genuinely local content (not doorway pages).
- **Conversion landing pages** under `/lp/` per the documented strategy: no nav/footer,
  single CTA, above-fold form — one per high-intent keyword.
- Proper heading hierarchy on every page (H1 → H2 → H3, no gaps).
- Archive gains category filters and visible dates.

## 4. Conversion System

**Today.** Homepage contact = a Tally **modal** behind a button (extra click, no form
visible). Quote pages do have an above-fold form — good — but it's generic
(name/email/free-text) despite being labelled "Custom Assessment". Ten PDFs are given
away in the Resource Library with zero capture. No calculator, no newsletter, no
nurture, no exit path other than "call or book".

**North star.**
- **Interactive needs calculators** — the differentiator nothing local has:
  "How much life insurance do I actually need?", bank-vs-personal mortgage-protection
  comparison, disability income-gap. Each ends in a pre-filled quote request.
- **Structured multi-step quote funnels** (age band, smoker status, coverage amount,
  timeline) — feels like progress, qualifies the lead, beats a blank text box.
- **Light-touch email capture** on the Resource Library ("email me this guide") +
  a simple monthly newsletter → automated nurture for not-ready-yet visitors
  (CASL-compliant consent).
- Calendly **embedded inline** in the contact section; Tally form embedded, not modal.
- Every page ends in a contextual next step, never a dead-end.

## 5. Content & Search (SEO / AEO)

**Today.** Strong foundations: clean robots.txt (Cloudflare block resolved), valid
Article/FAQ/InsuranceAgency schema, canonicals, OG tags, breadcrumbs, sitemap. Seven
genuinely good editorial articles. Gaps: `InsuranceAgency` has no street address/hours
(TODO sits in `index.html`); no review schema; `social-share.jpg` is 1200×1200 (crops
poorly in link previews — *recrop, don't replace*); content covers only 7 topics; no
IndexNow; no measurement of AI-engine visibility.

**North star.**
- **Complete the entity**: full NAP + hours in schema, exactly matching the Google
  Business Profile; review stars; `sameAs` links to GBP/Facebook/LinkedIn.
- **Local SEO as the centre of gravity**: optimized GBP with regular posts, citation
  consistency (BrightLocal audit), service-area pages above — the map pack is where a
  local broker wins.
- **Content engine**: one piece/month targeting real BC questions — critical illness
  payout odds, term-vs-whole at 40, group benefits for BC small business, retirement
  income, FHSA updates. Each: Article schema, internal links to its service page,
  IndexNow ping on publish.
- **AEO**: track brand visibility in AI Overviews/Perplexity quarterly; structure
  every article with extractable Q&A blocks; keep robots posture welcoming to AI
  crawlers (already done).

## 6. Technical Platform

**Today.** 17 flat HTML files, shared markup duplicated 17× (the footer overhaul
touched every file; the `Reg. #[NUMBER]` slip shipped 17×). Cache busting is a manual
sed script. 97KB monolithic CSS with known duplicate blocks. GTM fires with no consent
banner (PIPEDA/Law 25 exposure). No security headers. No automated checks before
deploy.

**North star.**
- **Static site generator** (Eleventy or Astro): one footer partial, one head partial,
  hashed assets (cache-busting dance gone), content in Markdown. Same GitHub Pages /
  Cloudflare hosting, same zero-JS-framework output — just no more 17-file edits.
- **CI pipeline** on push: HTML validation, link checker, Lighthouse budget,
  schema validation — placeholders like `[NUMBER]` physically can't reach production.
- CSS refactored to tokens + components, deduplicated, purged (<50KB).
- **Consent-mode analytics** (Google Consent Mode v2 banner) and security headers via
  Cloudflare (CSP, HSTS, Referrer-Policy).
- Performance budget: LCP < 1.8s mobile, CLS ≈ 0 (width/height on all images — done),
  AVIF-first everywhere (mostly done).

## 7. Measurement

**Today.** GTM is installed; nothing else is visible. No conversion events, no rank or
review tracking, no CWV monitoring beyond manual GSC checks.

**North star.** GA4 events for every conversion (Tally submit, Calendly booking, tel:
tap, PDF download); monthly scorecard: leads by source, map-pack rank, review count,
CWV, AI-visibility — one page, reviewed monthly, drives the next month's content.

---

## Gap summary (aspiration vs. today)

| Area | Today | North star |
|---|---|---|
| Trust | Anonymous, `#[NUMBER]` placeholder | Chris everywhere: bio, reviews, stars, credentials |
| Hero | 24-word headline, 2 CTAs | One line, one proof, one CTA (original photo kept) |
| Products | 4 of 10 named products dead-end at `#contact` | Every product has a page; service-area pages; `/lp/` funnels |
| Conversion | Modal form, generic fields, free PDFs | Calculators, multi-step funnels, email capture, nurture |
| SEO | Solid technical base, thin entity | Complete entity + reviews + local content engine + AEO tracking |
| Platform | 17 duplicated files, manual cache busting | SSG + CI; placeholder bugs impossible |
| Measurement | GTM only | Full conversion events + monthly scorecard |

## Sequencing hint (when execution resumes)

1. Stop the bleeding: hide `Reg. #[NUMBER]`, fix "Licensed Sitewide", FHSA card void.
2. Trust layer (needs owner input: bio, reviews, licence #, NAP).
3. Critical Illness page + heading fixes + social-share recrop (1200×630 of the same image).
4. Calculators + quote funnels + email capture.
5. Service-area pages + content cadence + local SEO push.
6. SSG migration + CI (do last; it's an enabler, not a visitor-facing win).
