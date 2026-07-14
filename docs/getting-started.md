# Getting Started

Markloom currently runs as a complete repository. Fork
[`uzairchhapra/markloom`](https://github.com/uzairchhapra/markloom), then clone
your fork:

```bash
git clone git@github.com:YOUR_USERNAME/markloom.git my-site
cd my-site
nvm install
nvm use
corepack enable
corepack pnpm install
corepack pnpm dev
```

Open `http://localhost:4321`.

## Configure The Site

Edit `markloom.yaml`:

```yaml
schemaVersion: 1

site:
  title: Jane Doe
  description: Designer and engineer building useful digital products.
  url: https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/
  language: en
  theme: minimal
  author: Jane Doe

navigation:
  items:
    - label: Projects
      href: /projects/
    - label: Writing
      href: /blog/
    - label: About
      href: /about/

social:
  links:
    - label: GitHub
      href: https://github.com/YOUR_USERNAME

theme:
  appearance: system
  accent: "#c3382e"
```

Valid themes are `minimal`, `editorial`, and `terminal`. Appearance can be
`light`, `dark`, or `system`.

## Replace The Example

- Edit the homepage in `content/home/index.md`.
- Replace `content/authors/john-doe.md` with your author file.
- Add pages, projects, and posts under their matching `content/` directories.
- Remove example entries you do not want.
- Put static assets in `public/`.

Author IDs come from filenames. For example, an author stored at
`content/authors/jane-doe.md` is referenced by `jane-doe` in blog frontmatter.

See [Content](content.md) for ready-to-use frontmatter examples.

## Check The Site

```bash
corepack pnpm validate
corepack pnpm build
corepack pnpm preview
```

`validate` checks configuration before deployment. `build` creates the static
site and search index in `dist/`. `preview` serves that production build
locally.

## npm Status

The current `package.json` is private because Markloom does not yet expose a
stable package API or CLI. Do not add `markloom` to another project's
dependencies. Until a public package is announced, use the repository workflow
described above.

Next: [deploy the site to GitHub Pages](github-pages.md).
