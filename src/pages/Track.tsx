import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHead } from './Builder'

type Stage = { key: string, label: string, on: string, note?: string }
type Order = {
  id: string,
  buyer: string,
  product: string,
  qty: number,
  status: 'sampling' | 'production' | 'branding' | 'qc' | 'dispatched',
  editableUntil: 'production',
  stages: Stage[],
  dispatch: string
}

const DEMO: Record<string, Order> = {
  'RGB-24-1042': {
    id: 'RGB-24-1042',
    buyer: 'Meridian HR — Corporate Uniforms',
    product: 'Polo Shirt · 220 GSM Piqué · Navy · Embroidery',
    qty: 2500,
    status: 'production',
    editableUntil: 'production',
    dispatch: '2026-10-04',
    stages: [
      { key: 'req', label: 'Requirement Confirmed', on: '2026-08-28' },
      { key: 'fabric', label: 'Fabric Sourced', on: '2026-09-02', note: '2,780 m issued from stock lot #B-114' },
      { key: 'sample', label: 'Sample Approved', on: '2026-09-08', note: 'Client sign-off received via email' },
      { key: 'production', label: 'Production', on: '2026-09-15', note: 'Cutting 78% · Stitching 42%' },
      { key: 'branding', label: 'Branding', on: '' },
      { key: 'qc', label: 'Quality Control', on: '' },
      { key: 'pack', label: 'Packaging', on: '' },
      { key: 'dispatch', label: 'Dispatch', on: '' }
    ]
  },
  'RGB-24-1108': {
    id: 'RGB-24-1108',
    buyer: 'Signal Events — Marathon Merch',
    product: 'Round-neck · 160 GSM Performance · Sublimation full-print',
    qty: 10000,
    status: 'branding',
    editableUntil: 'production',
    dispatch: '2026-09-24',
    stages: [
      { key: 'req', label: 'Requirement Confirmed', on: '2026-08-15' },
      { key: 'fabric', label: 'Fabric Sourced', on: '2026-08-19' },
      { key: 'sample', label: 'Sample Approved', on: '2026-08-25' },
      { key: 'production', label: 'Production', on: '2026-09-01', note: '10,000 units completed' },
      { key: 'branding', label: 'Branding', on: '2026-09-10', note: 'Sublimation printing in progress' },
      { key: 'qc', label: 'Quality Control', on: '' },
      { key: 'pack', label: 'Packaging', on: '' },
      { key: 'dispatch', label: 'Dispatch', on: '' }
    ]
  }
}

