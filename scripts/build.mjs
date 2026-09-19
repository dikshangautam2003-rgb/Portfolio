import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const SITE_URL = 'https://dikshangautam.com.np';

const SECTION_CONFIG = [
  {
    slug: 'colleges-universities',
    name: 'Colleges & Universities',
    kicker: 'Institutions',
    title: 'Colleges & universities in Nepal.',
    description: 'Research +2 institutions and bachelor colleges and universities before you shortlist where to study.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2400&q=88'
  },
  {
    slug: 'academic-courses',
    name: 'Academic Courses',
    kicker: 'Courses',
    title: 'Academic courses in Nepal.',
    description: 'Research +2 streams and bachelor courses with clear information about subjects, course structure and next steps.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2400&q=88'
  },
  {
    slug: 'career-guidance',
    name: 'Career Guidance',
    kicker: 'Direction',
    title: 'Career guidance for Nepali students.',
    description: 'Research subjects, courses, skills and realistic next steps before choosing a career direction.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=2400&q=88'
  },
  {
    slug: 'skill-courses',
    name: 'Skill Courses',
    kicker: 'Skills',
    title: 'Skill courses for practical learning.',
    description: 'Find practical learning paths for Python, web development, data, digital marketing, design and creative skills.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2400&q=88'
  },
  {
    slug: 'study-abroad-guide',
    name: 'Study Abroad Guide',
    kicker: 'Destinations',
    title: 'Study abroad guides for Nepali students.',
    description: 'Research destinations, applications, finances and requirements carefully, then verify current details with official sources.',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=2400&q=88'
  },
  {
    slug: 'consultancy',
    name: 'Consultancy',
    kicker: 'Research',
    title: 'Education consultancy profiles to research.',
    description: 'Independent profiles that organize what a consultancy says it offers, with official links so you can verify current information yourself.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=88'
  }
];

const LEGACY_REDIRECTS = {
  'plus-two-neb': '/education/academic-courses/',
  'bachelors': '/education/academic-courses/',
  'courses': '/education/academic-courses/',
  'study-abroad': '/education/study-abroad-guide/',
  'admissions': '/education/',
  'scholarships': '/education/'
};

const esc = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const inline = (text = '') => {
  let s = esc(text);
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g, (_, alt, url, title) =>
    `<img src="${esc(url)}" alt="${esc(alt)}"${title ? ` title="${esc(title)}"` : ''} loading="lazy">`);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g, (_, label, url, title) =>
    `<a href="${esc(url)}"${title ? ` title="${esc(title)}"` : ''}>${label}</a>`);
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return s;
};

