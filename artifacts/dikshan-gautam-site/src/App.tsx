import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, Search, Send, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Link, Route, Switch, Router as WouterRouter, useLocation, useParams } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

const queryClient = new QueryClient();

type Article = {
  slug: string;
  type: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  body: ReactNode;
};

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const categories = [
  { slug: 'plus-two-neb', label: '+2 / NEB' },
  { slug: 'bachelors', label: "Bachelor's" },
  { slug: 'courses', label: 'Courses' },
  { slug: 'study-abroad', label: 'Study Abroad' },
  { slug: 'admissions', label: 'Admissions' },
  { slug: 'scholarships', label: 'Scholarships' },
];

const serviceAreas = [
  {
    id: 'search',
    label: 'Search visibility',
    title: 'SEO strategy and search work',
    intro: 'Make the right page easier to find, then use search evidence to improve it.',
    services: [
      ['SEO strategy', 'A practical search plan tied to the questions your business can answer.'],
      ['Keyword research', 'Find the language, intent and gaps worth building around.'],
      ['Technical SEO', 'Resolve crawl, indexation, performance and site-foundation issues.'],
      ['On-page SEO', 'Improve titles, headings, links and page signals without flattening the writing.'],
      ['Local SEO', 'Make location, service and opening information easier to trust and find.'],
      ['Google Business Profile optimization', 'Keep the profile useful, complete and aligned with the business.'],
      ['Google Search Console', 'Read queries, pages, clicks and impressions without claiming more than the data shows.'],
    ],
  },
  {
    id: 'content',
    label: 'Useful information',
    title: 'Content strategy and writing',
    intro: 'Give every piece of content a reader, a question and a next step.',
    services: [
      ['Content strategy', 'Plan the pages and publishing work around real audience questions.'],
      ['SEO content writing', 'Clear, search-aware writing that sounds like a person and earns attention.'],
      ['SEO articles', 'In-depth articles built to explain a subject and support a wider site.'],
      ['Website copywriting', 'Page copy that makes the offer, proof and next action easy to understand.'],
    ],
  },
  {
    id: 'web',
    label: 'A clearer place to land',
    title: 'Websites and structure',
    intro: 'Turn search and content thinking into a website that is easier to use.',
    services: [
      ['SEO website development', 'Responsive websites with the technical basics and content structure in place.'],
      ['Website structure', 'A sensible page system so visitors and search engines can find their way around.'],
      ['Information architecture', 'Organize navigation, hierarchy and relationships around user intent.'],
      ['Website on-page optimization', 'Refine page templates, internal links, headings and calls to action.'],
    ],
  },
  {
    id: 'video',
    label: 'Content in motion',
    title: 'Video and content repurposing',
    intro: 'Extend a useful idea into short, focused formats.',
    services: [
      ['Video editing', 'Shape existing footage into a clean, watchable story with good pacing.'],
      ['Short-form video/content', 'Adapt an idea for concise, platform-aware clips and posts.'],
      ['Content repurposing', 'Find the article, talk or recording already worth turning into more useful formats.'],
    ],
  },
];

