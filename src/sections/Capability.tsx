import { SectionHead } from './Segments'

const steps = [
  { n: '01', t: 'Requirement', d: 'Understand quantity, specifications, design and delivery requirements.' },
  { n: '02', t: 'Fabric & Design', d: 'Select fabric, GSM, colour, construction, trims and finishing.' },
  { n: '03', t: 'Sampling', d: 'Develop and approve prototypes before bulk production.' },
  { n: '04', t: 'Production', d: 'Execute bulk manufacturing with controlled production processes.' },
  { n: '05', t: 'Branding', d: 'Printing, embroidery, labels and other customisation.' },
  { n: '06', t: 'Quality Control', d: 'Inspection at critical stages and before dispatch.' },
  { n: '07', t: 'Packaging', d: 'Individual or bulk packaging according to requirements.' },
  { n: '08', t: 'Delivery', d: 'Dispatch to required locations.' }
]

export default function Capability() {
  return (
    <section className="section bg-cream border-b border-mist pt-14 md:pt-20 pb-24 md:pb-32">
      <div className="section-inner">
        <SectionHead
          eyebrow="Manufacturing Capability"
          title={<>One Manufacturing Partner.<br/>From Fabric to Finished Product.</>}
          intro="A single, controlled production line — no external hand-offs, no lost accountability. Every stage tracked, sampled and inspected before it moves to the next."
        />

        <div className="mt-16 grid gap-x-6 gap-y-10 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] tracking-micro text-graphite">STEP {s.n}</span>
                {i < steps.length - 1 && (
                  <span className="hidden md:block text-rust">→</span>
                )}
              </div>
              <div className="h-px w-full bg-ink mb-4" />
              <h4 className="font-display font-bold text-lg">{s.t}</h4>
              <p className="mt-2 text-sm text-graphite leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