function parseFrontmatter(raw) {
  const normalized = raw.replace(/^\uFEFF/, '').replaceAll('\r\n', '\n');
  if (!normalized.startsWith('---\n')) return { data: {}, body: normalized };
  const end = normalized.indexOf('\n---\n', 4);
  if (end < 0) return { data: {}, body: normalized };
  const lines = normalized.slice(4, end).split('\n');
  const data = {};
  let objectKey = null;
  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const m = line.match(/^(\s*)([^:]+):\s*(.*)$/);
    if (!m) continue;
    const [, indent, keyRaw, valueRaw] = m;
    const key = keyRaw.trim();
    const value = valueRaw.trim();
    if (indent.length === 0) {
      objectKey = null;
      if (!value) {
        data[key] = {};
        objectKey = key;
      } else if (value.startsWith('[') && value.endsWith(']')) {
        data[key] = value.slice(1, -1).split(',').map(v => v.trim()).filter(Boolean).map(v => v.replace(/^['"]|['"]$/g, ''));
      } else {
        data[key] = value.replace(/^['"]|['"]$/g, '');
      }
    } else if (indent.length >= 2 && objectKey && data[objectKey] && typeof data[objectKey] === 'object') {
      data[objectKey][key] = value.replace(/^['"]|['"]$/g, '');
    }
  }
  return { data, body: normalized.slice(end + 5).trim() };
}

function markdownToHtml(markdown = '') {
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

    if (/^###\s+/.test(line)) {
      closeLists();
      html += `<h3>${inline(line.replace(/^###\s+/, ''))}</h3>`;
      i += 1; continue;
    }
    if (/^##\s+/.test(line)) {
      closeLists();
      html += `<h2>${inline(line.replace(/^##\s+/, ''))}</h2>`;
      i += 1; continue;
    }
    if (/^#\s+/.test(line)) {
      closeLists();
      html += `<h2>${inline(line.replace(/^#\s+/, ''))}</h2>`;
      i += 1; continue;
    }
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
      i += 1; continue;
    }

    const ol = line.match(/^\s*\d+[.)]\s+(.+)$/);
    if (ol) {
      if (inUl) { html += '</ul>'; inUl = false; }
      if (!inOl) { html += '<ol>'; inOl = true; }
      html += `<li>${inline(ol[1])}</li>`;
      i += 1; continue;
    }

    closeLists();
    const paragraph = [line];
    i += 1;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,3})\s+/.test(lines[i]) &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+[.)]\s+/.test(lines[i]) &&
      !/^>\s?/.test(lines[i]) &&
      !lines[i].startsWith('```')
    ) {
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
      const parsed = parseFrontmatter(fs.readFileSync(full, 'utf8'));
      return {
        ...parsed.data,
        slug: parsed.data.slug || name.replace(/\.md$/, ''),
        body: parsed.body,
        source: full
      };
    })
    .filter(item => String(item.published ?? 'true').toLowerCase() !== 'false')
    .sort((a, b) =>
      String(b.date || '').localeCompare(String(a.date || '')) ||
      String(a.title || '').localeCompare(String(b.title || ''))
    );
}

function absoluteUrl(value = '') {
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith('/') ? value : '/' + value}`;
}

function slugList(value = '') {
  return String(value).split(',').map(v => v.trim()).filter(Boolean);
}

function sectionByName(name) {
  return SECTION_CONFIG.find(s => s.name === name) || SECTION_CONFIG[0];
}

function pageUrl(item) {
  const section = sectionByName(item.section);
  return `/education/${section.slug}/${item.slug}/`;
}

function imageFor(item, fallback) {
  return item.featured_image || fallback;
}

function siteHeader(active = '') {
  const educationActive = active === 'education' ? ' active' : '';
  const blogActive = active === 'blog' ? ' active' : '';
  return `<header class="site-header">
<div class="container header-inner">
<a class="brand" href="/"><img alt="Dikshan Gautam logo" src="/dikshan-mark.png"/><span class="brand-word">Dikshan <em>Gautam</em></span></a>
<nav aria-label="Primary navigation" class="nav">
<a href="/">Home</a><a href="/services/">Services</a>
<div class="dropdown"><button class="${educationActive.trim()}" aria-expanded="false" aria-haspopup="true" type="button">Education <span>▾</span></button>
<div class="dropdown-panel">
${SECTION_CONFIG.map(s => `<a href="/education/${s.slug}/">${esc(s.name)}</a>`).join('')}
<a href="/education/">Education home</a>
</div></div>
<a class="${blogActive}" href="/blog/">Blog</a><a href="/about/">About</a><a href="/contact/">Contact</a>
<a class="btn btn-primary header-cta" href="/contact/">Let's talk ↗</a>
</nav>
<button aria-expanded="false" aria-label="Open menu" class="menu-btn" type="button">Menu</button>
</div>
<div class="mobile-nav container">
<a href="/">Home</a><a href="/services/">Services</a>
<div class="mobile-education"><button class="mobile-education-toggle" type="button" aria-expanded="false">Education <span>▾</span></button>
<div class="mobile-sub">
${SECTION_CONFIG.map(s => `<a href="/education/${s.slug}/">${esc(s.name)}</a>`).join('')}
<a href="/education/">Education home</a>
</div></div>
<a href="/blog/">Blog</a><a href="/about/">About</a><a href="/contact/">Contact</a>
</div></header>`;
}

function siteFooter() {
  return `<footer class="site-footer"><div class="container footer-top">
