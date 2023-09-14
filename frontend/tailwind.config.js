const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false,
  },
  plugins: [require('@tailwindcss/forms')],
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
