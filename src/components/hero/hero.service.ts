import { getEntry } from "astro:content";

const homePageMeta = await getEntry("pagemetas", "home");
const projectPageMeta = await getEntry("pagemetas", "projects");
const aboutPageMeta = await getEntry("pagemetas", "about");
const notFoundPageMea = await getEntry("pagemetas", "404");

export const heroMap = new Map([
  ["404", { ...notFoundPageMea.data }],
  ["home", { ...homePageMeta.data }],
  ["projects", { ...projectPageMeta.data }],
  ["about", { ...aboutPageMeta.data }],
]);
