import { z } from "zod";

export const pantryItemSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  name: z.string().min(1),
  quantityNum: z.number().int().nullable(),
  quantityDen: z.number().int().nullable(),
  unit: z.string().nullable(),
  location: z.string().nullable(),
  expiresOn: z.coerce.date().nullable(),
  updatedAt: z.coerce.date()
});

export type PantryItem = z.infer<typeof pantryItemSchema>;
