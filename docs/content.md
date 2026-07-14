# Content

Markloom reads Markdown (`.md`) and MDX (`.mdx`) from `content/`. The filename
becomes the URL slug.

| Directory             | Purpose              | Example route         |
| --------------------- | -------------------- | --------------------- |
| `content/home/`       | Homepage             | `/`                   |
| `content/pages/`      | Standalone pages     | `/about/`             |
| `content/projects/`   | Project case studies | `/projects/atlas/`    |
| `content/blog/`       | Blog posts           | `/blog/hello/`        |
| `content/authors/`    | Blog author records  | No public route       |
| `content/experience/` | Work history         | Shown on the homepage |

Use lowercase, kebab-case filenames such as `my-first-project.md`.

## Blog Post

Create `content/blog/hello-markloom.md`:

```markdown
---
schemaVersion: 1
title: Hello, Markloom
description: What I learned while building my new site.
publishedAt: 2026-07-13
tags:
  - notes
authors:
  - jane-doe
featured: false
draft: false
---

Write the article here.

## A section heading

Standard Markdown, tables, task lists, code fences, and Mermaid diagrams are
supported.
```

Posts with `draft: true` or a future `publishedAt` date are excluded from the
published site.

## Project

Create `content/projects/my-project.md`:

```markdown
---
schemaVersion: 1
title: My Project
description: A short summary used in project lists and search results.
featured: true
tags:
  - product design
url: https://example.com
image:
  src: /images/my-project.jpg
  alt: The project dashboard on a laptop screen.
---

Describe the problem, your work, and the outcome.
```

Store the image at `public/images/my-project.jpg`. Image alt text is required
when an image is configured.

## Standalone Page

Create `content/pages/services.md`:

```markdown
---
schemaVersion: 1
title: Services
description: Product strategy, design systems, and front-end engineering.
order: 2
---

Describe the services here.
```

Add the route to `navigation.items` in `markloom.yaml` when it should appear in
the main navigation:

```yaml
- label: Services
  href: /services/
```

## Author And Experience

Author files require `name`; `role`, `avatar`, `bio`, and `url` are optional.
Experience files require `organization`, `role`, and `startDate`.

The complete field reference lives in [Public Schema](schema.md). Run
`corepack pnpm validate` after changing configuration and
`corepack pnpm build` after changing content.
