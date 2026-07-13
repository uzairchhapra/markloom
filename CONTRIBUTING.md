# Contributing

Thanks for helping build Markloom.

## Principles

- Keep content independent from themes.
- Keep themes independent from raw Astro content entries.
- Keep MCP and future CLI behavior independent from rendering code.
- Treat the public schema as a stable API.
- Add compatibility fixtures for public behavior changes.

## Local Checks

```bash
corepack pnpm format:check
corepack pnpm lint
corepack pnpm check
corepack pnpm test
corepack pnpm build
```

## Commits And Releases

Use Conventional Commits. Release Please maps `fix:` to a patch, `feat:` to a
minor, and commits marked with `!` or `BREAKING CHANGE:` to a major release.

After CI succeeds on `main`, Release Please opens or updates a release PR. That
PR owns the version bump and changelog; merging it creates the Git tag and
GitHub release.

The workflow uses GitHub's built-in token by default. To let CI run on
Release Please-created PRs, configure a `RELEASE_PLEASE_TOKEN` repository secret
with a fine-grained token permitted to write contents and pull requests.
