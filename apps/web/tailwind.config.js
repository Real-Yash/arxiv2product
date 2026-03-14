/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-body)', 'sans-serif'],
        headline: ['var(--font-headline)', 'sans-serif'],
      },
      colors: {
        ink: {
          dark: '#111111',
          DEFAULT: '#27272a',
          light: '#52525b',
          faint: '#a1a1aa'
        },
        surface: {
          DEFAULT: '#ffffff',
          alt: '#fdfdfc',
          sunken: '#f4f4f5'
        },
        brand: {
          DEFAULT: '#000000',
          accent: '#0f172a'
        }
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.04), 0 0 3px rgba(0,0,0,0.02)',
        'float': '0 12px 32px -4px rgba(0, 0, 0, 0.08), 0 0 4px rgba(0,0,0,0.03)',
      }
    },
  },
  plugins: [],
}
