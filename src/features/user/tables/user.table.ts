import crypto from "node:crypto";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  role: text("role").notNull().default("applicant"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  location: text("location"),
  telegram: text("telegram"),
  linkedin: text("linkedin"),
  github: text("github"),
  summary: text("summary"),
  locale: text("locale").notNull().default("en"),
  createdAt: timestamp("created_at", { mode: "date" }).$default(
    () => new Date(),
  ),
  updatedAt: timestamp("updated_at", { mode: "date" }).$default(
    () => new Date(),
  ),
});
