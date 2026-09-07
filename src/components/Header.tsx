import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Item = { to: string, label: string, sub?: string }
type Group = { label: string, accent: string, hoverText: string, items: Item[] }

// Full-screen overlay mega-menu — Arvind's single-button model.
const groups: Group[] = [
  {
    label: 'Our businesses',
    accent: 'text-arvOrange',
    hoverText: 'hover:text-arvOrange',
    items: [
      { to: '/solutions/corporate', label: 'Textile & Apparel', sub: 'Round-neck, polo, shirt, hoodie' },
      { to: '/solutions/uniforms', label: 'Institutional Uniforms', sub: 'Hospitality · Healthcare · Retail · Education · Corporate' },
      { to: '/solutions/custom-brands', label: 'Custom Brands', sub: 'OEM · ODM · Private Label' },
      { to: '/solutions/events', label: 'Events & Sports', sub: 'Marathons · Launches · Conferences' },
      { to: '/#fabric', label: 'Fabric & Sourcing', sub: 'Cotton · Poly · Blends · Eco' }
    ]
  },
  {
    label: 'Sustainability',
    accent: 'text-arvGreen',
    hoverText: 'hover:text-arvGreen',
    items: [
      { to: '/#sustainability', label: 'Environment', sub: 'GOTS · OEKO-TEX · water recycling' },
      { to: '/#sustainability', label: 'Social', sub: 'Artisans · fair wages · SA8000-track' },
      { to: '/#sustainability', label: 'Governance', sub: 'ISO 9001 · QC · audits' }
    ]
  },
  {
    label: 'Investors',
    accent: 'text-arvRed',
    hoverText: 'hover:text-arvRed',
    items: [
      { to: '/#investors', label: 'Operating snapshot', sub: 'FY 26-27 Q1' },
      { to: '/#investors', label: 'Capacity brief', sub: 'PDF · on request' },
      { to: '/#newsroom', label: 'Newsroom', sub: 'Milestones and updates' }
    ]
  },
  {
    label: 'Tools',
    accent: 'text-arvTeal',
    hoverText: 'hover:text-arvTeal',
    items: [
      { to: '/builder', label: 'T-shirt builder', sub: 'Live cost, live preview' },
      { to: '/calculator', label: 'Cost calculator', sub: 'Volume scenarios' },
      { to: '/track', label: 'Track order', sub: 'Live production status' },
      { to: '/quote', label: 'Request a quote', sub: '7-step RFQ' }
    ]
  }
]

export default function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b border-mist">
        <div className="section-inner flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3">
            <Logo />
            <span className="hidden md:block pl-3 border-l border-mist text-[11px] font-mono uppercase tracking-micro text-graphite">
              Lifestyle Brands
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/quote" className="btn btn-accent hidden sm:inline-flex">
              Request a quote →
            </Link>
            <button
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="group flex items-center gap-3 px-4 py-3 border border-ink rounded-card hover:bg-ink hover:text-paper transition-colors"
            >
              <div className="flex flex-col gap-[5px]">
                <span className={`block h-[2px] w-5 bg-current transition-all ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
                <span className={`block h-[2px] w-5 bg-current transition-all ${open ? 'opacity-0' : ''}`} />
                <span className={`block h-[2px] w-5 bg-current transition-all ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
              </div>
              <span className="text-[12px] font-semibold tracking-micro uppercase">
                {open ? 'Close' : 'Menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen overlay */}
      <div
        className={`fixed inset-0 z-50 bg-ink text-paper transition-all duration-300 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-hidden={!open}
      >
        <div className="section-inner h-full flex flex-col">
          {/* Top bar inside overlay */}
          <div className="flex items-center justify-between h-16 md:h-20 border-b border-graphite">
            <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
              <Logo invert />
              <span className="hidden md:block eyebrow !text-stone pl-3 border-l border-graphite">
                Lifestyle Brands
              </span>
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 border border-paper rounded-card hover:bg-paper hover:text-ink transition-colors"
              aria-label="Close menu"
            >
              <div className="w-5 h-5 relative">
                <span className="absolute top-1/2 left-0 w-full h-[2px] bg-current rotate-45" />
                <span className="absolute top-1/2 left-0 w-full h-[2px] bg-current -rotate-45" />
              </div>
              <span className="text-[12px] font-semibold tracking-micro uppercase">Close</span>
            </button>
          </div>

          {/* Menu body */}
          <div className="flex-1 overflow-y-auto py-10 md:py-14">
            <div className="grid gap-10 lg:gap-14 md:grid-cols-2 lg:grid-cols-4">
              {groups.map(g => (
                <div key={g.label}>
                  <div className={`eyebrow !${g.accent}`}>{g.label}</div>
                  <ul className="mt-5 space-y-4">
                    {g.items.map(it => (
                      <li key={g.label + it.label}>
                        <Link
                          to={it.to}
                          onClick={() => setOpen(false)}
                          className={`group block ${g.hoverText} transition-colors`}
                        >
                          <div className="font-display font-semibold text-xl md:text-2xl tracking-tightest leading-tight group-hover:translate-x-1 transition-transform inline-block">
                            {it.label}
                          </div>
                          {it.sub && <div className="text-[13px] text-stone mt-1">{it.sub}</div>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-14 pt-10 border-t border-graphite grid gap-8 md:grid-cols-3">
              <div>
                <div className="eyebrow !text-stone">Reach us</div>
                <div className="mt-3 space-y-1 text-[14px]">
                  <a href="tel:+917305160327" className="block hover:text-arvOrange">+91 73051 60327</a>
                  <a href="tel:+919940423257" className="block hover:text-arvOrange">+91 99404 23257</a>
                  <a href="https://wa.me/917305160327" className="block hover:text-arvOrange">WhatsApp sales team</a>
                </div>
              </div>
              <div>
                <div className="eyebrow !text-stone">Ambattur unit</div>
                <div className="mt-3 text-[14px] text-paper/90 leading-relaxed">
                  13, Natesan Street, Varadharajapuram<br/>
                  Ambattur, Chennai – 600053
                </div>
              </div>
              <div>
                <div className="eyebrow !text-stone">Quick start</div>
                <div className="mt-3 flex flex-wrap gap-3">
                  <Link to="/quote" onClick={() => setOpen(false)} className="btn btn-accent">Request a quote →</Link>
                  <Link to="/builder" onClick={() => setOpen(false)} className="btn btn-outline border-paper text-paper hover:bg-paper hover:text-ink">Open builder</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Logo({ invert = false }: { invert?: boolean }) {
  return (
    <img
      src="/RBG_Logo.webp"
      alt="RGB Lifestyle Brands"
      className={`h-8 w-[120px] object-contain object-left ${invert ? 'invert brightness-0 opacity-90' : ''}`}
    />
  )
}
