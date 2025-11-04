import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().default("Recipe Atlas"),
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().min(32).optional(),
  DATABASE_URL: z.string().url().optional()
});

const keys = Object.keys(envSchema.shape);

export const env = envSchema.parse(
  Object.fromEntries(keys.map((key) => [key, process.env[key]]))
);
