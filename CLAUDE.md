# Chris Walker Insurance Services — Project Brief for Claude

## What This Is
A static HTML/CSS website for Chris Walker Insurance Services, an independent insurance broker based in Abbotsford, BC, serving Greater Vancouver and the Fraser Valley. The site is deployed via GitHub Pages using a custom domain (www.chriswalkerinsurance.ca).

## The Business
- **Owner:** Chris Walker — independent broker with 30+ years of experience
- **Location:** Abbotsford, BC
- **Service Area:** Abbotsford, Greater Vancouver, Fraser Valley, and all of British Columbia
- **Phone:** (604) 309-2001
- **Email:** quotes@chriswalkerinsurance.ca
- **Products:** Life insurance, health insurance, mortgage protection, disability insurance, critical illness, savings (RRSP, FHSA, TFSA, RESP, annuities, seg funds), Edge Benefits health & dental, LegalShield

## Tech Stack
- Pure static HTML and CSS — no JavaScript framework, no build process
- Single shared stylesheet: `style.css` (versioned with `?v=XX` query string on each HTML page — increment the version number whenever style.css is changed)
- Google Analytics: `G-DFMPTGY8XM`
- Contact form: Tally.so modal (`data-tally-open="xXyvdk"`)
- Booking: Calendly (`https://calendly.com/chriswalkerinsurance/30min`)
- Fonts: Lora (headings), Outfit (display), Inter (body) — loaded from Google Fonts

## File Structure
```
chriswalkerinsurance/
├── _content/        ← Cowork drafts, copy briefs, content notes (not part of the live site)
├── docs/            ← Product PDFs linked from service cards
├── images/          ← Site images and insight article thumbnails
├── index.html       ← Main single-page site
├── style.css        ← Shared stylesheet for all pages
├── insight-*.html   ← Individual insight/article pages
├── quote-*.html     ← Quote request pages
├── disability-insurance.html
├── mortgage-protection.html
├── edge-benefits.html
├── archive-insights.html
├── 404.html
├── sitemap.xml
├── robots.txt
├── CNAME            ← www.chriswalkerinsurance.ca
└── CLAUDE.md        ← This file
```

## SEO Strategy
- Primary geographic targets: Abbotsford + Greater Vancouver (both must appear together in titles and meta descriptions — do not revert to Abbotsford-only)
- Secondary targets: Fraser Valley, British Columbia
- JSON-LD LocalBusiness schema is on index.html — keep it updated if business details change
- Each page has its own `<title>`, `<meta name="description">`, and `<link rel="canonical">`
- Do not change title tags or meta descriptions without being asked

## Design System (do not alter without instruction)
- **Accent colour:** `#C48E54` (copper/gold)
- **Primary/dark:** `#111827` (deep charcoal)
- **Background:** `#FAFAFA` (warm off-white)
- **Heading font:** Lora (serif)
- **Body font:** Inter (sans-serif)
- Soft shadows, smooth transitions, scroll-reveal animations on `.reveal.fade-up` elements

## Content Status
- Most copy is AI-generated placeholder text — real content from Chris Walker is being gathered and will replace it gradually
- Testimonials section does not exist yet — do not add one until real testimonials are available
- Do not invent or embellish biographical or credential claims about Chris Walker

## Before Publishing (Checklist)
- Increment the CSS version number (`?v=XX`) in ALL HTML files whenever style.css is changed
- Update `sitemap.xml` — add any new pages, and update `lastmod` dates on pages with significant content changes
- Submit the updated sitemap in Google Search Console after publishing

## Standing Instructions for Claude Code
- Always increment the CSS version number in ALL HTML files when style.css is modified
- Do not add new pages without being asked
- Do not modify sitemap.xml or robots.txt without being asked
- Save any generated copy, briefs, or content drafts to `_content/` — not to the root
- When in doubt about content or business facts, ask rather than assume
