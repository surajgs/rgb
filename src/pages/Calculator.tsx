import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FABRIC_ADJ, PRINT_ADJ, PACKAGING_ADJ, PRODUCT_BASE, inr, priceQuote, volumeMultiplier,
  type Fabric, type PrintMethod, type Packaging, type Product } from '../lib/pricing'
import { PageHead } from './Builder'

export default function Calculator() {
  const [product, setProduct] = useState<Product>('roundneck')
  const [fabric, setFabric] = useState<Fabric>('cotton180')
  const [print, setPrint] = useState<PrintMethod>('screen')
  const [packaging, setPackaging] = useState<Packaging>('polybag')
  const [qty, setQty] = useState(1000)
  const [colors, setColors] = useState(2)
  const [sides, setSides] = useState(1)
  const [labelBranding, setLabelBranding] = useState(false)

  const p = useMemo(() =>
    priceQuote({ product, fabric, print, packaging, qty, colors, sides, labelBranding }),
    [product, fabric, print, packaging, qty, colors, sides, labelBranding]
  )

  const scenarios = useMemo(() => (
    [250, 500, 1000, 2500, 5000, 10000, 25000].map(q => ({
      q,
      total: priceQuote({ product, fabric, print, packaging, qty: q, colors, sides, labelBranding }).total,
      per: priceQuote({ product, fabric, print, packaging, qty: q, colors, sides, labelBranding }).perPieceDiscounted,
      mult: volumeMultiplier(q)
    }))
  ), [product, fabric, print, packaging, colors, sides, labelBranding])

  const maxTotal = Math.max(...scenarios.map(s => s.total))

  return (
    <section className="section py-14 md:py-20">
      <div className="section-inner">
        <PageHead
          eyebrow="Cost Calculator"
          title="Estimate what your order will cost."
          intro="Indicative pricing based on the same engine that drives our RFQs. Final numbers confirmed after sampling and PO."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-6">
            <Field label="Product">
              <Select value={product} onChange={setProduct}
                options={Object.entries(PRODUCT_BASE).map(([k, v]) => [k, v.name])} />
            </Field>
            <Field label="Fabric">
              <Select value={fabric} onChange={setFabric}
                options={Object.entries(FABRIC_ADJ).map(([k, v]) => [k, `${v.name} · ${v.gsm} GSM · ${v.comp}`])} />
            </Field>
            <Field label="Customisation">
              <Select value={print} onChange={setPrint}
                options={Object.entries(PRINT_ADJ).map(([k, v]) => [k, v.name])} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Print colours">
                <input type="number" min={1} max={8} value={colors}
                  onChange={e => setColors(Math.max(1, parseInt(e.target.value || '1')))}
                  className="w-full border border-mist px-3 py-2" />
              </Field>
              <Field label="Print sides">
                <input type="number" min={1} max={2} value={sides}
                  onChange={e => setSides(Math.max(1, parseInt(e.target.value || '1')))}
                  className="w-full border border-mist px-3 py-2" />
              </Field>
            </div>
            <Field label="Packaging">
              <Select value={packaging} onChange={setPackaging}
                options={Object.entries(PACKAGING_ADJ).map(([k, v]) => [k, v.name])} />
            </Field>
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={labelBranding} onChange={e => setLabelBranding(e.target.checked)} />
              <span className="text-sm">Custom branded labels (+₹14/pc)</span>
            </label>

            <Field label={`Quantity: ${qty.toLocaleString('en-IN')}`}>
              <input type="range" min={100} max={50000} step={100} value={qty}
                onChange={e => setQty(parseInt(e.target.value))}
                className="w-full accent-rust" />
              <div className="flex justify-between text-[11px] font-mono text-graphite mt-1">
                <span>100</span><span>10k</span><span>25k</span><span>50k</span>
              </div>
            </Field>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="border border-mist p-8 bg-cream">
              <div className="eyebrow">Estimate</div>
              <div className="mt-2 flex items-baseline gap-3">
                <div className="tick">{inr(p.total)}</div>
              </div>
              <div className="text-graphite">
                For <b>{qty.toLocaleString('en-IN')}</b> pieces · <b>{inr(p.perPieceDiscounted)}</b> per piece (incl. GST) ·
                lead time <b>{p.leadTimeDays[0]}–{p.leadTimeDays[1]} days</b>
              </div>
              <div className="mt-6 flex gap-3">
                <Link to={`/quote?product=${product}&qty=${qty}`} className="btn btn-accent">Convert to RFQ →</Link>
                <Link to="/builder" className="btn btn-outline">Open Builder</Link>
              </div>
            </div>

            <div className="border border-mist p-8">
              <div className="eyebrow mb-4">Volume Scenarios</div>
              <div className="space-y-3">
                {scenarios.map(s => (
                  <div key={s.q}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-mono">{s.q.toLocaleString('en-IN')} pcs</span>
                      <span className="text-graphite">
                        {inr(s.per)}/pc · multiplier {s.mult.toFixed(2)}
                      </span>
                      <span className="font-display font-bold">{inr(s.total)}</span>
                    </div>
                    <div className="h-2 mt-1 bg-mist relative">
                      <div
                        className={`h-full ${s.q === qty ? 'bg-rust' : 'bg-ink'}`}
                        style={{ width: `${(s.total / maxTotal) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-mist p-8">
              <div className="eyebrow mb-4">Per-piece composition</div>
              <div className="flex h-8 overflow-hidden border border-mist">
                {[
                  ['bg-ink', p.perPieceBase, 'Base'],
                  ['bg-graphite', p.perPieceFabric, 'Fabric'],
                  ['bg-rust', p.perPiecePrint, 'Print'],
                  ['bg-rustDark', p.perPiecePackaging, 'Pack'],
                  ['bg-stone', p.perPieceLabels, 'Labels']
                ].map(([bg, val, k]: any) => (
                  val > 0 && (
                    <div key={k} className={`${bg} text-paper text-[10px] flex items-center justify-center`}
                      style={{ flex: val }}
                      title={`${k}: ${inr(val)}`}
                    >
                      {k}
                    </div>
                  )
                ))}
              </div>
              <div className="mt-4 text-xs text-graphite">
                Note: pricing is indicative. Actual quote confirmed after sampling, artwork review and PO.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div>
      <div className="eyebrow mb-2">{label}</div>
      {children}
    </div>
  )
}

function Select<T extends string>({ value, onChange, options }: {
  value: T, onChange: (v: T) => void, options: [string, string][]
}) {
  return (
    <select value={value} onChange={e => onChange(e.target.value as T)}
      className="w-full border border-mist bg-paper px-3 py-2 text-sm">
      {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  )
}