const articles: Article[] = [
  {
    slug: 'what-search-console-can-and-cannot-tell-you',
    type: 'SEO notes',
    title: 'What Search Console can — and cannot — tell you',
    excerpt: 'A practical way to read the four headline metrics without turning a dashboard into a story it cannot support.',
    date: '12 Feb 2025',
    readTime: '6 min read',
    body: (
      <>
        <p>Search Console is useful precisely because it is narrower than most marketing dashboards. It shows how a site appeared in Google Search, and how people responded to those appearances. It does not, on its own, explain every business outcome.</p>
        <p>That distinction is a small piece of editorial discipline. A click is not a lead. An impression is not attention. Average position is a useful directional signal, not a promise that every searcher saw a page at the same place.</p>
        <blockquote>Good reporting keeps the evidence intact, then leaves room for what the evidence cannot know.</blockquote>
        <h2>Start with the four numbers</h2>
        <p>Clicks describe visits from Google Search. Impressions describe appearances. CTR is clicks divided by impressions. Average position is calculated across impressions, which means it is best read as a broad signal across a group of queries.</p>
        <p>Read them together. A rise in impressions with a flat CTR may mean the site is being discovered for a wider set of searches. A stronger CTR with fewer impressions may point to a more focused set of results. Neither is automatically good or bad.</p>
        <h2>Ask better follow-up questions</h2>
        <ul>
          <li>Which pages are earning visibility, and for which kinds of intent?</li>
          <li>Are the queries aligned with what the business actually helps people decide?</li>
          <li>What changed on the site, in the market, or in the search results during the period?</li>
        </ul>
        <p>The dashboard is the beginning of the conversation. The work is turning its signals into clearer pages, more useful content, and decisions that can be tested honestly.</p>
      </>
    ),
  },
  {
    slug: 'the-page-before-the-page',
    type: 'Web + content',
    title: 'The page before the page',
    excerpt: 'People decide whether to trust a site before they have read a sentence. Here is what that first moment is doing.',
    date: '28 Jan 2025',
    readTime: '5 min read',
    body: (
      <>
        <p>Before someone reads your homepage, they form a quiet expectation about it. A result in search, a shared link, a remembered name, or a recommendation has already framed the visit.</p>
        <p>That is why a website cannot be separated from the words and structures that lead people to it. The first page has to keep the promise made before the page existed.</p>
        <h2>Clarity is a chain</h2>
        <p>A useful chain looks something like this: a person has a question, finds a phrase that feels relevant, lands on a page that confirms the relevance, and quickly understands what to do next. Break one link and the site feels harder than it needs to be.</p>
        <blockquote>Make the next understanding easy.</blockquote>
        <h2>Three details worth checking</h2>
        <ul>
          <li>The page title should name the decision the page helps with, not just the business.</li>
          <li>The first visible section should make the audience and the useful outcome specific.</li>
          <li>Every call to action should answer the natural next question: “what happens if I choose this?”</li>
        </ul>
        <p>Good web work is not decoration added after the strategy. It is the moment where strategy becomes legible.</p>
      </>
    ),
  },
  {
    slug: 'a-small-system-for-student-research',
    type: 'Education desk',
    title: 'A small system for student research',
    excerpt: 'For Nepali students comparing courses, colleges and scholarship options, a calmer way to begin.',
    date: '08 Jan 2025',
    readTime: '7 min read',
    body: (
      <>
        <p>Research becomes overwhelming when every tab feels equally important. A better approach is to separate the search into decisions: what you want to study, where it can lead, what it costs, and which requirements are real.</p>
        <h2>Keep one working page</h2>
        <p>Use a single note for the shortlist. Give each option the same fields: institution, course, intake, eligibility, estimated cost, deadline, source link and one unresolved question. A consistent shape makes differences visible.</p>
        <p>Start with official pages wherever possible. College pages and government notices change; save the date you checked a requirement rather than relying on a screenshot with no context.</p>
        <h2>Research is not a race</h2>
        <p>The point is not to collect the most options. It is to reach a small set that you can compare with enough care to choose one. If a requirement is unclear, that is useful information — mark it and ask the institution directly.</p>
        <blockquote>A shortlist is valuable when it makes a decision smaller.</blockquote>
        <p>The education desk is built around that idea: fewer vague promises, more navigable information for students and families.</p>
      </>
    ),
  },
  {
    slug: 'content-that-answers-the-next-question',
    type: 'Content practice',
    title: 'Content that answers the next question',
    excerpt: 'The strongest service pages do not stop at the headline. They anticipate the hesitation that follows it.',
    date: '19 Dec 2024',
    readTime: '4 min read',
    body: (
      <>
        <p>A page can answer the question someone typed and still leave the important question untouched. That second question is often where trust is won.</p>
        <p>If a page says what a service is, the next question may be whether it is right for this situation. If it says who it is for, the next may be what the process actually feels like. Useful content moves with that sequence.</p>
        <h2>Write in the order of uncertainty</h2>
        <p>Instead of asking “what do we want to say?”, ask “what might stop someone from continuing?” Then let the page address those hesitations in a natural order, with examples and boundaries rather than inflated claims.</p>
        <p>Clear content is generous. It does not make a reader work to discover the scope, the trade-offs, or the next action.</p>
      </>
    ),
  },
];

