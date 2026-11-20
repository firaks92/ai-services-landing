/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
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
      },
      boxShadow: {
        drawer: '-12px 0 32px rgba(20, 20, 19, 0.14)',
      },
    },
  },
  plugins: [],
};
