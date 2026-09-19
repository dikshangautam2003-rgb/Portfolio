# Dikshan Gautam — Education + Blog V6 Redesign Plan

## Goal

Keep the finished editorial website design and SEO architecture, while replacing the confusing Education CMS with one SEO-article publishing system.

## Education architecture

One CMS collection:

`content/education/`

Six subsections:

1. Colleges & Universities
2. Academic Courses
3. Career Guidance
4. Skill Courses
5. Study Abroad Guide
6. Consultancy

Every Education entry is a real page with its own slug, content, metadata and canonical URL.

Examples:

- `/education/academic-courses/bbm/`
- `/education/skill-courses/digital-marketing/`
- `/education/consultancy/kiec-consultancy-profile/`

Section pages act as pillar/archive pages.

## Blog architecture

One CMS collection:

`content/blog/`

Every published article gets a generated article page, appears in the archive and is added to the sitemap.

## Relationships

Education pages can point to:

- parent Education pages
- related Education pages
- related Blog articles
- official external sources

This supports pillar → supporting page → article topic clusters without forcing Education content to redirect to Blog.

## SEO preservation

Preserve:

- canonical URLs
- SEO title and meta description fields
- Open Graph metadata
- sitemap
- robots.txt
- BreadcrumbList structured data
- Article / BlogPosting structured data
- semantic headings
- clean slugs
- GitHub Pages deployment

## Migration

Existing Education Featured Items are migrated into the single Education collection.

Old visible Education categories such as:

- +2 / NEB
- Bachelor's
- Courses
- Admissions
- Scholarships
- the old Study Abroad path

are removed from the visible information architecture.

Their older public URLs remain as lightweight redirects to the new Education structure where appropriate.

The previous `content/education-items/` collection is removed.

## Publishing workflow

Pages CMS → GitHub `main` → GitHub Actions → `scripts/build.mjs` → generated static HTML → GitHub Pages.

The build also synchronizes the shared Education navigation and homepage modules, so CMS publishing does not require manual HTML editing.

## Next phase

The universal Education detail template is now in place.

The next design phase can create more specialized templates for:

- College / University
- Academic Course
- Career Guide
- Skill Course
- Study Destination
- Consultancy
- Pillar / Section guide
