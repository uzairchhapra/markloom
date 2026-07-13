import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export default defineConfig({
  site: "https://example.com",
  output: "static",
  outDir: process.env.MARKLOOM_OUT_DIR ?? "dist",
  cacheDir: process.env.MARKLOOM_CACHE_DIR ?? ".markloom-cache/root",
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["heading-anchor"],
          },
        },
      ],
    ],
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
});
