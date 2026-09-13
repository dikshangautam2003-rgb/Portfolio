import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, BarChart3, Code2, FileText, Globe2, Layers3, MapPin, Menu, Search, Send, ScanSearch, X } from 'lucide-react';
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
  { href: '/education', label: 'Education' },
  { href: '/blog', label: 'Writing' },
  { href: '/about', label: 'About' },
];

const categories = [
  { slug: 'plus-two-neb', label: '+2 / NEB', count: '12 guides' },
  { slug: 'bachelors', label: "Bachelor's", count: '09 guides' },
  { slug: 'courses', label: 'Courses', count: '08 guides' },
  { slug: 'study-abroad', label: 'Study Abroad', count: '11 guides' },
  { slug: 'admissions', label: 'Admissions', count: '14 guides' },
  { slug: 'scholarships', label: 'Scholarships', count: '07 guides' },
];

const serviceAreas = [
  {
    id: 'search',
    label: 'Search visibility',
    title: 'SEO strategy and search work',
    intro: 'Help the right people find the right page, then use search evidence to decide what to improve next.',
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
    intro: 'Give every piece of content a reader, a question and a useful next step.',
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
    intro: 'Turn search and content thinking into a website that is easier to use, maintain and act on.',
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
    intro: 'Extend a useful idea into short, focused formats without turning the work into a production machine.',
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
  useEffect(() => setOpen(false), [location]);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand-mark" data-testid="link-brand">
          <span className="brand-symbol">D</span>
          <span>Dikshan Gautam</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} aria-current={location === item.href ? 'page' : undefined} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="header-cta" data-testid="link-header-contact">Start a conversation <ArrowUpRight size={14} /></Link>
        <button className="menu-button" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((current) => !current)} data-testid="button-mobile-menu">
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      <nav className={`mobile-nav ${open ? 'is-open' : ''}`} aria-label="Mobile navigation">
        {navItems.map((item) => <Link key={item.href} href={item.href} data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</Link>)}
        <Link href="/contact" className="button-dark" data-testid="link-mobile-contact">Start a conversation <ArrowUpRight size={14} /></Link>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-width footer-inner">
        <span>© {new Date().getFullYear()} Dikshan Gautam</span>
        <span>SEO · Content · Websites</span>
        <div className="footer-links">
          <Link href="/about" data-testid="link-footer-about">About</Link>
          <Link href="/contact" data-testid="link-footer-contact">Contact</Link>
        </div>
      </div>
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
  usePageMeta('SEO, content and websites', 'Dikshan Gautam helps businesses become easier to find, understand and choose.');
  return (
    <>
      <section className="hero">
        <div className="page-width hero-grid">
          <div className="reveal">
            <span className="eyebrow">SEO · Content · Websites</span>
            <h1 className="display">I help businesses become easier to <em>find, understand and choose.</em></h1>
            <p className="lede">I work on the parts that make digital content useful: getting found through SEO and Google Search, being understood through clear content, and making the next step easier on the website.</p>
            <div className="hero-actions">
              <Link href="/services" className="button-dark" data-testid="link-hero-services">View services <ArrowRight size={16} /></Link>
              <Link href="/contact" className="button-light" data-testid="link-hero-contact">Talk about a project</Link>
            </div>
            <div className="hero-note"><span className="status-dot" /> Independent practice · based in Nepal · available for specific work</div>
          </div>
          <div className="hero-map reveal" aria-label="A visual map of the work" role="img">
            <div className="map-kicker">One clear path</div>
            <div className="map-line map-line-one" />
            <div className="map-line map-line-two" />
            <div className="map-line map-line-three" />
            <div className="map-node node-search"><Search size={17} /><span>Find</span><small>SEO · Search · Local</small></div>
            <div className="map-node node-content"><FileText size={17} /><span>Understand</span><small>Content · Copy · Answers</small></div>
            <div className="map-node node-web"><Globe2 size={17} /><span>Choose</span><small>Website · UX · Next step</small></div>
            <div className="map-foot">Search question → useful page → clear action</div>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {['Findable', 'Understandable', 'Useful', 'Considered', 'Findable', 'Understandable', 'Useful', 'Considered'].map((item, index) => <span className="marquee-item" key={`${item}-${index}`}>{item}</span>)}
        </div>
      </div>

      <section className="section evidence">
        <div className="page-width evidence-grid">
          <div>
            <IntroMark />
            <h2 className="display">The work should hold up in a dashboard <em>and in a conversation.</em></h2>
            <p className="evidence-copy">A recent Search Console snapshot gives a useful view of reach. It is evidence of visibility, not a claim about causation — a starting point for asking better questions.</p>
            <p className="evidence-note">Search Console · last 6 months compared with previous period</p>
          </div>
          <div className="metric-grid" aria-label="Search Console evidence">
            <div className="metric" data-testid="metric-clicks"><span className="metric-value">264K</span><span className="metric-label">Clicks</span><span className="metric-change">↑ from 82.7K</span><div className="mini-chart" aria-hidden="true">{[24, 29, 20, 31, 33, 28, 35].map((height, i) => <span key={i} style={{ height: `${height}px` }} />)}</div></div>
            <div className="metric" data-testid="metric-impressions"><span className="metric-value">12.8M</span><span className="metric-label">Impressions</span><span className="metric-change">↑ from 3.63M</span><div className="mini-chart" aria-hidden="true">{[17, 22, 27, 20, 28, 31, 34].map((height, i) => <span key={i} style={{ height: `${height}px` }} />)}</div></div>
            <div className="metric" data-testid="metric-ctr"><span className="metric-value">2.1%</span><span className="metric-label">Average CTR</span><span className="metric-change">previous: 2.3%</span></div>
            <div className="metric" data-testid="metric-position"><span className="metric-value">5.9</span><span className="metric-label">Average position</span><span className="metric-change">previous: 6.9</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page-width">
          <div className="section-head">
            <div><span className="eyebrow">What I can help with</span><h2 className="display">Different jobs, <em>connected by the reader.</em></h2></div>
            <p>Search gets someone to the door. Content helps them make sense of what they see. The website gives them somewhere useful to go next.</p>
          </div>
          <div className="service-grid home-service-grid">
            <ServiceCard number="01" title="SEO and search" text="SEO strategy, technical SEO, local search, Google Business Profile and Search Console." icon={<ScanSearch size={22} />} featured />
            <ServiceCard number="02" title="Content and copy" text="Content strategy, SEO articles and website copy that answer the next question." icon={<FileText size={22} />} />
            <ServiceCard number="03" title="Web and structure" text="SEO-ready websites, information architecture, UX and on-page optimization." icon={<Layers3 size={22} />} />
          </div>
          <Link href="/services" className="view-all service-grid-link" data-testid="link-home-all-services">See the full service list <ArrowRight size={15} /></Link>
        </div>
      </section>

      <section className="section education-band">
        <div className="page-width education-layout">
          <div className="education-intro">
            <span className="eyebrow">For Nepali students</span>
            <h2 className="display">A calmer way to <em>choose what is next.</em></h2>
            <p>The education desk is a growing resource for students and families navigating study options, applications and the details in between.</p>
            <Link href="/education" className="view-all" data-testid="link-education-hub">Browse the education desk <ArrowRight size={15} /></Link>
          </div>
          <div className="category-grid">
            {categories.map((category) => <Link key={category.slug} href={`/education/${category.slug}`} className="category-link" data-testid={`link-category-${category.slug}`}><span>{category.label}</span><span>{category.count} ↗</span></Link>)}
          </div>
        </div>
      </section>

      <WritingPreview />

      <section className="section-tight">
        <div className="page-width contact-panel">
          <div>
            <span className="eyebrow">Have a useful problem?</span>
            <h2 className="display">Let’s make the next step <em>clearer.</em></h2>
            <p className="lede">Tell me what you are trying to make easier to find, understand or choose.</p>
          </div>
          <div className="contact-aside"><p>Good fit for</p><span>Websites in progress · content that needs a shape · search visibility questions</span><br /><Link href="/contact" className="button-dark" style={{ marginTop: '28px' }} data-testid="link-home-contact">Get in touch <ArrowUpRight size={15} /></Link></div>
        </div>
      </section>
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
  usePageMeta('Services', 'SEO, content strategy and websites by Dikshan Gautam.');
  return <><PageHero eyebrow="Services" title={<>Specific work for <em>search, content and websites.</em></>} description="Choose the part that needs attention, or bring the whole path. I can help with search visibility, useful writing, website structure and content that needs a second life." /><section className="service-intro-strip"><div className="page-width"><span>How the pieces relate</span><p>Search brings a question. Content answers it. Structure makes the answer easy to use. Video and repurposing help it travel further.</p></div></section><section className="section services-section"><div className="page-width service-area-list">{serviceAreas.map((area, index) => <ServiceArea area={area} index={index} key={area.id} />)}</div></section><section className="section-tight"><div className="page-width contact-panel"><div><span className="eyebrow">Start with a question</span><h2 className="display">Tell me which part is <em>getting in the way.</em></h2></div><div className="contact-aside"><p>One project can be one service, not a retainer</p><Link href="/contact" className="button-dark" data-testid="link-services-contact">Write to me <ArrowUpRight size={15} /></Link></div></div></section></>;
}

