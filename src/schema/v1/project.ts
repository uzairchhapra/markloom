import { z } from "zod";

export const projectSchemaV1 = z.object({
  schemaVersion: z.literal(1).default(1),
  title: z.string().min(1),
  description: z.string().min(1),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  featured: z.boolean().default(false),
  tags: z.array(z.string().min(1)).default([]),
  url: z.string().url().optional(),
  repositoryUrl: z.string().url().optional(),
  image: z
    .object({
      src: z.string().min(1),
      alt: z.string().min(1),
    })
    .optional(),
});

export type ProjectFrontmatterV1 = z.infer<typeof projectSchemaV1>;
