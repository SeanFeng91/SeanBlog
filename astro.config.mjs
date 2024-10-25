import { defineConfig } from 'astro/config';
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import dotenv from 'dotenv';
import react from "@astrojs/react";
// 标题中文转英文
import slugify from 'slugify';
// import customSlug from './src/scripts/customslug';

// 添加md文章标题
// import remarkToc from 'remark-toc';
// 添加标题锚点
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
// Load environment variables from .env file
dotenv.config();
// https://astro.build/config

// 标题转拼音
// const customSlugify = text => {
//   return slugify(text, { lower: true, remove: /[*+~.()'"!:@]/g });
// };

export default defineConfig({
  site: 'https://SeanFeng91.github.io',
  base: '/SeanBlog/',
  // trailingSlash: "always",
  integrations: [tailwind(), mdx(), icon(), react()],
  vite: {
    ssr: {
      external: ['jquery','better-sqlite3','sortablejs','three'],
    },
  },
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
  },
});
