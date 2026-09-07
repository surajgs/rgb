import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-mist bg-ink text-paper">
      <div className="section-inner py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="font-display text-2xl font-bold tracking-tight">
              Ready to manufacture your next order?
            </div>
            <p className="mt-3 text-stone max-w-sm">
              A Chennai-based apparel manufacturer serving corporate, institutional, sports and event orders — from 100 pieces to 50,000.
            </p>
            <Link to="/quote" className="btn btn-accent mt-6">
              Request a Quote →
            </Link>
          </div>

          <FooterCol title="Products" links={[
            ['Branded Garments', '/solutions/corporate'],
            ['Uniforms', '/solutions/uniforms'],
            ['Sports T-Shirts', '/solutions/events'],
            ['Custom Brands', '/solutions/custom-brands']
          ]} />
          <FooterCol title="T-Shirt Styles" links={[
            ['Round-Neck', '/builder?p=roundneck'],
            ['Polo', '/builder?p=polo'],
            ['V-Neck', '/builder?p=vneck'],
            ['U-Neck', '/builder?p=uneck'],
          ]} />
          <FooterCol title="Tools" links={[
            ['Cost Calculator', '/calculator'],
            ['T-Shirt Builder', '/builder'],
            ['Track Order', '/track'],
            ['Fabric Library', '/#fabric'],
          ]} />
          <FooterCol title="Reach Us" links={[
            ['+91 73051 60327', 'tel:+917305160327'],
            ['+91 99404 23257', 'tel:+919940423257'],
            ['WhatsApp Sales', 'https://wa.me/917305160327'],
            ['13, Natesan Street', 'https://maps.google.com/?q=13+Natesan+Street+Varadharajapuram+Ambattur+Chennai+600053'],
            ['Varadharajapuram, Ambattur', 'https://maps.google.com/?q=13+Natesan+Street+Varadharajapuram+Ambattur+Chennai+600053'],
            ['Chennai – 600053', 'https://maps.google.com/?q=13+Natesan+Street+Varadharajapuram+Ambattur+Chennai+600053'],
          ]} />
        </div>

        <div className="mt-16 pt-8 border-t border-graphite flex flex-col md:flex-row justify-between gap-4 text-xs text-stone">
          <div>© {new Date().getFullYear()} RGB Lifestyle Brands. All rights reserved.</div>
          <div className="flex flex-wrap gap-6">
            <a href="#" className="hover:text-paper">Privacy Policy</a>
            <a href="#" className="hover:text-paper">Terms</a>
            <a href="#" className="hover:text-paper">Sitemap</a>
            <a href="#" className="hover:text-paper">Manufacturer · Chennai, TN</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string, links: [string, string][] }) {
  const isExternal = (h: string) => /^https?:|^tel:|^mailto:/.test(h)
  return (
    <div>
      <div className="eyebrow text-stone mb-4">{title}</div>
      <ul className="space-y-2">
        {links.map(([label, to]) => (
          <li key={label}>
            {isExternal(to) ? (
              <a href={to} className="text-[14px] text-paper/90 hover:text-rust">{label}</a>
            ) : (
              <Link to={to} className="text-[14px] text-paper/90 hover:text-rust">{label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