function ServiceArea({ area, index }: { area: (typeof serviceAreas)[number]; index: number }) {
  const visuals = [
    <div className="service-visual search-visual" aria-hidden="true"><div className="query-bar"><Search size={15} /><span>how do people find this?</span></div><div className="result-line result-highlight"><b>1</b><span><i /> useful page / answer</span></div><div className="result-line"><b>2</b><span><i /> local information / proof</span></div><div className="result-line"><b>3</b><span><i /> next relevant question</span></div><div className="console-caption"><BarChart3 size={14} /> Search Console is a signal, not a conclusion</div></div>,
    <div className="service-visual content-visual" aria-hidden="true"><div className="editor-top"><span>CONTENT NOTE</span><span>02 / 04</span></div><div className="editor-title">What does the reader need next?</div><div className="editor-rule" /><div className="editor-lines"><i /><i /><i /><i /></div><div className="editor-tag">brief → draft → useful page</div></div>,
    <div className="service-visual web-visual" aria-hidden="true"><div className="browser-bar"><i /><i /><i /><span>your-site / service</span></div><div className="web-layout"><div className="web-nav"><i /><i /><i /><i /></div><div className="web-main"><b>Clear page<br />structure</b><span /><span /></div></div><div className="web-caption"><Code2 size={14} /> words + hierarchy + responsive build</div></div>,
    <div className="service-visual video-visual" aria-hidden="true"><div className="timeline-ruler"><span>00:00</span><span>00:15</span><span>00:30</span></div><div className="video-frame"><div className="frame-corner" /><span>one idea<br />at a time</span></div><div className="timeline"><i /><i /><i /></div><div className="video-caption"><Layers3 size={14} /> cut · caption · reuse</div></div>,
  ];
  return <article className={`service-area service-area-${area.id}`} id={area.id}><div className="service-area-heading"><span className="service-detail-index">0{index + 1}</span><div><span className="eyebrow">{area.label}</span><h2>{area.title}</h2><p>{area.intro}</p></div></div>{visuals[index]}<div className="service-items">{area.services.map(([title, text]) => <div className="service-item" key={title}><h3>{title}</h3><p>{text}</p></div>)}</div></article>;
}