<div class="footer-brand"><a class="brand" href="/"><img alt="Dikshan Gautam logo" src="/dikshan-mark.png"/><span class="brand-word" style="color:#fff">Dikshan <em>Gautam</em></span></a><p>SEO, websites, content and digital work for businesses in Nepal.</p></div>
<div class="footer-col"><div class="footer-label">Explore</div><a href="/services/">SEO services</a><a href="/about/">About</a><a href="/blog/">Blog</a><a href="/contact/">Contact</a></div>
<div class="footer-col"><div class="footer-label">Education</div>
${SECTION_CONFIG.map(s => `<a href="/education/${s.slug}/">${esc(s.name)}</a>`).join('')}
</div>
<div class="footer-col"><div class="footer-label">Contact</div><a class="footer-mail" href="mailto:hello@dikshangautam.com.np">hello@dikshangautam.com.np</a><a href="/contact/" style="margin-top:14px">Start a project ↗</a></div>
</div><div class="container footer-bottom"><span>© <span data-year="">2026</span> Dikshan Gautam</span><span>Nepal · SEO · Websites · Content · Video</span></div></footer><script src="/js/site.js"></script>`;
}

function head({title, description, url, type='website', image='', schemas=[]}) {
  const ogImage = image ? `<meta property="og:image" content="${esc(absoluteUrl(image))}">` : '';
  return `<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${esc(description)}"><title>${esc(title)}</title><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${esc(url)}"><meta property="og:type" content="${type}">${ogImage}<link rel="canonical" href="${esc(url)}"><link rel="icon" href="/favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&family=Source+Serif+4:wght@400;500;600&display=swap" rel="stylesheet"><link rel="stylesheet" href="/assets/style-premium.css">${schemas.map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('')}</head>`;
}

function breadcrumbs(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((x, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: x.name,
      item: absoluteUrl(x.url)
    }))
  };
}

function educationSchema(item, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: item.title,
    description: item.description || '',
    author: { '@type': 'Person', name: 'Dikshan Gautam', url: SITE_URL + '/' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    ...(item.date ? { datePublished: item.date } : {}),
    ...(item.featured_image ? { image: absoluteUrl(item.featured_image) } : {})
  };
}

function blogSchema(item, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: item.title,
    description: item.description || '',
    author: { '@type': 'Person', name: 'Dikshan Gautam', url: SITE_URL + '/' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    ...(item.date ? { datePublished: item.date } : {}),
    ...(item.featured_image ? { image: absoluteUrl(item.featured_image) } : {})
  };
}

function articleMeta(item) {
  return [item.page_type, item.section, item.date].filter(Boolean).map(v => `<span>${esc(v)}</span>`).join('');
}

function educationDetail(item, allEducation, allBlog) {
  const section = sectionByName(item.section);
  const url = absoluteUrl(pageUrl(item));
  const title = item.seo?.title || `${item.title} | Dikshan Gautam`;
  const description = item.seo?.description || item.description || '';
  const hero = imageFor(item, section.image);
  const relatedEdu = slugList(item.related_education).map(slug => allEducation.find(x => x.slug === slug)).filter(Boolean);
  const relatedBlog = slugList(item.related_blog).map(slug => allBlog.find(x => x.slug === slug)).filter(Boolean);
  const parent = allEducation.find(x => x.slug === item.parent_slug);
  const relatedAuto = relatedEdu.length ? relatedEdu : allEducation.filter(x => x.section === item.section && x.slug !== item.slug).slice(0, 3);
  const blogAuto = relatedBlog.length ? relatedBlog : allBlog.filter(x => x.category === 'Education').slice(0, 3);

  const schemas = [
    breadcrumbs([
      {name:'Home',url:'/'},
      {name:'Education',url:'/education/'},
      {name:section.name,url:`/education/${section.slug}/`},
      {name:item.title,url:pageUrl(item)}
    ]),
    educationSchema(item, url)
  ];

  const official = item.official_url
    ? `<div class="edu-official"><span>Official source</span><a href="${esc(item.official_url)}" target="_blank" rel="noopener">${esc(item.official_url)}</a></div>`
    : '';

  const related = relatedAuto.length ? `<section class="section section-alt"><div class="container"><div class="section-head"><div><div class="kicker">Related education</div><h2>Continue your research.</h2></div><p>More pages in ${esc(section.name.toLowerCase())}.</p></div><div class="grid-3">${relatedAuto.map(x => `<a class="edu-resource" href="${pageUrl(x)}"><div class="resource-body"><span class="resource-type">${esc(x.page_type || 'Education')}</span><h3>${esc(x.title)}</h3><p>${esc(x.description || '')}</p><span class="resource-link">Open guide ↗</span></div></a>`).join('')}</div></div></section>` : '';

  const blogLinks = blogAuto.length ? `<section class="section"><div class="container"><div class="section-head"><div><div class="kicker">From the blog</div><h2>Related reading.</h2></div><p>Supporting articles that can help with the wider decision.</p></div><div class="grid-3">${blogAuto.map(x => `<a class="article" href="/blog/${x.slug}/"><div class="article-body"><span class="cat">${esc(x.category || 'Article')}</span><h3>${esc(x.title)}</h3><p>${esc(x.description || '')}</p><span class="go">Read article ↗</span></div></a>`).join('')}</div></div></section>` : '';

  return `<!doctype html><html lang="en">${head({title,description,url,image:hero,schemas})}<body>
