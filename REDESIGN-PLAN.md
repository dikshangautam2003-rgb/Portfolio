# Dikshan Gautam — Final Redesign Plan

## Direction

**Editorial Search**: a warm, restrained personal website that feels like a premium publication rather than a SaaS dashboard or agency template.

### Theme
- Background: warm white / cream
- Text: charcoal / near-black
- Accent: restrained burnt orange
- Surfaces: white with fine neutral borders
- Dark charcoal reserved for footer and selected CTA moments
- No gold, neon, green, glassmorphism, or heavy gradients

### Typography
- DM Serif Display for editorial display headings
- Inter for navigation, body, metadata and UI
- Large headings with controlled measure
- Comfortable reading width for articles
- Smaller, quieter navigation and metadata

## Page architecture

### Home
1. SEO-first hero
2. Search visibility explanation
3. Four core services
4. SEO workflow
5. Search-to-page / website quality section
6. Education desk
7. Latest writing
8. Contact CTA

### Services
1. SEO services hero
2. Six service areas
3. SEO process
4. Contact CTA

### Education
1. Education/search-intent hero
2. Six education categories
3. Practical note
4. Related/latest writing area
5. Clear internal links

### Blog
1. Editorial hero
2. Featured article
3. Article archive
4. Writing philosophy
5. Individual article pages with featured media, metadata, readable prose and related CTA

### About
1. Personal SEO positioning
2. Search → technical foundation → useful content
3. Working principles
4. Education publishing
5. Contact CTA

### Contact
1. Clear project hero
2. Project facts
3. Lightweight enquiry form

## Interaction

- Compact sticky header
- Friendly orange hover/focus states
- Proper Education dropdown
- Responsive mobile navigation
- Small hover lifts, not exaggerated animations
- Scroll reveal only where it adds hierarchy
- `prefers-reduced-motion` support
- Keyboard-visible focus states

## SEO preservation

The redesign does not change:
- Existing public URLs
- Canonical URLs
- Existing page titles/descriptions
- JSON-LD structured data
- Breadcrumb hierarchy
- Blog/education content architecture
- Sitemap/robots
- CMS source folders
- GitHub Actions deployment

CMS-generated articles use the same visual system and can use featured images for article cards and social metadata.

## Content principles

SEO remains the primary business positioning. The homepage centers on:

**SEO Specialist in Nepal Helping Businesses Rank Higher on Google**

Core services:
- Search Engine Optimization
- Website Development
- Website Content Writing
- Video Editing

SEO topics remain technical SEO, on-page SEO, local SEO, keyword research, Search Console and useful content.

Education remains focused on Nepali students:
- +2 / NEB
- Bachelor's
- Courses
- Study Abroad
- Admissions
- Scholarships

The blog remains practical and editorial, not generic marketing content.

## Research-informed principles

The redesign follows Google's current Search guidance: preserve crawlable/indexable content, meaningful titles/descriptions, semantic structure and appropriate structured data; Google notes that structured data helps it understand page content, while Article and Breadcrumb markup are supported search features. The implementation also keeps accessibility and responsive behavior central, including keyboard focus, semantic HTML, color contrast, typography and reduced-motion support.

External references:
- Google Search Central: Search appearance and structured data
- Google Search Central: Article structured data
- Google Search Central: Breadcrumb structured data
- web.dev: Accessibility
- Awwwards design guidance: typography, content architecture, navigation, mobile legibility and restrained interaction
