import { scrapeRequestSchema, scrapedRecipeSchema, type ScrapedRecipe } from "./types";
import { fetchHtml } from "./utils/fetch-html";
import { parseRecipe } from "./parsers/jsonld";

export async function scrapeRecipe(input: unknown): Promise<ScrapedRecipe> {
  const request = scrapeRequestSchema.parse(input);
  const html = await fetchHtml(request.url, {
    timeoutMs: request.timeoutMs,
    userAgent: request.userAgent
  });

  const parsed = await parseRecipe(html, request.url);

  return scrapedRecipeSchema.parse(parsed);
}

export { scrapedRecipeSchema } from "./types";
export type { ScrapedRecipe } from "./types";
