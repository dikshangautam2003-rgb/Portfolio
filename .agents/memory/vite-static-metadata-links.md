---
name: Vite metadata links
description: Build behavior for root-absolute metadata URLs in Vite entry HTML.
---

In this workspace, root-absolute metadata links in the Vite entry HTML can be processed as source assets during production builds. Keep canonical URL metadata dynamic at runtime when the deployment origin is not known, and let robots.txt reference public sitemap assets directly.

**Why:** A valid preview can still fail the production build when Vite tries to read a root directory as an HTML asset.

**How to apply:** After adding canonical, sitemap, or other head links, run the artifact's production build with workflow environment variables before considering the site finished.