import { load } from "cheerio";
import { z } from "zod";

import type { ScrapedRecipe } from "../types";

const recipeSchema = z
  .object({
    "@type": z.union([z.string(), z.array(z.string())]).optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    author: z
      .union([
        z.string(),
        z.object({ name: z.string().optional() }),
        z.array(z.union([z.string(), z.object({ name: z.string().optional() })]))
      ])
      .optional(),
    recipeYield: z.union([z.string(), z.array(z.string())]).optional(),
    recipeCategory: z.union([z.string(), z.array(z.string())]).optional(),
    recipeCuisine: z.union([z.string(), z.array(z.string())]).optional(),
    recipeIngredient: z.union([z.string(), z.array(z.string())]).optional(),
    recipeInstructions: z.any().optional(),
    image: z.union([z.string(), z.object({ url: z.string().optional() }), z.array(z.string())]).optional(),
    totalTime: z.string().optional(),
    prepTime: z.string().optional(),
    cookTime: z.string().optional(),
    aggregateRating: z.object({ ratingValue: z.union([z.string(), z.number()]).optional() }).optional(),
    keywords: z.union([z.string(), z.array(z.string())]).optional(),
    nutrition: z.record(z.any()).optional()
  })
  .catchall(z.any());

function flattenAuthor(author: unknown): string | undefined {
  if (!author) return undefined;
  if (typeof author === "string") return author;
  if (Array.isArray(author)) {
    const names = author.map((item) =>
      typeof item === "string" ? item : item?.name ?? undefined
    );
    return names.filter(Boolean).join(", ") || undefined;
  }
  if (typeof author === "object" && author !== null) {
    return "name" in author && typeof author.name === "string" ? author.name : undefined;
  }
  return undefined;
}

function coerceArray(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === "string");
  if (typeof value === "string") return value.split(/,\s*/);
  return [];
}

function parseIsoDuration(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const match = /P(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?/i.exec(value);
  if (!match) return undefined;
  const hours = match[1] ? Number(match[1]) : 0;
  const minutes = match[2] ? Number(match[2]) : 0;
  const seconds = match[3] ? Number(match[3]) : 0;
  return hours * 60 + minutes + Math.round(seconds / 60);
}

function extractInstructions(instructions: unknown): string[] {
  if (!instructions) return [];
  if (typeof instructions === "string") return [instructions];
  if (Array.isArray(instructions)) {
    return instructions
      .map((item) => {
        if (typeof item === "string") return item;
        if (typeof item === "object" && item !== null) {
          if ("text" in item && typeof item.text === "string") return item.text;
          if ("@type" in item && item["@type"] === "HowToStep" && typeof item?.name === "string") {
            return item.name;
          }
        }
        return undefined;
      })
      .filter((step): step is string => Boolean(step));
  }
  if (typeof instructions === "object" && instructions !== null) {
    if ("text" in instructions && typeof instructions.text === "string") return [instructions.text];
  }
  return [];
}

function extractImage(image: unknown): string | undefined {
  if (!image) return undefined;
  if (typeof image === "string") return image;
  if (Array.isArray(image)) return image.find((item) => typeof item === "string");
  if (typeof image === "object" && image !== null) {
    if ("url" in image && typeof image.url === "string") return image.url;
  }
  return undefined;
}

function findRecipeNode(json: unknown): unknown {
  if (!json) return undefined;
  if (Array.isArray(json)) {
    for (const entry of json) {
      const result = findRecipeNode(entry);
      if (result) return result;
    }
    return undefined;
  }
  if (typeof json !== "object" || json === null) return undefined;

  const type = (json as Record<string, unknown>)["@type"];
  if (type) {
    if (typeof type === "string" && type.toLowerCase() === "recipe") return json;
    if (Array.isArray(type) && type.some((item) => typeof item === "string" && item.toLowerCase() === "recipe")) {
      return json;
    }
  }

  for (const value of Object.values(json)) {
    const result = findRecipeNode(value);
    if (result) return result;
  }

  return undefined;
}

export async function parseRecipe(html: string, url: string): Promise<ScrapedRecipe> {
  const $ = load(html);
  const scripts = $("script[type='application/ld+json']");

  let candidate: unknown;
  scripts.each((_, element) => {
    const jsonText = $(element).contents().text();
    try {
      const parsed = JSON.parse(jsonText.trim());
      const recipeNode = findRecipeNode(parsed);
      if (recipeNode) {
        candidate = recipeNode;
        return false;
      }
    } catch (error) {
      console.warn("Failed to parse JSON-LD", error);
    }
    return undefined;
  });

  if (!candidate) {
    throw new Error("Recipe JSON-LD not found");
  }

  const data = recipeSchema.parse(candidate);

  const tags = new Set<string>();
  coerceArray(data.keywords).forEach((keyword) => tags.add(keyword));
  coerceArray(data.recipeCategory).forEach((category) => tags.add(category));

  const recipe: ScrapedRecipe = {
    title: data.name,
    description: data.description,
    author: flattenAuthor(data.author),
    sourceUrl: url,
    imageUrl: extractImage(data.image),
    tags: Array.from(tags),
    categories: coerceArray(data.recipeCategory),
    cuisine: coerceArray(data.recipeCuisine)[0],
    course: coerceArray(data.recipeCategory)[0],
    yield: Array.isArray(data.recipeYield) ? data.recipeYield[0] : data.recipeYield,
    ingredients: coerceArray(data.recipeIngredient),
    steps: extractInstructions(data.recipeInstructions),
    prepMinutes: parseIsoDuration(data.prepTime),
    cookMinutes: parseIsoDuration(data.cookTime),
    totalMinutes: parseIsoDuration(data.totalTime),
    nutrition: data.nutrition ?? undefined,
    raw: data
  };

  if (recipe.ingredients.length === 0) {
    // fallback to text-based parsing of ingredients list
    const ingredientNodes = $("[itemprop='recipeIngredient'], .recipe-ingredients li");
    ingredientNodes.each((_, node) => {
      const text = $(node).text().trim();
      if (text) {
        recipe.ingredients.push(text);
      }
    });
  }

  if (recipe.steps.length === 0) {
    const stepNodes = $("[itemprop='recipeInstructions'] li, .recipe-directions li, .instructions li");
    stepNodes.each((_, node) => {
      const text = $(node).text().trim();
      if (text) {
        recipe.steps.push(text);
      }
    });
  }

  return recipe;
}
