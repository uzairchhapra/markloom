# Security

Markloom is static-first and should not require runtime network access, API keys, authentication, a database, or a backend server.

## Defaults

- Mermaid is initialized with `securityLevel: "strict"`.
- Future MCP write tools must validate structured input and restrict writes to approved content directories.
- Markdown rendering must not introduce arbitrary script execution.
- Production builds should fail on invalid public content.

## Reporting

Please report security issues privately to the maintainers before public disclosure.
