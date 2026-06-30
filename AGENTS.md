# AGENTS.md

## Project Overview

Eleventy (11ty) static site with Nunjucks templates, WordPress migration content, and Pagefind search.

## Developer Commands

| Command                    | Purpose                                  |
| -------------------------- | ---------------------------------------- |
| `npm run dev`              | Dev server with watch mode               |
| `npm run dev:search`       | Dev server + Pagefind indexing           |
| `npm run build`            | Production build + search index          |
| `npm run build:dev`        | Dev build (no search index)              |
| `npm run build:production` | Prod build (no search index, quiet mode) |
| `npm run search:index`     | Generate Pagefind index for `_site/`     |
| `npm run validate`         | ESLint + Prettier check                  |
| `npm run css:cleanup`      | PurgeCSS cleanup                         |
| `npm run lint:fix`         | Auto-fix ESLint issues                   |

## Architecture

- **Input**: Root directory (`dir.input = "."`)
- **Output**: `_site/`
- **Templates**: `_includes/` (Nunjucks `.njk`)
- **Data**: `_data/`
- **WordPress posts**: `output/posts/[slug]/index.md` — served at `/[slug]/` (root level, not `/blog/`)
- **Regular posts**: `posts/*.md`
- **Post images**: `output/posts/[slug]/images/` → copied to `[slug]/images/` in output

## Key Collections

- `wordpressPosts` — migrated WordPress content only
- `allPosts` — regular + WordPress posts combined, sorted by date
- `postsByCategory` — posts grouped by category (categories preserved as-is)
- `allCategories` — all unique categories

## WordPress Content Pipeline

The `.eleventy.js` config applies multiple transforms (in order):

1. `codeBlockTransform` — `[code language="lang"]` → syntax-highlighted HTML
2. `podcastEmbedTransform` — `[podcast]` and `[embed]` → audio/video players
3. `combinedImageTransform` — rewrites `images/` paths for posts
4. `htmlEntityDecoder` — decodes `"`, `'` outside code blocks
5. `urlFixTransform` — fixes malformed WordPress URLs
6. `wordpressShortcodeProcessor` — converts WP shortcodes to semantic HTML

## Pre-commit Hooks

Husky + lint-staged runs on staged files:

- `*.{js,css,md,json}` → Prettier write
- `*.js` → ESLint fix

## Important Quirks

- Blog post URLs are root-level (`/post-slug/`) — this is intentional, not `/blog/`
- Images in WordPress posts use relative `images/` paths that get rewritten to absolute
- Categories are preserved exactly as written (no slug transformation in `postsByCategory`)
- `docs/**` is ignored to prevent instruction files from being processed as templates
- Production builds run in quiet mode (no build output)
- Node 18.20.5 required (Volta pinned)

## Reference

- Full Eleventy config: `.eleventy.js` (850 lines — many content transforms)
- Site data: `_data/site.json`
- Existing project context: `CLAUDE.md`
