const stats = [
  { n: '17+', l: 'Years of Experience' },
  { n: '180+', l: 'B2B Clients Served' },
  { n: '2.4M+', l: 'Units Produced' },
  { n: '42+', l: 'Cities Delivered' },
  { n: '12K/day', l: 'Production Capacity' }
]

const caps = [
  { icon: 'M3 12h18M12 3v18', t: 'End-to-End Manufacturing', d: 'From fabric sourcing to finished apparel — no external hand-offs.' },
  { icon: 'M5 12l4 4L19 6', t: 'Consistent Quality', d: 'Multi-stage QC: fabric, cutting, stitching, finishing, pre-dispatch.' },
  { icon: 'M12 20l-7-4V8l7-4 7 4v8l-7 4Z', t: 'Customisation', d: 'Colours, fabrics, designs, branding and packaging.' },
  { icon: 'M4 6h16M4 12h16M4 18h10', t: 'Bulk Production', d: 'Designed to handle small, medium and large volume runs.' },
  { icon: 'M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z', t: 'Reliable Delivery', d: 'Production planned around your deadlines, not ours.' },
  { icon: 'M4 4h6v6H4Zm10 0h6v6h-6ZM4 14h6v6H4Zm10 0h6v6h-6Z', t: 'B2B Experience', d: 'Built for procurement teams — GST invoices, PO workflow, credit terms.' }
]

export default function WhyChoose() {
  return (
    <section className="section bg-forest text-paper py-24 md:py-32 relative overflow-hidden">
      <WaveTop />
      <div className="section-inner relative">
        <div className="grid gap-8 md:grid-cols-12 items-end">
          <div className="md:col-span-8">
            <div className="eyebrow text-goldSoft">Why choose us</div>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-paper">
              Numbers that <em>stand</em><br className="hidden sm:inline"/>
              <span> behind every order.</span>
            </h2>
          </div>
          <p className="md:col-span-4 text-goldSoft/90 leading-relaxed">
            These aren't showroom claims. They're the operating capacity we quote against every single day.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 border-t border-forestSoft">
          {stats.map(s => (
            <div key={s.l} className="border-b sm:border-b-0 sm:border-r sm:last:border-r-0 border-forestSoft py-6 pr-4">
              <div className="font-display font-bold text-[40px] sm:text-[48px] lg:text-[64px] leading-none tracking-tight text-gold">
                {s.n}
              </div>
              <div className="mt-4 text-[11px] font-mono uppercase tracking-micro text-goldSoft">
                {s.l}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {caps.map(c => (
            <div key={c.t} className="rounded-2xl border border-forestSoft p-8 hover:border-gold transition-colors bg-forest/40 backdrop-blur">
              <div className="flex items-start gap-4">
                <span className="icon-chip shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={c.icon} />
                  </svg>
                </span>
                <div>
                  <div className="font-display text-xl text-paper">{c.t}</div>
                  <p className="mt-2 text-sm text-goldSoft/90 leading-relaxed">{c.d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <WaveBottom />
    </section>
  )
}

function WaveTop() {
  return (
    <svg className="wave-top" viewBox="0 0 1440 40" preserveAspectRatio="none">
      <path d="M0 40 Q360 0 720 20 T1440 40 V0 H0 Z" fill="#FDF9F1" />
    </svg>
  )
}
function WaveBottom() {
  return (
    <svg className="wave-bottom" viewBox="0 0 1440 40" preserveAspectRatio="none">
      <path d="M0 40 Q360 0 720 20 T1440 40 V0 H0 Z" fill="#FDF9F1" />
    </svg>
  )
}
