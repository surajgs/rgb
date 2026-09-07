import { Link } from 'react-router-dom'
import HeroVisual from './HeroVisual'

export default function Hero() {
  return (
    <section className="section relative overflow-hidden bg-paper border-b border-mist">
      <div className="section-inner relative pt-16 pb-20 md:pt-24 md:pb-24 grid gap-12 lg:grid-cols-12 items-center">
        <div className="lg:col-span-7 relative">
          <h1 className="h-display text-[36px] sm:text-[46px] md:text-[64px] lg:text-[80px] max-w-4xl">
            From <strong>heritage</strong> looms<br/>
            to <strong>diversified</strong> apparel<br/>
            manufacturing.
          </h1>

          <p className="mt-8 max-w-xl text-graphite text-[17px] md:text-[19px] leading-relaxed">
            An integrated Chennai-based apparel manufacturer for corporate branded garments, sector uniforms, custom-brand programs and event orders — from 100 pieces to 50,000.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link to="/quote" className="btn btn-accent">Request a quote →</Link>
            <Link to="/builder" className="know-more">Explore our capabilities →</Link>
          </div>

          <div className="mt-14 grid grid-cols-3 max-w-lg gap-6 border-t border-mist pt-6">
            <Stat n="17+" l="Years in operation" />
            <Stat n="2.4M+" l="Units produced" />
            <Stat n="180+" l="B2B clients" />
          </div>
        </div>

        <div className="lg:col-span-5 relative flex justify-center">
          <HeroVisual />
        </div>
      </div>
      <Marquee />
    </section>
  )
}

function Stat({ n, l }: { n: string, l: string }) {
  return (
    <div>
      <div className="font-display font-bold text-3xl md:text-4xl text-ink tracking-tightest">{n}</div>
      <div className="eyebrow mt-1 !text-graphite">{l}</div>
    </div>
  )
}

function Marquee() {
  const words = [
    'Cotton', 'Piqué', 'Combed', 'Poly-cotton', 'Performance',
    'Bamboo', 'Modal', 'Organic', 'Screen Print', 'Embroidery',
    'Sublimation', 'DTG', 'Woven Labels', 'OEM', 'GOTS-Track'
  ]
  const row = [...words, ...words]
  return (
    <div className="relative border-t border-mist py-4 bg-cream overflow-hidden">
      <div className="marquee-track flex gap-12 whitespace-nowrap w-max font-mono text-[12px] uppercase tracking-micro text-graphite">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-12">
            {w}
            <span className="w-1.5 h-1.5 bg-arvOrange rounded-full" />
          </span>
        ))}
      </div>
    </div>
  )
}
