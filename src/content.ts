/**
 * content.ts: the single source of truth for every word, number, list,
 * route and external link on the site.
 *
 * Heading markup: wrap a word in ~tildes~ to render it as oversized outline text.
 *
 * Content rules for Yevanta:
 * - Only facts from the business analysis. Nothing invented.
 * - No live competitor scraping or live model compute. Automatic publishing only "depends on the
 *   available integrations and configured workflow" (client wording); never claim it as a feature.
 * - Recommendations are "recommendation records" reviewed by people.
 * - Anything not yet known is clearly marked as a placeholder.
 * - NVIDIA technology appears on the product page only (see `productPage`).
 */

export type Tone = 'c1' | 'c2' | 'c3' | 'c4'

export const routes = {
  home: '/',
 product: '/product',
  privacy: '/privacy',
  terms: '/terms',
  cookies: '/cookie-policy',
} as const

export const site = {
  brand: 'Yevanta',
  /** Brand images (rendered from the client's SVGs in /design-assets). */
  logo: { src: '/images/logo.webp', mark: '/images/logo-mark.webp', width: 552, height: 240 },
  /** Product name (from the client brief). */
  productName: 'Yevanta X.1',
  tagline: 'Business Growth & Pricing Intelligence',
  /**
   * The live domain (no trailing slash). Canonical tags, Open Graph
   * URLs, robots.txt and sitemap.xml are all generated from this one value.
   */
  url: 'https://yevanta.com',
  locale: 'en_US',
  /** The live dashboard (external app). */
  dashboardUrl: 'https://central.yevanta.com/',
  year: new Date().getFullYear().toString(),
  meta: {
    homeTitle: 'Yevanta | Business Growth & Pricing Intelligence',
    productTitle: 'Yevanta X.1 | The Platform',
    notFoundTitle: 'Page not found | Yevanta',
  },
}

/** Top navigation: a short list of key landing sections (every other section stays on the page). */
export const nav = {
  label: 'Main',
  menu: 'Menu',
  close: 'Close menu',
  items: [
    { label: 'Home', to: '/', id: 'hero' },
    { label: 'Features', to: '/#features', id: 'features' },
    { label: 'How It Works', to: '/#how-it-works', id: 'how-it-works' },
    { label: 'Use Cases', to: '/#use-cases', id: 'use-cases' },
    { label: 'Pricing', to: '/#pricing', id: 'pricing' },
    { label: 'FAQ', to: '/#faq', id: 'faq' },
  ],
}

/** Company facts (client-supplied). Used by About, Contact, Footer, legal pages and search-engine data. */
export const company = {
  name: 'Yevanta Digital Solutions',
  founder: 'Arjun Sivakumar',
  /** ISO date for search engines; label for people. */
  founded: '2024-05-16',
  foundedLabel: '16 May 2024',
  foundedYear: '2024',
  email: 'info@yevanta.com',
  offices: [
    {
      key: 'us',
      region: 'USA',
      legalName: 'Yevanta Digital Solutions LLC',
      street: '515 Congress Avenue',
      locality: 'Austin',
      regionCode: 'TX',
      postalCode: '78701',
      countryCode: 'US',
      address: '515 Congress Avenue, Austin, TX 78701, USA',
      phone: '+1 214 328 0238',
      tel: '+12143280238',
    },
    {
      key: 'lk',
      region: 'Sri Lanka',
      legalName: 'Yevanta Digital Solutions (Pvt) Ltd',
      street: 'No. 48, Bauddhaloka Mawatha',
      locality: 'Colombo 04',
      regionCode: 'Western Province',
      postalCode: '',
      countryCode: 'LK',
      address: 'No. 48, Bauddhaloka Mawatha, Colombo 04, Sri Lanka',
      phone: '+94 76 023 0238',
      tel: '+94760230238',
    },
  ],
}

export const ui = {
  skipToContent: 'Skip to content',
  backHome: '← Home',
  logoLabel: `${site.brand} home`,
  paletteButton: 'Quick jump',
  paletteShortcutMac: '⌘K',
  paletteShortcutPc: 'Ctrl K',
  paletteTitle: 'Quick jump',
  palettePlaceholder: 'Jump to a section or page…',
  paletteEmpty: 'Nothing matches that. Try another word.',
  palettePages: 'Pages',
  paletteThisPage: 'On this page',
  paletteOtherPage: 'Elsewhere',
  paletteFooter: ['↑ ↓ move', '↵ jump', 'esc close'],
  paletteClose: 'Close quick jump',
  paletteCurrent: 'You are here',
  sectionCounter: (i: number, n: number) => `Section ${i} of ${n}`,
  scroll: 'Scroll',
  illustrative: 'Illustrative',
  placeholder: 'Placeholder',
  prev: 'Previous',
  next: 'Next',
  slideOf: (i: number, n: number) => `${i} of ${n}`,
  cursor: { view: 'View', drag: 'Drag', open: 'Open', go: 'Go' },
  newTab: '(opens in a new tab)',
  loading: 'Loading',
}

/* ------------------------------------------------------------------ */
/*  LANDING PAGE                                                       */
/* ------------------------------------------------------------------ */

