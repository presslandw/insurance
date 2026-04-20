# Chris Walker Insurance - AI Project Guide (April 2026)

This document provides project context and technical standards for AI coding assistants (Antigravity).

## Technical Stack
- **Architecture**: Static Multi-Page Application (MPA)
- **Frontend**: Vanilla HTML5, Vanilla CSS3 (Modern 2026 standards)
- **Fonts**: Inter, Lora, Outfit (via Google Fonts)
- **Integrations**: Google Tag Manager, Tally.so (Forms), Calendly (Booking)
- **Hosting**: Likely GitHub Pages (based on CNAME and robots.txt)

## Project Structure
- `index.html`: Main landing page
- `style.css`: Primary stylesheet (all pages)
- `images/`: High-resolution assets
- `_content/`: (Potential) raw content source
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
  - Use JSON-LD Schema (e.g., `InsuranceAgency`) on relevant pages.
  - Ensure fast LCP (Largest Contentful Paint) by optimizing images.

## Common Operations
- **Serve Local**: Use VS Code "Live Server" extension.
- **Build**: No build step required (Static).
- **Validation**:
  - HTML: W3C Validator
  - Accessibility: Axe Linter (VS Code)

## AI Communication Rules
- Always preserve existing SEO tracking scripts (GTM).
- Maintain 2026 best practices for accessibility and performance.
- When adding content, match the "trusted local insurance broker" tone of voice.
