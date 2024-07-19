import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";
import netlify from "@astrojs/netlify";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), sitemap(), compress(), icon({iconDir: 'src/content/icons'})],
  output: "server",
  adapter: netlify(),
  site: "https://micholin.netlify.app/"
});
