# Recipe Importer & Web Discovery

## Discovery Pipeline

1. **Seed:** Background job pulls search results from configured APIs (Bing, SerpAPI) for trending ingredients/cuisines.
2. **Queue:** URLs inserted into `discovery_queue` with exponential backoff metadata and robots.txt compliance flag.
3. **Fetcher:** Headless request (node-fetch) with allow-listed headers, 10s timeout, 1MB payload limit. Respects robots.txt using cached policy.
4. **Cache:** Successful fetches stored in object storage (compressed) keyed by normalized URL hash.
5. **Parser:**
   - Prefer `<script type="application/ld+json">` entries containing `@type: "Recipe"`.
   - Fallback to microdata (`itemscope itemtype="http://schema.org/Recipe"`) and OpenGraph tags.
   - Site adapters (plug-ins) customize selectors for non-standard pages.
6. **Normalizer:** Maps parsed fields to internal schema, preserving original `raw_text`. Applies ingredient parsing pipeline, step cleaning, and nutrition ingestion.
7. **Preview:** Users review parsed data, adjust servings/tags, and confirm import.
8. **Persist:** Data stored in local SQLite first; sync engine propagates to cloud if enabled. `import_log` tracked for observability.

## Security Measures

- Requests executed within sandboxed worker with strict outbound allow list.
- Block inline scripts/styles from being stored; sanitize HTML fragments using DOMPurify.
- Strip query params that may contain secrets; maintain canonical URL for dedupe.
- Rate limiting per domain and per user to honor site ToS.

## De-duplication

- Canonical URL normalization removes tracking params and enforces lowercase host.
- Title + ingredient shingles hashed to detect near-duplicates (MinHash/SimHash).
- If duplicate detected, surface to user with option to update existing recipe.

## Export Formats

- **JSON:** Full recipe object including ingredients, steps, nutrition, timers.
- **Markdown:** Human-readable export with front matter.
- **PDF:** Server-side rendering via Playwright/Chromium for consistent styling.
- **Paprika:** Import existing Paprika export zip; map fields to schema.

## Timers & Media

- Timers parsed from step annotations (`{timer:PT5M}`) or recognized keywords ("Bake for 10 minutes").
- Media files downloaded asynchronously and stored via object storage; references updated post-sync.

## Error Handling

- Capture parser errors, store in `import_log.reason`.
- Expose admin dashboard for adapter health, failure rates, and pending approvals.
- Implement human-in-the-loop moderation for new site adapters before auto-enable.
