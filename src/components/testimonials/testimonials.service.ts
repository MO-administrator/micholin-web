import { getCollection } from "astro:content";
import { sortByPubDate } from "../../utils";

export const testimonials = (await getCollection("testimonials")).sort(
  sortByPubDate
);
