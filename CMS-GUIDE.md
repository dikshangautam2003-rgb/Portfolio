# Dikshan Gautam — CMS Guide

This site stays static and GitHub Pages compatible.

## Blog
Pages CMS collection: `Blog`
Source folder: `content/blog/`

Add a blog post with:
- Title
- URL slug
- Short description
- Category
- Publish date
- Featured image
- SEO title + description
- Article body

The build script creates the public article page and updates the blog listing and sitemap.

## Education
Pages CMS collection: `Education Guides` lives in `content/education/` for long-form guide pages.

For featured education cards and reusable sections, use `Education Featured Items` in `content/education-items/`.

Choose one section:
- Colleges & Universities
- Academic Courses
- Career Guidance
- Skill Courses
- Study Abroad Guide

Choose the matching item type:
- +2 college / institution
- Bachelor college / university
- Bachelor course
- +2 course / stream
- Career guide
- Skill course
- Study destination
- Consultancy profile
- Education guide

The build script uses those fields to place cards into the correct education section automatically.

## Important
Do not rename existing public URLs or remove the GitHub Pages workflow unless the deployment architecture is intentionally changed.
## Publishing behavior

Blog entries are published by default. Use the **Published** toggle in Pages CMS to keep drafts out of the public site. A false value is treated as a draft by the build script.

After Pages CMS commits a new post to `content/blog/`, the GitHub Pages workflow runs `scripts/build.mjs`, generates the article page, refreshes the CMS article area of `/blog/`, and updates the sitemap.
