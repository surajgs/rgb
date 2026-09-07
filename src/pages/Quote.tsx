import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PageHead } from './Builder'

const STEPS = [
  'Requirement', 'Quantity', 'Product', 'Customisation', 'Upload', 'Delivery', 'Contact'
] as const

const REQUIREMENTS = [
  'Corporate Apparel', 'Uniforms', 'Custom Brand Manufacturing',
  'Event Merchandise', 'Fabric', 'Other'
]
const QTY_BANDS = ['Below 100', '100–500', '500–5,000', '5,000–25,000', '25,000+']
const PRODUCTS = ['T-Shirt', 'Polo', 'Shirt', 'Jacket', 'Hoodie', 'Uniform', 'Workwear', 'Other']
const CUSTOM = ['Printing', 'Embroidery', 'Labels', 'Packaging', 'Custom Fabric', 'Other']

export default function Quote() {
  const [params] = useSearchParams()
  const [step, setStep] = useState(0)
  const [data, setData] = useState<any>({
    requirement: params.get('type') || '',
    qtyBand: '',
    products: params.get('product') ? [params.get('product')] : [],
    qtyExact: params.get('qty') || '',
    custom: [] as string[],
    files: [] as File[],
    deliveryPincode: '',
    deliveryDate: '',
    name: '', company: '', phone: '', email: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const toggle = (key: string, v: string) => {
    const arr = data[key] as string[]
    setData({ ...data, [key]: arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v] })
  }

  const canNext = () => {
    switch (step) {
      case 0: return !!data.requirement
      case 1: return !!data.qtyBand
      case 2: return data.products.length > 0
      case 3: return true
      case 4: return true
      case 5: return !!data.deliveryPincode
      case 6: return data.name && data.company && data.phone && data.email
    }
    return false
  }

  if (submitted) {
    return (
      <section className="section py-24 md:py-32">
        <div className="section-inner max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto border-2 border-rust flex items-center justify-center text-rust text-2xl">✓</div>
          <h1 className="h-display mt-6 text-4xl md:text-5xl">RFQ received.</h1>
          <p className="mt-4 text-graphite text-lg">
            Reference <b className="font-mono text-ink">RFQ-{Date.now().toString().slice(-6)}</b> —
            our sales team will reach out within an hour on <b>{data.email}</b>.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/track" className="btn btn-outline">Track existing order</Link>
            <Link to="/" className="btn btn-primary">Back to Home →</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section py-14 md:py-20">
      <div className="section-inner">
        <PageHead
          eyebrow="Request a Quote"
          title="Tell us what you need."
          intro="7 quick steps. Attach a tech pack if you have one — otherwise we help build the spec together."
        />

        {/* Stepper */}
        <div className="mt-10 grid grid-cols-7 gap-1">
          {STEPS.map((s, i) => (
            <button key={s} onClick={() => i < step && setStep(i)}
              className={`text-left ${i > step ? 'opacity-40 cursor-not-allowed' : ''}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-6 h-6 flex items-center justify-center text-[11px] font-mono ${
                  i < step ? 'bg-rust text-paper' :
                  i === step ? 'bg-ink text-paper' :
                  'border border-mist text-graphite'
                }`}>{i + 1}</span>
                <div className={`flex-1 h-px ${i < step ? 'bg-rust' : 'bg-mist'}`} />
              </div>
              <div className={`eyebrow ${i === step ? 'text-ink' : 'text-graphite'}`}>{s}</div>
            </button>
          ))}
        </div>

        <div className="mt-10 border border-mist p-8 md:p-12 bg-paper min-h-[420px]">
          {step === 0 && (
            <Step title="What are you looking for?">
              <ChipGroup options={REQUIREMENTS} value={data.requirement}
                onChange={v => setData({ ...data, requirement: v })} />
            </Step>
          )}
          {step === 1 && (
            <Step title="Approximate quantity?">
              <ChipGroup options={QTY_BANDS} value={data.qtyBand}
                onChange={v => setData({ ...data, qtyBand: v })} />
              <div className="mt-6">
                <div className="eyebrow mb-2">Or exact number (optional)</div>
                <input type="number" placeholder="e.g. 2500"
                  value={data.qtyExact}
                  onChange={e => setData({ ...data, qtyExact: e.target.value })}
                  className="border border-mist px-3 py-2 w-full max-w-xs" />
              </div>
            </Step>
          )}
          {step === 2 && (
            <Step title="Which products?" subtitle="Select one or more">
              <ChipGroupMulti options={PRODUCTS} value={data.products}
                onToggle={v => toggle('products', v)} />
            </Step>
          )}
          {step === 3 && (
            <Step title="Customisation?" subtitle="Optional — select all that apply">
              <ChipGroupMulti options={CUSTOM} value={data.custom}
                onToggle={v => toggle('custom', v)} />
            </Step>
          )}
          {step === 4 && (
            <Step title="Upload design or tech pack" subtitle="Optional — PDF, AI, PSD, PNG, JPG">
              <label className="block border border-dashed border-graphite p-10 text-center cursor-pointer hover:border-rust">
                <div className="font-display font-bold text-xl">
                  {data.files.length ? `${data.files.length} file(s) selected` : 'Drop files or click to upload'}
                </div>
                <div className="text-sm text-graphite mt-1">Up to 20 MB per file</div>
                <input type="file" multiple className="hidden"
                  onChange={e => setData({ ...data, files: Array.from(e.target.files || []) })} />
              </label>
              {data.files.length > 0 && (
                <ul className="mt-4 space-y-2 text-sm font-mono">
                  {(data.files as File[]).map(f => (
                    <li key={f.name} className="flex justify-between border-b border-mist py-2">
                      <span>{f.name}</span>
                      <span className="text-graphite">{Math.round(f.size / 1024)} KB</span>
                    </li>
                  ))}
                </ul>
              )}
            </Step>
          )}
          {step === 5 && (
            <Step title="Delivery">
              <div className="grid gap-4 md:grid-cols-2 max-w-2xl">
                <TextField label="Delivery pincode / city" value={data.deliveryPincode}
                  onChange={v => setData({ ...data, deliveryPincode: v })} placeholder="e.g. 641001" />
                <TextField label="Required by (date)" type="date" value={data.deliveryDate}
                  onChange={v => setData({ ...data, deliveryDate: v })} />
              </div>
            </Step>
          )}
          {step === 6 && (
            <Step title="Contact details">
              <div className="grid gap-4 md:grid-cols-2 max-w-2xl">
                <TextField label="Name" value={data.name} onChange={v => setData({ ...data, name: v })} />
                <TextField label="Company" value={data.company} onChange={v => setData({ ...data, company: v })} />
                <TextField label="Phone" value={data.phone} onChange={v => setData({ ...data, phone: v })} />
                <TextField label="Email" type="email" value={data.email} onChange={v => setData({ ...data, email: v })} />
              </div>
            </Step>
          )}

          <div className="mt-10 flex items-center justify-between border-t border-mist pt-6">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="btn btn-ghost disabled:opacity-30"
            >← Back</button>
            <div className="text-xs text-graphite font-mono">Step {step + 1} of {STEPS.length}</div>
            {step < STEPS.length - 1 ? (
              <button
                onClick={() => canNext() && setStep(step + 1)}
                disabled={!canNext()}
                className={`btn ${canNext() ? 'btn-primary' : 'btn-outline opacity-40 cursor-not-allowed'}`}
              >Next →</button>
            ) : (
              <button
                onClick={() => canNext() && setSubmitted(true)}
                disabled={!canNext()}
                className={`btn ${canNext() ? 'btn-accent' : 'btn-outline opacity-40 cursor-not-allowed'}`}
              >Submit RFQ →</button>
            )}
          </div>
        </div>

        <div className="mt-6 text-sm text-graphite">
          Prefer to talk? <a className="text-rust underline" href="https://wa.me/917305160327">WhatsApp +91 73051 60327</a> or call <a className="text-rust underline" href="tel:+919940423257">+91 99404 23257</a>.
        </div>
      </div>
    </section>
  )
}

function Step({ title, subtitle, children }: any) {
  return (
    <div>
      <div className="eyebrow">Question</div>
      <h2 className="h-display mt-2 text-3xl md:text-4xl">{title}</h2>
      {subtitle && <p className="text-graphite mt-1">{subtitle}</p>}
      <div className="mt-8">{children}</div>
    </div>
  )
}

function ChipGroup({ options, value, onChange }: any) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o: string) => (
        <button key={o} onClick={() => onChange(o)}
          className={`chip ${value === o ? 'chip-active' : ''}`}>
          {value === o && <span>✓</span>}
          {o}
        </button>
      ))}
    </div>
  )
}
function ChipGroupMulti({ options, value, onToggle }: any) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o: string) => (
        <button key={o} onClick={() => onToggle(o)}
          className={`chip ${value.includes(o) ? 'chip-active' : ''}`}>
          {value.includes(o) && <span>✓</span>}
          {o}
        </button>
      ))}
    </div>
  )
}
function TextField({ label, value, onChange, type = 'text', placeholder }: any) {
  return (
    <label className="block">
      <div className="eyebrow mb-2">{label}</div>
      <input type={type} value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className="w-full border border-mist px-3 py-3" />
    </label>
  )
}
