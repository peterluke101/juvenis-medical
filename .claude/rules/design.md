# Design System — Juvenis Medical

All design tokens, components, and layout live in **`jv-styles.css`** (single shared stylesheet). Update tokens there first — do not hard-code colors or fonts on individual pages.

## Brand Colors

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#0D0F14` | Page background (deep navy/charcoal) |
| `--surface` | `#161A22` | Cards, panels |
| `--surface2` | `#1C2230` | Elevated surfaces |
| `--gold` | `#C9963A` | Primary accent, CTAs, brand highlights |
| `--gold-light` | `#E0AE55` | Hover state on gold |
| `--teal` | `#1E6878` | Secondary accent |
| `--teal-light` | `#2A8497` | Hover, links, accent text |
| `--text` | `#F0EDE8` | Body text (warm off-white) |
| `--text2` | `#9BA4B5` | Secondary text |

Avoid introducing new colors. If you need one, add it as a token in `jv-styles.css`.

## Typography

- **Headings:** Space Grotesk (weights 400–700)
- **Body:** Inter (weights 300–800)
- Loaded via Google Fonts in each page's `<head>`
- `:root` sets size scales — `h1` clamps to viewport; never hard-code px sizes inline

(Branding aspiration was sometimes described as Cormorant Garamond + Montserrat — the production stack is Space Grotesk + Inter. If a future change swaps the fonts, update jv-styles.css, the Google Fonts `<link>` on every page, and this file together.)

## Component Patterns

| Class | Purpose |
|---|---|
| `.nav` / `.nav-inner` / `.nav-mobile` | Fixed header (logo + links + gold CTA) |
| `.page-hero` | Page hero sections |
| `.section` / `.section-inner` / `.section-header` | Standard content section (5rem padding) |
| `.step-list` | Numbered step components (process, intake flow) |
| `.cta-band` | Full-width CTA strip |
| `.footer` | Site footer |
| `.btn` + `.btn-gold` / `.btn-ghost` / `.btn-text` | Button variants |
| `.pill` | Pulsing gold status pill (above page H1) |
| `.container` | Max-width 1100px wrapper |

## Mobile Rules

- Breakpoint: `768px`
- Mobile nav swaps to hamburger; `--nav-h` becomes 78px on mobile
- Always verify desktop **and** mobile after any layout/header/footer change

## Color-Change Workflow

1. Update token in `jv-styles.css` `:root`
2. Verify shared layout (nav, footer, hero) picks it up
3. Page-specific overrides only when global change isn't appropriate
4. Test desktop + mobile
