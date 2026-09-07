import { SectionHead } from './Segments'

const items = [
  {
    date: '2026 · Sep',
    kicker: 'Update',
    title: 'Ambattur unit adds 15-head embroidery line',
    body: 'Additional embroidery capacity comes online — 40% throughput uplift for uniform programs.',
    href: '#'
  },
  {
    date: '2026 · Aug',
    kicker: 'Announcement',
    title: 'RGB delivers 10K marathon jerseys in 21 days',
    body: 'Full sublimation, per-city coordinated dispatch across 3 collection points for a national marathon.',
    href: '#'
  },
  {
    date: '2026 · Jul',
    kicker: 'Sustainability',
    title: 'GOTS-track organic cotton lot #114 issued',
    body: 'First 2,780-metre organic lot enters production for a D2C basics launch — full traceability from farm.',
    href: '#'
  }
]

export default function Newsroom() {
  return (
    <section className="section py-24 md:py-32 border-y border-mist bg-cream">
      <div className="section-inner">
        <SectionHead
          eyebrow="Newsroom"
          title={<>From the <strong>floor</strong> and<br/>the <strong>front office.</strong></>}
          intro="Capacity additions, milestone dispatches and compliance updates."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <article key={i} className="card p-0 overflow-hidden flex flex-col">
              <div className="aspect-[16/10] bg-gradient-to-br from-mist to-cream relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 200 120" className="w-3/4 opacity-70">
                    <rect x="10" y="30" width="180" height="60" rx="6" fill="#F37C24" opacity="0.2"/>
                    <rect x="30" y="50" width="140" height="10" rx="5" fill="#0B0F14" opacity="0.35"/>
                    <rect x="30" y="70" width="90" height="8" rx="4" fill="#0B0F14" opacity="0.2"/>
                  </svg>
                </div>
                <div className="absolute top-4 left-4 bg-paper px-3 py-1 rounded-pill text-[10px] font-mono uppercase tracking-micro text-arvOrange">
                  {it.kicker}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="eyebrow">{it.date}</div>
                <h3 className="mt-3 font-display font-bold text-xl leading-snug tracking-tightest">
                  {it.title}
                </h3>
                <p className="mt-2 text-sm text-graphite leading-relaxed">{it.body}</p>
                <a href={it.href} className="know-more mt-auto pt-6 self-start">read more →</a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a href="#" className="know-more text-arvOrange">view all updates →</a>
        </div>
      </div>
    </section>
  )
}