export const hero = {
  id: 'hero',
  label: 'Intro',
  tone: 'c1' as Tone,
  eyebrow: site.tagline,
  h1Before: 'Price With',
  rolling: ['Evidence', 'Confidence', 'Clarity'],
  h1After: '. Grow With Confidence.',
  body: 'Yevanta centralizes your price lists, competitor price observations and pricing recommendations in one place. Every price change is reviewed by a person and kept on an approval trail.',
  cta: { label: 'Explore the Platform', to: routes.product },
  chips: ['Approved', 'Competitive', 'Traceable'],
  stats: [
    { value: 4, suffix: '', label: 'user roles' },
    { value: 5, suffix: '', label: 'core modules' },
    { value: 1, suffix: '', label: 'approval trail' },
  ],
  statsNote: 'Product facts',
  image: { src: '/images/hero.webp', width: 1134, height: 900 },
  chipsLabel: 'Key qualities',
  sceneAlt: 'A smiling shopper using her phone, surrounded by products and Find, Analysis and Enter steps leading to the correct pricing recommendation.',
}

export const trust = {
  id: 'trust',
  label: 'Industries',
  tone: 'c3' as Tone,
  title: 'Built for commercial teams in',
  industries: ['Retail', 'E-commerce', 'Consumer Goods', 'Marketplaces', 'B2B & SaaS', 'Wholesale'],
}

export const search = {
  id: 'search',
  label: 'Quick search',
  tone: 'c4' as Tone,
  eyebrow: 'Quick search',
  title: 'Find the ~capability~ you need.',
  lead: 'Type a topic and the feature cards below filter as you go.',
  placeholder: 'Search prices, competitors, approvals, models…',
  inputLabel: 'Search features',
  hint: 'Press / to focus',
  clear: 'Clear',
  suggestionsLabel: 'Try',
  suggestions: ['competitor', 'approval', 'margin', 'segment'],
  resultCount: (n: number, total: number) => `${n} of ${total} features match`,
  jump: 'Jump to card',
  empty: { title: 'No matches yet', body: 'Try a broader word like “price”, “approval” or “model”.' },
}

export const howItWorks = {
  id: 'how-it-works',
  label: 'How it works',
  tone: 'c2' as Tone,
  eyebrow: 'How it works',
  title: 'Five steps from record to ~result~.',
  lead: 'A clear, repeatable workflow: every price change starts from stored records, passes a human review and is measured afterwards.',
  steps: [
    { title: 'Register Products & Markets', body: 'Record products and categories with SKU, cost and margin floor, plus the markets, regions, channels and customer segments you sell into.', icon: 'table', image: '/images/how-1.webp' },
    { title: 'Load Prices & Competitor Data', body: 'Add price lists by market and channel, and competitor price observations, loaded by CSV import or manual entry.', icon: 'database', image: '/images/how-2.webp' },
    { title: 'Review Recommendations', body: 'Open recommendation records showing expected uplift and confidence, with margin-floor and rule checks alongside.', icon: 'search', image: '/images/how-3.webp' },
    { title: 'Approve or Adjust', body: 'A person approves, rejects or adjusts each recommendation. Every decision is kept on the approval trail.', icon: 'check', image: '/images/how-4.webp' },
    { title: 'Track Results', body: 'Approved changes are tracked so expected impact can be compared with realized results.', icon: 'chart', image: '/images/how-5.webp' },
  ],
  link: { label: 'See it in action', to: routes.product },
  stepLabel: 'Step',
  stepAlts: [
    'Illustration: a person setting up products and markets with charts and settings around them.',
    'Illustration: a team gathered at a screen loading prices and competitor data.',
    'Illustration: two people reviewing recommendation records with ratings and notes.',
    'Illustration: two people shaking hands over an approved decision, with balance scales above.',
    'Illustration: people climbing steps beside a light bulb, tracking improving results.',
  ],
}

