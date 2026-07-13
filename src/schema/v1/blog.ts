import { z } from "zod";

export const blogSchemaV1 = z.object({
  schemaVersion: z.literal(1).default(1),
  title: z.string().min(1),
  description: z.string().min(1),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  tags: z.array(z.string().min(1)).default([]),
  categories: z.array(z.string().min(1)).default([]),
  authors: z.array(z.string().min(1)).default([]),
  cover: z
    .object({
      src: z.string().min(1),
      alt: z.string().min(1),
    })
    .optional(),
  canonicalUrl: z.string().url().optional(),
  noindex: z.boolean().default(false),
});

export type BlogFrontmatterV1 = z.infer<typeof blogSchemaV1>;
