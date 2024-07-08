/** @type {import('tailwindcss').Config} */
// tailwind.config.js
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

// export default {
//   // content: [],
//   content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
module.exports = {
  // content: ["./src/**/*.{html,js}"],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}','node_modules/preline/dist/*.js'],

  theme: {
    extend: {
      // Set font family
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      // Set theme colors (Required config!)
      colors: {
        primary: colors.blue,
        secondary: colors.slate,
      },
    },
  },
  // Add plugins
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms"),require('preline/plugin')],
};
      
