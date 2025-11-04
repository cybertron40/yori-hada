import type { ChangeLogEntry } from "@recipe-manager/core";

export interface LocalDatabase {
  initialize(): Promise<void>;
  getChanges(since: Date | null): Promise<ChangeLogEntry[]>;
  applyChanges(changes: ChangeLogEntry[]): Promise<void>;
  enqueueChange(change: ChangeLogEntry): Promise<void>;
  purge(): Promise<void>;
}

export type DatabasePlatform = "web" | "mobile" | "desktop";

export interface LocalDatabaseFactory {
  platform: DatabasePlatform;
  create(): LocalDatabase;
}
