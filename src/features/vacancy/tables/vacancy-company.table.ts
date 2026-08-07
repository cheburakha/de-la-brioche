import crypto from "node:crypto";
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const vacancyCompanyTable = pgTable("vacancy_company", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).$default(
    () => new Date(),
  ),
  updatedAt: timestamp("updated_at", { mode: "date" }).$default(
    () => new Date(),
  ),
});
