import { ChangeLogEntry } from "@recipe-manager/core";

import type { LocalDatabase } from "./db";

export class MemoryDatabase implements LocalDatabase {
  private changes: ChangeLogEntry[] = [];

  async initialize() {
    this.changes = [];
  }

  async getChanges(since: Date | null) {
    if (!since) return [...this.changes];
    return this.changes.filter((change) => new Date(change.changedAt) > since);
  }

  async applyChanges(changes: ChangeLogEntry[]) {
    for (const change of changes) {
      const index = this.changes.findIndex((c) => c.id === change.id);
      if (index >= 0) {
        this.changes[index] = change;
      } else {
        this.changes.push(change);
      }
    }
  }

  async enqueueChange(change: ChangeLogEntry) {
    this.changes.push(change);
  }

  async purge() {
    this.changes = [];
  }
}
