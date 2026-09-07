import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FABRIC_ADJ, PACKAGING_ADJ, PRINT_ADJ, PRODUCT_BASE, inr, priceQuote,
  type Fabric, type PrintMethod, type Packaging, type Product } from '../lib/pricing'

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'] as const
const COLORS: Array<{ id: string, name: string, hex: string }> = [
  { id: 'black', name: 'Ink Black', hex: '#0E0E10' },
  { id: 'white', name: 'Off White', hex: '#F1EFEA' },
  { id: 'navy', name: 'Deep Navy', hex: '#0F1F3A' },
  { id: 'grey', name: 'Melange Grey', hex: '#7B7C82' },
  { id: 'rust', name: 'Rust', hex: '#C24A1E' },
  { id: 'olive', name: 'Olive', hex: '#5A6142' },
  { id: 'maroon', name: 'Maroon', hex: '#621E24' },
  { id: 'sky', name: 'Sky', hex: '#8FBFD4' },
]

export default function Builder() {
  const [product, setProduct] = useState<Product>('roundneck')
  const [fabric, setFabric] = useState<Fabric>('cotton180')
  const [color, setColor] = useState(COLORS[0])
  const [size, setSize] = useState<Record<typeof SIZES[number], number>>({
    XS: 0, S: 0, M: 30, L: 40, XL: 20, '2XL': 10, '3XL': 0
  })
  const [print, setPrint] = useState<PrintMethod>('screen')
  const [colors, setColors] = useState(2)
  const [sides, setSides] = useState(1)
  const [packaging, setPackaging] = useState<Packaging>('polyPlusLabel')
  const [labelBranding, setLabelBranding] = useState(true)
  const [artwork, setArtwork] = useState<{ name: string, dataUrl: string } | null>(null)

  const qty = useMemo(() => Object.values(size).reduce((a, b) => a + b, 0), [size])
  const price = useMemo(() =>
    priceQuote({ product, fabric, print, packaging, qty, colors, sides, labelBranding }),
    [product, fabric, print, packaging, qty, colors, sides, labelBranding]
  )

  const onFile = (file: File | undefined) => {
    if (!file) return
    const r = new FileReader()
    r.onload = () => setArtwork({ name: file.name, dataUrl: r.result as string })
    r.readAsDataURL(file)
  }

  return (
    <section className="section py-14 md:py-20">
      <div className="section-inner">
        <PageHead
          eyebrow="Live Builder"
          title="Build Your T-Shirt Order"
          intro="Configure product, fabric, colour, sizes, printing and packaging. Cost updates live. Save the config to your RFQ."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* LEFT — preview + summary */}
          <aside className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start space-y-6">
            <div className="border border-mist bg-cream p-8 fabric relative">
              <div className="eyebrow flex justify-between">
                <span>{PRODUCT_BASE[product].name}</span>
                <span>{FABRIC_ADJ[fabric].gsm} GSM</span>
              </div>
              <TshirtPreview
                color={color.hex}
                print={print}
                artwork={artwork?.dataUrl}
                sides={sides}
              />
              <div className="mt-4 flex items-center justify-between text-xs text-graphite">
                <span>Color: <b className="text-ink">{color.name}</b></span>
                <span>Sides: <b className="text-ink">{sides}</b></span>
              </div>
            </div>

            <div className="border border-mist p-6">
              <div className="eyebrow">Live Cost</div>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-display font-bold text-3xl">{inr(price.total)}</span>
                <span className="text-graphite text-sm">for {qty} pcs · incl. GST</span>
              </div>
              <div className="mt-1 text-sm text-graphite">
                {qty > 0 ? <>{inr(price.perPieceDiscounted)} per piece · setup {inr(price.setup)}</> : <>Add quantities to see per-piece cost.</>}
              </div>
              <div className="rule my-4" />
              <div className="text-sm text-graphite">
                Estimated lead time: <b className="text-ink">{price.leadTimeDays[0]}–{price.leadTimeDays[1]} days</b>
              </div>
              <div className="mt-6 flex gap-3 flex-wrap">
                <Link to={{ pathname: '/quote', search: `?product=${product}&qty=${qty}` }} className="btn btn-accent flex-1">
                  Send to RFQ →
                </Link>
                <Link to="/calculator" className="btn btn-outline">Compare</Link>
              </div>
            </div>
          </aside>

          {/* RIGHT — configuration */}
          <div className="lg:col-span-7 space-y-10">
            <BuilderBlock n="01" title="Product">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {(Object.keys(PRODUCT_BASE) as Product[]).map(p => (
                  <button key={p} onClick={() => setProduct(p)}
                    className={`chip w-full justify-between ${product === p ? 'chip-active' : ''}`}>
                    <span>{PRODUCT_BASE[p].name}</span>
                    <span className="font-mono text-[11px] opacity-70">{inr(PRODUCT_BASE[p].base)}</span>
                  </button>
                ))}
              </div>
            </BuilderBlock>

            <BuilderBlock n="02" title="Fabric">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {(Object.keys(FABRIC_ADJ) as Fabric[]).map(f => (
                  <button key={f} onClick={() => setFabric(f)}
                    className={`chip w-full justify-between ${fabric === f ? 'chip-active' : ''}`}>
                    <span>{FABRIC_ADJ[f].name} · {FABRIC_ADJ[f].gsm} GSM</span>
                    <span className="font-mono text-[11px] opacity-70">+{inr(FABRIC_ADJ[f].adj)}</span>
                  </button>
                ))}
              </div>
            </BuilderBlock>

            <BuilderBlock n="03" title="Colour">
              <div className="flex flex-wrap gap-2">
                {COLORS.map(c => (
                  <button key={c.id} onClick={() => setColor(c)}
                    className={`flex items-center gap-2 border px-3 py-2 text-[12px] ${color.id === c.id ? 'border-ink' : 'border-mist hover:border-graphite'}`}>
                    <span className="w-5 h-5 border border-ink/20" style={{ background: c.hex }} />
                    {c.name}
                  </button>
                ))}
              </div>
            </BuilderBlock>

            <BuilderBlock n="04" title="Size Breakdown">
              <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                {SIZES.map(s => (
                  <label key={s} className="border border-mist p-3 text-center hover:border-graphite">
                    <div className="eyebrow">{s}</div>
                    <input
                      type="number" min={0}
                      value={size[s]}
                      onChange={e => setSize({ ...size, [s]: Math.max(0, parseInt(e.target.value || '0')) })}
                      className="w-full mt-2 text-center font-display font-bold text-lg outline-none"
                    />
                  </label>
                ))}
              </div>
              <div className="mt-3 text-sm text-graphite flex justify-between">
                <span>Total quantity: <b className="text-ink">{qty}</b></span>
                <span>Volume discount: <b className="text-ink">{Math.round((1 - price.volumeMultiplier) * 100)}%</b></span>
              </div>
            </BuilderBlock>

            <BuilderBlock n="05" title="Customisation">
              <div className="grid gap-2 md:grid-cols-2">
                {(Object.keys(PRINT_ADJ) as PrintMethod[]).map(p => (
                  <button key={p} onClick={() => setPrint(p)}
                    className={`chip w-full justify-between ${print === p ? 'chip-active' : ''}`}>
                    <span>{PRINT_ADJ[p].name}</span>
                    <span className="font-mono text-[11px] opacity-70">
                      {p === 'none' ? '—' : `+${inr(PRINT_ADJ[p].per)}/pc · setup ${inr(PRINT_ADJ[p].setup)}`}
                    </span>
                  </button>
                ))}
              </div>
              {print !== 'none' && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <NumberField label="Print colours" value={colors} onChange={setColors} min={1} max={8} />
                  <NumberField label="Print sides" value={sides} onChange={setSides} min={1} max={2} />
                </div>
              )}
            </BuilderBlock>

            <BuilderBlock n="06" title="Artwork Upload">
              <label className="flex items-center justify-between gap-4 border border-dashed border-graphite p-6 cursor-pointer hover:border-rust">
                <div>
                  <div className="font-display font-bold">
                    {artwork ? artwork.name : 'Upload design, tech pack or artwork'}
                  </div>
                  <div className="text-sm text-graphite">PNG, JPG, PDF, AI up to 20MB</div>
                </div>
                <span className="btn btn-outline">Choose file</span>
                <input type="file" className="hidden" accept="image/*,.pdf,.ai"
                  onChange={e => onFile(e.target.files?.[0] || undefined)} />
              </label>
            </BuilderBlock>

            <BuilderBlock n="07" title="Packaging & Labelling">
              <div className="grid gap-2 md:grid-cols-2">
                {(Object.keys(PACKAGING_ADJ) as Packaging[]).map(p => (
                  <button key={p} onClick={() => setPackaging(p)}
                    className={`chip w-full justify-between ${packaging === p ? 'chip-active' : ''}`}>
                    <span>{PACKAGING_ADJ[p].name}</span>
                    <span className="font-mono text-[11px] opacity-70">+{inr(PACKAGING_ADJ[p].per)}/pc</span>
                  </button>
                ))}
              </div>
              <label className="mt-4 flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={labelBranding} onChange={e => setLabelBranding(e.target.checked)} />
                <span className="text-sm">Add custom branded labels (+{inr(14)}/pc)</span>
              </label>
            </BuilderBlock>

            <details className="border border-mist p-6 bg-cream">
              <summary className="cursor-pointer font-display font-bold">Cost breakdown</summary>
              <div className="mt-4 grid gap-1 font-mono text-sm text-graphite">
                <Row k="Base" v={inr(price.perPieceBase)} />
                <Row k="Fabric adj." v={`+${inr(price.perPieceFabric)}`} />
                <Row k="Print / piece" v={`+${inr(price.perPiecePrint)}`} />
                <Row k="Packaging" v={`+${inr(price.perPiecePackaging)}`} />
                <Row k="Labels" v={`+${inr(price.perPieceLabels)}`} />
                <Row k="Volume × multiplier" v={price.volumeMultiplier.toFixed(2)} />
                <Row k="Setup (one-time)" v={inr(price.setup)} />
                <Row k="Subtotal" v={inr(price.subtotal)} />
                <Row k="GST @ 5%" v={inr(price.gst)} />
                <Row k="Total" v={inr(price.total)} strong />
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  )
}

