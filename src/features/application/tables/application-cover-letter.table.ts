import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { applicationTable } from "./application.table";

export const applicationCoverLetterTable = pgTable("application_cover_letter", {
  id: uuid("id").primaryKey().defaultRandom(),
  applicationId: uuid("application_id").references(() => applicationTable.id).notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).$default(
    () => new Date(),
  ),
  updatedAt: timestamp("updated_at", { mode: "date" }).$default(
    () => new Date(),
  ),
});

export type ApplicationCoverLetterTable = typeof applicationCoverLetterTable.$inferSelect;
