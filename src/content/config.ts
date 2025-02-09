import { z, defineCollection } from "astro:content";

const pagemetas = defineCollection({
  type: "data",
  schema: z.object({
    href: z.string().startsWith("/"),
    title: z.string(),
    description: z.array(z.string()).nullable().default(null),
    private: z.boolean().optional().default(false),
    text: z.string().optional().nullable().default(null),
    image: z.string().optional().nullable().default(null),
  }),
});

const forms = defineCollection({
  type: "data",
  schema: z.object({
    props: z.object({
      name: z.string(),
      title: z.string(),
      showLogo: z.boolean(),
      netlify: z.boolean(),
      action: z.string(),
      method: z.string(),
      disabled: z.boolean().optional().default(false),
    }),
    fields: z.array(
      z.object({
        type: z.string(),
        name: z.string(),
        label: z.string(),
        required: z.boolean().optional().default(false),
        disabled: z.boolean().optional().default(false),
        autocomplete: z.string().optional(),
        placeholder: z.string().optional(),
      })
    ),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      isDraft: z.boolean().default(true),
      pubDate: z.date().default(new Date()),
      title: z.string(),
      tags: z.array(z.string()),
      image: image(),
    }),
});

const testimonials = defineCollection({
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
});

export const collections = {
  pagemetas,
  forms,
  projects,
  testimonials,
};
