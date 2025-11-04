# Security & Privacy Guidelines

## Authentication & Authorization

- NextAuth with email/password (Argon2id hashed) and OAuth providers (Google, Apple, Microsoft).
- Sessions stored as encrypted JWTs with rotation; refresh tokens kept in Postgres with device binding.
- Device registration table tracks metadata (platform, last_seen, client_version) and user-granted scopes (sync, notifications).

## Encryption

- **At Rest:**
  - Postgres encrypted via managed provider (Supabase/Neon) + transparent column-level encryption for secrets.
  - Object storage uses bucket-level encryption keys.
- **In Transit:** TLS enforced for all network calls.
- **End-to-End Encryption:**
  - Optional user passphrase generates `vault_key` (PBKDF2 or Argon2id) used to encrypt recipe payloads before sync.
  - Server stores ciphertext only; metadata fields (ids, timestamps) remain plaintext for syncing.

## Secrets & Config

- Environment variables validated with Zod before boot.
- Clients store tokens in secure storage (Expo SecureStore, Tauri keyring). Never persist high-value secrets in AsyncStorage or localStorage.

## Importer Hardening

- Robots.txt parser prevents fetching disallowed paths.
  - Respect crawl-delay directives; enforce global rate limit.
- Requests use HEAD for metadata before full fetch; reject non-`text/html` responses.
- HTML sanitized with DOMPurify on server prior to persistence.
- Deny SSRF by validating protocol/host against allow list; block internal IP ranges.

## Access Controls

- Postgres RLS ensures `user_id` scoping on all tables.
- Admin dashboard gated via role-based access with explicit invitation.
- Audit logging for every admin read/write and sync conflict override.

## Privacy Modes

- **Local-only:** No network sync; telemetry disabled; discovery limited to manual import (user-provided URLs).
- **Cloud-sync:** Device-specific encryption keys; ability to disconnect device remotely; background sync toggle per device.

## Telemetry

- Opt-in toggle during onboarding with clear description.
- Collect aggregated metrics (app launches, sync durations) without personal content.
- Telemetry payloads anonymized via UUID4 per install; resets on opt-out.

## Compliance Considerations

- Provide data export/delete tooling to support GDPR/CCPA requests.
- Maintain SBOM for dependency transparency; integrate with Dependabot or Renovate.
- Regular security audits with automated dependency scanning in CI.
