import { SectionHead } from './Segments'

// Placeholder logo grid — replace with real partner / sister brand marks when available.
const items = [
  'RGB Textiles', 'RGB Uniforms', 'RGB Sports', 'RGB Private Label',
  'RGB Merch', 'RGB Fabric Lab', 'RGB Foundation', 'RGB Store', 'RGB Care'
]

export default function GroupWebsites() {
  return (
    <section className="section py-24 md:py-32">
      <div className="section-inner">
        <SectionHead
          eyebrow="Our group"
          title={<>Sister brands &<br/><strong>allied programs.</strong></>}
          intro="Verticals we run alongside the main manufacturing floor — retail, private-label, foundation and fabric R&D."
        />

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 border border-mist rounded-card overflow-hidden">
          {items.map((name, i) => (
            <a
              key={name}
              href="#"
              className={`aspect-[16/7] flex items-center justify-center p-6 transition-colors hover:bg-cream ${
                (i % 3 !== 2) ? 'border-r border-mist' : ''
              } ${i < items.length - 3 ? 'border-b border-mist' : ''}`}
            >
              <div className="text-center">
                <div className="font-display font-bold text-lg tracking-tightest text-ink">
                  {name.split(' ')[0]}<span className="text-arvOrange">.</span>
                </div>
                <div className="eyebrow mt-1 !text-graphite">{name.split(' ').slice(1).join(' ')}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
