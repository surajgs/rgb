const quotes = [
  {
    q: 'The staff tees held their colour through six months of daily wash cycles. Guests can spot our team from across the lobby.',
    n: 'F&B Director', role: 'Chennai Hotel Group', sector: 'Hospitality'
  },
  {
    q: 'Colour-coded scrub tops made shift hand-off cleaner. The fabric breathes on a twelve-hour ward round.',
    n: 'Head of Nursing', role: 'Multi-Speciality Hospital', sector: 'Healthcare'
  },
  {
    q: 'Ten thousand sublimated marathon jerseys shipped to three collection points in twenty-one days. Zero rework.',
    n: 'Race Director', role: 'City Marathon', sector: 'Events'
  }
]

export default function Testimonials() {
  return (
    <section className="section bg-forest text-paper py-24 md:py-32">
      <div className="section-inner">
        <div className="grid gap-8 md:grid-cols-12 items-end">
          <div className="md:col-span-8">
            {/* On-color pill eyebrow — the default .eyebrow uses text-graphite which vanishes on forest */}
            <span className="inline-flex items-center gap-2 bg-white/15 px-3 py-1.5 rounded-pill text-[11px] font-mono uppercase tracking-micro text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              Voices from the floor
            </span>
            <h2 className="h-display mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
              What our partners <strong className="text-gold">actually</strong> say.
            </h2>
          </div>
        </div>

        <div className="mt-12 md:mt-14 grid gap-5 md:grid-cols-3">
          {quotes.map((t, i) => (
            <figure key={i} className="rounded-2xl border border-forestSoft p-6 md:p-8 hover:border-gold bg-forest/40 transition-colors flex flex-col">
              <div className="text-gold font-display text-5xl leading-none">"</div>
              <blockquote className="mt-3 text-[15px] md:text-[16px] leading-relaxed text-paper">
                {t.q}
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-forestSoft">
                <div className="font-display font-bold text-lg text-paper tracking-tightest">{t.n}</div>
                <div className="mt-1 text-[13px] text-goldSoft/95">
                  {t.role}
                </div>
                <div className="mt-2 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-micro text-gold">
                  <span className="w-1 h-1 rounded-full bg-gold" />
                  {t.sector}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
