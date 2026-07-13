import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import {
  authorSchema,
  blogSchema,
  experienceSchema,
  pageSchema,
  projectSchema,
} from "./schema/current";

const contentRoot = process.env.MARKLOOM_CONTENT_DIR ?? "./content";

const blog = defineCollection({
  loader: glob({ base: `${contentRoot}/blog`, pattern: "**/*.{md,mdx}" }),
  schema: blogSchema,
});

const projects = defineCollection({
  loader: glob({ base: `${contentRoot}/projects`, pattern: "**/*.{md,mdx}" }),
  schema: projectSchema,
});

const pages = defineCollection({
  loader: glob({ base: `${contentRoot}/pages`, pattern: "**/*.{md,mdx}" }),
  schema: pageSchema,
});

const authors = defineCollection({
  loader: glob({ base: `${contentRoot}/authors`, pattern: "**/*.{md,mdx}" }),
  schema: authorSchema,
});

const experience = defineCollection({
  loader: glob({ base: `${contentRoot}/experience`, pattern: "**/*.{md,mdx}" }),
  schema: experienceSchema,
});

const home = defineCollection({
  loader: glob({ base: `${contentRoot}/home`, pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    eyebrow: z.string().min(1).optional(),
    currentLabel: z.string().min(1).optional(),
    cta: z
      .object({
        label: z.string().min(1),
        href: z.string().min(1),
      })
      .optional(),
  }),
});

export const collections = {
  authors,
  blog,
  experience,
  home,
  pages,
  projects,
};
