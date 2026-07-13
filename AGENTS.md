# AGENTS.md

## Project

Markloom is a Markdown-native Astro website engine. Authors work in
`content/`, `config/`, and `public/`; engine contributors work in `src/`.
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

## Verification

Run checks proportionate to the change. Before committing shared or user-facing
work, run the full local gate:

```bash
corepack pnpm format:check
corepack pnpm validate
corepack pnpm lint
corepack pnpm check
corepack pnpm test
corepack pnpm fixtures:build
corepack pnpm build
```

For UI or routing changes, also run Chromium smoke and accessibility tests:

```bash
corepack pnpm exec playwright test --project=chromium \
  tests/e2e/smoke.spec.ts tests/accessibility/home.spec.ts
```

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
