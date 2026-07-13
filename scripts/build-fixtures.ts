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

    await runPnpm(["run", "build"], {
      env: {
        ...process.env,
        MARKLOOM_CONTENT_DIR: join(fixtureDir, "content"),
        MARKLOOM_CONFIG_DIR: join(fixtureDir, "config"),
        MARKLOOM_CACHE_DIR: join(".markloom-cache", "fixtures", fixtureName),
        MARKLOOM_OUT_DIR: outDir,
      },
    });

    await access(join(outDir, "pagefind", "pagefind.js")).catch(() => {
      throw new Error(
        `Fixture ${fixtureName} did not produce a Pagefind index`,
      );
    });
  }

  console.log(`Built ${validFixtures.length} valid fixture(s).`);
}

await main();
