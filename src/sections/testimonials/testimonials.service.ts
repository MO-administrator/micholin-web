import { getCollection, type CollectionEntry } from "astro:content";
import { sortByPubDate } from "@utils";

export const testimonials: CollectionEntry<'testimonials'>[] = (await getCollection("testimonials")).sort(
  sortByPubDate
);
