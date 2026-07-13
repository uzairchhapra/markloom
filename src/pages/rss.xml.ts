import rss from "@astrojs/rss";
import { loadSiteConfig } from "@config/load";
import { getPublishedPosts } from "@core/content";
import { blogUrl } from "@core/urls";

export async function GET() {
  const site = await loadSiteConfig();
  const posts = await getPublishedPosts();

  return rss({
    title: site.title,
    description: site.description,
    site: site.url,
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      pubDate: post.publishedAt,
      link: blogUrl(post.slug),
    })),
  });
}