export const features = {
  id: 'features',
  label: 'Features',
  tone: 'c4' as Tone,
  eyebrow: 'Features',
  title: 'Pricing work, ~organized~.',
  lead: 'One place for the records behind every price decision, from product costs to competitor observations to the review that approved the change.',
  items: [
    { key: 'registry', anim: 'registry', tag: 'Registry', title: 'Product & Market Registry', body: 'Products, categories, markets, channels and segments in one record set.', keywords: 'product market registry sku cost category channel region segment' },
    { key: 'price-lists', anim: 'history', tag: 'Prices', title: 'Price Lists & Change History', body: 'Price lists by market and channel, with dated change history.', keywords: 'price list change history effective date market channel' },
    { key: 'competitors', anim: 'competitors', tag: 'Competitors', title: 'Competitor Price Tracking', body: 'Competitor observations with source, date and price.', keywords: 'competitor price observation tracking csv import' },
    { key: 'position', anim: 'position', tag: 'Position', title: 'Price-Position Indicators', body: 'See where each price sits against stored competitor records.', keywords: 'price position indicator competitor above below' },
    { key: 'recommendations', anim: 'confidence', tag: 'Recommendations', title: 'AI Recommendations with Confidence', body: 'Recommendation records with expected uplift and confidence, reviewed by people.', keywords: 'ai recommendation confidence uplift review' },
    { key: 'rules', anim: 'shield', tag: 'Rules', title: 'Margin-Floor & Rule Checks', body: 'Flags any proposed price that breaches a margin floor or rule.', keywords: 'margin floor rule check market channel' },
    { key: 'growth', anim: 'bars', tag: 'Growth', title: 'Growth Opportunities by Segment', body: 'Opportunity records by customer segment, with owner and status.', keywords: 'growth opportunity segment customer owner status' },
    { key: 'models', anim: 'models', tag: 'Models', title: 'Pricing Model History', body: 'Model versions, deployment status and performance history.', keywords: 'pricing model history version forecast segmentation' },
  ],
  highlights: [
    { key: 'recommendation-review', anim: 'flow', tag: 'Highlight', title: 'Recommendations', body: 'Each recommendation record carries expected uplift and confidence, and is checked against margin floors and rules before a person decides.', keywords: 'recommendation review uplift confidence approve reject adjust' },
    { key: 'approval-trail', anim: 'trail', tag: 'Highlight', title: 'Approval Trail', body: 'Every price change is approved, rejected or adjusted by a person and recorded, so expected impact can later be compared with realized results.', keywords: 'approval trail audit review traceable results' },
  ],
  filterBanner: (n: number, q: string) => `Showing ${n} match${n === 1 ? '' : 'es'} for “${q}”`,
  benefits: {
    eyebrow: 'Why it matters',
    title: 'Every price change, ~accountable~.',
    image: '/images/why-it-matters.webp',
    imageAlt: 'A person reviewing product prices in an online store on a laptop while holding a payment card.',
    items: [
      { title: 'Traceable', body: 'Prices, competitor observations and decisions live in one place instead of scattered spreadsheets.', icon: '/icons/traceable.svg' },
      { title: 'Reviewed', body: 'Recommendations never change a price on their own. A person approves, rejects or adjusts every one.', icon: '/icons/reviewed.svg' },
      { title: 'Measurable', body: 'Expected impact is recorded up front and compared with realized results afterwards.', icon: '/icons/measurable.svg' },
    ],
  },
  stats: {
    note: 'Product facts',
    items: [
      { value: 4, decimals: 0, suffix: '', label: 'user roles' },
      { value: 5, decimals: 0, suffix: '', label: 'core modules' },
      { value: 1, decimals: 0, suffix: '', label: 'approval trail' },
      { value: 7, decimals: 0, suffix: '-day', label: 'delivery' },
    ],
  },
}

export const demo = {
  id: 'demo',
  label: 'Price-position simulator',
  tone: 'c3' as Tone,
  eyebrow: 'Try it',
  title: 'Check a ~price~ position.',
  lead: 'Move your price and see where it sits against three competitor observations, and whether it breaches the margin floor.',
  badge: 'Illustrative simulation',
  currency: '',
  price: { label: 'Your price', min: 15, max: 35, step: 0.1, initial: 24.9 },
  competitors: [
    { name: 'Competitor A', price: 22.5 },
    { name: 'Competitor B', price: 25.9 },
    { name: 'Competitor C', price: 27.4 },
  ],
  marginFloor: { label: 'Margin floor', value: 19.5 },
  labels: {
    position: 'Price position',
    vsAverage: 'vs. competitor average',
    floor: 'Margin floor',
    below: 'Below all competitors',
    within: 'Within the competitor range',
    above: 'Above all competitors',
    floorOk: 'Respects the margin floor',
    floorBreach: 'Breaches the margin floor. Needs review.',
    you: 'You',
    chart: 'Price scale with competitor observations, margin floor and your price',
  },
  disclaimer: 'Sample values for demonstration only. In Yevanta, positions are computed from your stored price and competitor records.',
}

export const highlights = {
  id: 'use-cases',
  label: 'Use cases',
  tone: 'c1' as Tone,
  eyebrow: 'Use cases',
  title: 'Built for ~commercial~ teams.',
  lead: 'For pricing managers, revenue growth managers, category managers, commercial analysts, sales operations managers and data scientists.',
  dragHint: 'Drag to explore',
  cards: [
    {
      image: '/images/use-case-retail.webp', alt: 'A smiling online seller packing an order beside her laptop.',
      tag: 'Segment', title: 'Retail & E-commerce',
      body: 'Keep price lists by market and channel side by side with competitor observations, and see where every price sits before it changes.',
      points: ['Price lists by market & channel', 'Competitor observations (CSV or manual)', 'Price-position indicators'],
    },
    {
      image: '/images/use-case-distribution.webp', alt: 'Two warehouse workers in safety vests checking boxed stock.',
      tag: 'Segment', title: 'Consumer Goods & Distribution',
      body: 'Apply margin floors and pricing rules across markets and channels, so no proposed price slips below your profitability thresholds.',
      points: ['Margin-floor & rule checks', 'Markets, regions & channels', 'Price-change history'],
    },
    {
      image: '/images/use-case-b2b.webp', alt: 'Two business colleagues in a meeting reviewing work on a laptop.',
      tag: 'Segment', title: 'B2B & SaaS Pricing',
      body: 'Track growth opportunities by customer segment and keep a reviewed, traceable approval trail behind every pricing decision.',
      points: ['Growth opportunities by segment', 'Recommendation review & approval', 'Expected vs realized results'],
    },
  ],
}

