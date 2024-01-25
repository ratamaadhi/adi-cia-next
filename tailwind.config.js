module.exports = {
  mode: 'jit',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        satisfy: ['Satisfy', 'cursive'],
        playFair: ['Playfair Display', 'serif'],
        sacramento: ['Sacramento', 'cursive'],
      },
      fontSize: {
        xss: '.6rem',
      },
      spacing: {
        45: '11.25rem',
        54: '13.5rem',
      },
      colors: {
        'palette-black': '#000b05',
        'palette-navi': '#0d202e',
        'palette-slate': '#1c404e',
        'palette-moss': '#394a40',
        'palette-gray': '#4a4f52',
        'palette-zinc': '#496269',
        'palette-stone': '#6B7D7D',
      },
    },
  },
  variants: {
    extend: {
      lineClamp: ['hover'],
      aspectRatio: ['responsive', 'hover'],
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
