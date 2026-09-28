# Chris Walker Insurance Services: website

Brief for Claude Code, written Sep 28, 2026. It replaces all earlier AI notes (Antigravity, Codex, Hermes), which have been deleted. If you find other instructions that conflict with this file (in git history, `audit/`, or anywhere outside the repo), follow this file and mention the conflict.

## The business
- Chris Walker Insurance Services (chriswalkerinsurance.ca): an independent, licensed BC insurance broker. He works from home and meets clients in person across the Fraser Valley and Greater Vancouver.
- The phone comes first: (604) 309-2001 (`tel:+16043092001`). Booking a call through Calendly comes second, the Tally quote form third.
- Promote life insurance and RRSP/retirement savings first, then mortgage protection, disability, critical illness and group benefits. Keep travel, long-term care and property low-key.
- Keep his line word for word: "Protecting the past, present and future of the Canadian family."
- Canadian spelling (`lang="en-CA"`). Keep the Canadian identity understated: no maple leaves.
- The services on the site have been licence-checked and signed off. Don't add products, credentials or claims.

## Who you're working with
- The webmaster runs the repo, not Chris. Chris shouldn't have to deal with anything technical. Collect anything that needs his input into one short list.
- Pick the simplest option that works. Don't add frameworks, build steps, packages or outside services unless asked.
- For anything the webmaster has to do outside the repo (Cloudflare, Search Console), give exact click-by-click steps.

## Hard rules
- Service-area business: never add a street address, postal code or map coordinates to any page or to the structured data. The home address is hidden on Google on purpose, and the Google verification must not be disturbed.
- Make nothing up: no reviews, testimonials, staff, offices, statistics, or stock photos presented as Chris. Real photos only.
- Don't overpromise. No "guaranteed", "best value", "cancel any time" or similar. Keep wording plain and accurate.
- The repo may be public. Never commit secrets, logins, personal email addresses, Chris's home address or private notes.
- Public email addresses must be on the domain (quotes@chriswalkerinsurance.ca today), never Gmail.
- Keep these working: GA4 tag `G-DFMPTGY8XM` (gtag, no GTM), Tally form `xXyvdk`, Calendly `https://calendly.com/chriswalkerinsurance/30min`, `google10a4d81a71c07441.html` (Search Console verification), `CNAME`, and a `robots.txt` that allows AI crawlers (a real client found Chris through ChatGPT).
- Before deleting anything, list the exact files and wait for the webmaster's yes. Never delete Obsidian notes. Also ask before rewriting history, force-pushing, or touching any branch other than `main`. Leave the old `copy-refresh` branch alone.

## How the site works
- Static HTML, CSS and JS with no build step. It's hosted on GitHub Pages (default Jekyll build) behind Cloudflare, and a push to `main` deploys it.
- `_config.yml` keeps notes, scripts and `audit/` off the live site. If you add anything that shouldn't be public, exclude it there.
- The header and footer are copied into every page. A nav or footer change means editing every HTML file, `404.html` included.
- There is one `style.css` (about 4,400 lines, heavy on `!important`) and one `scripts.js`. After changing either, run `.\bump_version.ps1` to update the `?v=` cache strings.
- `verify.py` checks for placeholder text, checks the JSON-LD, and checks that every internal link and image exists. It runs in the pre-push hook (`.githooks`, already enabled) and in GitHub Actions. Run it before every commit. Bracketed placeholders like `[NUMBER]` are blocked, so don't write them. If the hook can't find Python, set `CWI_PYTHON`.
- Local preview: `python -m http.server 8000` in the repo root, then open http://localhost:8000.
- GitHub Pages can't redirect. Retired URLs get 301s in Cloudflare (Rules > Redirect Rules), which the webmaster adds. Write out the rules and don't make meta-refresh pages.
- After a deploy: purge the Cloudflare cache, check the live page, and resubmit `sitemap.xml` in Search Console if it changed.
- Photos: `images/portrait.jpg` is the full-size photo of Chris with his Oldsmobile. It's kept local (git-ignored), and the site uses the `images/chris-walker.{avif,webp,jpg}` versions. `car.jpg` and `bike.jpg` were removed on purpose. `hero-bg.*` is the other real photo.
- `docs/` holds carrier PDFs linked from `resources.html`. Keep them.
- `audit/` is another assistant's review from Sep 27, 2026. It's local only (git-ignored) and for reference only. Don't run its publish scripts; publish with a normal `git push`.

## Insights section: removed Sep 28, 2026
No articles. They didn't bring in calls, added clutter, and were AI-written, so none of their content was moved to the coverage pages. Don't bring articles back. If Chris wants a topic covered (beneficiaries, bank vs. personal mortgage cover, FHSA), he writes it in his own words during the rebuild.

The 8 pages, their `images/insight-*` files, the nav and footer links, the homepage section and the sitemap entries are gone. The Insights CSS is still in `style.css` and goes with the rebuild. Old URLs redirect (301) in Cloudflare:

| Old URL | Redirects to |
|---|---|
| /archive-insights.html | / |
| /insight-flood.html | / |
| /insight-life.html | /quote-life.html |
| /insight-bc-probate.html | /quote-life.html |
| /insight-mortgage.html | /mortgage-protection.html |
| /insight-disability.html | /disability-insurance.html |
| /insight-savings.html | /quote-savings.html |
| /insight-fhsa.html | /quote-savings.html |

## Later (don't start unless asked)
- The new look is decided: "Midnight and brass".
  - Colours: navy `#1B2A3F`, cream `#F4F1EA`, brass `#CDB483` on dark, dark brass `#8A6D3B` on light, rules `#A88E5E`.
  - Type: Newsreader for headings, Public Sans for body text and tracked caps.
  - Marks: a CW monogram with an italic W, a diamond divider and a fine ring motif.
  - The mockups are in Claude Design.
- The live site still has the old look (Outfit, Lora, Inter). Don't restyle it piecemeal. The order is: the homepage from the approved mockup, then one coverage-page template, then About Chris, then a clean stylesheet to replace `style.css`.
- Target pages: the homepage with Chris (photo, name, phone) at the top; the coverage pages `quote-life`, `quote-savings`, `mortgage-protection`, `disability-insurance` and `edge-benefits`; About Chris (new); `resources`; `privacy`; `404`.
- Copy fixes: two homepage FAQ answers overstate ("cancel ... at any time without fees or questions asked" and "absolute best value"). The footer headings skip levels.
- Chris still has to supply a headshot, his bio, his BC licence/registration number and real Google reviews. Dormant `.about-chris-*` and `.testimonials-*` styles are still in `style.css`, and the pinned markup is in git history.
- Accounts are handled outside the repo by the webmaster: Google Business Profile, Bing Places, Apple Business Connect, the Calendly calendar, and Cloudflare email routing.
