import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section py-32">
      <div className="section-inner text-center max-w-xl mx-auto">
        <div className="eyebrow">404</div>
        <h1 className="h-display text-6xl mt-4">Off the production line.</h1>
        <p className="text-graphite mt-4">The page you were looking for isn't in stock.</p>
        <Link to="/" className="btn btn-primary mt-8">← Back to Home</Link>
      </div>
    </section>
  )
}
