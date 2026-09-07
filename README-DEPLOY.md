# Dikshan — new static site

Replace the current website files with this folder and deploy.

### Important migration files
- `vercel.json` contains permanent redirects for retired portfolio routes.
- `sitemap.xml` contains only the new indexable URLs.
- `robots.txt` points to the new sitemap.
- `CNAME` preserves `dikshangautam.com.np`.
- `BingSiteAuth.xml` is preserved from the current site.
- `404.html` provides a useful fallback.
- `search/` is a client-side site search, not an SEO page generator.

### Before pushing
Keep any existing Search Console/Bing verification files you already use. Verify that the deployment is serving the intended domain, then submit the new sitemap in Search Console.

### Editorial warning
The example article pages are intentionally conservative. Do not turn a research-template claim into a ranking until the underlying research dossier is complete. Never invent first-hand testing, visits, interviews or performance results.
