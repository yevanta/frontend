import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, type Plugin, type ResolvedConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { hero, seo, site, type SeoEntry } from './src/content.ts'
import { absUrl, headTags, organizationJsonLd } from './src/lib/seo.ts'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/** Replaces the <!-- seo:start --> … <!-- seo:end --> block in index.html with one route's tags. */
function renderHead(html: string, page: SeoEntry) {
  const t = headTags(page)
  const lines = [
    `<title>${esc(t.title)}</title>`,
    ...t.meta.map((m) => ('name' in m ? `<meta name="${m.name}" content="${esc(m.content)}" />` : `<meta property="${m.property}" content="${esc(m.content)}" />`)),
    ...(t.canonical ? [`<link rel="canonical" href="${t.canonical}" />`] : []),
    // home page: start downloading the hero image straight away (it is the largest thing above the fold)
    ...(page.path === '/' ? [`<link rel="preload" as="image" href="${hero.image.src}" type="image/webp" fetchpriority="high" />`] : []),
    // company structured data on the home page
    ...(page.path === '/' ? [`<script type="application/ld+json">${JSON.stringify(organizationJsonLd()).replace(/</g, '\\u003c')}</script>`] : []),
  ]
  return html.replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->/, `<!-- seo:start -->\n    ${lines.join('\n    ')}\n    <!-- seo:end -->`)
}

/**
 * SEO at build time:
 * - index.html gets the home page tags
 * - every other route gets its own pre-rendered HTML (product.html, privacy.html, …, 404.html)
 *   so crawlers and link previews see the right title/description/canonical without JS
 * - robots.txt and sitemap.xml are generated from site.url and the indexable pages
 */
function seoPlugin(): Plugin {
  const pages = Object.values(seo.pages) as SeoEntry[]
  let config: ResolvedConfig
  return {
    name: 'yevanta-seo',
    apply: 'build',
    enforce: 'post',
    configResolved(c) {
      config = c
    },
    transformIndexHtml: { order: 'post', handler: (html) => renderHead(html, seo.pages.home) },
    writeBundle() {
      const outDir = path.resolve(config.root, config.build.outDir)
      const html = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8')
      const emit = (fileName: string, source: string) => fs.writeFileSync(path.join(outDir, fileName), source)
      for (const page of pages) {
        if (page.path === '/') continue
        const fileName = page.path === '/404' ? '404.html' : `${page.path.slice(1)}.html`
        emit(fileName, renderHead(html, page))
      }
      emit('robots.txt', ['User-agent: *', 'Allow: /', '', `Sitemap: ${absUrl('/sitemap.xml')}`, ''].join('\n'))
      const today = new Date().toISOString().slice(0, 10)
      const urls = pages
        .filter((p) => p.index)
        .map((p) => `  <url>\n    <loc>${absUrl(p.path)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq ?? 'monthly'}</changefreq>\n    <priority>${(p.priority ?? 0.5).toFixed(1)}</priority>\n  </url>`)
      emit('sitemap.xml', ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...urls, '</urlset>', ''].join('\n'))
      if (/example\.com/.test(site.url)) config.logger.warn('site.url is still the placeholder (example.com). Update it in src/content.ts before launch.')
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin()],
})
