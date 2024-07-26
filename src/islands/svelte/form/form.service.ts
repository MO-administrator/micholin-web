import { getEntry } from "astro:content";

export const contactForm = (await getEntry("forms", "contact")).data;
export const generalForm = (await getEntry("forms", "basic-info")).data;
