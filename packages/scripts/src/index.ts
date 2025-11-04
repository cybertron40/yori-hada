#!/usr/bin/env node
import { Command } from "commander";
import { config } from "dotenv-flow";
import { version } from "../package.json";
import { registerSeedCommand } from "./commands/seed";

config({ path: process.cwd(), silent: true });

const program = new Command();
program.name("recipe-scripts").description("Recipe Manager CLI utilities").version(version);

registerSeedCommand(program);

program.parseAsync().catch((error) => {
  console.error(error);
  process.exit(1);
});
