import { SectionHead } from './Segments'

const stops = [
  ['Fabric Inspection', '4-point system, GSM verified'],
  ['Cutting', 'CAD-planned lays, 0.5% wastage target'],
  ['Sewing', 'Multi-line, SPI monitored'],
  ['Printing', 'Screen · DTF · Sublimation'],
  ['Embroidery', '15-head multi-needle'],
  ['Finishing', 'Trimming, tagging, folding'],
  ['QC', 'AQL 2.5 pre-dispatch'],
  ['Packing', 'Poly-bag + master carton']
]

const certs = ['ISO 9001', 'OEKO-TEX', 'GOTS-track', 'SA8000-track', 'Sedex-track']

export default function Factory() {
  return (
    <section className="section py-24 md:py-32">
      <div className="section-inner">
        <SectionHead
          eyebrow="Factory & quality"
          title={<>Where Quality<br/>Is Built In.</>}
          intro="No outsourced stages, no black-box vendors. Every piece of your order moves through our floor — inspected at every transition."
        />

        <div className="mt-14 grid gap-3 md:grid-cols-4">
          {stops.map((s, i) => (
            <div key={s[0]} className="border border-mist p-6 hover:border-ink transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] text-graphite">STOP {String(i + 1).padStart(2, '0')}</span>
                <span className="w-6 h-px bg-rust" />
              </div>
              <div className="font-display font-bold text-lg">{s[0]}</div>
              <div className="text-sm text-graphite mt-1">{s[1]}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 border border-mist p-8 flex flex-wrap items-center justify-between gap-6 bg-cream">
          <div>
            <div className="eyebrow">Certifications & Compliance</div>
            <div className="mt-2 text-graphite text-sm">Actively held, in track, or verified.</div>
          </div>
          <div className="flex flex-wrap gap-3">
            {certs.map(c => (
              <span key={c} className="border border-ink px-4 py-2 text-[12px] font-semibold tracking-micro">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
