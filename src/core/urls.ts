export function joinUrl(base: string, path: string): string {
  return new URL(path, base.endsWith("/") ? base : `${base}/`).toString();
}

export function blogUrl(slug: string): string {
  return `/blog/${slug}/`;
}

export function projectUrl(slug: string): string {
  return `/projects/${slug}/`;
}

export function tagUrl(tag: string): string {
  return `/tags/${encodeURIComponent(tag)}/`;
}
