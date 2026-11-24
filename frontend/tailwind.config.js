/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // High-End Minimalist Cyber-Futuristic & Luxury Dark FinTech Palette (Pinterest #1114007657841652106)
        dash: {
          bg: '#080A0B',
          card: '#101416',
          'card-hover': '#151C1F',
          'card-soft': '#192226',
          surface: '#1D272C',
          track: '#0C1012',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-glow': 'rgba(16, 185, 129, 0.35)',
          'border-emerald': 'rgba(16, 185, 129, 0.28)',
          text: '#F8FAFC',
          muted: '#94A3B8',
          subtle: '#64748B',
          // Vibrant Luxury Mint & Emerald Accents
          mint: '#00F5A0',
          emerald: '#10B981',
          jade: '#05FF91',
          cyan: '#06D6A0',
          'cyan-deep': '#0EA5E9',
          amber: '#F59E0B',
          magenta: '#10B981', // Fallback mapped to emerald for legacy references
          purple: '#059669',  // Fallback mapped to deep emerald
          violet: '#00F5A0',  // Fallback mapped to mint
          lime: '#10B981',    // Fallback mapped to emerald
          coral: '#F59E0B',
          dark: '#021B12',
        },
        canvas: '#080A0B',
        surface: {
          DEFAULT: '#101416',
          hover: '#151C1F',
        },
        ink: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
          muted: '#64748B',
          'on-dark': '#F8FAFC',
          'on-dark-muted': '#94A3B8',
        },
        signal: {
          DEFAULT: '#10B981',
          hover: '#05FF91',
        },
        status: {
          success: '#10B981',
          error: '#EF4444',
          warning: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['"Golos Text"', '"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"IBM Plex Serif"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', '"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        sharp: '4px',
        card: '16px',
        'squircle-sm': '14px',
        'squircle': '20px',
        'squircle-lg': '28px',
        'squircle-xl': '36px',
      },
      boxShadow: {
        'emerald': '0 0 25px -4px rgba(16, 185, 129, 0.55)',
        'mint': '0 0 30px -4px rgba(0, 245, 160, 0.6)',
        'obsidian': '0 20px 45px -12px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        'neon-card': '0 20px 45px -12px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        'neon-card-hover': '0 25px 55px -10px rgba(16, 185, 129, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        'neon-cyan': '0 0 25px -4px rgba(0, 245, 160, 0.55)',
        'neon-magenta': '0 0 25px -4px rgba(16, 185, 129, 0.55)',
        'neon-purple': '0 0 30px -4px rgba(16, 185, 129, 0.55)',
      },
    },
  },
  plugins: [],
};
