# SEO Conventions — Juvenis Medical

## Structured Data (JSON-LD)

Every page has at least `BreadcrumbList`. Service and peptide pages add `FAQPage`. Hubs add `ItemList`.

| Schema type | Where it's used |
|---|---|
| `MedicalBusiness` | `index.html` (local SEO, Google Maps) |
| `Physician` / `Person` | `about.html` (Dr. Paul + Dr. Macek) |
| `MedicalTherapy` | Peptide and service pages where appropriate |
| `BreadcrumbList` | Every page |
| `FAQPage` | All peptide pages, service pages with FAQs |
| `ItemList` | Hubs: `/services/`, `/peptides/`, `/blog/` |
| `BlogPosting` | `/blog/*.html` posts (must include `image` field) |
| `VideoObject` | `/blog/videos.html` (one per embedded video) |
| `WebPage` / `Organization` | Used in supporting blocks |

## Meta Tag Pattern

Every page must have:
- Unique `<title>` (under ~60 chars)
- Unique `<meta name="description">` (under ~160 chars)
- `<link rel="canonical" href="https://peptidesandhormones.com/...">`
- Open Graph: `og:title`, `og:description`, `og:type`, `og:url`, `og:site_name`
- Twitter Card: `twitter:card` (`summary`), `twitter:title`, `twitter:description`

OG/Twitter title and description usually mirror the page `<title>` and meta description.

## Canonical URLs

Production domain only: `https://peptidesandhormones.com/`. Strip `.html` in canonicals (e.g., `/services/trt`, not `/services/trt.html`).

## Sitemap

`sitemap.xml` lists all production URLs (clean paths, no `.html`). When you add a page, add it to `sitemap.xml` with `<changefreq>` and `<priority>` matching the page tier (home `1.0`, hubs `0.9`, content `0.85`, legal `0.3`). Include `<lastmod>` where possible.

## Target Keywords

Pattern: `[compound] Fort Lauderdale`, `[compound] Florida`, `[compound] telehealth`, `peptide therapy South Florida`, `TRT Fort Lauderdale`, etc. Local + service combinations.

## robots.txt

Allows all crawlers; points to sitemap.
