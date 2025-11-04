## Acceptance Criteria

- **Schema-first imports:** Successfully ingest recipes via JSON-LD/microdata from at least 10 popular sites, with custom adapters covering 3 schema-deficient domains.
- **Grocery normalization:** Merge grocery items originating from three distinct recipes; unit conversion must consolidate quantities correctly while preserving notes.
- **Ingredient recommendations:** Pantry coverage scoring surfaces the top 5 recipe suggestions when ≥60% of required ingredients are available locally.
- **Planner round trip:** Generating a grocery list from planner selections is deterministic; repeated runs yield identical results unless source data changes.
- **Offline resilience:** Users can create and edit recipes, pantry items, and lists offline; queued changes sync without conflict when connectivity returns.
- **Respect robots.txt:** Discovery crawler honors robots directives; logs contain no requests to disallowed paths.

## Nice-to-Haves

- Barcode scanning for pantry intake using Expo Camera and device ML.
- Optional public recipe sharing via unlisted, user-controlled links.
- Meilisearch-backed fuzzy search for rapid discovery.
- Passkey/WebAuthn authentication flows alongside traditional credentials.
- Multi-profile (household) support with shared yet scoped recipe and pantry access.
