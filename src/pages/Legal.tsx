import { legal } from '../content'
import { events } from '../lib/sections'
import { Icon } from '../components/ui/Icon'
import { MagneticButton, UnderlineLink } from '../components/ui/MagneticButton'
import { Container, Eyebrow, Note, Reveal, Section } from '../components/ui/primitives'
import { SplitText } from '../components/ui/SplitText'

/** Placeholder legal page: replaces dead footer links until the real documents exist. */
export default function Legal({ which }: { which: keyof typeof legal.pages }) {
  const page = legal.pages[which]
  return (
    <Section id={`legal-${which}`} tone="c1" label={page.title.replace(/~/g, '')}>
      <Container className="flex min-h-[80svh] flex-col justify-center pb-16 pt-32">
        <Reveal className="flex flex-wrap items-center gap-3">
          <Eyebrow>{legal.eyebrow}</Eyebrow>
          <Note>{legal.status}</Note>
        </Reveal>
        <SplitText as="h1" text={page.title} className="display-xl mt-6 max-w-3xl" />
        <Reveal delay={0.15}>
          <p className="text-muted mt-6 max-w-xl text-lg leading-relaxed">{legal.body}</p>
        </Reveal>
        <Reveal delay={0.25} className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton to={legal.contactLink.to}>{legal.contactLink.label}</MagneticButton>
          {which === 'cookies' && (
            <button type="button" onClick={() => window.dispatchEvent(new Event(events.openCookies))} className="inline-flex items-center gap-2 rounded-full hairline-strong px-5 py-2.5 text-sm font-semibold transition hover:bg-fg/10">
              <Icon name="settings" size={16} />{legal.cookieSettings}
            </button>
          )}
          <UnderlineLink to={legal.homeLink.to}>{legal.homeLink.label}</UnderlineLink>
        </Reveal>
      </Container>
    </Section>
  )
}
