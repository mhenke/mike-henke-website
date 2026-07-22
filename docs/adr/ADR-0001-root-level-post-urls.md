# ADR-0001: Root-Level Post URLs for WordPress Migrated Content

**Status:** Accepted  
**Date:** 2025-01  
**Deciders:** Mike Henke  
**Tags:** url, seo, wordpress-migration, permalink

## Context

The site contains 385 blog posts migrated from a WordPress site that had been running since ~2009. These posts had accumulated search engine rankings, inbound links, and reader bookmarks under URLs like `https://mikehenke.com/some-post-slug/`.

The Eleventy static site needs to host these posts alongside new content. The question is: should migrated WordPress posts live under `/blog/<slug>/` (clean separation) or at the root level `/<slug>/` (preserving the existing URL structure)?

## Decision

WordPress posts are served at root-level URLs: `/<slug>/`.

The permalink is computed in `eleventyConfig.addGlobalData("eleventyComputed", ...)` in `.eleventy.js`, routing any page whose `inputPath` contains `output/posts/` to `/<slug>/`.

## Rationale

- **SEO preservation.** 385 posts with established rankings would lose link equity under a `/blog/` prefix. 301 redirects could recover it but add complexity and slight latency.
- **No brand separation needed.** A `/blog/` subdirectory makes sense for a multi-section publication. This is a personal site — the blog is the primary content, not a separate section.
- **Simplicity.** No redirect map, no .htaccess rules, no Netlify redirect logic for individual posts. The computed permalink handles everything in one place.

## Consequences

- **Positive.** Existing bookmarks continue working. No redirect maintenance. The `eleventyComputed` approach means frontmatter in each markdown file doesn't need a `permalink` field — it's automatic.
- **Negative.** The blog list page lives at `/blog/` while individual posts don't, creating a minor inconsistency: `/blog/` lists the posts, but clicking one takes you to `/<slug>/`. A "Back to Blog" link in each post mitigates this.
- **Negative.** The image path rewrite logic (`combinedImageTransform`) needs to know the post slug to generate correct absolute paths (`/<slug>/images/<name>`), which requires parsing `inputPath` — a coupling that has already caused bugs.

## Alternatives Considered

- **`/blog/<slug>/`** — Cleaner URL hierarchy, but would lose SEO equity without redirects.
- **Frontmatter `permalink` in each file** — Would work but requires adding a field to 385 markdown files. The `eleventyComputed` approach is more maintainable.