function Education() {
  usePageMeta('Education desk', 'A practical education resource for Nepali students, from +2 and NEB to admissions and scholarships.');
  return <><PageHero eyebrow="Education desk" title={<>Information for the <em>next decision.</em></>} description="A growing, browseable resource for Nepali students. Start with a category, then follow the questions that matter to your situation." /><section className="section"><div className="page-width"><div className="category-grid">{categories.map((category) => <Link key={category.slug} href={`/education/${category.slug}`} className="category-link" data-testid={`link-education-category-${category.slug}`}><span>{category.label}</span><span>{category.count} <ArrowUpRight size={13} /></span></Link>)}</div></div></section></>;
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
  usePageMeta('About', 'About Dikshan Gautam, an independent practitioner working across SEO, content and websites.');
  return <><PageHero eyebrow="About" title={<>A person behind the <em>practice.</em></>} description="I like the part of digital work where a fuzzy question becomes a clear page, a better choice or a more useful next step." /><section className="section"><div className="page-width about-grid"><aside className="about-statement"><p>Make it useful. Make it legible. Leave the reader with somewhere to go.</p></aside><div className="about-copy"><h2>I work across search, words and the web.</h2><p>That means looking at the whole path: what a person is trying to understand, how they find the answer, whether the page keeps its promise, and what happens after they arrive.</p><p>I work independently, which keeps the process close to the actual problem. There is room to ask the unglamorous questions, change direction when the evidence says to, and make something that sounds like the people behind it.</p><div className="principles"><div className="principle"><strong>Specific over loud</strong><span>Clarity is more persuasive than a bigger claim.</span></div><div className="principle"><strong>Evidence over theatre</strong><span>Signals are useful when we are honest about their limits.</span></div><div className="principle"><strong>People before funnels</strong><span>Good journeys start with a real question, not a diagram.</span></div><div className="principle"><strong>Useful stays longer</strong><span>The best content earns its return visit.</span></div></div></div></div></section></>;
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  usePageMeta('Contact', 'Get in touch with Dikshan Gautam about SEO, content and website work.');
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }
  return <><PageHero eyebrow="Contact" title={<>Tell me what needs to be <em>clearer.</em></>} description="A short note is enough. What are you working on, who is it for, and where does it feel stuck?" /><section className="section"><div className="page-width contact-layout"><div className="contact-info"><span className="eyebrow">Say hello</span><h2 className="display">Good work starts with <em>context.</em></h2><p>I’ll read the note and reply with a useful next step, even if that step is a better question.</p><div className="contact-links"><a href="mailto:hello@dikshangautam.com" data-testid="link-email">hello@dikshangautam.com <ArrowUpRight size={15} /></a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" data-testid="link-linkedin">LinkedIn <ArrowUpRight size={15} /></a></div></div><div className="contact-form">{submitted ? <div className="form-success" data-testid="status-contact-success"><strong>Thank you — the note is on its way.</strong><br />I’ll come back to you with a considered reply.</div> : <form onSubmit={handleSubmit}><div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" required placeholder="How should I address you?" data-testid="input-name" /></div><div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required placeholder="you@example.com" data-testid="input-email" /></div><div className="field"><label htmlFor="message">A little context</label><textarea id="message" name="message" required placeholder="What are you trying to make easier?" data-testid="input-message" /></div><button type="submit" className="button-dark" data-testid="button-submit-contact">Send the note <Send size={14} /></button></form>}</div></div></section></>;
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