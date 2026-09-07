import { SectionHead } from './Segments'

const quotes = [
  {
    q: 'The staff tees held their colour through six months of daily wash cycles. Guests can spot our team from across the lobby.',
    n: 'F&B Director', role: 'Chennai Hotel Group · Hospitality'
  },
  {
    q: 'Colour-coded scrub tops made shift hand-off cleaner. The fabric breathes on a twelve-hour ward round.',
    n: 'Head of Nursing', role: 'Multi-Speciality Hospital · Healthcare'
  },
  {
    q: 'Ten thousand sublimated marathon jerseys shipped to three collection points in twenty-one days. Zero rework.',
    n: 'Race Director', role: 'City Marathon · Events'
  }
]

export default function Testimonials() {
  return (
    <section className="section bg-forest text-paper py-24 md:py-32">
      <div className="section-inner">
        <div className="grid gap-8 md:grid-cols-12 items-end">
          <div className="md:col-span-8">
            <div className="eyebrow text-stone">Voices from the floor</div>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
              What our partners <span className="text-gold italic font-normal">actually</span> say.
            </h2>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {quotes.map((t, i) => (
            <figure key={i} className="rounded-2xl border border-forestSoft p-8 hover:border-gold bg-forest/40 transition-colors">
              <div className="text-gold font-display text-6xl leading-none">"</div>
              <blockquote className="mt-2 text-[16px] leading-relaxed">
                {t.q}
              </blockquote>
              <figcaption className="mt-8 pt-6 border-t border-forestSoft">
                <div className="font-display font-bold">{t.n}</div>
                <div className="eyebrow text-stone">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
