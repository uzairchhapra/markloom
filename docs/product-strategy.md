# Product Strategy

Markloom is a content-first website builder powered internally by Astro. The
standard user experience must not require editing Astro, TypeScript, package,
or workflow files.

## Product Contract

Site owners own only:

```text
markloom.yaml
content/
public/
```

Markloom owns rendering, routing, search, validation, framework configuration,
and deployment integration. The same versioned YAML and Markdown files must
power command-line, visual editor, and future CMS experiences.

## Distribution

- `markloom` will provide the engine and `dev`, `build`, `validate`, `doctor`,
  `migrate`, and deployment commands.
- `create-markloom` will generate a site through `pnpm create markloom`.
- A GitHub template will remain a secondary no-install entry point.
- Forks are for contributing to the engine, not creating user sites.
- Official themes remain bundled until the theme API is stable.

Do not publish the current repository layout directly. Before npm publishing,
packed-consumer tests must prove that the package excludes fixtures and engine
tests, creates an external site, installs cleanly, builds Pagefind, and runs the
browser suite.

## Roadmap

1. Stabilize the canonical configuration and public URL contracts.
2. Centralize project paths and reusable validation without `process.exit()`.
3. Add the `markloom` CLI over the existing engine.
4. Add the small `create-markloom` initializer package and default template.
5. Add packed-consumer and cross-platform process tests.
6. Publish npm beta releases with trusted publishing.
7. Stabilize configuration, theme, and migration contracts for 1.0.
8. Build `markloom studio` as a browser editor that writes the same YAML and
   Markdown source files.

Package SemVer tracks engine releases. `schemaVersion` changes only when the
site data format changes, and migrations must be explicit, reversible, and
documented.