export default function Track() {
  const [id, setId] = useState('')
  const [order, setOrder] = useState<Order | null>(null)
  const [err, setErr] = useState('')

  const lookup = () => {
    const key = id.trim().toUpperCase()
    if (!key) { setErr('Enter an order ID'); return }
    const o = DEMO[key]
    if (!o) { setErr(`No order found for ${key}. Try RGB-24-1042 or RGB-24-1108.`); setOrder(null); return }
    setErr('')
    setOrder(o)
  }

  return (
    <section className="section py-14 md:py-20">
      <div className="section-inner">
        <PageHead
          eyebrow="Order Tracking"
          title="Track your order."
          intro="Look up a live production status by order ID. Edit request or change qty allowed until production begins."
        />

        <div className="mt-10 border border-mist p-6 flex flex-wrap gap-3 items-end bg-cream">
          <div className="flex-1 min-w-[240px]">
            <div className="eyebrow mb-2">Order ID</div>
            <input value={id} onChange={e => setId(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && lookup()}
              placeholder="e.g. RGB-24-1042"
              className="w-full border border-mist bg-paper px-3 py-3 text-lg font-mono" />
          </div>
          <button onClick={lookup} className="btn btn-primary">Track →</button>
          <div className="basis-full text-xs text-graphite">
            Try <button className="underline" onClick={() => { setId('RGB-24-1042'); setTimeout(lookup, 0) }}>RGB-24-1042</button>
            {' '}or <button className="underline" onClick={() => { setId('RGB-24-1108'); setTimeout(lookup, 0) }}>RGB-24-1108</button>.
          </div>
        </div>

        {err && <div className="mt-6 border border-rust text-rustDark px-4 py-3 text-sm">{err}</div>}

        {order && <OrderView order={order} />}
      </div>
    </section>
  )
}

function OrderView({ order }: { order: Order }) {
  const completed = order.stages.findIndex(s => !s.on)
  const totalStages = order.stages.length
  const done = completed === -1 ? totalStages : completed
  const pct = Math.round((done / totalStages) * 100)

  const canEdit = ['sampling', 'production'].includes(order.status) === false ? false : order.status !== 'production'
    // Editable strictly before production stage begins

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-8 space-y-6">
        <div className="border border-mist p-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="eyebrow">Order</div>
              <div className="font-display font-bold text-2xl">{order.id}</div>
              <div className="text-graphite mt-1">{order.buyer}</div>
            </div>
            <div className="text-right">
              <div className="eyebrow">Status</div>
              <div className="mt-1 inline-flex items-center gap-2 border border-rust text-rust px-3 py-1.5 text-[12px] font-semibold tracking-micro uppercase">
                <span className="w-2 h-2 bg-rust rounded-full animate-pulse" />
                {order.status}
              </div>
            </div>
          </div>

          <div className="rule my-6" />
          <div className="grid gap-4 md:grid-cols-3 text-sm">
            <div><div className="eyebrow">Product</div><div className="mt-1">{order.product}</div></div>
            <div><div className="eyebrow">Quantity</div><div className="mt-1 font-mono">{order.qty.toLocaleString('en-IN')} pcs</div></div>
            <div><div className="eyebrow">Dispatch</div><div className="mt-1 font-mono">{order.dispatch}</div></div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-xs text-graphite mb-2">
              <span>{done}/{totalStages} stages · {pct}%</span>
              <span>ETA {order.dispatch}</span>
            </div>
            <div className="h-2 bg-mist relative overflow-hidden">
              <div className="h-full bg-ink" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>

        <div className="border border-mist p-8">
          <div className="eyebrow mb-6">Timeline</div>
          <ol className="relative border-l border-mist">
            {order.stages.map((s, i) => {
              const isDone = !!s.on
              const isCurrent = i === done - 1 || (i === done && !isDone)
              return (
                <li key={s.key} className="pl-6 pb-6 relative">
                  <span className={`absolute -left-[7px] top-1.5 w-3 h-3 rounded-full border-2 ${
                    isDone ? 'bg-rust border-rust' :
                    isCurrent ? 'bg-paper border-rust' : 'bg-paper border-mist'
                  }`} />
                  <div className={`font-display font-bold ${isDone ? 'text-ink' : 'text-stone'}`}>
                    {s.label}
                  </div>
                  <div className="text-xs font-mono text-graphite">
                    {s.on || 'pending'}
                  </div>
                  {s.note && <div className="text-sm text-graphite mt-1">{s.note}</div>}
                </li>
              )
            })}
          </ol>
        </div>
      </div>

      <aside className="lg:col-span-4 space-y-6">
        <div className={`border p-6 ${canEdit ? 'border-rust bg-rustSoft/40' : 'border-mist bg-cream'}`}>
          <div className="eyebrow">Edit Window</div>
          <div className="mt-2 font-display font-bold text-lg">
            {canEdit ? 'Editable' : 'Locked'}
          </div>
          <p className="text-sm text-graphite mt-2">
            {canEdit
              ? 'You can modify quantity, sizes or artwork until production begins.'
              : 'Order has entered production. Changes require a change-order approval by your account manager.'}
          </p>
          <button
            disabled={!canEdit}
            className={`mt-4 btn w-full ${canEdit ? 'btn-accent' : 'btn-outline opacity-50 cursor-not-allowed'}`}
          >
            {canEdit ? 'Edit Order' : 'Request Change'}
          </button>
        </div>

        <div className="border border-mist p-6">
          <div className="eyebrow mb-3">Account Manager</div>
          <div className="font-display font-bold">Karthik R.</div>
          <div className="text-sm text-graphite">Senior Merchandiser</div>
          <div className="mt-4 flex gap-2">
            <a href="tel:+917305160327" className="btn btn-outline flex-1">Call</a>
            <a href="https://wa.me/917305160327" className="btn btn-primary flex-1">WhatsApp</a>
          </div>
        </div>

        <Link to="/quote" className="block border border-mist p-6 hover:border-ink">
          <div className="eyebrow">Next order</div>
          <div className="font-display font-bold mt-2">Start a new RFQ →</div>
          <div className="text-sm text-graphite mt-1">Reorder or start a new project.</div>
        </Link>
      </aside>
    </div>
  )
}
