# Chris Walker Insurance - AI Project Guide (April 2026)

This document provides project context and technical standards for AI coding assistants (Antigravity).

## Technical Stack
- **Architecture**: Static Multi-Page Application (MPA)
- **Frontend**: Vanilla HTML5, Vanilla CSS3 (Modern 2026 standards)
- **Fonts**: Inter, Lora, Outfit (via Google Fonts)
- **Integrations**: Google Tag Manager, Tally.so (Forms), Calendly (Booking)
- **Hosting**: GitHub Pages (source of truth) behind Cloudflare proxy (CDN + bot management)

## Project Structure
- `index.html`: Main landing page
- `style.css`: Primary stylesheet (all pages)
- `images/`: High-resolution assets
- `insight-*.html`: Educational articles/guides
- `quote-*.html`: Quote request landing pages
- `.vscode/`: Environment configuration

## Code Style & Standards
- **HTML**:
  - Use Semantic HTML5 elements (`<main>`, `<section>`, `<article>`, `<header>`, `<footer>`).
  - Strict Accessibility: All images must have `alt` text, buttons must have `aria-label` where needed.
  - SEO: Every page MUST have a unique `<title>`, `canonical` link, and meta `description`.
  - Social: Open Graph (OG) tags must be present on all indexable pages.
- **CSS**:
  - Prefer native CSS variables (Custom Properties).
  - Use modern layout techniques: CSS Grid and Flexbox.
  - Colors: Use `oklch()` or semantic variables where possible.
  - Typography: Stick to the project's font pairings (Outfit for headers, Inter for body).
- **SEO**:
  - Use JSON-LD Schema on relevant pages: `InsuranceAgency` on homepage, `Article` with `Organization` publisher (NOT `InsuranceAgency`) on insight pages.
  - Ensure fast LCP (Largest Contentful Paint) by optimizing images.

## Common Operations
- **Serve Local**: Run `npm run dev` to start a local server at `http://localhost:3000`.
- **Version Bump**: After ANY change to `style.css`, run `.\bump_version.ps1` to update the cache-busting version string across all 15+ HTML files.
- **Build**: No build step required (Static).
- **Validation**:
  - HTML: W3C Validator
  - Accessibility: Axe Linter (VS Code)
- **Deployment**: `git push origin main` (auto-deploys to GitHub Pages).

## Design System & "2026 Premium" Aesthetic
The project underwent a significant visual overhaul in April 2026 to adopt a "Premium Light" editorial aesthetic.

- **Color Palette**:
  - `Primary (Navy)`: Used for the floating header and high-contrast accents.
  - `Accent (Gold/Copper)`: Symbolizes value and trust. Used for CTAs and iconography.
  - `Text Title (Deep Charcoal)`: A refined, very dark navy-grey used for all headers to avoid the "harshness" of pure black.
  - `Backgrounds`: Prefer clean white (`#FFFFFF`) or off-white (`#F8FAFC`) over dark solid blocks.
- **Typography**:
  - **Headers**: `Outfit` (Sans-serif) for high-impact titles.
  - **Editorial Body**: `Lora` (Serif) for long-form insight content to evoke professional journalism.
  - **UI/Small Text**: `Inter` (Sans-serif) for functional readability.
  - **Readability Rules**: Paragraphs use `line-height: 1.85` and `1.75rem` bottom-margin for an open, airy reading rhythm.
- **UI Component Standards**:
  - **Corners**: `8px` for buttons/forms; `16px-20px` for large content cards/images.
  - **Header**: Floating "glassmorphism" pill with `15px` backdrop-blur and `85px` scroll-margin-top.
  - **CTAs**: Avoid heavy solid boxes. Use white cards with subtle borders and gold top-accents.

## AI Communication Rules
- **CRITICAL**: Do NOT use Git worktrees. Stick to standard `git checkout` or `git switch`. Creating worktrees permanently modifies the repo config and crashes certain AI chat indexers.
- Always preserve existing SEO tracking scripts (GTM).
- Maintain 2026 best practices for accessibility and performance.
- **Aesthetic Consistency**: Adhere to the "Premium Light" design tokens. Avoid adding heavy dark backgrounds or generic blue/red colors.
- When adding content, match the "trusted local insurance broker" tone of voice: professional, straightforward, and family-oriented.

## Active Project State
- **Primary Branch**: `main` (Live site — auto-deploys on push).
- **Secondary Branch**: `copy-refresh` (Stale rough draft for sitewide copy refresh — not merged, low priority, do not touch unless explicitly asked).
- **Stale Worktree Branch**: `claude/gallant-wing-228abc` exists in git but is orphaned. Run `git worktree prune` if it causes issues. Do NOT create new worktrees.
- **Ongoing Focus**: Image optimisation — 2 images over 100KB need compression and width/height attributes to reduce CLS (see SEO Audit Log).

## SEO Audit Log
AI does not have external visibility into the live site without being given tool output. Always run an external audit first and paste results in.

### Completed (May 2026)
- `robots.txt` cleaned — global `Allow: /`, Cloudflare injects its own managed block above (harmless)
- `sitemap.xml` fixed — orphaned PDFs re-linked globally in footer then restored to sitemap
- Page titles shortened to <60 chars across all 15 pages (local signals retained)
- Meta descriptions tightened to <155 chars across 8 pages (Abbotsford & Greater Vancouver retained)
- Article schema `publisher @type` corrected: `InsuranceAgency` → `Organization` on all 6 insight pages
- Canonical tags confirmed present on all 14 HTML pages
- Internal 4xx (Cloudflare email obfuscation `/cdn-cgi/`) confirmed false positive — ignore

### Outstanding / Next Steps
- **Local SEO audit**: Run BrightLocal to audit Google Business Profile, local citations, and map pack rankings — highest ROI opportunity not yet addressed
- **AI search visibility**: Check brand visibility in Google AI Overviews / Perplexity using Profound or Otterly.ai
- **Twitter/X cards**: Add `twitter:card` meta tags if/when a Twitter account is created
- **H2 structure**: 4 pages missing H2, 3 pages with non-sequential heading order (low priority)
- **IndexNow**: Submit updated URLs to Bing via IndexNow after any major content changes
- **Images**: 2 images over 100KB — compress and add width/height attributes to reduce CLS
- **Google Rich Results Test**: Re-validate all 6 insight pages after schema fix (ea1774b)
