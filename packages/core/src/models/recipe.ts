import { z } from "zod";

export const quantitySchema = z.object({
  numerator: z.number().optional(),
  denominator: z.number().optional()
});

export const ingredientSchema = z.object({
  id: z.string().uuid(),
  recipeId: z.string().uuid(),
  rawText: z.string(),
  quantity: quantitySchema.nullish(),
  unit: z.string().optional(),
  item: z.string(),
  preparation: z.string().optional(),
  note: z.string().optional(),
  groupLabel: z.string().optional(),
  orderIndex: z.number().int()
});

export const directionSchema = z.object({
  id: z.string().uuid(),
  recipeId: z.string().uuid(),
  text: z.string(),
  timerSeconds: z.number().int().optional(),
  imageUrl: z.string().url().optional(),
  orderIndex: z.number().int()
});

export const recipeSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  servings: z.number().int().positive().optional(),
  yieldText: z.string().optional(),
  cuisine: z.string().optional(),
  course: z.string().optional(),
  totalMinutes: z.number().int().optional(),
  prepMinutes: z.number().int().optional(),
  cookMinutes: z.number().int().optional(),
  rating: z.number().min(0).max(5).optional(),
  sourceUrl: z.string().url().optional(),
  sourceName: z.string().optional(),
  author: z.string().optional(),
  imageUrl: z.string().url().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  isPrivate: z.boolean().default(false),
  tags: z.array(z.string().min(1)).default([]),
  categories: z.array(z.string().min(1)).default([]),
  ingredients: z.array(ingredientSchema).default([]),
  directions: z.array(directionSchema).default([])
});

export type Recipe = z.infer<typeof recipeSchema>;
export type Ingredient = z.infer<typeof ingredientSchema>;
export type Direction = z.infer<typeof directionSchema>;