<!-- CMS-GENERATED: education/${esc(item.slug)} -->
${siteHeader('education')}
<main>
<section class="hero"><div class="hero-media" style="background-image:url('${esc(hero)}')"></div><div class="hero-overlay"></div><div class="container hero-content">
<div class="kicker">${esc(section.name)}${item.page_type ? ` · ${esc(item.page_type)}` : ''}</div>
<h1>${inline(item.title)}</h1><p class="hero-lede">${inline(item.description || '')}</p><div class="article-meta">${articleMeta(item)}</div>
</div></section>
<section class="section"><div class="container education-article-layout"><article class="prose reveal">${markdownToHtml(item.body || '')}</article><aside class="education-aside"><div class="aside-label">Research path</div><a href="/education/${section.slug}/">${esc(section.name)} ↗</a>${parent ? `<div class="aside-label">Parent guide</div><a href="${pageUrl(parent)}">${esc(parent.title)} ↗</a>` : ''}${official}</aside></div></section>
${related}${blogLinks}
<section class="section section-alt"><div class="container"><div class="cta-panel reveal"><div><div class="kicker">Keep researching</div><h2>Need another education topic?</h2></div><div><p>Browse the wider Education desk or read supporting articles on the blog.</p><a class="btn btn-orange" href="/education/">Explore Education ↗</a></div></div></div></section>
</main>${siteFooter()}</body></html>`;
}

function card(item, section) {
  const image = imageFor(item, section.image);
  return `<a class="feature-card reveal" href="${pageUrl(item)}"><div class="feature-media"><img loading="lazy" alt="${esc(item.title)}" src="${esc(image)}"></div><div class="feature-body"><div class="feature-eyebrow">${esc(item.page_type || section.name)}</div><h3>${esc(item.title)}</h3><p>${esc(item.description || '')}</p><span class="feature-link">Open page ↗</span></div></a>`;
}

function educationSectionPage(section, items) {
  const url = absoluteUrl(`/education/${section.slug}/`);
  const schemas = [
    breadcrumbs([{name:'Home',url:'/'},{name:'Education',url:'/education/'},{name:section.name,url:`/education/${section.slug}/`}]),
    {'@context':'https://schema.org','@type':'CollectionPage','name':section.title,'description':section.description,'url':url}
  ];
  const cards = items.map(item => card(item, section)).join('\n');
  return `<!doctype html><html lang="en">${head({title:`${section.title} | Dikshan Gautam`,description:section.description,url,image:section.image,schemas})}<body>