const categoryResources: Record<string, { title: string; description: string }[]> = {
  'plus-two-neb': [
    { title: 'A plain-language guide to choosing a +2 stream', description: 'Compare the shape of Science, Management, Humanities and Law before you choose a direction.' },
    { title: 'NEB exam preparation: build a week you can repeat', description: 'A simple planning system for revision, practice and the days that do not go to plan.' },
    { title: 'What to check before enrolling at a college', description: 'Questions about teaching, cost, schedule and support worth asking before admission.' },
  ],
  bachelors: [
    { title: 'How to compare bachelor’s courses in Nepal', description: 'A checklist for looking past course names and understanding the study experience.' },
    { title: 'Choosing a subject when you have several interests', description: 'A grounded way to find the overlap between curiosity, ability and opportunity.' },
    { title: 'The first semester as a research project', description: 'Use your early months to learn how you learn and what the course asks of you.' },
  ],
  courses: [
    { title: 'A better way to choose a short course', description: 'Five questions that separate a useful next skill from an attractive syllabus.' },
    { title: 'Self-paced or classroom: which fits your week?', description: 'Think through accountability, time and the kind of practice your goal needs.' },
    { title: 'How to read a course outline', description: 'Look for outcomes, assessment and evidence instead of only the topic list.' },
  ],
  'study-abroad': [
    { title: 'The first study abroad shortlist', description: 'Start with course fit and budget before the noise of destination rankings.' },
    { title: 'Documents: make a version you can trust', description: 'A calmer system for gathering, naming and checking application documents.' },
    { title: 'Questions to ask an education counsellor', description: 'Make guidance useful by bringing specific questions and your own constraints.' },
  ],
  admissions: [
    { title: 'An admissions timeline you can actually use', description: 'Work backwards from the deadline and leave space for the uncertain parts.' },
    { title: 'When an application asks for a personal statement', description: 'A structure for writing with detail, context and your own voice.' },
    { title: 'The offer letter checklist', description: 'What to read closely before you accept a place.' },
  ],
  scholarships: [
    { title: 'Find scholarships by reading the eligibility line', description: 'A practical first pass through criteria, documents and dates.' },
    { title: 'A scholarship application evidence file', description: 'Keep your work, achievements and references close without making the story bigger than it is.' },
    { title: 'How to write about financial need with dignity', description: 'Be specific, honest and clear about what support would make possible.' },
  ],
};

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const fullTitle = `${title} — Dikshan Gautam`;
    const url = new URL(window.location.href);
    const setMeta = (selector: string, attributes: Record<string, string>) => {
      const existing = document.head.querySelector(selector);
      const element = existing ?? document.createElement('meta');
      Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
      if (!existing) document.head.appendChild(element);
    };
    const setLink = (selector: string, attributes: Record<string, string>) => {
      const existing = document.head.querySelector(selector);
      const element = existing ?? document.createElement('link');
      Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
      if (!existing) document.head.appendChild(element);
    };

    document.title = fullTitle;
    setMeta('meta[name="description"]', { name: 'description', content: description });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: url.toString() });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle });
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    setLink('link[rel="canonical"]', { rel: 'canonical', href: url.toString() });

    const structuredDataId = 'dikshan-structured-data';
    const existingStructuredData = document.getElementById(structuredDataId);
    const structuredData = existingStructuredData ?? document.createElement('script');
    structuredData.id = structuredDataId;
    structuredData.setAttribute('type', 'application/ld+json');
    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Dikshan Gautam',
      url: `${url.origin}/`,
      jobTitle: 'Independent SEO, content and web practitioner',
      knowsAbout: ['SEO', 'Content strategy', 'Websites', 'Education resources'],
    });
    if (!existingStructuredData) document.head.appendChild(structuredData);
  }, [description, title]);
}

