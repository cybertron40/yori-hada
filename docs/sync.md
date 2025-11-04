# Sync & Backup Strategy

## Local Databases

| Platform | Adapter | Storage |
| --- | --- | --- |
| Web | `wa-sqlite` running in worker, fallback to IndexedDB via Dexie | Browser persistent storage |
| Android | `expo-sqlite` with WAL enabled | Device sandbox |
| Desktop | `better-sqlite3` accessed through Tauri commands | App data directory |

Each adapter implements the `LocalDatabase` interface exported from `packages/db`:

```ts
interface LocalDatabase {
  initialize(): Promise<void>;
  getChanges(since: Date | null): Promise<ChangeLogEntry[]>;
  applyChanges(changes: ChangeLogEntry[]): Promise<void>;
  enqueueChange(change: ChangeLogEntry): Promise<void>;
  purge(): Promise<void>;
}
```

## Sync Loop

1. **Schedule:** Background task runs every 60s (configurable) or on-demand (manual Sync button).
2. **Upload:** Collect `sync_change` rows with `changed_at > last_synced_at`. Batch by table to minimize payload.
3. **Server Merge:** Server validates, applies diff, attaches `server_timestamp`, and returns authoritative patch.
4. **Download:** Client applies remote patch via transaction; updates `last_synced_at` and clears uploaded change IDs.
5. **Conflict Detection:**
   - If server responds with `conflicts` array, client stores entries in local `sync_conflicts` table.
   - UI surfaces conflict resolution modal with field-level comparison and accept/override actions.

## Backup & Restore

- **Encrypted Backups:**
  - User triggers export → SQLite DB + media assets zipped.
  - `vault_key` derived from passphrase using Argon2id (`salt = device_id`).
  - ZIP encrypted with libsodium secretbox; metadata includes schema version + created_at.
  - Upload destination selectable (Supabase Storage, S3, local filesystem).

- **Recovery:**
  - Validate schema version; run migrations if needed.
  - Restore local SQLite; optionally backfill to server when cloud sync enabled.

## Telemetry & Audit

- Sync events recorded with action, latency, bytes transferred.
- Audit logs stored server-side for administrative review; no personal content logged when telemetry disabled.

## Edge Cases

- **Device clock skew:** Server timestamp considered authoritative; clients adjust `last_synced_at` using monotonic counters.
- **Schema migrations:** Applied via Drizzle SQL; migration version tracked per device to trigger local upgrades.
- **Offline-only mode:** Skip network calls, disable sync button, ensure change logs do not grow unbounded via periodic vacuum.
