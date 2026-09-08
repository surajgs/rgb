import { useState } from 'react'
import { SectionHead } from './Segments'

// Reformatted from the 18 articles on RGB's blog — grouped by theme so the
// reader picks a topic instead of scrolling a chronological feed.
type Post = { title: string, hook: string, minutes: number }
type Group = { key: string, label: string, posts: Post[] }

const groups: Group[] = [
  {
    key: 'products', label: 'Products & Styles',
    posts: [
      { title: 'Round-Neck T-Shirts', hook: 'A timeless silhouette — everyday comfort with the widest print canvas.', minutes: 4 },
      { title: 'V-Neck T-Shirts', hook: 'How the V evolved from undergarment to a neckline that flatters most body types.', minutes: 5 },
      { title: 'U-Neck T-Shirts', hook: 'Six styling paths from casual chic to evening elegance.', minutes: 5 },
      { title: 'Polo T-Shirts', hook: 'From tennis courts and Lacoste to modern smart-casual wardrobes.', minutes: 6 },
      { title: 'Cotton Corporate T-Shirts', hook: 'Why cotton holds its colour and its cost over the life of a uniform program.', minutes: 4 },
      { title: 'Uniform T-Shirts', hook: 'Hospitality, healthcare, retail, education, corporate — one garment, five jobs.', minutes: 7 },
      { title: 'Sports T-Shirts', hook: 'Moisture-wicking, seamless construction, and the fabric that fits your climate.', minutes: 5 },
      { title: 'Promotional T-Shirts', hook: 'Walking advertisements — how a tee outperforms a banner ad.', minutes: 5 },
      { title: 'Customized T-Shirts', hook: 'A guide to printing methods, fabrics, and design tools.', minutes: 6 },
      { title: 'Custom-Printed T-Shirts', hook: 'Personalisation and branding as a business strategy, not a novelty.', minutes: 4 },
    ]
  },
  {
    key: 'market', label: 'Market & Manufacturing',
    posts: [
      { title: 'T-Shirt Wholesale Market in Chennai', hook: 'Trends, opportunities and the artisan network shaping our production floor.', minutes: 9 },
      { title: 'Custom T-Shirt Graphics', hook: 'Building a brand identity that survives the wash.', minutes: 5 },
      { title: 'Creating Visually Appealing Custom T-Shirt Graphics', hook: 'Design principles for garments that get worn, not folded away.', minutes: 6 },
    ]
  },
  {
    key: 'care', label: 'Care & Longevity',
    posts: [
      { title: 'Best T-Shirt Washing Techniques', hook: 'Keep vibrant colour and soft hand for the full life of the garment.', minutes: 3 },
      { title: 'Reading the Care Label', hook: 'The two lines on the inside of the collar that decide how long it lasts.', minutes: 3 },
      { title: 'Avoid High Heat to Prevent Damage', hook: 'The single easiest habit change that protects a t-shirt.', minutes: 2 },
      { title: 'How to Prevent T-Shirt Fading', hook: 'Wash technique, sunlight, detergent choice — a short field guide.', minutes: 3 },
      { title: 'Fresh Scent, Longer', hook: 'Storage habits that keep tees smelling clean between wears.', minutes: 2 },
    ]
  }
]

export default function Insights() {
  const [active, setActive] = useState<Group['key']>('products')
  const g = groups.find(x => x.key === active)!

  return (
    <section id="insights" className="section py-20 md:py-28">
      <div className="section-inner">
        <SectionHead
          eyebrow="Insights"
          title={<>Field notes from<br/>the <strong className="text-arvOrange">production floor.</strong></>}
          intro="Everything we've written about the products, the market and the small habits that make a garment last."
        />

        <div className="mt-10 flex flex-wrap gap-2">
          {groups.map(x => (
            <button
              key={x.key}
              onClick={() => setActive(x.key)}
              className={`chip ${active === x.key ? 'chip-active' : ''}`}
            >
              {x.label}
              <span className="font-mono opacity-60 text-[10px]">{x.posts.length}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {g.posts.map((p, i) => (
            <article key={p.title} className="card p-6 flex flex-col group">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] text-stone">{String(i + 1).padStart(2, '0')}</span>
                <span className="eyebrow text-stone">{p.minutes} min read</span>
              </div>
              <h3 className="font-display font-bold text-xl leading-snug">{p.title}</h3>
              <p className="mt-2 text-sm text-graphite leading-relaxed">{p.hook}</p>
              <button className="mt-6 self-start text-[12px] font-semibold tracking-micro uppercase border-b border-ink pb-0.5 group-hover:text-rust group-hover:border-rust transition-colors">
                Read the piece →
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
