import type { ThemeName } from "@schema/current";

export interface ThemeDefinition {
  name: ThemeName;
  label: string;
  description: string;
  stylesheet: string;
}

export const requiredThemeTokens = [
  "--color-background",
  "--color-surface",
  "--color-surface-muted",
  "--color-text",
  "--color-text-muted",
  "--color-border",
  "--color-accent",
  "--color-accent-contrast",
  "--color-detail",
  "--font-body",
  "--font-heading",
  "--font-code",
  "--content-width",
  "--article-width",
  "--radius-small",
  "--radius-medium",
] as const;