function SiteHeader() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [educationOpen, setEducationOpen] = useState(false);
  useEffect(() => { setOpen(false); setEducationOpen(false); }, [location]);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand-mark" data-testid="link-brand">
          <img className="brand-logo" src="/dikshan-mark.png" alt="" aria-hidden="true" />
          <span><strong>Dikshan</strong> Gautam</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/services" aria-current={location === '/services' ? 'page' : undefined}>Services</Link>
          <div className="nav-dropdown" onMouseEnter={() => setEducationOpen(true)} onMouseLeave={() => setEducationOpen(false)}>
            <button type="button" className="nav-dropdown-trigger" aria-expanded={educationOpen} onClick={() => setEducationOpen(v => !v)}>Education <ChevronDown size={13} /></button>
            <div className={`nav-dropdown-menu ${educationOpen ? 'is-open' : ''}`}>
              <div className="nav-dropdown-label">Education desk</div>
              {categories.map((category) => <Link key={category.slug} href={`/education/${category.slug}`}>{category.label}<ArrowUpRight size={13} /></Link>)}
              <Link className="nav-dropdown-all" href="/education">Browse all education <ArrowRight size={13} /></Link>
            </div>
          </div>
          <Link href="/blog" aria-current={location === '/blog' ? 'page' : undefined}>Blog</Link>
          <Link href="/about" aria-current={location === '/about' ? 'page' : undefined}>About</Link>
          <Link href="/contact" aria-current={location === '/contact' ? 'page' : undefined}>Contact</Link>
        </nav>
        <Link href="/contact" className="header-cta" data-testid="link-header-contact">Let's talk <ArrowUpRight size={14} /></Link>
        <button className="menu-button" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(v => !v)}>{open ? <X size={23} /> : <Menu size={23} />}</button>
      </div>
      <nav className={`mobile-nav ${open ? 'is-open' : ''}`} aria-label="Mobile navigation">
        {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        <details className="mobile-education">
          <summary>Education <ChevronDown size={15} /></summary>
          {categories.map(category => <Link key={category.slug} href={`/education/${category.slug}`}>{category.label}</Link>)}
        </details>
        <Link href="/contact" className="button-dark">Let's talk <ArrowUpRight size={14} /></Link>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-width footer-main">
        <div className="footer-brand-block">
          <img src="/dikshan-mark.png" alt="Dikshan monogram" className="footer-logo" />
          <div><strong>Dikshan Gautam</strong><span>SEO · Content · Web</span></div>
        </div>
        <p>Helping businesses get found, understood and chosen online.</p>
        <div className="footer-links">
          <Link href="/services">Services</Link><Link href="/blog">Blog</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link>
        </div>
      </div>
      <div className="page-width footer-bottom"><span>© {new Date().getFullYear()} Dikshan Gautam</span><span>Based in Nepal · working remotely</span></div>
    </footer>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return <div className="site-shell"><SiteHeader /><main>{children}</main><Footer /></div>;
}

function IntroMark() {
  return <span className="eyebrow">Independent practitioner</span>;
}

