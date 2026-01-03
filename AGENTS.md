# Repository Guide for Contributors

Welcome! This repository hosts a Jekyll-based site. Please follow these guidelines when making changes:

## Scope
- These instructions apply to the entire repository unless a more specific `AGENTS.md` is added in a subdirectory.

## Coding and Content Style
- Keep existing front matter fields intact when editing Markdown posts or pages. Add new fields only when necessary and document their purpose.
- Prefer concise Markdown with semantic headings; avoid embedding inline HTML unless required for layout.
- For Sass/CSS changes, follow the existing naming patterns and keep variables in `_sass` organized by file purpose.

## Testing and Verification
- Before submitting changes, run a local build to ensure the site compiles: `bundle exec jekyll build`.
- For layout or style updates, visually verify the affected page(s) in a local `bundle exec jekyll serve` session.

## Git and Pull Requests
- Group related changes into a single commit with a clear message.
- PR descriptions should include:
  - A short summary of the change.
  - Notes about any user-facing impacts.
  - The tests or checks you ran (or why none were run).

Thanks for keeping the site healthy and consistent!
