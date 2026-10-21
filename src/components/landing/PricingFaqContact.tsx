import { useId, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { contact, faq, pricing, ui } from '../../content'
import { ease } from '../../motion'
import { cn } from '../../lib/utils'
import { MapArt } from '../art/Scenes'
import { Icon } from '../ui/Icon'
import { Accordion } from '../ui/Interactive'
import { MagneticButton, UnderlineLink } from '../ui/MagneticButton'
import { Container, Note, Reveal, Section, SectionHeading } from '../ui/primitives'
import { SplitText } from '../ui/SplitText'

/* --------------------------------- Pricing -------------------------------- */

function Cell({ v }: { v: string | boolean }) {
  if (typeof v === 'string') return <span className="text-sm font-semibold">{v}</span>
  return v ? (
    <span className="inline-grid h-7 w-7 place-items-center rounded-full bg-fg text-bg"><Icon name="check" size={14} strokeWidth={2.6} /><span className="sr-only">{pricing.compare.yes}</span></span>
  ) : (
    <span className="inline-grid h-7 w-7 place-items-center rounded-full opacity-40 hairline"><Icon name="x" size={12} /><span className="sr-only">{pricing.compare.no}</span></span>
  )
}

export function Pricing() {
  const p = pricing
  return (
    <Section id={p.id} tone={p.tone} label={p.label} className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={p.eyebrow} title={p.title} lead={p.lead} />

        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
          {p.tiers.map((t, i) => {
            const pro = !!t.popular
            return (
              <Reveal key={t.key} delay={i * 0.08} className={cn('relative', pro && 'lg:-translate-y-6')}>
                <div className={cn('relative h-full overflow-hidden rounded-[36px]', pro ? 'p-[1.5px]' : '')}>
                  {pro && (
                    <div aria-hidden className="absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow"
                      style={{ background: 'conic-gradient(from 0deg, var(--c3), var(--c4), var(--c2), var(--c3), var(--c4), var(--c3))' }} />
                  )}
                  <div className={cn('relative flex h-full flex-col rounded-[35px] p-7 md:p-8', pro ? 'tone-c4' : i === 0 ? 'tone-c2' : 'tone-c3')}>
                    {pro && <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[35px] shadow-[inset_0_0_60px_color-mix(in_srgb,var(--c3)_35%,transparent)]" />}
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-display text-2xl font-semibold">{t.name}</h3>
                      {pro && <span className="label whitespace-nowrap rounded-full bg-c1 px-3 py-1.5 text-[10px] text-c4">{t.popular}</span>}
                    </div>
                    <p className="text-muted mt-2 text-sm leading-relaxed">{t.desc}</p>
                    {t.amount ? (
                      <p className="mt-7 flex items-baseline gap-2">
                        <span className="font-display text-[clamp(2.4rem,3.4vw,3.2rem)] font-semibold leading-none tracking-tight">{t.amount}</span>
                        {p.pricePeriod && <span className="text-muted text-sm">{p.pricePeriod}</span>}
                      </p>
                    ) : (
                      <p className="mt-7 font-display text-[clamp(1.9rem,2.6vw,2.5rem)] font-semibold leading-none tracking-tight">{p.priceLabel}</p>
                    )}
                    <div className="mt-4 rounded-2xl bg-fg/8 px-4 py-3">
                      <p className="label text-[10px]">{p.basisLabel}</p>
                      <p className="mt-1 text-sm font-semibold leading-snug">{t.basis}</p>
                    </div>
                    <ul className="mt-6 flex-1 space-y-3">
                      {t.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-[15px]">
                          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-fg/12"><Icon name="check" size={13} strokeWidth={2.6} /></span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <MagneticButton to={t.cta.to} variant={pro ? 'solid' : 'ghost'}>{t.cta.label}</MagneticButton>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
        <Note className="mt-4 block">{p.note}</Note>

        {/* comparison table */}
        <Reveal className="mt-20">
          <h3 className="display-md">{p.compare.title}</h3>
          <div className="glass mt-6 overflow-x-auto rounded-[32px] md:overflow-visible" tabIndex={0} role="region" aria-label={p.compare.title}>
            <table className="w-full min-w-[620px] border-separate border-spacing-0 text-left">
              <thead>
                <tr>
                  <th scope="col" className="label sticky top-14 font-medium z-10 rounded-tl-[32px] bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] px-6 py-5 backdrop-blur-md">{p.compare.featureCol}</th>
                  {p.compare.columns.map((c, i) => (
                    <th key={c} scope="col" className={cn('sticky top-14 z-10 bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] px-6 py-5 text-center font-display text-base font-semibold backdrop-blur-md', i === p.compare.columns.length - 1 && 'rounded-tr-[32px]')}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {p.compare.rows.map((r) => (
                  <tr key={r.label} className="group transition-colors duration-300 hover:bg-fg/8">
                    <th scope="row" className="border-t border-[color-mix(in_srgb,var(--fg)_10%,transparent)] px-6 py-4 font-semibold">
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">{r.label}</span>
                    </th>
                    {r.values.map((v, i) => (
                      <td key={i} className={cn('border-t border-[color-mix(in_srgb,var(--fg)_10%,transparent)] px-6 py-4 text-center', i === 1 && 'bg-fg/5')}><Cell v={v} /></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 flex flex-wrap items-center gap-3 text-lg">
            <span className="text-muted">{p.custom.text}</span>
            <UnderlineLink to={p.custom.link.to}>{p.custom.link.label}</UnderlineLink>
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ----------------------------------- FAQ ---------------------------------- */

export function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <Section id={faq.id} tone={faq.tone} label={faq.label} className="py-20 md:py-28">
      <Container className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <SectionHeading layout="stack" eyebrow={faq.eyebrow} title={faq.title} lead={faq.lead} />
            <div className="tone-c1 relative mx-auto mt-10 hidden max-w-[380px] rounded-[40px] p-3 md:block">
              <img src={faq.image} alt={faq.imageAlt} width={818} height={900} loading="lazy" decoding="async" className="aspect-[818/900] w-full rounded-[30px] object-cover" />
              {/* follows the open question */}
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={open}
                  aria-hidden
                  initial={{ scale: 0.4, opacity: 0, rotate: -20 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                  className="absolute -right-4 -top-4 grid h-16 w-16 place-items-center rounded-full bg-c4 font-display text-xl font-semibold text-c1 clay"
                >
                  {open < 0 ? '?' : String(open + 1).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="md:col-span-7">
          <Reveal><Accordion items={faq.items} open={open} onChange={setOpen} idPrefix="faq" /></Reveal>
        </div>
      </Container>
    </Section>
  )
}

/* --------------------------------- Contact -------------------------------- */

type Field = 'name' | 'email' | 'phone' | 'subject' | 'message'

function FloatField({ id, label, error, children, filled, counter }: { id: string; label: string; error?: string; children: React.ReactNode; filled: boolean; counter?: string }) {
  return (
    <div>
      <div className={cn('group relative rounded-[22px] bg-fg/6 transition-shadow duration-300 hairline focus-within:shadow-[0_0_0_2px_var(--fg)]', error && 'shadow-[0_0_0_2px_var(--c1)]')}>
        {children}
        <label htmlFor={id} className={cn('pointer-events-none absolute left-5 origin-left transition-all duration-300 ease-soft', filled ? 'top-2.5 scale-[0.78] subtle' : 'top-[18px] group-focus-within:top-2.5 group-focus-within:scale-[0.78] group-focus-within:subtle')}>
          {label}
        </label>
        {counter && <span className="label absolute bottom-3 right-4 text-[10px] subtle" aria-live="polite">{counter}</span>}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p id={`${id}-err`} role="alert" initial={{ opacity: 0, y: -4, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-1.5 flex items-center gap-1.5 pl-4 text-sm font-semibold">
            <Icon name="x" size={14} strokeWidth={2.4} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function ContactForm() {
  const f = contact.form
  const uid = useId()
  const [v, setV] = useState<Record<Field, string>>({ name: '', email: '', phone: '', subject: '', message: '' })
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const validate = (k: Field, val: string) => {
    if (k === 'name' && val.trim().length < 2) return f.errors.name
    if (k === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) return f.errors.email
    if (k === 'phone' && val && !/^[+()\d\s-]{6,}$/.test(val)) return f.errors.phone
    if (k === 'subject' && !val) return f.errors.subject
    if (k === 'message' && val.trim().length < 10) return f.errors.message
    return ''
  }
  const err = (k: Field) => (touched[k] ? validate(k, v[k]) : '')
  const set = (k: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setV((s) => ({ ...s, [k]: e.target.value.slice(0, k === 'message' ? f.maxLength : 200) }))
  const blur = (k: Field) => () => setTouched((t) => ({ ...t, [k]: true }))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const all = { name: true, email: true, phone: true, subject: true, message: true }
    setTouched(all)
    const bad = (Object.keys(all) as Field[]).find((k) => validate(k, v[k]))
    if (bad) {
      document.getElementById(`${uid}-${bad}`)?.focus()
      return
    }
    setStatus('sending')
    window.setTimeout(() => setStatus('sent'), 1100) // front-end only
  }

  const input = 'w-full rounded-[22px] bg-transparent px-5 pb-3 pt-7 text-[15px] outline-none'
  const aria = (k: Field) => ({ id: `${uid}-${k}`, 'aria-invalid': !!err(k), 'aria-describedby': err(k) ? `${uid}-${k}-err` : undefined, onBlur: blur(k), onChange: set(k), value: v[k] })

  return (
    <div className="glass relative overflow-hidden rounded-[36px] p-5 md:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status !== 'sent' ? (
          <motion.form key="form" onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2" exit={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }} transition={{ duration: 0.4 }}>
            <FloatField id={`${uid}-name`} label={f.name} error={err('name')} filled={!!v.name}><input type="text" autoComplete="name" className={input} {...aria('name')} /></FloatField>
            <FloatField id={`${uid}-email`} label={f.email} error={err('email')} filled={!!v.email}><input type="email" autoComplete="email" className={input} {...aria('email')} /></FloatField>
            <FloatField id={`${uid}-phone`} label={f.phone} error={err('phone')} filled={!!v.phone}><input type="tel" autoComplete="tel" className={input} {...aria('phone')} /></FloatField>
            <FloatField id={`${uid}-subject`} label={f.subject} error={err('subject')} filled={!!v.subject}>
              <select className={cn(input, 'appearance-none pr-12', !v.subject && 'text-transparent')} {...aria('subject')}>
                <option value="" disabled hidden>{f.subjectPlaceholder}</option>
                {f.subjects.map((s) => <option key={s} value={s} className="bg-c1 text-c4">{s}</option>)}
              </select>
              <Icon name="arrow-down" size={16} className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 subtle" />
            </FloatField>
            <div className="sm:col-span-2">
              <FloatField id={`${uid}-message`} label={f.message} error={err('message')} filled={!!v.message} counter={f.counter(v.message.length, f.maxLength)}>
                <textarea rows={5} maxLength={f.maxLength} className={cn(input, 'resize-none pb-8')} {...aria('message')} />
              </FloatField>
            </div>
            <div className="flex items-center justify-between gap-4 sm:col-span-2">
              {contact.info.note ? <Note>{contact.info.note}</Note> : <span />}
              <MagneticButton type="submit" disabled={status === 'sending'}>{status === 'sending' ? f.sending : f.submit}</MagneticButton>
            </div>
          </motion.form>
        ) : (
          <motion.div key="ok" role="status" className="flex min-h-[420px] flex-col items-center justify-center text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: ease.out }}>
            <div className="relative grid h-28 w-28 place-items-center">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-fg/30" />
              <motion.span className="relative grid h-24 w-24 place-items-center rounded-full bg-fg text-bg clay" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}>
                <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <motion.path d="M5 12.5 10 17 19 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.45, duration: 0.5 }} />
                </svg>
              </motion.span>
            </div>
            <p className="display-md mt-8">{f.success.title}</p>
            <p className="text-muted mt-3 max-w-sm">{f.success.body}</p>
            <button type="button" className="mt-6 underline underline-offset-4" onClick={() => { setV({ name: '', email: '', phone: '', subject: '', message: '' }); setTouched({}); setStatus('idle') }}>
              {f.success.again}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Contact() {
  const c = contact
  return (
    <Section id={c.id} tone={c.tone} label={c.label} className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7"><ContactForm /></Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="tone-c1 flex h-full flex-col overflow-hidden rounded-[36px] p-3 clay">
              <div className="aspect-[400/240] overflow-hidden rounded-[28px]"><MapArt label={c.info.mapAlt} /></div>
              <div className="p-5">
                <h3 className="display-md">{c.info.title}</h3>
                <a href={`mailto:${c.info.email}`} className="group mt-5 flex items-center gap-4 rounded-[22px] bg-fg/6 p-3 hairline transition hover:bg-fg/10">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-fg text-bg transition-transform duration-500 ease-soft group-hover:scale-110"><Icon name="mail" size={18} /></span>
                  <span>
                    <span className="label block text-[10px] subtle">{c.info.emailLabel}</span>
                    <span className="mt-0.5 block font-semibold underline decoration-fg/30 underline-offset-4 transition group-hover:decoration-fg">{c.info.email}</span>
                  </span>
                </a>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {c.info.offices.map((o) => (
                    <li key={o.key} className="rounded-[22px] p-4 hairline">
                      <p className="flex items-center gap-2 font-display text-base font-semibold"><Icon name="pin" size={16} />{o.region}</p>
                      <p className="label mt-1 text-[10px] subtle">{o.legalName}</p>
                      <address className="mt-3 text-sm not-italic leading-relaxed">{o.address}</address>
                      <a href={`tel:${o.tel}`} className="mt-2 inline-flex min-h-8 items-center gap-2 text-sm font-semibold underline decoration-fg/30 underline-offset-4 transition hover:decoration-fg">
                        <Icon name="phone" size={14} />{o.phone}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <p className="label text-[10px] subtle">{c.info.socialsLabel}</p>
                  <ul className="flex flex-wrap gap-2">
                    {c.info.socials.map((s) => (
                      <li key={s.icon}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${s.label} ${ui.newTab}`}
                          title={s.label}
                          className="grid h-11 w-11 place-items-center rounded-full hairline transition-colors duration-300 hover:bg-fg hover:text-bg"
                        >
                          <Icon name={s.icon} size={18} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                {c.info.note && <Note className="mt-5 block">{c.info.note}</Note>}
              </div>
            </div>
          </Reveal>
        </div>

        {/* closing CTA banner */}
        <Reveal className="mt-20">
          <div className="tone-c4 relative overflow-hidden rounded-[40px] p-8 clay md:p-14">
            <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 animate-drift rounded-full bg-[radial-gradient(circle,var(--c3),transparent_68%)] opacity-60" />
            <div aria-hidden className="absolute -bottom-32 left-1/3 h-72 w-72 animate-drift-2 rounded-full bg-[radial-gradient(circle,var(--c2),transparent_68%)] opacity-40" />
            <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
              <div>
                <SplitText text={c.cta.title} className="display-lg max-w-xl" />
                <p className="text-muted mt-4 max-w-md text-lg">{c.cta.body}</p>
              </div>
              <MagneticButton to={c.cta.button.to} size="lg" cursor={ui.cursor.go}>{c.cta.button.label}</MagneticButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
