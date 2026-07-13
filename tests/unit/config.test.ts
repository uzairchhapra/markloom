import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach } from "vitest";
import {
  loadMarkloomConfig,
  loadNavigationConfig,
  loadSiteConfig,
  loadSocialConfig,
  loadThemeConfig,
} from "@config/load";

const canonicalConfig = `schemaVersion: 1
site:
  title: Canonical Site
  description: Canonical description
  url: https://canonical.example
navigation:
  items:
    - label: Home
      href: /
social:
  links:
    - label: GitHub
      href: https://github.com/example
theme:
  appearance: dark
  accent: "#112233"
`;

const legacyConfig = {
  "site.yaml": `schemaVersion: 1
title: Legacy Site
description: Legacy description
url: https://legacy.example
`,
  "navigation.yaml": `items:
  - label: Work
    href: /work/
`,
  "social.yaml": `links:
  - label: GitHub
    href: https://github.com/legacy
`,
  "theme.yaml": `appearance: light
accent: "#abcdef"
`,
};

let rootDir: string;
let originalConfigDir: string | undefined;
let originalConfigFile: string | undefined;

async function writeLegacyConfig(configDir: string) {
  await Promise.all(
    Object.entries(legacyConfig).map(([fileName, source]) =>
      writeFile(join(configDir, fileName), source),
    ),
  );
}

function restoreEnvironment(name: string, value: string | undefined) {
  if (value === undefined) {
    delete process.env[name];
  } else {
    process.env[name] = value;
  }
}

beforeEach(async () => {
  rootDir = await mkdtemp(join(tmpdir(), "markloom-config-"));
  await mkdir(join(rootDir, "config"));
  originalConfigDir = process.env.MARKLOOM_CONFIG_DIR;
  originalConfigFile = process.env.MARKLOOM_CONFIG_FILE;
  delete process.env.MARKLOOM_CONFIG_DIR;
  delete process.env.MARKLOOM_CONFIG_FILE;
});

afterEach(async () => {
  restoreEnvironment("MARKLOOM_CONFIG_DIR", originalConfigDir);
  restoreEnvironment("MARKLOOM_CONFIG_FILE", originalConfigFile);
  await rm(rootDir, { recursive: true, force: true });
});

describe("configuration loading", () => {
  it("loads canonical markloom.yaml beside the config directory", async () => {
    await writeFile(join(rootDir, "markloom.yaml"), canonicalConfig);

    await expect(loadMarkloomConfig(join(rootDir, "config"))).resolves.toEqual({
      site: {
        schemaVersion: 1,
        title: "Canonical Site",
        description: "Canonical description",
        url: "https://canonical.example",
        language: "en",
        theme: "minimal",
      },
      navigation: { items: [{ label: "Home", href: "/" }] },
      social: {
        links: [{ label: "GitHub", href: "https://github.com/example" }],
      },
      theme: { appearance: "dark", accent: "#112233" },
    });
  });

  it("falls back to split legacy files when markloom.yaml is absent", async () => {
    const configDir = join(rootDir, "config");
    await writeLegacyConfig(configDir);

    const config = await loadMarkloomConfig(configDir);

    expect(config.site).toMatchObject({
      schemaVersion: 1,
      title: "Legacy Site",
    });
    expect(config.navigation.items).toEqual([
      { label: "Work", href: "/work/" },
    ]);
    expect(config.social.links).toEqual([
      { label: "GitHub", href: "https://github.com/legacy" },
    ]);
    expect(config.theme).toEqual({
      appearance: "light",
      accent: "#abcdef",
    });
  });

  it("prefers an explicit configuration file", async () => {
    const explicitFile = join(rootDir, "custom.yaml");
    await writeFile(explicitFile, canonicalConfig);
    process.env.MARKLOOM_CONFIG_FILE = explicitFile;

    await expect(
      loadMarkloomConfig(join(rootDir, "missing-config")),
    ).resolves.toMatchObject({ site: { title: "Canonical Site" } });
  });

  it("fails when an explicit configuration file is missing", async () => {
    process.env.MARKLOOM_CONFIG_FILE = join(rootDir, "missing.yaml");

    await expect(loadMarkloomConfig(join(rootDir, "config"))).rejects.toThrow();
  });

  it("does not fall back when canonical YAML is malformed", async () => {
    const configDir = join(rootDir, "config");
    await writeLegacyConfig(configDir);
    await writeFile(
      join(rootDir, "markloom.yaml"),
      "schemaVersion: 1\nsite: [",
    );

    await expect(loadMarkloomConfig(configDir)).rejects.toThrow();
  });

  it("uses the aggregate loader for compatibility wrappers", async () => {
    const explicitFile = join(rootDir, "custom.yaml");
    await writeFile(explicitFile, canonicalConfig);
    process.env.MARKLOOM_CONFIG_FILE = explicitFile;
    const configDir = join(rootDir, "missing-config");

    const [site, navigation, social, theme] = await Promise.all([
      loadSiteConfig(configDir),
      loadNavigationConfig(configDir),
      loadSocialConfig(configDir),
      loadThemeConfig(configDir),
    ]);

    expect(site).toMatchObject({ schemaVersion: 1, title: "Canonical Site" });
    expect(navigation.items).toHaveLength(1);
    expect(social.links).toHaveLength(1);
    expect(theme).toEqual({ appearance: "dark", accent: "#112233" });
  });

  it("uses MARKLOOM_CONFIG_DIR to infer the canonical root", async () => {
    await writeFile(join(rootDir, "markloom.yaml"), canonicalConfig);
    process.env.MARKLOOM_CONFIG_DIR = join(rootDir, "config");

    await expect(loadMarkloomConfig("ignored")).resolves.toMatchObject({
      site: { title: "Canonical Site" },
    });
  });
});
