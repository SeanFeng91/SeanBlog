import { defineConfig } from 'astro/config';

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: 'https://SeanFeng91.github.io',
  base: '/SeanBlog/',
  integrations: [preact()]
});