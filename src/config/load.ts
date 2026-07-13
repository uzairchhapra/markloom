import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import YAML from "yaml";
import {
  markloomConfigSchemaV1,
  navigationConfigSchemaV1,
  siteConfigSchemaV1,
  socialConfigSchemaV1,
  themeConfigSchemaV1,
} from "../schema/current";
import type {
  MarkloomConfig,
  NavigationConfig,
  SiteConfig,
  SocialConfig,
  ThemeConfig,
} from "../schema/current";

type LoadedMarkloomConfig = Omit<MarkloomConfig, "schemaVersion">;

async function readYaml<T>(
  filePath: string,
  parser: { parse: (value: unknown) => T },
): Promise<T> {
  const source = await readFile(filePath, "utf8");
  return parser.parse(YAML.parse(source));
}

async function loadLegacySiteConfig(configDir: string): Promise<SiteConfig> {
  return readYaml(join(configDir, "site.yaml"), siteConfigSchemaV1);
}

async function loadLegacyNavigationConfig(
  configDir: string,
): Promise<NavigationConfig> {
  return readYaml(join(configDir, "navigation.yaml"), navigationConfigSchemaV1);
}

async function loadLegacySocialConfig(
  configDir: string,
): Promise<SocialConfig> {
  return readYaml(join(configDir, "social.yaml"), socialConfigSchemaV1);
}

async function loadLegacyThemeConfig(configDir: string): Promise<ThemeConfig> {
  return readYaml(join(configDir, "theme.yaml"), themeConfigSchemaV1);
}

async function loadLegacyConfig(
  configDir: string,
): Promise<LoadedMarkloomConfig> {
  const [site, navigation, social, theme] = await Promise.all([
    loadLegacySiteConfig(configDir),
    loadLegacyNavigationConfig(configDir),
    loadLegacySocialConfig(configDir),
    loadLegacyThemeConfig(configDir),
  ]);

  return { site, navigation, social, theme };
}

function isMissingFile(error: unknown): error is Error & { code: "ENOENT" } {
  return error instanceof Error && "code" in error && error.code === "ENOENT";
}

async function loadCanonicalConfig(
  filePath: string,
): Promise<LoadedMarkloomConfig> {
  const { site, navigation, social, theme } = await readYaml(
    filePath,
    markloomConfigSchemaV1,
  );

  return { site, navigation, social, theme };
}

export async function loadMarkloomConfig(
  configDir = "config",
): Promise<LoadedMarkloomConfig> {
  const explicitConfigFile = process.env.MARKLOOM_CONFIG_FILE;

  if (explicitConfigFile !== undefined) {
    return loadCanonicalConfig(explicitConfigFile);
  }

  const effectiveConfigDir = process.env.MARKLOOM_CONFIG_DIR ?? configDir;
  const canonicalConfigFile = join(
    dirname(effectiveConfigDir),
    "markloom.yaml",
  );

  try {
    return await loadCanonicalConfig(canonicalConfigFile);
  } catch (error) {
    if (!isMissingFile(error)) {
      throw error;
    }
  }

  return loadLegacyConfig(effectiveConfigDir);
}

export async function loadSiteConfig(
  configDir = "config",
): Promise<SiteConfig> {
  return (await loadMarkloomConfig(configDir)).site;
}

export async function loadNavigationConfig(
  configDir = "config",
): Promise<NavigationConfig> {
  return (await loadMarkloomConfig(configDir)).navigation;
}

export async function loadSocialConfig(
  configDir = "config",
): Promise<SocialConfig> {
  return (await loadMarkloomConfig(configDir)).social;
}

export async function loadThemeConfig(
  configDir = "config",
): Promise<ThemeConfig> {
  return (await loadMarkloomConfig(configDir)).theme;
}
