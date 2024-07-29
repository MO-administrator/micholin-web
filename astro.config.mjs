import { defineConfig, passthroughImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";
import netlify from "@astrojs/netlify";
import icon from "astro-icon";
import svelte from "@astrojs/svelte";
import clerk from '@clerk/astro';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    svelte(),
    sitemap(),
    compress(),
    icon(),
    clerk(),
  ],
  image: {
    service: passthroughImageService(),
  },
  output: "server",
  adapter: netlify({
    edgeMiddleware: true,
  }),
  site: "https://micholin.com/",
});
