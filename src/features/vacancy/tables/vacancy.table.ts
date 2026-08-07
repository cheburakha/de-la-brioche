import { pgTable, uuid, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

export const vacancyTable = pgTable("vacancy", {
  id: uuid("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
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
  skills: text("skills"),
  experience: text("experience"),
  employmentType: text("employment_type"),
  status: text("status", {
    enum: ["new", "saved", "applied", "interview", "rejected", "offer"],
  })
    .notNull()
    .default("new"),
  isFavourite: boolean("is_favourite").notNull().default(false),
  notes: text("notes"),
  createdAt: timestamp("created_at", { mode: "date" }).$default(
    () => new Date(),
  ),
  updatedAt: timestamp("updated_at", { mode: "date" }).$default(
    () => new Date(),
  ),
});
