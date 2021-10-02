module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins : ['Poppins', 'sans-serif']
      },
      fontSize: {
        'xss' : ".6rem",
      },
      spacing: {
        '45': '11.25rem',
        '54': '13.5rem',
      }
    },
  },
  variants: {
    extend: {
      lineClamp : ['hover'],
      aspectRatio: ['responsive', 'hover']
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
}