function Home() {
  usePageMeta('SEO, Content & Web — Dikshan Gautam', 'Dikshan Gautam helps businesses get found on Google, communicate clearly through content and build websites that make the next step easier.');
  return (
    <>
      <section className="hero">
        <div className="page-width hero-grid">
          <div className="hero-copy reveal">
            <span className="eyebrow">Dikshan Gautam · SEO · Content · Web</span>
            <h1 className="display">I help businesses become <em>easier to find, understand and choose.</em></h1>
            <p className="lede">SEO strategy, content writing, websites and digital content — practical work for businesses that need their online presence to make more sense.</p>
            <div className="hero-actions"><Link href="/services" className="button-dark">See what I can do <ArrowRight size={16} /></Link><Link href="/contact" className="button-light">Let's talk</Link></div>
            <div className="hero-note"><span className="status-dot" /> Based in Nepal · available for selected projects</div>
          </div>
          <div className="hero-visual reveal">
            <div className="hero-photo"><img src="https://images.unsplash.com/photo-1772442198907-765685249ea4?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=78&w=1400" alt="A creative professional working on a detailed project at a desk" /><span className="photo-caption">The work is in the details.</span></div>
            <div className="hero-visual-card hero-visual-card-top"><span>SEARCH</span><strong>Find the right people.</strong><small>SEO · Local · Google</small></div>
            <div className="hero-visual-card hero-visual-card-bottom"><span>CONTENT + WEB</span><strong>Make the next step obvious.</strong><small>Copy · Structure · UX</small></div>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true"><div className="marquee-track">{['SEO strategy','Google Business Profile','Content writing','SEO websites','Video editing','SEO strategy','Google Business Profile','Content writing','SEO websites','Video editing'].map((item, index) => <span className="marquee-item" key={`${item}-${index}`}>{item}</span>)}</div></div>

      <section className="section proof-section">
        <div className="page-width proof-grid">
          <div className="proof-copy"><span className="eyebrow">A useful signal</span><h2 className="display">Good digital work should make the numbers <em>easier to explain.</em></h2><p>Search Console can show reach and visibility. It cannot, by itself, explain every business outcome. I use evidence as a starting point for better decisions — not as a reason to invent a story.</p><span className="proof-note">Search Console · last 6 months compared with previous 6 months</span></div>
          <div className="metric-grid" aria-label="Search Console performance evidence"><div className="metric"><span className="metric-value">264K</span><span className="metric-label">Clicks</span><span className="metric-change">previous: 82.7K</span></div><div className="metric metric-accent"><span className="metric-value">12.8M</span><span className="metric-label">Impressions</span><span className="metric-change">previous: 3.63M</span></div><div className="metric"><span className="metric-value">2.1%</span><span className="metric-label">Average CTR</span><span className="metric-change">previous: 2.3%</span></div><div className="metric"><span className="metric-value">5.9</span><span className="metric-label">Average position</span><span className="metric-change">previous: 6.9</span></div></div>
        </div>
      </section>

      <section className="section services-home-section">
        <div className="page-width">
          <div className="section-head"><div><span className="eyebrow">What I actually do</span><h2 className="display">Clear services. <em>No mystery language.</em></h2></div><p>Pick one area or combine them. The point is to make the work easier to understand before you start.</p></div>
          <div className="service-showcase">
            {serviceAreas.map((area, index) => <article className={`service-showcase-item service-showcase-${area.id}`} key={area.id}><div className="service-showcase-top"><span className="service-index">0{index+1}</span><div><span className="section-label">{area.label}</span><h3>{area.title}</h3></div></div><div className="service-chip-list">{area.services.map(([title]) => <span key={title}>{title}</span>)}</div><Link href={`/services#${area.id}`} className="service-more">Explore {area.label.toLowerCase()} <ArrowUpRight size={14} /></Link></article>)}
          </div>
        </div>
      </section>

      <section className="section visual-break-section">
        <div className="page-width visual-break-grid"><div className="visual-break-image"><img src="https://images.unsplash.com/photo-1662358983398-ae035781fa20?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=78&w=1600" alt="Street and architecture in Kathmandu, Nepal" /><span>NEPAL / INFORMATION / PEOPLE</span></div><div className="visual-break-copy"><span className="eyebrow">Another side of the work</span><h2 className="display">Useful information for <em>Nepali students.</em></h2><p>The Education desk is a separate content identity within the site — practical guides for students comparing study options, courses, admissions and scholarships.</p><Link href="/education" className="view-all">Browse the education desk <ArrowRight size={15} /></Link></div></div>
      </section>

      <WritingPreview />

      <section className="section-tight"><div className="page-width contact-panel"><div><span className="eyebrow">Have a useful problem?</span><h2 className="display">Let's make the next step <em>clearer.</em></h2><p className="lede">Tell me what you are trying to make easier to find, understand or choose.</p></div><div className="contact-aside"><p>SEO · Content · Web · Video</p><Link href="/contact" className="button-dark">Get in touch <ArrowUpRight size={15} /></Link></div></div></section>
    </>
  );
}

function ServiceCard({ number, title, text, icon, featured = false }: { number: string; title: string; text: string; icon: ReactNode; featured?: boolean }) {
  return <article className={`service-card ${featured ? 'featured' : ''}`}><div className="service-number"><span>{number}</span>{icon}</div><h3>{title}</h3><p>{text}</p></article>;
}

function WritingPreview() {
  return (
    <section className="section writing-section">
      <div className="page-width">
        <div className="section-head"><div><span className="eyebrow">From the desk</span><h2 className="display">Notes for people who <em>care about the details.</em></h2></div><p>Short essays on search, content, the web and making decisions with better information.</p></div>
        <div className="writing-list">
          {articles.slice(0, 3).map((article) => <Link href={`/blog/${article.slug}`} className="writing-row" key={article.slug} data-testid={`link-writing-${article.slug}`}><span className="writing-type">{article.type}</span><span className="writing-title">{article.title}</span><span className="writing-meta">{article.date}<br />{article.readTime}</span><span className="writing-arrow"><ArrowUpRight size={18} /></span></Link>)}
        </div>
        <Link href="/blog" className="view-all" data-testid="link-all-writing">Read all notes <ArrowRight size={15} /></Link>
      </div>
    </section>
  );
}

