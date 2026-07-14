# Security Policy

## Report A Vulnerability

Do not open a public issue for a suspected vulnerability.

Use the repository's **Security > Report a vulnerability** form to send a
private security advisory. Include the affected version, reproduction steps,
impact, and any suggested mitigation.

Maintainers will acknowledge the report, assess severity, and coordinate a fix
and disclosure timeline with the reporter.

## Supported Versions

Security fixes target the latest released version. Upgrade to the newest
release before reporting an issue that may already be resolved.

## Automated Checks

- CodeQL scans JavaScript and TypeScript changes.
- Dependency Review blocks pull requests that introduce known vulnerabilities.
- Dependabot monitors npm packages and GitHub Actions for security and version
  updates.

## Security Defaults

- Mermaid runs with strict security settings.
- Production builds reject invalid public configuration and content.
- Markloom does not require runtime secrets, authentication, a database, or a
  backend server.