<!-- SITE-GENERATED: education-section/${section.slug} -->
${siteHeader('education')}
<main>
<section class="hero"><div class="hero-media" style="background-image:url('${esc(section.image)}')"></div><div class="hero-overlay"></div><div class="container hero-content">
<div class="kicker">${esc(section.kicker)} · Education</div><h1>${esc(section.title)}</h1><p class="hero-lede">${esc(section.description)}</p>
<div class="hero-actions"><a class="btn btn-primary" href="#education-list">Browse pages ↗</a><a class="btn btn-light" href="/education/">All Education</a></div>
</div></section>
<section class="section" id="education-list"><div class="container">
<div class="section-head"><div><div class="kicker">Education desk</div><h2>Research pages, not just cards.</h2></div><p>Every entry below is a full Education page. Add or update one through Pages CMS and the build will place it here automatically.</p></div>
<div class="grid-3 cms-generated-grid">${cards || '<div class="empty-state"><h3>No published pages yet.</h3><p>Create the first page for this section in Pages CMS.</p></div>'}</div>
</div></section>
<section class="section section-alt"><div class="container"><div class="cta-panel"><div><div class="kicker">Need another topic?</div><h2>Explore the wider Education desk.</h2></div><div><p>Move between institutions, courses, careers, skills, destinations and consultancy research.</p><a class="btn btn-orange" href="/education/">View Education ↗</a></div></div></div></section>
</main>${siteFooter()}</body></html>`;
}

function educationHomePage(allEducation) {
  const url = absoluteUrl('/education/');
  const schemas=[breadcrumbs([{name:'Home',url:'/'},{name:'Education',url:'/education/'}]),{'@context':'https://schema.org','@type':'CollectionPage','name':'Education | Dikshan Gautam','description':'Practical education research pages for Nepali students.','url':url}];
  const sectionCards=SECTION_CONFIG.map((s,i)=>`<a class="feature-card reveal" href="/education/${s.slug}/"><div class="feature-media"><img loading="lazy" alt="${esc(s.name)}" src="${esc(s.image)}"></div><div class="feature-body"><div class="feature-eyebrow">0${i+1} · ${esc(s.kicker)}</div><h3>${esc(s.name)}</h3><p>${esc(s.description)}</p><span class="feature-link">Explore section ↗</span></div></a>`).join('\n');
  const latest=allEducation.slice(0,6).map(x=>card(x,sectionByName(x.section))).join('\n');
  return `<!doctype html><html lang="en">${head({title:'Education Research for Nepali Students | Dikshan Gautam',description:'Research colleges, courses, careers, skills, study abroad destinations and education consultancies through practical SEO-focused guides for Nepali students.',url,image:SECTION_CONFIG[1].image,schemas})}<body>
