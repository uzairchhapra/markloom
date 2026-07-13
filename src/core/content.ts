import { getCollection } from "astro:content";
import { isPublishable, now, sortPostsByDate } from "@core/publishing";
import {
  normalizeBlogPost,
  normalizePage,
  normalizeProject,
} from "@schema/normalize";
import type { BlogPost, CustomPage, Project } from "@schema/normalize";

export {
  collectTags,
  findRelatedPosts,
  isPublishable,
  paginate,
  sortPostsByDate,
} from "@core/publishing";

export async function getPublishedPosts(date = now()): Promise<BlogPost[]> {
  const entries = await getCollection("blog");
  const posts: BlogPost[] = entries.map(normalizeBlogPost);
  return sortPostsByDate(posts.filter((post) => isPublishable(post, date)));
}

export async function getProjects(): Promise<Project[]> {
  const entries = await getCollection("projects");
  const projects: Project[] = entries.map(normalizeProject);
  return projects.sort(
    (a, b) =>
      Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title),
  );
}

export async function getCustomPages(): Promise<CustomPage[]> {
  const entries = await getCollection("pages");
  const pages: CustomPage[] = entries.map(normalizePage);
  return pages
    .filter((page) => !page.draft)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}