function BuilderBlock({ n, title, children }: { n: string, title: string, children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-[11px] text-graphite">{n}</span>
        <h3 className="font-display font-bold text-2xl">{title}</h3>
        <div className="flex-1 h-px bg-mist" />
      </div>
      {children}
    </div>
  )
}

function NumberField({ label, value, onChange, min, max }: any) {
  return (
    <div className="flex items-center justify-between border border-mist px-3 py-2">
      <span className="text-sm">{label}</span>
      <div className="flex items-center gap-1">
        <button onClick={() => onChange(Math.max(min, value - 1))} className="w-7 h-7 border border-mist">−</button>
        <span className="w-8 text-center font-mono">{value}</span>
        <button onClick={() => onChange(Math.min(max, value + 1))} className="w-7 h-7 border border-mist">+</button>
      </div>
    </div>
  )
}

function Row({ k, v, strong }: { k: string, v: string, strong?: boolean }) {
  return (
    <div className={`flex justify-between border-t border-mist py-1.5 ${strong ? 'text-ink font-bold' : ''}`}>
      <span>{k}</span><span>{v}</span>
    </div>
  )
}

function TshirtPreview({ color, print, artwork, sides }: {
  color: string, print: string, artwork?: string, sides: number
}) {
  return (
    <div className="mt-4 relative aspect-square">
      <svg viewBox="0 0 300 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="fabricG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={color} stopOpacity="0.85"/>
            <stop offset="1" stopColor={color} stopOpacity="1"/>
          </linearGradient>
          <pattern id="tex" width="4" height="4" patternUnits="userSpaceOnUse">
            <path d="M0 2 H4 M2 0 V4" stroke="#000" strokeOpacity="0.05" strokeWidth="0.6"/>
          </pattern>
        </defs>
        {/* T-shirt silhouette */}
        <path
          d="M60 60 L100 40 Q110 30 130 30 Q150 55 170 30 Q190 30 200 40 L240 60 L260 90 L220 110 L215 260 Q215 270 205 270 L95 270 Q85 270 85 260 L80 110 L40 90 Z"
          fill="url(#fabricG)" stroke="#0E0E10" strokeWidth="1.5" strokeLinejoin="round"
        />
        <path
          d="M60 60 L100 40 Q110 30 130 30 Q150 55 170 30 Q190 30 200 40 L240 60 L260 90 L220 110 L215 260 Q215 270 205 270 L95 270 Q85 270 85 260 L80 110 L40 90 Z"
          fill="url(#tex)"
        />
        {/* Collar rib */}
        <path d="M130 30 Q150 55 170 30" fill="none" stroke="#0E0E10" strokeWidth="1.5" opacity="0.6"/>
        {/* Print area */}
        {artwork ? (
          <image href={artwork} x="105" y="110" width="90" height="90" preserveAspectRatio="xMidYMid meet"/>
        ) : print !== 'none' ? (
          <g transform="translate(150 155)">
            <rect x="-45" y="-45" width="90" height="90" fill="none" stroke="#0E0E10" strokeDasharray="4 3" opacity="0.35"/>
            <text x="0" y="6" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontWeight="700" fontSize="16" fill="#0E0E10">
              YOUR ARTWORK
            </text>
            <text x="0" y="24" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#3A3B40">
              print zone · 22 × 30 cm
            </text>
          </g>
        ) : null}
        {sides === 2 && (
          <g transform="translate(150 220)">
            <circle cx="0" cy="0" r="6" fill="#C24A1E"/>
            <text x="12" y="4" fontFamily="JetBrains Mono" fontSize="9" fill="#0E0E10">back print +1 side</text>
          </g>
        )}
      </svg>
    </div>
  )
}

export function PageHead({ eyebrow, title, intro }: any) {
  return (
    <div className="grid gap-6 md:grid-cols-12 items-end border-b border-mist pb-8">
      <div className="md:col-span-8">
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="h-display mt-3 text-4xl md:text-6xl leading-[1.02] tracking-tight">{title}</h1>
      </div>
      {intro && <p className="md:col-span-4 text-graphite leading-relaxed">{intro}</p>}
    </div>
  )
}