<!-- SITE-GENERATED: education-home -->
${siteHeader('education')}
<main>
<section class="hero"><div class="hero-media" style="background-image:url('${esc(SECTION_CONFIG[1].image)}')"></div><div class="hero-overlay"></div><div class="container hero-content">
<div class="kicker">Education desk · Nepal</div><h1>Education research, organized around the decision.</h1><p class="hero-lede">Find practical pages about colleges, academic courses, careers, skills, study abroad and education consultancies — with the important details kept in one place.</p>
<div class="hero-actions"><a class="btn btn-primary" href="#sections">Explore Education ↗</a><a class="btn btn-light" href="/blog/">Read the blog</a></div>
</div></section>
<section class="section" id="sections"><div class="container"><div class="section-head"><div><div class="kicker">One Education system</div><h2>Six sections. One publishing model.</h2></div><p>Every page is created through the same CMS collection. Sections organize the research; they do not create separate content systems.</p></div><div class="education-grid-v3">${sectionCards}</div></div></section>
<section class="section section-alt"><div class="container"><div class="section-head"><div><div class="kicker">Latest Education pages</div><h2>Start with a specific question.</h2></div><p>New Education pages published through Pages CMS appear here automatically.</p></div><div class="grid-3">${latest || '<div class="empty-state"><h3>No published Education pages yet.</h3><p>Create your first page in Pages CMS.</p></div>'}</div></div></section>
<section class="section"><div class="container"><div class="split"><div><div class="kicker">How to use the desk</div><h2>Choose a section, then follow the page trail.</h2></div><div><p class="lead">A course page can point to colleges. A college page can point to courses. A destination can point to consultancies and supporting articles. The CMS fields make those relationships explicit without forcing every page to link to a blog post.</p><div class="rule-note"><b>01</b><span>Page → related Education → supporting Blog article</span></div></div></div></div></section>
</main>${siteFooter()}</body></html>`;
}

function blogDetail(item) {
  const url=absoluteUrl(`/blog/${item.slug}/`);
  const title=item.seo?.title || `${item.title} | Dikshan Gautam`;
  const description=item.seo?.description || item.description || '';
  const hero=item.featured_image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=2400&q=88';
  const schemas=[breadcrumbs([{name:'Home',url:'/'},{name:'Blog',url:'/blog/'},{name:item.title,url:`/blog/${item.slug}/` }]),blogSchema(item,url)];
  return `<!doctype html><html lang="en">${head({title,description,url,type:'article',image:hero,schemas})}<body>
<!-- CMS-GENERATED: blog/${esc(item.slug)} -->
${siteHeader('blog')}
<main>
<section class="hero"><div class="hero-media" style="background-image:url('${esc(hero)}')"></div><div class="hero-overlay"></div><div class="container hero-content">
<div class="kicker">Journal · ${esc(item.category || 'Article')}</div><h1>${inline(item.title)}</h1><p class="hero-lede">${inline(item.description || '')}</p><div class="article-meta">${item.category ? `<span>${esc(item.category)}</span>` : ''}${item.date ? `<span>${esc(item.date)}</span>` : ''}</div>
</div></section>
<section class="section"><div class="container"><article class="prose reveal">${markdownToHtml(item.body || '')}</article></div></section>
<section class="section section-alt"><div class="container"><div class="cta-panel"><div><div class="kicker">Keep reading</div><h2>Explore more notes.</h2></div><div><p>Read the wider journal or move into the Education desk for longer research pages.</p><a class="btn btn-orange" href="/blog/">Back to blog ↗</a></div></div></div></section>
</main>${siteFooter()}</body></html>`;
}

function blogArchivePage(allBlog) {
  const url=absoluteUrl('/blog/');
  const schemas=[breadcrumbs([{name:'Home',url:'/'},{name:'Blog',url:'/blog/'}])];
  const cards=allBlog.map((item,i)=>`<a class="article reveal" href="/blog/${item.slug}/"><div class="article-media"><img loading="lazy" alt="${esc(item.title)}" src="${esc(item.featured_image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=82')}"></div><div class="article-body"><span class="cat">${esc(item.category || 'Article')}</span><h2>${esc(item.title)}</h2><p>${esc(item.description || '')}</p><span class="go">Read article ↗</span></div></a>`).join('\n');
  return `<!doctype html><html lang="en">${head({title:'SEO, Website & Digital Marketing Insights | Dikshan Gautam',description:'Practical SEO, website and digital marketing insights by Dikshan Gautam, written to help readers understand search, websites, content and education research.',url,schemas})}<body>
