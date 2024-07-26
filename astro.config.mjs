import { defineConfig, passthroughImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";
import netlify from "@astrojs/netlify";
import icon from "astro-icon";
import auth from "auth-astro";
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    svelte(),
    react(),
    sitemap(),
    compress(),
    auth(),
    icon({ iconDir: "src/content/icons" }),
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