export const about = {
  id: 'about',
  label: 'About',
  tone: 'c4' as Tone,
  eyebrow: 'About Yevanta',
  title: 'From instinct to ~evidence~.',
  story: [
    'Too many price decisions still live in spreadsheets and instinct: price and competitor data sit in different places, reviews are slow and manual, and recommendations arrive with no record of who approved them.',
    'Yevanta replaces that with a traceable pricing workflow: one place for the records, a human review for every change, and a clear comparison of expected and realized results.',
  ],
  facts: [
    { label: 'Founder', value: company.founder },
    { label: 'Founded', value: company.foundedLabel },
    { label: 'Company', value: company.name },
    { label: 'Offices', value: 'Austin, USA · Colombo, Sri Lanka' },
  ],
  founded: { label: 'Founded', year: company.foundedYear, ring: `Founded ${company.foundedYear} · ${company.name} · ` },
  image: '/images/about.webp',
  imageAlt: 'The Yevanta team standing together in branded t-shirts in a bright office.',
  mission: 'Our mission is to make every price change explainable: grounded in records, reviewed by people and measured against what really happened.',
  missionLabel: 'Our mission',
  values: [
    { title: 'Evidence', body: 'Decisions start from stored records, not guesswork.', icon: '/icons/evidence.svg' },
    { title: 'Human review', body: 'People approve, reject or adjust every change.', icon: '/icons/human-review.svg' },
    { title: 'Traceability', body: 'Every decision stays on the approval trail.', icon: '/icons/traceability.svg' },
    { title: 'Measurement', body: 'Expected impact is checked against results.', icon: '/icons/measurement.svg' },
  ],
}

export const pricing = {
  id: 'pricing',
  label: 'Pricing',
  tone: 'c1' as Tone,
  eyebrow: 'Pricing',
  title: 'Plans that ~grow~ with you.',
  lead: 'Start with Starter or Growth, or talk to us about an Enterprise plan built around your markets, analytics and integrations.',
  /** Shown when a tier has no amount (Enterprise). */
  priceLabel: 'Custom',
  /** Billing period shown after an amount. */
  pricePeriod: '/ month',
  basisLabel: 'Commercial basis',
  note: 'Enterprise pricing is provided on request.',
  tiers: [
    {
      key: 'starter', name: 'Starter', desc: 'For teams centralizing their product, price and competitor records.',
      basis: 'Subscription by product count and market',
      /** Price shown on the card. null shows the priceLabel ("Custom"). */
      amount: '$99' as string | null,
      features: ['Product & market registry', 'Price lists & change history', 'Competitor observations', 'Price-position indicators'],
      cta: { label: 'Contact us', to: '#contact' },
      popular: '',
    },
    {
      key: 'growth', name: 'Growth', desc: 'For teams that want reviewed recommendations and a full approval trail.',
      basis: 'Pricing-module licensing plus recommendation review and approval',
      amount: '$199' as string | null,
      features: ['Everything in Starter', 'Recommendation review & approval', 'Margin-floor & rule checks', 'Growth opportunities by segment', 'Expected vs realized tracking'],
      cta: { label: 'Contact us', to: '#contact' },
      popular: 'Most Popular',
    },
    {
      key: 'enterprise', name: 'Enterprise', desc: 'For organizations with advanced analytics and integration needs.',
      basis: 'Analytics add-ons plus integration services for ERP, e-commerce and CRM',
      amount: null as string | null,
      features: ['Everything in Growth', 'Pricing model management', 'Analytics add-ons', 'Integration services (ERP, e-commerce, CRM)'],
      cta: { label: 'Contact us', to: '#contact' },
      popular: '',
    },
  ],
  compare: {
    title: 'Compare plans',
    featureCol: 'Capability',
    columns: ['Starter', 'Growth', 'Enterprise'],
    yes: 'Included',
    no: 'Not included',
    rows: [
      { label: 'Product & market registry', values: [true, true, true] },
      { label: 'Price lists & change history', values: [true, true, true] },
      { label: 'Competitor observations (CSV / manual)', values: [true, true, true] },
      { label: 'Recommendation review & approval', values: [false, true, true] },
      { label: 'Growth opportunities by segment', values: [false, true, true] },
      { label: 'Pricing model management', values: [false, false, true] },
      { label: 'Analytics add-ons', values: [false, false, true] },
      { label: 'Integration services', values: [false, false, 'ERP · e-commerce · CRM'] },
    ] as { label: string; values: (string | boolean)[] }[],
  },
  custom: { text: 'Need something custom?', link: { label: 'Talk to us', to: '#contact' } },
}

export const faq = {
  id: 'faq',
  label: 'FAQ',
  tone: 'c4' as Tone,
  eyebrow: 'FAQ',
  title: 'Questions, ~answered~.',
  lead: 'Can’t find what you’re looking for? Get in touch below.',
  image: '/images/faq.webp',
  imageAlt: 'A woman thinking through a question while working on her laptop.',
  items: [
    { q: 'What is Yevanta?', a: 'Yevanta is a pricing intelligence platform that helps businesses manage prices, evaluate competitor data, and make informed pricing decisions.' },
    { q: 'Who is Yevanta designed for?', a: 'Yevanta is built for pricing managers, revenue teams, category managers, and commercial analysts who need better pricing visibility and control.' },
    { q: 'Does Yevanta collect competitor prices automatically?', a: 'Competitor prices can be added manually or imported through CSV files. Live competitor-price collection is not currently provided.' },
    { q: 'Can Yevanta recommend price changes?', a: 'Yes. Yevanta helps evaluate pricing opportunities using stored price data, margin thresholds, and configurable pricing rules.' },
    { q: 'Are price changes automatically published?', a: 'Recommendations can be reviewed and approved by users. Automatic publishing depends on the available integrations and configured workflow.' },
    { q: 'Can Yevanta help protect profit margins?', a: 'Yes. Yevanta supports margin-floor checks to help identify proposed prices that fall below defined profitability thresholds.' },
  ],
}

