import { z, defineCollection } from "astro:content";

export const collections = {
  pagemetas: defineCollection({
    type: "data",
    schema: ({ image }) =>
      z.object({
        href: z.string().startsWith("/"),
        title: z.string(),
        description: z.array(z.string()).nullable().default(null),
        text: z.string().optional().nullable().default(null),
        image: image().optional().nullable().default(null),
      }),
  }),
  projects: defineCollection({
    type: "content",
    schema: ({ image }) =>
      z.object({
        isDraft: z.boolean().default(true),
        pubDate: z.date().default(new Date()),
        title: z.string(),
        tags: z.array(z.string()),
        image: image(),
      }),
  }),
  testimonials: defineCollection({
    type: "content",
    schema: ({ image }) =>
      z.object({
        href: z.string().url(),
        author: z.string(),
        designation: z.string(),
        pubDate: z.date().default(new Date()),
        relation: z.string(),
        avatar: image(),
      }),
  }),
};
