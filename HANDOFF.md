# Chris Walker Insurance — Session Handoff

> Read this at the start of any new Claude session to resume work without losing context.

## The site

Static HTML/CSS site for Chris Walker, independent insurance broker in Abbotsford, BC. Live at `www.chriswalkerinsurance.ca` (GitHub Pages, repo `presslandw/insurance`). No build step — edits go directly to HTML/CSS files.

## Current state (2026-04-22)

- **Main branch (live):** CSS v85. All recent design and mobile improvements are here.
- **Copy-refresh branch:** Rewrites of all site copy — sharper, insight-forward tone. **Not yet merged.** Preview at `https://chriswalker-copy-refresh.vercel.app`.

## Design rules (non-negotiable)

| Rule | Detail |
|------|--------|
| Gold accent (`#C48E54`) | ONLY on `.btn-solid-accent` (hero "Get Your Personal Review" button). Nowhere else. |
| All other CTAs/icons | Navy (`#111827`) |
| CSS version bump | Every change to `style.css` requires bumping `?v=XX` on ALL 15 HTML files: `sed -i 's/style\.css?v=85/style.css?v=86/g' *.html` |
| Dark-bg buttons | `.hero-actions .btn-outline-accent` and `.contact-actions .btn-outline-accent` have white overrides (navy sections need this) — do not remove |

## Open tasks (as of this handoff)

1. **User reviews copy-refresh branch** at `https://chriswalker-copy-refresh.vercel.app`. When approved, merge flow:
   ```
   git checkout copy-refresh
   git merge main
   sed -i 's/style\.css?v=83/style.css?v=86/g' *.html   # or current version
   git add . && git commit -m "Merge main into copy-refresh, sync CSS version"
   git checkout main
   git merge copy-refresh
   git push origin main
   ```

2. **Mobile UX** — v85 addressed: about buttons, hero badge, section backgrounds, services-secondary container. Monitor for remaining issues.

3. **Vercel preview refresh** (if copy-refresh branch is updated):
   ```
   git worktree add /tmp/copy-refresh-preview copy-refresh
   cd /tmp/copy-refresh-preview
   npx vercel deploy --yes
   git -C /c/Users/J/Desktop/Projects/chriswalkerinsurance worktree remove /tmp/copy-refresh-preview --force
   ```

## File structure

- `style.css` — single stylesheet for all pages
- `index.html` — main landing page (hero + about + services + insights + contact)
- `disability-insurance.html`, `mortgage-protection.html`, `edge-benefits.html` — service pages
- `quote-life.html`, `quote-savings.html` — quote landing pages
- `insight-*.html` (6) — article pages
- `archive-insights.html`, `privacy.html`, `404.html` — utility pages

## Integrations

- **Forms:** Tally.so embed ID `xXyvdk` (used on all contact/quote forms)
- **Booking:** Calendly `https://calendly.com/chriswalkerinsurance/30min`
- **Analytics:** Google Analytics `G-DFMPTGY8XM`

## How to deploy changes

```bash
git add <files>
git commit -m "Description - vXX"
git push origin main
# Site goes live automatically via GitHub Pages (1-2 min propagation)
```