export const contact = {
  id: 'contact',
  label: 'Contact',
  tone: 'c3' as Tone,
  eyebrow: 'Contact us',
  title: 'Let’s ~talk~ pricing.',
  lead: 'Tell us about your products, markets and team, and we’ll get back to you.',
  form: {
    name: 'Name',
    email: 'Email',
    phone: 'Phone (optional)',
    subject: 'Subject',
    subjectPlaceholder: 'Choose a subject',
    subjects: ['General question', 'Plans & quote', 'Product demo', 'Integration services'],
    message: 'Message',
    maxLength: 500,
    counter: (n: number, max: number) => `${n} / ${max}`,
    submit: 'Talk',
    sending: 'Sending…',
    success: { title: 'Message sent', body: 'Thanks, we’ll be in touch soon. (Front-end demo: nothing was actually sent.)', again: 'Send another' },
    errors: {
      name: 'Please enter your name.',
      email: 'Please enter a valid email address.',
      phone: 'Please enter a valid phone number.',
      subject: 'Please choose a subject.',
      message: 'Please write at least 10 characters.',
    },
  },
  info: {
    title: 'Get in touch',
    emailLabel: 'Email',
    email: company.email,
    officeLabels: { address: 'Address', phone: 'Phone' },
    offices: company.offices,
    mapAlt: 'A stylised map with rounded city blocks and a location pin.',
    note: '',
  },
  cta: {
    title: 'Ready to get started?',
    body: 'See how Yevanta brings prices, competitor data and approvals into one traceable workflow.',
    button: { label: 'Explore the Platform', to: routes.product },
  },
}

/* ------------------------------------------------------------------ */
/*  SHARED: FOOTER & COOKIES                                           */
/* ------------------------------------------------------------------ */

export const footer = {
  tone: 'c2' as Tone,
  newsletter: {
    title: 'Stay in the loop',
    body: 'Occasional product updates from Yevanta. No spam.',
    label: 'Email address',
    placeholder: 'you@example.com',
    button: 'Subscribe',
    success: 'You’re on the list!',
    error: 'Please enter a valid email.',
  },
  columns: [
    { title: 'Company', links: [
      { label: 'About', to: '/#about' },
      { label: 'How it works', to: '/#how-it-works' },
      { label: 'Contact', to: '/#contact' },
    ] },
    { title: 'Resources', links: [
      { label: 'Pricing', to: '/#pricing' },
      { label: 'FAQ', to: '/#faq' },
      { label: 'Capabilities', to: '/product#capabilities' },
      { label: 'NVIDIA SDK', to: '/product#sdk' },
    ] },
    { title: 'Legal', links: [
      { label: 'Privacy policy', to: routes.privacy },
      { label: 'Terms of service', to: routes.terms },
      { label: 'Cookie policy', to: routes.cookies },
    ] },
  ],
  socials: [
    { label: 'Social profile (placeholder)', href: '#', icon: 'x' },
    { label: 'Social profile (placeholder)', href: '#', icon: 'in' },
    { label: 'Social profile (placeholder)', href: '#', icon: 'camera' },
    { label: 'Social profile (placeholder)', href: '#', icon: 'play' },
  ],
  wordmark: site.brand,
  backToTop: 'Back to top',
  cookiePrefs: 'Cookie preferences',
  copyright: `© ${site.year} ${company.name}. All rights reserved.`,
  entities: company.offices.map((o) => `${o.legalName} (${o.region})`).join(' · '),
  email: company.email,
  placeholderNote: 'Social links and legal pages are placeholders.',
}

export const cookie = {
  title: 'A quick note on cookies',
  body: 'We use a few cookies to keep things running smoothly and to understand what helps. You choose.',
  accept: 'Accept',
  decline: 'Decline',
  storageKey: 'yevanta-cookie-consent',
  label: 'Cookie consent',
}

/* ------------------------------------------------------------------ */
/*  PRODUCT PAGE (client-supplied copy: keep wording as provided)      */
/* ------------------------------------------------------------------ */

