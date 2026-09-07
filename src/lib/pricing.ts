// Central pricing engine — shared by Builder + Calculator + Quote
// Base prices are indicative; procurement pricing quoted formally in RFQ.

export type Product = 'roundneck' | 'polo' | 'hoodie' | 'shirt' | 'jacket' | 'workwear'
export type Fabric = 'cotton180' | 'cotton200' | 'pique220' | 'pique240' | 'performance160' | 'twill240' | 'fleece280'
export type PrintMethod = 'none' | 'screen' | 'dtf' | 'sublimation' | 'embroidery'
export type Packaging = 'polybag' | 'polyPlusLabel' | 'individualBox' | 'branded'

export const PRODUCT_BASE: Record<Product, { name: string, base: number }> = {
  roundneck:  { name: 'Round-neck T-Shirt', base: 145 },
  polo:       { name: 'Polo Shirt', base: 245 },
  hoodie:     { name: 'Hoodie', base: 495 },
  shirt:      { name: 'Shirt', base: 385 },
  jacket:     { name: 'Jacket', base: 695 },
  workwear:   { name: 'Workwear Set', base: 585 }
}

export const FABRIC_ADJ: Record<Fabric, { name: string, gsm: number, adj: number, comp: string }> = {
  cotton180:       { name: 'Bio-washed Cotton',  gsm: 180, adj: 0,   comp: '100% Cotton' },
  cotton200:       { name: 'Combed Cotton',      gsm: 200, adj: 20,  comp: '100% Cotton' },
  pique220:        { name: 'Piqué',              gsm: 220, adj: 35,  comp: '65/35 Poly-Cotton' },
  pique240:        { name: 'Piqué Premium',      gsm: 240, adj: 55,  comp: '100% Cotton' },
  performance160:  { name: 'Performance Wicking',gsm: 160, adj: 25,  comp: '100% Polyester' },
  twill240:        { name: 'Twill',              gsm: 240, adj: 65,  comp: 'Cotton Blend' },
  fleece280:       { name: 'Fleece',             gsm: 280, adj: 85,  comp: 'Cotton/Poly' }
}

export const PRINT_ADJ: Record<PrintMethod, { name: string, per: number, setup: number }> = {
  none:         { name: 'None', per: 0, setup: 0 },
  screen:       { name: 'Screen Print', per: 18, setup: 1200 },
  dtf:          { name: 'DTF / DTG', per: 32, setup: 400 },
  sublimation:  { name: 'Sublimation (full)', per: 55, setup: 800 },
  embroidery:   { name: 'Embroidery', per: 45, setup: 1600 }
}

export const PACKAGING_ADJ: Record<Packaging, { name: string, per: number }> = {
  polybag:        { name: 'Poly-bag', per: 4 },
  polyPlusLabel:  { name: 'Poly-bag + Barcode', per: 8 },
  individualBox:  { name: 'Individual Box', per: 22 },
  branded:        { name: 'Branded Custom Box', per: 48 }
}

// Volume discount tiers (applied to per-piece cost)
export function volumeMultiplier(qty: number): number {
  if (qty >= 25000) return 0.78
  if (qty >= 10000) return 0.83
  if (qty >= 5000)  return 0.88
  if (qty >= 2000)  return 0.93
  if (qty >= 500)   return 0.97
  return 1
}

export type PriceInput = {
  product: Product
  fabric: Fabric
  print: PrintMethod
  packaging: Packaging
  qty: number
  colors: number   // print colours; multiplies per-piece print cost
  sides: number    // 1 or 2 print sides
  labelBranding: boolean
}

export type PriceBreakdown = {
  perPieceBase: number
  perPieceFabric: number
  perPiecePrint: number
  perPiecePackaging: number
  perPieceLabels: number
  perPieceRaw: number
  perPieceDiscounted: number
  volumeMultiplier: number
  setup: number
  subtotal: number
  gst: number
  total: number
  leadTimeDays: [number, number]
}

export function priceQuote(i: PriceInput): PriceBreakdown {
  const p = PRODUCT_BASE[i.product].base
  const f = FABRIC_ADJ[i.fabric].adj
  const printPer = PRINT_ADJ[i.print].per * Math.max(1, i.colors) * Math.max(1, i.sides)
  const setup = PRINT_ADJ[i.print].setup * (i.print === 'none' ? 0 : 1)
  const pack = PACKAGING_ADJ[i.packaging].per
  const label = i.labelBranding ? 14 : 0
  const raw = p + f + printPer + pack + label
  const mult = volumeMultiplier(i.qty)
  const perDiscount = raw * mult
  const subtotal = perDiscount * i.qty + setup
  const gst = subtotal * 0.05  // 5% GST for garments < ₹1000, illustrative
  const total = subtotal + gst
  const lead = leadTime(i.qty)

  return {
    perPieceBase: p,
    perPieceFabric: f,
    perPiecePrint: printPer,
    perPiecePackaging: pack,
    perPieceLabels: label,
    perPieceRaw: raw,
    perPieceDiscounted: perDiscount,
    volumeMultiplier: mult,
    setup,
    subtotal,
    gst,
    total,
    leadTimeDays: lead
  }
}

function leadTime(qty: number): [number, number] {
  if (qty >= 25000) return [35, 55]
  if (qty >= 10000) return [25, 40]
  if (qty >= 5000)  return [20, 32]
  if (qty >= 2000)  return [18, 28]
  if (qty >= 500)   return [12, 18]
  return [10, 15]
}

export function inr(n: number): string {
  return '₹' + Math.round(n).toLocaleString('en-IN')
}
