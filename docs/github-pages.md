# GitHub Pages

Markloom includes `.github/workflows/pages.yml`. It builds the site, accounts
for repository subpaths, uploads `dist/`, and deploys whenever `main` changes.

## Enable Pages

1. Push the repository to GitHub.
2. Open **Actions** and enable workflows if GitHub prompts you to do so.
3. Open **Settings > Pages**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Do not select **Deploy from a branch**; the included workflow owns the
   deployment.

For a project repository named `portfolio`, set the canonical URL in
`markloom.yaml`:

```yaml
site:
  url: https://YOUR_USERNAME.github.io/portfolio/
```

The workflow also receives the Pages URL directly from GitHub, so assets and
internal links work under `/portfolio/` without changes to Astro source files.

## Deploy

Commit content changes on a feature branch, open a pull request, and merge it
into `main`. Then open **Actions > Deploy site** and wait for both the `build`
and `deploy` jobs to pass.

The deployed URL appears in the workflow summary and under **Settings >
Pages**.

## Custom Domain

Configure the domain under **Settings > Pages > Custom domain**, then update
`site.url` to the complete HTTPS URL:

```yaml
site:
  url: https://www.example.com/
```

Follow GitHub's DNS instructions and enable **Enforce HTTPS** after the domain
is verified.

## Troubleshooting

- **404 at the site root:** confirm Pages uses **GitHub Actions**, not a branch.
- **Old content:** confirm the latest **Deploy site** run used the expected
  commit from `main`.
- **Build failure:** run `corepack pnpm validate` and `corepack pnpm build`
  locally, then inspect the first failed workflow step.
- **Broken image:** place it under `public/` and reference it from the public
  root, for example `/images/photo.jpg`.
