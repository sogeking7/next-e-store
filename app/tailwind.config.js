/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./sidebar-pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {},
    screens: {
      'basic' : '50px',
      'mini' : '375px',
      'phone' : '460px',
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }
      
      'sm': "640px",
      'md': "768px",
      'mmd': '890px',
      'lg': "1024px",
      'lgg': "1150px",
      'xl': "1280px",
      "2xl": "1536px",
      
      'laptop': "1024px",
      // => @media (min-width: 1024px) { ... }

      'desktop': "1280px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
};
