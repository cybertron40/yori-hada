# Recipe Atlas Monorepo

Recipe Atlas is a local-first, privacy-conscious recipe manager that ships a unified experience across the web, Android, and Windows desktop. It delivers Paprika-class functionality with modern discovery, ingredient intelligence, and offline sync.

## Getting Started

### Prerequisites

- [pnpm](https://pnpm.io/) 9+
- Node.js 20+
- Rust toolchain (for Tauri desktop)
- Expo CLI (`npm install -g expo-cli`) for mobile development

### Install Dependencies

```bash
pnpm install
```

### Development Commands

- `pnpm dev` – run all apps in parallel via Turborepo
- `pnpm --filter @recipe-manager/web dev` – Next.js web app
- `pnpm --filter @recipe-manager/marketing dev` – Marketing site
- `pnpm --filter @recipe-manager/mobile start` – Expo mobile app
- `pnpm --filter @recipe-manager/desktop dev` – Tauri desktop shell (requires the web app running on port 3000)

## Monorepo Structure

- `apps/web` – Next.js application (authenticated experience)
- `apps/marketing` – Next.js marketing site
- `apps/mobile` – Expo/React Native client
- `apps/desktop` – Tauri wrapper for the web app
- `packages/ui` – shared component library built on Tailwind and shadcn/ui patterns
- `packages/core` – domain models, validation schemas, sync primitives
- `packages/db` – Drizzle ORM schema, sync helpers, platform adapters (SQLite + Postgres)
- `packages/scraper` – discovery crawler, import parsers, normalization utilities
- `packages/scripts` – CLI utilities (seeders, migrations, automation)
- `packages/config` – shared ESLint, Tailwind, Prettier, and tsconfig presets

## Environment Variables

Environment variables are managed with `dotenv-flow`. Create `.env.local` files at the repo root or inside individual apps. A Zod-powered runtime validator will be added in future iterations.

## CI/CD

GitHub Actions pipelines (lint, test, build, e2e, release) are defined in `.github/workflows` (to be added). Semantic-release will manage versioning once release automation is wired.

## Docs & Further Work

Additional documentation lives in `docs/` (to be added) covering architecture, sync flows, security posture, and importer specifications.

Please see the issue tracker for upcoming milestones including:

1. End-to-end auth and sync flows
2. Local database adapters for Expo, web (IndexedDB), and desktop (better-sqlite3)
3. Web discovery crawlers and nutrition enrichment services
4. Encrypted backup/export tooling