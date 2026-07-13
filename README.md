# Markloom

**Beautiful websites, woven from Markdown.**

Markloom builds complete websites from Markdown. Write content in `content/`, configure behavior in `config/`, add static assets in `public/`, and generate a polished Astro static site.

## Status

This repository is the first production-oriented scaffold for the Markloom engine. It establishes the public content contract, normalized internal models, a Minimal theme, Mermaid rendering, fixture hooks, tests, and CI.

## Included Example

The root site is a complete fictional portfolio for **John Doe**, an independent product engineer. It demonstrates a home page, project case studies, work experience, writing, an about page, search, theme switching, and responsive layouts using only the public `content/`, `config/`, and `public/` authoring surface.

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
- `config/`
- `public/`

Engine and theme contributors work in `src/`.

## Project Structure

```text
config/              Global YAML configuration
content/             Markdown and MDX content
fixtures/            Compatibility fixture websites
public/              Static files copied into the build
src/config/          Config loading and validation
src/core/            Framework-neutral business logic
src/schema/          Versioned public schemas and normalization
src/themes/          Theme contract and theme CSS
tests/               Unit, contract, accessibility, e2e, and visual tests
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

## Future CLI

```bash
pnpm create markloom
markloom dev
markloom build
markloom validate
markloom migrate
markloom mcp
```

The future CLI and MCP server should be adapters over the same shared core used by Astro rendering.
