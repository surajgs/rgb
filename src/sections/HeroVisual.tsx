import { useEffect, useRef, useState } from 'react'

type SceneKey = 'corporate' | 'uniforms' | 'sports' | 'brand'

type Scene = {
  key: SceneKey
  segment: string
  garment: string        // top-right pill
  fabric: string
  gsm: number
  bg: string             // scene backdrop
  skin: string           // model skin
  hair: string           // model hair
  bottom: string         // trouser/short color
  garmentPrimary: string
  garmentSecondary: string
  accent: string
  swatches: string[]
  liveUnits: number
}

const SCENES: Scene[] = [
  {
    key: 'corporate',
    segment: 'Corporate',
    garment: 'Cotton corporate polo',
    fabric: 'Piqué 220',
    gsm: 220,
    bg: '#F4F5F6',
    skin: '#C89477', hair: '#1F2933',
    bottom: '#0F1F3A',
    garmentPrimary: '#0F1F3A', garmentSecondary: '#F4F5F6',
    accent: '#F37C24',
    swatches: ['#0B0F14', '#F4F5F6', '#0F1F3A', '#4A5563', '#F37C24'],
    liveUnits: 3210
  },
  {
    key: 'uniforms',
    segment: 'Uniforms',
    garment: 'Hospitality uniform',
    fabric: 'Combed 200',
    gsm: 200,
    bg: '#CDE4D8',
    skin: '#D6A98A', hair: '#2A1810',
    bottom: '#1F2933',
    garmentPrimary: '#165A39', garmentSecondary: '#CDE4D8',
    accent: '#F37C24',
    swatches: ['#165A39', '#CDE4D8', '#0B0F14', '#F4F5F6', '#D6A24B'],
    liveUnits: 7420
  },
  {
    key: 'sports',
    segment: 'Sports & Events',
    garment: 'Marathon jersey',
    fabric: 'Performance 160',
    gsm: 160,
    bg: '#F7CCD1',
    skin: '#B87C63', hair: '#0B0F14',
    bottom: '#0B0F14',
    garmentPrimary: '#D12337', garmentSecondary: '#F37C24',
    accent: '#0B0F14',
    swatches: ['#D12337', '#F7CCD1', '#0B0F14', '#F37C24', '#F4F5F6'],
    liveUnits: 12980
  },
  {
    key: 'brand',
    segment: 'Custom Brands',
    garment: 'Private-label round-neck',
    fabric: 'Organic 180',
    gsm: 180,
    bg: '#D6F0F2',
    skin: '#8E5A3E', hair: '#1F2933',
    bottom: '#2A1810',
    garmentPrimary: '#62C7CE', garmentSecondary: '#D6F0F2',
    accent: '#F37C24',
    swatches: ['#62C7CE', '#D6F0F2', '#0B0F14', '#F37C24', '#F4F5F6'],
    liveUnits: 5460
  }
]

const INTERVAL_MS = 5500

