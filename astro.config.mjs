import { defineConfig } from 'astro/config';
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import dotenv from 'dotenv';
import react from "@astrojs/react";
// Load environment variables from .env file
dotenv.config();
// https://astro.build/config
export default defineConfig({
  site: 'https://SeanFeng91.github.io',
  base: '/SeanBlog/',
  // trailingSlash: "always",
  integrations: [preact(), tailwind(), mdx(), icon(), react()]
});

