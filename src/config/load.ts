import { readFile } from "node:fs/promises";
import { join } from "node:path";
import YAML from "yaml";
import {
  navigationConfigSchemaV1,
  siteConfigSchemaV1,
  socialConfigSchemaV1,
  themeConfigSchemaV1,
} from "@schema/current";
import type {
  NavigationConfig,
  SiteConfig,
  SocialConfig,
  ThemeConfig,
} from "@schema/current";

async function readYaml<T>(
  filePath: string,
  parser: { parse: (value: unknown) => T },
): Promise<T> {
  const source = await readFile(filePath, "utf8");
  return parser.parse(YAML.parse(source));
}

export async function loadSiteConfig(
  configDir = "config",
): Promise<SiteConfig> {
  return readYaml(
    join(process.env.MARKLOOM_CONFIG_DIR ?? configDir, "site.yaml"),
    siteConfigSchemaV1,
  );
}

export async function loadNavigationConfig(
  configDir = "config",
): Promise<NavigationConfig> {
  return readYaml(
    join(process.env.MARKLOOM_CONFIG_DIR ?? configDir, "navigation.yaml"),
    navigationConfigSchemaV1,
  );
}

export async function loadSocialConfig(
  configDir = "config",
): Promise<SocialConfig> {
  return readYaml(
    join(process.env.MARKLOOM_CONFIG_DIR ?? configDir, "social.yaml"),
    socialConfigSchemaV1,
  );
}

export async function loadThemeConfig(
  configDir = "config",
): Promise<ThemeConfig> {
  return readYaml(
    join(process.env.MARKLOOM_CONFIG_DIR ?? configDir, "theme.yaml"),
    themeConfigSchemaV1,
  );
}

export async function loadMarkloomConfig(configDir = "config") {
  const [site, navigation, social, theme] = await Promise.all([
    loadSiteConfig(configDir),
    loadNavigationConfig(configDir),
    loadSocialConfig(configDir),
    loadThemeConfig(configDir),
  ]);

  return { site, navigation, social, theme };
}
