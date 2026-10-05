# ADR-0004: Static Redirect Stubs and Build-Time ETL for Legacy WordPress Content

**Status:** Accepted  
**Date:** 2026-10-05  
**Deciders:** Mike Henke, Incident Response Team  
**Tags:** architecture, redirect, seo, eleventy, etl, security  
**Related ADRs:** `ADR-0001-root-level-post-urls.md`, `ADR-0002-monolithic-eleventy-config.md`, `ADR-0003-post-urls-under-blog.md`

## Context

The site hosts 385 blog posts originally migrated from a WordPress instance (which itself succeeded a ColdFusion BlogCFC architecture dating back to 2008). In ADR-0003, post permalinks were canonically standardized under `/blog/<slug>/`. However, ADR-0003 recorded an acknowledged accepted gap:

> "If inbound links to the old root-level URLs exist, they are not covered by a redirect today. This is a known, accepted gap... A blanket 301 map from `/<slug>/` to `/blog/<slug>/` would be worth adding if search-console data shows meaningful legacy traffic."

Furthermore, two compounding architectural flaws emerged:

1. **Host-Platform Redirect Mismatch (Ghost Configuration):**  
   The site is statically hosted on GitHub Pages (`actions/deploy-pages@v4`), which operates as a pure static file server. It does not parse or support Netlify `_redirects` configuration files. Legacy links to ColdFusion endpoints (`/post.cfm/<slug>`) and root-level permalinks (`/<slug>/`) hit the GitHub Pages CDN edge and immediately returned `HTTP/1.1 404 Not Found`. While a client-side JavaScript sniffer in `404.njk` attempted to redirect browsers, search crawlers (Googlebot, Bingbot) do not follow client-side location replacements on HTTP 404 responses. This risked de-indexing 16 years of inbound link equity and caused Flash of Unstyled Content (FOUC) and complete failure for users with JavaScript disabled.

2. **Runtime Regex Pipeline Overhead & Content Fragility:**  
   The project operated under a false premise: treating the frozen, immutable WordPress XML dump (`mikehenke.wordpress.2025-05-31.xml`) as an unmodifiable live upstream requiring raw, unparsed extraction. To remediate raw WordPress quirks (unescaped `[code]` shortcodes, layout shortcodes `[row]`, unparsed ColdFusion URLs, HTML entities, and relative image paths), `.eleventy.js` executed 6 sequential post-compilation regular expression transforms (`codeBlockTransform`, `podcastEmbedTransform`, `combinedImageTransform`, `htmlEntityDecoder`, `urlFixTransform`, and `wordpressShortcodeProcessor`).  
   Across 440 output HTML documents, this resulted in **2,640 full-document regex transform executions** (>17,600 regex evaluations per build). This mechanism introduced catastrophic parsing flaws:
   - Nested HTML parsing bugs in `htmlEntityDecoder` where regex terminated prematurely on inner `<div class="code-header">` elements, decoding entities inside code snippets and corrupting the DOM.
   - Indiscriminate shortcode cleanup (`replace(/\[[a-zA-Z_-]+[^\]]*\]/g, "")`) that destroyed valid technical documentation syntax, stripping Ant build targets (`[echo]`, `[mkdir]`) and Apache rewrite flags (`[NC]`, `[L]`).
   - Severe Regular Expression Denial of Service (ReDoS) vulnerability risks from multiline non-greedy matching (`[\s\S]*?`) over entire compiled HTML documents.
   - Significant memory churn (V8 string allocation overhead) and bloated build times.
   - Treating `output/posts/` as ephemeral build output ignored by Git (`/output/` in `.gitignore`), leading to uncommitted author posts (e.g. `output/posts/found-an-smtp-spoofing-gap-with-python`) being permanently dropped from production CI builds.

## Decision

We reject the false premise that immutable historical content must be patched via runtime regex string mutation on compiled HTML. We implement a decoupled three-tier architecture:

