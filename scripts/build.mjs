import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const SITE_URL = 'https://dikshangautam.com.np';

const esc = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const inline = (text = '') => {
  let s = esc(text);
  s = s.replace(/!\[([^\]]*)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)/g, (_, alt, url, title) => `<img src="${esc(url)}" alt="${alt}"${title ? ` title="${esc(title)}"` : ''} loading="lazy">`);
  s = s.replace(/\[([^\]]+)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)/g, (_, label, url, title) => `<a href="${esc(url)}"${title ? ` title="${esc(title)}"` : ''}>${label}</a>`);
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  s = s.replace(/_([^_]+)_/g, '<em>$1</em>');
  return s;
};

function parseFrontmatter(raw) {
  const normalized = raw.replace(/^\uFEFF/, '').replaceAll('\r\n', '\n');
  if (!normalized.startsWith('---\n')) return { data: {}, body: normalized };
  const end = normalized.indexOf('\n---\n', 4);
  if (end < 0) return { data: {}, body: normalized };
  const front = normalized.slice(4, end).split('\n');
  const data = {};
  let currentObject = null;
  let currentArray = null;
  for (const line of front) {
    if (!line.trim()) continue;
    const m = line.match(/^(\s*)([^:#]+):\s*(.*)$/);
    if (!m) continue;
    const [, indent, keyRaw, valueRaw] = m;
    const key = keyRaw.trim();
    const value = valueRaw.trim();
    if (indent.length === 0) {
      currentObject = null;
      currentArray = null;
      if (value === '') {
        data[key] = {};
        currentObject = data[key];
      } else if (value.startsWith('[') && value.endsWith(']')) {
        data[key] = value.slice(1, -1).split(',').map(v => v.trim()).filter(Boolean).map(v => v.replace(/^['"]|['"]$/g, ''));
      } else {
        data[key] = value.replace(/^['"]|['"]$/g, '');
      }
    } else if (indent.length >= 2 && currentObject) {
      currentObject[key] = value.replace(/^['"]|['"]$/g, '');
    }
  }
  return { data, body: normalized.slice(end + 5).trim() };
}

function markdownToHtml(markdown) {
  const lines = markdown.replaceAll('\r\n', '\n').split('\n');
  let html = '';
  let i = 0;
  let inUl = false;
  let inOl = false;
  let inCode = false;
  let code = [];

  const closeLists = () => {
    if (inUl) { html += '</ul>'; inUl = false; }
    if (inOl) { html += '</ol>'; inOl = false; }
  };

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('```')) {
      if (!inCode) {
        closeLists();
        inCode = true;
        code = [];
      } else {
        html += `<pre><code>${esc(code.join('\n'))}</code></pre>`;
        inCode = false;
      }
      i += 1;
      continue;
    }
    if (inCode) { code.push(line); i += 1; continue; }

    if (!line.trim()) { closeLists(); i += 1; continue; }
    if (/^###\s+/.test(line)) { closeLists(); html += `<h3>${inline(line.replace(/^###\s+/, ''))}</h3>`; i += 1; continue; }
    if (/^##\s+/.test(line)) { closeLists(); html += `<h2>${inline(line.replace(/^##\s+/, ''))}</h2>`; i += 1; continue; }
    if (/^#\s+/.test(line)) { closeLists(); html += `<h2>${inline(line.replace(/^#\s+/, ''))}</h2>`; i += 1; continue; }
    if (/^>\s?/.test(line)) {
      closeLists();
      const quote = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quote.push(inline(lines[i].replace(/^>\s?/, '')));
        i += 1;
      }
      html += `<blockquote><p>${quote.join('<br>')}</p></blockquote>`;
      continue;
    }
    const ul = line.match(/^\s*[-*]\s+(.+)$/);
    if (ul) {
      if (inOl) { html += '</ol>'; inOl = false; }
      if (!inUl) { html += '<ul>'; inUl = true; }
      html += `<li>${inline(ul[1])}</li>`;
      i += 1;
      continue;
    }
    const ol = line.match(/^\s*\d+[.)]\s+(.+)$/);
    if (ol) {
      if (inUl) { html += '</ul>'; inUl = false; }
      if (!inOl) { html += '<ol>'; inOl = true; }
      html += `<li>${inline(ol[1])}</li>`;
      i += 1;
      continue;
    }

    closeLists();
    const paragraph = [line];
    i += 1;
    while (i < lines.length && lines[i].trim() && !/^(#{1,3})\s+/.test(lines[i]) && !/^\s*[-*]\s+/.test(lines[i]) && !/^\s*\d+[.)]\s+/.test(lines[i]) && !/^>\s?/.test(lines[i]) && !lines[i].startsWith('```')) {
      paragraph.push(lines[i]);
      i += 1;
    }
    html += `<p>${inline(paragraph.join(' '))}</p>`;
  }
  closeLists();
  if (inCode) html += `<pre><code>${esc(code.join('\n'))}</code></pre>`;
  return html;
}

function readCollection(folder) {
  if (!fs.existsSync(folder)) return [];
  return fs.readdirSync(folder)
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const full = path.join(folder, name);
      const raw = fs.readFileSync(full, 'utf8');
      const parsed = parseFrontmatter(raw);
      const data = parsed.data;
      const slug = data.slug || name.replace(/\.md$/, '');
      return { ...data, slug, body: parsed.body, source: full };
    })
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')) || String(a.title || '').localeCompare(String(b.title || '')));
}

function heroImageFor(type, item) {
  if (item.featured_image) return item.featured_image;
  if (type === 'education') return "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2400&q=88";
  return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2400&q=88";
}

function tagList(type, item) {
  if (type === 'education') return [item.section, item.date].filter(Boolean);
  return [item.category, 'Practical guide', item.date].filter(Boolean);
}

function absoluteUrl(value = '') {
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith('/') ? value : '/' + value}`;
}

function siteHeader(type) {
  const blogActive = type === 'blog' ? ' active' : '';
  return `<header class="site-header"><div class="container header-inner">
<a class="brand" href="/"><img alt="Dikshan Gautam logo" src="/dikshan-mark.png"><span class="brand-word">Dikshan <em>Gautam</em></span></a>
<nav aria-label="Primary navigation" class="nav"><a href="/">Home</a><a href="/services/">Services</a><div class="dropdown"><button aria-expanded="false" aria-haspopup="true" type="button">Education <span>▾</span></button><div class="dropdown-panel"><a href="/education/plus-two-neb/">+2 / NEB</a><a href="/education/bachelors/">Bachelor's</a><a href="/education/courses/">Courses</a><a href="/education/study-abroad/">Study Abroad</a><a href="/education/admissions/">Admissions</a><a href="/education/scholarships/">Scholarships</a><a href="/education/">All education guides</a></div></div><a class="${blogActive}" href="/blog/">Blog</a><a href="/about/">About</a><a href="/contact/">Contact</a><a class="btn btn-primary header-cta" href="/contact/">Let's talk ↗</a></nav><button aria-expanded="false" aria-label="Open menu" class="menu-btn" type="button">Menu</button></div><div class="mobile-nav container"><a href="/">Home</a><a href="/services/">Services</a><div class="mobile-education"><button class="mobile-education-toggle" type="button" aria-expanded="false">Education <span>▾</span></button><div class="mobile-sub"><a href="/education/plus-two-neb/">+2 / NEB</a><a href="/education/bachelors/">Bachelor's</a><a href="/education/courses/">Courses</a><a href="/education/study-abroad/">Study Abroad</a><a href="/education/admissions/">Admissions</a><a href="/education/scholarships/">Scholarships</a><a href="/education/">All education guides</a></div></div><a href="/blog/">Blog</a><a href="/about/">About</a><a href="/contact/">Contact</a></div></header>`;
}

function siteFooter() {
  return `<footer class="site-footer"><div class="container footer-top"><div class="footer-brand"><a class="brand" href="/"><img alt="Dikshan Gautam logo" src="/dikshan-mark.png"><span class="brand-word" style="color:#fff">Dikshan <em>Gautam</em></span></a><p>SEO, websites, content and digital work for businesses in Nepal.</p></div><div class="footer-col"><div class="footer-label">Explore</div><a href="/services/">SEO services</a><a href="/about/">About</a><a href="/blog/">Blog</a><a href="/contact/">Contact</a></div><div class="footer-col"><div class="footer-label">Education</div><a href="/education/">Education guides</a><a href="/education/study-abroad/">Study abroad</a><a href="/education/bachelors/">Bachelor's</a><a href="/education/scholarships/">Scholarships</a></div><div class="footer-col"><div class="footer-label">Contact</div><a class="footer-mail" href="mailto:hello@dikshangautam.com.np">hello@dikshangautam.com.np</a><a href="/contact/" style="margin-top:14px">Start a project ↗</a></div></div><div class="container footer-bottom"><span>© <span data-year="">2026</span> Dikshan Gautam</span><span>Nepal · SEO · Websites · Content · Video</span></div></footer><script src="/js/site.js"></script>`;
}

function generatePage(type, item) {
  const slug = item.slug;
  const url = `${SITE_URL}/${type === 'blog' ? 'blog' : 'education'}/${slug}/`;
  const title = item.seo?.title || `${item.title} | Dikshan Gautam`;
  const description = item.seo?.description || item.description || '';
  const hero = heroImageFor(type, item);
  const imageUrl = absoluteUrl(item.featured_image || hero);
  const tags = tagList(type, item).map(tag => `<span>${esc(tag)}</span>`).join('');
  const bodyHtml = markdownToHtml(item.body || '');
  const breadcrumbName = type === 'blog' ? 'Blog' : 'Education';
  const jsonType = type === 'blog' ? 'BlogPosting' : 'Article';
  const schema = {
    '@context': 'https://schema.org',
    '@type': jsonType,
    headline: item.title,
    description,
    author: { '@type': 'Person', name: 'Dikshan Gautam', url: `${SITE_URL}/` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: item.date || undefined,
    image: imageUrl || undefined
  };
  Object.keys(schema).forEach(k => schema[k] === undefined && delete schema[k]);
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: breadcrumbName, item: `${SITE_URL}/${type === 'blog' ? 'blog' : 'education'}/` },
      { '@type': 'ListItem', position: 3, name: item.title, item: url }
    ]
  };
  const ogImage = imageUrl ? `<meta property="og:image" content="${esc(imageUrl)}">` : '';
  const articleHeading = type === 'blog' ? 'Read the article' : 'Guide';
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${esc(description)}"><title>${esc(title)}</title><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}"><meta property="og:type" content="${type === 'blog' ? 'article' : 'website'}">${ogImage}<link rel="canonical" href="${url}"><link rel="icon" href="/favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="/assets/style-premium.css"><script type="application/ld+json">${JSON.stringify(breadcrumbs)}</script><script type="application/ld+json">${JSON.stringify(schema)}</script></head><body><!-- CMS-GENERATED: ${type}/${slug} -->${siteHeader(type)}<main><section class="hero"><div class="hero-media" style="background-image:url('${esc(hero)}')"></div><div class="hero-overlay"></div><div class="container hero-content"><div class="kicker">${articleHeading}</div><h1>${inline(item.title)}</h1><p class="hero-lede">${inline(item.description || '')}</p><div class="article-meta">${tags}</div></div></section><section class="section"><div class="container"><div class="prose reveal">${bodyHtml}</div></div></section></main>${siteFooter()}</body></html>`;
}

function ensureGeneratedPage(type, item) {
  const base = type === 'blog' ? path.join(ROOT, 'blog', item.slug) : path.join(ROOT, 'education', item.slug);
  const target = path.join(base, 'index.html');
  fs.mkdirSync(base, { recursive: true });
  if (fs.existsSync(target)) {
    const existing = fs.readFileSync(target, 'utf8');
    if (!existing.includes(`<!-- CMS-GENERATED: ${type}/${item.slug} -->`)) {
      console.warn(`[CMS] Skipping ${target}: existing manual page is not CMS-generated.`,);
      return false;
    }
  }
  fs.writeFileSync(target, generatePage(type, item), 'utf8');
  return true;
}

function updateListing(filePath, startMarker, endMarker, cards) {
  let html = fs.readFileSync(filePath, 'utf8');
  const start = html.indexOf(startMarker);
  const end = html.indexOf(endMarker);
  if (start < 0 || end < start) {
    console.warn(`[CMS] Listing markers missing in ${filePath}`);
    return;
  }
  const block = `${startMarker}\n${cards}\n${endMarker}`;
  html = html.slice(0, start) + block + html.slice(end + endMarker.length);
  fs.writeFileSync(filePath, html, 'utf8');
}

const blog = readCollection(path.join(ROOT, 'content', 'blog'));
const education = readCollection(path.join(ROOT, 'content', 'education'));

for (const item of blog) ensureGeneratedPage('blog', item);
for (const item of education) ensureGeneratedPage('education', item);

function listingImage(type, item, index = 0) {
  if (item.featured_image) return item.featured_image;
  const blogFallbacks = [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=82',
    'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1200&q=82',
    'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=82',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=82'
  ];
  const eduFallbacks = [
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=82',
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=82',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=82',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=82'
  ];
  return (type === 'blog' ? blogFallbacks : eduFallbacks)[index % 4];
}

const blogCards = blog.filter(item => item.slug !== 'cms-check-2026').map((item, i) => `<a class="article reveal" href="/blog/${esc(item.slug)}/"><div class="article-media"><img loading="lazy" alt="${esc(item.title)}" src="${esc(listingImage('blog', item, i))}"></div><div class="article-body"><span class="cat">${esc(item.category || 'Article')}</span><h3>${esc(item.title)}</h3><p>${esc(item.description || '')}</p><span class="go">Read article ↗</span></div></a>`).join('\n');
updateListing(path.join(ROOT, 'blog', 'index.html'), '<!-- CMS_ARTICLES_START -->', '<!-- CMS_ARTICLES_END -->', blogCards);

const eduCards = education.map((item, i) => `<a class="feature-card reveal compact" href="/education/${esc(item.slug)}/"><div class="feature-media"><img loading="lazy" alt="${esc(item.title)}" src="${esc(listingImage('education', item, i))}"></div><div class="feature-body"><div class="feature-eyebrow">${esc(item.section || 'Guide')}</div><h3>${esc(item.title)}</h3><p>${esc(item.description || '')}</p><span class="feature-link">Open guide ↗</span></div></a>`).join('\n');
updateListing(path.join(ROOT, 'education', 'index.html'), '<!-- CMS_EDUCATION_START -->', '<!-- CMS_EDUCATION_END -->', eduCards);

const sitemapEntries = [
  ...blog.filter(item => item.slug !== 'cms-check-2026').map(item => `  <url><loc>${SITE_URL}/blog/${esc(item.slug)}/</loc></url>`),
  ...education.map(item => `  <url><loc>${SITE_URL}/education/${esc(item.slug)}/</loc></url>`)
].join('\n');
updateListing(path.join(ROOT, 'sitemap.xml'), '<!-- CMS_URLS_START -->', '<!-- CMS_URLS_END -->', sitemapEntries);

console.log(`[CMS] Build complete. Blog entries: ${blog.length}. Education entries: ${education.length}.`);
