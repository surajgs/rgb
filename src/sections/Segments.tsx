import { Link } from 'react-router-dom'

/**
 * "Fashioning possibilities" — a story arc of four chapters, each with a
 * distinct layout so the eye is pulled through the narrative rather than
 * reading a repeating row of tiles.
 */
export default function Segments() {
  return (
    <section className="section bg-paper">
      <ChapterHeader />
      <ChapterOne />
      <ChapterTwo />
      <ChapterThree />
      <ChapterFour />
    </section>
  )
}

export function SectionHead({
  eyebrow, title, intro
}: { eyebrow: string, title: React.ReactNode, intro?: string }) {
  return (
    <div className="grid gap-8 md:grid-cols-12 items-end">
      <div className="md:col-span-8">
        <div className="eyebrow">{eyebrow}</div>
        <h2 className="h-display mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08]">
          {title}
        </h2>
      </div>
      {intro && (
        <p className="md:col-span-4 text-graphite text-[15px] leading-relaxed">{intro}</p>
      )}
    </div>
  )
}

/** Reusable pill eyebrow that works on any colored background */
function OnColorEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-3 py-1.5 rounded-pill text-[11px] font-mono uppercase tracking-micro text-white">
      <span className="w-1.5 h-1.5 rounded-full bg-white" />
      {children}
    </span>
  )
}

/* ---------- Chapter Header (on white) ---------- */
function ChapterHeader() {
  return (
    <div className="section-inner pt-14 md:pt-20 pb-8">
      <div className="grid gap-8 md:grid-cols-12 items-end">
        <div className="md:col-span-8">
          <div className="eyebrow">Fashioning possibilities</div>
          <h2 className="h-display mt-4 text-4xl md:text-6xl leading-[1.04]">
            One production floor.<br/>
            <strong className="text-arvOrange">Four chapters</strong> in the same story.
          </h2>
        </div>
        <p className="md:col-span-4 text-graphite text-[15px] leading-relaxed">
          How a Chennai unit stitched from a single-programme uniform tailor into an integrated corporate, sports, sustainable and private-label manufacturer.
        </p>
      </div>
    </div>
  )
}