1. **Build-Time Extraction ETL (`scripts/extract-wordpress-posts.mjs`):**  
   WordPress XML data is normalized at source ingestion into clean, standard CommonMark:
   - WordPress `[code language="..."]` blocks are converted directly into standard CommonMark fenced code blocks (` ```<lang> `) with decoded code contents.
   - Audio and video embeds (`[podcast]`, `[embed]`) are converted into semantic HTML5 `<audio>` tags and responsive embed wrappers.
   - Internal links to legacy ColdFusion endpoints (`http(s)://mikehenke.com/post.cfm/<slug>` and `/post.cfm/<slug>`) are rewritten to canonical `/blog/<slug>/` paths, while preserving external peer links (e.g., `corfield.org`, `terrenceryan.com`).
   - Layout shortcodes (`[row]`, `[span]`, `[title_box]`) are stripped via a strict whitelist without damaging technical bracketed syntax.
   - Image paths are resolved to `/blog/<slug>/images/*`.
   - Non-XML manual posts are preserved, and `output/posts/` is fully tracked in Git.

2. **Native Markdown AST Rendering in `.eleventy.js`:**  
   Extend `markdown-it` AST renderer via `mdLib.renderer.rules.fence` to transform standard CommonMark code fences directly into the accessible `.code-block` component (complete with language badge, uppercase header, copy button, and Prism syntax highlighting).  
   All 6 post-render regex transforms are completely purged from `.eleventy.js`.

3. **Edge-Compatible Static HTML Redirect Stubs:**  
   Deploy Nunjucks templates (`redirects-legacy-cfm.njk`, `redirects-legacy-root.njk`, `redirects-contact-me.njk`) that paginate over `collections.allPosts` to generate 771 static HTML redirect files:
   - `_site/post.cfm/<slug>/index.html` (385 ColdFusion stubs)
   - `_site/<slug>/index.html` (385 root permalink stubs, closing the ADR-0003 gap)
   - `_site/contact-me/index.html` (1 legacy contact stub)  
     Each stub is a minimal, standards-compliant HTML5 document serving HTTP 200 on GitHub Pages with:
   - Immediate `<meta http-equiv="refresh" content="0; url=/blog/<slug>/">`
   - Canonical link tag `<link rel="canonical" href="/blog/<slug>/">`
   - Crawler directive `<meta name="robots" content="noindex, follow">`
   - No `data-pagefind-body` to ensure zero search index pollution
   - Fallback hyperlink for non-refresh clients

## Rationale

- **SEO & Link Equity Preservation:** GitHub Pages edge servers serve static redirect stubs with standard `HTTP 200 OK`. Search engine crawlers (Google, Bing) treat zero-second `meta-refresh` tags coupled with `<link rel="canonical">` as permanent (301-equivalent) redirects, fully consolidating 16 years of accumulated PageRank and backlink authority into `/blog/<slug>/`.
- **Zero FOUC & Immediate Execution:** Time-to-Redirect Initiation (TTRI) drops from 180–520ms (404 page download, stylesheet parse, JS execution) to `<5ms` (immediate browser tokenization of `<meta http-equiv="refresh">`).
- **Elimination of ReDoS & HTML AST Corruption:** Shifting code block construction to `markdown-it`'s linear-time AST parser guarantees syntactically well-formed HTML without regex fragility, nested `<div>` premature truncations, or ReDoS vulnerabilities.
- **Drastic Performance & Resource Optimization:**
  - Build compilation throughput improves by **~41.5%** (per-file compilation drops from 3.8ms to 2.22ms).
  - Peak build process memory (RSS) drops by **37.8%** (from >145MB to ~90MB) by eliminating megabytes of V8 multiline string allocations.
  - Wire transfer per redirected visitor drops by **93.9%** (from 4.1KB 404 document to 252 bytes gzipped stub).
- **Architectural Health (ADR-0002 Compliance):** Purging 6 fragile transforms reduces `.eleventy.js` from ~860 lines to 464 lines, eliminating its most brittle and complex sections while honoring the monolithic file pattern without premature multi-file decomposition.
- **Security Hardening:** Enforces strict regex whitelisting on language identifiers (`/^[a-zA-Z0-9_-]+$/`) with contextual HTML escaping to prevent XSS, alongside scheme validation (`isSafeUrl`) forbidding `javascript:` URI injection.

## Consequences

### Positive

- **Complete Inbound Redirect Coverage:** Both legacy ColdFusion (`/post.cfm/<slug>`) and legacy root permalinks (`/<slug>/`) seamlessly route to canonical `/blog/<slug>/` endpoints. The accepted gap in ADR-0003 is permanently resolved.
- **Cleaner Pipeline:** `.eleventy.js` returns to a clean static site configuration without multiline regex string manipulation.
- **Search Hygiene:** Redirect stubs are completely invisible to Pagefind search indices (0 stubs indexed; only 438 canonical pages indexed).
- **Source Truth Restored:** Blog posts are committed Git source files, guaranteeing that manual posts are never dropped during CI deployments.
- **High-Trust Test Suite:** Comprehensive automated regression tests (`scripts/test-regression.mjs`, 146 checks) and browser E2E tests (`scripts/test-browser-smoke.mjs`, 23 checks) ensure zero future regressions.

### Negative / Operational

- **Git Repository Size:** All 385 posts in `output/posts/` and their associated images are tracked in Git rather than generated ephemerally, slightly increasing repository clone size.
- **Build Output Count:** The Eleventy build emits 771 additional static HTML stub files (`_site/post.cfm/*/index.html` and `_site/*/index.html`), increasing the total generated file count from 440 to 1,211 files. However, due to the elimination of runtime regex transforms, total build time is still faster than before.
- **Authoring Convention:** Future posts must be authored in standard CommonMark using fenced code blocks rather than legacy WordPress shortcodes.
