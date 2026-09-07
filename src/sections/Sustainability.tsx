import { SectionHead } from './Segments'

type Pillar = {
  letter: string
  tag: string
  metric: string
  metricLabel: string
  body: string
  bg: string
  fg: string          // primary text
  soft: string        // muted-but-readable text
  chipBg: string      // eyebrow chip
  dot: string
}

const pillars: Pillar[] = [
  {
    letter: 'E', tag: 'Environment',
    metric: '91%',
    metricLabel: 'less water for organic cotton',
    body: 'GOTS-track organic cotton, OEKO-TEX-tested dyes, closed-loop water recycling and LED-lit production floors.',
    bg: 'bg-arvGreen',
    fg: 'text-white',
    soft: 'text-white/85',
    chipBg: 'bg-white/15',
    dot: 'bg-white'
  },
  {
    letter: 'S', tag: 'Social',
    metric: '5,000+',
    metricLabel: 'artisans in our network',
    body: 'Living wages, safe conditions and craft partnerships with local weaving and finishing cooperatives.',
    bg: 'bg-arvOrange',
    fg: 'text-white',
    soft: 'text-white/85',
    chipBg: 'bg-white/15',
    dot: 'bg-white'
  },
  {
    letter: 'G', tag: 'Governance',
    metric: 'ISO 9001',
    metricLabel: 'quality management certified',
    body: 'Documented QC gates at every production transition · SA8000-track compliance · SEDEX audit-ready.',
    bg: 'bg-arvTeal',
    fg: 'text-ink',
    soft: 'text-ink/75',
    chipBg: 'bg-ink/10',
    dot: 'bg-ink'
  }
]

export default function Sustainability() {
  return (
    <section id="sustainability" className="section py-24 md:py-32 bg-cream border-y border-mist">
      <div className="section-inner">
        <SectionHead
          eyebrow="Sustainability"
          title={<>Innovation in fibre.<br/><strong>Responsibility on the floor.</strong></>}
          intro="ESG isn't a report we file. It's how we source fabric, treat effluent, pay our stitching lines and audit our vendors."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {pillars.map(p => (
            <div key={p.letter} className={`${p.bg} ${p.fg} p-7 md:p-8 rounded-card flex flex-col`}>
              {/* Header: big letter + tag chip */}
              <div className="flex items-center justify-between">
                <span className={`w-14 h-14 rounded-full border-2 border-current flex items-center justify-center font-display font-bold text-2xl`}>
                  {p.letter}
                </span>
                <span className={`inline-flex items-center gap-2 ${p.chipBg} px-3 py-1.5 rounded-pill text-[11px] font-mono uppercase tracking-micro`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
                  {p.tag}
                </span>
              </div>

              {/* Metric */}
              <div className="mt-10">
                <div className="big-num text-5xl md:text-[64px] leading-none">{p.metric}</div>
                <div className={`mt-3 text-[13px] md:text-[14px] font-medium ${p.soft}`}>
                  {p.metricLabel}
                </div>
              </div>

              {/* Body */}
              <p className={`mt-6 text-[14px] leading-relaxed ${p.soft}`}>{p.body}</p>

              <a className={`know-more mt-6 ${p.fg}`} href="#">know more →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
