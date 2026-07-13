import { z } from "zod";

export const pageSchemaV1 = z.object({
  schemaVersion: z.literal(1).default(1),
  title: z.string().min(1),
  description: z.string().min(1),
  draft: z.boolean().default(false),
  noindex: z.boolean().default(false),
  order: z.number().int().default(0),
});

export type PageFrontmatterV1 = z.infer<typeof pageSchemaV1>;
