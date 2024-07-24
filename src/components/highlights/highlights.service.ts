import { type CollectionEntry, getCollection } from "astro:content";
import { sortByPubDate } from "../../utils";

const getProjects = async () =>
  (await getCollection("projects", entry => !entry.data.isDraft)).sort(
    sortByPubDate
  );
const projects: CollectionEntry<"projects">[] = await getProjects();

export const projectsMap = new Map([
  ["home", { data: projects.slice(0, 4) }],
  ["projects", { data: projects }],
]);
