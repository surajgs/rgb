import { Link } from 'react-router-dom'

export default function RFQTeaser() {
  return (
    <section className="section py-28 md:py-40 border-t border-mist">
      <div className="section-inner grid gap-10 lg:grid-cols-12 items-center">
        <div className="lg:col-span-7">
          <div className="eyebrow">Get started</div>
          <h2 className="h-display mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-tight">
            Tell us what you need.<br/>
            <strong className="text-arvOrange">We'll help build it.</strong>
          </h2>
          <p className="mt-6 max-w-lg text-graphite text-lg leading-relaxed">
            A structured 7-step RFQ that captures requirement, quantity, product, customisation, files, delivery and contact — routed to the right team within an hour.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/quote" className="btn btn-accent">Submit RFQ →</Link>
            <a href="https://wa.me/917305160327" className="btn btn-outline">WhatsApp Sales</a>
            <Link to="/calculator" className="btn btn-ghost">Try the Cost Calculator →</Link>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="border border-mist p-8 bg-cream">
            <div className="eyebrow">The 7 steps</div>
            <ol className="mt-4 space-y-3">
              {['Requirement type', 'Quantity band', 'Product', 'Customisation', 'Design upload', 'Delivery', 'Contact'].map((s, i) => (
                <li key={s} className="flex items-center gap-4">
                  <span className="font-mono text-[11px] text-graphite w-6">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex-1 text-[15px] font-medium">{s}</span>
                  <span className="text-stone text-xs">~30s</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
