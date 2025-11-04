import { z } from "zod";

export const plannerEntrySchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  recipeId: z.string().uuid().nullable(),
  date: z.coerce.date(),
  mealSlot: z.enum(["breakfast", "lunch", "dinner", "snack", "dessert"]).default("dinner"),
  serves: z.number().int().nullable(),
  note: z.string().nullable()
});

export type PlannerEntry = z.infer<typeof plannerEntrySchema>;
