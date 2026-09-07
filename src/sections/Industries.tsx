import { SectionHead } from './Segments'

// Sourced from RGB's Uniforms article — the five core sectors — plus the
// three additional programs we run through the same floor.
const industries = [
  {
    name: 'Hospitality',
    icon: 'M3 21V7l9-4 9 4v14M9 21v-8h6v8',
    body: 'Restaurants, hotels, cafés — cohesive, breathable staff apparel that\'s easy for guests to identify.'
  },
  {
    name: 'Healthcare',
    icon: 'M12 3v18M3 12h18M8 8h8v8H8z',
    body: 'Colour-coded department wear built for hygiene and long shifts. Practical mobility for patient care.'
  },
  {
    name: 'Retail',
    icon: 'M3 7h18l-1 14H4L3 7Zm4 0V5a5 5 0 0 1 10 0v2',
    body: 'Consistent branded staff apparel across every touchpoint — casual-professional and welcoming.'
  },
  {
    name: 'Education',
    icon: 'M22 10 12 4 2 10l10 6 10-6ZM6 12v5c3 2 9 2 12 0v-5',
    body: 'Standardised uniform tees that build institutional pride and minimise fashion distractions.'
  },
  {
    name: 'Corporate',
    icon: 'M4 21V7l8-4 8 4v14M9 21v-6h6v6M4 21h16',
    body: 'Cotton corporate tees, polos and event apparel that hold their look wash-after-wash.'
  },
  {
    name: 'Sports & Fitness',
    icon: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-5 6 5 5 5-5M7 16l5-5 5 5',
    body: 'Moisture-wicking jerseys with seamless construction — flat-out performance for athletes and fans.'
  },
  {
    name: 'Events & Campaigns',
    icon: 'M3 21V9l9-6 9 6v12M9 21v-8h6v8M12 3v18',
    body: 'Marathons, launches, conferences — high-volume, time-critical delivery with brand-perfect finishing.'
  },
  {
    name: 'D2C & Private Label',
    icon: 'M12 2 4 8v12h16V8L12 2Zm-2 12 2-4 2 4M9 20v-4M15 20v-4',
    body: 'End-to-end OEM/ODM manufacturing for brands who want production-ready drops, tags to shipper.'
  }
]

export default function Industries() {
  return (
    <section className="section py-24 md:py-32">
      <div className="section-inner">
        <SectionHead
          eyebrow="Who we serve"
          title={<>Manufacturing Across<br/>Industries</>}
          intro="Uniforms in hospitality, healthcare, retail, education and corporate; event merchandise; private-label apparel — same floor, same accountability."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-mist border border-mist rounded-3xl overflow-hidden shadow-card">
          {industries.map(i => (
            <div key={i.name} className="bg-paper p-8 hover:bg-cream transition-colors group">
              <span className="icon-chip">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d={i.icon} />
                </svg>
              </span>
              <div className="mt-5 font-display text-xl">{i.name}</div>
              <p className="mt-2 text-sm text-graphite leading-relaxed">{i.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
