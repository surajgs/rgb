import { Link } from 'react-router-dom'
import { SectionHead } from './Segments'

const cats = [
  {
    label: 'T-Shirt Styles',
    items: [
      ['Round-Neck', 'Timeless everyday staple'],
      ['V-Neck', 'Elongates the neckline; flattering across body types'],
      ['U-Neck', 'Softer curve, contemporary silhouette'],
      ['Polo', 'Rooted in tennis; balances comfort with polish'],
      ['Corporate Tee', 'Holds colour wash-after-wash for a fresh look'],
      ['Sports Jersey', 'Moisture-wicking, seamless, unrestricted movement'],
      ['Uniform Tee', 'Breathable, colour-coded, easy to brand'],
      ['Custom / Private Label', 'Full-service OEM manufacturing']
    ]
  },
  {
    label: 'Fabric',
    items: [
      ['Cotton', 'Soft, breathable, hypoallergenic — daily wear'],
      ['Organic Cotton', 'GOTS-track; ~91% less water vs conventional'],
      ['Polyester', 'Durable, quick-drying, moisture-wicking'],
      ['Cotton-Poly Blends', 'Best of both — comfort + durability'],
      ['Bamboo', 'Natural wicking, hypoallergenic, eco-friendly'],
      ['Modal', 'Silky texture, sustainable sourcing'],
      ['Merino Wool', 'Temperature-regulating, odor-resistant'],
      ['Rayon / Linen', 'Luxurious drape / breathable summer weight']
    ]
  },
  {
    label: 'Customisation',
    items: [
      ['Screen Print', 'Cost-effective at bulk volumes'],
      ['Direct-to-Garment (DTG)', 'Detailed multi-colour artwork'],
      ['Embroidery', 'Professional elegance — logos, monograms'],
      ['Heat-Transfer Vinyl', 'Textured, intricate multi-colour effects'],
      ['Sublimation', 'Full-print event and sports jerseys'],
      ['Tie-Dye', 'Retro aesthetics, festival drops'],
      ['Woven & Printed Labels', 'Neck, side-seam, care'],
      ['Custom Packaging', 'Poly, barcode, branded boxes']
    ]
  }
]

export default function Manufacture() {
  return (
    <section className="section py-24 md:py-32">
      <div className="section-inner">
        <SectionHead
          eyebrow="What we manufacture"
          title={<>Built Around<br/>Your Requirement</>}
          intro="Every product category we make, every fabric we work in, every branding method we run — all under one roof at our Ambattur unit."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {cats.map(c => (
            <div key={c.label} className="card p-8">
              <div className="flex items-center justify-between">
                <span className="eyebrow">{c.label}</span>
                <span className="font-mono text-[11px] text-stone">{c.items.length} options</span>
              </div>
              <div className="rule my-6" />
              <ul className="space-y-4">
                {c.items.map(([name, desc]) => (
                  <li key={name} className="flex gap-3 text-[14px]">
                    <span className="w-1.5 h-1.5 mt-2 shrink-0 bg-rust" />
                    <div>
                      <div className="font-semibold">{name}</div>
                      <div className="text-graphite text-[13px] leading-snug">{desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link to="/builder" className="btn btn-primary">Configure Your Tee →</Link>
        </div>
      </div>
    </section>
  )
}
