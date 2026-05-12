# Third-Party Integrations — Juvenis Medical

## Google Analytics 4

- **Tag ID:** `G-ZVTYLQHYQN`
- Loaded via `<script async src="https://www.googletagmanager.com/gtag/js?id=G-ZVTYLQHYQN"></script>` in each page's `<head>`
- Standard `gtag('config', ...)` init — no custom events wired in yet

When adding new pages, copy the GA4 snippet from an existing page (e.g., `index.html`) — don't omit it.

## Zoho Forms (Lead Capture)

- **Form:** Juvenis Medical "Website Lead Form"
- **Endpoint (embed + link):** `https://forms.zohopublic.com/juvenismedicalllc/form/WebsiteLeadForm/formperma/EWDfAEQRBZrULAPESccLg11UjO10_sypfgUyswHavf0`
- **Used on:** `contact.html` (iframe embed, auto-resized) and `start.html` (button link)
- Zoho Bookings + Zoho Sign integration are on the roadmap (Phase 2/3, not yet wired up)

When changing the form URL, update every reference — currently 4 occurrences across `contact.html` and `start.html`.

## YouTube

- **Channel:** [@JuvenisMedical](https://www.youtube.com/@JuvenisMedical)
- Embeds use `youtube-nocookie.com` for privacy
- Each embedded video gets its own `VideoObject` JSON-LD on `blog/videos.html`

## Chat Widget

- **File:** `chat-widget.js` (~19KB, vanilla JS, no dependencies)
- **Behavior:** Scripted front-desk assistant. Pre-approved responses only. No AI, no external APIs, no free-text input. Medical questions route to consultation booking.
- **Usage on root pages:** `<script src="chat-widget.js"></script>`
- **Usage one level deep:** `<script src="../chat-widget.js" data-base="../"></script>`

Keep responses pre-approved — never add free-text input or LLM-backed replies.
