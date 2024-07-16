import { defineConfig, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), sitemap(), compress()],
  output: "server",
  image: {
    service: sharpImageService()
  },
  adapter: netlify(),
  server: {
    port: 4000
  },
  site: "https://micholin.com/"
});