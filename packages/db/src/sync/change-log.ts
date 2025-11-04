import type { ChangeLogEntry } from "@recipe-manager/core";

export const sortChangeLog = (changes: ChangeLogEntry[]) =>
  [...changes].sort((a, b) => new Date(a.changedAt).getTime() - new Date(b.changedAt).getTime());

export const dedupeChangeLog = (changes: ChangeLogEntry[]) => {
  const map = new Map<string, ChangeLogEntry>();
  for (const change of sortChangeLog(changes)) {
    map.set(`${change.table}:${change.pk}`, change);
  }
  return Array.from(map.values());
};

export const mergeChangeLogs = (
  localChanges: ChangeLogEntry[],
  remoteChanges: ChangeLogEntry[]
): ChangeLogEntry[] => {
  const merged = [...localChanges];
  for (const change of remoteChanges) {
    const existingIndex = merged.findIndex(
      (item) => item.table === change.table && item.pk === change.pk
    );
    if (existingIndex >= 0) {
      if (new Date(change.changedAt) > new Date(merged[existingIndex].changedAt)) {
        merged[existingIndex] = change;
      }
    } else {
      merged.push(change);
    }
  }
  return sortChangeLog(merged);
};
