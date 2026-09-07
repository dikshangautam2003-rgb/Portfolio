# Dikshan static site — deployment package

This package turns the supplied draft into a product-first, responsive static site for Dikshan.

## What changed

- Repositioned the homepage around the user's decision rather than the methodology.
- Added responsive desktop mega-navigation and mobile expandable navigation.
- Added dedicated Education, Products and Travel landing pages plus useful subcategory hubs.
- Added Research, Methodology, About, Contact, Editorial Policy, Affiliate Disclosure and Search.
- Added a client-side search index.
- Added unique page titles/descriptions, canonicals, Open Graph metadata and appropriate JSON-LD.
- Rebuilt the sitemap so it contains only pages intended to be indexable.
- Added noindex research-brief URLs for future high-value pages so they do not enter search before their evidence is ready.
- Preserved the supplied CNAME, Bing verification file, favicon and favicon-derived brand identity.
- Added a restrained blue/red visual system inspired by the supplied Dikshan mark, without turning the site into a Nepal-flag or trekking-company aesthetic.
- Added a migration map and kept permanent redirects for legacy portfolio routes.

## Important content/image note

No authentic college, product, hotel or destination photography was supplied with the source package. The site therefore uses clearly labeled editorial image placeholders rather than fake photographs or unverified hotlinks.

Before publishing entity/recommendation pages, add legally usable authentic images and meaningful alt text. Do not present generated imagery as real-world photography.

## SEO publishing rule

The specific “best …” pages are present as `noindex,follow` research briefs. Keep them noindex until the underlying research dossier contains enough source-backed evidence, original analysis, current facts and relevant visuals to justify a standalone search result.

## Deploy

Upload the contents of this folder to the root of the domain or deploy the folder with Vercel/static hosting.

After deployment:

1. Confirm `https://dikshangautam.com.np/` resolves correctly.
2. Confirm favicon, manifest, robots and sitemap are reachable.
3. Test old URLs and confirm 301 redirects.
4. Test mobile navigation and site search.
5. Add authentic editorial images.
6. Verify every time-sensitive claim before publishing.
7. Submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Files

- `index.html` — homepage
- `404.html` — fallback
- `assets/style.css` — shared styles
- `assets/main.js` — navigation, year and search behavior
- `search-index.json` — client-side search data
- `sitemap.xml` — indexable URLs
- `robots.txt` — crawl instructions
- `vercel.json` — permanent redirects
- `SEO-KEYWORD-MAP.md` — intent map
- `MIGRATION-MAP.md` — URL migration plan
- `BingSiteAuth.xml`, `CNAME`, `favicon.ico`, `assets/favicon.png` — preserved deployment/brand assets