export const productPage = {
  /** Floating hint, bottom right (opens the quick-jump palette). */
  quickJump: { keys: '+ K', label: 'Quick Jump & Search' },

  hero: {
    id: 'overview',
    label: 'Overview',
    kicker: { issue: 'ISSUE 01 // VOL. XXIV', partner: 'NVIDIA INCEPTION PARTNER SPECS', index: '[01 / 06] ARCHITECTURE', stream: 'REAL-TIME INGESTION' },
    badge: 'NVIDIA TensorRT & H100 Accelerated Intelligence',
    titleLead: 'Price With',
    rotating: ['Clarity', 'Evidence', 'Confidence', 'Precision'],
    body: 'Yevanta is the autonomous pricing engine for modern enterprise commerce. We process millions of concurrent competitor feeds, catalog shifts, and sentiment indicators to model dynamic price elasticity at sub-millisecond latency.',
    primary: { label: 'Explore the Dashboard', to: site.dashboardUrl },
    secondary: { label: 'NVIDIA SDK', to: '/product#sdk' },
    audit: {
      title: 'THROUGHPUT AUDIT',
      status: 'ACTIVE CUDA PIPELINE',
      headline: { value: '3.4M+', label: 'Price Adjustments / Sec' },
      stats: [
        { value: '< 0.8ms', label: 'Inference Latency' },
        { value: '99.999%', label: 'Uptime SLA' },
      ],
      bar: { label: 'NVIDIA Acceleration', value: 'H100 / TensorRT', percent: 92 },
    },
    meta: [
      { label: 'DOMAIN', value: 'yevanta.com' },
      { label: 'ACCELERATION', value: 'AWS EC2 P5 (H100)' },
      { label: 'FRAMEWORK', value: 'NVIDIA NeMo + cuDF' },
      { label: 'INDUSTRY', value: 'Commerce & Enterprise' },
    ],
  },

  simulator: {
    id: 'simulator',
    label: 'Elasticity simulator',
    eyebrow: '[02 / 06] INTERACTIVE DEMO ENGINE',
    title: 'Simulate Demand Elasticity in Real Time',
    lead: 'Test how Yevanta’s neural tensor models recalculate optimal price points against volatile market signals.',
    panel: { title: 'Variable Control Panel', tag: 'TENSOR-SIM V4' },
    sliders: [
      { key: 'basePrice', label: 'Base SKU List Price', min: 50, max: 1000, step: 1, initial: 249, prefix: '$', suffix: '', minLabel: '$50', maxLabel: '$1,000' },
      { key: 'competitorPrice', label: 'Competitor Index Price', min: 50, max: 1000, step: 1, initial: 229, prefix: '$', suffix: '', minLabel: '$50', maxLabel: '$1,000' },
      { key: 'inventoryLevel', label: 'Inventory Capacity Index', min: 1, max: 100, step: 1, initial: 85, prefix: '', suffix: '%', minLabel: 'Critical (1%)', maxLabel: 'Surplus (100%)' },
      { key: 'demandElasticity', label: 'Category Elasticity Coeff (Ed)', min: -3.5, max: -0.2, step: 0.1, initial: -1.8, prefix: '', suffix: '', minLabel: 'Highly Elastic (-3.5)', maxLabel: 'Inelastic (-0.2)' },
    ],
    output: {
      title: 'MODEL OUTPUT // REAL-TIME INFERENCE',
      badge: 'TensorRT FP16 Optimized',
      recommended: { label: 'Recommended Price', note: 'Optimal Margin Equilibrium' },
      variance: { label: 'Competitor Variance', note: 'Indexed against market leader' },
      margin: 'Projected Margin Lift',
      revenue: 'Estimated Revenue Impact',
      insightTitle: 'Yevanta Signal Analysis:',
      insight: (inventory: number, elasticity: number) =>
        ` High inventory volume (${inventory}%) paired with an elasticity coefficient of ${elasticity} triggers automatic velocity protection. The price is optimized to capitalize on volume without eroding category margin positioning.`,
    },
  },

  sdk: {
    id: 'sdk',
    label: 'NVIDIA SDK',
    eyebrow: '[03 / 06] NVIDIA SDK HARDWARE INTEGRATION',
    title: 'Built directly on GPU VRAM. Zero von Neumann bottlenecks.',
    lead: 'By decoupling microservices from standard CPU host memory and running high-concurrency pricing algorithms inside GPU VRAM primitives, Yevanta achieves unmatched data processing throughput.',
    tabs: [
      {
        id: 'rapids', name: 'NVIDIA RAPIDS (cuDF/cuML)', icon: 'database',
        tag: 'ETL ACCELERATION & VECTOR NORMALIZATION',
        title: 'NVIDIA RAPIDS (cuDF & cuML) Pipeline',
        paragraphs: [
          { strong: 'The Problem:', text: ' Traditional CPU-bound dataframes (Pandas/Spark) cause massive I/O thrashing and latencies when parsing millions of real-time competitor price drops, global exchange rates, and inventory shifts.' },
          { strong: 'Yevanta’s Implementation:', text: ' Raw incoming stream feeds are converted into GPU dataframes directly in VRAM via ', code: 'cuDF', after: '. We execute multi-currency conversions, catalog matching, and parallel vector normalization with zero CPU host-memory swaps.' },
        ],
        stats: [{ label: 'SPEEDUP VS PANDAS', value: '48.2x Faster' }, { label: 'MEMORY BANDWIDTH', value: '3.35 TB/sec' }],
      },
      {
        id: 'nemo', name: 'NVIDIA NeMo NLP', icon: 'code',
        tag: 'CONVERSATIONAL & UNSTRUCTURED TEXT NLP',
        title: 'NVIDIA NeMo Framework',
        paragraphs: [
          { strong: 'The Problem:', text: ' Understanding pricing intent from unstructured customer reviews, seller descriptions, promotional emails, and press releases requires deep domain-specific language understanding.' },
          { strong: 'Yevanta’s Implementation:', text: ' We utilize NVIDIA NeMo’s domain-specific tokenizers and conversational modules to perform fine-grained Named Entity Recognition (NER) and competitive sentiment extraction across global market feeds.' },
        ],
        stats: [{ label: 'NER ACCURACY', value: '99.1% Entity Match' }, { label: 'LATENCY PER DOC', value: '1.2ms Avg' }],
      },
      {
        id: 'tensorrt', name: 'NVIDIA TensorRT Engine', icon: 'zap',
        tag: 'QUANTIZED MODEL COMPILATION',
        title: 'NVIDIA TensorRT Compiler',
        paragraphs: [
          { strong: 'The Problem:', text: ' Deep multi-variable elasticity neural networks incur heavy latency spikes during flash sales and high-traffic shopping events.' },
          { strong: 'Yevanta’s Implementation:', text: ' Our PyTorch elasticity models are converted via ONNX and compiled into TensorRT runtime engines. Using FP16 and INT8 precision calibration with kernel fusion, we guarantee sub-millisecond execution even during Black Friday peak traffic.' },
        ],
        stats: [{ label: 'LATENCY REDUCTION', value: '87% Lower Latency' }, { label: 'PRECISION FORMAT', value: 'INT8 / FP16 Mixed' }],
      },
      {
        id: 'triton', name: 'Triton & NIM Microservices', icon: 'server',
        tag: 'MULTI-GPU MICROSERVICES & NIM',
        title: 'Triton Inference Server & NVIDIA NIM',
        paragraphs: [
          { strong: 'Enterprise Orchestration:', text: ' Yevanta deploys Triton Inference Server inside Amazon EKS clusters to handle dynamic batching, model versioning, and concurrent multi-GPU execution.' },
          { text: 'Standardized NVIDIA NIM microservice blueprints allow instant containerized horizontal autoscaling with minimal cold-start times across AWS P4 (A100) and P5 (H100) hardware tiers.' },
        ],
        stats: [{ label: 'CONTAINER COLD-START', value: '< 1.4s NIM Deploy' }, { label: 'GPU UTILIZATION', value: '96.4% Efficiency' }],
      },
    ],
    diagram: {
      title: 'SYSTEM DIAGRAM // GPU MEMORY PIPELINE',
      steps: [
        { label: 'DATA INGESTION', value: '100k+ SKU Stream / sec' },
        { arrow: '↓ GPU VRAM Direct Transfer' },
        { label: 'NVIDIA RAPIDS & NeMo', value: 'Vectorization + NER Matching', accent: true },
        { arrow: '↓ ONNX Export + TensorRT Compile' },
        { label: 'INFERENCE LAYER', value: 'Triton Multi-GPU Server' },
      ],
    },
  },

  benchmarks: {
    id: 'benchmarks',
    label: 'Benchmarks',
    eyebrow: '[04 / 06] AWS CLOUD ACCELERATION & BENCHMARKS',
    title: 'Hardware Benchmark Matrix',
    tiers: [
      { id: 'cpu', label: 'Standard CPU Node' },
      { id: 'a100', label: 'AWS P4 (A100 80GB)' },
      { id: 'h100', label: 'AWS P5 (H100 Hopper)' },
    ],
    initialTier: 'h100',
    cards: [
      {
        label: 'PROCESSING LATENCY',
        values: { cpu: '18.4 ms', a100: '2.1 ms', h100: '0.45 ms' },
        notes: {
          cpu: 'Severe thread blocking under continuous catalog feed ingestion.',
          a100: 'High speed parallel inference for medium-sized catalog workloads.',
          h100: 'Sub-millisecond dynamic price calculation powered by Transformer Engine.',
        },
      },
      {
        label: 'CATALOG INGESTION VOLUME',
        values: { cpu: '12k SKUs/s', a100: '450k SKUs/s', h100: '2.8M SKUs/s' },
        notes: {
          cpu: 'Bottlenecked by host RAM CPU cache transfers.',
          a100: 'Accelerated with cuDF CUDA memory primitives.',
          h100: 'Maximum high-bandwidth HBM3 memory throughput.',
        },
      },
      {
        label: 'MEMORY BANDWIDTH',
        values: { cpu: '102 GB/s', a100: '2,039 GB/s', h100: '3,350 GB/s' },
        notes: {
          cpu: 'DDR5 DRAM limits concurrent matrix operations.',
          a100: 'HBM2e memory prevents matrix OOM faults.',
          h100: 'Ultra-high HBM3 memory bandwidth for massive model execution.',
        },
      },
    ],
    footnote: 'NVIDIA Inception Program Compute Grant Alignment',
    /** Client copy had no target for this link yet: it points at the SDK section until a document URL is supplied. */
    docLink: { label: 'Read Technical Justification Documentation →', to: '/product#sdk' },
  },

  capabilities: {
    id: 'capabilities',
    label: 'Capabilities',
    eyebrow: '[05 / 06] SYSTEM CAPABILITIES MATRIX',
    title: 'Enterprise Product Features',
    lead: 'Designed for high-scale enterprise retail, marketplace aggregators, and global e-commerce networks.',
    tabs: [
      {
        id: 'ingestion', title: '01. Real-Time Ingestion', desc: 'Continuous parsing of competitor pricing matrices.', icon: 'database',
        heading: 'High-Velocity Data Ingestion Engine',
        body: 'Yevanta continuously ingests unstructured web feeds, raw marketplace APIs, global currency exchange updates, and direct ERP inventory logs. By streaming raw data feeds straight to GPU VRAM using cuDF, we eliminate pipeline processing backlog during mega-sale events.',
        points: ['Parallel multi-currency normalization', 'Direct streaming connectors for SAP, Salesforce Commerce, and Shopify Plus', 'Automatic proxy rotation and bot mitigation bypass'],
      },
      {
        id: 'nlp', title: '02. Catalog Sentiment NLP', desc: 'Product matching and promo intent extraction.', icon: 'code',
        heading: 'Contextual Product Matching & Intent NLP',
        body: 'Comparing identical products across competitor sites is notoriously complex due to missing SKUs, altered titles, and bundled promotions. Our NVIDIA NeMo powered NLP models perform deep semantic matching to pair exact and substitute products across disparate feeds.',
        points: ['Named Entity Recognition (NER) for brand, size, color, and pack spec', 'Promotional code & discount strategy extraction', 'Multi-language title & description alignment'],
      },
      {
        id: 'elasticity', title: '03. Dynamic Price Engine', desc: 'Predictive elasticity modeling.', icon: 'chart',
        heading: 'Transformer-Based Price Elasticity Engine',
        body: 'Rather than relying on static rules, Yevanta deploys continuous PyTorch neural networks optimized with NVIDIA TensorRT to calculate dynamic price elasticity coefficients for every single SKU in your catalog in real time.',
        points: ['Multi-variable demand prediction under supply constraints', 'Automated cross-product cannibalization modeling', 'Real-time price optimization loops'],
      },
      {
        id: 'governance', title: '04. Enterprise Guardrails', desc: 'Margin protection and strategy overrides.', icon: 'lock',
        heading: 'Enterprise Strategy & Floor-Price Safeguards',
        body: 'Complete commercial control over AI recommendations. Define absolute floor margins, MAP (Minimum Advertised Price) compliance rules, brand equity protection constraints, and manual override thresholds across catalog segments.',
        points: ['Hard floor-margin safety locks', 'Role-based executive approval workflows', 'Audit-ready decision explainability logs'],
      },
    ],
  },

  onboarding: {
    id: 'onboarding',
    label: 'Onboarding',
    eyebrow: '[06 / 06] ENTERPRISE ONBOARDING',
    title: 'Ready to Accelerate Your Pricing Architecture?',
    body: 'Transform your business growth trajectory with GPU-accelerated intelligence. Request early access to Yevanta’s dashboard or coordinate directly with our engineering team.',
    primary: { label: 'Pricing Plan', to: '/#pricing' },
    secondary: { label: 'Contact us', to: '/#contact' },
    meta: ['Production Domain: yevanta.com', 'NVIDIA Inception Partner Portfolio', 'AWS EC2 P5 Target Framework'],
  },
}

