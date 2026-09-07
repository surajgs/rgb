import { Link, useParams } from 'react-router-dom'
import { PageHead } from './Builder'

type Spec = { label: string, value: string }
type Content = {
  kicker: string
  title: string
  intro: string
  audience: string[]
  products: string[]
  specs: Spec[]
  callouts: { t: string, d: string }[]
  tone: string
}

const CONTENT: Record<string, Content> = {
  corporate: {
    kicker: 'Corporate',
    title: 'Branded Garments for Business',
    intro: 'Cotton corporate t-shirts and polos that keep their colour, hand and fit through daily wash cycles — plus branded merchandise for gifting, events and internal campaigns.',
    audience: ['HR & People teams', 'Procurement', 'Admin', 'Corporate gifting', 'Employee engagement', 'Marketing'],
    products: ['Cotton Corporate Tees', 'Polo Shirts', 'Formal Shirts', 'Sweatshirts', 'Jackets', 'Windcheaters', 'Caps', 'Bags'],
    specs: [
      { label: 'Preferred fabric', value: 'Combed 100% cotton, 180–200 GSM' },
      { label: 'Branding', value: 'Screen print · DTG · Embroidery · Heat-transfer' },
      { label: 'Colour palette', value: 'Neutrals — white, black, navy, grey (blue reads trust; red reads energy)' },
      { label: 'MOQ', value: '100 pieces (500 for full customisation)' }
    ],
    callouts: [
      { t: 'Wash-cycle durability', d: 'Cotton holds colour better than synthetics — corporate tees look fresh well past the six-month mark.' },
      { t: 'Long-term value', d: 'Higher upfront cost than synthetic alternatives, lower cost-per-wear across the life of the program.' },
      { t: 'Personalisation depth', d: 'Employee names, departments, sleeve badges — quoted alongside the base garment, not as an afterthought.' }
    ],
    tone: 'bg-cream'
  },
  uniforms: {
    kicker: 'Uniforms',
    title: 'Uniforms Built for Every Sector',
    intro: 'Cohesive, breathable uniform programs for the five sectors we run every day — hospitality, healthcare, retail, education and corporate.',
    audience: ['Hotels & restaurants', 'Hospitals & clinics', 'Retail chains', 'Schools & colleges', 'Factories & security', 'Corporate campuses'],
    products: ['Chef & F&B Wear', 'Housekeeping', 'Waitstaff Tees / Polos', 'Scrubs & Coats', 'Retail Uniforms', 'School Tees', 'Workwear Sets', 'Security Uniforms'],
    specs: [
      { label: 'Sector fits', value: 'Hospitality · Healthcare · Retail · Education · Corporate' },
      { label: 'Fabric', value: 'Cotton for breathability · Poly blends for moisture-wicking' },
      { label: 'Customisation', value: 'Screen print · Embroidery · Heat-transfer · DTG' },
      { label: 'Compliance track', value: 'GOTS / OEKO-TEX Standard 100 sourcing where required' }
    ],
    callouts: [
      { t: 'Hospitality', d: 'A professional, cohesive look staff can move in — guests identify the team from across the lobby, and logos stay crisp.' },
      { t: 'Healthcare', d: 'Colour-coded department wear supports workflow. Cotton and cotton-blends breathe through long shifts.' },
      { t: 'Retail', d: 'Consistent branded staff apparel across every store — the casual-professional aesthetic keeps the floor welcoming.' },
      { t: 'Education', d: 'Standardised tees build institutional pride and take fashion out of the day.' },
      { t: 'Corporate', d: 'Casual-Friday tees, event apparel, campus wear — the same quality as your uniform program.' }
    ],
    tone: 'bg-paper'
  },
  'custom-brands': {
    kicker: 'Custom Brands',
    title: 'Your Brand. Our Manufacturing.',
    intro: 'End-to-end OEM/ODM apparel manufacturing for D2C brands, private-label programs and designers — production-ready drops, labels to shipper.',
    audience: ['D2C apparel brands', 'Fashion labels', 'Designers', 'Private-label buyers', 'Established brands', 'Founders launching a first drop'],
    products: ['Basics (Round-neck, V-neck, U-neck)', 'Polos', 'Streetwear', 'Athleisure', 'Loungewear', 'Casual Shirts', 'Kidswear', 'Custom Silhouettes'],
    specs: [
      { label: 'Programs', value: 'OEM · ODM · Private Label · Fabric Development' },
      { label: 'Fabric range', value: 'Cotton · Organic Cotton · Poly · Blends · Bamboo · Modal · Tri-blend' },
      { label: 'Print / finish', value: 'Screen · DTG · Embroidery · Heat-transfer · Sublimation · Tie-dye' },
      { label: 'Label & pack', value: 'Woven neck labels, printed care labels, custom hang-tags, poly + master carton' }
    ],
    callouts: [
      { t: 'Sample to shipper', d: 'Sampling, approval, bulk, branding, QC, pack — one accountable production plan.' },
      { t: 'Fabric development', d: 'GSM, blend, hand-feel — developed to your brand brief, not off a supplier catalogue.' },
      { t: 'Sustainable options', d: 'GOTS-track organic cotton, bamboo, modal for brands whose customers ask.' }
    ],
    tone: 'bg-rustSoft/50'
  },
  events: {
    kicker: 'Events & Sports',
    title: 'Made for Moments That Matter',
    intro: 'High-volume, time-sensitive event apparel — from moisture-wicking marathon jerseys to sublimated conference merch — with per-city coordinated delivery.',
    audience: ['Marathons & race organisers', 'Corporate event teams', 'Conferences & summits', 'College events', 'Product launches', 'Exhibitions', 'Campaigns', 'Festivals'],
    products: ['Sports Jerseys', 'Marathon Tees', 'Volunteer Uniforms', 'Crew Apparel', 'Dealer Kits', 'Delegate Kits', 'Giveaway Merch', 'Promotional Tees'],
    specs: [
      { label: 'Volume band', value: '500 · 5,000 · 25,000 · 50,000+ pieces' },
      { label: 'Sports fabrics', value: 'Performance polyester 160 GSM (wicking, quick-dry) · Merino for varied climates' },
      { label: 'Event finishing', value: 'Sublimation full-print · Screen print · DTG · Heat-transfer' },
      { label: 'Turnaround', value: '12–18 days at ≤ 2K pcs · 18–28 at ≤ 10K · 25–40 at ≤ 25K' }
    ],
    callouts: [
      { t: 'Athletic performance', d: 'Seamless construction, moisture-wicking fabric, unrestricted movement — the tee doesn\'t compete with the runner.' },
      { t: 'Brand-longevity ads', d: 'A promotional tee stays in circulation years after a banner comes down. Measurable via QR codes and discount links.' },
      { t: 'Per-city dispatch', d: 'Cartons labelled to venue, sorted by size, ready to hand out on arrival.' }
    ],
    tone: 'bg-cream'
  }
}

