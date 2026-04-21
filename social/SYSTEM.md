# Social Media Content System — Standing Operating Procedure
*Peter Luke Digital | All clients*
*Locked in: Apr 20, 2026*

---

## Core Rules (non-negotiable)

1. All work saved in GitHub — no exceptions
2. GitHub best practices: clear folders, descriptive filenames, clean commit messages
3. Every CTA links directly to client's intake form/CRM — never to homepage or intermediate pages
4. Run `/medical-wording` before any medical client post goes live
5. Optimize for booked appointments, not follower count

---

## Folder Structure (per client)

```
social/
  SYSTEM.md              — this file (SOP)
  image-specs.md         — all platform image sizes
  queue.md               — running content queue (what's ready / missing / needs approval)
  social-strategy.md     — client-specific strategy
  templates/             — reusable post templates (blog, TikTok, IG, FB, GB, LinkedIn)
  assets/
    originals/           — full-res source images, never edited
    exports/
      instagram/         — resized for IG formats
      tiktok/            — 1080x1920
      facebook/          — resized for FB formats
      linkedin/          — resized for LI formats
      google-business/   — 1200x900
      twitter/           — 1600x900
      youtube/           — thumbnails + cover
      pinterest/         — 1000x1500
  2026-05/               — monthly content folders
    calendar.md          — posting schedule + checklist
    blog-1/              — all assets for post 1
    blog-2/              — all assets for post 2
  2026-06/
    ...
```

---

## Monthly Workflow

### Step 1 — Topic Selection (Pete, ~10 min)
Pete assigns 2 topics: 1 men's, 1 women's.
Command: "Topic 1: [x]. Topic 2: [y]."

### Step 2 — Content Generation (Ares)
Ares generates all 30 assets using templates:
- 2 blog posts
- 6 TikTok scripts (3 per blog)
- 6 Instagram captions (3 per blog)
- 6 Facebook posts (3 per blog)
- 2 Google Business posts
- 2 LinkedIn posts
- 2 video scripts for Dr. Paul

### Step 3 — Asset Sourcing (Content Asset Scout)
Sub-agent finds and saves royalty-free images:
- Sources: Unsplash, Pexels, Pixabay
- Downloads originals to `assets/originals/`
- Exports resized versions to `assets/exports/[platform]/`
- Rejects: blurry, awkward crop, off-brand, stock-photo-looking

### Step 4 — Medical Review
Run `/medical-wording` on all posts before approval.

### Step 5 — Pete Review (~15 min)
Pete reviews queue.md, approves or flags items.

### Step 6 — Dr. Paul Approval (medical clients)
Send approved posts to client. No post goes live without sign-off.

### Step 7 — Schedule
Load approved posts into Buffer or Meta Business Suite.
TikTok: post manually 6-9pm EST.

---

## Reminder Workflow

Ares checks the content calendar **twice per week** (Monday + Thursday).

Each check produces an update in this format:

---
**CONTENT CHECK — [DATE]**

**Client: Dr. Paul / Juvenis Medical**
| Post Date | Platform | Topic | Status | Missing | Images Ready | Needs Approval |
|-----------|----------|-------|--------|---------|--------------|----------------|
| [date] | [platform] | [topic] | [Draft/Review/Approved/Scheduled] | [caption/image/approval] | [Y/N] | [Y/N] |

**Flags:**
- [ ] Posts due in next 2-3 days
- [ ] Missing captions or scripts
- [ ] Missing or wrong-size images
- [ ] Client approval needed
- [ ] Running low on asset library (< 5 unused images)
- [ ] New content batch needed

---

## Content Asset Scout — Role Definition

A sub-agent assigned to find, save, and organize images for client posts.

**Responsibilities:**
- Find high-quality, legally usable images (CC0 / royalty-free)
- Match brand: clean, modern, health/wellness aesthetic for Dr. Paul
- Save originals to `assets/originals/[client]/[topic]/[filename]`
- Export resized versions to `assets/exports/[platform]/`
- Use descriptive filenames: `[client]-[topic]-[platform]-[size].jpg`
  - Example: `drpaul-trt-instagram-square-1080x1080.jpg`
- Reject: blurry, awkward crop, obviously staged stock, low resolution, watermarked

**Preferred image content for Dr. Paul:**
- Men: active, athletic 40-55 year olds. Not bodybuilders. Real-looking.
- Women: confident, healthy 40-55 year olds. Active lifestyle.
- Clinical: clean modern clinic interiors, lab equipment (not scary)
- Abstract: clean hormone/body diagrams, modern health infographics
- Local: Fort Lauderdale / South Florida lifestyle when possible

---

## Platform Image Sizes (reference → see image-specs.md for full list)

Quick reference for most-used:
- Instagram square: 1080 x 1080
- Instagram story/Reel: 1080 x 1920
- TikTok video/cover: 1080 x 1920
- Facebook feed: 1200 x 630
- Google Business: 1200 x 900
- LinkedIn feed: 1200 x 627

---

## Applies To All Future Clients

This SOP is client-agnostic. When a new client is onboarded:
1. Create `[client-slug]/social/` with same folder structure
2. Fill in client's direct intake form URL in all templates
3. Update brand guidelines in strategy doc
4. Assign Content Asset Scout for their first image batch