<!-- SITE-GENERATED: blog-archive -->
${siteHeader('blog')}
<main class="blog-archive">
<section class="hero"><div class="hero-media" style="background-image:url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=2400&q=88')"></div><div class="hero-overlay"></div><div class="container hero-content">
<div class="kicker">Journal · SEO · Web · Content</div><h1>Useful notes for search, websites and digital work.</h1><p class="hero-lede">Practical articles designed to answer the next question, explain the system behind the page and give you something useful to apply.</p>
<div class="hero-tags"><span>Search</span><span>Websites</span><span>Content</span><span>Education</span></div></div></section>
<section class="section"><div class="container"><div class="section-head"><div><div class="kicker">Latest writing</div><h2>A simple archive, built for useful reading.</h2></div><p>Every article is managed from the same Pages CMS collection, with its own slug, featured image, content and SEO fields.</p></div>
<div class="grid-2 blog-grid cms-generated-grid">${cards || '<div class="empty-state"><h3>No published articles yet.</h3><p>Create the first article in Pages CMS.</p></div>'}</div></div></section>
</main>${siteFooter()}</body></html>`;
}

function legacyRedirect(slug,target) {
  const url=absoluteUrl(`/education/${slug}/`);
  const dest=absoluteUrl(target);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,follow"><meta http-equiv="refresh" content="0;url=${esc(dest)}"><link rel="canonical" href="${esc(dest)}"><title>Moving to Education | Dikshan Gautam</title></head><body><!-- SITE-GENERATED: legacy-redirect/${slug} --><p>This Education section has moved. <a href="${esc(dest)}">Continue to the Education desk</a>.</p><script>location.replace(${JSON.stringify(dest)});</script></body></html>`;
}

function writeFile(file, content) {
  fs.mkdirSync(path.dirname(file), {recursive:true});
  fs.writeFileSync(file,content,'utf8');
}

function removeGeneratedDetailPages(root, markerPrefix, keepSlugs) {
  if (!fs.existsSync(root)) return;
  for (const dir of fs.readdirSync(root,{withFileTypes:true})) {
    if (!dir.isDirectory()) continue;
    const idx=path.join(root,dir.name,'index.html');
    if (!fs.existsSync(idx)) continue;
    const html=fs.readFileSync(idx,'utf8');
    if (html.includes(`<!-- CMS-GENERATED: ${markerPrefix}/${dir.name} -->`) && !keepSlugs.has(dir.name)) {
      fs.rmSync(path.join(root,dir.name),{recursive:true,force:true});
    }
  }
}

function syncSharedChrome() {
  const skip = new Set([
    path.join(ROOT,'education','index.html'),
    path.join(ROOT,'blog','index.html')
  ]);
  const htmlFiles=[];
  function walk(dir){
    if (!fs.existsSync(dir)) return;
    for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
      if(ent.name.startsWith('.') && ent.name !== '.nojekyll') continue;
      const full=path.join(dir,ent.name);
      if(ent.isDirectory()) walk(full);
      else if(ent.name==='index.html') htmlFiles.push(full);
    }
  }
  walk(ROOT);
  for(const file of htmlFiles){
    if(skip.has(file)) continue;
    let html=fs.readFileSync(file,'utf8');
    if(html.includes('<!-- SITE-GENERATED:') || html.includes('<!-- CMS-GENERATED:')) continue;
    if(!html.includes('<header class="site-header">') || !html.includes('<footer class="site-footer">')) continue;
    html=html.replace(/<header class="site-header">[\s\S]*?<\/header>/, siteHeader(''));
    html=html.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, siteFooter().replace(/<script src="\/js\/site\.js"><\/script>$/,''));
    // Ensure the shared interaction script is present on every maintained page.
    html=html.replace(/(?:<script\s+src="\/js\/site\.js"><\/script>\s*)+/g, '');
    if(html.includes('</body>')) html=html.replace('</body>', '<script src="/js/site.js"></script></body>');
    else html += '\n<script src="/js/site.js"></script>\n';
    fs.writeFileSync(file,html,'utf8');
  }
}

