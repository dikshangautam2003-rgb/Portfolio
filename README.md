# Dikshan Gautam — V4 (Personal Brand Rebuild)

This replaces the previous 89-page "decisions in Nepal" publication (Education + Products + Travel)
with a focused personal consulting site, per the locked strategy below.

## Locked positioning

**Dikshan helps businesses get found, understood, and chosen online.**

- Primary disciplines: **Search · Content · Web**
- Supporting discipline: **Video** (sits inside Content)
- Audience: businesses, founders and professionals — Nepal + remote/international clients
- Editorial niche: **Digital Growth in Nepal** (Insights section only — not the main positioning)

## The six core pages

| Page | Purpose |
|---|---|
| `/` | Who you are, what you solve, why someone should contact you |
| `/services/` | The three systems (Search, Content, Web) + Video as a supporting service |
| `/work/` | Proof — case studies and the frameworks behind them |
| `/about/` | Story, approach, why the site was rebuilt this way |
| `/insights/` | Focused blog: Digital Growth in Nepal (SEO / Local Search / Websites / Content) |
| `/contact/` | Project-enquiry form |

No mega-menus, no Education/Products/Travel navigation, no 90-page content architecture.

## What happened to the old content

See `MIGRATION-MATRIX.md` for a full URL-by-URL breakdown (all 89 previous URLs). Summary:

- **Education, Products, Travel (85 pages):** removed. These were three unrelated industries that
  turned the personal site into a media-publication workload. Served as a true 404 rather than an
  invented redirect, per Google's own guidance on removed content.
- **`/blog/`:** 301 redirect to `/insights/`.
- **`/search/`:** 301 redirect to `/insights/` (site search isn't needed for a ~9-page site).
- **`/about/`, `/contact/`:** kept, rebuilt with the new positioning.

## Content included in this build

Three real Insights articles are included as the seed of the "Digital Growth in Nepal" library:

1. SEO for Nepali Businesses: Where to Start
2. Google Business Profile: A Practical Guide for Nepali Businesses
3. How Much Does a Business Website Actually Cost in Nepal?

The `/work/` page currently documents **one live case study** (this website itself) plus three
"approach" write-ups describing how each system is actually run. Deliberately no fabricated client
results — swap in real, named case studies as projects are completed and clients agree to be featured.

## Before you launch

1. Replace `hello@dikshangautam.com.np` in `/contact/index.html` with your real email if different.
2. Confirm the Web3Forms `access_key` in `/contact/index.html` is still yours (carried over from the previous build).
3. Add real social links in the `Person` schema block in `/index.html` (`sameAs` array is currently empty).
4. Swap the "approach" cards on `/work/` for real, named case studies as they become available.
5. Deploy this folder as the site root (Vercel, Netlify, or any static host). `vercel.json` handles
   the `/blog/` and `/search/` redirects; everything else 404s cleanly via `404.html`.
6. Resubmit `sitemap.xml` to Google Search Console and Bing Webmaster Tools after launch, and remove
   the old sitemap URLs for the deleted sections if they're still indexed (Search Console → Removals).

## Design system

New editorial visual language (see `MIGRATION-MATRIX.md`'s parent strategy doc for reasoning):
warm paper background, ink text, a single terracotta accent, Fraunces for headings and Inter for body —
deliberately not a "generic digital marketing agency" look (no gradients, no floating cards, no stock
photos of people pointing at charts).
