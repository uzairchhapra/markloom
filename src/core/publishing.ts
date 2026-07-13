import type { BlogPost } from "@schema/normalize";

export const now = () => new Date();

export function isPublishable(
  post: Pick<BlogPost, "draft" | "publishedAt">,
  date = now(),
): boolean {
  return !post.draft && post.publishedAt <= date;
}

export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
  );
}

export function paginate<T>(items: T[], pageSize: number): T[][] {
  if (pageSize < 1) {
    throw new Error("pageSize must be greater than zero.");
  }

  const pages: T[][] = [];
  for (let index = 0; index < items.length; index += pageSize) {
    pages.push(items.slice(index, index + pageSize));
  }
  return pages;
}

export function findRelatedPosts(
  post: BlogPost,
  posts: BlogPost[],
  limit = 3,
): BlogPost[] {
  const signals = new Set([...post.tags, ...post.categories]);
  return posts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      score: [...candidate.tags, ...candidate.categories].filter((item) =>
        signals.has(item),
      ).length,
    }))
    .filter(({ score }) => score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.candidate.publishedAt.getTime() - a.candidate.publishedAt.getTime(),
    )
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export function collectTags(posts: BlogPost[]): string[] {
  return [...new Set(posts.flatMap((post) => post.tags))].sort((a, b) =>
    a.localeCompare(b),
  );
}
