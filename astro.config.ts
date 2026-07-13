import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { loadMarkloomConfig } from "./src/config/load";
import { resolvePublicUrl } from "./src/core/deployment";
import { rehypeBasePath } from "./src/core/rehype-base-path";

const config = await loadMarkloomConfig();
const publicUrl = resolvePublicUrl(
  config.site.url,
  process.env.MARKLOOM_PUBLIC_URL,
);

export default defineConfig({
  site: publicUrl.site,
  base: publicUrl.base,
  output: "static",
  trailingSlash: "always",
  outDir: process.env.MARKLOOM_OUT_DIR ?? "dist",
  cacheDir: process.env.MARKLOOM_CACHE_DIR ?? ".markloom-cache/root",
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeBasePath, { base: publicUrl.base }],
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
