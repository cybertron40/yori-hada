import { z } from "zod";

export const nutritionSchema = z.object({
  recipeId: z.string().uuid(),
  calories: z.number().int().nullable(),
  proteinG: z.number().int().nullable(),
  fatG: z.number().int().nullable(),
  carbsG: z.number().int().nullable(),
  sodiumMg: z.number().int().nullable(),
  fiberG: z.number().int().nullable(),
  sugarG: z.number().int().nullable(),
  cholesterolMg: z.number().int().nullable()
});

export type Nutrition = z.infer<typeof nutritionSchema>;
