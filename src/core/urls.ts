import { normalizeBasePath } from "./deployment";

function defaultBasePath(): string {
  return import.meta.env?.BASE_URL ?? "/";
}

function isExternalOrDocumentUrl(path: string): boolean {
  return (
    path.startsWith("#") ||
    path.startsWith("?") ||
    path.startsWith("//") ||
    /^[a-z][a-z\d+.-]*:/i.test(path)
  );
}

export function sitePath(path: string, base = defaultBasePath()): string {
  if (!path || isExternalOrDocumentUrl(path)) return path;

  const normalizedBase = normalizeBasePath(base);
  const normalizedPath = `/${path}`.replace(/\/{2,}/g, "/");

  if (normalizedBase === "/") return normalizedPath;
  if (
    normalizedPath === normalizedBase ||
    normalizedPath.startsWith(`${normalizedBase}/`)
  ) {
    return normalizedPath;
  }

  return `${normalizedBase}${normalizedPath}`;
}

export function joinUrl(base: string, path: string): string {
  if (isExternalOrDocumentUrl(path) && !path.startsWith("//")) {
    return new URL(path, base).toString();
  }

  const baseUrl = new URL(base);
  return new URL(
    sitePath(path, normalizeBasePath(baseUrl.pathname)),
    baseUrl.origin,
  ).toString();
}

export function blogUrl(slug: string, base?: string): string {
  return sitePath(`/blog/${slug}/`, base);
}

export function projectUrl(slug: string, base?: string): string {
  return sitePath(`/projects/${slug}/`, base);
}

export function tagUrl(tag: string, base?: string): string {
  return sitePath(`/tags/${encodeURIComponent(tag)}/`, base);
}
