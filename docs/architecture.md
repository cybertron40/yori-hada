# Recipe Atlas Architecture Overview

## High-Level Goals

- **Local-first:** SQLite-backed canonical store on every client with deterministic sync to Postgres.
- **Privacy-preserving:** Support local-only vaults, end-to-end encryption for cloud sync, opt-in telemetry.
- **Offline-first UX:** All core flows operate without network access; background schedulers push/pull changes.
- **Cross-platform parity:** Shared TypeScript domain layer, platform-specific shells (Next.js, Expo, Tauri).

## System Components

| Layer | Responsibilities | Key Tech |
| --- | --- | --- |
| Clients | Web, Android, Windows desktop experiences | Next.js App Router, Expo Router, Tauri 1.x |
| Shared UI | Consistent design system (shadcn/ui + Tailwind tokens) | `packages/ui` |
| Domain/Core | Types, validators, sync primitives, business rules | `packages/core`, Zod |
| Data Layer | Drizzle schema, SQLite/Postgres adapters, sync engine | `packages/db` |
| Services | Auth, discovery crawler, nutrition enrichment, background jobs | `packages/scraper`, Next.js server actions, QStash cron, Supabase/Fly.io |
| Tooling | CLI utilities, migrations, seeding, CI/CD | `packages/scripts`, GitHub Actions |

## Data Flow

1. **Mutation:** Client writes to local SQLite through domain services → change log entry recorded with `client_id`, `updated_at`, payload diff.
2. **Sync enqueue:** Change log stored locally; background worker (React Query mutation queue) triggers upload when connectivity rules satisfied.
3. **Server merge:** Next.js server action validates payload, applies to Postgres via Drizzle, persists change with authoritative timestamp and `client_id`. Conflict detection produces per-field resolution summary.
4. **Downstream sync:** Server broadcasts change digest via SSE/WebSocket. Clients pull diff, apply to local SQLite, update change log checkpoints.
5. **Backups:** User-triggered export packages local DB + assets into encrypted ZIP, optionally uploads to object storage.

## Sync & Conflict Resolution

- Tables include `updated_at` + `client_id` columns for LWW semantics.
- Field-level merges for structured entities (e.g., ingredient arrays) using deterministic patch operations.
- Conflict surfaces via UI banner linking to diff viewer when simultaneously edited since last sync checkpoint.
- `sync_change` table maintains audit trail for replay/debugging.

## Security Posture

- Secrets managed via platform secure storage, server uses hashed passwords (Argon2id), NextAuth session JWTs with rotation.
- Optional E2E encryption with libsodium: per-user `vault_key` derived from passphrase, stored locally only; server stores encrypted blobs.
- Scraper sandbox with request timeouts, content-type checks, robots.txt parser, allow/deny lists.
- Postgres RLS ensures tenant isolation; audit logs for administrative access.

## Feature Modules

### Recipes
- CRUD + scaling + timers per step.
- Import pipeline: `fetch → parse → normalize → preview → persist` with site adapters.
- Attachments stored in object storage with signed URLs.

### Grocery & Pantry
- Ingredient normalization maps raw strings to canonical units.
- Grocery merge service deduplicates by canonical ingredient key (`ingredient_id + unit`), sums quantities, retains notes.
- Pantry decrement integrates with planner completion events.

### Planner
- Calendar grid views (day/week/month) with drag-drop on web/desktop, reorder gestures on mobile.
- ICS export + calendar subscription feed.

### Discovery & Recommendations
- Background crawler seeds `discovery_queue`; fetchers respect robots.txt and per-domain throttles.
- Recommendation engine scores recipes via coverage ratio, missing-cost penalty, prep time weight, substitution graph boost.

### Nutrition & Allergens
- Ingredient-to-FDC mapping table with user override UI.
- Computed macros per serving stored in `nutrition` table with provenance metadata.
- Allergen detection uses keyword + alias tables (nuts, dairy, gluten, shellfish, soy, egg) with manual confirmation.

## Deployment Targets

- **Web:** Vercel (SSG + serverless actions) or Fly.io for long-running jobs.
- **API/Jobs:** Edge functions for lightweight tasks, long runners on Fly/Render with QStash scheduling.
- **Database:** Postgres (Supabase/Neon) with read replica for search; S3-compatible storage for media.

## Observability

- Structured logging with pino (server) and Sentry integration (clients) gated by opt-in telemetry flag.
- Metrics exported via OpenTelemetry to hosted collector (e.g., Honeycomb) when enabled.

## Outstanding Work

- Implement platform-specific SQLite adapters inside `packages/db/src/local` (expo-sqlite, wa-sqlite, better-sqlite3).
- Build importer job queue and site adapter registry.
- Wire NextAuth credentials + OAuth flows, integrate with Expo WebBrowser for mobile.
- Create GitHub Actions workflows for lint/test/build/e2e/release.
- Flesh out domain-specific unit tests and Playwright E2E scenarios.
