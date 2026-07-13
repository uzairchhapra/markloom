import {
  collectTags,
  findRelatedPosts,
  isPublishable,
  paginate,
  sortPostsByDate,
} from "@core/publishing";
import type { BlogPost } from "@schema/normalize";

function post(overrides: Partial<BlogPost>): BlogPost {
  return {
    slug: "base",
    title: "Base",
    description: "Base post",
    publishedAt: new Date("2026-01-01"),
    tags: [],
    categories: [],
    authors: [],
    draft: false,
    featured: false,
    noindex: false,
    readingTime: "1 min read",
    body: {},
    ...overrides,
  };
}

describe("content utilities", () => {
  it("excludes drafts and scheduled posts", () => {
    const date = new Date("2026-07-13");

    expect(isPublishable(post({ draft: true }), date)).toBe(false);
    expect(
      isPublishable(post({ publishedAt: new Date("2099-01-01") }), date),
    ).toBe(false);
    expect(
      isPublishable(post({ publishedAt: new Date("2026-01-01") }), date),
    ).toBe(true);
  });

  it("sorts posts newest first", () => {
    const posts = [
      post({ slug: "old", publishedAt: new Date("2025-01-01") }),
      post({ slug: "new", publishedAt: new Date("2026-01-01") }),
    ];

    expect(sortPostsByDate(posts).map((item) => item.slug)).toEqual([
      "new",
      "old",
    ]);
  });

  it("paginates and rejects invalid page sizes", () => {
    expect(paginate([1, 2, 3], 2)).toEqual([[1, 2], [3]]);
    expect(() => paginate([1], 0)).toThrow("pageSize");
  });

  it("collects sorted unique tags", () => {
    expect(
      collectTags([post({ tags: ["z", "a"] }), post({ tags: ["a"] })]),
    ).toEqual(["a", "z"]);
  });

  it("finds related posts by shared tags and categories", () => {
    const source = post({
      slug: "source",
      tags: ["astro"],
      categories: ["web"],
    });
    const related = post({ slug: "related", tags: ["astro"] });
    const unrelated = post({ slug: "unrelated", tags: ["other"] });

    expect(
      findRelatedPosts(source, [source, unrelated, related]).map(
        (item) => item.slug,
      ),
    ).toEqual(["related"]);
  });
});
