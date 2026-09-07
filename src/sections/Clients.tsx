import { SectionHead } from './Segments'

const clients = [
  'North Cotton Co.', 'Meridian HR', 'Anchor Hospitality', 'Vidya Institutes',
  'Athlete League', 'Cascade Retail', 'Nova Health', 'Peak Manufacturing',
  'Karma Startups', 'Signal Events', 'Union Textiles', 'Basecamp Brands'
]

export default function Clients() {
  return (
    <section className="section py-24 md:py-32">
      <div className="section-inner">
        <SectionHead
          eyebrow="Clients"
          title={<>Trusted by Businesses,<br/>Institutions & Brands</>}
          intro="Selected projects across corporate, institutional, hospitality and events. Under NDA where required."
        />

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 border border-mist">
          {clients.map((c, i) => (
            <div
              key={c}
              className="border-r border-b border-mist last:border-r-0 aspect-[3/2] flex items-center justify-center p-6 grayscale hover:grayscale-0"
            >
              <div className="text-center">
                <div className="font-display font-bold text-lg leading-tight">{c.split(' ')[0]}</div>
                <div className="eyebrow text-stone">{c.split(' ').slice(1).join(' ')}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
