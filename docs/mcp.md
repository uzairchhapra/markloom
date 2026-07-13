# MCP Architecture

MCP is a future optional adapter over Markloom's shared validated core.

It must not be required for normal site usage or static builds.

Initial read-only tools should include:

- `inspect_site`
- `list_content`
- `get_content`
- `validate_site`
- `list_themes`
- `check_links`
- `get_build_status`

Write tools must validate structured input, prevent path traversal, restrict writes to approved directories, preserve unrelated content, revalidate the project, and report changed files.
