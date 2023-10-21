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
        bgNeutral: 'var(--bg-Neutral)',
        bgNeutralHover: 'var(--bg-NeutralHover)',
        primary: '#2769E7',
        primaryHover: '#1C4494',
        primary2: '#407AE4',
        secondary: '#FD6267',
        secondaryHover: '#EC6064',
        alternative: '#41AB3F',
        alternativeHover: '#409C46',
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
        'fill-40': 'repeat(auto-fill, minmax(240px, 1fr))',
      },
    },
  },
}
