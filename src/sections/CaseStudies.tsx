import { SectionHead } from './Segments'

const cases = [
  {
    tag: 'Hospitality Uniform Program',
    req: '2,500 crew polos + shirts',
    products: 'Piqué 220 GSM · 3 department colourways',
    custom: 'Chest embroidery + woven neck labels',
    delivery: 'Multi-property dispatch · 32 days',
    accent: 'text-rust'
  },
  {
    tag: 'City Marathon Merchandise',
    req: '10,000 runner jerseys',
    products: 'Performance polyester 160 GSM',
    custom: 'Full-sublimation front + back',
    delivery: 'Time-sensitive · 21 days · 3 collection points',
    accent: 'text-ink'
  },
  {
    tag: 'D2C Basics Launch',
    req: '4,200 pieces first drop',
    products: 'Combed cotton round-neck + V-neck · 3 colourways',
    custom: 'Custom neck labels, printed hang-tags, poly + hang-tag pack',
    delivery: 'Warehouse-ready cartons · 45 days',
    accent: 'text-rust'
  }
]

export default function CaseStudies() {
  return (
    <section className="section bg-cream border-y border-mist py-24 md:py-32">
      <div className="section-inner">
        <SectionHead
          eyebrow="Projects"
          title={<>Every order is a<br/><strong className="text-arvOrange">production plan.</strong></>}
          intro="Each order is a production plan. Here's how a few recent ones came together on our floor."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cases.map((c, i) => (
            <article key={c.tag} className="card bg-paper p-8 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="eyebrow">Case Study {String(i + 1).padStart(2, '0')}</span>
                <span className={`font-mono text-[11px] ${c.accent}`}>● Delivered</span>
              </div>
              <h3 className="h-display mt-5 text-2xl leading-tight">{c.tag}</h3>
              <dl className="mt-6 space-y-3 text-sm">
                <Row k="Requirement" v={c.req} />
                <Row k="Products" v={c.products} />
                <Row k="Customisation" v={c.custom} />
                <Row k="Delivery" v={c.delivery} />
              </dl>
              <button className="mt-auto pt-8 text-left text-[13px] font-semibold tracking-micro uppercase border-b border-ink pb-1 self-start hover:text-rust">
                View Case Study →
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Row({ k, v }: { k: string, v: string }) {
  return (
    <div className="border-t border-mist pt-3">
      <dt className="text-[11px] font-mono uppercase tracking-micro text-stone">{k}</dt>
      <dd className="mt-1 text-[14px] text-ink leading-snug">{v}</dd>
    </div>
  )
}
