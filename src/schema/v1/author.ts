import { z } from "zod";

export const authorSchemaV1 = z.object({
  schemaVersion: z.literal(1).default(1),
  name: z.string().min(1),
  role: z.string().optional(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
  url: z.string().url().optional(),
});

export type AuthorFrontmatterV1 = z.infer<typeof authorSchemaV1>;
