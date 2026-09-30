# Mike Henke Website — Domain Context

## Purpose

Personal portfolio and tech blog for a senior software engineer with 25+ years of experience. Static site built with Eleventy, featuring migrated blog content from WordPress, Pagefind search, and a dark terminal-native design system.

## Content Types

| Type              | Source                         | URL Pattern         | Notes                                                                                                             |
| ----------------- | ------------------------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Post**          | `output/posts/<slug>/index.md` | `/blog/<slug>/`     | Migrated WordPress content (385 posts). Frontmatter has `categories`, `date`, `tags`.                             |
| **Page**          | `output/pages/<slug>/index.md` | `/<slug>/`          | WordPress pages. **Declared but unpopulated** — `output/pages/` does not exist, so the collection resolves empty. |
| **Article**       | `articles.njk`                 | `/articles/`        | Hand-curated collection page.                                                                                     |
| **Presentation**  | `presentations.njk`            | `/presentations/`   | Conference talk listing.                                                                                          |
| **Blog index**    | `blog.njk`                     | `/blog/`            | All posts sorted by date.                                                                                         |
| **Category page** | `blog-category.njk`            | `/category/<name>/` | Filtered by `categories` field.                                                                                   |

## Key Modules

### Content Pipeline (`output/posts/`)

385 markdown files extracted from WordPress XML by `scripts/extract-wordpress-posts.mjs`. Each post gets its own directory with `index.md` and optional `images/` folder. Post URLs are served under `/blog/<slug>/`.

### Transform Chain (`.eleventy.js`, ~860 lines)

Six transforms applied in order to all HTML output:

1. **codeBlockTransform** — `[code language="x"]` → syntax-highlighted HTML with Prism classes
2. **podcastEmbedTransform** — `[podcast]` / `[embed]` → audio/video players
3. **combinedImageTransform** — Rewrites relative `images/` paths to absolute `/slug/images/` paths
4. **htmlEntityDecoder** — Decodes `&quot;` and `&#39;` outside code blocks
5. **urlFixTransform** — Fixes malformed WordPress URLs (protocol, Google Reader redirects)
6. **wordpressShortcodeProcessor** — Converts WP shortcodes to semantic HTML

### Collections (`.eleventy.js`)

- `wordpressPosts` — `output/posts/*/index.md`, sorted by date desc
- `allPosts` — Merges regular posts + WordPress posts, sorted by date desc
- `allCategories` — Unique categories from all posts
- `postsByCategory` — Posts grouped by exact category name
- `wordpressPages` — `output/pages/*/index.md`

### Template System (`_includes/`)

- **Layouts**: `base.njk` (html shell, nav, footer, scripts), `post.njk` (blog post with metadata, author bio, Disqus)
- **Macros**: `blog-card.njk`, `blog-excerpt.njk`, `category-tags.njk`, `navigation.njk`, `publish-date.njk`, `written-by.njk`
- **Partials**: `head.njk`, `navigation.njk`, `footer.njk`, scripts (core, blog, search), `disqus-config.njk`, `search-config.njk`

### Design Tokens (`DESIGN.md`)

YAML frontmatter with color palette, typography hierarchy, spacing scale, border radii, elevation shadows, and component definitions. The creative north star is "The Terminal Professional" — dark theme, single accent color (electric cyan #19d4fe).

## Architecture Vocabulary

Use these terms precisely in architecture discussions:

| Term          | Meaning                                                                                                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Module**    | A named group of code with a clear interface. Examples: The Transform Chain, the Collection definitions, the Design Token system, the Frontend Navigation module.                     |
| **Interface** | The surface area another programmer needs to understand to use a module. A shallow module has an interface nearly as complex as its implementation.                                   |
| **Depth**     | How much complexity a module hides behind its interface. The Transform Chain is deep — it hides 6 regex-heavy WordPress content fixes behind `eleventyConfig.addTransform(name, fn)`. |
| **Seam**      | A place where you could alter behavior without changing the code. Example: each transform is already a seam (independent `addTransform` call).                                        |
| **Locality**  | Whether related code lives close together. Currently low — transforms, collections, filters, and config are all in one 860-line `.eleventy.js`.                                       |
| **Leverage**  | A change that yields outsized benefit. Example: fixing the permalink logic in `eleventyComputed` fixes URL generation for all 385 posts.                                              |
| **Adapter**   | Code that wraps one system to present a uniform interface to another. The `combinedImageTransform` is an adapter between WordPress image paths and Eleventy's output structure.       |
| **Post**      | One migrated article from the ColdFusion era, authored and dated. Not a "page" — a page is structural, a post is editorial. 385 of them.                                              |
| **Page**      | A structural destination with its own template (`/blog/`, `/articles/`, `/search/`). Never carries editorial dates. `output/pages/` is currently unpopulated.                         |
| **Archive**   | The 385-post body of migrated work. Deliberately labelled archived, not current — the site presents it as a historical record, not a live publication.                                |
| **Section**   | A homepage band with one job: About, Why, Writing, Career, Education, Testimonials, Contact. The homepage is the only page composed of Sections.                                      |
| **Flag**      | A navigation destination rendered as a CLI flag (`--career`). It carries both an `sr-only` plain label and visible monospace text; the accessible name is `Career --career`.          |
| **Drawer**    | The mobile navigation surface. Distinct from the navbar: the drawer owns touch rows and focus management, the navbar owns the desktop command line.                                   |
| **Reveal**    | A scroll-triggered entrance. Exactly one exists on the site (the career timeline). Anything else animating on scroll is a defect, not a feature.                                      |
| **Category**  | A WordPress taxonomy term carried in post frontmatter, surfaced at `/category/<name>/`. Distinct from a topic tag, which is editorial and unordered.                                  |

## Design Decisions (ADRs in `docs/adr/`)

1. **Post URLs live under `/blog/<slug>/`** — WordPress posts route to `/blog/<slug>/`. `.eleventy.js` computes this in `eleventyComputed.permalink`. Settled 2026-09-30: `ADR-0003` supersedes `ADR-0001`, which had recorded the opposite decision.
2. **No markdown image transform** — Image rewriting happens in `combinedImageTransform` (on HTML output) and through the markdown-it image renderer override in `amendLibrary("md", ...)`.
3. **`eleventyComputed` for permalink** — WordPress post permalinks are computed in `eleventyConfig.addGlobalData("eleventyComputed", ...)` rather than in frontmatter.
4. **Earliest Node 18** — Project is pinned to Node 18.20.5 via Volta.
5. **Single config file** — All Eleventy configuration lives in `.eleventy.js`. This is a known shallow module ripe for deepening.
