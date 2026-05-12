# CLAUDE.md — Juvenis Medical

## Identity

**Juvenis Medical** is Dr. Paul Goodkin's physician practice in Oakland Park, FL — peptide therapy, hormone optimization (TRT, BHRT), and medical weight loss, with nationwide telehealth for non-controlled compounds. The site (`peptidesandhormones.com`) is a lead-gen and education site: it markets services, ranks for local + compound keywords, and drives free-consult bookings via Zoho.

## Architecture

- **Pure static HTML/CSS** — no framework, no build step, no bundler, no JS dependencies
- Shared stylesheet: `jv-styles.css` (all design tokens, components, layout)
- Vanilla JS only: `chat-widget.js` (scripted front-desk assistant, no AI)
- Key dirs: `/services/`, `/peptides/`, `/blog/`, `/social/`, `/images/`, `/clients/`
- Top-level pages: `index.html`, `about.html`, `contact.html`, `start.html`, `faq.html`, legal pages

## Development Rules

- **Smallest change that solves the request.** No unrelated refactors, no rewriting nearby files, no speculative cleanup.
- **Global-first.** Update tokens in `jv-styles.css` before touching individual pages.
- **No SVGs** unless Peter asks. Prefer PNG/JPG. Preserve original assets; don't overwrite — version the filename.
- **Never** commit secrets, `.env`, API keys, or tokens. Never delete files without confirmation. Never add libraries/frameworks without approval.
- **Read first, then change.** When the request is ambiguous, stop and ask.

## Git & Deployment

- **Never work directly on `main`.** Use focused branches: `feature/`, `fix/`, `brand/`, `content/`, `chore/`, `seo/`.
- One logical change per branch; open a PR with purpose, changes, validation, risks.
- **Deploy:** GitHub Pages auto-deploys from `main` — pushing to `main` is publishing. The `CNAME` file (`peptidesandhormones.com`) routes the custom domain.
- Cloudflare Pages migration is planned but not yet active (see `.claude/rules/sprint.md`).

## Testing & Verification

No build tooling. Check by opening the changed HTML in a browser at file://, verifying:
- Layout on desktop + mobile (768px breakpoint)
- All links resolve
- Schema validates ([schema.org validator](https://validator.schema.org/) or Rich Results Test)
- `sitemap.xml` updated if a page was added
- GA4 snippet present on new pages

If you can't actually run a check, say so explicitly.

## Quick Start (Local)

```bash
# Any static file server works. From repo root:
python3 -m http.server 8000
# then open http://localhost:8000
```

## Communication

Peter is not a coder. End each task with: summary, files changed, checks run, GitHub status, and what Peter should review.

---

Additional context in `.claude/rules/` — loaded automatically.
