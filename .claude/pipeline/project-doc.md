# Project Documentation

> Generated: 2026-09-30 | Mode: FULL

## Tech Stack

- **Runtime:** Node.js 18.20.5 (Volta-pinned), npm 10.8.2
- **Language:** JavaScript (Node + browser ES2015+), Nunjucks templates, CSS
- **Framework:** Eleventy (11ty) v3.1.6 — static site generator
- **Database:** None. Content is file-based (markdown + JSON)
- **Styling:** Single hand-authored stylesheet, `styles.css` (3,024 lines), driven by 100 CSS custom properties
- **State Management:** None. Static HTML + progressive-enhancement browser JS

## Dependencies

**Core (all `devDependencies` — the site has zero runtime npm deps; everything ships as static output):**

| Package                    | Version | Role                               |
| -------------------------- | ------- | ---------------------------------- |
| `@11ty/eleventy`           | ^3.1.6  | Static site generator              |
| `pagefind`                 | ^1.5.2  | Client-side search index + runtime |
| `luxon`                    | ^3.7.2  | Date formatting in filters         |
| `eleventy-plugin-purgecss` | ^0.6.0  | CSS tree-shaking                   |

**Dev / tooling:** `eslint` ^10.6.0 + `@eslint/js` + `globals`, `prettier` ^3.9.4, `husky` ^9.1.7 + `lint-staged` ^17.0.8, `cross-env`, `concurrently`, `glob`.

**Testing: none installed.** No test runner, no test directory. `npm test` is a stub: `echo "Add tests here" && exit 0`.

## Architecture Pattern

**Build-time content transformation (Compile → Transform → Emit).** Not an SPA, not SSR. The entire site is pre-rendered to `_site/`, then enhanced in the browser.

Three stages:

1. **Extract** — `scripts/extract-wordpress-posts.mjs` parses the WordPress XML export into `output/posts/<slug>/index.md`. Runs as `prebuild`/`dev` prerequisite.
2. **Transform** — `.eleventy.js` registers six ordered Eleventy transforms that repair WordPress-authored content during the build. This is the project's defining concern: the content was authored 2007–2014 in a different CMS and needs sanitising at build time, not at runtime.
3. **Index** — Pagefind crawls `_site/` post-build to produce a client-side search index.

The site is a personal portfolio whose front page is hand-authored HTML (`index.html`, not a template), with the blog and archive pages generated from templates.

## Folder Structure

```
/
├── index.html              Homepage — hand-authored, front-matter only
├── 404.njk                 404 page
├── blog.njk …              Page templates (blog, search, articles, presentations, …)
├── styles.css              THE stylesheet — 3,024 lines, 100 design tokens
├── .eleventy.js            All config + 6 transforms + collections (857 lines)
├── .eleventyignore         Build exclusion list (critical — see AGENTS.md)
├── js/                     Browser JS: core.js (nav/motion), search.js
├── assets/                 Static assets: fonts (self-hosted woff2), css, js, images
├── _data/                  site.json / site.js / search.json — template data
├── _includes/              23 Nunjucks templates
│   ├── layouts/            base.njk (html shell), post.njk
│   ├── macros/             Reusable: navigation, blog-card, written-by, …
│   └── partials/           head, navigation, footer, script includes
├── output/posts/           385 generated WordPress posts (gitignored)
├── docs/adr/               Architecture Decision Records
├── scripts/                WordPress extractor, PurgeCSS cleanup
└── _site/                  Build output (gitignored)
```

## Code Style Conventions

**CSS — token-driven, strictly enforced.**

- 100 custom properties on `:root`; 794 `var(--…)` usages
- Only 16 hex literals in the whole file, all inside `:root`
- **DO** reference `var(--token)`. A literal colour outside `:root` is a review failure.
- Tokens follow BEM-ish semantic naming: `--color-*`, `--spacing-*`, `--font-size-*`, `--transition-*`, `--shadow-*`, `--border-radius-*`
- Fluid `clamp()` throughout; breakpoints at 480/600/767/1023/1200px

**JavaScript — vanilla, no framework.**

