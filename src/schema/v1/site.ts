import { z } from "zod";

export const themeNameSchema = z.enum(["minimal", "editorial", "terminal"]);

export const siteConfigSchemaV1 = z.object({
  schemaVersion: z.literal(1).default(1),
  title: z.string().min(1),
  description: z.string().min(1),
  url: z.string().url(),
  language: z.string().default("en"),
  theme: themeNameSchema.default("minimal"),
  author: z.string().optional(),
});

export const navigationConfigSchemaV1 = z.object({
  items: z
    .array(
      z.object({
        label: z.string().min(1),
        href: z.string().min(1),
      }),
    )
    .default([]),
});

export const socialConfigSchemaV1 = z.object({
  links: z
    .array(
      z.object({
        label: z.string().min(1),
        href: z.string().url(),
      }),
    )
    .default([]),
});

export const themeConfigSchemaV1 = z.object({
  appearance: z.enum(["light", "dark", "system"]).default("system"),
  accent: z.string().default("#2563eb"),
});

export type SiteConfigV1 = z.infer<typeof siteConfigSchemaV1>;
export type NavigationConfigV1 = z.infer<typeof navigationConfigSchemaV1>;
export type SocialConfigV1 = z.infer<typeof socialConfigSchemaV1>;
export type ThemeConfigV1 = z.infer<typeof themeConfigSchemaV1>;
export type ThemeName = z.infer<typeof themeNameSchema>;
