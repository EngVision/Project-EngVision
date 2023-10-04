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
        bgNeutral: '#091E420F',
        bgNeutralHover: '#091E4224',
        primary: '#0073EA',
        secondary: '#0073EA',
        textColor: '#313134',
        textSubtle: '#9D9DAD',
        textSubtlest: '#AEAEB1',
        dark: '#101210',
        white: '#FFFFFF',
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
        sidebarWidth: 300,
      },
    },
  },
}
