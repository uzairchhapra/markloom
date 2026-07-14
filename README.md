# Markloom

**Beautiful websites, woven from Markdown.**

Markloom turns Markdown, YAML, and static assets into a complete Astro website.
It includes portfolio pages, projects, a blog, search, RSS, sitemaps, Mermaid
diagrams, and three responsive themes.

> [!IMPORTANT]
> Markloom is currently distributed as a complete repository, not as an npm
> library or CLI. The root package is private and `npm install markloom` is not
> supported yet. GitHub release versions track the engine in this repository.

## Quick Start

Fork this repository, then run:

```bash
nvm install
nvm use
corepack enable
corepack pnpm install
corepack pnpm dev
```

Open `http://localhost:4321`. The included site is a fictional John Doe
portfolio that can be replaced entirely through configuration and content
files.

## Make It Yours

Site owners normally edit only:

```text
markloom.yaml       Site identity, navigation, social links, and theme
content/            Pages, posts, projects, authors, and experience
public/             Images, downloads, icons, and other static files
```

1. Replace the John Doe values in `markloom.yaml`.
2. Replace or remove the example files under `content/`.
3. Put images in `public/images/` and reference them as `/images/name.jpg`.
4. Validate and build the site.

```bash
corepack pnpm validate
corepack pnpm build
```

The generated static site is written to `dist/`.

## User Guides

- [Set up a site](docs/getting-started.md)
- [Write content](docs/content.md)
- [Deploy to GitHub Pages](docs/github-pages.md)
- [View the complete schema](docs/schema.md)

## Themes

Set `site.theme` in `markloom.yaml` to `minimal`, `editorial`, or `terminal`.
Set `theme.appearance` to `light`, `dark`, or `system`.

The running example exposes `/themes/` so the same content can be compared
across every bundled theme.

## Security And Updates

Pull requests run tests, CodeQL analysis, and dependency review. Dependabot
checks npm packages and GitHub Actions weekly, grouping routine minor and patch
updates while leaving major upgrades for individual review.

See [SECURITY.md](SECURITY.md) to report a vulnerability privately.

## Engine Development

Engine contributors work in `src/`, `scripts/`, `fixtures/`, and `tests/`.
Site content and engine code are intentionally separate so content can survive
engine upgrades.

Markloom uses Conventional Commits and Release Please. `fix:` creates a patch
release, `feat:` creates a minor release, and a breaking-change marker creates a
major release.

Additional maintainer references:

- [Product strategy](docs/product-strategy.md)
- [Theme contract](docs/theme-contract.md)
- [MCP direction](docs/mcp.md)
