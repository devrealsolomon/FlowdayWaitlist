module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
          'relectr-normal-text': '#192434',
          'relectr-grey': '#E8EBEF',
          'relectr-primary-blue': '#6913AA',
          'relectr-secondary-blue': '#6912AA',
          'relectr-red': '#EE1C25',
          'relectr-secondary-red': '#FFECEB'
        }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }