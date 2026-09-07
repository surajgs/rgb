/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Arvind-adapted palette — white base, section color coding
        ink: '#0B0F14',
        charcoal: '#1F2933',
        graphite: '#4A5563',
        stone: '#8A94A0',
        mist: '#E5E8EC',
        cream: '#F4F5F6',
        paper: '#FFFFFF',

        // Arvind narrative section colors
        arvOrange: '#F37C24',
        arvOrangeSoft: '#FDE1CB',
        arvRed: '#D12337',
        arvRedSoft: '#F7CCD1',
        arvGreen: '#165A39',
        arvGreenSoft: '#CDE4D8',
        arvTeal: '#62C7CE',
        arvTealSoft: '#D6F0F2',

        // Kept as aliases so existing sections don't break
        gold: '#F37C24',       // aliased to Arvind orange
        goldDark: '#C55E12',
        goldSoft: '#FDE1CB',
        rust: '#D12337',
        rustDark: '#A31B2A',
        rustSoft: '#F7CCD1',
        forest: '#165A39',
        forestSoft: '#3B7A5A'
      },
      fontFamily: {
        // Arvind uses a modern geometric sans throughout
        sans: ['Inter', 'Helvetica Neue', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'Helvetica Neue', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      letterSpacing: {
        micro: '0.14em',
        tightest: '-0.03em'
      },
      maxWidth: {
        page: '1280px'
      },
      borderRadius: {
        pill: '999px',
        card: '10px'
      },
      boxShadow: {
        soft: '0 20px 40px -25px rgba(11,15,20,0.20)',
        card: '0 8px 24px -12px rgba(11,15,20,0.10)'
      }
    }
  },
  plugins: []
}
