# Dikshan Gautam — Final Editorial Redesign Plan

## Design direction

The site is built around a single **Editorial Search** system:
- warm white / cream backgrounds
- charcoal typography
- restrained burnt-orange accent
- DM Serif Display for editorial headings
- Inter for navigation and body copy
- thin borders and light elevation instead of hard shadows
- selective imagery rather than image-heavy sections

## Hero system

All heroes now use a background photograph with a soft cream overlay so the image blends into the page instead of fighting the headline.

H1s are deliberately smaller and calmer than the previous version, with strong editorial line-height and a maximum reading width.

## Navigation

The navigation was rebuilt visually while preserving the same URLs:
- Home
- Services
- Education
- Blog
- About
- Contact
- Let's Talk

Education has a proper desktop dropdown and a collapsible mobile submenu. Hover, focus and active states use the orange accent without turning the navigation into a loud component.

## Blog

The blog is treated as an editorial archive rather than a generic SaaS grid.

Every article uses the same card dimensions and the same visual hierarchy:
1. featured image
2. category
3. article title
4. concise description
5. read action

The four existing article URLs remain intact. CMS-generated articles are also given the same card system.

## Education

The education section now follows a decision-led content model.

### Education landing page
- Hero
- Featured courses
- Featured colleges / degree research
- Featured study-abroad destinations
- Featured admissions / consultancy checklist
- Six education categories
- Practical verification note

### Education sub-pages
Each sub-page now follows:
- hero
- featured resources first
- deeper guide sections
- related education paths
- verification note

Featured content is intentionally useful rather than presented as unsupported rankings or guarantees.

## SEO preservation

Existing SEO architecture remains in place:
- page URLs
- canonical URLs
- meta descriptions
- Open Graph metadata
- sitemap
- robots.txt
- semantic headings
- BreadcrumbList structured data
- BlogPosting / Article structured data on generated content
- CMS Markdown locations
- GitHub Actions deployment workflow

CMS-generated pages now use `style-premium.css` as well, so new articles do not fall back to the old visual system.

## Research references

Google Search Central recommends using structured data to help Google understand page content, including Article and Breadcrumb markup, and recommends validating structured data and keeping a sitemap submitted in Search Console.

Webflow's current education-site examples consistently use clear program/destination directories, dedicated detail pages, CMS-ready content structures, and responsive editorial layouts. These principles informed the education information architecture here.

## Technical constraint

The site remains a static HTML/CSS/JS website suitable for GitHub Pages. The redesign does not require a server, database, or runtime framework.
