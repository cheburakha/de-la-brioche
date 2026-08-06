import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const vacancyCompanyTable = pgTable("vacancy_company", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).$default(
    () => new Date(),
  ),
  updatedAt: timestamp("updated_at", { mode: "date" }).$default(
    () => new Date(),
  ),
});

export type VacancyCompanyTable = typeof vacancyCompanyTable.$inferSelect;
