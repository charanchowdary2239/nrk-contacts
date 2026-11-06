/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f9',
          100: '#d9e2f0',
          200: '#b3c6e2',
          300: '#8da9d4',
          400: '#5c84c1',
          500: '#3460aa',
          600: '#264b8c',
          700: '#1d386d',
          800: '#15294f',
          900: '#0f1d38',
          950: '#091122',
        },
        brand: {
          navy: '#0f172a',
          navyLight: '#1e293b',
          navyMuted: '#334155',
          orange: '#f97316',
          orangeHover: '#ea580c',
          orangeLight: '#ffedd5',
          charcoal: '#1e293b',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -2px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
        'elevated': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
