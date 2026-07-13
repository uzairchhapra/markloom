import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import matter from "gray-matter";
import YAML from "yaml";
import { validateMermaidBlocks } from "../src/core/mermaid";
import {
  blogSchema,
  navigationConfigSchemaV1,
  projectSchema,
  siteConfigSchemaV1,
  socialConfigSchemaV1,
  themeConfigSchemaV1,
} from "../src/schema/current";

interface ValidationIssue {
  file: string;
  message: string;
}

async function findMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return findMarkdownFiles(path);
      if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) return [path];
      return [];
    }),
  );
  return files.flat();
}

async function validateYaml(
  file: string,
  schema: {
    safeParse: (value: unknown) => {
      success: boolean;
      error?: {
        issues: Array<{ path: Array<string | number>; message: string }>;
      };
    };
  },
  issues: ValidationIssue[],
) {
  const value = YAML.parse(await readFile(file, "utf8"));
  const parsed = schema.safeParse(value);
  if (!parsed.success) {
    for (const issue of parsed.error?.issues ?? []) {
      issues.push({
        file,
        message: `${issue.path.join(".") || "root"}: ${issue.message}`,
      });
    }
  }
}

async function validateCollection(
  contentDir: string,
  collection: string,
  schema: typeof blogSchema | typeof projectSchema,
  issues: ValidationIssue[],
) {
  const files = await findMarkdownFiles(join(contentDir, collection));
  const slugs = new Map<string, string>();

  for (const file of files) {
    const source = await readFile(file, "utf8");
    const parsedMatter = matter(source);
    const parsed = schema.safeParse(parsedMatter.data);
    const slug = relative(join(contentDir, collection), file).replace(
      /\.(md|mdx)$/,
      "",
    );

    if (slugs.has(slug)) {
      issues.push({
        file,
        message: `Duplicate slug also used by ${slugs.get(slug)}.`,
      });
    }
    slugs.set(slug, file);

    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        issues.push({
          file,
          message: `${issue.path.join(".") || "frontmatter"}: ${issue.message}`,
        });
      }
    }

    const mermaid = validateMermaidBlocks(parsedMatter.content);
    for (const error of mermaid.errors) {
      issues.push({ file, message: error });
    }
  }
}

async function main() {
  const contentDir = process.env.MARKLOOM_CONTENT_DIR ?? "content";
  const configDir = process.env.MARKLOOM_CONFIG_DIR ?? "config";
  const issues: ValidationIssue[] = [];

  await Promise.all([
    validateYaml(join(configDir, "site.yaml"), siteConfigSchemaV1, issues),
    validateYaml(
      join(configDir, "navigation.yaml"),
      navigationConfigSchemaV1,
      issues,
    ),
    validateYaml(join(configDir, "social.yaml"), socialConfigSchemaV1, issues),
    validateYaml(join(configDir, "theme.yaml"), themeConfigSchemaV1, issues),
    validateCollection(contentDir, "blog", blogSchema, issues),
    validateCollection(contentDir, "projects", projectSchema, issues),
  ]);

  if (issues.length > 0) {
    console.error("Markloom validation failed:\n");
    for (const issue of issues) {
      console.error(`${issue.file}\n  ${issue.message}`);
    }
    process.exit(1);
  }

  console.log("Markloom validation passed.");
}

await main();
