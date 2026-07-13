# AGENTS.md

## Project

Markloom is a Markdown-native Astro website engine. Authors work in
`markloom.yaml`, `content/`, and `public/`; engine contributors work in `src/`.
Keep those two surfaces separate so a site can upgrade without rewriting its
content.

The root site is the canonical John Doe portfolio example. Compatibility
fixtures under `fixtures/` exercise other supported site shapes and themes.

## Environment

- Use the Node version in `.nvmrc`.
- Use Corepack and pnpm; do not introduce another package manager or lockfile.
- Install with `corepack pnpm install`.
- Run project tools through `corepack pnpm <script>`.
- Do not edit generated output in `dist/`, `dist-fixtures/`, `.astro/`,
  `.markloom-cache/`, `playwright-report/`, or `test-results/`.

## Architecture

- `src/schema/`: versioned public schemas and normalized internal models.
- `src/core/`: framework-light publishing, URL, content, and Mermaid logic.
- `src/config/`: validated YAML configuration loading.
- `src/themes/`: theme tokens and theme-specific CSS.
- `src/components/` and `src/layouts/`: shared rendering primitives.
- `src/pages/`: Astro route adapters over normalized content.
- `scripts/`: validation and fixture build tooling.
- `tests/`: unit, contract, browser, accessibility, and visual coverage.

Keep publishing rules out of page components. Themes should consume normalized
models instead of raw content entries. Future CLI and MCP adapters must reuse
the same core logic as the Astro renderer.

`markloom.yaml` is the canonical configuration source. Split files under
`config/` are a schema version 1 compatibility surface and must not become a
second source of truth.

## Editing Rules

- Preserve schema version `1` compatibility unless a change explicitly adds a
  new schema version and migration path.
- Add or update a fixture when changing public content, configuration, routing,
  or theme contracts.
- Use structured YAML and frontmatter parsers; do not parse them with string
  slicing or regular expressions.
- Keep content examples fictional and internally consistent.
- Maintain responsive layouts, visible keyboard focus, reduced-motion support,
  and WCAG AA contrast.
- Keep changes scoped. Do not rewrite unrelated user work in a dirty tree.

## Git Workflow

- Never work or commit directly on `main`. Before editing, confirm the current
  branch and create or switch to a focused feature branch when needed. Codex
  branches must use the `codex/` prefix.
- Never push directly to `main`. Push the feature branch and merge changes only
  through a pull request.
- Keep each branch focused on one coherent change and bring it up to date with
  `main` before opening or updating its pull request.
- Use the pull request template and complete every applicable checklist item.

## Verification

Before every commit, kick off a dedicated verification subagent to run the full
local gate from the current working tree. The primary agent must not commit
until that subagent reports every command passing. If subagent tooling is
unavailable, stop and tell the user instead of bypassing this requirement.

The verification subagent must run:

```bash
corepack pnpm format:check
corepack pnpm validate
corepack pnpm lint
corepack pnpm check
corepack pnpm test
corepack pnpm fixtures:build
corepack pnpm build
corepack pnpm test:e2e --project=chromium
```

The primary agent may run targeted checks while implementing, but those checks
do not replace the independent pre-commit subagent run. Fix every failure and
restart the complete subagent verification before committing.

## Commits And Releases

Use Conventional Commits:

- `fix:` produces a patch release.
- `feat:` produces a minor release.
- `type!:` or a `BREAKING CHANGE:` footer produces a major release.
- `docs:`, `test:`, `chore:`, `ci:`, and `style:` do not release by default.

Keep subjects imperative and concise. Explain only non-obvious reasons,
migrations, security impact, or breaking changes in the body.

Release Please runs on successful pushes to `main`. It owns release PRs,
`package.json` version bumps, `CHANGELOG.md`, tags, and GitHub releases. Do not
manually change release artifacts in ordinary feature or fix commits.
