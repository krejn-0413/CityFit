/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#F0B90B',
          bright: '#FFD700',
          pale: '#FFF2CC',
          muted: '#A68A1C',
        },
        canvas: {
          base: '#0a0a0c',
          raised: '#111114',
          card: '#16161a',
          overlay: '#1c1c21',
        },
        text: {
          primary: '#FFFFFF',
          body: '#C8C0B8',
          muted: '#7A756E',
          faint: '#4A4540',
        },
        border: {
          subtle: '#1f1f24',
          card: '#2a2a30',
          focus: '#F0B90B',
        },
      },
      fontFamily: {
        display: ['"ZCOOL XiaoWei"', '"Noto Serif SC"', '"SimSun"', 'serif'],
        body: ['"Noto Serif SC"', '"SimSun"', 'Georgia', 'serif'],
      },
      fontSize: {
        'hero': ['clamp(2rem, 5vw, 3rem)', { lineHeight: '1.15', fontWeight: '700', letterSpacing: '0.04em' }],
        'section': ['clamp(1.25rem, 3vw, 1.75rem)', { lineHeight: '1.25', fontWeight: '700', letterSpacing: '0.06em' }],
        'question': ['clamp(1.125rem, 2.5vw, 1.375rem)', { lineHeight: '1.6', fontWeight: '700', letterSpacing: '0.02em' }],
        'body': ['1.0625rem', { lineHeight: '1.7', fontWeight: '300' }],
        'caption': ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.08em' }],
        'fine': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.1em' }],
      },
      spacing: {
        'section': 'clamp(3rem, 8vw, 5rem)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'pill': '9999px',
      },
      animation: {
        'reveal': 'reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'reveal-up': 'revealUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'gold-pulse': 'goldPulse 3s ease-in-out infinite',
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(2px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        revealUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        goldPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      maxWidth: {
        'content': '720px',
        'narrow': '480px',
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}