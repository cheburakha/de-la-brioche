import crypto from "node:crypto";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { userTable } from "./user.table";

export const userResumeTable = pgTable("user_resume", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: uuid("user_id")
    .references(() => userTable.id)
    .notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).$default(
    () => new Date(),
  ),
  updatedAt: timestamp("updated_at", { mode: "date" }).$default(
    () => new Date(),
  ),
});
