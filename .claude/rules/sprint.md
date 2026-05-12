# Current Sprint — Juvenis Medical

_Last updated: 2026-05-12. This file goes stale — confirm with `git log` and `gh pr list` before relying on it._

## Recent Work (merged)

| PR | Title |
|---|---|
| #22 | feat(seo): add Open Graph and Twitter Card meta tags site-wide |
| #21 | SEO: add meta descriptions to 4 pages |
| #39 | fix(blog): remove redundant Video pill badge from library card |
| #38 | perf: compress doctor headshots (~85% smaller) |
| #37 | SEO bundle: dedupe TRT schema + sitemap +5 URLs + BlogPosting image |
| #31 | Swap teal gradient poster for branded Juvenis Videos image |
| #30 | Distinct video library card on /blog/ index |
| #2  | brand/teal-accent-words — #3DE8F0 teal accent words across headings |

Recent direct-to-main commits: Dr. Paul headshot on landing page, Dr. Macek headshot on About, transparent footer/nav logo backgrounds.

## Open PRs

- **#24** — `seo/sitemap-lastmod`: add `<lastmod>` dates and missing pages to sitemap.xml
- **#4** — `feature/merch-shop-page`: merchandise shop page

## Upcoming / Roadmap

Phases tracked in `README.md`:
- **Phase 2** — Zoho Forms embed in `start.html` (partial — link only, not iframe yet); Zoho Bookings embed for consultation scheduling
- **Phase 3** — Zoho Sign document consolidation (3 emails → 1 package)
- **Phase 4** — Cloudflare migration: move `peptidesandhormones.com` DNS to Cloudflare Pages (currently GitHub Pages via CNAME). **Status: planned, not started.**

## Cloudflare Migration — Notes

- Current setup: GitHub Pages serves `peptidesandhormones.com` via `CNAME` file in repo root
- Destination: Cloudflare Pages (improves edge caching, adds redirect/header rules, supports `_redirects`)
- Pre-migration checklist: confirm GA4 still fires, verify Zoho form embed renders, validate sitemap + canonicals, snapshot Search Console rankings before cutover

Update this file as PRs land or priorities shift.
