# ADR-0003: Supersede ADR-0001, Post URLs Stay Under /blog/

**Status:** Accepted
**Date:** 2026-09-30
**Deciders:** Mike Henke
**Tags:** url, seo, supersedes, permalink
**Supersedes:** `ADR-0001-root-level-post-urls.md`

## Context

`ADR-0001` (Accepted, 2025-01) records a deliberate decision: WordPress posts are served at root-level `/<slug>/`. Its stated rationale was SEO preservation for 385 posts with established rankings and inbound links, on the grounds that 301 redirects would be an acceptable but inferior alternative.

The code disagrees. `.eleventy.js` computes permalinks in `eleventyComputed.permalink` and returns `/blog/${postSlug}/`, with an inline comment stating the intent: "route them under /blog/". The built output confirms `/blog/<slug>/` for all 385 posts, and no root-level post directories exist.

`_redirects` also records that the original root-level arrangement was deliberately retired: "The old `/blog/:post/` → `/:post/` redirect is removed to avoid loops."

So the repository has carried an accepted ADR describing a decision the code had already reversed, for an unknown period.

## Decision

Post URLs remain at `/blog/<slug>/`. ADR-0001 is superseded.

Mike confirmed this directly on 2026-09-30: "stay with /blog/slug".

## Rationale

- **The migration already happened and is deliberate.** `_redirects` shows a prior redirect was added and then removed specifically to avoid loops. That is the signature of a considered change, not a slip.
- **The blog index and posts now agree.** Under ADR-0001 the site had an inconsistency it documented as a downside: `/blog/` listed the posts while individual posts lived elsewhere. The current arrangement removes that mismatch.
- **Post URLs being moved is not the same as link equity being lost.** `_redirects` retains a 301 for the category path, and the site is a personal portfolio whose archive is explicitly labelled as historical. The SEO argument in ADR-0001 was about preserving accumulated rankings; that consideration applies with much less force to an archive presented as a record rather than an active publication.

## Consequences

- **Positive.** The architecture record matches the code. A future maintainer reading `docs/adr/` no longer has to discover the contradiction empirically.
- **Negative / unresolved.** ADR-0001's SEO rationale was never revisited when the code moved. If inbound links to the old root-level URLs exist, they are not covered by a redirect today. This is a known, accepted gap, recorded here rather than left implicit. A blanket 301 map from `/<slug>/` to `/blog/<slug>/` would be worth adding if search-console data shows meaningful legacy traffic.
- **Negative.** Reading `docs/adr/` requires noticing supersession. This file is named to sort after 0001 and states its supersession in the header.

## Alternatives Considered

- **Revert the code to root-level.** Rejected. It would restore the `/blog/`-index-versus-root-post inconsistency and undo a deliberate change, in order to honour a record that has already been overtaken.
- **Leave ADR-0001 untouched and rely on CONTEXT.md to correct it.** Rejected. An accepted ADR that states the opposite of the shipped behaviour is a trap for the next reader, including agents.
- **Add a redirect map for the old root-level URLs.** Deferred, not rejected. Depends on traffic data this repo does not have.
