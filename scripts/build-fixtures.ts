import { access, readdir, readFile } from "node:fs/promises";
import { basename, join } from "node:path";

import { runPnpm } from "./run-pnpm";

interface FixtureManifest {
  valid: boolean;
  description: string;
}

async function main() {
  const root = "fixtures";
  const entries = await readdir(root, { withFileTypes: true });
  const fixtureDirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(root, entry.name));
  const validFixtures: string[] = [];

  for (const fixtureDir of fixtureDirs) {
    const manifestPath = join(fixtureDir, "fixture.json");
    const manifest = JSON.parse(
      await readFile(manifestPath, "utf8").catch(
        () => '{"valid":false,"description":"not configured"}',
      ),
    ) as FixtureManifest;
    if (manifest.valid) {
      validFixtures.push(fixtureDir);
    }
  }

  for (const fixtureDir of validFixtures) {
    console.log(`Building fixture: ${fixtureDir}`);
    const fixtureName = basename(fixtureDir);
    const outDir = join("dist-fixtures", fixtureName);
    const publicUrl = `https://fixtures.example/${fixtureName}/`;

    await runPnpm(["run", "build"], {
      env: {
        ...process.env,
        MARKLOOM_CONTENT_DIR: join(fixtureDir, "content"),
        MARKLOOM_CONFIG_DIR: join(fixtureDir, "config"),
        MARKLOOM_CACHE_DIR: join(".markloom-cache", "fixtures", fixtureName),
        MARKLOOM_OUT_DIR: outDir,
        MARKLOOM_PUBLIC_URL: publicUrl,
      },
    });

    await access(join(outDir, "pagefind", "pagefind.js")).catch(() => {
      throw new Error(
        `Fixture ${fixtureName} did not produce a Pagefind index`,
      );
    });

    const [home, search, sitemap, rss] = await Promise.all([
      readFile(join(outDir, "index.html"), "utf8"),
      readFile(join(outDir, "search", "index.html"), "utf8"),
      readFile(join(outDir, "sitemap-0.xml"), "utf8"),
      readFile(join(outDir, "rss.xml"), "utf8"),
    ]);
    const basePath = `/${fixtureName}/`;

    if (!home.includes(`href="${basePath}"`)) {
      throw new Error(`Fixture ${fixtureName} did not prefix internal links`);
    }
    if (!search.includes(`${basePath}pagefind/pagefind.js`)) {
      throw new Error(`Fixture ${fixtureName} did not prefix Pagefind`);
    }
    if (!sitemap.includes(publicUrl) || !rss.includes(publicUrl)) {
      throw new Error(
        `Fixture ${fixtureName} emitted inconsistent public URLs`,
      );
    }
  }

  console.log(`Built ${validFixtures.length} valid fixture(s).`);
}

await main();
