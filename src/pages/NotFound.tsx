import { notFound } from '../content'
import { LostArt } from '../components/art/Scenes'
import { MagneticButton } from '../components/ui/MagneticButton'
import { Container, Section } from '../components/ui/primitives'
import { SplitText } from '../components/ui/SplitText'

export default function NotFound() {
  return (
    <Section id="not-found" tone="c1" label={notFound.code} counted={false}>
      <Container className="grid min-h-svh items-center gap-10 pb-16 pt-28 md:grid-cols-2">
        <div>
          <p className="text-outline font-display text-[clamp(5rem,14vw,9rem)] font-bold leading-none">{notFound.code}</p>
          <SplitText as="h1" text={notFound.title} className="display-lg mt-4" />
          <p className="text-muted mt-5 max-w-md text-lg">{notFound.body}</p>
          <div className="mt-8"><MagneticButton to={notFound.cta.to} size="lg">{notFound.cta.label}</MagneticButton></div>
        </div>
        <div className="mx-auto aspect-square w-full max-w-md"><LostArt label={notFound.title.replace(/~/g, '')} /></div>
      </Container>
    </Section>
  )
}
