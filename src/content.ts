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
  /** Official social profiles (client-supplied). Footer, Contact card and search-engine data (sameAs). */
  socials: [
    { network: 'Facebook', label: 'Yevanta on Facebook', href: 'https://www.facebook.com/Yevanta/', icon: 'facebook' },
    { network: 'Medium', label: 'Yevanta on Medium', href: 'https://medium.com/@yevanta_digital_solutions/about', icon: 'medium' },
    { network: 'YouTube', label: 'Yevanta on YouTube', href: 'https://www.youtube.com/@YevantaDigitalSolutions', icon: 'youtube' },
    { network: 'LinkedIn', label: 'Yevanta on LinkedIn', href: 'https://www.linkedin.com/company/yevanta-digital-solutions/', icon: 'linkedin' },
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
  image: { src: '/images/hero.webp', width: 880, height: 762 },
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
    socialsLabel: 'Follow us',
    socials: company.socials,
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
    ] },
    { title: 'Legal', links: [
      { label: 'Privacy policy', to: routes.privacy },
      { label: 'Terms and conditions', to: routes.terms },
    ] },
  ],
  socials: company.socials,
  wordmark: site.brand,
  backToTop: 'Back to top',
  cookiePrefs: 'Cookie preferences',
  copyright: `© ${site.year} ${company.name}. All rights reserved.`,
  entities: company.offices.map((o) => `${o.legalName} (${o.region})`).join(' · '),
  email: company.email,
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
  updatedLabel: 'Last updated',
  tocLabel: 'On this page',
  contactLink: { label: 'Contact us', to: '/#contact' },
  homeLink: { label: 'Back home', to: routes.home },
  /** Client-supplied documents (TermsFeed), October 2026. HTML is trusted, static content from this repo. */
  pages: {
    privacy: {
      path: routes.privacy,
      title: 'Privacy ~Policy~',
      updated: 'October 21, 2026',
      toc: [{"id":"interpretation-and-definitions","label":"Interpretation and Definitions"},{"id":"collecting-and-using-your-personal-information","label":"Collecting and Using Your Personal Information"},{"id":"detailed-information-on-the-processing-of-your-personal-data","label":"Detailed Information on the Processing of Your Personal Data"},{"id":"childrens-and-minors-privacy","label":"Children's and Minors' Privacy"},{"id":"links-to-other-websites","label":"Links to Other Websites"},{"id":"changes-to-this-privacy-policy","label":"Changes to this Privacy Policy"},{"id":"contact-us","label":"Contact Us"}],
      html: `
<p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
<p>We use Your Personal Data to provide and improve the Service. We collect, use, and disclose Your information as described in this Privacy Policy and, where required by applicable law, only where We have a valid legal basis to do so, including Your consent (where consent is required). This Privacy Policy has been created with the help of the <a href="https://www.termsfeed.com/privacy-policy-generator/" target="_blank" rel="nofollow noopener noreferrer">Privacy Policy Generator</a>.</p>
<h2 id="interpretation-and-definitions">Interpretation and Definitions</h2>
<h3>Interpretation</h3>
<p>The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
<h3>Definitions</h3>
<p>For the purposes of this Privacy Policy:</p>
<ul>
<li>
<p><strong>Account</strong> means a unique account created for You to access Our Service or parts of Our Service.</p>
</li>
<li>
<p><strong>Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</p>
</li>
<li>
<p><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Privacy Policy) refers to yevanta.</p>
</li>
<li>
<p><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website, among its many uses.</p>
</li>
<li>
<p><strong>Country/State</strong> refers to: Texas, United States.</p>
</li>
<li>
<p><strong>Device</strong> means any device that can access the Service, such as a computer, a cell phone or a digital tablet.</p>
</li>
<li>
<p><strong>Personal Data</strong> (or &quot;Personal Information&quot;) is any information that relates to an identified or identifiable individual.</p>
<p>We use &quot;Personal Data&quot; and &quot;Personal Information&quot; interchangeably unless a law uses a specific term.</p>
</li>
<li>
<p><strong>Service</strong> refers to the Website.</p>
</li>
<li>
<p><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</p>
</li>
<li>
<p><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</p>
</li>
<li>
<p><strong>User</strong> means any individual who accesses or uses the Service.</p>
</li>
<li>
<p><strong>Website</strong> refers to yevanta, accessible from <a href="/" data-internal>https://yevanta.com/</a>.</p>
</li>
<li>
<p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
</li>
</ul>
<h2 id="collecting-and-using-your-personal-information">Collecting and Using Your Personal Information</h2>
<h3>Types of Data Collected</h3>
<h4>Personal Data</h4>
<p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>
<ul>
<li>Email address</li>
<li>First name and last name</li>
<li>Phone number</li>
<li>Address, State, Province, ZIP/Postal code, City</li>
</ul>
<h4>Usage Data</h4>
<p>Usage Data is collected automatically when using the Service.</p>
<p>Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of Our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
<p>When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device's unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</p>
<p>We may also collect information that Your browser sends whenever You visit Our Service or when You access the Service by or through a mobile device.</p>
<h4>Tracking Technologies and Cookies</h4>
<p>We use tracking technologies (such as cookies) to track the activity and to improve Our Service. The technologies We use may include:</p>
<ul>
<li><strong>Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of Our Service.</li>
<li><strong>Web Beacons.</strong> Certain sections of Our Service may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).</li>
</ul>
<p>Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser.</p>
<p>Where required by law, We use non-essential cookies (that is, Cookies other than the Necessary / Essential Cookies described below) only with Your consent. You can withdraw or change Your consent at any time using Our cookie preferences tool (if available) or through Your browser/device settings. Withdrawing consent does not affect the lawfulness of processing based on consent before its withdrawal.</p>
<p>We use both Session and Persistent Cookies for the purposes set out below:</p>
<ul>
<li>
<p><strong>Necessary / Essential Cookies</strong></p>
<p>Type: Session Cookies</p>
<p>Administered by: Us</p>
<p>Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</p>
</li>
<li>
<p><strong>Cookies Policy / Notice Acceptance Cookies</strong></p>
<p>Type: Persistent Cookies</p>
<p>Administered by: Us</p>
<p>Purpose: These Cookies identify whether users have accepted the use of cookies on the Website and record the consent choices You have made, so that We can honor those choices on future visits.</p>
</li>
<li>
<p><strong>Functionality Cookies</strong></p>
<p>Type: Persistent Cookies</p>
<p>Administered by: Us</p>
<p>Purpose: These Cookies allow Us to remember choices You make when You use the Website, such as remembering Your Account login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter Your preferences every time You use the Website.</p>
</li>
</ul>
<h3>Use of Your Personal Data</h3>
<p>The Company may use Personal Data for the following purposes:</p>
<ul>
<li>
<p><strong>To provide and maintain Our Service</strong>, including to monitor the usage of Our Service.</p>
</li>
<li>
<p><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</p>
</li>
<li>
<p><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</p>
</li>
<li>
<p><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</p>
</li>
<li>
<p><strong>To provide You</strong> with news, special offers, and general information about other goods, services and events which We offer that are similar to those that You have already purchased or inquired about. We send such marketing communications only where permitted by applicable law: where prior consent is required (for example, under the laws applicable in the EEA and the UK), We will send them only with Your consent; otherwise, We may send them until You opt out. You may opt out or withdraw Your consent at any time by using the unsubscribe link in any marketing email We send or by contacting Us.</p>
</li>
<li>
<p><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</p>
</li>
<li>
<p><strong>For business transfers:</strong> We may use Your Personal Data to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about Our Service users is among the assets transferred.</p>
</li>
<li>
<p><strong>For other purposes</strong>: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of Our promotional campaigns, and evaluating and improving Our Service, products, services, marketing and Your experience.</p>
</li>
</ul>
<p>We may share Your Personal Data in the following situations:</p>
<ul>
<li><strong>With Service Providers:</strong> We may share Your Personal Data with Service Providers to monitor and analyze the use of Our Service, and to contact You.</li>
<li><strong>For business transfers:</strong> We may share or transfer Your Personal Data in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</li>
<li><strong>With Affiliates:</strong> We may share Your Personal Data with Our affiliates, in which case We will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</li>
<li><strong>With other users:</strong> If Our Service offers public areas, when You share Personal Data or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside the Service.</li>
<li><strong>With Your consent</strong>: We may disclose Your Personal Data for any other purpose with Your consent.</li>
</ul>
<h4>Text Messages Privacy Notice</h4>
<p>You have the option to receive text (SMS) messages from Us. If You opt in to text messages, We will send You updates, notifications, and other communications as described below. When You opt in, We will collect and store the information You provide in connection with text messaging, such as Your phone number, the date and method of Your consent, and message delivery and read information.</p>
<p>No mobile information will be shared with or sold to third parties or affiliates for marketing or promotional purposes. The phone numbers and consent records We collect for texting are never shared with anyone for any purpose, except the Service Providers that technically have to handle them to deliver the texts.</p>
<p>Consent to receive text messages is not a condition of any purchase or use of Our Service. If You consent to receive SMS from Us, You agree to receive text messages from Us related to:</p>
<ul>
<li>Customer care and support</li>
<li>Account notifications, such as activity, status, or renewal reminders</li>
<li>Delivery notifications and updates on the status of a delivery</li>
<li>Authentication messages, such as one-time passwords (OTP) and passcodes</li>
<li>Security alerts, such as suspicious login attempts or unusual account activity</li>
<li>Marketing and promotional offers, discounts, and other promotional content</li>
</ul>
<p>Reply STOP to opt-out. Reply HELP for support. Message &amp; data rates may apply. Messaging frequency may vary. Carriers are not liable for delayed or undelivered messages.</p>
<h3>Retention of Your Personal Data</h3>
<p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with Our legal obligations (for example, if We are required to retain Your data to comply with applicable laws), resolve disputes, and enforce Our legal agreements and policies.</p>
<p>Where possible, We apply shorter retention periods and/or reduce identifiability by deleting, aggregating, or anonymizing data. Unless otherwise stated, the retention periods below are maximum periods (&quot;up to&quot;) and We may delete or anonymize data sooner when it is no longer needed for the relevant purpose. We apply different retention periods to different categories of Personal Data based on the purpose of processing and legal obligations:</p>
<ul>
<li>
<p>Account Information</p>
<ul>
<li>User Accounts: retained for the duration of Your Account relationship plus up to 24 months after account closure to handle any post-termination issues or resolve disputes.</li>
</ul>
</li>
<li>
<p>Customer Support Data</p>
<ul>
<li>Support tickets and correspondence: up to 24 months from the date of ticket closure to resolve follow-up inquiries, track service quality, and defend against potential legal claims.</li>
<li>Chat transcripts: up to 24 months for quality assurance and staff training purposes.</li>
</ul>
</li>
<li>
<p>Usage Data</p>
<ul>
<li>
<p>Website analytics data (cookies, IP addresses, device identifiers): up to 24 months from the date of collection, which allows us to analyze trends while respecting privacy principles.</p>
</li>
<li>
<p>Server logs (IP addresses, access times): up to 24 months for security monitoring and troubleshooting purposes.</p>
</li>
</ul>
</li>
</ul>
<p>Usage Data is retained in accordance with the retention periods described above, and may be retained longer only where necessary for security, fraud prevention, or legal compliance.</p>
<p>We may retain Personal Data beyond the periods stated above for different reasons:</p>
<ul>
<li>Legal obligation: We are required by law to retain specific data (e.g., financial records for tax authorities).</li>
<li>Legal claims: Data is necessary to establish, exercise, or defend legal claims.</li>
<li>Your explicit request: You ask Us to retain specific information.</li>
<li>Technical limitations: Data exists in backup systems that are scheduled for routine deletion.</li>
</ul>
<p>You may request information about how long We will retain Your Personal Data by contacting Us.</p>
<p>When retention periods expire, We securely delete or anonymize Personal Data according to the following procedures:</p>
<ul>
<li>Deletion: Personal Data is removed from Our systems and no longer actively processed.</li>
<li>Backup retention: Residual copies may remain in encrypted backups for a limited period consistent with Our backup retention schedule and are not restored except where necessary for security, disaster recovery, or legal compliance.</li>
<li>Anonymization: In some cases, We convert Personal Data into anonymous statistical data that cannot be linked back to You. This anonymized data may be retained indefinitely for research and analytics.</li>
</ul>
<h3>Transfer of Your Personal Data</h3>
<p>Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. This means that this information may be transferred to, and maintained on, computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of Your jurisdiction.</p>
<p>Where required by applicable law, We will ensure that international transfers of Your Personal Data are subject to appropriate safeguards and, where relevant, supplementary measures. The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place, including the security of Your data and other personal information.</p>
<h3>Delete Your Personal Data</h3>
<p>You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.</p>
<p>Our Service may give You the ability to delete certain information about You from within the Service.</p>
<p>You may update, amend, or delete Your information at any time by signing in to Your Account, if You have one, and visiting the account settings section that allows You to manage Your personal information. You may also contact Us to request access to, correct, or delete any Personal Data that You have provided to Us.</p>
<p>Please note, however, that We may need to retain certain information when We have a legal obligation or lawful basis to do so.</p>
<h3>Disclosure of Your Personal Data</h3>
<h4>Business Transactions</h4>
<p>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.</p>
<h4>Law Enforcement</h4>
<p>Under certain circumstances, the Company may disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p>
<h4>Other Legal Requirements</h4>
<p>The Company may disclose Your Personal Data in the good-faith belief that such action is necessary to:</p>
<ul>
<li>Comply with a legal obligation</li>
<li>Protect and defend the rights or property of the Company</li>
<li>Prevent or investigate possible wrongdoing in connection with the Service</li>
<li>Protect the personal safety of Users of the Service or the public</li>
<li>Protect against legal liability</li>
</ul>
<h3>Security of Your Personal Data</h3>
<p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While We strive to use commercially reasonable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
<h2 id="detailed-information-on-the-processing-of-your-personal-data">Detailed Information on the Processing of Your Personal Data</h2>
<p>The Service Providers We use may have access to Your Personal Data. These third-party vendors collect, store, use, process and transfer information about Your activity on Our Service in accordance with their Privacy Policies.</p>
<h3>Usage, Performance and Miscellaneous</h3>
<p>We may use third-party Service Providers to maintain and improve Our Service.</p>
<ul>
<li>
<p><strong>Mouseflow</strong></p>
<p>Mouseflow is a session replay and heatmap tool that shows how visitors click, move, scroll, browse, and pay attention on websites. The service is operated by Mouseflow ApS.</p>
<p>Mouseflow service may collect information from Your device.</p>
<p>The information gathered by Mouseflow is held in accordance with its Privacy Policy: <a href="https://mouseflow.com/privacy/" target="_blank" rel="nofollow noopener noreferrer">https://mouseflow.com/privacy/</a></p>
</li>
<li>
<p><strong>FreshDesk</strong></p>
<p>FreshDesk is customer support software. The service is operated by Freshworks, Inc.</p>
<p>FreshDesk service may collect information from Your Device.</p>
<p>The information gathered by FreshDesk is held in accordance with its Privacy Policy: <a href="https://www.freshworks.com/privacy/" target="_blank" rel="nofollow noopener noreferrer">https://www.freshworks.com/privacy/</a></p>
</li>
<li>
<p><strong>Google Places</strong></p>
<p>Google Places is a service that returns information about places using HTTP requests. It is operated by Google.</p>
<p>Google Places service may collect information from You and from Your Device for security purposes.</p>
<p>The information gathered by Google Places is held in accordance with the Privacy Policy of Google: <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="nofollow noopener noreferrer">https://www.google.com/intl/en/policies/privacy/</a></p>
</li>
</ul>
<h2 id="childrens-and-minors-privacy">Children's and Minors' Privacy</h2>
<p>The Service is not directed to, and We do not knowingly collect Personal Information from, anyone under the age of 16.</p>
<p>If You are a parent or guardian and You believe Your child has provided Us with Personal Information, please contact Us. If We become aware that We have collected Personal Information from anyone under the age of 16, We will take steps to remove that information from Our servers as soon as reasonably possible.</p>
<p>Some countries and states set a higher age at which an individual can consent to the processing of their own Personal Information. Where We rely on consent as a legal basis and the law applicable to a User sets an age higher than 16, We may require the consent of that User's parent or guardian before We collect and use their Personal Information.</p>
<h2 id="links-to-other-websites">Links to Other Websites</h2>
<p>Our Service may contain links to other websites that are not operated by Us. If You click on a third-party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.</p>
<p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third-party sites or services.</p>
<h2 id="changes-to-this-privacy-policy">Changes to this Privacy Policy</h2>
<p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>
<p>We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last updated&quot; date at the top of this Privacy Policy.</p>
<p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
<h2 id="contact-us">Contact Us</h2>
<p>If You have any questions about this Privacy Policy, You can contact Us:</p>
<ul>
<li>
<p>By email: <a href="mailto:info@yevanta.com">info@yevanta.com</a></p>
</li>
<li>
<p>By visiting this page on Our Website: <a href="/#contact" data-internal>yevanta.com/#contact</a></p>
</li>
<li>
<p>By phone (USA): <a href="tel:+12143280238">+1 214 328 0238</a></p>
</li>
<li>
<p>By phone (Sri Lanka): <a href="tel:+94760230238">+94 76 023 0238</a></p>
</li>
<li>
<p>By mail: USA Address: 515 Congress Avenue, Austin, TX 78701, USA</p>
</li>
<li>
<p>By mail: Sri Lanka Address: No. 48, Bauddhaloka Mawatha, Colombo 04, Sri Lanka</p>
</li>
</ul>
`,
    },
    terms: {
      path: routes.terms,
      title: 'Terms and ~Conditions~',
      updated: 'October 21, 2026',
      toc: [{"id":"interpretation-and-definitions","label":"Interpretation and Definitions"},{"id":"acknowledgment","label":"Acknowledgment"},{"id":"links-to-other-websites","label":"Links to Other Websites"},{"id":"termination","label":"Termination"},{"id":"limitation-of-liability","label":"Limitation of Liability"},{"id":"as-is-and-as-available-disclaimer","label":"\"AS IS\" and \"AS AVAILABLE\" Disclaimer"},{"id":"governing-law","label":"Governing Law"},{"id":"disputes-resolution","label":"Disputes Resolution"},{"id":"for-european-union-eu-users","label":"For European Union (EU) Users"},{"id":"united-states-legal-compliance","label":"United States Legal Compliance"},{"id":"severability-and-waiver","label":"Severability and Waiver"},{"id":"translation-interpretation","label":"Translation Interpretation"},{"id":"changes-to-these-terms-and-conditions","label":"Changes to These Terms and Conditions"},{"id":"contact-us","label":"Contact Us"}],
      html: `
<p>Please read these terms and conditions carefully before using Our Service.</p>
<h2 id="interpretation-and-definitions">Interpretation and Definitions</h2>
<h3>Interpretation</h3>
<p>The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
<h3>Definitions</h3>
<p>For the purposes of these Terms and Conditions:</p>
<ul>
<li>
<p><strong>Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</p>
</li>
<li>
<p><strong>Country/State</strong> refers to: Texas, United States</p>
</li>
<li>
<p><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in these Terms and Conditions) refers to yevanta.</p>
</li>
<li>
<p><strong>Device</strong> means any device that can access the Service such as a computer, a cell phone or a digital tablet.</p>
</li>
<li>
<p><strong>Service</strong> refers to the Website.</p>
</li>
<li>
<p><strong>Terms and Conditions</strong> (also referred to as &quot;Terms&quot;) means these Terms and Conditions, including any documents expressly incorporated by reference, which govern Your access to and use of the Service and form the entire agreement between You and the Company regarding the Service. These Terms and Conditions have been created with the help of the <a href="https://www.termsfeed.com/terms-conditions-generator/" target="_blank" rel="nofollow noopener noreferrer">Terms and Conditions Generator</a>.</p>
</li>
<li>
<p><strong>Third-Party Social Media Service</strong> means any services or content (including data, information, products or services) provided by a third party that is displayed, included, made available, or linked to through the Service.</p>
</li>
<li>
<p><strong>Website</strong> refers to yevanta, accessible from <a href="/" data-internal>https://yevanta.com/</a></p>
</li>
<li>
<p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
</li>
</ul>
<h2 id="acknowledgment">Acknowledgment</h2>
<p>These are the Terms and Conditions governing the use of this Service and the agreement between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
<p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</p>
<p>By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.</p>
<p>You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.</p>
<p>Your access to and use of the Service is also subject to Our Privacy Policy, which describes how We collect, use, and disclose personal information. Please read Our Privacy Policy carefully before using Our Service.</p>
<h2 id="links-to-other-websites">Links to Other Websites</h2>
<p>Our Service may contain links to third-party websites or services that are not owned or controlled by the Company.</p>
<p>The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such websites or services.</p>
<p>We strongly advise You to read the terms and conditions and privacy policies of any third-party websites or services that You visit.</p>
<h3>Links from a Third-Party Social Media Service</h3>
<p>The Service may display, include, make available, or link to content or services provided by a Third-Party Social Media Service. A Third-Party Social Media Service is not owned or controlled by the Company, and the Company does not endorse or assume responsibility for any Third-Party Social Media Service.</p>
<p>You acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with Your access to or use of any Third-Party Social Media Service, including any content, goods, or services made available through them. Your use of any Third-Party Social Media Service is governed by that Third-Party Social Media Service's terms and privacy policies.</p>
<h2 id="termination">Termination</h2>
<p>We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</p>
<p>Upon termination, Your right to use the Service will cease immediately.</p>
<h2 id="limitation-of-liability">Limitation of Liability</h2>
<p>Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of these Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.</p>
<p>To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of these Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.</p>
<p>Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party's liability will be limited to the greatest extent permitted by law.</p>
<h2 id="as-is-and-as-available-disclaimer">&quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer</h2>
<p>The Service is provided to You &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.</p>
<p>Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.</p>
<p>Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.</p>
<h2 id="governing-law">Governing Law</h2>
<p>The laws of the Country/State, excluding its conflicts of law rules, shall govern these Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.</p>
<h2 id="disputes-resolution">Disputes Resolution</h2>
<p>If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.</p>
<h2 id="for-european-union-eu-users">For European Union (EU) Users</h2>
<p>If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which You are resident.</p>
<h2 id="united-states-legal-compliance">United States Legal Compliance</h2>
<p>You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a &quot;terrorist supporting&quot; country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.</p>
<h2 id="severability-and-waiver">Severability and Waiver</h2>
<h3>Severability</h3>
<p>If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.</p>
<h3>Waiver</h3>
<p>Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not affect a party's ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.</p>
<h2 id="translation-interpretation">Translation Interpretation</h2>
<p>These Terms and Conditions may have been translated if We have made them available to You on our Service.
You agree that the original English text shall prevail in the case of a dispute.</p>
<h2 id="changes-to-these-terms-and-conditions">Changes to These Terms and Conditions</h2>
<p>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.</p>
<p>By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the Service.</p>
<h2 id="contact-us">Contact Us</h2>
<p>If you have any questions about these Terms and Conditions, You can contact us:</p>
<ul>
<li>
<p>By email: <a href="mailto:info@yevanta.com">info@yevanta.com</a></p>
</li>
<li>
<p>By visiting this page on our website: <a href="/#contact" data-internal>yevanta.com/#contact</a></p>
</li>
<li>
<p>By phone (USA): <a href="tel:+12143280238">+1 214 328 0238</a></p>
</li>
<li>
<p>By phone (Sri Lanka): <a href="tel:+94760230238">+94 76 023 0238</a></p>
</li>
<li>
<p>By mail: USA Address: 515 Congress Avenue, Austin, TX 78701, USA</p>
</li>
<li>
<p>By mail: Sri Lanka Address: No. 48, Bauddhaloka Mawatha, Colombo 04, Sri Lanka</p>
</li>
</ul>
`,
    },
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
    privacy: { path: routes.privacy, title: 'Privacy Policy | Yevanta', description: 'How Yevanta collects, uses, retains and protects your personal information, and the privacy rights you have.', index: true, changefreq: 'yearly', priority: 0.3 },
    terms: { path: routes.terms, title: 'Terms and Conditions | Yevanta', description: 'The terms and conditions that govern your access to and use of the Yevanta website.', index: true, changefreq: 'yearly', priority: 0.3 },
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
