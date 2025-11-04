import { Command } from "commander";
import { randomUUID } from "node:crypto";

import { and, eq, inArray } from "drizzle-orm";

import {
  createDbClient,
  users,
  recipes as recipesTable,
  recipeImages,
  recipeTags,
  recipeTagMap
} from "@recipe-manager/db";

import { sampleRecipes } from "../data/sample-recipes";
import { intro, outro, spinner } from "../utils/logger";

export function registerSeedCommand(program: Command) {
  program
    .command("seed")
    .description("Seed database with baseline data")
    .option("--env <env>", "Environment name", "development")
    .option("--database-url <url>", "Override DATABASE_URL")
    .action(async (options) => {
      intro(`Seeding database for ${options.env}`);
      const spin = spinner();

      try {
        const databaseUrl = options.databaseUrl ?? process.env.DATABASE_URL;
        if (!databaseUrl) {
          throw new Error("DATABASE_URL not provided. Set env or pass --database-url.");
        }

        spin.start("Connecting to database");
        const { db, client } = createDbClient(databaseUrl);

        const demoEmail = "demo@recipeatlas.app";
        const demoUserId = randomUUID();

        await db
          .insert(users)
          .values({ id: demoUserId, email: demoEmail, name: "Recipe Atlas Demo" })
          .onConflictDoNothing({ target: users.email });

        const existingTags = await db
          .select()
          .from(recipeTags)
          .where(eq(recipeTags.userId, demoUserId));

        const tagIndex = new Map<string, string>();
        existingTags.forEach((tag) => tagIndex.set(tag.name, tag.id));

        spin.text = "Inserting sample recipes";

        const recipeIds = sampleRecipes.map((recipe) => recipe.id);

        const existingRecipes = await db
          .select({ id: recipesTable.id })
          .from(recipesTable)
          .where(and(eq(recipesTable.userId, demoUserId), inArray(recipesTable.id, recipeIds)));

        const existingSet = new Set(existingRecipes.map((row) => row.id));

        for (const recipe of sampleRecipes) {
          if (existingSet.has(recipe.id)) continue;

          await db.insert(recipesTable).values({
            id: recipe.id,
            userId: demoUserId,
            title: recipe.title,
            slug: recipe.slug,
            description: recipe.description,
            cuisine: recipe.cuisine,
            course: recipe.course,
            totalMinutes: recipe.totalMinutes,
            imageUrl: recipe.imageUrl
          });

          await db.insert(recipeImages).values({
            id: randomUUID(),
            recipeId: recipe.id,
            url: recipe.imageUrl,
            width: 900,
            height: 600,
            alt: `${recipe.title} hero image`
          });

          for (const tag of recipe.tags) {
            if (!tagIndex.has(tag)) {
              const tagId = randomUUID();
              await db
                .insert(recipeTags)
                .values({ id: tagId, name: tag, userId: demoUserId })
                .onConflictDoNothing({ target: recipeTags.id });
              tagIndex.set(tag, tagId);
            }

            const tagId = tagIndex.get(tag);
            if (tagId) {
              await db
                .insert(recipeTagMap)
                .values({ recipeId: recipe.id, tagId })
                .onConflictDoNothing();
            }
          }
        }

        await client.end({ timeout: 0 });

        spin.succeed("Seed complete");
        outro("Seeding finished successfully");
      } catch (error) {
        spin.fail("Seed failed");
        throw error;
      }
    });
}
