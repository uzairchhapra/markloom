import type { ThemeName } from "@schema/current";
import type { ThemeDefinition } from "./contract";

export const themes = {
  minimal: {
    name: "minimal",
    label: "Minimal",
    description:
      "A clean professional theme for portfolios, resumes, consultants, and developers.",
    stylesheet: "/src/themes/minimal/theme.css",
  },
  editorial: {
    name: "editorial",
    label: "Editorial",
    description:
      "A typography-focused theme for writers, researchers, academics, and technical bloggers.",
    stylesheet: "/src/themes/editorial/theme.css",
  },
  terminal: {
    name: "terminal",
    label: "Terminal",
    description:
      "A developer-oriented theme with the rhythm of a typewritten terminal.",
    stylesheet: "/src/themes/terminal/theme.css",
  },
} satisfies Record<ThemeName, ThemeDefinition>;

export function resolveTheme(name: string): ThemeDefinition {
  if (name in themes) {
    return themes[name as ThemeName];
  }

  throw new Error(
    `Unknown theme "${name}". Supported themes: ${Object.keys(themes).join(", ")}.`,
  );
}
