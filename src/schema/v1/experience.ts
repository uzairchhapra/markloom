import { z } from "zod";

export const experienceSchemaV1 = z.object({
  schemaVersion: z.literal(1).default(1),
  organization: z.string().min(1),
  role: z.string().min(1),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  location: z.string().optional(),
  highlights: z.array(z.string().min(1)).default([]),
});

export type ExperienceFrontmatterV1 = z.infer<typeof experienceSchemaV1>;