export const notFound = {
  code: '404',
  title: 'This page ~wandered~ off.',
  body: 'The page you’re looking for doesn’t exist or has moved.',
  cta: { label: 'Back home', to: routes.home },
}

/* ------------------------------------------------------------------ */
/*  LEGAL PLACEHOLDER PAGES                                            */
/* ------------------------------------------------------------------ */

export const legal = {
  eyebrow: 'Legal',
  status: 'Placeholder page',
  body: `This document is being prepared and will be published here. Until then, please contact us at ${company.email} with any questions.`,
  contactLink: { label: 'Contact us', to: '/#contact' },
  homeLink: { label: 'Back home', to: routes.home },
  cookieSettings: 'Change cookie preferences',
  pages: {
    privacy: { path: routes.privacy, title: 'Privacy ~policy~.' },
    terms: { path: routes.terms, title: 'Terms of ~service~.' },
    cookies: { path: routes.cookies, title: 'Cookie ~policy~.' },
  },
}

/* ------------------------------------------------------------------ */
/*  SEO (per route): used at runtime and to pre-render HTML at build   */
/* ------------------------------------------------------------------ */

export type SeoEntry = {
  path: string
  title: string
  description: string
  /** Pages with `index: false` get `noindex` and are left out of the sitemap. */
  index: boolean
  changefreq?: 'weekly' | 'monthly' | 'yearly'
  priority?: number
}

