# ADR-0002: Monolithic Eleventy Configuration File

**Status:** Accepted  
**Date:** 2025-01  
**Deciders:** Mike Henke  
**Tags:** config, architecture, refactoring-candidate

## Context

The `.eleventy.js` file has grown to ~860 lines and contains six distinct concerns:

1. **Performance monitoring** — build timing hooks
2. **Six content transforms** — code blocks, podcast embeds, image paths, HTML entities, URL fixes, WP shortcodes
3. **Filters** — date formatting, slugify, absolute URLs, category filtering, blog excerpts
4. **Library amendments** — markdown-it image renderer override
5. **Passthrough copy** — static assets, WordPress post images
6. **Collections** — wordpressPosts, allPosts, allCategories, postsByCategory, wordpressPages
7. **Global data** — computed permalinks, environment exposure
8. **Return config** — Eleventy options object

These concerns share an import (`require("luxon")`) and the `eleventyConfig` object, but have no runtime coupling between them. Any change — even a typo fix in a transform — requires opening an 860-line file and understanding the entire pipeline.

## Decision

Keep all configuration in `.eleventy.js` for now. Do not split into modules until a concrete need arises.

This is explicitly a **known debt** — the single file is a shallow module (its interface is "one export function" but its internal complexity requires reading the whole thing). The AGENTS.md comment on line 4-11 already flags this.

## Rationale

- **No concrete pain yet.** The file is long but navigable. The transforms are clearly labelled and sequenced. A newcomer can trace the pipeline from top to bottom without bouncing between files.
- **Extract wrong, pay twice.** A premature split into `transforms/`, `filters/`, `collections/` modules would create new files, new imports, and a new mental map — without fixing anything that's currently broken.
- **Eleventy's `addTransform(name, fn)` pattern is already a seam.** Each transform is independently testable and reorderable. Splitting files doesn't add architectural depth; the interface was already deep.
- **The real pain point is testability.** The transforms use closure variables and regex patterns that can't be unit-tested without extracting them into standalone functions. That extraction is worth doing when adding tests — but creating test files and module files at the same time is the better order.

## Consequences

- **Positive.** One file to read, one import statement. Developers familiar with Eleventy know to look at `.eleventy.js` first.
- **Negative.** Code review diffs include unrelated changes when two concerns are edited in one PR (e.g., a collection change and a transform fix).
- **Negative.** The `MAINTAINABILITY NOTE` in the file header serves as a permanent signal that this is debt — it normalizes the to-do comment being ignored.

## When to Revisit

Split `.eleventy.js` when any of these become true:

1. A third contributor joins and needs to work on transforms independently from collections.
2. A transform needs its own unit tests (extract the transform function into its own module + test file at the same time).
3. The file exceeds 1,000 lines.
4. The pipeline order becomes a source of bugs (currently it's stable but brittle — no test enforces the transform order).
