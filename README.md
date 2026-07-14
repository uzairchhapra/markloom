# Markloom

**Beautiful websites, woven from Markdown.**

Markloom builds complete websites from Markdown. Write content in `content/`,
configure the site in `markloom.yaml`, add static assets in `public/`, and
generate a polished Astro static site.

## Status

This repository is the first production-oriented scaffold for the Markloom
engine. It establishes the public content contract, normalized internal models,
three bundled themes, Mermaid rendering, fixture hooks, tests, and CI.

## Included Example

The root site is a complete fictional portfolio for **John Doe**, an independent
product engineer. It demonstrates a home page, project case studies, work
experience, writing, an about page, search, theme switching, and responsive
layouts using only `markloom.yaml`, `content/`, and `public/`.

Visit `/themes/` in the running site to compare the same John Doe portfolio in
the Minimal, Editorial, and Terminal themes, then open any theme as a complete
live example.

## Quick Start

```bash
corepack enable
corepack pnpm install
corepack pnpm dev
```

Build the static site and Pagefind index:

```bash
corepack pnpm build
```

## Authoring Surface

Most site owners should only edit:

- `content/`
- `markloom.yaml`
- `public/`

Engine and theme contributors work in `src/`.

## Project Structure

```text
markloom.yaml        Versioned site configuration
content/             Markdown and MDX content
fixtures/            Compatibility fixture websites
public/              Static files copied into the build
src/config/          Config loading and validation
src/core/            Framework-neutral business logic
src/schema/          Versioned public schemas and normalization
src/themes/          Theme contract and theme CSS
tests/               Unit, contract, accessibility, e2e, and visual tests
```

Split files under `config/` remain supported for schema version 1 compatibility,
but new sites should use `markloom.yaml`.

## GitHub Pages

The included Pages workflow builds and deploys the site after changes reach
`main`. In repository settings, choose **GitHub Actions** as the Pages source.
The workflow supplies the public Pages URL to Markloom, so project subpaths such
as `/my-website/` do not require editing Astro code.

For other static hosts, set `site.url` to the complete public root. Markloom
uses its pathname as the deployment base:

```yaml
site:
  url: https://username.github.io/my-website/
```

## First Milestone

- Versioned schemas
- Normalized content model
- Blog and project support
- Mermaid rendering with strict client-side initialization
- Minimal, Editorial, and Terminal theme tokens
- Light, dark, and system appearance handling
- Fixture-based tests
- GitHub Actions CI

## Releases

Markloom uses Conventional Commits and Release Please for automatic semantic
versioning. Successful pushes to `main` update a release PR; merging that PR
updates `package.json` and `CHANGELOG.md`, creates the version tag, and publishes
a GitHub release.

Release impact follows commit intent: `fix:` is patch, `feat:` is minor, and a
breaking-change marker is major.

## Product Direction

```bash
pnpm create markloom
markloom dev
markloom build
markloom validate
markloom migrate
markloom mcp
```

The future CLI and MCP server should be adapters over the same shared core used by Astro rendering.
See [docs/product-strategy.md](docs/product-strategy.md) for the staged product
and packaging plan.
