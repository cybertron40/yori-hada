import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import * as schema from "./schema";

export function createDbClient(databaseUrl: string) {
  const client = postgres(databaseUrl, {
    max: 1,
    idle_timeout: 0,
    prepare: false
  });

  const db = drizzle(client, { schema });
  return { db, client };
}
