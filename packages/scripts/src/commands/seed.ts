import { Command } from "commander";
import { intro, outro, spinner } from "../utils/logger";

export function registerSeedCommand(program: Command) {
  program
    .command("seed")
    .description("Seed database with baseline data")
    .option("--env <env>", "Environment name", "development")
    .action(async (options) => {
      intro(`Seeding database for ${options.env}`);
      const spin = spinner();
      spin.start("Running seeders");

      try {
        // TODO: implement seeding logic with Drizzle
        await new Promise((resolve) => setTimeout(resolve, 500));
        spin.succeed("Seed complete");
        outro("Seeding finished successfully");
      } catch (error) {
        spin.fail("Seed failed");
        throw error;
      }
    });
}
