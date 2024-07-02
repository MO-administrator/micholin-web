import { z, defineCollection } from 'astro:content';

const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    isDraft: z.boolean().default(true),
    pubDate: z.date().default(new Date()),
    title: z.string(),
    tags: z.array(z.string()),
    summary: z.object({
      points: z.array(z.string()),
      details: z.string().optional(),
    })
  })
})

export const collections = {
  projects: projectCollection,
}
