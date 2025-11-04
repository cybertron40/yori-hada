import { z } from "zod";

export const syncOperationSchema = z.enum(["insert", "update", "delete"]);

export const changeLogEntrySchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  table: z.string().min(1),
  primaryKey: z.string().min(1),
  changedAt: z.coerce.date(),
  op: syncOperationSchema,
  payload: z.record(z.any()).optional(),
  clientId: z.string().min(1)
});

export type SyncOperation = z.infer<typeof syncOperationSchema>;
export type ChangeLogEntry = z.infer<typeof changeLogEntrySchema>;