- IIFE + `DOMContentLoaded`; no modules, no bundler, no build step for JS
- Mixed `const`/`let` (13) and `var` (24) — `var` dominates in older functions, `const` in newer code
- `requestAnimationFrame` and `IntersectionObserver` for motion; `{ passive: true }` on scroll listeners
- Prettier-formatted, ESLint-clean

**Nunjucks.** Macros in `_includes/macros/` for anything reused ≥2×. Partials for shell chrome. No inline logic in templates beyond conditionals.

## Modularity Practices

- **Transforms are the seam.** Each of the six transforms is an independent `addTransform(name, fn)` call — independently testable and reorderable.
- **Macros** are the reuse unit for templates; `written-by.njk` and `navigation.njk` are used across every page type.
- **Conditional script loading** in `base.njk` gates Prism to post pages, Pagefind to `/search/` only.
- **Known debt (ADR-0002):** `.eleventy.js` is a deliberate single file. It is long but not urgent to split — the `addTransform` pattern already provides the seam.

## Data Architecture

No database, no ORM, no entities.

- **Content:** 385 markdown files, one directory per post, front-matter carries `title`, `date`, `categories`, `tags`, `description`
- **Site config:** `_data/site.json` (title, description, url)
- **Derived data:** Eleventy collections — `wordpressPosts`, `allPosts`, `postsByCategory`, `allCategories`, `wordpressPages`
- **Search:** Pagefind builds a static JSON index at build time; queries run fully in-browser. No server, no API.
- **Comments:** Disqus (third-party embed, blog posts only)

## Cross-Cutting Concerns

- **Auth/authz:** None. Fully public static site.
- **Error handling:** Build-time transforms fail loudly by throwing. Browser JS uses `console.error` and early returns on missing elements — no error boundaries exist because there is no framework.
- **Logging:** Eleventy build timing logged via `eleventy.before`/`after` hooks in dev only.
- **Validation:** None at runtime. Content correctness depends on the extractor and transforms.
- **Accessibility:** Strong and actively maintained — skip links, focus trap in the mobile drawer, `inert` on the closed drawer, `prefers-reduced-motion` honoured in both CSS and JS, axe-core clean at 0 violations. All interactive targets ≥44px.
- **No-JS resilience:** Scroll-reveal pre-states are gated behind a `.js-animate` class added by JS, so a failed or blocked script leaves content visible rather than blanking sections.

## Service Communication

**None.** No API, no server, no client-side data fetching.

Third-party origins contacted at runtime:

- `fonts.googleapis.com` / `fonts.gstatic.com` — Geist
- `unpkg.com` — Phosphor Icons
- `cdnjs.cloudflare.com` — Prism (post pages only)
- `mikehenke.disqus.com` — comments (post pages only)

Self-hosted, no CDN: Source Serif 4 woff2 files in `assets/fonts/`.

## Test Coverage

- **Overall coverage: 0%.** No test framework is installed and no test files exist.
- **Testing framework:** none
- **`npm test` is a stub** that always exits 0 — it will not catch a regression.
- **Untested areas (everything):** the six build transforms, collections, permalink logic, all browser JS (nav trap, dropdown, search), and template rendering.
- **Actual verification is manual** — build the site, serve it, and drive it in a browser.

## Entry Points

| File                                  | Role                                                                 |
| ------------------------------------- | -------------------------------------------------------------------- |
| `.eleventy.js`                        | Config entry — transforms, collections, filters, computed permalinks |
| `index.html`                          | Homepage source                                                      |
| `styles.css`                          | Single stylesheet; design tokens at `:root`                          |
| `js/core.js`                          | Nav, mobile drawer, scroll reveals, back-to-top                      |
| `js/search.js`                        | Pagefind search UI                                                   |
| `scripts/extract-wordpress-posts.mjs` | WordPress XML → `output/posts/`                                      |
| `.eleventyignore`                     | Build exclusions — **security-relevant**, see AGENTS.md              |
| `_data/site.json`                     | Site title/description/URL                                           |

## Last Scanned

2026-09-30T00:00:00Z
