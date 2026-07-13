import { blogSchema, projectSchema, siteConfigSchemaV1 } from "@schema/current";

describe("public schemas", () => {
  it("accepts minimal valid blog frontmatter", () => {
    expect(
      blogSchema.parse({
        schemaVersion: 1,
        title: "Post",
        description: "Description",
        publishedAt: "2026-01-01",
      }),
    ).toMatchObject({ title: "Post", draft: false });
  });

  it("requires blog descriptions", () => {
    const parsed = blogSchema.safeParse({
      schemaVersion: 1,
      title: "Post",
      publishedAt: "2026-01-01",
    });
    expect(parsed.success).toBe(false);
  });

  it("requires image alt text when a cover image is provided", () => {
    const parsed = blogSchema.safeParse({
      schemaVersion: 1,
      title: "Post",
      description: "Description",
      publishedAt: "2026-01-01",
      cover: { src: "/cover.png" },
    });
    expect(parsed.success).toBe(false);
  });

  it("accepts project links", () => {
    expect(
      projectSchema.parse({
        schemaVersion: 1,
        title: "Project",
        description: "Description",
        repositoryUrl: "https://github.com/example/project",
      }),
    ).toMatchObject({ featured: false });
  });

  it("rejects unknown theme names", () => {
    const parsed = siteConfigSchemaV1.safeParse({
      schemaVersion: 1,
      title: "Site",
      description: "Description",
      url: "https://example.com",
      theme: "neon",
    });
    expect(parsed.success).toBe(false);
  });
});
