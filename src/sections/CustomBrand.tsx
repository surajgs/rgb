import { Link } from 'react-router-dom'

const flow = ['Idea', 'Fabric', 'Design', 'Sample', 'Production', 'Branding', 'Packaging']
const badges = ['OEM', 'ODM', 'Private Label', 'Custom Manufacturing', 'Fabric Development', 'Sampling', 'Branding', 'Packaging']

export default function CustomBrand() {
  return (
    <section className="section bg-gold text-ink py-24 md:py-32 relative overflow-hidden">
      <div className="section-inner relative">
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7">
            <div className="eyebrow text-forest/80">Custom brand manufacturing</div>
            <h2 className="h-display mt-4 text-4xl md:text-6xl leading-[1.02] tracking-tight">
              Have a Brand Idea?<br/>
              <em>We'll Manufacture It.</em>
            </h2>
            <p className="mt-6 max-w-lg text-forest text-lg leading-relaxed">
              Turn your concept into a production-ready apparel line with end-to-end manufacturing support.
            </p>
            <Link to="/quote?type=custom-brands" className="btn bg-ink text-paper hover:bg-forest mt-8">
              Start Your Brand Project →
            </Link>

            <div className="mt-12 flex flex-wrap gap-2">
              {badges.map(b => (
                <span key={b} className="rounded-pill border border-forest/40 px-4 py-1.5 text-[12px] font-medium text-forest">
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-paper border border-forest/20 shadow-card p-6">
              <div className="eyebrow mb-4">The build path</div>
              <ol className="space-y-2">
                {flow.map((f, i) => (
                  <li key={f} className="flex items-center gap-4 border-t border-mist py-3 first:border-t-0">
                    <span className="w-9 h-9 rounded-full bg-goldSoft text-forest flex items-center justify-center font-mono text-[11px]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-xl flex-1">{f}</span>
                    <span className="text-graphite text-sm">
                      {['Discovery', '3–7 d', '5–10 d', '7–14 d', '15–45 d', '5–10 d', '2–4 d'][i]}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
