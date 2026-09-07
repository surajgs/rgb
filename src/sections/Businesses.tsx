import { Link } from 'react-router-dom'
import { SectionHead } from './Segments'

// 5-card business grid — Arvind's home signature
const businesses = [
  {
    n: '01',
    tag: 'Apparel',
    title: 'Textile & Apparel',
    body: 'T-shirts, polos, shirts, jackets, hoodies and workwear — round-neck to sports jersey.',
    href: '/builder',
    tone: 'from-arvOrangeSoft to-paper',
    accent: 'text-arvOrange'
  },
  {
    n: '02',
    tag: 'Uniforms',
    title: 'Institutional Uniforms',
    body: 'Sector programs for hospitality, healthcare, retail, education and corporate teams.',
    href: '/solutions/uniforms',
    tone: 'from-arvGreenSoft to-paper',
    accent: 'text-arvGreen'
  },
  {
    n: '03',
    tag: 'Retail',
    title: 'Custom Brand Manufacturing',
    body: 'OEM, ODM and private-label programs for D2C brands, labels and founders.',
    href: '/solutions/custom-brands',
    tone: 'from-arvRedSoft to-paper',
    accent: 'text-arvRed'
  },
  {
    n: '04',
    tag: 'Events',
    title: 'Sports & Event Merchandise',
    body: 'Marathons, launches, campaigns — high-volume, per-city coordinated delivery.',
    href: '/solutions/events',
    tone: 'from-arvTealSoft to-paper',
    accent: 'text-arvGreen'
  },
  {
    n: '05',
    tag: 'Materials',
    title: 'Fabric & Sourcing',
    body: 'Cotton, poly, blends, bamboo, modal, merino, linen — GOTS/OEKO-TEX track.',
    href: '/#fabric',
    tone: 'from-cream to-paper',
    accent: 'text-ink'
  }
]

export default function Businesses() {
  return (
    <section className="section py-24 md:py-32">
      <div className="section-inner">
        <SectionHead
          eyebrow="Our businesses"
          title={<>Built on legacy.<br/><strong>Diversified for future.</strong></>}
          intro="Five programs share one production floor at our Ambattur unit — everything from a single 500-piece hospitality order to a 25,000-piece marathon dispatch."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {businesses.map(b => (
            <Link key={b.n} to={b.href} className="group card p-8 min-h-[280px] flex flex-col justify-between overflow-hidden">
              <div className={`absolute inset-0 -z-0 bg-gradient-to-br ${b.tone} opacity-70 group-hover:opacity-100 transition-opacity`} />
              <div className="relative z-10 flex items-start justify-between">
                <span className={`eyebrow ${b.accent}`}>{b.tag}</span>
                <span className="font-mono text-[11px] text-graphite">{b.n} / 05</span>
              </div>
              <div className="relative z-10 mt-10">
                <h3 className="h-display text-2xl md:text-3xl leading-tight max-w-md">
                  {b.title}
                </h3>
                <p className="mt-3 max-w-md text-sm text-graphite">{b.body}</p>
                <span className="know-more mt-6 text-ink">
                  know more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
