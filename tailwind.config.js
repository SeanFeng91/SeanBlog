/** @type {import('tailwindcss').Config} */
// tailwind.config.js
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/preline/preline.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"),require('@tailwindcss/forms'), require('preline/plugin')],
};
// module.exports = {
//   // content: ["./src/**/*.{html,js}"],
//   content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}','node_modules/preline/dist/*.js'],

//   theme: {
//     extend: {
//       // Set font family
//       fontFamily: {
//         sans: ["Inter", ...defaultTheme.fontFamily.sans],
//       },
//       // Set theme colors (Required config!)
//       colors: {
//         primary: colors.blue,
//         secondary: colors.slate,
//       },
//     },
//   },
//   // Add plugins
//   plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms"),require('preline/plugin')],
// };
      
