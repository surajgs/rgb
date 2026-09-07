import { useEffect, useRef, useState } from 'react'

const STORY_IMAGES = [
  { src: '/hero/1-loom.webp', alt: 'Artisan hands guiding colorful orange and teal thread on a traditional handloom' },
  { src: '/hero/2-thread.webp', alt: 'Spools of vibrant orange, teal, and green cotton yarn in a textile workshop' },
  { src: '/hero/4-cutting.webp', alt: 'Tailor cutting a pattern into terracotta fabric on a cutting table' },
  { src: '/hero/3-factory.webp', alt: 'Modern garment factory floor with rows of finished apparel' },
]

const HOLD_MS = 4800

export default function HeroVisual() {
  const [active, setActive] = useState(0)
  const [cycle, setCycle] = useState(0)
  const reducedMotion = useRef(false)

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion.current) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % STORY_IMAGES.length)
      setCycle((c) => c + 1)
    }, HOLD_MS)
    return () => window.clearInterval(id)
  }, [])

  return (
    <figure className="manufacturing-story relative w-full max-w-md overflow-hidden rounded-card border border-mist bg-cream shadow-soft" aria-label="Animated journey from a heritage handloom to modern apparel manufacturing">
      <div className="absolute inset-0" aria-hidden="true">
        {STORY_IMAGES.map((img, i) => (
          <img
            key={i === active ? `${i}-${cycle}` : i}
            src={img.src}
            alt={img.alt}
            className={`hero-kb-img ${i === active ? 'is-active' : ''}`}
          />
        ))}
        <div className="hero-kb-scrim" />
        <span className="story-grain" />
      </div>
      <div className="absolute inset-0 story-grid opacity-20" aria-hidden="true" />
      <div className="relative flex min-h-[460px] flex-col justify-end p-6 sm:p-8">
        <figcaption className="relative border-t border-white/25 pt-5"><span className="eyebrow !text-paper">The RGB story</span><div className="mt-3 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-[11px] font-semibold text-paper"><span>Heritage looms</span><i className="h-px bg-white/30" /><span className="text-center">Craft</span><i className="h-px bg-white/30" /><span className="text-right">Apparel at scale</span></div></figcaption>
      </div>
    </figure>
  )
}
