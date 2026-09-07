import { Link } from 'react-router-dom'
import { SectionHead } from './Segments'

const useCases = [
  'Corporate Events', 'Conferences', 'Marathons', 'College Events',
  'Exhibitions', 'Product Launches', 'Campaigns', 'Festivals'
]

export default function Events() {
  return (
    <section className="section py-24 md:py-32">
      <div className="section-inner">
        <SectionHead
          eyebrow="Events & bulk"
          title={<>Need 500, 5,000<br/>or 50,000 pieces?</>}
          intro="From corporate conferences to marathons and campaigns, we handle large-volume apparel requirements with custom branding and coordinated delivery."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7 border border-mist p-8 md:p-12 fabric">
            <div className="eyebrow">Scale bands</div>
            <div className="mt-6 space-y-4">
              {[
                ['500 – 2,000', 'Sampling → Dispatch in 12–18 days'],
                ['2,000 – 10,000', 'Sampling → Dispatch in 18–28 days'],
                ['10,000 – 25,000', 'Sampling → Dispatch in 25–40 days'],
                ['25,000+', 'Bespoke production plan · Multi-batch dispatch'],
              ].map(([r, t]) => (
                <div key={r} className="flex items-baseline justify-between border-t border-mist pt-4">
                  <span className="font-display font-bold text-2xl md:text-3xl">{r}</span>
                  <span className="text-sm text-graphite">{t}</span>
                </div>
              ))}
            </div>
            <Link to="/quote?type=events" className="btn btn-accent mt-8">Get an Event Quote →</Link>
          </div>

          <div className="md:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              {useCases.map(u => (
                <div key={u} className="border border-mist p-4 hover:border-ink transition-colors">
                  <div className="w-8 h-8 mb-3 bg-cream border border-mist flex items-center justify-center">
                    <span className="w-2 h-2 bg-rust" />
                  </div>
                  <div className="font-semibold text-[14px]">{u}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
