export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050505',
          900: '#0B0B0B',
          800: '#121212',
          700: '#1A1A1A',
          600: '#232323',
        },
        steel: {
          500: '#8C8C8C',
          400: '#A5A5A5',
          300: '#D7D7D7',
          50: '#F5F5F5',
        },
        signal: {
          DEFAULT: '#FFF58A',
          bright: '#FFF9B8',
          dark: '#D9CC4D',
        },
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
    },
  },
  plugins: [],
};
