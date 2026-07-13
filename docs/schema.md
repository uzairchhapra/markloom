# Public Schema

Markloom schema version `1` is the initial stable content format.

## Blog Posts

Required frontmatter:

```yaml
schemaVersion: 1
title: Hello, Markloom
description: A short summary for article cards, search, and SEO.
publishedAt: 2026-07-13
```

Optional fields include `updatedAt`, `draft`, `featured`, `tags`, `categories`, `authors`, `cover`, `canonicalUrl`, and `noindex`.

## Projects

Required frontmatter:

```yaml
schemaVersion: 1
title: Markloom Engine
description: The shared core behind Markloom sites.
```

Optional fields include `startDate`, `endDate`, `featured`, `tags`, `url`, `repositoryUrl`, and `image`.
