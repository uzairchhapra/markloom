export { authorSchemaV1 as authorSchema } from "./v1/author";
export { blogSchemaV1 as blogSchema } from "./v1/blog";
export { experienceSchemaV1 as experienceSchema } from "./v1/experience";
export { pageSchemaV1 as pageSchema } from "./v1/page";
export { projectSchemaV1 as projectSchema } from "./v1/project";
export {
  markloomConfigSchemaV1,
  navigationConfigSchemaV1,
  siteConfigSchemaV1,
  socialConfigSchemaV1,
  themeConfigSchemaV1,
  themeNameSchema,
} from "./v1/site";

export type { AuthorFrontmatterV1 as AuthorFrontmatter } from "./v1/author";
export type { BlogFrontmatterV1 as BlogFrontmatter } from "./v1/blog";
export type { ExperienceFrontmatterV1 as ExperienceFrontmatter } from "./v1/experience";
export type { PageFrontmatterV1 as PageFrontmatter } from "./v1/page";
export type { ProjectFrontmatterV1 as ProjectFrontmatter } from "./v1/project";
export type {
  MarkloomConfigV1 as MarkloomConfig,
  NavigationConfigV1 as NavigationConfig,
  SiteConfigV1 as SiteConfig,
  SocialConfigV1 as SocialConfig,
  ThemeConfigV1 as ThemeConfig,
  ThemeName,
} from "./v1/site";
