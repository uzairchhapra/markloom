import type { CollectionEntry } from "astro:content";
import readingTime from "reading-time";

export interface MediaAsset {
  src: string;
  alt: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: Date;
  updatedAt?: Date;
  tags: string[];
  categories: string[];
  authors: string[];
  draft: boolean;
  featured: boolean;
  cover?: MediaAsset;
  canonicalUrl?: string;
  noindex: boolean;
  readingTime: string;
  body: unknown;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
  featured: boolean;
  tags: string[];
  url?: string;
  repositoryUrl?: string;
  image?: MediaAsset;
  body: unknown;
}

export interface CustomPage {
  slug: string;
  title: string;
  description: string;
  draft: boolean;
  noindex: boolean;
  order: number;
  body: unknown;
}

function slugFromEntry(entry: Pick<CollectionEntry<"blog">, "id">): string {
  return entry.id.replace(/\/index$/, "");
}

export function normalizeBlogPost(entry: CollectionEntry<"blog">): BlogPost {
  return {
    slug: slugFromEntry(entry),
    title: entry.data.title,
    description: entry.data.description,
    publishedAt: entry.data.publishedAt,
    updatedAt: entry.data.updatedAt,
    tags: entry.data.tags,
    categories: entry.data.categories,
    authors: entry.data.authors,
    draft: entry.data.draft,
    featured: entry.data.featured,
    cover: entry.data.cover,
    canonicalUrl: entry.data.canonicalUrl,
    noindex: entry.data.noindex,
    readingTime: readingTime(entry.body ?? "").text,
    body: entry,
  };
}

export function normalizeProject(entry: CollectionEntry<"projects">): Project {
  return {
    slug: slugFromEntry(entry),
    title: entry.data.title,
    description: entry.data.description,
    startDate: entry.data.startDate,
    endDate: entry.data.endDate,
    featured: entry.data.featured,
    tags: entry.data.tags,
    url: entry.data.url,
    repositoryUrl: entry.data.repositoryUrl,
    image: entry.data.image,
    body: entry,
  };
}

export function normalizePage(entry: CollectionEntry<"pages">): CustomPage {
  return {
    slug: slugFromEntry(entry),
    title: entry.data.title,
    description: entry.data.description,
    draft: entry.data.draft,
    noindex: entry.data.noindex,
    order: entry.data.order,
    body: entry,
  };
}
