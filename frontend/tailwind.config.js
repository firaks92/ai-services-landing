/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Organic Nature + Flight Deck Claymorphism Palette
        clay: {
          bg: '#F5F7F4',
          'dark-bg': '#0D1614',
          card: '#FFFFFF',
          'dark-card': '#14221E',
          'card-muted': '#EBF2EC',
          'dark-muted': '#1B2C27',
          track: '#DFEAE3',
          'dark-track': '#101B18',
          pine: '#193B32',
          'pine-light': '#245245',
          'dark-pine': '#E2F0EA',
          sage: '#84B197',
          'sage-soft': '#C2DCCF',
          mint: '#D8EFE4',
          emerald: '#227B57',
          coral: '#E7725D',
          'coral-hover': '#D15F4B',
          peach: '#F8DDD6',
          sand: '#F2EDE3',
          border: 'rgba(25, 59, 50, 0.08)',
          'dark-border': 'rgba(132, 177, 151, 0.16)',
        },
        canvas: '#F4F2EC',
        surface: {
          DEFAULT: '#FAF9F5',
          hover: '#EFECE3',
        },
        dark: {
          panel: '#141413',
          border: '#2E2D2A',
        },
        ink: {
          primary: '#141413',
          secondary: '#57544C',
          muted: '#848075',
          'on-dark': '#F4F2EC',
          'on-dark-muted': '#A39F94',
        },
        border: {
          subtle: '#D8D4C8',
          strong: '#141413',
        },
        signal: {
          DEFAULT: '#E04420',
          hover: '#C23514',
        },
        blueprint: {
          DEFAULT: '#1A4B8C',
          hover: '#13396B',
          soft: '#E6EDF6',
        },
        status: {
          success: '#1F6E43',
          error: '#B82925',
          warning: '#B57C18',
        },
      },
      fontFamily: {
        sans: ['"Golos Text"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"IBM Plex Serif"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        sharp: '2px',
        card: '4px',
        'squircle-sm': '14px',
        'squircle': '22px',
        'squircle-lg': '30px',
        'squircle-xl': '40px',
      },
      boxShadow: {
        drawer: '-12px 0 32px rgba(20, 20, 19, 0.14)',
        'clay-card': '0 18px 40px -12px rgba(25, 59, 50, 0.08), 0 4px 16px -2px rgba(25, 59, 50, 0.04), inset 0 1px 1.5px rgba(255, 255, 255, 0.95)',
        'clay-card-hover': '0 26px 52px -12px rgba(255, 255, 255, 0.04), 0 24px 50px -14px rgba(25, 59, 50, 0.13), inset 0 1px 1.5px rgba(255, 255, 255, 1)',
        'clay-dark': '0 20px 45px -12px rgba(0, 0, 0, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.07)',
        'clay-inset': 'inset 0 2px 5px rgba(25, 59, 50, 0.12), inset 0 -1px 2px rgba(255, 255, 255, 0.85)',
        'clay-inset-dark': 'inset 0 2.5px 6px rgba(0, 0, 0, 0.5), inset 0 -1px 1px rgba(255, 255, 255, 0.06)',
        'clay-knob': '0 4px 12px rgba(25, 59, 50, 0.18), 0 1px 3px rgba(25, 59, 50, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
        'clay-btn': '0 10px 24px -4px rgba(231, 114, 93, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
        'glow-sage': '0 0 24px -4px rgba(132, 177, 151, 0.45)',
      },
    },
  },
  plugins: [],
};