export const seo = {
  ogImage: '/og-image.jpg',
  ogImageAlt: 'Yevanta: Business Growth & Pricing Intelligence',
  twitterCard: 'summary_large_image',
  pages: {
    home: {
      path: routes.home,
      title: site.meta.homeTitle,
      description: 'Yevanta centralizes price lists, competitor price observations and pricing recommendations, with a human review and approval trail behind every price change.',
      index: true, changefreq: 'weekly', priority: 1,
    },
    product: {
      path: routes.product,
      title: site.meta.productTitle,
      description: 'Yevanta is the autonomous pricing engine for modern enterprise commerce, accelerated with NVIDIA TensorRT, NeMo and RAPIDS.',
      index: true, changefreq: 'weekly', priority: 0.9,
    },
    privacy: { path: routes.privacy, title: 'Privacy policy | Yevanta', description: 'Yevanta privacy policy (placeholder, to be published).', index: false },
    terms: { path: routes.terms, title: 'Terms of service | Yevanta', description: 'Yevanta terms of service (placeholder, to be published).', index: false },
    cookies: { path: routes.cookies, title: 'Cookie policy | Yevanta', description: 'Yevanta cookie policy (placeholder, to be published).', index: false },
    notFound: { path: '/404', title: site.meta.notFoundTitle, description: 'The page you are looking for does not exist or has moved.', index: false },
  } satisfies Record<string, SeoEntry>,
}

/* ------------------------------------------------------------------ */
/*  INDEXES (counter + quick-jump palette)                             */
/* ------------------------------------------------------------------ */

export const landingSections = [hero, trust, search, howItWorks, features, demo, highlights, about, pricing, faq, contact]
  .map(({ id, label }) => ({ id, label }))

export const productSections = [productPage.hero, productPage.simulator, productPage.sdk, productPage.benchmarks, productPage.capabilities, productPage.onboarding]
  .map(({ id, label }) => ({ id, label }))

export const palettePages = [
  { label: 'Landing page', to: routes.home, hint: '/' },
  { label: 'Platform page', to: routes.product, hint: '/product' },
]
