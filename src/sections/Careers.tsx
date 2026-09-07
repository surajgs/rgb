import { Link } from 'react-router-dom'

export default function Careers() {
  return (
    <section className="section py-24 md:py-32 bg-arvTeal text-ink">
      <div className="section-inner grid gap-10 lg:grid-cols-12 items-center">
        <div className="lg:col-span-7">
          <div className="eyebrow opacity-80">Careers</div>
          <h2 className="h-display mt-4 text-4xl md:text-6xl">
            Advancing <strong className="text-arvOrange">craft</strong>. Advancing <strong className="text-arvOrange">careers.</strong>
          </h2>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed opacity-90">
            From cutting-room apprentices to line supervisors and merchandising leads — we hire for the long arc. About 60% of our workforce is women; most started with us at entry level.
          </p>
          <Link to="#" className="know-more mt-6">Work with us →</Link>
        </div>
        <div className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-3">
            {[
              ['62%', 'Women in workforce'],
              ['84%', '5-year retention'],
              ['12', 'Skill programs'],
              ['210+', 'Team members']
            ].map(([n, l]) => (
              <div key={l} className="bg-paper rounded-card p-6">
                <div className="big-num text-3xl">{n}</div>
                <div className="eyebrow mt-2 !text-graphite">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
