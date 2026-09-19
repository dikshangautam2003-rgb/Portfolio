# Dikshan Gautam — CMS Guide (V6)

The website remains a static HTML/CSS/JS site deployed to GitHub Pages. Pages CMS is the publishing interface; GitHub Actions runs the build after each commit.

## One Education collection

Education now uses one collection:

`content/education/`

There is no separate `Education Featured Items` collection.

Every Education entry is a real page. Choose a section:

- Colleges & Universities
- Academic Courses
- Career Guidance
- Skill Courses
- Study Abroad Guide
- Consultancy

Choose a page type:

- Pillar / Section guide
- College / University
- Academic Course
- Career Guide
- Skill Course
- Study Destination
- Consultancy
- Education Guide

### Useful fields

- Title
- URL slug
- Section
- Page type
- Short description
- Published
- Publish date
- Featured image
- Official website / source (optional)
- Parent Education page slug (optional)
- Related Education slugs (optional, comma-separated)
- Related Blog slugs (optional, comma-separated)
- SEO title
- Meta description
- Page content

A page such as `BBM in Nepal` in `Academic Courses` becomes:

`/education/academic-courses/bbm/`

A consultancy profile becomes a first-party Education page too. Its official website can be linked from the page without redirecting the visitor away from the Education page.

## Education sections

The six section URLs are:

- `/education/colleges-universities/`
- `/education/academic-courses/`
- `/education/career-guidance/`
- `/education/skill-courses/`
- `/education/study-abroad-guide/`
- `/education/consultancy/`

The section pages act as pillar/archive pages. New CMS entries are automatically grouped into the correct section.

## Blog

Blog uses one collection:

`content/blog/`

Fields:

- Article title
- URL slug
- Short description
- Category
- Publish date
- Published
- Featured image
- SEO title + description
- Article body

The build generates the article page, blog archive and sitemap entry.

## Relationships

Use `Parent Education page slug` when an Education page belongs under another Education page.

Use `Related Education slugs` to connect supporting Education pages.

Use `Related Blog slugs` to connect supporting Blog articles.

These are comma-separated slugs, for example:

`bbm,bba,bca`

The generated page will show the relationships automatically.

## Publishing behavior

Pages CMS commits changes to GitHub `main`.

GitHub Actions then runs:

`node scripts/build.mjs`

The build generates Education pages, Education section pages, Blog pages, archives, shared navigation, homepage Education/Blog modules and the sitemap.

Unpublished CMS entries are not generated or listed.

## Legacy Education URLs

Older Education section URLs are retained as lightweight redirects so existing links can move to the new architecture without remaining visible in navigation.

Do not manually recreate the old Education collections. Use the single `Education` collection.
