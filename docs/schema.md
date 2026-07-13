# Public Schema

Markloom schema version `1` is the initial stable content format.

## Site Configuration

New sites use one root-level `markloom.yaml` document:

```yaml
schemaVersion: 1

site:
  title: Jane Doe
  description: Product designer and researcher.
  url: https://janedoe.example
  language: en
  theme: editorial

navigation:
  items:
    - label: Work
      href: /projects/

social:
  links: []

theme:
  appearance: system
  accent: "#c3382e"
```

The package release and configuration schema have independent versions.
Package upgrades must not change `schemaVersion` automatically. Split
`config/*.yaml` files remain readable for schema version 1 compatibility.

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
