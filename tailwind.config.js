export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0F1319',
          900: '#161C24',
          850: '#1D2430',
          800: '#252F3E',
          700: '#323F53',
          600: '#42526C',
        },
        steel: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
        },
        signal: {
          DEFAULT: '#F5C400',
          bright: '#FFE043',
          glow: '#FFD700',
          amber: '#E5A100',
          dark: '#C69200',
          pale: '#FFF8B3',
        },
      },
      boxShadow: {
        'gold-sm': '0 0 15px -3px rgba(245, 196, 0, 0.25)',
        'gold': '0 0 25px -4px rgba(245, 196, 0, 0.35)',
        'gold-lg': '0 0 45px -6px rgba(245, 196, 0, 0.45)',
        'gold-inner': 'inset 0 0 20px rgba(245, 196, 0, 0.2)',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'Impact', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tech: '0.24em',
      },
      transitionTimingFunction: {
        precision: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      zIndex: {
        navigation: '50',
        'menu-backdrop': '60',
        'menu-panel': '70',
        'mobile-menu': '80',
        loader: '100',
        modal: '130',
        'skip-link': '130',
        cursor: '140',
      },
    },
  },
  plugins: [],
};
