import { z } from "zod";

export const groceryListSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  name: z.string().min(1),
  createdAt: z.coerce.date()
});

export const groceryItemSchema = z.object({
  id: z.string().uuid(),
  listId: z.string().uuid(),
  name: z.string().min(1),
  quantityNum: z.number().int().nullable(),
  quantityDen: z.number().int().nullable(),
  unit: z.string().nullable(),
  aisle: z.string().nullable(),
  checked: z.boolean().default(false),
  note: z.string().nullable()
});

export type GroceryList = z.infer<typeof groceryListSchema>;
export type GroceryItem = z.infer<typeof groceryItemSchema>;
