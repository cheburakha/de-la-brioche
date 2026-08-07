import path from "node:path";
import { migrate as drizzleMigrate } from "drizzle-orm/pglite/migrator";

import { getDb } from "./database";

export async function migrate(): Promise<void> {
  const db = getDb();
  const migrationsFolder = path.join(
    import.meta.dirname,
    "..",
    "..",
    "drizzle",
  );

  await drizzleMigrate(db, { migrationsFolder });
}
