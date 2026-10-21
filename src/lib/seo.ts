import { company, seo, site, type SeoEntry } from '../content.ts'

/** Absolute URL on the configured site domain. */
export const absUrl = (path: string) => site.url.replace(/\/$/, '') + (path === '/' ? '/' : path)

/** The head tags for one route. Shared by the runtime updater and the build-time pre-renderer. */
export function headTags(page: SeoEntry) {
  const url = absUrl(page.path)
  const img = absUrl(seo.ogImage)
  return {
    title: page.title,
    meta: [
      { name: 'description', content: page.description },
      { name: 'robots', content: page.index ? 'index, follow' : 'noindex, follow' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: site.brand },
      { property: 'og:locale', content: site.locale },
      { property: 'og:title', content: page.title },
      { property: 'og:description', content: page.description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: img },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: seo.ogImageAlt },
      { name: 'twitter:card', content: seo.twitterCard },
      { name: 'twitter:title', content: page.title },
      { name: 'twitter:description', content: page.description },
      { name: 'twitter:image', content: img },
    ],
    canonical: page.index ? url : null,
  }
}

/** Runtime: keep <head> in sync with the current route. */
export function applySeo(page: SeoEntry) {
  const t = headTags(page)
  document.title = t.title
  for (const m of t.meta) {
    const key = 'name' in m ? 'name' : 'property'
    const val = 'name' in m ? m.name : m.property
    let el = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${val}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(key, val!)
      document.head.appendChild(el)
    }
    el.setAttribute('content', m.content)
  }
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (t.canonical) {
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = t.canonical
  } else link?.remove()
}

/** schema.org Organization data (company facts from content.ts) for search engines. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    brand: { '@type': 'Brand', name: site.brand },
    url: absUrl('/'),
    logo: absUrl('/favicon-192.png'),
    email: company.email,
    founder: { '@type': 'Person', name: company.founder },
    foundingDate: company.founded,
    address: company.offices.map((o) => ({
      '@type': 'PostalAddress',
      streetAddress: o.street,
      addressLocality: o.locality,
      addressRegion: o.regionCode,
      ...(o.postalCode ? { postalCode: o.postalCode } : {}),
      addressCountry: o.countryCode,
    })),
    contactPoint: company.offices.map((o) => ({
      '@type': 'ContactPoint',
      telephone: o.tel,
      email: company.email,
      contactType: 'customer service',
      areaServed: o.countryCode,
    })),
    subOrganization: company.offices.map((o) => ({ '@type': 'Organization', legalName: o.legalName, telephone: o.tel, address: o.address })),
    sameAs: company.socials.map((s) => s.href),
  }
}
