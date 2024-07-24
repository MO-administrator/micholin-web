import { type CollectionEntry, getEntry } from "astro:content";

export const pages = [
  (await getEntry("pagemetas", "home")).data,
  (await getEntry("pagemetas", "projects")).data,
  (await getEntry("pagemetas", "about")).data,
] as CollectionEntry<"pagemetas">["data"][];

export const isActive: (
  page: CollectionEntry<"pagemetas">["data"], currentPage: string
) => boolean = (page, currentPage) => {
  if (!currentPage && page.text === "Home") return true;
  else if (currentPage && page?.href.includes(currentPage)) return true;
  else return false;
};
