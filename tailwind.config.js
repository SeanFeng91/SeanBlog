/** @type {import('tailwindcss').Config} */
// tailwind.config.js
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

// export default {
//   content: [
//     './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    
//   ],
//   darkMode: 'class',

//   theme: {
//     extend: {
//       fontFamily: {
//         sans: [
//           'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
//         ],
//       },
//     },
//   },
//   plugins: [],
// };

// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",'node_modules/preline/dist/*.js'],
  darkMode: 'class',
  // base: '/SeanBlog/',
  // trailingSlash: "always",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
        ],
    },
    colors: {
      customTextColor: '#333333', // 替换为您的颜色
      customLinkColor: '#1a73e8', // 替换为您的颜色
      customLinkHoverColor: '#0c59b6', // 替换为您的颜色
      customQuoteColor: '#6a737d', // 替换为您的颜色
    },
  },
  },
  plugins: [require("@tailwindcss/typography"),require('@tailwindcss/forms'),require("tw-elements/plugin.cjs"), require('preline/plugin')],
}