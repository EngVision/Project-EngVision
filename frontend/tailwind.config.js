// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      boxShadow: {
        headerShadow: '2px 0px 6px rgba(0, 0, 0, 0.1)',
      },
      colors: {
        bgDefault: 'var(--bg-default)',
        surface: 'var(--bg-surface)',
        bgNeutral: 'var(--bg-Neutral)',
        bgNeutralHover: 'var(--bg-NeutralHover)',
        primary: 'var(--primary)',
        primaryHover: 'var(--primaryHover)',
        primary2: 'var(--primary2)',
        secondary: 'var(--secondary)',
        secondaryHover: 'var(--secondaryHover)',
        alternative: 'var(--alternative)',
        alternativeHover: 'var(--alternativeHover)',
        textColor: 'var(--text-color)',
        textSubtle: '#9D9DAD',
        textSubtlest: '#AEAEB1',
        dark: '#242633',
        white: '#FFFFFF',
        wolfGrey: '#706E68',
        grey: {
          100: '#F5F6F8',
          200: '#E6E9EF',
          300: '#C5C7D0',
        },
        positive: {
          100: '#BBDBC9',
          200: '#258750',
          300: '#007038',
        },
        negative: {
          100: '#F4C3CB',
          200: '#D83A52',
          300: '#B63546',
        },
        correct: '#41ab3f',
        false: '#fd6267',
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        headerHeight: 60,
        sidebarWidth: 320,
      },
      screens: {
        '3xl': '1800px',
      },
      gridTemplateColumns: {
        'fill-40': 'repeat(auto-fill, minmax(16rem, 1fr))',
      },
    },
  },
}
