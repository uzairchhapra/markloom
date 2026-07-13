import { resolvePublicUrl } from "@core/deployment";
import { rehypeBasePath } from "@core/rehype-base-path";
import { blogUrl, joinUrl, projectUrl, sitePath, tagUrl } from "@core/urls";

describe("public URL resolution", () => {
  it("splits an origin deployment from a project deployment", () => {
    expect(resolvePublicUrl("https://example.com")).toEqual({
      site: "https://example.com",
      base: "/",
      href: "https://example.com/",
    });
    expect(resolvePublicUrl("https://example.com/markloom/")).toEqual({
      site: "https://example.com",
      base: "/markloom",
      href: "https://example.com/markloom/",
    });
  });

  it("uses a deployment override without changing user configuration", () => {
    expect(
      resolvePublicUrl(
        "https://john.example",
        "https://owner.github.io/portfolio/",
      ),
    ).toMatchObject({
      site: "https://owner.github.io",
      base: "/portfolio",
    });
  });

  it("rejects unsafe public URLs", () => {
    expect(() => resolvePublicUrl("ftp://example.com")).toThrow("http");
    expect(() => resolvePublicUrl("https://example.com/?preview=1")).toThrow(
      "query",
    );
  });
});

describe("site paths", () => {
  it("prefixes internal paths exactly once", () => {
    expect(sitePath("/blog/", "/markloom/")).toBe("/markloom/blog/");
    expect(sitePath("/markloom/blog/", "/markloom/")).toBe("/markloom/blog/");
    expect(sitePath("/blog/", "/")).toBe("/blog/");
  });

  it("preserves external and document-relative URLs", () => {
    for (const value of [
      "https://example.com",
      "mailto:hello@example.com",
      "tel:+15555550100",
      "//cdn.example.com/image.png",
      "#content",
      "?page=2",
    ]) {
      expect(sitePath(value, "/markloom")).toBe(value);
    }
  });

  it("builds route and canonical URLs under a base", () => {
    expect(blogUrl("hello", "/markloom")).toBe("/markloom/blog/hello/");
    expect(projectUrl("atlas", "/markloom")).toBe("/markloom/projects/atlas/");
    expect(tagUrl("design systems", "/markloom")).toBe(
      "/markloom/tags/design%20systems/",
    );
    expect(joinUrl("https://example.com/markloom/", "/blog/hello/")).toBe(
      "https://example.com/markloom/blog/hello/",
    );
  });
});

describe("Markdown base paths", () => {
  it("rewrites rooted links, media, and srcsets", () => {
    const tree = {
      type: "root",
      children: [
        {
          type: "element",
          properties: {
            href: "/about/",
            src: "/images/photo.jpg",
            srcSet: "/images/small.jpg 1x, /images/large.jpg 2x",
          },
        },
      ],
    };

    rehypeBasePath({ base: "/markloom" })(tree);

    expect(tree.children[0].properties).toEqual({
      href: "/markloom/about/",
      src: "/markloom/images/photo.jpg",
      srcSet: "/markloom/images/small.jpg 1x, /markloom/images/large.jpg 2x",
    });
  });
});