function Services() {
  usePageMeta('SEO, Content & Web Services — Dikshan Gautam', 'SEO strategy, Google Business Profile optimization, content writing, SEO websites, website optimization and video editing by Dikshan Gautam.');
  return <><PageHero eyebrow="Services" title={<>The actual work, <em>clearly named.</em></>} description="SEO, content, websites and video work — with the specific services listed so you can quickly see what I can help with." /><section className="service-intro-strip"><div className="page-width"><span>How the pieces connect</span><p>Search helps people discover you. Content helps them understand you. Web work gives them a clearer place to land. Video and repurposing help useful ideas travel further.</p></div></section><section className="section services-section"><div className="page-width service-area-list">{serviceAreas.map((area, index) => <ServiceArea area={area} index={index} key={area.id} />)}</div></section><section className="section-tight"><div className="page-width contact-panel"><div><span className="eyebrow">Not sure what you need?</span><h2 className="display">Bring me the <em>problem.</em></h2></div><div className="contact-aside"><p>You don't need to know which service to choose before you write.</p><Link href="/contact" className="button-dark">Let's talk <ArrowUpRight size={15} /></Link></div></div></section></>;
}

function ServiceArea({ area, index }: { area: (typeof serviceAreas)[number]; index: number }) {
  const visuals = [
    <div className="service-visual search-visual" aria-hidden="true"><div className="visual-label">GOOGLE SEARCH</div><div className="query-bar"><Search size={15} /><span>best answer for a real question</span></div><div className="serp-row active"><b>01</b><span><strong>Useful page</strong><small>relevant · clear · findable</small></span><ArrowUpRight size={14} /></div><div className="serp-row"><b>02</b><span><strong>Local information</strong><small>accurate · useful · trusted</small></span><ArrowUpRight size={14} /></div><div className="serp-row"><b>03</b><span><strong>Next question</strong><small>intent · context · action</small></span><ArrowUpRight size={14} /></div></div>,
    <div className="service-visual content-visual" aria-hidden="true"><div className="visual-label">CONTENT DESK</div><div className="content-paper"><span className="paper-kicker">THE NEXT QUESTION</span><strong>What does the reader need to understand before choosing?</strong><div className="paper-lines"><i/><i/><i/><i/></div><span className="paper-foot">brief → draft → useful page</span></div></div>,
    <div className="service-visual web-visual" aria-hidden="true"><div className="visual-label">WEBSITE / SERVICE PAGE</div><div className="browser-window"><div className="browser-top"><i/><i/><i/><span>business.com/service</span></div><div className="browser-body"><div className="browser-nav"><i/><i/><i/><i/></div><div className="browser-copy"><span>01 / SERVICE</span><strong>Make the next step obvious.</strong><i/><i/></div><div className="browser-side"><b>SEO</b><b>UX</b><b>IA</b></div></div></div></div>,
    <div className="service-visual video-visual" aria-hidden="true"><div className="visual-label">SHORT-FORM EDIT</div><div className="video-stage"><div className="play-ring">▶</div><span>ONE IDEA<br/>AT A TIME</span></div><div className="video-timeline"><i/><i/><i/><i/></div><div className="video-meta"><span>00:00</span><span>00:30</span><span>cut · caption · reuse</span></div></div>,
  ];
  return <article className={`service-area service-area-${area.id}`} id={area.id}><div className="service-area-heading"><span className="service-detail-index">0{index + 1}</span><div><span className="eyebrow">{area.label}</span><h2>{area.title}</h2><p>{area.intro}</p></div></div>{visuals[index]}<div className="service-items" aria-label={`${area.title} services`}>{area.services.map(([title, description]) => <details className="service-item" key={title}><summary><span className="service-item-dot"/><h3>{title}</h3><ChevronDown size={15}/></summary><p>{description}</p></details>)}</div></article>;
}

function Education() {
  usePageMeta('Education desk', 'A practical education resource for Nepali students, from +2 and NEB to admissions and scholarships.');
  return <><PageHero eyebrow="Education desk" title={<>Information for the <em>next decision.</em></>} description="A growing, browseable resource for Nepali students. Start with a category, then follow the questions that matter to your situation." /><section className="section"><div className="page-width"><div className="category-grid">{categories.map((category) => <Link key={category.slug} href={`/education/${category.slug}`} className="category-link" data-testid={`link-education-category-${category.slug}`}><span>{category.label}</span><span>Explore <ArrowUpRight size={13} /></span></Link>)}</div></div></section></>;
}

