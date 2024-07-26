import { getEntry, type CollectionEntry } from "astro:content";

const homePageMeta = await getEntry("pagemetas", "home");
const projectPageMeta = await getEntry("pagemetas", "projects");
const aboutPageMeta = await getEntry("pagemetas", "about");
const notFoundPageMea = await getEntry("pagemetas", "404");

type mapKeys = "404" | "home" | "projects" | "about";
type mapValues = CollectionEntry<'pagemetas'>['data'];

export const heroMap = new Map<mapKeys, mapValues>([
  ["404", notFoundPageMea.data],
  ["home", homePageMeta.data],
  ["projects", projectPageMeta.data],
  ["about", aboutPageMeta.data],
]);