/* ---------- Chapter 1 — Editorial split (orange) ---------- */
function ChapterOne() {
  return (
    <div className="arv-orange">
      <div className="section-inner py-20 md:py-28 grid gap-12 lg:grid-cols-12 items-center">
        <div className="lg:col-span-7">
          <OnColorEyebrow>Chapter 01 · Corporate & Uniforms</OnColorEyebrow>
          <h3 className="h-display mt-5 text-3xl md:text-5xl leading-[1.08] max-w-2xl">
            It started with a single <strong>uniform order</strong> —
            and never stopped growing.
          </h3>
          <p className="mt-6 max-w-xl text-[15px] md:text-[16px] leading-relaxed text-white/95">
            2008. A hospitality group needed twenty-eight polos with a name tag on the chest. Seventeen years later, we ship uniform programmes across hospitality, healthcare, retail, education and corporate teams — measured not in dozens, but in tens of thousands.
          </p>
          <Link to="/solutions/corporate" className="know-more mt-8 text-white">know more →</Link>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-card bg-paper text-ink shadow-soft p-6 md:p-7">
            <div className="eyebrow">Programme span</div>
            <div className="mt-5 space-y-3">
              {[
                ['Uniform tees & polos', '180 GSM · Combed cotton'],
                ['Corporate merchandise', 'Screen · DTG · Embroidery'],
                ['Formal shirts', 'Oxford · Twill blends'],
                ['Workwear sets', 'Twill 240 · Enzyme wash']
              ].map(([a, b]) => (
                <div key={a} className="flex items-baseline justify-between gap-4 border-t border-mist pt-3">
                  <div className="font-display font-semibold text-[15px] md:text-base tracking-tightest">{a}</div>
                  <div className="text-[11px] font-mono text-graphite whitespace-nowrap">{b}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Chapter 2 — Big-quote metric (red) ---------- */
function ChapterTwo() {
  return (
    <div className="arv-red">
      <div className="section-inner py-20 md:py-28 grid gap-10 lg:grid-cols-12 items-center">
        <div className="lg:col-span-4">
          <OnColorEyebrow>Chapter 02 · Sports & Events</OnColorEyebrow>
          <div className="mt-6">
            <div className="font-display font-bold text-[96px] md:text-[140px] leading-[0.9] tracking-tightest">
              21
            </div>
            <div className="mt-2 text-[13px] font-mono uppercase tracking-micro text-white/85">
              days · dispatch to dispatch
            </div>
          </div>
        </div>

        <blockquote className="lg:col-span-8 lg:pl-10 lg:border-l border-white/25">
          <p className="h-display text-2xl md:text-4xl leading-[1.15]">
            <span className="opacity-70">"</span>
            Ten thousand marathon jerseys, <strong>full sublimation</strong>, three collection cities.
            <strong> Zero rework.</strong>
            <span className="opacity-70">"</span>
          </p>
          <footer className="mt-8 flex flex-wrap items-center gap-5">
            <div>
              <div className="font-display font-semibold text-base">Race Director</div>
              <div className="text-[11px] font-mono uppercase tracking-micro text-white/80 mt-1">
                National City Marathon · 2026
              </div>
            </div>
            <Link to="/solutions/events" className="know-more text-white">read the case →</Link>
          </footer>
        </blockquote>
      </div>
    </div>
  )
}

/* ---------- Chapter 3 — Timeline ribbon (green) ---------- */
function ChapterThree() {
  const steps = [
    { n: '01', t: 'Farm', d: 'GOTS-track cotton lots, traceable to source.' },
    { n: '02', t: 'Floor', d: 'Water-recycling dye house, LED-lit stitching lines.' },
    { n: '03', t: 'Finished', d: 'Barcoded, packed, dispatched — audit trail retained.' }
  ]
  return (
    <div className="arv-green">
      <div className="section-inner py-20 md:py-28">
        <div className="grid gap-8 md:grid-cols-12 items-end">
          <div className="md:col-span-8">
            <OnColorEyebrow>Chapter 03 · Sustainability & Fabric</OnColorEyebrow>
            <h3 className="h-display mt-5 text-3xl md:text-5xl leading-[1.08] max-w-3xl">
              Innovation in <strong>fibre.</strong><br className="hidden md:inline"/>
              <span className="md:inline"> Responsibility on the <strong>floor.</strong></span>
            </h3>
          </div>
          <p className="md:col-span-4 text-white/90 text-[15px] leading-relaxed">
            The story we tell buyers who ask where the cotton came from and how the water was treated — with the certificate to back it up.
          </p>
        </div>

        <div className="mt-14 relative">
          <div className="hidden md:block absolute left-8 right-8 top-8 h-px bg-white/25" />
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map(s => (
              <div key={s.n} className="relative">
                <div className="relative z-10 w-16 h-16 rounded-full bg-paper text-arvGreen flex items-center justify-center font-display font-bold text-lg shadow-soft">
                  {s.n}
                </div>
                <div className="mt-5 font-display font-bold text-xl md:text-2xl tracking-tightest">{s.t}</div>
                <p className="mt-2 text-white/90 text-[14px] leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <Link to="/#sustainability" className="know-more text-white">know more →</Link>
        </div>
      </div>
    </div>
  )
}

/* ---------- Chapter 4 — Text-left + supporting card right (teal), matches chapters 01/03 ---------- */
function ChapterFour() {
  return (
    <div className="arv-teal">
      <div className="section-inner py-20 md:py-28 grid gap-12 lg:grid-cols-12 items-center">
        <div className="lg:col-span-7">
          {/* Teal is a light color; use a darker eyebrow chip for contrast (mirrors chapters 01-03) */}
          <span className="inline-flex items-center gap-2 bg-ink/10 px-3 py-1.5 rounded-pill text-[11px] font-mono uppercase tracking-micro text-ink">
            <span className="w-1.5 h-1.5 rounded-full bg-ink" />
            Chapter 04 · Custom Brands
          </span>
          <h3 className="h-display mt-5 text-3xl md:text-5xl leading-[1.08]">
            Your <strong>brand idea.</strong><br/>
            Our <strong>production plan.</strong>
          </h3>
          <p className="mt-6 max-w-xl text-[15px] md:text-[16px] leading-relaxed text-ink/85">
            Ten years ago, we didn't call them "custom brands" — we called them founders with a sketch and a deadline. Today it's an OEM/ODM programme with fabric development, sampling and shipper-ready cartons. Same instinct. Bigger toolkit.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link to="/solutions/custom-brands" className="btn bg-ink text-paper hover:bg-charcoal">Start your brand project →</Link>
            <Link to="/quote" className="know-more">or send an RFQ →</Link>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="rounded-card bg-paper text-ink shadow-soft p-6 md:p-7">
            <div className="eyebrow">Sample to shipper</div>
            <ol className="mt-5 space-y-1">
              {['Discovery', 'Fabric', 'Sample', 'Production', 'Branding', 'Pack'].map((t, i) => (
                <li key={t} className="flex items-center justify-between border-t border-mist py-3 first:border-t-0">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-arvTealSoft text-arvGreen flex items-center justify-center font-mono text-[11px]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display font-semibold text-[15px] md:text-base tracking-tightest">{t}</span>
                  </div>
                  <span className="text-[11px] font-mono text-graphite">
                    {['3–5 d', '5–7 d', '7–14 d', '15–45 d', '5–10 d', '2–4 d'][i]}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