function EducationCategory() {
  const { category } = useParams<{ category: string }>();
  const chosen = categories.find((item) => item.slug === category) ?? categories[0];
  const resources = categoryResources[chosen.slug] ?? [];
  usePageMeta(chosen.label, `Practical guides for Nepali students exploring ${chosen.label}.`);
  return <><section className="page-hero"><div className="page-width category-hero"><div><Link href="/education" className="eyebrow" data-testid="link-back-education">Education desk</Link><h1 className="display">{chosen.label}</h1><p className="lede">Useful starting points for students and families making decisions in this part of the journey.</p></div><p className="category-side-note">These are orientation guides, not a substitute for the latest official notice. Always check dates, requirements and fees with the institution.</p></div></section><section className="section"><div className="page-width"><div className="resource-list">{resources.map((resource, index) => <article className="resource-card" key={resource.title} data-testid={`card-resource-${index}`}><div><span className="section-label">Guide 0{index + 1}</span><h2>{resource.title}</h2><p>{resource.description}</p></div><ArrowRight className="resource-arrow" size={19} /></article>)}</div></div></section></>;
}

function Blog() {
  const [filter, setFilter] = useState('All notes');
  usePageMeta('Writing', 'Notes on SEO, content, websites and education by Dikshan Gautam.');
  const filters = ['All notes', 'SEO notes', 'Web + content', 'Education desk', 'Content practice'];
  const shown = useMemo(() => filter === 'All notes' ? articles : articles.filter((article) => article.type === filter), [filter]);
  return <><PageHero eyebrow="Writing" title={<>Notes from the <em>working edge.</em></>} description="Observations, practical frameworks and the occasional useful disagreement about search, content, the web and education." /><section className="section"><div className="page-width"><div className="filter-row" role="group" aria-label="Filter articles">{filters.map((item) => <button key={item} type="button" className={`filter-button ${filter === item ? 'is-active' : ''}`} onClick={() => setFilter(item)} aria-pressed={filter === item} data-testid={`button-filter-${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</button>)}</div><div className="blog-grid">{shown.map((article, index) => <ArticleCard article={article} featured={filter === 'All notes' && index === 0} key={article.slug} />)}</div>{shown.length === 0 && <p data-testid="text-empty-articles">No notes in this corner yet. Try another filter.</p>}</div></section></>;
}

function ArticleCard({ article, featured }: { article: Article; featured: boolean }) {
  return <Link href={`/blog/${article.slug}`} className={`article-card ${featured ? 'featured' : ''}`} data-testid={`card-article-${article.slug}`}><div className="article-meta">{article.type} · {article.date} · {article.readTime}</div><h2>{article.title}</h2><p className="article-excerpt">{article.excerpt}</p></Link>;
}

function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((item) => item.slug === slug) ?? articles[0];
  usePageMeta(article.title, article.excerpt);
  return <><article><div className="page-width article-hero"><Link href="/blog" className="eyebrow" data-testid="link-back-writing">Writing</Link><h1 className="display">{article.title}</h1><div className="page-hero-meta"><span>{article.type}</span><span>{article.date}</span><span>{article.readTime}</span></div><p className="lede" style={{ marginTop: '25px' }}>{article.excerpt}</p></div><div className="page-width article-body">{article.body}</div></article></>;
}

function About() {
  usePageMeta('About Dikshan Gautam', 'Learn about Dikshan Gautam and his work across SEO, content, websites and practical education publishing.');
  return <><PageHero eyebrow="About" title={<>The person behind the <em>practice.</em></>} description="I work across search, words and the web — usually where a business has something useful to say, but the path to finding or understanding it is not clear enough yet."/><section className="section"><div className="page-width about-grid"><div className="about-image"><img src="https://images.unsplash.com/photo-1772442198907-765685249ea4?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=72&w=1200" alt="Creative professional working carefully at a desk"/><span>WORK / PROCESS / DETAIL</span></div><div className="about-copy"><span className="eyebrow">How I think about the work</span><h2>I care about the part between being found and being chosen.</h2><p>That means looking at the whole path: what someone is trying to understand, how they find the answer, whether the page keeps its promise, and what happens after they arrive.</p><p>I work independently, which keeps the process close to the actual problem. The goal is not to make the website sound impressive. It is to make the useful thing easier to discover, understand and act on.</p><div className="principles"><div className="principle"><strong>Specific over loud</strong><span>Clear services and useful information beat bigger claims.</span></div><div className="principle"><strong>Evidence over theatre</strong><span>Use data honestly and explain what it can and cannot prove.</span></div><div className="principle"><strong>People before funnels</strong><span>Good digital journeys start with a real question.</span></div><div className="principle"><strong>Useful stays longer</strong><span>Good content earns attention by helping someone.</span></div></div></div></div></section></>;
}

function Contact() {
  const [status, setStatus] = useState('');
  usePageMeta('Contact — Dikshan Gautam', 'Contact Dikshan Gautam about SEO, content writing, websites, Google Business Profile optimization or video editing.');
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('Sending…');
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      const result = await response.json();
      setStatus(result.success ? 'Thanks — your message has been sent.' : 'Something went wrong. Please email hello@dikshangautam.com.np instead.');
      if (result.success) form.reset();
    } catch { setStatus('Something went wrong. Please email hello@dikshangautam.com.np instead.'); }
  }
  return <><PageHero eyebrow="Contact" title={<>Let's talk about what needs to <em>work better.</em></>} description="Tell me what your business does, what you're trying to improve, and where things currently feel stuck. A short note is enough." /><section className="section"><div className="page-width contact-layout"><div className="contact-info"><span className="eyebrow">Start with context</span><h2 className="display">You don't need to know the <em>right service.</em></h2><p>Tell me the problem first. I'll help work out whether SEO, content, web, video — or something else — makes sense.</p><div className="contact-links"><a href="mailto:hello@dikshangautam.com.np">hello@dikshangautam.com.np <ArrowUpRight size={15}/></a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15}/></a></div><div className="contact-checklist"><span><Check size={14}/> SEO / search</span><span><Check size={14}/> Content / copy</span><span><Check size={14}/> Website / UX</span><span><Check size={14}/> Video / repurposing</span></div></div><div className="contact-form"><form onSubmit={handleSubmit}><input type="hidden" name="access_key" value="3673ff96-e9b5-4168-9fad-ff2f9ab63bb9"/><input type="hidden" name="subject" value="New project enquiry from dikshangautam.com.np"/><input type="hidden" name="from_name" value="Dikshan website"/><div className="field-row"><div className="field"><label htmlFor="name">Name</label><input id="name" name="name" required placeholder="Your name" autoComplete="name"/></div><div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required placeholder="you@example.com" autoComplete="email"/></div></div><div className="field"><label htmlFor="business">Business / website</label><input id="business" name="business" placeholder="Business name or URL"/></div><div className="field"><label htmlFor="service">What do you need help with?</label><select id="service" name="service" defaultValue=""><option value="" disabled>Select one</option><option>SEO strategy</option><option>Google Business Profile optimization</option><option>SEO content writing</option><option>Website / SEO website</option><option>Video editing</option><option>Not sure yet</option></select></div><div className="field"><label htmlFor="message">Tell me what is going on</label><textarea id="message" name="message" required placeholder="What are you trying to improve?" rows={7}/></div><button type="submit" className="button-dark" disabled={status === 'Sending…'}>{status === 'Sending…' ? 'Sending…' : 'Send message'} <Send size={14}/></button>{status && <p className="form-status" role="status">{status}</p>}</form></div></div></section></>;
}

function PageHero({ eyebrow, title, description }: { eyebrow: string; title: ReactNode; description: string }) {
  return <section className="page-hero"><div className="page-width"><span className="eyebrow">{eyebrow}</span><h1 className="display">{title}</h1><p className="lede">{description}</p></div></section>;
}

function NotFoundPage() {
  usePageMeta('Page not found', 'This page is not here.');
  return <div className="page-width not-found"><div><span className="eyebrow">404</span><h1 className="display">A missing page.</h1><p className="lede" style={{ marginInline: 'auto' }}>The link may have moved. There is still a useful place to begin.</p><Link href="/" className="button-dark" data-testid="link-not-found-home">Back home <ArrowRight size={15} /></Link></div></div>;
}

function Router() {
  return <RoutedErrorBoundary><Shell><Switch><Route path="/" component={Home} /><Route path="/services" component={Services} /><Route path="/education" component={Education} /><Route path="/education/:category" component={EducationCategory} /><Route path="/blog" component={Blog} /><Route path="/blog/:slug" component={ArticlePage} /><Route path="/about" component={About} /><Route path="/contact" component={Contact} /><Route component={NotFoundPage} /></Switch></Shell></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;