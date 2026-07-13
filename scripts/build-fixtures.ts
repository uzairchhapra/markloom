import { execFile } from "node:child_process";
import { readdir, readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

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
    const command = process.env.npm_execpath ?? "corepack";
    const args = process.env.npm_execpath
      ? [process.env.npm_execpath, "build"]
      : ["pnpm", "build"];

    await execFileAsync(
      process.env.npm_execpath ? process.execPath : command,
      args,
      {
        env: {
          ...process.env,
          MARKLOOM_CONTENT_DIR: join(fixtureDir, "content"),
          MARKLOOM_CONFIG_DIR: join(fixtureDir, "config"),
          MARKLOOM_CACHE_DIR: join(".markloom-cache", "fixtures", fixtureName),
          MARKLOOM_OUT_DIR: join("dist-fixtures", fixtureName),
        },
        maxBuffer: 1024 * 1024 * 20,
      },
    );
  }

  console.log(`Built ${validFixtures.length} valid fixture(s).`);
}

await main();
