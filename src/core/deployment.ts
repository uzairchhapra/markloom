export interface PublicUrl {
  site: string;
  base: string;
  href: string;
}

export function normalizeBasePath(pathname: string): string {
  const normalized = `/${pathname}`.replace(/\/{2,}/g, "/");
  if (normalized === "/") return normalized;
  return normalized.replace(/\/$/, "");
}

export function resolvePublicUrl(
  configuredUrl: string,
  overrideUrl?: string,
): PublicUrl {
  const url = new URL(overrideUrl ?? configuredUrl);

  if (!/^https?:$/.test(url.protocol)) {
    throw new Error("Markloom public URLs must use http or https.");
  }
  if (url.username || url.password || url.search || url.hash) {
    throw new Error(
      "Markloom public URLs cannot contain credentials, a query, or a hash.",
    );
  }

  const base = normalizeBasePath(url.pathname);
  const site = url.origin;

  return {
    site,
    base,
    href: new URL(base === "/" ? "/" : `${base}/`, site).toString(),
  };
}
