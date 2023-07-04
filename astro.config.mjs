import { defineConfig } from 'astro/config';

import vue from "@astrojs/vue";

// https://astro.build/config
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [vue()],
  adapter: node({
    mode: "standalone"
  })
});