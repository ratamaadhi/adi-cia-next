module.exports = {
  mode: 'jit',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins : ['Poppins', 'sans-serif'],
        satisfy : ['Satisfy', 'cursive'],
        playFair : ['Playfair Display', 'serif'],
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
    require('@tailwindcss/typography'),
  ],
}
