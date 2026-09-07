import { useMemo, useState } from 'react'
import { SectionHead } from './Segments'

type Row = { fabric: string, gsm: number, comp: string, app: string, notes: string }

// Rows synthesise every fabric mentioned across RGB's product articles.
const rows: Row[] = [
  { fabric: 'Bio-washed Cotton',   gsm: 180, comp: '100% Cotton',         app: 'Round-neck Tees',   notes: 'Soft, breathable, holds colour' },
  { fabric: 'Combed Cotton',       gsm: 200, comp: '100% Cotton',         app: 'Corporate Tees',    notes: 'Fresh look wash-after-wash' },
  { fabric: 'Organic Cotton',      gsm: 180, comp: '100% Cotton (GOTS)',  app: 'Sustainable Lines', notes: '~91% less water; pesticide-free' },
  { fabric: 'Piqué',               gsm: 220, comp: '65/35 Cotton/Poly',   app: 'Polos',             notes: 'Textured; comfort + durability' },
  { fabric: 'Piqué Premium',       gsm: 240, comp: '100% Cotton',         app: 'Corporate Polos',   notes: 'Mercerised; premium hand' },
  { fabric: 'Performance Poly',    gsm: 160, comp: '100% Polyester',      app: 'Sports Jerseys',    notes: 'Moisture-wicking, quick-dry' },
  { fabric: 'Bamboo Blend',        gsm: 170, comp: 'Bamboo / Cotton',     app: 'Eco Tees',          notes: 'Hypoallergenic, natural wicking' },
  { fabric: 'Modal',               gsm: 165, comp: 'Modal Blend',         app: 'Premium Basics',    notes: 'Silky texture, sustainable' },
  { fabric: 'Merino Wool',         gsm: 200, comp: '100% Merino',         app: 'All-Weather Sport', notes: 'Temp-regulating, odor-resistant' },
  { fabric: 'Rayon',               gsm: 150, comp: 'Viscose Rayon',       app: 'V-Neck / U-Neck',   notes: 'Luxurious drape, lightweight' },
  { fabric: 'Linen',               gsm: 160, comp: '100% Linen',          app: 'Summer Wear',       notes: 'Breathable, textured, natural' },
  { fabric: 'Tri-blend',           gsm: 175, comp: 'Cotton / Poly / Rayon', app: 'Promotional Tees', notes: 'Vintage aesthetic, soft feel' },
  { fabric: 'Twill',               gsm: 240, comp: 'Cotton Blend',        app: 'Workwear / Shirts', notes: 'Enzyme-washed, durable' },
  { fabric: 'Fleece',              gsm: 280, comp: 'Cotton/Poly',         app: 'Hoodies',           notes: 'Brushed inside, warm' },
]

export default function Fabric() {
  const [q, setQ] = useState('')
  const [gsm, setGsm] = useState<'all' | 'lt180' | '180-220' | 'gt220'>('all')
  const [comp, setComp] = useState<'all' | 'cotton' | 'poly' | 'blend' | 'eco'>('all')

  const filtered = useMemo(() => rows.filter(r => {
    const okQ = !q || (r.fabric + r.app + r.comp + r.notes).toLowerCase().includes(q.toLowerCase())
    const okG =
      gsm === 'all' ||
      (gsm === 'lt180' && r.gsm < 180) ||
      (gsm === '180-220' && r.gsm >= 180 && r.gsm <= 220) ||
      (gsm === 'gt220' && r.gsm > 220)
    const okC =
      comp === 'all' ||
      (comp === 'cotton' && /100% Cotton/i.test(r.comp)) ||
      (comp === 'poly' && /Polyester/i.test(r.comp)) ||
      (comp === 'blend' && /\//.test(r.comp)) ||
      (comp === 'eco' && /(Organic|Bamboo|Modal|Linen|GOTS)/i.test(r.comp + r.fabric + r.notes))
    return okQ && okG && okC
  }), [q, gsm, comp])

  return (
    <section id="fabric" className="section bg-cream border-y border-mist py-24 md:py-32">
      <div className="section-inner">
        <SectionHead
          eyebrow="Fabric library"
          title={<>Find the Right Fabric<br/>for Your Requirement.</>}
          intro="Every fabric we run — cotton, poly, blends, bamboo, modal, merino, linen — with the specification your procurement team asks for."
        />

        <div className="mt-12 flex flex-wrap gap-3 items-end">
          <div>
            <div className="eyebrow mb-2">Search</div>
            <input
              value={q} onChange={e => setQ(e.target.value)}
              placeholder="Cotton, Polo, Wicking, Eco…"
              className="border border-mist bg-paper px-3 py-2 text-sm w-64 focus:border-ink outline-none"
            />
          </div>
          <FilterGroup label="GSM" value={gsm} onChange={setGsm as any} options={[
            ['all', 'All'], ['lt180', '< 180'], ['180-220', '180–220'], ['gt220', '> 220']
          ]} />
          <FilterGroup label="Composition" value={comp} onChange={setComp as any} options={[
            ['all', 'All'], ['cotton', 'Cotton'], ['poly', 'Polyester'], ['blend', 'Blend'], ['eco', 'Eco']
          ]} />
          <div className="ml-auto text-sm text-graphite">
            {filtered.length} of {rows.length} fabrics
          </div>
        </div>

        <div className="mt-6 border border-mist bg-paper overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-mist">
                <Th>Fabric</Th><Th>GSM</Th><Th>Composition</Th><Th>Application</Th><Th>Notes</Th><Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.fabric} className="border-b border-mist last:border-b-0 hover:bg-cream">
                  <td className="px-4 py-4 font-display font-bold">{r.fabric}</td>
                  <td className="px-4 py-4 font-mono">{r.gsm}</td>
                  <td className="px-4 py-4">{r.comp}</td>
                  <td className="px-4 py-4">{r.app}</td>
                  <td className="px-4 py-4 text-graphite">{r.notes}</td>
                  <td className="px-4 py-4">
                    <button className="text-[12px] font-semibold tracking-micro uppercase text-rust hover:text-rustDark">
                      Request Sample →
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-graphite">No fabrics match those filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left px-4 py-3 eyebrow text-graphite font-mono">{children}</th>
}

function FilterGroup<T extends string>({
  label, value, onChange, options
}: {
  label: string, value: T, onChange: (v: T) => void, options: [T, string][]
}) {
  return (
    <div>
      <div className="eyebrow mb-2">{label}</div>
      <div className="flex gap-1 flex-wrap">
        {options.map(([v, l]) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className={`px-3 py-2 text-[12px] font-medium border ${value === v ? 'border-ink bg-ink text-paper' : 'border-mist bg-paper text-graphite hover:border-graphite'}`}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  )
}
