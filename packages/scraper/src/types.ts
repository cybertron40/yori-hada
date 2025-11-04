import { z } from "zod";

export const scrapeRequestSchema = z.object({
  url: z.string().url(),
  userAgent: z.string().default("RecipeAtlasBot/0.1"),
  timeoutMs: z.number().int().positive().default(10000)
});

export const scrapedRecipeSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  author: z.string().optional(),
  sourceName: z.string().optional(),
  sourceUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  tags: z.array(z.string()).default([]),
  categories: z.array(z.string()).default([]),
  cuisine: z.string().optional(),
  course: z.string().optional(),
  yield: z.string().optional(),
  servings: z.number().int().optional(),
  prepMinutes: z.number().int().optional(),
  cookMinutes: z.number().int().optional(),
  totalMinutes: z.number().int().optional(),
  ingredients: z.array(z.string()).default([]),
  steps: z.array(z.string()).default([]),
  nutrition: z.record(z.any()).optional(),
  raw: z.record(z.any()).optional()
});

export type ScrapeRequest = z.infer<typeof scrapeRequestSchema>;
export type ScrapedRecipe = z.infer<typeof scrapedRecipeSchema>;
