import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";

export const vacancy = pgTable("vacancy", {
  id: uuid("id").primaryKey().defaultRandom(),
  externalId: text("external_id").notNull().unique(),
  sourceId: text("source_id").notNull(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull().default(""),
  description: text("description").notNull().default(""),
  salaryFrom: integer("salary_from"),
  salaryTo: integer("salary_to"),
  salaryCurrency: text("salary_currency"),
  url: text("url").notNull(),
  publishedAt: timestamp("published_at", { mode: "date" }),
  skills: text("skills").array(),
  experience: text("experience"),
  employmentType: text("employment_type"),
  status: text("status", {
    enum: ["new", "saved", "applied", "interview", "rejected", "offer"],
  })
    .notNull()
    .default("new"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { mode: "date" }).$default(
    () => new Date(),
  ),
  updatedAt: timestamp("updated_at", { mode: "date" }).$default(
    () => new Date(),
  ),
});