export default function Solution() {
  const { slug = '' } = useParams()
  const c = CONTENT[slug]
  if (!c) return (
    <section className="section py-24 text-center">
      <div className="section-inner">
        <h1 className="h-display text-4xl">Solution not found</h1>
        <Link to="/" className="btn btn-primary mt-6">← Back to Home</Link>
      </div>
    </section>
  )

  return (
    <section className={`section py-14 md:py-20 ${c.tone}`}>
      <div className="section-inner">
        <PageHead
          eyebrow={`Solutions · ${c.kicker}`}
          title={c.title}
          intro={c.intro}
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="border border-mist p-8 bg-paper">
            <div className="eyebrow mb-4">Who this is for</div>
            <ul className="grid grid-cols-1 gap-y-2">
              {c.audience.map(a => (
                <li key={a} className="flex items-center gap-2 text-[15px]">
                  <span className="w-1.5 h-1.5 bg-rust" /> {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-mist p-8 bg-paper">
            <div className="eyebrow mb-4">What we make</div>
            <ul className="grid grid-cols-2 gap-y-2">
              {c.products.map(p => (
                <li key={p} className="flex items-center gap-2 text-[15px]">
                  <span className="w-1.5 h-1.5 bg-ink" /> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border border-mist bg-paper p-8">
          <div className="eyebrow mb-4">Production specification</div>
          <dl className="grid gap-4 md:grid-cols-2">
            {c.specs.map(s => (
              <div key={s.label} className="grid grid-cols-[140px_1fr] gap-4 border-t border-mist pt-3">
                <dt className="eyebrow text-stone">{s.label}</dt>
                <dd className="text-[14px]">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {c.callouts.map(cc => (
            <div key={cc.t} className="border border-mist p-6 bg-paper">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-px bg-rust" />
                <span className="eyebrow">Why it matters</span>
              </div>
              <div className="font-display font-bold text-lg">{cc.t}</div>
              <p className="mt-2 text-sm text-graphite leading-relaxed">{cc.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 border border-mist bg-ink text-paper p-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="eyebrow text-stone">Next step</div>
            <div className="font-display font-bold text-2xl mt-2">Get a quote for {c.kicker.toLowerCase()}</div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to={`/quote?type=${slug}`} className="btn btn-accent">Request a Quote →</Link>
            <Link to="/builder" className="btn btn-outline border-paper text-paper hover:bg-paper hover:text-ink">Open Builder</Link>
            <a href="tel:+917305160327" className="btn btn-outline border-paper text-paper hover:bg-paper hover:text-ink">Call +91 73051 60327</a>
          </div>
        </div>
      </div>
    </section>
  )
}
