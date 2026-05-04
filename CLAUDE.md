# CLAUDE.md

Rules for Claude Code working on Peter Luke's client projects.

## Prime Directive

Follow Peter's instructions exactly. Do not go beyond the request unless you explain why and get approval first.

Optimize for:
- Efficiency
- Consistency
- Simple, clever solutions
- Minimal backtracking
- Clean client delivery
- GitHub best practices
- Clear communication for a non-coder

## Project Type

Most work involves client websites, branding, landing pages, copy, blogs, social content, and asset organization.

Common tasks:
- Update website colors, logos, layout, and copy
- Create or improve landing pages
- Organize brand assets
- Write blogs and social posts
- Save work to GitHub

## Before Changing Anything

1. Read the relevant files first.
2. Identify the framework, package manager, and folder structure.
3. Check README.md, package.json, config files, and existing patterns.
4. Find where global styles, colors, fonts, layout, and shared components are defined.
5. Prefer global/theme changes over one-off edits.
6. If the request is ambiguous, stop and ask.
7. If multiple approaches make sense, briefly explain the options.

Do not assume important details.

## Change Rules

- Make the smallest change that solves the request.
- Do not rewrite the site unless asked.
- Do not duplicate pages just to test design ideas.
- Do not refactor unrelated code.
- Do not "improve" nearby files just because you noticed something.
- Do not delete files, comments, content, or assets unless clearly required.
- Do not add libraries, frameworks, services, or tools without approval.
- Match the existing project style.
- Every changed line should connect directly to the task.

## Branding Rules

For client brand work:

- Preserve original assets.
- Save new assets in organized folders.
- Use descriptive filenames.
- Prefer PNG or JPG.
- Do not create SVG files unless Peter explicitly requests them.
- Do not overwrite originals without a backup or new filename.
- Keep colors, typography, spacing, and tone consistent.

For website color changes:
1. Update global variables or theme settings first.
2. Update shared header/footer/layout second.
3. Update page-specific sections only when needed.
4. Check desktop and mobile.

## Juvenis Medical Default Context

Use this context for Juvenis unless Peter says otherwise.

Client: Dr. Paul  
Business: Juvenis Medical  
Website: peptidesandhormones.com  
Focus: premium medical wellness, longevity medicine, peptide and hormone optimization.

Palette:
- Deep navy/black: #081020
- Rich gold: #D4AF37
- Teal blue: #0E3D40
- Accent teal: #1FB7B8
- White: #FFFFFF

Brand feel:
- Premium
- Clean
- Medical
- Modern
- Trustworthy
- Longevity-focused
- Teal/gold/black preferred
- Avoid cheap supplement-style design

Juvenis rules:
- Use "Juvenis Medical" as the business name.
- Do not create SVG files unless asked.
- Preserve original assets.
- Save meaningful work to GitHub using best branch and issue practices.

## Content Rules

For blogs, pages, and social posts:

- Keep medical claims careful and responsible.
- Do not promise outcomes.
- Do not invent clinical claims.
- Use educational language.
- Avoid hypey supplement-style wording.
- Match a premium medical wellness tone.
- Write clearly for normal people, not only doctors.

For social content, include when useful:
- Platform
- Caption
- Suggested visual
- Image size
- CTA
- Hashtags
- Source blog/page
- Recommended file path

## GitHub Workflow

Use GitHub best practices by default.

- Do not work directly on main unless Peter explicitly says so.
- Create or use a focused branch.
- Use clear branch names:
  - brand/juvenis-teal-refresh
  - content/juvenis-social-posts
  - fix/mobile-header-spacing
  - feature/new-landing-page
  - chore/organize-assets
- Make small, meaningful commits.
- Save meaningful client work to GitHub.
- Use issues, branches, commits, and pull requests when appropriate.

## Testing and Verification

Claude must inspect the project and determine the correct checks.

Look for commands in:
- package.json
- README.md
- Makefile
- pyproject.toml
- requirements.txt
- vite.config
- next.config
- tailwind.config

Before finishing, run the safest relevant checks available:
- lint
- typecheck
- tests
- build

If a check fails:
1. Read the error.
2. Fix only the related issue.
3. Re-run the check.
4. Do not start broad rewrites.

If checks cannot be run, clearly explain why.

## Communication Style

Peter is not a coder.

Explain clearly:
- What you found
- What you changed
- Why it matters
- Files changed
- Checks run
- What Peter should do next

Avoid unnecessary jargon. Explain technical terms simply.

## Ask Before Doing These

Ask Peter before:
- deleting files
- installing packages
- changing hosting or deployment settings
- changing environment variables
- touching secrets, API keys, passwords, or tokens
- changing payments, authentication, or security-sensitive code
- making broad design changes beyond the request

## Never Do These

- Never expose secrets.
- Never commit .env files.
- Never commit API keys, passwords, tokens, or private credentials.
- Never hallucinate file contents.
- Never create SVGs unless explicitly requested.
- Never make broad rewrites when a small fix works.
- Never leave meaningful client work unsaved.
- Never work on main by default.

## Final Response Format

End each task with:

1. Summary
2. Files changed
3. Checks run
4. GitHub status
5. Anything Peter needs to review
