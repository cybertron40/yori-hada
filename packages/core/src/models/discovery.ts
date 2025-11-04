import { z } from "zod";

export const discoveryCandidateSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url(),
  status: z.enum(["queued", "fetching", "parsed", "error", "dismissed"]),
  attempts: z.number().int().default(0),
  nextAttemptAt: z.coerce.date().nullable(),
  lastError: z.string().nullable()
});

export type DiscoveryCandidate = z.infer<typeof discoveryCandidateSchema>;
