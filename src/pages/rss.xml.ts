import rss from "@astrojs/rss";
import { loadSiteConfig } from "@config/load";
import { getPublishedPosts } from "@core/content";
import { blogUrl } from "@core/urls";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const site = await loadSiteConfig();
  const posts = await getPublishedPosts();
  const publicRoot = new URL(import.meta.env.BASE_URL, context.site).toString();

  return rss({
    title: site.title,
    description: site.description,
    site: publicRoot,
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      pubDate: post.publishedAt,
      link: blogUrl(post.slug),
    })),
  });
}
