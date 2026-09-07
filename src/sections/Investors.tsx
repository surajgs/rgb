import { SectionHead } from './Segments'

const metrics = [
  { k: 'Units produced', v: '2.4M+', delta: 'FY25 → FY26' },
  { k: 'Production capacity', v: '12K/day', delta: '+18% YoY' },
  { k: 'Active B2B clients', v: '180+', delta: '+22 new this year' },
  { k: 'Cities delivered', v: '42+', delta: '3 new corridors' },
  { k: 'Repeat-order rate', v: '68%', delta: '+6 pp YoY' },
  { k: 'On-time dispatch', v: '96.4%', delta: 'AQL 2.5 verified' }
]

export default function Investors() {
  return (
    <section className="section py-24 md:py-32">
      <div className="section-inner">
        <SectionHead
          eyebrow="Operating snapshot · FY 26–27 Q1"
          title={<>Manufacturing metrics<br/>in a <strong>nutshell.</strong></>}
          intro="What the production floor looked like at the close of the quarter. Detailed capacity and delivery data available on request."
        />

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-px bg-mist border border-mist rounded-card overflow-hidden">
          {metrics.map(m => (
            <div key={m.k} className="bg-paper p-8 hover:bg-cream transition-colors">
              <div className="eyebrow">{m.k}</div>
              <div className="mt-4 big-num text-4xl md:text-5xl text-ink">{m.v}</div>
              <div className="mt-3 text-xs font-mono text-arvOrange">{m.delta}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a href="#" className="know-more">Download capacity brief (PDF) →</a>
          <a href="#" className="know-more text-arvOrange">Talk to our commercial team →</a>
        </div>
      </div>
    </section>
  )
}