function updateHomepageEducationModule(allEducation) {
  const file=path.join(ROOT,'index.html');
  if(!fs.existsSync(file)) return;
  let html=fs.readFileSync(file,'utf8');
  const start='<!-- CMS_EDUCATION_HOME_START -->';
  const end='<!-- CMS_EDUCATION_HOME_END -->';
  const a=html.indexOf(start), b=html.indexOf(end);
  if(a<0||b<a) return;
  const cards=SECTION_CONFIG.map((s,i)=>{
    const count=allEducation.filter(x=>x.section===s.name).length;
    return `<a class="feature-card reveal" href="/education/${s.slug}/"><div class="feature-media"><img loading="lazy" alt="${esc(s.name)}" src="${esc(s.image)}"></div><div class="feature-body"><div class="feature-eyebrow">0${i+1} · ${esc(s.kicker)}</div><h3>${esc(s.name)}</h3><p>${esc(s.description)}</p><span class="feature-link">${count} published page${count===1?'':'s'} ↗</span></div></a>`;
  }).join('\n');
  html=html.slice(0,a)+start+'\n'+cards+'\n'+end+html.slice(b+end.length);
  fs.writeFileSync(file,html,'utf8');
}

function updateHomepageBlogModule(allBlog) {
  const file=path.join(ROOT,'index.html');
  if(!fs.existsSync(file)) return;
  let html=fs.readFileSync(file,'utf8');
  const start='<!-- CMS_BLOG_HOME_START -->';
  const end='<!-- CMS_BLOG_HOME_END -->';
  const a=html.indexOf(start), b=html.indexOf(end);
  if(a<0||b<a) return;
  const cards=allBlog.slice(0,4).map(item=>`<a class="tile reveal" href="/blog/${item.slug}/"><small>${esc(item.category || 'Article')}</small><strong>${esc(item.title)}</strong></a>`).join('\n');
  html=html.slice(0,a)+start+'\n'+cards+'\n'+end+html.slice(b+end.length);
  fs.writeFileSync(file,'utf8'===typeof '' ? html : html,'utf8');
}

function writeSitemap(allEducation,allBlog) {
  const staticUrls=['/','/services/','/about/','/contact/','/education/','/blog/'];
  const sectionUrls=SECTION_CONFIG.map(s=>`/education/${s.slug}/`);
  const eduUrls=allEducation.map(x=>pageUrl(x));
  const blogUrls=allBlog.map(x=>`/blog/${x.slug}/`);
  const urls=[...staticUrls,...sectionUrls,...eduUrls,...blogUrls];
  const xml=`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u=>`  <url><loc>${SITE_URL}${u}</loc></url>`).join('\n')}
</urlset>
`;
  fs.writeFileSync(path.join(ROOT,'sitemap.xml'),xml,'utf8');
}

const education=readCollection(path.join(ROOT,'content','education'));
const blog=readCollection(path.join(ROOT,'content','blog'));

for (const section of SECTION_CONFIG) {
  writeFile(path.join(ROOT,'education',section.slug,'index.html'), educationSectionPage(section, education.filter(x => x.section === section.name)));
}
writeFile(path.join(ROOT,'education','index.html'), educationHomePage(education));
writeFile(path.join(ROOT,'blog','index.html'), blogArchivePage(blog));

removeGeneratedDetailPages(path.join(ROOT,'blog'),'blog',new Set(blog.map(x=>x.slug)));
removeGeneratedDetailPages(path.join(ROOT,'education'),'education',new Set(education.map(x=>x.slug)));

for (const item of education) {
  writeFile(path.join(ROOT,'education',sectionByName(item.section).slug,item.slug,'index.html'), educationDetail(item,education,blog));
}
for (const item of blog) {
  writeFile(path.join(ROOT,'blog',item.slug,'index.html'), blogDetail(item));
}

for (const [slug,target] of Object.entries(LEGACY_REDIRECTS)) {
  writeFile(path.join(ROOT,'education',slug,'index.html'), legacyRedirect(slug,target));
}

syncSharedChrome();
updateHomepageEducationModule(education);
updateHomepageBlogModule(blog);
writeSitemap(education,blog);

console.log(`[CMS] Build complete. Education pages: ${education.length}. Blog articles: ${blog.length}. Sections: ${SECTION_CONFIG.length}.`);