export default function HeroVisual() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const rot = useRef<number | null>(null)
  const s = SCENES[i]

  useEffect(() => {
    if (paused) return
    rot.current = window.setTimeout(() => setI(p => (p + 1) % SCENES.length), INTERVAL_MS)
    return () => { if (rot.current) window.clearTimeout(rot.current) }
  }, [i, paused])

  return (
    <div
      className="relative w-full max-w-md"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative aspect-[4/5] rounded-card overflow-hidden shadow-soft"
        style={{ background: s.bg }}
      >
        {/* Backdrop weave */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.08]" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <pattern id="mv" width="4" height="4" patternUnits="userSpaceOnUse">
              <path d="M0 2 H4 M2 0 V4" stroke="#0B0F14" strokeWidth="0.4"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#mv)"/>
        </svg>

        <Model key={s.key} scene={s} />

        {/* Spec ribbon (top-left) */}
        <div key={`sp-${s.key}`} className="absolute top-5 left-5 bg-paper px-3 py-1.5 rounded-card font-mono text-[10px] uppercase tracking-micro text-ink shadow-card animate-[fadeUp_400ms_ease-out]">
          {s.fabric} GSM
        </div>

        {/* Segment tag (top-right) */}
        <div key={`sg-${s.key}`} className="absolute top-5 right-5 bg-ink text-paper px-3 py-1.5 rounded-card text-[11px] font-semibold uppercase tracking-micro animate-[fadeUp_400ms_ease-out]">
          {s.segment}
        </div>

        {/* Colourways strip */}
        <div key={`sw-${s.key}`} className="absolute bottom-5 left-5 right-5 flex items-center gap-2 animate-[fadeUp_500ms_ease-out]">
          <span className="eyebrow bg-paper/85 px-2 py-1 rounded-card !text-graphite">Colourways</span>
          <div className="flex-1 flex items-center gap-1.5">
            {s.swatches.map((c, k) => (
              <span
                key={k}
                className="flex-1 h-4 rounded-sm border border-black/10"
                style={{ background: c }}
                title={c}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Pagination */}
      <div className="mt-10 flex items-center justify-center gap-3">
        {SCENES.map((sc, k) => (
          <button
            key={sc.key}
            onClick={() => setI(k)}
            aria-label={`Show ${sc.segment}`}
            className={`group flex items-center gap-2 transition-all ${k === i ? 'text-ink' : 'text-graphite hover:text-ink'}`}
          >
            <span
              className={`block h-1.5 rounded-full transition-all ${
                k === i ? 'w-10 bg-arvOrange' : 'w-3 bg-mist group-hover:bg-graphite'
              }`}
            />
            <span className={`text-[11px] font-mono uppercase tracking-micro hidden md:inline ${k === i ? '' : 'opacity-0 group-hover:opacity-100'}`}>
              {sc.segment}
            </span>
          </button>
        ))}
        <span className="ml-3 text-[10px] font-mono uppercase tracking-micro text-graphite">
          {paused ? 'Paused' : `Auto ${(INTERVAL_MS / 1000)|0}s`}
        </span>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes rise {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

/**
 * Editorial fashion illustration — a stylised model wearing the segment's
 * garment. Silhouette-forward, so it reads at hero scale.
 */
function Model({ scene }: { scene: Scene }) {
  const commonProps = { skin: scene.skin, hair: scene.hair, bottom: scene.bottom, accent: scene.accent }

  return (
    <svg
      viewBox="0 0 400 500"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMax meet"
      style={{ animation: 'rise 650ms cubic-bezier(.2,.7,.2,1) both' }}
    >
      <defs>
        <pattern id="mgWeave" width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 3 H6 M3 0 V6" stroke="#0B0F14" strokeOpacity="0.08" strokeWidth="0.7"/>
        </pattern>
        <filter id="mSoft" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#0B0F14" floodOpacity="0.15"/>
        </filter>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="200" cy="470" rx="90" ry="8" fill="#0B0F14" opacity="0.12" />

      {scene.key === 'corporate' && <CorporatePolo {...commonProps} primary={scene.garmentPrimary} secondary={scene.garmentSecondary} />}
      {scene.key === 'uniforms'  && <HospitalityUniform {...commonProps} primary={scene.garmentPrimary} secondary={scene.garmentSecondary} />}
      {scene.key === 'sports'    && <MarathonRunner {...commonProps} primary={scene.garmentPrimary} secondary={scene.garmentSecondary} />}
      {scene.key === 'brand'     && <StreetwearTee {...commonProps} primary={scene.garmentPrimary} secondary={scene.garmentSecondary} />}
    </svg>
  )
}

type ModelProps = {
  skin: string; hair: string; bottom: string; accent: string
  primary: string; secondary: string
}

/* -------------------- 01 · Corporate polo -------------------- */
function CorporatePolo({ skin, hair, bottom, accent, primary, secondary }: ModelProps) {
  return (
    <g filter="url(#mSoft)">
      {/* Head */}
      <circle cx="200" cy="120" r="34" fill={skin} />
      {/* Hair */}
      <path d="M166 118 Q170 82 200 82 Q232 82 234 118 L232 108 Q220 96 200 96 Q180 96 168 108 Z" fill={hair} />
      {/* Neck */}
      <rect x="190" y="150" width="20" height="18" fill={skin} />
      {/* Trousers */}
      <rect x="176" y="330" width="20" height="130" fill={bottom} rx="3"/>
      <rect x="204" y="330" width="20" height="130" fill={bottom} rx="3"/>
      {/* Belt */}
      <rect x="170" y="325" width="60" height="8" fill="#0B0F14" opacity="0.85"/>
      {/* Polo body */}
      <path
        d="M140 168 L170 158 L185 172 L200 178 L215 172 L230 158 L260 168 L270 200 L245 210 L245 330 L155 330 L155 210 L130 200 Z"
        fill={primary}
      />
      <path
        d="M140 168 L170 158 L185 172 L200 178 L215 172 L230 158 L260 168 L270 200 L245 210 L245 330 L155 330 L155 210 L130 200 Z"
        fill="url(#mgWeave)"
      />
      {/* Polo collar */}
      <path d="M185 172 L200 195 L215 172 L207 158 L200 168 L193 158 Z" fill={secondary}/>
      <line x1="200" y1="168" x2="200" y2="200" stroke={primary} strokeWidth="2"/>
      {/* Buttons */}
      <circle cx="200" cy="200" r="1.6" fill={secondary}/>
      <circle cx="200" cy="212" r="1.6" fill={secondary}/>
      {/* Chest logo */}
      <circle cx="228" cy="215" r="6" fill={accent}/>
      {/* Arms */}
      <path d="M140 168 L120 250 L136 258 L155 200 Z" fill={primary}/>
      <path d="M260 168 L280 250 L264 258 L245 200 Z" fill={primary}/>
      {/* Hands */}
      <circle cx="123" cy="256" r="8" fill={skin}/>
      <circle cx="277" cy="256" r="8" fill={skin}/>
      {/* Shoes */}
      <rect x="170" y="458" width="30" height="8" rx="3" fill="#0B0F14"/>
      <rect x="200" y="458" width="30" height="8" rx="3" fill="#0B0F14"/>
    </g>
  )
}

/* -------------------- 02 · Hospitality uniform (apron + polo) -------------------- */
function HospitalityUniform({ skin, hair, bottom, accent, primary, secondary }: ModelProps) {
  return (
    <g filter="url(#mSoft)">
      {/* Head */}
      <circle cx="200" cy="120" r="34" fill={skin} />
      {/* Hair (tied back) */}
      <path d="M168 116 Q172 84 200 84 Q228 84 232 116 L226 108 Q212 100 200 100 Q188 100 174 108 Z" fill={hair} />
      <path d="M232 120 Q248 130 246 148 Q240 152 232 140 Z" fill={hair}/>
      {/* Neck */}
      <rect x="190" y="150" width="20" height="18" fill={skin} />
      {/* Trousers */}
      <rect x="176" y="330" width="20" height="130" fill={bottom} rx="3"/>
      <rect x="204" y="330" width="20" height="130" fill={bottom} rx="3"/>
      {/* Base tee */}
      <path
        d="M140 170 L170 158 L200 178 L230 158 L260 170 L268 200 L246 208 L246 330 L154 330 L154 208 L132 200 Z"
        fill={primary}
      />
      <path
        d="M140 170 L170 158 L200 178 L230 158 L260 170 L268 200 L246 208 L246 330 L154 330 L154 208 L132 200 Z"
        fill="url(#mgWeave)"
      />
      {/* Round neck */}
      <path d="M182 178 Q200 188 218 178 Q210 162 200 162 Q190 162 182 178 Z" fill={skin}/>
      {/* Apron */}
      <path d="M160 220 L240 220 L246 320 L154 320 Z" fill={secondary}/>
      <path d="M160 220 L240 220 L246 320 L154 320 Z" fill="url(#mgWeave)" opacity="0.6"/>
      {/* Apron neck strap */}
      <path d="M170 220 Q200 190 230 220" stroke={secondary} strokeWidth="3" fill="none"/>
      {/* Apron pocket */}
      <rect x="175" y="255" width="50" height="18" rx="2" fill="none" stroke={primary} strokeWidth="1.5" opacity="0.6"/>
      {/* Name tag */}
      <rect x="215" y="205" width="18" height="10" rx="2" fill={accent}/>
      {/* Arms */}
      <path d="M140 170 L120 258 L136 266 L155 200 Z" fill={primary}/>
      <path d="M260 170 L280 258 L264 266 L245 200 Z" fill={primary}/>
      {/* Hands */}
      <circle cx="123" cy="264" r="8" fill={skin}/>
      <circle cx="277" cy="264" r="8" fill={skin}/>
      {/* Shoes */}
      <rect x="170" y="458" width="30" height="8" rx="3" fill="#0B0F14"/>
      <rect x="200" y="458" width="30" height="8" rx="3" fill="#0B0F14"/>
    </g>
  )
}

/* -------------------- 03 · Marathon runner -------------------- */
function MarathonRunner({ skin, hair, bottom, accent, primary, secondary }: ModelProps) {
  return (
    <g filter="url(#mSoft)">
      {/* Head — tilted forward */}
      <circle cx="215" cy="118" r="30" fill={skin}/>
      {/* Hair */}
      <path d="M186 116 Q192 86 216 86 Q240 86 244 114 L238 106 Q226 96 216 96 Q206 96 194 106 Z" fill={hair}/>
      {/* Headband */}
      <rect x="184" y="105" width="60" height="6" rx="3" fill={accent}/>
      {/* Torso — leaning */}
      <g transform="rotate(-6 200 250)">
        {/* Neck */}
        <rect x="205" y="146" width="18" height="18" fill={skin}/>
        {/* Jersey */}
        <path
          d="M158 168 L184 160 L210 178 L236 160 L262 168 L268 200 L248 208 L248 300 L162 300 L162 208 L142 200 Z"
          fill={primary}
        />
        <path
          d="M158 168 L184 160 L210 178 L236 160 L262 168 L268 200 L248 208 L248 300 L162 300 L162 208 L142 200 Z"
          fill="url(#mgWeave)"
        />
        {/* V-neck */}
        <path d="M195 178 L210 210 L225 178 Z" fill={skin}/>
        {/* Race number bib */}
        <rect x="185" y="220" width="50" height="42" rx="3" fill={secondary}/>
        <text x="210" y="250" textAnchor="middle" fontFamily="Inter, Helvetica" fontWeight="800" fontSize="22" fill={primary}>26</text>
        {/* Sponsor stripe */}
        <rect x="162" y="200" width="86" height="6" fill={accent}/>
        {/* Arms — one forward, one back */}
        <path d="M158 168 L118 210 L128 224 L172 200 Z" fill={primary}/>
        <path d="M262 168 L296 232 L282 246 L248 202 Z" fill={primary}/>
        <circle cx="120" cy="220" r="8" fill={skin}/>
        <circle cx="292" cy="240" r="8" fill={skin}/>
      </g>
      {/* Shorts */}
      <path d="M162 300 L248 300 L246 350 L164 350 Z" fill={bottom}/>
      {/* Legs — mid-stride */}
      <path d="M172 348 L184 348 L188 440 L166 452 L156 448 L168 400 Z" fill={skin}/>
      <path d="M216 348 L236 348 L246 440 L226 456 L212 448 L216 400 Z" fill={skin}/>
      {/* Running shoes */}
      <ellipse cx="164" cy="454" rx="20" ry="7" fill="#0B0F14"/>
      <rect x="146" y="448" width="4" height="8" fill={accent}/>
      <ellipse cx="228" cy="458" rx="20" ry="7" fill="#0B0F14"/>
      <rect x="210" y="452" width="4" height="8" fill={accent}/>
    </g>
  )
}

/* -------------------- 04 · Streetwear round-neck (private label) -------------------- */
function StreetwearTee({ skin, hair, bottom, accent, primary, secondary }: ModelProps) {
  return (
    <g filter="url(#mSoft)">
      {/* Head */}
      <circle cx="200" cy="120" r="34" fill={skin}/>
      {/* Beanie/hair */}
      <path d="M164 118 Q166 82 200 82 Q234 82 236 118 L232 106 Q220 100 200 100 Q180 100 168 106 Z" fill={hair}/>
      {/* Neck */}
      <rect x="190" y="150" width="20" height="18" fill={skin}/>
      {/* Oversized tee */}
      <path
        d="M132 172 L170 158 L200 176 L230 158 L268 172 L280 208 L252 216 L252 340 L148 340 L148 216 L120 208 Z"
        fill={primary}
      />
      <path
        d="M132 172 L170 158 L200 176 L230 158 L268 172 L280 208 L252 216 L252 340 L148 340 L148 216 L120 208 Z"
        fill="url(#mgWeave)"
      />
      {/* Round neck rib */}
      <path d="M182 178 Q200 190 218 178 Q210 162 200 162 Q190 162 182 178 Z" fill={skin}/>
      <path d="M180 172 Q200 182 220 172" stroke={secondary} strokeWidth="2" fill="none"/>
      {/* Chest graphic */}
      <rect x="180" y="230" width="40" height="40" rx="4" fill={secondary}/>
      <circle cx="200" cy="250" r="10" fill={accent}/>
      {/* Care label peek */}
      <rect x="145" y="180" width="8" height="14" fill={secondary}/>
      {/* Arms — relaxed */}
      <path d="M132 172 L110 270 L128 278 L148 208 Z" fill={primary}/>
      <path d="M268 172 L290 270 L272 278 L252 208 Z" fill={primary}/>
      {/* Hands in pockets */}
      <circle cx="113" cy="274" r="8" fill={skin}/>
      <circle cx="287" cy="274" r="8" fill={skin}/>
      {/* Baggy trousers */}
      <path d="M148 340 L200 340 L204 460 L172 460 Z" fill={bottom}/>
      <path d="M200 340 L252 340 L228 460 L196 460 Z" fill={bottom}/>
      {/* Sneakers */}
      <ellipse cx="184" cy="464" rx="22" ry="7" fill="#F4F5F6" stroke="#0B0F14" strokeWidth="1"/>
      <ellipse cx="216" cy="464" rx="22" ry="7" fill="#F4F5F6" stroke="#0B0F14" strokeWidth="1"/>
    </g>
  )
}
