const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false,
  },
  plugins: [require('@tailwindcss/forms')],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
    color: {
      dark: '#101210',
      white: '#FFFFFF',
      grey: {
        100: '#F5F6F8',
        200: '#E6E9EF',
        300: '#C5C7D0',
      },
      primary: {
        100: '#CCE5FF',
        200: '#0073EA',
        300: '#0060B9',
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
  },
}
