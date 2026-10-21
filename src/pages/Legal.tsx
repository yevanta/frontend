import type { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { legal } from '../content'
import { useSmoothScroll } from '../lib/scroll'
import { MagneticButton, UnderlineLink } from '../components/ui/MagneticButton'
import { Container, Eyebrow, Reveal, Section } from '../components/ui/primitives'
import { SplitText } from '../components/ui/SplitText'

/** Privacy Policy / Terms and Conditions: client-supplied documents with a section list. */
export default function Legal({ which }: { which: keyof typeof legal.pages }) {
  const page = legal.pages[which]
  const navigate = useNavigate()
  const { scrollTo } = useSmoothScroll()

  const jump = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    scrollTo(id, { offset: -96 })
    history.replaceState(history.state, '', `#${id}`)
  }

  // links inside the document: our own pages go through the router (no full reload)
  const onDocClick = (e: MouseEvent<HTMLElement>) => {
    const a = (e.target as HTMLElement).closest('a')
    if (!a || !a.hasAttribute('data-internal') || e.metaKey || e.ctrlKey || e.shiftKey) return
    e.preventDefault()
    navigate(a.getAttribute('href') || '/')
  }

  return (
    <Section id={`legal-${which}`} tone="c1" label={page.title.replace(/~/g, '')}>
      <Container className="pb-24 pt-32 md:pt-36">
        <header className="max-w-4xl">
          <Reveal><Eyebrow>{legal.eyebrow}</Eyebrow></Reveal>
          <SplitText as="h1" text={page.title} className="display-xl mt-6" />
          <Reveal delay={0.15}>
            <p className="label mt-6 subtle">
              {legal.updatedLabel}: <time>{page.updated}</time>
            </p>
          </Reveal>
        </header>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          {/* section list: sticky on large screens, a compact block above the text on small ones */}
          <nav aria-label={legal.tocLabel} className="lg:col-span-4 xl:col-span-3">
            <div className="rounded-[28px] p-5 hairline lg:sticky lg:top-28">
              <p className="label text-[10px] subtle">{legal.tocLabel}</p>
              <ol className="mt-3 space-y-1">
                {page.toc.map((t, i) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      onClick={(e) => jump(e, t.id)}
                      className="flex min-h-9 items-baseline gap-3 rounded-xl px-2 py-1.5 text-sm leading-snug transition-colors hover:bg-fg/8"
                    >
                      <span className="label shrink-0 text-[10px] subtle">{String(i + 1).padStart(2, '0')}</span>
                      <span>{t.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article
            className="legal-prose min-w-0 lg:col-span-8 xl:col-span-9"
            onClick={onDocClick}
            dangerouslySetInnerHTML={{ __html: page.html }}
          />
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-fg/10 pt-10">
          <MagneticButton to={legal.contactLink.to}>{legal.contactLink.label}</MagneticButton>
          <UnderlineLink to={legal.homeLink.to}>{legal.homeLink.label}</UnderlineLink>
        </div>
      </Container>
    </Section>
  )
}
