import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";

import { UserResumeTable, UserTable } from "@/features/user/tables";
import { ApplicationTable } from "@/features/application/tables";

export interface Database {
  application: ApplicationTable;
  user: UserTable;
  user_resume: UserResumeTable;
}

let _client: PGlite | null = null;
let _db: ReturnType<typeof drizzle> | null = null;

export function getDb(): ReturnType<typeof drizzle> {
  if (!_db) throw new Error("Database not initialised — call initDb() first");
  return _db;
}

export async function initDb(dataDir: string): Promise<void> {
  _client = new PGlite(dataDir);
  _db = drizzle({ client: _client });
}
